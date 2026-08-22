# Hook0 SDK

from hook0_sdk.utility.voxgig_struct import voxgig_struct as vs
from hook0_sdk.core.utility_type import Hook0Utility
from hook0_sdk.core.spec import Hook0Spec
from hook0_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from hook0_sdk.utility import register

# Load features
from hook0_sdk.feature.base_feature import Hook0BaseFeature
from hook0_sdk.features import _has_feature, _make_feature


class Hook0SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = Hook0Utility()
        self._utility = utility

        from hook0_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return Hook0Utility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = Hook0Spec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "Hook0SDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("Hook0SDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Application(self, data=None) -> "ApplicationEntity":
        """Entity factory: client.Application().list() / client.Application().load({"id": ...})."""
        from hook0_sdk.entity.application_entity import ApplicationEntity
        return ApplicationEntity(self, data)


    def ApplicationSecret(self, data=None) -> "ApplicationSecretEntity":
        """Entity factory: client.ApplicationSecret().list() / client.ApplicationSecret().load({"id": ...})."""
        from hook0_sdk.entity.application_secret_entity import ApplicationSecretEntity
        return ApplicationSecretEntity(self, data)


    def ApplicationsManagement(self, data=None) -> "ApplicationsManagementEntity":
        """Entity factory: client.ApplicationsManagement().list() / client.ApplicationsManagement().load({"id": ...})."""
        from hook0_sdk.entity.applications_management_entity import ApplicationsManagementEntity
        return ApplicationsManagementEntity(self, data)


    def Event(self, data=None) -> "EventEntity":
        """Entity factory: client.Event().list() / client.Event().load({"id": ...})."""
        from hook0_sdk.entity.event_entity import EventEntity
        return EventEntity(self, data)


    def EventType(self, data=None) -> "EventTypeEntity":
        """Entity factory: client.EventType().list() / client.EventType().load({"id": ...})."""
        from hook0_sdk.entity.event_type_entity import EventTypeEntity
        return EventTypeEntity(self, data)


    def EventsManagement(self, data=None) -> "EventsManagementEntity":
        """Entity factory: client.EventsManagement().list() / client.EventsManagement().load({"id": ...})."""
        from hook0_sdk.entity.events_management_entity import EventsManagementEntity
        return EventsManagementEntity(self, data)


    def EventsPerDayEntry(self, data=None) -> "EventsPerDayEntryEntity":
        """Entity factory: client.EventsPerDayEntry().list() / client.EventsPerDayEntry().load({"id": ...})."""
        from hook0_sdk.entity.events_per_day_entry_entity import EventsPerDayEntryEntity
        return EventsPerDayEntryEntity(self, data)


    def Health(self, data=None) -> "HealthEntity":
        """Entity factory: client.Health().list() / client.Health().load({"id": ...})."""
        from hook0_sdk.entity.health_entity import HealthEntity
        return HealthEntity(self, data)


    def Hook0(self, data=None) -> "Hook0Entity":
        """Entity factory: client.Hook0().list() / client.Hook0().load({"id": ...})."""
        from hook0_sdk.entity.hook0_entity import Hook0Entity
        return Hook0Entity(self, data)


    def IngestedEvent(self, data=None) -> "IngestedEventEntity":
        """Entity factory: client.IngestedEvent().list() / client.IngestedEvent().load({"id": ...})."""
        from hook0_sdk.entity.ingested_event_entity import IngestedEventEntity
        return IngestedEventEntity(self, data)


    def Instance(self, data=None) -> "InstanceEntity":
        """Entity factory: client.Instance().list() / client.Instance().load({"id": ...})."""
        from hook0_sdk.entity.instance_entity import InstanceEntity
        return InstanceEntity(self, data)


    def Login(self, data=None) -> "LoginEntity":
        """Entity factory: client.Login().list() / client.Login().load({"id": ...})."""
        from hook0_sdk.entity.login_entity import LoginEntity
        return LoginEntity(self, data)


    def Organization(self, data=None) -> "OrganizationEntity":
        """Entity factory: client.Organization().list() / client.Organization().load({"id": ...})."""
        from hook0_sdk.entity.organization_entity import OrganizationEntity
        return OrganizationEntity(self, data)


    def OrganizationEditRole(self, data=None) -> "OrganizationEditRoleEntity":
        """Entity factory: client.OrganizationEditRole().list() / client.OrganizationEditRole().load({"id": ...})."""
        from hook0_sdk.entity.organization_edit_role_entity import OrganizationEditRoleEntity
        return OrganizationEditRoleEntity(self, data)


    def Problem(self, data=None) -> "ProblemEntity":
        """Entity factory: client.Problem().list() / client.Problem().load({"id": ...})."""
        from hook0_sdk.entity.problem_entity import ProblemEntity
        return ProblemEntity(self, data)


    def Quota(self, data=None) -> "QuotaEntity":
        """Entity factory: client.Quota().list() / client.Quota().load({"id": ...})."""
        from hook0_sdk.entity.quota_entity import QuotaEntity
        return QuotaEntity(self, data)


    def Registration(self, data=None) -> "RegistrationEntity":
        """Entity factory: client.Registration().list() / client.Registration().load({"id": ...})."""
        from hook0_sdk.entity.registration_entity import RegistrationEntity
        return RegistrationEntity(self, data)


    def RequestAttempt(self, data=None) -> "RequestAttemptEntity":
        """Entity factory: client.RequestAttempt().list() / client.RequestAttempt().load({"id": ...})."""
        from hook0_sdk.entity.request_attempt_entity import RequestAttemptEntity
        return RequestAttemptEntity(self, data)


    def Response(self, data=None) -> "ResponseEntity":
        """Entity factory: client.Response().list() / client.Response().load({"id": ...})."""
        from hook0_sdk.entity.response_entity import ResponseEntity
        return ResponseEntity(self, data)


    def Revoke(self, data=None) -> "RevokeEntity":
        """Entity factory: client.Revoke().list() / client.Revoke().load({"id": ...})."""
        from hook0_sdk.entity.revoke_entity import RevokeEntity
        return RevokeEntity(self, data)


    def ServiceToken(self, data=None) -> "ServiceTokenEntity":
        """Entity factory: client.ServiceToken().list() / client.ServiceToken().load({"id": ...})."""
        from hook0_sdk.entity.service_token_entity import ServiceTokenEntity
        return ServiceTokenEntity(self, data)


    def Subscription(self, data=None) -> "SubscriptionEntity":
        """Entity factory: client.Subscription().list() / client.Subscription().load({"id": ...})."""
        from hook0_sdk.entity.subscription_entity import SubscriptionEntity
        return SubscriptionEntity(self, data)


    def UserAuthentication(self, data=None) -> "UserAuthenticationEntity":
        """Entity factory: client.UserAuthentication().list() / client.UserAuthentication().load({"id": ...})."""
        from hook0_sdk.entity.user_authentication_entity import UserAuthenticationEntity
        return UserAuthenticationEntity(self, data)


    def UserInvitation(self, data=None) -> "UserInvitationEntity":
        """Entity factory: client.UserInvitation().list() / client.UserInvitation().load({"id": ...})."""
        from hook0_sdk.entity.user_invitation_entity import UserInvitationEntity
        return UserInvitationEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "Hook0SDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from hook0_sdk.entity.application_entity import ApplicationEntity
    from hook0_sdk.entity.application_secret_entity import ApplicationSecretEntity
    from hook0_sdk.entity.applications_management_entity import ApplicationsManagementEntity
    from hook0_sdk.entity.event_entity import EventEntity
    from hook0_sdk.entity.event_type_entity import EventTypeEntity
    from hook0_sdk.entity.events_management_entity import EventsManagementEntity
    from hook0_sdk.entity.events_per_day_entry_entity import EventsPerDayEntryEntity
    from hook0_sdk.entity.health_entity import HealthEntity
    from hook0_sdk.entity.hook0_entity import Hook0Entity
    from hook0_sdk.entity.ingested_event_entity import IngestedEventEntity
    from hook0_sdk.entity.instance_entity import InstanceEntity
    from hook0_sdk.entity.login_entity import LoginEntity
    from hook0_sdk.entity.organization_entity import OrganizationEntity
    from hook0_sdk.entity.organization_edit_role_entity import OrganizationEditRoleEntity
    from hook0_sdk.entity.problem_entity import ProblemEntity
    from hook0_sdk.entity.quota_entity import QuotaEntity
    from hook0_sdk.entity.registration_entity import RegistrationEntity
    from hook0_sdk.entity.request_attempt_entity import RequestAttemptEntity
    from hook0_sdk.entity.response_entity import ResponseEntity
    from hook0_sdk.entity.revoke_entity import RevokeEntity
    from hook0_sdk.entity.service_token_entity import ServiceTokenEntity
    from hook0_sdk.entity.subscription_entity import SubscriptionEntity
    from hook0_sdk.entity.user_authentication_entity import UserAuthenticationEntity
    from hook0_sdk.entity.user_invitation_entity import UserInvitationEntity
