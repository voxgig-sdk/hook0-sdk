// Hook0SDK client (generated — mirrors the go/rust Main fragment).

const std = @import("std");
const vs = @import("voxgig-struct");
const h = @import("helpers.zig");
const errmod = @import("error.zig");
const types = @import("types.zig");
const ctxmod = @import("context.zig");
const utility_mod = @import("utility.zig");
const spec_mod = @import("spec.zig");
const config = @import("config.zig");

const Value = h.Value;
const E = errmod.E;
const Context = ctxmod.Context;
const CtxSpec = ctxmod.CtxSpec;
const Utility = utility_mod.Utility;
const Feature = types.Feature;
const OpResult = types.OpResult;
const Spec = spec_mod.Spec;

pub const Hook0SDK = struct {
    mode: []const u8 = "live",
    options: Value = .{ .null = {} },
    utility: *Utility,
    features: std.ArrayList(Feature),
    rootctx: ?*Context = null,

    pub fn new(options: Value) *Hook0SDK {
        const sdk = h.A().create(Hook0SDK) catch unreachable;
        sdk.* = .{
            .mode = "live",
            .options = h.vnull(),
            .utility = Utility.new(),
            .features = std.ArrayList(Feature).init(h.A()),
            .rootctx = null,
        };

        const cfg = config.make_config();

        const rootctx = sdk.utility.make_context(CtxSpec{
            .client = sdk,
            .utility = sdk.utility,
            .config = cfg,
            .options = options,
            .shared = h.omap(),
        }, null);

        const opts = sdk.utility.make_options(rootctx);
        sdk.options = opts;

        if (h.veq(h.getpath(&.{ "feature", "test", "active" }, opts), h.vbool(true))) {
            sdk.mode = "test";
        }

        rootctx.options = opts;
        sdk.rootctx = rootctx;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the
        // transport features (retry/cache/netsim/proxy/ratelimit) wrap
        // whatever is current, so `test` must be added before them to sit at
        // the base of the transport wrapper chain.
        const feature_opts = h.to_map(h.getp(opts, "feature"));
        const feature_order = h.getpath(&.{ "__derived__", "featureorder" }, opts);
        if (feature_opts == .object and feature_order == .array) {
            for (feature_order.array.data.items) |fname_v| {
                if (fname_v != .string) continue;
                const fname = fname_v.string;
                const fopts = h.getp(feature_opts, fname);
                if (fopts == .object) {
                    if (h.get_bool(fopts, "active") orelse false) {
                        sdk.utility.feature_add(rootctx, config.make_feature(fname));
                    }
                }
            }
        }

        // Initialize features.
        var snap = std.ArrayList(Feature).init(h.A());
        for (sdk.features.items) |f| snap.append(f) catch {};
        for (snap.items) |f| sdk.utility.feature_init(rootctx, f);

        sdk.utility.feature_hook(rootctx, "PostConstruct");

        return sdk;
    }

    pub fn options_map(self: *Hook0SDK) Value {
        return h.clone(self.options);
    }

    pub fn get_utility(self: *Hook0SDK) *Utility {
        return Utility.copy(self.utility);
    }

    pub fn get_root_ctx(self: *Hook0SDK) *Context {
        return self.rootctx orelse unreachable;
    }

    pub fn prepare(self: *Hook0SDK, fetchargs_in: Value) E!Value {
        const utility = self.utility;

        const fetchargs: Value = switch (fetchargs_in) {
            .object => fetchargs_in,
            else => h.omap(),
        };

        const ctrl: Value = switch (h.to_map(h.getp(fetchargs, "ctrl"))) {
            .object => h.to_map(h.getp(fetchargs, "ctrl")),
            else => h.omap(),
        };

        const ctx = utility.make_context(CtxSpec{
            .opname = "prepare",
            .ctrl = ctrl,
        }, self.get_root_ctx());

        const options = self.options;

        const path = h.get_str(fetchargs, "path") orelse "";
        const method: []const u8 = blk: {
            const m = h.get_str(fetchargs, "method");
            break :blk if (m) |mm| (if (mm.len == 0) "GET" else mm) else "GET";
        };

        const params: Value = switch (h.to_map(h.getp(fetchargs, "params"))) {
            .object => h.to_map(h.getp(fetchargs, "params")),
            else => h.omap(),
        };
        const query: Value = switch (h.to_map(h.getp(fetchargs, "query"))) {
            .object => h.to_map(h.getp(fetchargs, "query")),
            else => h.omap(),
        };

        const headers = utility.prepare_headers(ctx);

        const specmap = h.jo(&.{
            .{ "base", h.getp(options, "base") },
            .{ "prefix", h.getp(options, "prefix") },
            .{ "suffix", h.getp(options, "suffix") },
            .{ "path", h.vstr(path) },
            .{ "method", h.vstr(method) },
            .{ "params", params },
            .{ "query", query },
            .{ "headers", headers },
            .{ "body", h.getp(fetchargs, "body") },
            .{ "step", h.vstr("start") },
        });
        const spec = Spec.make(specmap);
        ctx.spec = spec;

        // Merge user-provided headers.
        if (h.getp(fetchargs, "headers") == .object) {
            const uh = h.getp(fetchargs, "headers");
            var it = uh.object.iterator();
            while (it.next()) |kv| h.setp(spec.headers, kv.key_ptr.*, kv.value_ptr.*);
        }

        _ = try utility.prepare_auth(ctx);

        return utility.make_fetch_def(ctx);
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    pub fn direct(self: *Hook0SDK, fetchargs_in: Value) Value {
        if (!self.op_allowed("direct")) return self.op_denied("direct");

        return self.raw_request(fetchargs_in);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    fn op_allowed(self: *Hook0SDK, op: []const u8) bool {
        const allow: []const u8 = switch (h.getpath(&.{ "allow", "op" }, self.options)) {
            .string => |s| s,
            else => "",
        };
        return std.mem.indexOf(u8, allow, op) != null;
    }

    fn op_denied(self: *Hook0SDK, op: []const u8) Value {
        const allow: []const u8 = switch (h.getpath(&.{ "allow", "op" }, self.options)) {
            .string => |s| s,
            else => "",
        };
        const msg = std.fmt.allocPrint(h.A(),
            "Hook0SDK: {s}: operation not allowed by" ++
            " SDK option allow.op value: \"{s}\"", .{ op, allow }) catch "";
        return h.jo(&.{
            .{ "ok", h.vbool(false) },
            .{ "err", h.vstr(msg) },
        });
    }

    // Ungated request path shared by direct and graphql, each of which checks
    // its own allow.op token first. Private, rather than a flag on fetchargs:
    // a caller-supplied marker would let anyone opt straight back out of the
    // gate by passing it.
    fn raw_request(self: *Hook0SDK, fetchargs_in: Value) Value {
        const utility = self.utility;

        const fetchdef = self.prepare(fetchargs_in) catch {
            return h.jo(&.{
                .{ "ok", h.vbool(false) },
                .{ "err", h.vstr(if (self.rootctx.?.pending_err) |e| e.msg else "prepare failed") },
            });
        };

        const fetchargs: Value = switch (fetchargs_in) {
            .object => fetchargs_in,
            else => h.omap(),
        };
        const ctrl: Value = switch (h.to_map(h.getp(fetchargs, "ctrl"))) {
            .object => h.to_map(h.getp(fetchargs, "ctrl")),
            else => h.omap(),
        };

        const ctx = utility.make_context(CtxSpec{
            .opname = "direct",
            .ctrl = ctrl,
        }, self.get_root_ctx());

        const url = h.get_str(fetchdef, "url") orelse "";
        const fetched = utility.fetch(ctx, url, fetchdef) catch {
            return h.jo(&.{
                .{ "ok", h.vbool(false) },
                .{ "err", h.vstr(if (ctx.pending_err) |e| e.msg else "fetch failed") },
            });
        };

        if (h.is_noval(fetched)) {
            return h.jo(&.{
                .{ "ok", h.vbool(false) },
                .{ "err", h.vstr("response: undefined") },
            });
        }

        if (fetched == .object) {
            const status = h.to_int(h.getp(fetched, "status"));
            const headers = h.getp(fetched, "headers");

            const content_length: []const u8 = switch (h.getp(headers, "content-length")) {
                .string => |s| s,
                .integer => |n| std.fmt.allocPrint(h.A(), "{d}", .{n}) catch "",
                else => "",
            };
            const no_body = status == 204 or status == 304 or std.mem.eql(u8, content_length, "0");

            const json_data: Value = if (no_body) h.vnull() else blk: {
                const jf = h.getp(fetched, "json");
                break :blk if (jf == .function) h.call_json(jf) else h.vnull();
            };

            return h.jo(&.{
                .{ "ok", h.vbool(200 <= status and status < 300) },
                .{ "status", h.vnum(status) },
                .{ "headers", headers },
                .{ "data", json_data },
            });
        }

        return h.jo(&.{
            .{ "ok", h.vbool(false) },
            .{ "err", h.vstr("invalid response type") },
        });
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the one
    // thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP
    // 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    pub fn graphql(
        self: *Hook0SDK, query: []const u8, variables: Value, ctrl: Value,
    ) Value {
        if (!self.op_allowed("graphql")) return self.op_denied("graphql");

        const vars: Value = switch (variables) {
            .object => variables,
            else => h.omap(),
        };
        const ctl: Value = switch (ctrl) {
            .object => ctrl,
            else => h.omap(),
        };

        const res = self.raw_request(h.jo(&.{
            .{ "method", h.vstr("POST") },
            .{ "headers", h.jo(&.{.{ "content-type", h.vstr(utility_mod.GRAPHQL_CONTENT_TYPE) }}) },
            .{ "body", h.jo(&.{ .{ "query", h.vstr(query) }, .{ "variables", vars } }) },
            .{ "ctrl", ctl },
        }));

        if (res != .object) return res;

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        const errors = h.getp(h.getp(res, "data"), "errors");

        if (errors == .array and 0 < errors.array.data.items.len) {
            const first = errors.array.data.items[0];
            const m: []const u8 = switch (h.getp(first, "message")) {
                .string => |x| if (x.len == 0) "graphql error" else x,
                else => "graphql error",
            };
            const msg = std.fmt.allocPrint(h.A(),
                "Hook0SDK: graphql: {s}", .{m}) catch "";
            h.setp(res, "ok", h.vbool(false));
            h.setp(res, "err", h.vstr(msg));
            h.setp(res, "graphql", errors);
        }

        return res;
    }


    /// Application entity bound to this client.
    pub fn application(self: *@This(), entopts: Value) *@import("../entity/application.zig").ApplicationEntity {
        return @import("../entity/application.zig").ApplicationEntity.new(self, entopts);
    }

    /// ApplicationSecret entity bound to this client.
    pub fn application_secret(self: *@This(), entopts: Value) *@import("../entity/application_secret.zig").ApplicationSecretEntity {
        return @import("../entity/application_secret.zig").ApplicationSecretEntity.new(self, entopts);
    }

    /// ApplicationsManagement entity bound to this client.
    pub fn applications_management(self: *@This(), entopts: Value) *@import("../entity/applications_management.zig").ApplicationsManagementEntity {
        return @import("../entity/applications_management.zig").ApplicationsManagementEntity.new(self, entopts);
    }

    /// Event entity bound to this client.
    pub fn event(self: *@This(), entopts: Value) *@import("../entity/event.zig").EventEntity {
        return @import("../entity/event.zig").EventEntity.new(self, entopts);
    }

    /// EventType entity bound to this client.
    pub fn event_type(self: *@This(), entopts: Value) *@import("../entity/event_type.zig").EventTypeEntity {
        return @import("../entity/event_type.zig").EventTypeEntity.new(self, entopts);
    }

    /// EventsManagement entity bound to this client.
    pub fn events_management(self: *@This(), entopts: Value) *@import("../entity/events_management.zig").EventsManagementEntity {
        return @import("../entity/events_management.zig").EventsManagementEntity.new(self, entopts);
    }

    /// EventsPerDayEntry entity bound to this client.
    pub fn events_per_day_entry(self: *@This(), entopts: Value) *@import("../entity/events_per_day_entry.zig").EventsPerDayEntryEntity {
        return @import("../entity/events_per_day_entry.zig").EventsPerDayEntryEntity.new(self, entopts);
    }

    /// Health entity bound to this client.
    pub fn health(self: *@This(), entopts: Value) *@import("../entity/health.zig").HealthEntity {
        return @import("../entity/health.zig").HealthEntity.new(self, entopts);
    }

    /// Hook0 entity bound to this client.
    pub fn hook0(self: *@This(), entopts: Value) *@import("../entity/hook0.zig").Hook0Entity {
        return @import("../entity/hook0.zig").Hook0Entity.new(self, entopts);
    }

    /// IngestedEvent entity bound to this client.
    pub fn ingested_event(self: *@This(), entopts: Value) *@import("../entity/ingested_event.zig").IngestedEventEntity {
        return @import("../entity/ingested_event.zig").IngestedEventEntity.new(self, entopts);
    }

    /// Instance entity bound to this client.
    pub fn instance(self: *@This(), entopts: Value) *@import("../entity/instance.zig").InstanceEntity {
        return @import("../entity/instance.zig").InstanceEntity.new(self, entopts);
    }

    /// Login entity bound to this client.
    pub fn login(self: *@This(), entopts: Value) *@import("../entity/login.zig").LoginEntity {
        return @import("../entity/login.zig").LoginEntity.new(self, entopts);
    }

    /// Organization entity bound to this client.
    pub fn organization(self: *@This(), entopts: Value) *@import("../entity/organization.zig").OrganizationEntity {
        return @import("../entity/organization.zig").OrganizationEntity.new(self, entopts);
    }

    /// OrganizationEditRole entity bound to this client.
    pub fn organization_edit_role(self: *@This(), entopts: Value) *@import("../entity/organization_edit_role.zig").OrganizationEditRoleEntity {
        return @import("../entity/organization_edit_role.zig").OrganizationEditRoleEntity.new(self, entopts);
    }

    /// Problem entity bound to this client.
    pub fn problem(self: *@This(), entopts: Value) *@import("../entity/problem.zig").ProblemEntity {
        return @import("../entity/problem.zig").ProblemEntity.new(self, entopts);
    }

    /// Quota entity bound to this client.
    pub fn quota(self: *@This(), entopts: Value) *@import("../entity/quota.zig").QuotaEntity {
        return @import("../entity/quota.zig").QuotaEntity.new(self, entopts);
    }

    /// Registration entity bound to this client.
    pub fn registration(self: *@This(), entopts: Value) *@import("../entity/registration.zig").RegistrationEntity {
        return @import("../entity/registration.zig").RegistrationEntity.new(self, entopts);
    }

    /// RequestAttempt entity bound to this client.
    pub fn request_attempt(self: *@This(), entopts: Value) *@import("../entity/request_attempt.zig").RequestAttemptEntity {
        return @import("../entity/request_attempt.zig").RequestAttemptEntity.new(self, entopts);
    }

    /// Response entity bound to this client.
    pub fn response(self: *@This(), entopts: Value) *@import("../entity/response.zig").ResponseEntity {
        return @import("../entity/response.zig").ResponseEntity.new(self, entopts);
    }

    /// Revoke entity bound to this client.
    pub fn revoke(self: *@This(), entopts: Value) *@import("../entity/revoke.zig").RevokeEntity {
        return @import("../entity/revoke.zig").RevokeEntity.new(self, entopts);
    }

    /// ServiceToken entity bound to this client.
    pub fn service_token(self: *@This(), entopts: Value) *@import("../entity/service_token.zig").ServiceTokenEntity {
        return @import("../entity/service_token.zig").ServiceTokenEntity.new(self, entopts);
    }

    /// Subscription entity bound to this client.
    pub fn subscription(self: *@This(), entopts: Value) *@import("../entity/subscription.zig").SubscriptionEntity {
        return @import("../entity/subscription.zig").SubscriptionEntity.new(self, entopts);
    }

    /// UserAuthentication entity bound to this client.
    pub fn user_authentication(self: *@This(), entopts: Value) *@import("../entity/user_authentication.zig").UserAuthenticationEntity {
        return @import("../entity/user_authentication.zig").UserAuthenticationEntity.new(self, entopts);
    }

    /// UserInvitation entity bound to this client.
    pub fn user_invitation(self: *@This(), entopts: Value) *@import("../entity/user_invitation.zig").UserInvitationEntity {
        return @import("../entity/user_invitation.zig").UserInvitationEntity.new(self, entopts);
    }

};

pub fn test_sdk(testopts_in: Value, sdkopts_in: Value) *Hook0SDK {
    const sdkopts: Value = switch (sdkopts_in) {
        .object => h.clone(sdkopts_in),
        else => h.omap(),
    };

    const testopts: Value = switch (testopts_in) {
        .object => h.clone(testopts_in),
        else => h.omap(),
    };
    h.setp(testopts, "active", h.vbool(true));

    // set_path mutates `sdkopts` in place; keep the ROOT (gotcha #8 — do not
    // rebind to the return of setpath).
    h.setpath(sdkopts, &.{ "feature", "test" }, testopts);

    const sdk = Hook0SDK.new(sdkopts);
    sdk.mode = "test";

    return sdk;
}
