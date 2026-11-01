// Generated basic-flow test for the event_type entity (model-driven;
// mirrors the go TestEntity generator).

#![allow(unused_variables, unused_mut, unused_imports)]

mod common;

use std::rc::Rc;

use common::*;

use hook0_sdk::core::helpers::{getp, getpath, ja, jo, now_ms, setp, to_map};
use hook0_sdk::utility::voxgigstruct as vs;
use hook0_sdk::{test_sdk, Entity, Hook0EntityBase, Hook0SDK, Value};

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT: bool = true;

#[test]
fn event_type_entity_instance() {
    let testsdk = test_sdk(Value::Noval, Value::Noval);
    let ent = testsdk.event_type(Value::Noval);
    assert_eq!(ent.get_name(), "event_type");
}

#[test]
fn event_type_entity_stream() {
    // stream() runs the list op through the full pipeline and yields each
    // result item. Seed two entities via test mode; with the `streaming`
    // feature active it yields the feature's incremental items, else it
    // falls back to the materialised items — either way every item yields.
    let seed = jo(vec![(
        "entity",
        jo(vec![(
            "event_type",
            jo(vec![
                ("strm01", jo(vec![("id", Value::str("strm01"))])),
                ("strm02", jo(vec![("id", Value::str("strm02"))])),
            ]),
        )]),
    )]);

    let sdkopts = jo(vec![(
        "feature",
        jo(vec![("streaming", jo(vec![("active", Value::Bool(true))]))]),
    )]);

    let testsdk = test_sdk(seed.clone(), sdkopts);
    let ent = testsdk.event_type(Value::Noval);
    let items: Vec<Value> = ent
        .stream("list", Value::empty_map(), Value::empty_map())
        .expect("stream failed")
        .collect();
    assert_eq!(items.len(), 2, "stream should yield both seeded items");

    // Fallback: streaming inactive still yields both materialised items.
    let plainsdk = test_sdk(seed, Value::Noval);
    let plainent = plainsdk.event_type(Value::Noval);
    let plain_items: Vec<Value> = plainent
        .stream("list", Value::empty_map(), Value::empty_map())
        .expect("stream failed")
        .collect();
    assert_eq!(plain_items.len(), 2, "fallback stream should yield both items");
}

#[test]
fn event_type_entity_stream_error() {
    let offline = jo(vec![("net", jo(vec![("offline", Value::Bool(true))]))]);
    let err = test_sdk(offline.clone(), Value::Noval)
        .event_type(Value::Noval)
        .stream("list", Value::empty_map(), Value::empty_map())
        .err()
        .expect("a failed operation should fail the stream");
    assert!(err.msg.contains("offline"), "{}", err.msg);

    let quiet = jo(vec![("ctrl", jo(vec![("throw", Value::Bool(false))]))]);
    assert!(test_sdk(offline, Value::Noval)
        .event_type(Value::Noval)
        .stream("list", Value::empty_map(), quiet)
        .is_ok());

    if !getp(&getp(&hook0_sdk::make_config(), "feature"), "rbac").is_noval() {
        let denied = test_sdk(Value::Noval, jo(vec![(
            "feature",
            jo(vec![("rbac", jo(vec![("active", Value::Bool(true)), ("deny", Value::Bool(true))]))]),
        )]));
        let denyerr = denied
            .event_type(Value::Noval)
            .stream("list", Value::empty_map(), Value::empty_map())
            .err()
            .expect("a denied operation should fail the stream");
        assert_eq!(denyerr.code, "rbac_denied");
    }
}

#[test]
fn event_type_entity_stream_ctrl() {
    let explain = Value::empty_map();
    let ctrl = jo(vec![("explain", explain.clone())]);
    let items: Vec<Value> = test_sdk(Value::Noval, Value::Noval)
        .event_type(Value::Noval)
        .stream("list", Value::empty_map(), jo(vec![("ctrl", ctrl.clone())]))
        .expect("stream failed")
        .collect();
    assert!(getp(&ctrl, "stream").is_noval(), "the stream changed the caller's ctrl");
    let filled = match &explain {
        Value::Map(m) => !m.borrow().is_empty(),
        _ => false,
    };
    assert!(filled, "the caller's explain record was not filled");
}

#[test]
fn event_type_entity_validate() {
    if getp(&getp(&hook0_sdk::make_config(), "feature"), "validate").is_noval() {
        return;
    }
    let client = test_sdk(Value::Noval, jo(vec![(
        "feature",
        jo(vec![("validate", jo(vec![("active", Value::Bool(true))]))]),
    )]));
    let err = client
        .event_type(Value::Noval)
        .list(jo(vec![("application_id", Value::Num(1.0))]), Value::Noval)
        .err()
        .expect("an invalid request should fail");
    assert_eq!(err.code, "validate_failed");
}

#[test]
fn event_type_entity_basic() {
    let setup = event_type_basic_setup(Value::Noval);
    // Per-op sdk-test-control.json skip — the basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    let mode = if setup.live { "live" } else { "unit" };
    for op in ["create", "list", "load", "remove"] {
        let (skip, reason) = is_control_skipped("entityOp", &format!("event_type.{}", op), mode);
        if skip {
            let reason = if reason.is_empty() {
                "skipped via sdk-test-control.json".to_string()
            } else {
                reason
            };
            eprintln!("skip: {}", reason);
            return;
        }
    }
    if setup.live && std::env::var("VOXGIG_GETONLY_GUARD").map(|v| v == "TRUE").unwrap_or(false) {
        println!("{}", "LIVE STEP {\"id\":\"event_type.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/event_types/\"}");
        println!("{}", "LIVE STEP {\"id\":\"event_type.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/event_types/{event_type_name}\"}");
        println!("{}", "LIVE STEP {\"id\":\"event_type.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}");
    let client = setup.client.clone();
    if setup.live && !live_existing(&setup.data, LIVE_STRICT, "event_type", || {
        client
            .event_type(Value::Noval)
            .list(jo(vec![]), Value::Noval)
            .map(|list| ja(list.iter().map(|e| e.data(None)).collect::<Vec<Value>>()))
    }) {
        return;
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    let event_type_ref01_data_raw = vs::items(&to_map(&getpath(&["existing", "event_type"], &setup.data)));
    let event_type_ref01_data = to_map(&vs::get_elem(
        &vs::get_elem(&event_type_ref01_data_raw, &Value::Num(0.0), Value::Noval),
        &Value::Num(1.0),
        Value::Noval,
    ));
    // LIST
    let event_type_ref01_ent = client.event_type(Value::Noval);
    let event_type_ref01_match = Value::empty_map();

    let event_type_ref01_list = event_type_ref01_ent
        .list(event_type_ref01_match.clone(), Value::Noval)
        .expect("list failed");
    // list resolves to one ENTITY per record; the flow asserts on the
    // records, so map each through data().
    let event_type_ref01_list = ja(event_type_ref01_list.iter().map(|e| e.data(None)).collect::<Vec<Value>>());

    // LOAD
    let event_type_ref01_match_dt0 = jo(vec![("id", getp(&event_type_ref01_data, "id"))]);
    let event_type_ref01_data_dt0_loaded = event_type_ref01_ent
        .load(event_type_ref01_match_dt0.clone(), Value::Noval)
        .expect("load failed");
    let event_type_ref01_data_dt0_load_result = to_map(&event_type_ref01_data_dt0_loaded.data(None));
    assert!(
        matches!(event_type_ref01_data_dt0_load_result, Value::Map(_)),
        "expected load result to be a map"
    );
    assert_eq!(
        getp(&event_type_ref01_data_dt0_load_result, "id"),
        getp(&event_type_ref01_data, "id"),
        "expected load result id to match"
    );

        return;
    }

    let client = setup.client.clone();
    // CREATE
    let event_type_ref01_ent = client.event_type(Value::Noval);
    let event_type_ref01_data = to_map(&getp(
        &getpath(&["new", "event_type"], &setup.data),
        "event_type_ref01",
    ));

    let event_type_ref01_data_result = event_type_ref01_ent
        .create(event_type_ref01_data.clone(), Value::Noval)
        .expect("create failed");
    let event_type_ref01_data = to_map(&event_type_ref01_data_result.data(None));
    assert!(
        matches!(event_type_ref01_data, Value::Map(_)),
        "expected create result to be a map"
    );
    assert!(
        !getp(&event_type_ref01_data, "id").is_noval(),
        "expected created entity to have an id"
    );

    // LIST
    let event_type_ref01_match = Value::empty_map();

    let event_type_ref01_list = event_type_ref01_ent
        .list(event_type_ref01_match.clone(), Value::Noval)
        .expect("list failed");
    // list resolves to one ENTITY per record; the flow asserts on the
    // records, so map each through data().
    let event_type_ref01_list = ja(event_type_ref01_list.iter().map(|e| e.data(None)).collect::<Vec<Value>>());

    let found_item = vs::select(
        &entity_list_to_data(&event_type_ref01_list),
        &jo(vec![("id", getp(&event_type_ref01_data, "id"))]),
    );
    assert!(
        !vs::is_empty(&found_item),
        "expected to find created entity in list"
    );

    // LOAD
    let event_type_ref01_match_dt0 = jo(vec![("id", getp(&event_type_ref01_data, "id"))]);
    let event_type_ref01_data_dt0_loaded = event_type_ref01_ent
        .load(event_type_ref01_match_dt0.clone(), Value::Noval)
        .expect("load failed");
    let event_type_ref01_data_dt0_load_result = to_map(&event_type_ref01_data_dt0_loaded.data(None));
    assert!(
        matches!(event_type_ref01_data_dt0_load_result, Value::Map(_)),
        "expected load result to be a map"
    );
    assert_eq!(
        getp(&event_type_ref01_data_dt0_load_result, "id"),
        getp(&event_type_ref01_data, "id"),
        "expected load result id to match"
    );

    // REMOVE
    let event_type_ref01_match_rm0 = jo(vec![("id", getp(&event_type_ref01_data, "id"))]);
    event_type_ref01_ent
        .remove(event_type_ref01_match_rm0.clone(), Value::Noval)
        .expect("remove failed");

    // LIST
    let event_type_ref01_match_rt0 = Value::empty_map();

    let event_type_ref01_list_rt0 = event_type_ref01_ent
        .list(event_type_ref01_match_rt0.clone(), Value::Noval)
        .expect("list failed");
    // list resolves to one ENTITY per record; the flow asserts on the
    // records, so map each through data().
    let event_type_ref01_list_rt0 = ja(event_type_ref01_list_rt0.iter().map(|e| e.data(None)).collect::<Vec<Value>>());

    let not_found_item = vs::select(
        &entity_list_to_data(&event_type_ref01_list_rt0),
        &jo(vec![("id", getp(&event_type_ref01_data, "id"))]),
    );
    assert!(
        vs::is_empty(&not_found_item),
        "expected removed entity to not be in list"
    );

}

fn event_type_basic_setup(extra: Value) -> EntityTestSetup {
    load_env_local();

    let mut entity_data_file = manifest_dir();
    entity_data_file.push("..");
    entity_data_file.push(".sdk");
    entity_data_file.push("test");
    entity_data_file.push("entity");
    entity_data_file.push("event_type");
    entity_data_file.push("EventTypeTestData.json");

    let entity_data = read_json(&entity_data_file);

    let options = jo(vec![("entity", getp(&entity_data, "existing"))]);

    let client = test_sdk(options, extra.clone());

    // Generate idmap via transform, matching the TS pattern.
    let idmap = vs::transform(
        &ja(vec![Value::str("event_type01"), Value::str("event_type02"), Value::str("event_type03")]),
        &jo(vec![(
            "`$PACK`",
            ja(vec![
                Value::str(""),
                jo(vec![
                    ("`$KEY`", Value::str("`$COPY`")),
                    (
                        "`$VAL`",
                        ja(vec![
                            Value::str("`$FORMAT`"),
                            Value::str("upper"),
                            Value::str("`$COPY`"),
                        ]),
                    ),
                ]),
            ]),
        )]),
        None,
    )
    .unwrap_or_else(|_| Value::empty_map());

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    let entid_env_raw = std::env::var("HOOK0_TEST_EVENT_TYPE_ENTID").unwrap_or_default();
    let idmap_overridden =
        !entid_env_raw.trim().is_empty() && entid_env_raw.trim().starts_with('{');

    let env = env_override(jo(vec![
        ("HOOK0_TEST_EVENT_TYPE_ENTID", idmap.clone()),
        ("HOOK0_TEST_LIVE", Value::str("FALSE")),
        ("HOOK0_TEST_EXPLAIN", Value::str("FALSE")),
        ("HOOK0_APIKEY", Value::str("")),
    ]));

    let idmap_resolved = match to_map(&getp(&env, "HOOK0_TEST_EVENT_TYPE_ENTID")) {
        Value::Map(m) => Value::Map(m),
        _ => to_map(&idmap),
    };

    let live = getp(&env, "HOOK0_TEST_LIVE") == Value::str("TRUE");

    let client = if live {
        let merged = vs::merge(
            // live_client_options() FIRST, so the generated entries below win:
            // sdk-test-control.json's test.client.options adds to the live
            // client, it does not redirect it.
            &ja(vec![
                live_client_options(),
                jo(vec![("apikey", getp(&env, "HOOK0_APIKEY"))]),
                // A NON-NODE later entry REPLACES the accumulated map in
                // vs::merge, and the normal call passes Value::Noval - so a
                // a bare extra discarded live_client_options() and the
                // apikey/server map above it, and the live client was
                // constructed with nothing.
                match extra {
                    Value::Map(m) => Value::Map(m),
                    _ => Value::empty_map(),
                },
            ]),
            None,
        );
        Hook0SDK::new(to_map(&merged))
    } else {
        client
    };

    EntityTestSetup {
        client,
        data: entity_data,
        idmap: idmap_resolved,
        env: env.clone(),
        explain: getp(&env, "HOOK0_TEST_EXPLAIN") == Value::str("TRUE"),
        live,
        synthetic_only: live && !idmap_overridden,
        now: now_ms(),
    }
}
