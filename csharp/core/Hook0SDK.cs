// Hook0 SDK client.

using Voxgig.Struct;

using Hook0Sdk.Feature;

namespace Hook0Sdk;

public class Hook0SDK
{
    // NOTE: type references in EXPRESSION position are `global::`-qualified
    // throughout this class. Entity accessors are PascalCase methods declared
    // on it (see MainEntity_csharp), so an entity named `utility` declares
    // `Utility(...)` here and C# then resolves the simple name `Utility` in an
    // expression to the METHOD, not the type: "'X.Utility(...)' is a method,
    // which is not valid in the given context". Qualifying makes the class
    // immune to that whatever the API names its entities. Type POSITIONS
    // (field and return types) are unaffected and stay unqualified.

    public string Mode = "live";
    private Dictionary<string, object?> _options;
    private readonly Utility _utility;
    public List<BaseFeature> Features = new();
    private readonly Context _rootctx;

    public Hook0SDK(Dictionary<string, object?>? options = null)
    {
        _utility = new Utility();

        // The process-wide config (sdkgen rung L2): read-only on the request
        // path, so every client shares one rather than rebuilding it.
        var config = global::Hook0Sdk.SdkConfig.SharedConfig();

        _rootctx = _utility.MakeContext(new Dictionary<string, object?>
        {
            ["client"] = this,
            ["utility"] = _utility,
            ["config"] = config,
            ["options"] = options,
            ["shared"] = new Dictionary<string, object?>(),
        }, null);

        _options = _utility.MakeOptions(_rootctx);

        if (Equals(global::Voxgig.Struct.StructUtils.GetPath(_options,
            global::Voxgig.Struct.StructUtils.Jt("feature", "test", "active")), true))
        {
            Mode = "test";
        }

        _rootctx.Options = _options;

        // Add features in the resolved order (MakeOptions puts an explicit
        // list order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base of
        // the chain.
        var featureOpts = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(_options, "feature"))
            ?? new Dictionary<string, object?>();
        var featureOrder = global::Voxgig.Struct.StructUtils.GetPath(_options,
            global::Voxgig.Struct.StructUtils.Jt("__derived__", "featureorder")) as List<object?>
            ?? new List<object?>();
        foreach (var fnameObj in featureOrder)
        {
            var fname = fnameObj as string ?? "";
            var fopts = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(featureOpts, fname));
            if (fopts != null &&
                fopts.TryGetValue("active", out var active) &&
                active is bool ab && ab)
            {
                _utility.FeatureAdd(_rootctx, global::Hook0Sdk.SdkConfig.MakeFeature(fname));
            }
        }

        // Add extension features.
        if (global::Voxgig.Struct.StructUtils.GetProp(_options, "extend") is List<object?> extList)
        {
            foreach (var f in extList)
            {
                if (f is BaseFeature feat)
                {
                    _utility.FeatureAdd(_rootctx, feat);
                }
            }
        }

        // Initialize features.
        foreach (var f in Features.ToList())
        {
            _utility.FeatureInit(_rootctx, f);
        }

        _utility.FeatureHook(_rootctx, "PostConstruct");
    }

    public Dictionary<string, object?> OptionsMap()
    {
        return global::Voxgig.Struct.StructUtils.Clone(_options) as Dictionary<string, object?>
            ?? new Dictionary<string, object?>();
    }

    public Utility GetUtility()
    {
        return global::Hook0Sdk.Utility.Copy(_utility);
    }

    public Context GetRootCtx()
    {
        return _rootctx;
    }

    public Dictionary<string, object?> Prepare(Dictionary<string, object?>? fetchargs)
    {
        var utility = _utility;

        fetchargs ??= new Dictionary<string, object?>();

        var ctrl = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "ctrl"))
            ?? new Dictionary<string, object?>();

        var ctx = utility.MakeContext(new Dictionary<string, object?>
        {
            ["opname"] = "prepare",
            ["ctrl"] = ctrl,
        }, _rootctx);

        var options = _options;

        var path = global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "path") as string ?? "";
        var method = global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "method") as string ?? "";
        if (method == "")
        {
            method = "GET";
        }
        method = method.ToUpperInvariant();

        var allowMethod = global::Voxgig.Struct.StructUtils.GetPath(options, global::Voxgig.Struct.StructUtils.Jt("allow", "method"));
        if (!global::Hook0Sdk.Helpers.Allowed(allowMethod, method))
        {
            throw ctx.MakeError("spec_method_allow",
                "Method \"" + method + "\" not allowed by SDK option allow.method value: \"" +
                (allowMethod as string ?? "") + "\"");
        }

        var pathParams = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "params"))
            ?? new Dictionary<string, object?>();
        var query = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "query"))
            ?? new Dictionary<string, object?>();

        var headers = utility.PrepareHeaders(ctx);

        var basev = global::Voxgig.Struct.StructUtils.GetProp(options, "base") as string ?? "";
        var prefix = global::Voxgig.Struct.StructUtils.GetProp(options, "prefix") as string ?? "";
        var suffix = global::Voxgig.Struct.StructUtils.GetProp(options, "suffix") as string ?? "";

        ctx.Spec = new Spec(new Dictionary<string, object?>
        {
            ["base"] = basev,
            ["prefix"] = prefix,
            ["suffix"] = suffix,
            ["path"] = path,
            ["method"] = method,
            ["params"] = pathParams,
            ["query"] = query,
            ["headers"] = headers,
            ["body"] = global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "body"),
            ["step"] = "start",
        });

        // Merge user-provided headers.
        if (global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "headers") is Dictionary<string, object?> uhm)
        {
            foreach (var kv in uhm)
            {
                ctx.Spec.Headers[kv.Key] = kv.Value;
            }
        }

        utility.PrepareAuth(ctx);

        return utility.MakeFetchDef(ctx);
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public Dictionary<string, object?> Direct(Dictionary<string, object?>? fetchargs)
    {
        if (!OpAllowed("direct"))
        {
            return OpDenied("direct");
        }

        return RawRequest(fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private bool OpAllowed(string op)
    {
        return global::Hook0Sdk.Helpers.Allowed(
            global::Voxgig.Struct.StructUtils.GetPath(_options, global::Voxgig.Struct.StructUtils.Jt("allow", "op")), op);
    }

    private Dictionary<string, object?> OpDenied(string op)
    {
        var allow = global::Voxgig.Struct.StructUtils.GetPath(_options, global::Voxgig.Struct.StructUtils.Jt("allow", "op"))
            as string ?? "";
        return new Dictionary<string, object?>
        {
            ["ok"] = false,
            ["err"] = new Exception("Hook0SDK: " + op +
                ": operation not allowed by SDK option allow.op value: \"" +
                allow + "\""),
        };
    }

    // Ungated request path shared by Direct and Graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private Dictionary<string, object?> RawRequest(Dictionary<string, object?>? fetchargs)
    {
        var utility = _utility;

        Dictionary<string, object?> fetchdef;
        try
        {
            fetchdef = Prepare(fetchargs);
        }
        catch (Exception err)
        {
            return new Dictionary<string, object?>
            {
                ["ok"] = false,
                ["err"] = CleanErr(_rootctx, err),
            };
        }

        fetchargs ??= new Dictionary<string, object?>();

        var ctrl = global::Hook0Sdk.Helpers.ToMapAny(global::Voxgig.Struct.StructUtils.GetProp(fetchargs, "ctrl"))
            ?? new Dictionary<string, object?>();

        var ctx = utility.MakeContext(new Dictionary<string, object?>
        {
            ["opname"] = "direct",
            ["ctrl"] = ctrl,
        }, _rootctx);

        var url = fetchdef.TryGetValue("url", out var u) ? u as string ?? "" : "";

        object? fetched;
        try
        {
            fetched = utility.Fetcher(ctx, url, fetchdef);
        }
        catch (Exception fetchErr)
        {
            return new Dictionary<string, object?>
            {
                ["ok"] = false,
                ["err"] = CleanErr(ctx, fetchErr),
            };
        }

        if (fetched == null)
        {
            return new Dictionary<string, object?>
            {
                ["ok"] = false,
                ["err"] = ctx.MakeError("direct_no_response", "response: undefined"),
            };
        }

        if (fetched is Dictionary<string, object?> fm)
        {
            var status = global::Hook0Sdk.Helpers.ToInt(global::Voxgig.Struct.StructUtils.GetProp(fm, "status"));
            var headers = global::Voxgig.Struct.StructUtils.GetProp(fm, "headers");

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing - calling json() on an empty body errors.
            var contentLength = "";
            if (headers is Dictionary<string, object?> hm &&
                hm.TryGetValue("content-length", out var cl) && cl != null)
            {
                contentLength = global::Voxgig.Struct.StructUtils.Stringify(cl);
            }
            var noBody = status == 204 || status == 304 || contentLength == "0";

            object? jsonData = null;
            if (!noBody && global::Voxgig.Struct.StructUtils.GetProp(fm, "json") is Func<object?> jf)
            {
                // jf() returns null on parse error in our fetcher.
                jsonData = jf();
            }

            Exception? bodyErr = null;
            if (!noBody && global::Voxgig.Struct.StructUtils.GetProp(fm, "unreadable") is true)
            {
                var failed = status >= 200 && status < 300 ? null : ctx.MakeError("request_status",
                    "request: " + status + ": " + global::Voxgig.Struct.StructUtils.GetProp(fm, "statusText"));
                bodyErr = global::Hook0Sdk.Response.UnreadableBody(ctx, status, headers,
                    global::Voxgig.Struct.StructUtils.GetProp(fm, "body"),
                    fetchdef.TryGetValue("headers", out var sent) ? sent : null, failed);
            }

            var direct = new Dictionary<string, object?>
            {
                ["ok"] = bodyErr == null && status >= 200 && status < 300,
                ["status"] = status,
                ["headers"] = headers,
                ["data"] = jsonData,
            };
            if (bodyErr != null)
            {
                direct["err"] = CleanErr(ctx, bodyErr);
            }
            return direct;
        }

        return new Dictionary<string, object?>
        {
            ["ok"] = false,
            ["err"] = ctx.MakeError("direct_invalid", "invalid response type"),
        };
    }

    // A raw request returns its error rather than passing it through MakeError.
    private Exception CleanErr(Context ctx, Exception err)
    {
        return _utility.Clean(ctx, err) as Exception ?? err;
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path Direct uses, with the
    // one thing raw Direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like Direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public Dictionary<string, object?> Graphql(string query,
        Dictionary<string, object?>? variables = null,
        Dictionary<string, object?>? ctrl = null)
    {
        if (!OpAllowed("graphql"))
        {
            return OpDenied("graphql");
        }

        var res = RawRequest(new Dictionary<string, object?>
        {
            ["method"] = "POST",
            ["headers"] = new Dictionary<string, object?>
            {
                ["content-type"] = "application/json",
            },
            ["body"] = new Dictionary<string, object?>
            {
                ["query"] = query,
                ["variables"] = variables ?? new Dictionary<string, object?>(),
            },
            ["ctrl"] = ctrl ?? new Dictionary<string, object?>(),
        });

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        var errors = global::Voxgig.Struct.StructUtils.GetPath(res, global::Voxgig.Struct.StructUtils.Jt("data", "errors"))
            as List<object?>;

        if (null != errors && 0 < errors.Count)
        {
            var msg = global::Voxgig.Struct.StructUtils.GetProp(errors[0], "message") as string;
            if (string.IsNullOrEmpty(msg))
            {
                msg = "graphql error";
            }
            res["ok"] = false;
            res["err"] = new Exception("Hook0SDK: graphql: " + msg);
            res["graphql"] = errors;
        }

        return res;
    }


    // Application returns a Application entity bound to this client.
    // Idiomatic usage: client.Application().List(null) or
    // client.Application().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Application(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.ApplicationEntity(this, entopts);
    }

    // ApplicationSecret returns a ApplicationSecret entity bound to this client.
    // Idiomatic usage: client.ApplicationSecret().List(null) or
    // client.ApplicationSecret().Load(new() { ["id"] = ... }).
    public Hook0EntityBase ApplicationSecret(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.ApplicationSecretEntity(this, entopts);
    }

    // EmailPreference returns a EmailPreference entity bound to this client.
    // Idiomatic usage: client.EmailPreference().List(null) or
    // client.EmailPreference().Load(new() { ["id"] = ... }).
    public Hook0EntityBase EmailPreference(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.EmailPreferenceEntity(this, entopts);
    }

    // Error returns a Error entity bound to this client.
    // Idiomatic usage: client.Error().List(null) or
    // client.Error().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Error(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.ErrorEntity(this, entopts);
    }

    // Event returns a Event entity bound to this client.
    // Idiomatic usage: client.Event().List(null) or
    // client.Event().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Event(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.EventEntity(this, entopts);
    }

    // EventType returns a EventType entity bound to this client.
    // Idiomatic usage: client.EventType().List(null) or
    // client.EventType().Load(new() { ["id"] = ... }).
    public Hook0EntityBase EventType(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.EventTypeEntity(this, entopts);
    }

    // EventsManagement returns a EventsManagement entity bound to this client.
    // Idiomatic usage: client.EventsManagement().List(null) or
    // client.EventsManagement().Load(new() { ["id"] = ... }).
    public Hook0EntityBase EventsManagement(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.EventsManagementEntity(this, entopts);
    }

    // Health returns a Health entity bound to this client.
    // Idiomatic usage: client.Health().List(null) or
    // client.Health().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Health(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.HealthEntity(this, entopts);
    }

    // Hook0 returns a Hook0 entity bound to this client.
    // Idiomatic usage: client.Hook0().List(null) or
    // client.Hook0().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Hook0(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.Hook0Entity(this, entopts);
    }

    // IngestedEvent returns a IngestedEvent entity bound to this client.
    // Idiomatic usage: client.IngestedEvent().List(null) or
    // client.IngestedEvent().Load(new() { ["id"] = ... }).
    public Hook0EntityBase IngestedEvent(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.IngestedEventEntity(this, entopts);
    }

    // Instance returns a Instance entity bound to this client.
    // Idiomatic usage: client.Instance().List(null) or
    // client.Instance().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Instance(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.InstanceEntity(this, entopts);
    }

    // Login returns a Login entity bound to this client.
    // Idiomatic usage: client.Login().List(null) or
    // client.Login().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Login(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.LoginEntity(this, entopts);
    }

    // Organization returns a Organization entity bound to this client.
    // Idiomatic usage: client.Organization().List(null) or
    // client.Organization().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Organization(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.OrganizationEntity(this, entopts);
    }

    // OrganizationEditRole returns a OrganizationEditRole entity bound to this client.
    // Idiomatic usage: client.OrganizationEditRole().List(null) or
    // client.OrganizationEditRole().Load(new() { ["id"] = ... }).
    public Hook0EntityBase OrganizationEditRole(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.OrganizationEditRoleEntity(this, entopts);
    }

    // Quota returns a Quota entity bound to this client.
    // Idiomatic usage: client.Quota().List(null) or
    // client.Quota().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Quota(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.QuotaEntity(this, entopts);
    }

    // Registration returns a Registration entity bound to this client.
    // Idiomatic usage: client.Registration().List(null) or
    // client.Registration().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Registration(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.RegistrationEntity(this, entopts);
    }

    // RequestAttempt returns a RequestAttempt entity bound to this client.
    // Idiomatic usage: client.RequestAttempt().List(null) or
    // client.RequestAttempt().Load(new() { ["id"] = ... }).
    public Hook0EntityBase RequestAttempt(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.RequestAttemptEntity(this, entopts);
    }

    // Response returns a Response entity bound to this client.
    // Idiomatic usage: client.Response().List(null) or
    // client.Response().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Response(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.ResponseEntity(this, entopts);
    }

    // Revoke returns a Revoke entity bound to this client.
    // Idiomatic usage: client.Revoke().List(null) or
    // client.Revoke().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Revoke(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.RevokeEntity(this, entopts);
    }

    // ServiceToken returns a ServiceToken entity bound to this client.
    // Idiomatic usage: client.ServiceToken().List(null) or
    // client.ServiceToken().Load(new() { ["id"] = ... }).
    public Hook0EntityBase ServiceToken(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.ServiceTokenEntity(this, entopts);
    }

    // Subscription returns a Subscription entity bound to this client.
    // Idiomatic usage: client.Subscription().List(null) or
    // client.Subscription().Load(new() { ["id"] = ... }).
    public Hook0EntityBase Subscription(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.SubscriptionEntity(this, entopts);
    }

    // UserAuthentication returns a UserAuthentication entity bound to this client.
    // Idiomatic usage: client.UserAuthentication().List(null) or
    // client.UserAuthentication().Load(new() { ["id"] = ... }).
    public Hook0EntityBase UserAuthentication(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.UserAuthenticationEntity(this, entopts);
    }

    // UserInvitation returns a UserInvitation entity bound to this client.
    // Idiomatic usage: client.UserInvitation().List(null) or
    // client.UserInvitation().Load(new() { ["id"] = ... }).
    public Hook0EntityBase UserInvitation(Dictionary<string, object?>? entopts = null)
    {
        return new global::Hook0Sdk.Entity.UserInvitationEntity(this, entopts);
    }


    public static Hook0SDK TestSDK(Dictionary<string, object?>? testopts,
        Dictionary<string, object?>? sdkopts)
    {
        sdkopts = global::Voxgig.Struct.StructUtils.Clone(sdkopts ?? new Dictionary<string, object?>())
            as Dictionary<string, object?> ?? new Dictionary<string, object?>();

        testopts = global::Voxgig.Struct.StructUtils.Clone(testopts ?? new Dictionary<string, object?>())
            as Dictionary<string, object?> ?? new Dictionary<string, object?>();
        testopts["active"] = true;

        global::Voxgig.Struct.StructUtils.SetPath(sdkopts, global::Voxgig.Struct.StructUtils.Jt("feature", "test"), testopts);

        var sdk = new Hook0SDK(sdkopts)
        {
            Mode = "test",
        };

        return sdk;
    }
}
