# IngestedEvent entity test

import json
import os
import time

import pytest

from hook0_sdk.utility.voxgig_struct import voxgig_struct as vs
from hook0_sdk import Hook0SDK
from hook0_sdk.core import helpers
from hook0_sdk.config import shared_config
from hook0_sdk.feature.base_feature import Hook0BaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestIngestedEventEntity:

    def test_should_create_instance(self):
        testsdk = Hook0SDK.test(None, None)
        ent = testsdk.IngestedEvent(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = Hook0SDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.IngestedEvent(None).create({"application_id": 1, "event_type": "x", "labels": "x", "occurred_at": "x", "payload": "x", "payload_content_type": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _ingested_event_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "ingested_event." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"ingested_event.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/event/\"}")
            pytest.skip("Live coverage incomplete: ingested_event.create.0 excluded (GET-only live run: needs POST /api/v1/event/)")

        client = setup["client"]

        # CREATE
        ingested_event_ref01_ent = client.IngestedEvent(None)
        ingested_event_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.ingested_event"), "ingested_event_ref01"))

        ingested_event_ref01_data = helpers.to_map(runner.entity_data(ingested_event_ref01_ent.create(ingested_event_ref01_data, None)))
        assert ingested_event_ref01_data is not None



def _ingested_event_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/ingested_event/IngestedEventTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Hook0SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["ingested_event01", "ingested_event02", "ingested_event03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "HOOK0_TEST_INGESTED_EVENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOOK0_TEST_INGESTED_EVENT_ENTID": idmap,
        "HOOK0_TEST_LIVE": "FALSE",
        "HOOK0_TEST_EXPLAIN": "FALSE",
        "HOOK0_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOOK0_TEST_INGESTED_EVENT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("HOOK0_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
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
