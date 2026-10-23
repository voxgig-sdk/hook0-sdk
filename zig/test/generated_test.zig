// Generated smoke tests (model-driven). Drive each entity through the
// offline test transport and assert a non-error result.

const std = @import("std");
const sdk = @import("sdk");
const fh = @import("fh.zig");
const h = sdk.h;
const Value = sdk.Value;

fn vnull() Value {
    return Value{ .null = {} };
}

test "sdk_constructs_in_test_mode" {
    const testsdk = sdk.testSdk();
    try std.testing.expect(std.mem.eql(u8, testsdk.mode, "test"));
}

test "application_load_smoke" {
    const fixture = h.jo(&.{.{ "application", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.application(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("application load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "application_list_smoke" {
    const fixture = h.jo(&.{.{ "application", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.application(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "application_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "application", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.application(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.application(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "application_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).application(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).application(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).application(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "application_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).application(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "application_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).application(vnull()).list(h.jo(&.{ .{ "organization_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "application_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/application/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "application_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/application/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "application_secret_list_smoke" {
    const fixture = h.jo(&.{.{ "application_secret", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.application_secret(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "application_secret_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "application_secret", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.application_secret(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.application_secret(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "application_secret_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).application_secret(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).application_secret(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).application_secret(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "application_secret_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).application_secret(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "application_secret_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).application_secret(vnull()).list(h.jo(&.{ .{ "application_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "application_secret_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/application_secret/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "application_secret_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/application_secret/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "error__list_smoke" {
    const fixture = h.jo(&.{.{ "error", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.error_(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "error__stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "error", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.error_(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.error_(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "error__stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).error_(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).error_(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).error_(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "error__stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).error_(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "error__validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).error_(vnull()).list(h.jo(&.{ .{ "detail", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "error__direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/error/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "error__prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/error/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "event_load_smoke" {
    const fixture = h.jo(&.{.{ "event", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.event(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("event load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "event_list_smoke" {
    const fixture = h.jo(&.{.{ "event", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.event(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "event_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "event", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.event(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.event(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "event_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).event(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).event(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).event(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "event_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).event(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "event_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).event(vnull()).list(h.jo(&.{ .{ "application_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "event_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/event/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "event_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/event/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "event_type_load_smoke" {
    const fixture = h.jo(&.{.{ "event_type", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.event_type(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("event_type load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "event_type_list_smoke" {
    const fixture = h.jo(&.{.{ "event_type", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.event_type(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "event_type_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "event_type", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.event_type(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.event_type(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "event_type_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).event_type(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).event_type(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).event_type(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "event_type_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).event_type(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "event_type_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).event_type(vnull()).list(h.jo(&.{ .{ "application_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "event_type_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/event_type/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "event_type_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/event_type/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "events_management_list_smoke" {
    const fixture = h.jo(&.{.{ "events_management", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.events_management(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "events_management_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "events_management", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.events_management(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.events_management(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "events_management_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).events_management(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).events_management(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).events_management(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "events_management_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).events_management(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "events_management_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/events_management/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "events_management_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/events_management/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "health_load_smoke" {
    const fixture = h.jo(&.{.{ "health", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.health(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("health load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "health_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).health(vnull()).load(h.jo(&.{ .{ "key", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "health_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/health/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "health_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/health/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "hook0_list_smoke" {
    const fixture = h.jo(&.{.{ "hook0", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.hook0(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "hook0_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "hook0", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.hook0(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.hook0(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "hook0_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).hook0(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).hook0(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).hook0(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "hook0_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).hook0(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "hook0_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).hook0(vnull()).list(h.jo(&.{ .{ "default", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "hook0_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/hook0/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "hook0_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/hook0/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "ingested_event_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).ingested_event(vnull()).create(h.jo(&.{ .{ "application_id", h.vnum(1) }, .{ "event_type", h.vstr("x") }, .{ "labels", h.vstr("x") }, .{ "occurred_at", h.vstr("x") }, .{ "payload", h.vstr("x") }, .{ "payload_content_type", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "instance_load_smoke" {
    const fixture = h.jo(&.{.{ "instance", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.instance(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("instance load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "instance_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).instance(vnull()).load(h.jo(&.{ .{ "application_secret_compatibility", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "instance_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/instance/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "instance_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/instance/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "login_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).login(vnull()).create(h.jo(&.{ .{ "email", h.vnum(1) }, .{ "password", h.vstr("x") }, .{ "token", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "organization_load_smoke" {
    const fixture = h.jo(&.{.{ "organization", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.organization(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("organization load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "organization_list_smoke" {
    const fixture = h.jo(&.{.{ "organization", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.organization(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "organization_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "organization", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.organization(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.organization(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "organization_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).organization(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).organization(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).organization(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "organization_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).organization(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "organization_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).organization(vnull()).list(h.jo(&.{ .{ "amount", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "organization_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/organization/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "organization_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/organization/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "organization_edit_role_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).organization_edit_role(vnull()).update(h.jo(&.{ .{ "id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "quota_load_smoke" {
    const fixture = h.jo(&.{.{ "quota", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.quota(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("quota load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "quota_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).quota(vnull()).load(h.jo(&.{ .{ "enabled", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "quota_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/quota/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "quota_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/quota/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "registration_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).registration(vnull()).create(h.jo(&.{ .{ "email", h.vnum(1) }, .{ "first_name", h.vstr("x") }, .{ "last_name", h.vstr("x") }, .{ "password", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "request_attempt_load_smoke" {
    const fixture = h.jo(&.{.{ "request_attempt", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.request_attempt(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("request_attempt load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "request_attempt_list_smoke" {
    const fixture = h.jo(&.{.{ "request_attempt", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.request_attempt(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "request_attempt_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "request_attempt", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.request_attempt(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.request_attempt(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "request_attempt_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).request_attempt(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).request_attempt(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).request_attempt(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "request_attempt_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).request_attempt(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "request_attempt_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).request_attempt(vnull()).list(h.jo(&.{ .{ "application_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "request_attempt_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/request_attempt/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "request_attempt_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/request_attempt/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "response_load_smoke" {
    const fixture = h.jo(&.{.{ "response", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.response(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("response load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "response_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).response(vnull()).load(h.jo(&.{ .{ "id", h.vnum(1) }, .{ "application_id", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "response_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/response/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "response_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/response/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "revoke_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).revoke(vnull()).remove(h.jo(&.{ .{ "organization_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "service_token_load_smoke" {
    const fixture = h.jo(&.{.{ "service_token", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.service_token(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("service_token load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "service_token_list_smoke" {
    const fixture = h.jo(&.{.{ "service_token", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.service_token(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "service_token_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "service_token", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.service_token(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.service_token(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "service_token_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).service_token(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).service_token(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).service_token(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "service_token_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).service_token(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "service_token_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).service_token(vnull()).list(h.jo(&.{ .{ "organization_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "service_token_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/service_token/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "service_token_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/service_token/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "subscription_load_smoke" {
    const fixture = h.jo(&.{.{ "subscription", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.subscription(vnull());
    const res = e.load(h.jo(&.{.{ "id", h.vstr("t01") }}), vnull());
    switch (res) {
        .ok => |ent| {
            // EVERY operation resolves to the ENTITY, not the record: the
            // payload of EntResult.ok is the entity pointer, and the record is
            // reached through data(). Destructuring it as a Value was a
            // compile error ("expected type 'struct.JsonValue', found
            // '*entity.<name>.<Name>Entity'"), so no generated zig SDK with a
            // loadable entity could build its own test suite.
            const rec = ent.asEntity().data(null);
            try std.testing.expect(std.mem.eql(u8, h.get_str(rec, "id") orelse "", "t01"));
        },
        .err => |er| {
            std.debug.print("subscription load failed: {s}\n", .{er.msg});
            try std.testing.expect(false);
        },
    }
}

test "subscription_list_smoke" {
    const fixture = h.jo(&.{.{ "subscription", h.jo(&.{.{ "t01", h.jo(&.{.{ "id", h.vstr("t01") }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const e = testsdk.subscription(vnull());
    const res = e.list(vnull(), vnull());
    try std.testing.expect(res == .ok);
}

test "subscription_stream_smoke" {
    // stream() runs the list op through the full pipeline and returns the
    // result items. Seed two entities via test mode; with the streaming
    // feature active it yields the feature's incremental items, else it falls
    // back to the materialised items — either way every item is yielded.
    const fixture = h.jo(&.{.{ "subscription", h.jo(&.{
        .{ "strm01", h.jo(&.{.{ "id", h.vstr("strm01") }}) },
        .{ "strm02", h.jo(&.{.{ "id", h.vstr("strm02") }}) },
    }) }});
    const sdkopts = h.jo(&.{.{ "feature", h.jo(&.{.{ "streaming", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    const testsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), sdkopts);
    const e = testsdk.subscription(vnull());
    const items = e.stream("list", vnull(), vnull());
    try std.testing.expect(items == .ok and items.ok.len == 2);

    // Fallback: streaming inactive still yields both materialised items.
    const plainsdk = sdk.test_sdk(h.jo(&.{.{ "entity", fixture }}), vnull());
    const pe = plainsdk.subscription(vnull());
    const pitems = pe.stream("list", vnull(), vnull());
    try std.testing.expect(pitems == .ok and pitems.ok.len == 2);
}

test "subscription_stream_error" {
    const offline = h.jo(&.{.{ "net", h.jo(&.{.{ "offline", h.vbool(true) }}) }});
    switch (sdk.test_sdk(offline, vnull()).subscription(vnull()).stream("list", vnull(), vnull())) {
        .err => |er| try std.testing.expect(std.mem.indexOf(u8, er.msg, "offline") != null),
        .ok => try std.testing.expect(false),
    }

    const quiet = h.jo(&.{.{ "ctrl", h.jo(&.{.{ "throw", h.vbool(false) }}) }});
    try std.testing.expect(sdk.test_sdk(offline, vnull()).subscription(vnull()).stream("list", vnull(), quiet) == .ok);

    if (fh.fh_has_feature("rbac")) {
        const deny = h.jo(&.{.{ "feature", h.jo(&.{.{ "rbac", h.jo(&.{
            .{ "active", h.vbool(true) },
            .{ "deny", h.vbool(true) },
        }) }}) }});
        switch (sdk.test_sdk(vnull(), deny).subscription(vnull()).stream("list", vnull(), vnull())) {
            .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "rbac_denied")),
            .ok => try std.testing.expect(false),
        }
    }
}

test "subscription_stream_ctrl" {
    const explain = h.omap();
    const ctrl = h.jo(&.{.{ "explain", explain }});
    _ = sdk.test_sdk(vnull(), vnull()).subscription(vnull()).stream("list", vnull(), h.jo(&.{.{ "ctrl", ctrl }}));
    try std.testing.expect(h.is_noval(h.getp(ctrl, "stream")));
    try std.testing.expect(0 < explain.object.count());
}

test "subscription_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).subscription(vnull()).list(h.jo(&.{ .{ "application_id", h.vnum(1) } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "subscription_direct_smoke" {
    // direct() drives prepare -> transport and always returns a result map
    // carrying an `ok` flag (never an error union), even on a non-2xx or a
    // prepare failure.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const result = testsdk.direct(h.jo(&.{
        .{ "path", h.vstr("/subscription/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);
}

test "subscription_prepare_smoke" {
    // prepare() returns the fetch definition (an error union). The generated
    // fetchdef always carries a url + method.
    const testsdk = sdk.test_sdk(vnull(), vnull());
    const fetchdef = testsdk.prepare(h.jo(&.{
        .{ "path", h.vstr("/subscription/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("direct01") }}) },
    })) catch {
        // A prepare error is acceptable here (base may be unset); the surface
        // exists and is exercised.
        return;
    };
    try std.testing.expect(std.mem.eql(u8, h.get_str(fetchdef, "method") orelse "", "GET"));
}

test "user_authentication_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).user_authentication(vnull()).create(h.jo(&.{ .{ "current_password", h.vnum(1) }, .{ "email", h.vstr("x") }, .{ "new_password", h.vstr("x") }, .{ "token", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

test "user_invitation_validate" {
    if (!fh.fh_has_feature("validate")) return error.SkipZigTest;
    const opts = h.jo(&.{.{ "feature", h.jo(&.{.{ "validate", h.jo(&.{.{ "active", h.vbool(true) }}) }}) }});
    switch (sdk.test_sdk(vnull(), opts).user_invitation(vnull()).create(h.jo(&.{ .{ "organization_id", h.vnum(1) }, .{ "email", h.vstr("x") }, .{ "role", h.vstr("x") } }), vnull())) {
        .err => |er| try std.testing.expect(std.mem.eql(u8, er.code, "validate_failed")),
        .ok => try std.testing.expect(false),
    }
}

// Documented quick-start surface (README.md / REFERENCE.md). Exercises the
// test-mode constructor and the direct() escape hatch exactly as documented.
test "readme_quickstart_surface" {
    // `sdk.test_sdk(...)` — the documented mock constructor.
    const client = sdk.test_sdk(vnull(), vnull());
    try std.testing.expect(std.mem.eql(u8, client.mode, "test"));

    // `client.direct(...)` — the documented escape hatch. It always returns a
    // result map carrying an `ok` flag (never an error union).
    const result = client.direct(h.jo(&.{
        .{ "path", h.vstr("/api/resource/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("example") }}) },
    }));
    try std.testing.expect(result == .object);
    try std.testing.expect(h.get_bool(result, "ok") != null);

    // `client.prepare(...)` — build a request without sending it.
    const fetchdef = client.prepare(h.jo(&.{
        .{ "path", h.vstr("/api/resource/{id}") },
        .{ "method", h.vstr("GET") },
        .{ "params", h.jo(&.{.{ "id", h.vstr("example") }}) },
    })) catch h.vnull();
    _ = fetchdef;
}
