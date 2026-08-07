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
        }) },
        .{ "feature", h.jo(&.{
            .{ "test", h.jo(&.{
                .{ "options", h.jo(&.{
                    .{ "active", h.vbool(false) },
                }) },
            }) },
        }) },
        .{ "options", h.jo(&.{
            .{ "base", h.vstr("https://app.hook0.com") },
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
                .{ "events_per_day_entry", h.omap() },
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
            .{ "auth", h.jo(&.{
                .{ "prefix", h.vstr("Bearer") },
            }) },
        }) },
        .{ "entity", h.jo(&.{
            .{ "application", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("consumption") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("onboarding_steps") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("organization_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("quota") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(5) },
                    }),
                }) },
                .{ "name", h.vstr("application") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/applications/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/applications/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("applications"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/applications/{application_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "application_secret", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("created_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("deleted_at") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("name") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("token") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                }) },
                .{ "name", h.vstr("application_secret") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("application_secret_token") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/{application_secret_token}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
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
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("application_secret_token") },
                                            .{ "orig", h.vstr("application_secret_token") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/application_secrets/{application_secret_token}") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("application_secrets"),
                                    h.vstr("{application_secret_token}"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("application_secret_token"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("application_secret"),
                        }),
                    }) },
                }) },
            }) },
            .{ "event", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_type_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("ip") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("labels") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("metadata") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("occurred_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("payload") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("payload_content_type") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(7) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("received_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(8) },
                    }),
                }) },
                .{ "name", h.vstr("event") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events/{event_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "event_type", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_type_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("resource_type") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("resource_type_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("service") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("service_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("verb") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("verb_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(7) },
                    }),
                }) },
                .{ "name", h.vstr("event_type") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/event_types/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/event_types/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("event_type_name") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/event_types/{event_type_name}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "events_management", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                }) },
                .{ "name", h.vstr("events_management") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("event_id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/events/{event_id}/replay") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events"),
                                    h.vstr("{event_id}"),
                                    h.vstr("replay"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("event_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/payload_content_types/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("payload_content_types"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("event_type_name") },
                                            .{ "orig", h.vstr("event_type_name") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/event_types/{event_type_name}") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event_types"),
                                    h.vstr("{event_type_name}"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("event_type_name"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("event_type"),
                        }),
                        h.ja(&.{
                            h.vstr("event"),
                        }),
                    }) },
                }) },
            }) },
            .{ "events_per_day_entry", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("amount") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("date") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("is_provisional") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(4) },
                    }),
                }) },
                .{ "name", h.vstr("events_per_day_entry") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("from") },
                                            .{ "orig", h.vstr("from") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("to") },
                                            .{ "orig", h.vstr("to") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events_per_day/application") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events_per_day"),
                                    h.vstr("application"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("from"),
                                        h.vstr("to"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("from") },
                                            .{ "orig", h.vstr("from") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("to") },
                                            .{ "orig", h.vstr("to") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/events_per_day/organization") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("events_per_day"),
                                    h.vstr("organization"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("from"),
                                        h.vstr("organization_id"),
                                        h.vstr("to"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(1) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "health", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("database") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("database_duration_ms") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("object_storage") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("object_storage_duration_ms") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("pulsar") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("pulsar_duration_ms") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("total_duration_ms") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(6) },
                    }),
                }) },
                .{ "name", h.vstr("health") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("key") },
                                            .{ "orig", h.vstr("key") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/health/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("health"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("key"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "hook0", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("default") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("description") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("env_var") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("group") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("required") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("sensitive") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(6) },
                    }),
                }) },
                .{ "name", h.vstr("hook0") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/environment_variables/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("environment_variables"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "ingested_event", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_id") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_type") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("labels") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("metadata") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("occurred_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("payload") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("payload_content_type") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(7) },
                    }),
                }) },
                .{ "name", h.vstr("ingested_event") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/event/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("event"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "instance", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_secret_compatibility") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("auto_db_migration") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("biscuit_public_key") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("cloudflare_turnstile_site_key") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("formbricks") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("matomo") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("password_minimum_length") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("quota_enforcement") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(7) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("registration_disabled") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(8) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("support_email_address") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(9) },
                    }),
                }) },
                .{ "name", h.vstr("instance") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/instance/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("instance"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "login", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("email") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("password") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                }) },
                .{ "name", h.vstr("login") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/login") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("login"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/refresh") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("refresh"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(1) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "organization", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("consumption") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("onboarding_steps") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("organization_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("plan") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("quota") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("role") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("users") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "index$", h.vnum(7) },
                    }),
                }) },
                .{ "name", h.vstr("organization") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/organizations/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/organizations/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "organization_edit_role", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("role") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("user_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                }) },
                .{ "name", h.vstr("organization_edit_role") },
                .{ "op", h.jo(&.{
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
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
                                .{ "select", h.jo(&.{
                                    .{ "$action", h.vstr("invite") },
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "problem", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("detail") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("status") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("title") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                }) },
                .{ "name", h.vstr("problem") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/errors/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("errors"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "quota", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("enabled") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("limits") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(1) },
                    }),
                }) },
                .{ "name", h.vstr("quota") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/quotas/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("quotas"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "registration", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("email") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("first_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("gclid") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("last_name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("password") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("turnstile_token") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(5) },
                    }),
                }) },
                .{ "name", h.vstr("registration") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/register/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("register"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "request_attempt", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("created_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("delay_until") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("failed_at") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("http_response_status") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("picked_at") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("request_attempt_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(7) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("response_id") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(8) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("retry_count") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(9) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("status") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(10) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("subscription") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(11) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("succeeded_at") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(12) },
                    }),
                }) },
                .{ "name", h.vstr("request_attempt") },
                .{ "op", h.jo(&.{
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("event_event_type_name") },
                                            .{ "orig", h.vstr("event_event_type_name") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("event_id") },
                                            .{ "orig", h.vstr("event_id") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("max_created_at") },
                                            .{ "orig", h.vstr("max_created_at") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("min_created_at") },
                                            .{ "orig", h.vstr("min_created_at") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("pagination_cursor") },
                                            .{ "orig", h.vstr("pagination_cursor") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("subscription_id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "reqd", h.vbool(false) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/request_attempts/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("request_attempts"),
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
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("request_attempt_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/request_attempts/{request_attempt_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "response", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("body") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("elapsed_time_ms") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("headers") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("http_code") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$INTEGER`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("response_error_name") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("response_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(5) },
                    }),
                }) },
                .{ "name", h.vstr("response") },
                .{ "op", h.jo(&.{
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("response_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/responses/{response_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
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
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{organization_id}"),
                                    h.vstr("invite"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("organization"),
                        }),
                    }) },
                }) },
            }) },
            .{ "service_token", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("biscuit") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("created_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("name") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("organization_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("token_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(4) },
                    }),
                }) },
                .{ "name", h.vstr("service_token") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/service_token/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/service_token/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("service_token"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("service_token_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/service_token/{service_token_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "subscription", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("application_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("created_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("dedicated_workers") },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$ARRAY`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$ARRAY`") },
                            }) },
                        }) },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "index$", h.vnum(2) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("description") },
                        .{ "req", h.vbool(false) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(3) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("event_type") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$ARRAY`") },
                        .{ "index$", h.vnum(4) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("is_enabled") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$BOOLEAN`") },
                        .{ "index$", h.vnum(5) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("label_key") },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                        }) },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(6) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("label_value") },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$STRING`") },
                            }) },
                        }) },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(7) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("labels") },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                        }) },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(8) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("metadata") },
                        .{ "op", h.jo(&.{
                            .{ "create", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                            .{ "update", h.jo(&.{
                                .{ "req", h.vbool(false) },
                                .{ "type", h.vstr("`$OBJECT`") },
                            }) },
                        }) },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(9) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("secret") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(10) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("subscription_id") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(11) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("target") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$OBJECT`") },
                        .{ "index$", h.vnum(12) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("updated_at") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(13) },
                    }),
                }) },
                .{ "name", h.vstr("subscription") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                    .{ "list", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("list") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("subscriptions"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("list") },
                    }) },
                    .{ "load", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("load") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("GET") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("load") },
                    }) },
                    .{ "remove", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("remove") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                    .{ "query", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("query") },
                                            .{ "name", h.vstr("application_id") },
                                            .{ "orig", h.vstr("application_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("DELETE") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("application_id"),
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("remove") },
                    }) },
                    .{ "update", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("update") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("id") },
                                            .{ "orig", h.vstr("subscription_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("PUT") },
                                .{ "orig", h.vstr("/api/v1/subscriptions/{subscription_id}") },
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
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("update") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "user_authentication", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("email") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("new_password") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("token") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(2) },
                    }),
                }) },
                .{ "name", h.vstr("user_authentication") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/begin-reset-password") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("begin-reset-password"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/logout") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("logout"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(1) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/password") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("password"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(2) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/reset-password") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("reset-password"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(3) },
                            }),
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.omap() },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/auth/verify-email") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("auth"),
                                    h.vstr("verify-email"),
                                }) },
                                .{ "select", h.omap() },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(4) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.olist() },
                }) },
            }) },
            .{ "user_invitation", h.jo(&.{
                .{ "fields", h.ja(&.{
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("email") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(0) },
                    }),
                    h.jo(&.{
                        .{ "active", h.vbool(true) },
                        .{ "name", h.vstr("role") },
                        .{ "req", h.vbool(true) },
                        .{ "type", h.vstr("`$STRING`") },
                        .{ "index$", h.vnum(1) },
                    }),
                }) },
                .{ "name", h.vstr("user_invitation") },
                .{ "op", h.jo(&.{
                    .{ "create", h.jo(&.{
                        .{ "input", h.vstr("data") },
                        .{ "name", h.vstr("create") },
                        .{ "points", h.ja(&.{
                            h.jo(&.{
                                .{ "active", h.vbool(true) },
                                .{ "args", h.jo(&.{
                                    .{ "params", h.ja(&.{
                                        h.jo(&.{
                                            .{ "active", h.vbool(true) },
                                            .{ "kind", h.vstr("param") },
                                            .{ "name", h.vstr("organization_id") },
                                            .{ "orig", h.vstr("organization_id") },
                                            .{ "reqd", h.vbool(true) },
                                            .{ "type", h.vstr("`$STRING`") },
                                            .{ "index$", h.vnum(0) },
                                        }),
                                    }) },
                                }) },
                                .{ "method", h.vstr("POST") },
                                .{ "orig", h.vstr("/api/v1/organizations/{organization_id}/invite") },
                                .{ "parts", h.ja(&.{
                                    h.vstr("api"),
                                    h.vstr("v1"),
                                    h.vstr("organizations"),
                                    h.vstr("{organization_id}"),
                                    h.vstr("invite"),
                                }) },
                                .{ "select", h.jo(&.{
                                    .{ "exist", h.ja(&.{
                                        h.vstr("organization_id"),
                                    }) },
                                }) },
                                .{ "transform", h.jo(&.{
                                    .{ "req", h.vstr("`reqdata`") },
                                    .{ "res", h.vstr("`body`") },
                                }) },
                                .{ "index$", h.vnum(0) },
                            }),
                        }) },
                        .{ "key$", h.vstr("create") },
                    }) },
                }) },
                .{ "relations", h.jo(&.{
                    .{ "ancestors", h.ja(&.{
                        h.ja(&.{
                            h.vstr("organization"),
                        }),
                    }) },
                }) },
            }) },
        }) },
    });
}

pub fn make_feature(name: []const u8) Feature {
    if (std.mem.eql(u8, name, "audit")) return @import("../feature/audit.zig").AuditFeature.make();
    if (std.mem.eql(u8, name, "cache")) return @import("../feature/cache.zig").CacheFeature.make();
    if (std.mem.eql(u8, name, "clienttrack")) return @import("../feature/clienttrack.zig").ClienttrackFeature.make();
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
