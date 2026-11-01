// Generated basic-flow test for the login entity (model-driven;
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
fn login_entity_instance() {
    let testsdk = test_sdk(Value::Noval, Value::Noval);
    let ent = testsdk.login(Value::Noval);
    assert_eq!(ent.get_name(), "login");
}

#[test]
fn login_entity_validate() {
    if getp(&getp(&hook0_sdk::make_config(), "feature"), "validate").is_noval() {
        return;
    }
    let client = test_sdk(Value::Noval, jo(vec![(
        "feature",
        jo(vec![("validate", jo(vec![("active", Value::Bool(true))]))]),
    )]));
    let err = client
        .login(Value::Noval)
        .create(jo(vec![("email", Value::Num(1.0)), ("password", Value::str("x")), ("token", Value::str("x"))]), Value::Noval)
        .err()
        .expect("an invalid request should fail");
    assert_eq!(err.code, "validate_failed");
}

#[test]
fn login_entity_basic() {
    let setup = login_basic_setup(Value::Noval);
    // Per-op sdk-test-control.json skip — the basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    let mode = if setup.live { "live" } else { "unit" };
    for op in ["create"] {
        let (skip, reason) = is_control_skipped("entityOp", &format!("login.{}", op), mode);
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
        println!("{}", "LIVE STEP {\"id\":\"login.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/auth/login\"}");
        eprintln!("skip: {}", "Live coverage incomplete: login.create.0 excluded (GET-only live run: needs POST /api/v1/auth/login)");
        return;
    }

    let client = setup.client.clone();
    // CREATE
    let login_ref01_ent = client.login(Value::Noval);
    let login_ref01_data = to_map(&getp(
        &getpath(&["new", "login"], &setup.data),
        "login_ref01",
    ));

    let login_ref01_data_result = login_ref01_ent
        .create(login_ref01_data.clone(), Value::Noval)
        .expect("create failed");
    let login_ref01_data = to_map(&login_ref01_data_result.data(None));
    assert!(
        matches!(login_ref01_data, Value::Map(_)),
        "expected create result to be a map"
    );

}

fn login_basic_setup(extra: Value) -> EntityTestSetup {
    load_env_local();

    let mut entity_data_file = manifest_dir();
    entity_data_file.push("..");
    entity_data_file.push(".sdk");
    entity_data_file.push("test");
    entity_data_file.push("entity");
    entity_data_file.push("login");
    entity_data_file.push("LoginTestData.json");

    let entity_data = read_json(&entity_data_file);

    let options = jo(vec![("entity", getp(&entity_data, "existing"))]);

    let client = test_sdk(options, extra.clone());

    // Generate idmap via transform, matching the TS pattern.
    let idmap = vs::transform(
        &ja(vec![Value::str("login01"), Value::str("login02"), Value::str("login03")]),
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
    let entid_env_raw = std::env::var("HOOK0_TEST_LOGIN_ENTID").unwrap_or_default();
    let idmap_overridden =
        !entid_env_raw.trim().is_empty() && entid_env_raw.trim().starts_with('{');

    let env = env_override(jo(vec![
        ("HOOK0_TEST_LOGIN_ENTID", idmap.clone()),
        ("HOOK0_TEST_LIVE", Value::str("FALSE")),
        ("HOOK0_TEST_EXPLAIN", Value::str("FALSE")),
        ("HOOK0_APIKEY", Value::str("")),
    ]));

    let idmap_resolved = match to_map(&getp(&env, "HOOK0_TEST_LOGIN_ENTID")) {
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
