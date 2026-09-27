// Generated API configuration (mirrors go/rust core/config).

const std = @import("std");
const h = @import("helpers.zig");
const types = @import("types.zig");
const Value = h.Value;
const Feature = types.Feature;

pub fn make_config() Value {
    return h.jo(&.{
        .{ "main", h.jo(&.{
            .{ "name", h.vstr("Hook0") },
            .{ "slug", h.vstr("hook0") },
            .{ "version", h.vstr("0.1.1") },
            .{ "target", h.vstr("zig") },
        }) },
        .{ "feature", h.jo(&.{
            .{ "debug", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "max", h.vnum(100) },
                    .{ "redact", h.ja(&.{
                        h.vstr("authorization"),
                        h.vstr("cookie"),
                        h.vstr("set-cookie"),
                        h.vstr("api-key"),
                        h.vstr("apikey"),
                        h.vstr("x-api-key"),
                        h.vstr("idempotency-key"),
                    }) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "now", h.vstr("`$FUNCTION`") },
                    .{ "onEntry", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("none") },
            }) },
            .{ "idempotency", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "header", h.vstr("Idempotency-Key") },
                    .{ "methods", h.ja(&.{
                        h.vstr("POST"),
                        h.vstr("PUT"),
                        h.vstr("PATCH"),
                        h.vstr("DELETE"),
                    }) },
                    .{ "ops", h.ja(&.{
                        h.vstr("create"),
                        h.vstr("update"),
                        h.vstr("remove"),
                    }) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "keygen", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("none") },
            }) },
            .{ "metrics", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "now", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("none") },
            }) },
            .{ "paging", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "afterVar", h.vstr("after") },
                    .{ "cursorParam", h.vstr("cursor") },
                    .{ "firstVar", h.vstr("first") },
                    .{ "limitParam", h.vstr("limit") },
                    .{ "pageParam", h.vstr("page") },
                    .{ "startPage", h.vnum(1) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "limit", h.vstr("`$NUMBER`") },
                    .{ "ops", h.vstr("`$LIST`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("none") },
            }) },
            .{ "ratelimit", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "burst", h.vnum(5) },
                    .{ "rate", h.vnum(5) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "now", h.vstr("`$FUNCTION`") },
                    .{ "sleep", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("wrap") },
            }) },
            .{ "retry", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "factor", h.vnum(2) },
                    .{ "maxDelay", h.vnum(2000) },
                    .{ "minDelay", h.vnum(50) },
                    .{ "retries", h.vnum(2) },
                    .{ "statuses", h.ja(&.{
                        h.vnum(408),
                        h.vnum(425),
                        h.vnum(429),
                        h.vnum(500),
                        h.vnum(502),
                        h.vnum(503),
                        h.vnum(504),
                    }) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "jitter", h.vstr("`$BOOLEAN`") },
                    .{ "sleep", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("wrap") },
            }) },
            .{ "test", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "entity", h.vstr("`$MAP`") },
                    .{ "net", h.vstr("`$MAP`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("base") },
            }) },
            .{ "timeout", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                    .{ "ms", h.vnum(30000) },
                }) },
                .{ "optspec", h.jo(&.{
                    .{ "clearTimer", h.vstr("`$FUNCTION`") },
                    .{ "setTimer", h.vstr("`$FUNCTION`") },
                }) },
                .{ "strict", h.vbool(false) },
                .{ "transport", h.vstr("wrap") },
            }) },
        }) },
        .{ "options", h.jo(&.{
            .{ "base", h.vstr("https://app.hook0.com") },
            .{ "auth", h.jo(&.{
                .{ "prefix", h.vstr("") },
            }) },
            .{ "headers", h.jo(&.{
                .{ "content-type", h.vstr("application/json") },
            }) },
            .{ "entity", h.jo(&.{
                .{ "application", h.omap() },
                .{ "application_secret", h.omap() },
                .{ "applications_management", h.omap() },
                .{ "event", h.omap() },
                .{ "event_type", h.omap() },
                .{ "events_management", h.omap() },
                .{ "health", h.omap() },
                .{ "hook0", h.omap() },
                .{ "ingested_event", h.omap() },
                .{ "instance", h.omap() },
                .{ "login", h.omap() },
                .{ "organization", h.omap() },
                .{ "organization_edit_role", h.omap() },
                .{ "problem", h.omap() },
                .{ "quota", h.omap() },
                .{ "registration", h.omap() },
                .{ "request_attempt", h.omap() },
                .{ "response", h.omap() },
                .{ "revoke", h.omap() },
                .{ "service_token", h.omap() },
                .{ "subscription", h.omap() },
                .{ "user_authentication", h.omap() },
                .{ "user_invitation", h.omap() },
            }) },
        }) },
        .{ "entity", h.jo(&.{
            .{ "application", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("amount") },
                        .{ "title", h.vstr("Amount") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Unique identifier of the application.") },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("application_name") },
                        .{ "title", h.vstr("Application Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("consumption") },
                        .{ "title", h.vstr("Consumption") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Current consumption metrics for this application.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("date") },
                        .{ "title", h.vstr("Date") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("is_provisional") },
                        .{ "title", h.vstr("Is Provisional") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("name") },
                        .{ "title", h.vstr("Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Name of the application.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("onboarding_steps") },
                        .{ "title", h.vstr("Onboarding Steps") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Onboarding completion status for this application.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("organization_id") },
                        .{ "title", h.vstr("Organization Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("UUID of the organization this application belongs to.") },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("quotas") },
                        .{ "title", h.vstr("Quotas") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Quota limits for this application.") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("application") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/applications/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("applications") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events_per_day/application") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("events_per_day") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("application") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events_per_day"),
                                    h.vstr("application"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("from") },
                                            .{ "orig", h.vstr("from") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("to") },
                                            .{ "orig", h.vstr("to") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("from"),
                                        h.vstr("to"),
                                    }) },
                                }) },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/applications/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("applications") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("applications") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "application_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("applications") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "application_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("applications") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "application_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "application_secret", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("created_at") },
                        .{ "title", h.vstr("Created At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("deleted_at") },
                        .{ "title", h.vstr("Deleted At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("name") },
                        .{ "title", h.vstr("Name") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("token") },
                        .{ "title", h.vstr("Token") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("application_secret") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("application_secrets") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("application_secrets") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/{application_secret_token}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("application_secrets") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "application_secret_token", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_secret_token") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "applications_management", h.jo(&.{
                .{ "fields", h.olist() },
                .{ "name", h.vstr("applications_management") },
                .{ "op", h.jo(&.{
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/{application_secret_token}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("application_secrets") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("application_secret_token") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                    h.vstr("{application_secret_token}"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_secret_token") },
                                            .{ "orig", h.vstr("application_secret_token") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("application_secret_token"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("$.main.kit.entity.application_secret"),
                        }),
                    }) },
                }) },
            }) },
            .{ "event", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("event_id") },
                        .{ "title", h.vstr("Event Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_type_name") },
                        .{ "title", h.vstr("Event Type Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("ip") },
                        .{ "title", h.vstr("Ip") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("labels") },
                        .{ "title", h.vstr("Labels") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("metadata") },
                        .{ "title", h.vstr("Metadata") },
                        .{ "type", h.vstr("`$OBJECT`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("occurred_at") },
                        .{ "title", h.vstr("Occurred At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("payload") },
                        .{ "title", h.vstr("Payload") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("payload_content_type") },
                        .{ "title", h.vstr("Payload Content Type") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("received_at") },
                        .{ "title", h.vstr("Received At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("event") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/events/{event_id}/replay") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("events") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("replay") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events"),
                                    h.vstr("{id}"),
                                    h.vstr("replay"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "event_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "$action", h.vstr("replay") },
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("events") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events/{event_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("events") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "event_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "event_type", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_type_name") },
                        .{ "title", h.vstr("Event Type Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("resource_type") },
                        .{ "title", h.vstr("Resource Type") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("resource_type_name") },
                        .{ "title", h.vstr("Resource Type Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("service") },
                        .{ "title", h.vstr("Service") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("service_name") },
                        .{ "title", h.vstr("Service Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("verb") },
                        .{ "title", h.vstr("Verb") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("verb_name") },
                        .{ "title", h.vstr("Verb Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("event_type") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/event_types/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("event_types") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/event_types/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("event_types") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/event_types/{event_type_name}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("event_types") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "event_type_name", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("event_type_name") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "events_management", h.jo(&.{
                .{ "fields", h.olist() },
                .{ "name", h.vstr("events_management") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/payload_content_types/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("payload_content_types") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("payload_content_types"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/event_types/{event_type_name}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("event_types") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("event_type_name") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                    h.vstr("{event_type_name}"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("event_type_name") },
                                            .{ "orig", h.vstr("event_type_name") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("event_type_name"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("$.main.kit.entity.event_type"),
                        }),
                    }) },
                }) },
            }) },
            .{ "health", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("database") },
                        .{ "title", h.vstr("Database") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("database_duration_ms") },
                        .{ "title", h.vstr("Database Duration Ms") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int64") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("object_storage") },
                        .{ "title", h.vstr("Object Storage") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("object_storage_duration_ms") },
                        .{ "title", h.vstr("Object Storage Duration Ms") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "format", h.vstr("int64") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("pulsar") },
                        .{ "title", h.vstr("Pulsar") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("pulsar_duration_ms") },
                        .{ "title", h.vstr("Pulsar Duration Ms") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "format", h.vstr("int64") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("total_duration_ms") },
                        .{ "title", h.vstr("Total Duration Ms") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int64") },
                    }),
                }) },
                .{ "name", h.vstr("health") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/health/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("health") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("health"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("key") },
                                            .{ "orig", h.vstr("key") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("key"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "hook0", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("default") },
                        .{ "title", h.vstr("Default") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("description") },
                        .{ "title", h.vstr("Description") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("env_var") },
                        .{ "title", h.vstr("Env Var") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("group") },
                        .{ "title", h.vstr("Group") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("name") },
                        .{ "title", h.vstr("Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("required") },
                        .{ "title", h.vstr("Required") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("sensitive") },
                        .{ "title", h.vstr("Sensitive") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "name", h.vstr("hook0") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/environment_variables/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("environment_variables") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("environment_variables"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "ingested_event", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("UUID of the application this event belongs to.") },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_id") },
                        .{ "title", h.vstr("Event Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "short", h.vstr("Optional unique identifier for this event (client-generated UUID).") },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_type") },
                        .{ "title", h.vstr("Event Type") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("The type of event (e.g., 'user.created', 'order.completed').") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("labels") },
                        .{ "title", h.vstr("Labels") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Labels for event filtering and routing to subscriptions.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("metadata") },
                        .{ "title", h.vstr("Metadata") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "short", h.vstr("Optional metadata key-value pairs associated with the event.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("occurred_at") },
                        .{ "title", h.vstr("Occurred At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Timestamp when the event occurred.") },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("payload") },
                        .{ "title", h.vstr("Payload") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("The event payload.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("payload_content_type") },
                        .{ "title", h.vstr("Payload Content Type") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Content type of the payload.") },
                    }),
                }) },
                .{ "name", h.vstr("ingested_event") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/event/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("event") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "instance", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("application_secret_compatibility") },
                        .{ "title", h.vstr("Application Secret Compatibility") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("auto_db_migration") },
                        .{ "title", h.vstr("Auto Db Migration") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("biscuit_public_key") },
                        .{ "title", h.vstr("Biscuit Public Key") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("cloudflare_turnstile_site_key") },
                        .{ "title", h.vstr("Cloudflare Turnstile Site Key") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("formbricks") },
                        .{ "title", h.vstr("Formbricks") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("matomo") },
                        .{ "title", h.vstr("Matomo") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("password_minimum_length") },
                        .{ "title", h.vstr("Password Minimum Length") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("quota_enforcement") },
                        .{ "title", h.vstr("Quota Enforcement") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("registration_disabled") },
                        .{ "title", h.vstr("Registration Disabled") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("support_email_address") },
                        .{ "title", h.vstr("Support Email Address") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "name", h.vstr("instance") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/instance/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("instance") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("instance"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "login", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("email") },
                        .{ "title", h.vstr("Email") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("password") },
                        .{ "title", h.vstr("Password") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "name", h.vstr("login") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/login") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("login") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("login"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/refresh") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("refresh") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("refresh"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "organization", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("amount") },
                        .{ "title", h.vstr("Amount") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("application_name") },
                        .{ "title", h.vstr("Application Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("consumption") },
                        .{ "title", h.vstr("Consumption") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("date") },
                        .{ "title", h.vstr("Date") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("is_provisional") },
                        .{ "title", h.vstr("Is Provisional") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("name") },
                        .{ "title", h.vstr("Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("onboarding_steps") },
                        .{ "title", h.vstr("Onboarding Steps") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("organization_id") },
                        .{ "title", h.vstr("Organization Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("plan") },
                        .{ "title", h.vstr("Plan") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("quotas") },
                        .{ "title", h.vstr("Quotas") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("role") },
                        .{ "title", h.vstr("Role") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("users") },
                        .{ "title", h.vstr("Users") },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("organization") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/organizations/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events_per_day/organization") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("events_per_day") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organization") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events_per_day"),
                                    h.vstr("organization"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("from") },
                                            .{ "orig", h.vstr("from") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("to") },
                                            .{ "orig", h.vstr("to") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("from"),
                                        h.vstr("organization_id"),
                                        h.vstr("to"),
                                    }) },
                                }) },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/organizations/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "organization_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "organization_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "organization_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "organization_edit_role", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("role") },
                        .{ "title", h.vstr("Role") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("user_id") },
                        .{ "title", h.vstr("User Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("organization_edit_role") },
                .{ "op", h.jo(&.{
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("invite") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{id}"),
                                    h.vstr("invite"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "organization_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "$action", h.vstr("invite") },
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "problem", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("detail") },
                        .{ "title", h.vstr("Detail") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("status") },
                        .{ "title", h.vstr("Status") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("title") },
                        .{ "title", h.vstr("Title") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("problem") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/errors/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("errors") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("errors"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "quota", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("global_applications_per_organization_limit") },
                        .{ "title", h.vstr("Global Applications Per Organization Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("global_days_of_events_retention_limit") },
                        .{ "title", h.vstr("Global Days Of Events Retention Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("global_event_types_per_application_limit") },
                        .{ "title", h.vstr("Global Event Types Per Application Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("global_events_per_day_limit") },
                        .{ "title", h.vstr("Global Events Per Day Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("global_members_per_organization_limit") },
                        .{ "title", h.vstr("Global Members Per Organization Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("global_subscriptions_per_application_limit") },
                        .{ "title", h.vstr("Global Subscriptions Per Application Limit") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                }) },
                .{ "name", h.vstr("quota") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/quotas/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("quotas") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("quotas"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body.limits`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "registration", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("email") },
                        .{ "title", h.vstr("Email") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("first_name") },
                        .{ "title", h.vstr("First Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("gclid") },
                        .{ "title", h.vstr("Gclid") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "short", h.vstr("Optional Google Ads click identifier captured during the user's journey from a Google Ad.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("last_name") },
                        .{ "title", h.vstr("Last Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("password") },
                        .{ "title", h.vstr("Password") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("turnstile_token") },
                        .{ "title", h.vstr("Turnstile Token") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                }) },
                .{ "name", h.vstr("registration") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/register/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("register") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("register"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "request_attempt", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("created_at") },
                        .{ "title", h.vstr("Created At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("delay_until") },
                        .{ "title", h.vstr("Delay Until") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event") },
                        .{ "title", h.vstr("Event") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_id") },
                        .{ "title", h.vstr("Event Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("failed_at") },
                        .{ "title", h.vstr("Failed At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("http_response_status") },
                        .{ "title", h.vstr("Http Response Status") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("picked_at") },
                        .{ "title", h.vstr("Picked At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("request_attempt_id") },
                        .{ "title", h.vstr("Request Attempt Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("response_id") },
                        .{ "title", h.vstr("Response Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("retry_count") },
                        .{ "title", h.vstr("Retry Count") },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("int32") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("status") },
                        .{ "title", h.vstr("Status") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "short", h.vstr("Status of a request attempt.") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("subscription") },
                        .{ "title", h.vstr("Subscription") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("succeeded_at") },
                        .{ "title", h.vstr("Succeeded At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "format", h.vstr("date-time") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("request_attempt") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/request_attempts/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("request_attempts") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("request_attempts"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("event_event_type_name") },
                                            .{ "orig", h.vstr("event_event_type_name") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("event_id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("max_created_at") },
                                            .{ "orig", h.vstr("max_created_at") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("min_created_at") },
                                            .{ "orig", h.vstr("min_created_at") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("pagination_cursor") },
                                            .{ "orig", h.vstr("pagination_cursor") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                        h.jo(&.{
                                            .{ "name", h.vstr("subscription_id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("event_event_type_name"),
                                        h.vstr("event_id"),
                                        h.vstr("max_created_at"),
                                        h.vstr("min_created_at"),
                                        h.vstr("pagination_cursor"),
                                        h.vstr("subscription_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/request_attempts/{request_attempt_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("request_attempts") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("request_attempts"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "request_attempt_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("request_attempt_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "response", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("response") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/responses/{response_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("responses") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("responses"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "response_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body.headers`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("response_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "revoke", h.jo(&.{
                .{ "fields", h.olist() },
                .{ "name", h.vstr("revoke") },
                .{ "op", h.jo(&.{
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("organization_id") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("invite") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{organization_id}"),
                                    h.vstr("invite"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("$.main.kit.entity.organization"),
                        }),
                    }) },
                }) },
            }) },
            .{ "service_token", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("biscuit") },
                        .{ "title", h.vstr("Biscuit") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("created_at") },
                        .{ "title", h.vstr("Created At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("name") },
                        .{ "title", h.vstr("Name") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("organization_id") },
                        .{ "title", h.vstr("Organization Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("token_id") },
                        .{ "title", h.vstr("Token Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("service_token") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/service_token/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("service_token") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/service_token/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("service_token") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("service_token") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "service_token_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("service_token") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "service_token_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("service_token") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "service_token_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "subscription", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("application_id") },
                        .{ "title", h.vstr("Application Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("created_at") },
                        .{ "title", h.vstr("Created At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("dedicated_workers") },
                        .{ "title", h.vstr("Dedicated Workers") },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "req", h.vbool(true) },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "type", h.vstr("`$ARRAY`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "type", h.vstr("`$ARRAY`") },
                            }) },
                        }) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("description") },
                        .{ "title", h.vstr("Description") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("event_types") },
                        .{ "title", h.vstr("Event Types") },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("id") },
                        .{ "title", h.vstr("Id") },
                        .{ "type", h.vstr("`$STRING`") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("is_enabled") },
                        .{ "title", h.vstr("Is Enabled") },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("label_key") },
                        .{ "title", h.vstr("Label Key") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                        }) },
                        .{ "short", h.vstr("_Kept for backward compatibility, you should use `labels`_") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("label_value") },
                        .{ "title", h.vstr("Label Value") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                        }) },
                        .{ "short", h.vstr("_Kept for backward compatibility, you should use `labels`_") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("labels") },
                        .{ "title", h.vstr("Labels") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                        }) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("metadata") },
                        .{ "title", h.vstr("Metadata") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                        }) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("secret") },
                        .{ "title", h.vstr("Secret") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("subscription_id") },
                        .{ "title", h.vstr("Subscription Id") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("uuid") },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("target") },
                        .{ "title", h.vstr("Target") },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("updated_at") },
                        .{ "title", h.vstr("Updated At") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                        .{ "format", h.vstr("date-time") },
                    }),
                }) },
                .{ "id", h.jo(&.{
                    .{ "field", h.vstr("id") },
                    .{ "name", h.vstr("id") },
                }) },
                .{ "name", h.vstr("subscription") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("subscriptions") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("subscriptions") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("subscriptions") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "subscription_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("subscriptions") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "subscription_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("query") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("subscriptions") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("id") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                    h.vstr("{id}"),
                                }) },
                                .{ "rename", h.jo(&.{
                                    .{ "param", h.jo(&.{
                                        .{ "subscription_id", h.vstr("id") },
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "user_authentication", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("email") },
                        .{ "title", h.vstr("Email") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("new_password") },
                        .{ "title", h.vstr("New Password") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("token") },
                        .{ "title", h.vstr("Token") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "name", h.vstr("user_authentication") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/begin-reset-password") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("begin-reset-password") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("begin-reset-password"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/logout") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("logout") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("logout"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/password") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("password") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("password"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/reset-password") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("reset-password") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("reset-password"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/verify-email") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("auth") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("verify-email") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("verify-email"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.omap() },
                                .{ "select", h.omap() },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "user_invitation", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "name", h.vstr("email") },
                        .{ "title", h.vstr("Email") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                    h.jo(&.{
                        .{ "name", h.vstr("role") },
                        .{ "title", h.vstr("Role") },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "req", h.vbool(true) },
                    }),
                }) },
                .{ "name", h.vstr("user_invitation") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "kind", h.vstr("http") },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
                                .{ "segments", h.ja(&.{
                                    h.jo(&.{
                                        .{ "lit", h.vstr("api") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("v1") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("organizations") },
                                    }),
                                    h.jo(&.{
                                        .{ "var", h.vstr("organization_id") },
                                    }),
                                    h.jo(&.{
                                        .{ "lit", h.vstr("invite") },
                                    }),
                                }) },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{organization_id}"),
                                    h.vstr("invite"),
                                }) },
                                .{ "rename", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "kind", h.vstr("param") },
                                            .{ "reqd", h.vbool(true) },
                                        }),
                                    }) },
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                            }),
                        }) },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("$.main.kit.entity.organization"),
                        }),
                    }) },
                }) },
            }) },
        }) },
    });
}

// SHARED CONFIG (sdkgen rung L2).
//
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client. Above the
// size threshold make_config re-parses the whole embedded JSON, so this is the
// difference between parsing the model once and once per client.
//
// Value nodes are arena-allocated and reference-stable, so the shared value is
// genuinely one structure, not a copy.
var shared_config_val: ?Value = null;

/// The process-wide config, built once on first use.
///
/// The returned Value SHARES its nodes: treat it as read-only. Callers that
/// need to mutate should use make_config, which always returns a fresh copy.
pub fn shared_config() Value {
    if (shared_config_val) |c| return c;
    const c = make_config();
    shared_config_val = c;
    return c;
}

pub fn make_feature(name: []const u8) Feature {
    if (std.mem.eql(u8, name, "audit")) return @import("../feature/audit.zig").AuditFeature.make();
    if (std.mem.eql(u8, name, "cache")) return @import("../feature/cache.zig").CacheFeature.make();
    if (std.mem.eql(u8, name, "clienttrack")) return @import("../feature/clienttrack.zig").ClienttrackFeature.make();
    if (std.mem.eql(u8, name, "cost")) return @import("../feature/cost.zig").CostFeature.make();
    if (std.mem.eql(u8, name, "debug")) return @import("../feature/debug.zig").DebugFeature.make();
    if (std.mem.eql(u8, name, "idempotency")) return @import("../feature/idempotency.zig").IdempotencyFeature.make();
    if (std.mem.eql(u8, name, "log")) return @import("../feature/log.zig").LogFeature.make();
    if (std.mem.eql(u8, name, "metrics")) return @import("../feature/metrics.zig").MetricsFeature.make();
    if (std.mem.eql(u8, name, "netsim")) return @import("../feature/netsim.zig").NetsimFeature.make();
    if (std.mem.eql(u8, name, "paging")) return @import("../feature/paging.zig").PagingFeature.make();
    if (std.mem.eql(u8, name, "proxy")) return @import("../feature/proxy.zig").ProxyFeature.make();
    if (std.mem.eql(u8, name, "ratelimit")) return @import("../feature/ratelimit.zig").RatelimitFeature.make();
    if (std.mem.eql(u8, name, "rbac")) return @import("../feature/rbac.zig").RbacFeature.make();
    if (std.mem.eql(u8, name, "retry")) return @import("../feature/retry.zig").RetryFeature.make();
    if (std.mem.eql(u8, name, "streaming")) return @import("../feature/streaming.zig").StreamingFeature.make();
    if (std.mem.eql(u8, name, "telemetry")) return @import("../feature/telemetry.zig").TelemetryFeature.make();
    if (std.mem.eql(u8, name, "test")) return @import("../feature/test.zig").TestFeature.make();
    if (std.mem.eql(u8, name, "timeout")) return @import("../feature/timeout.zig").TimeoutFeature.make();
    return @import("../feature/base.zig").BaseFeature.make();
}
