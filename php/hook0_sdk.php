<?php
declare(strict_types=1);

// Hook0 SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class Hook0SDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new Hook0Utility();
        $this->_utility = $utility;

        $config = Hook0Config::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = Hook0Helpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = Hook0Helpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!Hook0Features::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, Hook0Features::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return Hook0Utility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = Hook0Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = Hook0Helpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = Hook0Helpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new Hook0Spec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new Hook0Error($op . "_allow",
                "Hook0SDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = Hook0Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = Hook0Helpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new Hook0Error("graphql_error",
                "Hook0SDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_application = null;

    // Canonical facade: $client->Application()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->application()
    // resolves here too.
    public function Application($data = null)
    {
        require_once __DIR__ . '/entity/application_entity.php';
        if ($data === null) {
            if ($this->_application === null) {
                $this->_application = new ApplicationEntity($this, null);
            }
            return $this->_application;
        }
        return new ApplicationEntity($this, $data);
    }


    private $_application_secret = null;

    // Canonical facade: $client->ApplicationSecret()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->application_secret()
    // resolves here too.
    public function ApplicationSecret($data = null)
    {
        require_once __DIR__ . '/entity/application_secret_entity.php';
        if ($data === null) {
            if ($this->_application_secret === null) {
                $this->_application_secret = new ApplicationSecretEntity($this, null);
            }
            return $this->_application_secret;
        }
        return new ApplicationSecretEntity($this, $data);
    }


    private $_applications_management = null;

    // Canonical facade: $client->ApplicationsManagement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->applications_management()
    // resolves here too.
    public function ApplicationsManagement($data = null)
    {
        require_once __DIR__ . '/entity/applications_management_entity.php';
        if ($data === null) {
            if ($this->_applications_management === null) {
                $this->_applications_management = new ApplicationsManagementEntity($this, null);
            }
            return $this->_applications_management;
        }
        return new ApplicationsManagementEntity($this, $data);
    }


    private $_event = null;

    // Canonical facade: $client->Event()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event()
    // resolves here too.
    public function Event($data = null)
    {
        require_once __DIR__ . '/entity/event_entity.php';
        if ($data === null) {
            if ($this->_event === null) {
                $this->_event = new EventEntity($this, null);
            }
            return $this->_event;
        }
        return new EventEntity($this, $data);
    }


    private $_event_type = null;

    // Canonical facade: $client->EventType()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event_type()
    // resolves here too.
    public function EventType($data = null)
    {
        require_once __DIR__ . '/entity/event_type_entity.php';
        if ($data === null) {
            if ($this->_event_type === null) {
                $this->_event_type = new EventTypeEntity($this, null);
            }
            return $this->_event_type;
        }
        return new EventTypeEntity($this, $data);
    }


    private $_events_management = null;

    // Canonical facade: $client->EventsManagement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->events_management()
    // resolves here too.
    public function EventsManagement($data = null)
    {
        require_once __DIR__ . '/entity/events_management_entity.php';
        if ($data === null) {
            if ($this->_events_management === null) {
                $this->_events_management = new EventsManagementEntity($this, null);
            }
            return $this->_events_management;
        }
        return new EventsManagementEntity($this, $data);
    }


    private $_events_per_day_entry = null;

    // Canonical facade: $client->EventsPerDayEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->events_per_day_entry()
    // resolves here too.
    public function EventsPerDayEntry($data = null)
    {
        require_once __DIR__ . '/entity/events_per_day_entry_entity.php';
        if ($data === null) {
            if ($this->_events_per_day_entry === null) {
                $this->_events_per_day_entry = new EventsPerDayEntryEntity($this, null);
            }
            return $this->_events_per_day_entry;
        }
        return new EventsPerDayEntryEntity($this, $data);
    }


    private $_health = null;

    // Canonical facade: $client->Health()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->health()
    // resolves here too.
    public function Health($data = null)
    {
        require_once __DIR__ . '/entity/health_entity.php';
        if ($data === null) {
            if ($this->_health === null) {
                $this->_health = new HealthEntity($this, null);
            }
            return $this->_health;
        }
        return new HealthEntity($this, $data);
    }


    private $_hook0 = null;

    // Canonical facade: $client->Hook0()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hook0()
    // resolves here too.
    public function Hook0($data = null)
    {
        require_once __DIR__ . '/entity/hook0_entity.php';
        if ($data === null) {
            if ($this->_hook0 === null) {
                $this->_hook0 = new Hook0Entity($this, null);
            }
            return $this->_hook0;
        }
        return new Hook0Entity($this, $data);
    }


    private $_ingested_event = null;

    // Canonical facade: $client->IngestedEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ingested_event()
    // resolves here too.
    public function IngestedEvent($data = null)
    {
        require_once __DIR__ . '/entity/ingested_event_entity.php';
        if ($data === null) {
            if ($this->_ingested_event === null) {
                $this->_ingested_event = new IngestedEventEntity($this, null);
            }
            return $this->_ingested_event;
        }
        return new IngestedEventEntity($this, $data);
    }


    private $_instance = null;

    // Canonical facade: $client->Instance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->instance()
    // resolves here too.
    public function Instance($data = null)
    {
        require_once __DIR__ . '/entity/instance_entity.php';
        if ($data === null) {
            if ($this->_instance === null) {
                $this->_instance = new InstanceEntity($this, null);
            }
            return $this->_instance;
        }
        return new InstanceEntity($this, $data);
    }


    private $_login = null;

    // Canonical facade: $client->Login()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->login()
    // resolves here too.
    public function Login($data = null)
    {
        require_once __DIR__ . '/entity/login_entity.php';
        if ($data === null) {
            if ($this->_login === null) {
                $this->_login = new LoginEntity($this, null);
            }
            return $this->_login;
        }
        return new LoginEntity($this, $data);
    }


    private $_organization = null;

    // Canonical facade: $client->Organization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization()
    // resolves here too.
    public function Organization($data = null)
    {
        require_once __DIR__ . '/entity/organization_entity.php';
        if ($data === null) {
            if ($this->_organization === null) {
                $this->_organization = new OrganizationEntity($this, null);
            }
            return $this->_organization;
        }
        return new OrganizationEntity($this, $data);
    }


    private $_organization_edit_role = null;

    // Canonical facade: $client->OrganizationEditRole()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_edit_role()
    // resolves here too.
    public function OrganizationEditRole($data = null)
    {
        require_once __DIR__ . '/entity/organization_edit_role_entity.php';
        if ($data === null) {
            if ($this->_organization_edit_role === null) {
                $this->_organization_edit_role = new OrganizationEditRoleEntity($this, null);
            }
            return $this->_organization_edit_role;
        }
        return new OrganizationEditRoleEntity($this, $data);
    }


    private $_problem = null;

    // Canonical facade: $client->Problem()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->problem()
    // resolves here too.
    public function Problem($data = null)
    {
        require_once __DIR__ . '/entity/problem_entity.php';
        if ($data === null) {
            if ($this->_problem === null) {
                $this->_problem = new ProblemEntity($this, null);
            }
            return $this->_problem;
        }
        return new ProblemEntity($this, $data);
    }


    private $_quota = null;

    // Canonical facade: $client->Quota()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->quota()
    // resolves here too.
    public function Quota($data = null)
    {
        require_once __DIR__ . '/entity/quota_entity.php';
        if ($data === null) {
            if ($this->_quota === null) {
                $this->_quota = new QuotaEntity($this, null);
            }
            return $this->_quota;
        }
        return new QuotaEntity($this, $data);
    }


    private $_registration = null;

    // Canonical facade: $client->Registration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->registration()
    // resolves here too.
    public function Registration($data = null)
    {
        require_once __DIR__ . '/entity/registration_entity.php';
        if ($data === null) {
            if ($this->_registration === null) {
                $this->_registration = new RegistrationEntity($this, null);
            }
            return $this->_registration;
        }
        return new RegistrationEntity($this, $data);
    }


    private $_request_attempt = null;

    // Canonical facade: $client->RequestAttempt()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->request_attempt()
    // resolves here too.
    public function RequestAttempt($data = null)
    {
        require_once __DIR__ . '/entity/request_attempt_entity.php';
        if ($data === null) {
            if ($this->_request_attempt === null) {
                $this->_request_attempt = new RequestAttemptEntity($this, null);
            }
            return $this->_request_attempt;
        }
        return new RequestAttemptEntity($this, $data);
    }


    private $_response = null;

    // Canonical facade: $client->Response()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->response()
    // resolves here too.
    public function Response($data = null)
    {
        require_once __DIR__ . '/entity/response_entity.php';
        if ($data === null) {
            if ($this->_response === null) {
                $this->_response = new ResponseEntity($this, null);
            }
            return $this->_response;
        }
        return new ResponseEntity($this, $data);
    }


    private $_revoke = null;

    // Canonical facade: $client->Revoke()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->revoke()
    // resolves here too.
    public function Revoke($data = null)
    {
        require_once __DIR__ . '/entity/revoke_entity.php';
        if ($data === null) {
            if ($this->_revoke === null) {
                $this->_revoke = new RevokeEntity($this, null);
            }
            return $this->_revoke;
        }
        return new RevokeEntity($this, $data);
    }


    private $_service_token = null;

    // Canonical facade: $client->ServiceToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->service_token()
    // resolves here too.
    public function ServiceToken($data = null)
    {
        require_once __DIR__ . '/entity/service_token_entity.php';
        if ($data === null) {
            if ($this->_service_token === null) {
                $this->_service_token = new ServiceTokenEntity($this, null);
            }
            return $this->_service_token;
        }
        return new ServiceTokenEntity($this, $data);
    }


    private $_subscription = null;

    // Canonical facade: $client->Subscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->subscription()
    // resolves here too.
    public function Subscription($data = null)
    {
        require_once __DIR__ . '/entity/subscription_entity.php';
        if ($data === null) {
            if ($this->_subscription === null) {
                $this->_subscription = new SubscriptionEntity($this, null);
            }
            return $this->_subscription;
        }
        return new SubscriptionEntity($this, $data);
    }


    private $_user_authentication = null;

    // Canonical facade: $client->UserAuthentication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_authentication()
    // resolves here too.
    public function UserAuthentication($data = null)
    {
        require_once __DIR__ . '/entity/user_authentication_entity.php';
        if ($data === null) {
            if ($this->_user_authentication === null) {
                $this->_user_authentication = new UserAuthenticationEntity($this, null);
            }
            return $this->_user_authentication;
        }
        return new UserAuthenticationEntity($this, $data);
    }


    private $_user_invitation = null;

    // Canonical facade: $client->UserInvitation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_invitation()
    // resolves here too.
    public function UserInvitation($data = null)
    {
        require_once __DIR__ . '/entity/user_invitation_entity.php';
        if ($data === null) {
            if ($this->_user_invitation === null) {
                $this->_user_invitation = new UserInvitationEntity($this, null);
            }
            return $this->_user_invitation;
        }
        return new UserInvitationEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new Hook0SDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
