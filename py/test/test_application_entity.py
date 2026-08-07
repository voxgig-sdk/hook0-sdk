# Application entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from hook0_sdk import Hook0SDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestApplicationEntity:

    def test_should_create_instance(self):
        testsdk = Hook0SDK.test(None, None)
        ent = testsdk.Application(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "application": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = Hook0SDK.test(seed, None)
        seen = list(base.Application(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = Hook0SDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Application(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _application_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "application." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HOOK__TEST_APPLICATION_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        application_ref01_ent = client.Application(None)
        application_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.application"), "application_ref01"))

        application_ref01_data = helpers.to_map(application_ref01_ent.create(application_ref01_data, None))
        assert application_ref01_data is not None

        # LIST
        application_ref01_match = {}

        application_ref01_list_result = application_ref01_ent.list(application_ref01_match, None)
        assert isinstance(application_ref01_list_result, list)

        # UPDATE
        application_ref01_data_up0_up = {
        }

        application_ref01_markdef_up0_name = "application_id"
        application_ref01_markdef_up0_value = "Mark01-application_ref01_" + str(setup["now"])
        application_ref01_data_up0_up[application_ref01_markdef_up0_name] = application_ref01_markdef_up0_value

        application_ref01_resdata_up0 = helpers.to_map(application_ref01_ent.update(application_ref01_data_up0_up, None))
        assert application_ref01_resdata_up0 is not None
        assert application_ref01_resdata_up0[application_ref01_markdef_up0_name] == application_ref01_markdef_up0_value

        # LOAD
        application_ref01_match_dt0 = {}
        application_ref01_data_dt0_loaded = application_ref01_ent.load(application_ref01_match_dt0, None)
        assert application_ref01_data_dt0_loaded is not None


        # LIST
        application_ref01_match_rt0 = {}

        application_ref01_list_rt0_result = application_ref01_ent.list(application_ref01_match_rt0, None)
        assert isinstance(application_ref01_list_rt0_result, list)



def _application_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/application/ApplicationTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Hook0SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["application01", "application02", "application03"],
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
        "HOOK__TEST_APPLICATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOOK__TEST_APPLICATION_ENTID": idmap,
        "HOOK__TEST_LIVE": "FALSE",
        "HOOK__TEST_EXPLAIN": "FALSE",
        "HOOK__APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOOK__TEST_APPLICATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOOK__TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("HOOK__APIKEY"),
            },
            extra or {},
        ])
        client = Hook0SDK(helpers.to_map(merged_opts))

    _live = env.get("HOOK__TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("HOOK__TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
