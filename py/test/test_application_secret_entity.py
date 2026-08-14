# ApplicationSecret entity test

import json
import os
import time

import pytest

from hook0_sdk.utility.voxgig_struct import voxgig_struct as vs
from hook0_sdk import Hook0SDK
from hook0_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestApplicationSecretEntity:

    def test_should_create_instance(self):
        testsdk = Hook0SDK.test(None, None)
        ent = testsdk.ApplicationSecret(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "application_secret": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = Hook0SDK.test(seed, None)
        seen = list(base.ApplicationSecret(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from hook0_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = Hook0SDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.ApplicationSecret(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _application_secret_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "application_secret." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HOOK0_TEST_APPLICATION_SECRET_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        application_secret_ref01_ent = client.ApplicationSecret(None)
        application_secret_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.application_secret"), "application_secret_ref01"))

        application_secret_ref01_data = helpers.to_map(runner.entity_data(application_secret_ref01_ent.create(application_secret_ref01_data, None)))
        assert application_secret_ref01_data is not None

        # LIST
        application_secret_ref01_match = {}

        application_secret_ref01_list_result = application_secret_ref01_ent.list(application_secret_ref01_match, None)
        assert isinstance(application_secret_ref01_list_result, list)

        # UPDATE
        application_secret_ref01_data_up0_up = {
        }

        application_secret_ref01_markdef_up0_name = "application_id"
        application_secret_ref01_markdef_up0_value = "Mark01-application_secret_ref01_" + str(setup["now"])
        application_secret_ref01_data_up0_up[application_secret_ref01_markdef_up0_name] = application_secret_ref01_markdef_up0_value

        application_secret_ref01_resdata_up0 = helpers.to_map(runner.entity_data(application_secret_ref01_ent.update(application_secret_ref01_data_up0_up, None)))
        assert application_secret_ref01_resdata_up0 is not None
        assert application_secret_ref01_resdata_up0[application_secret_ref01_markdef_up0_name] == application_secret_ref01_markdef_up0_value



def _application_secret_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/application_secret/ApplicationSecretTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Hook0SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["application_secret01", "application_secret02", "application_secret03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "HOOK0_TEST_APPLICATION_SECRET_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOOK0_TEST_APPLICATION_SECRET_ENTID": idmap,
        "HOOK0_TEST_LIVE": "FALSE",
        "HOOK0_TEST_EXPLAIN": "FALSE",
        "HOOK0_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOOK0_TEST_APPLICATION_SECRET_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOOK0_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("HOOK0_APIKEY"),
            },
            extra or {},
        ])
        client = Hook0SDK(helpers.to_map(merged_opts))

    _live = env.get("HOOK0_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HOOK0_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
