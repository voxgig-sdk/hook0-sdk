# EventType entity test

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


class _FailHook(Hook0BaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("event_type hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestEventTypeEntity:

    def test_should_create_instance(self):
        testsdk = Hook0SDK.test(None, None)
        ent = testsdk.EventType(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "event_type": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = Hook0SDK.test(seed, None)
        seen = list(base.EventType(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from hook0_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = Hook0SDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.EventType(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(Hook0SDK.test(offline, None).EventType(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(Hook0SDK.test(offline, None).EventType(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = Hook0SDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.EventType(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(Hook0SDK.test(None, None).EventType(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = Hook0SDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.EventType(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.EventType(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_validate_each_listed_record(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        opts = {"feature": {"validate": {"active": True, "request": False, "response": True}}}
        listed = Hook0SDK.test({"entity": {"event_type": {"v1": {"application_id": "x", "event_type_name": "x", "resource_type": "x", "resource_type_name": "x", "service": "x", "service_name": "x", "verb": "x", "verb_name": "x"}}}}, opts).EventType(None).list(None, None)
        assert ["v1"] == [ent.data_get().get("id") for ent in listed]
        with pytest.raises(Exception) as err:
            Hook0SDK.test({"entity": {"event_type": {"v1": {"application_id": 1, "event_type_name": "x", "resource_type": "x", "resource_type_name": "x", "service": "x", "service_name": "x", "verb": "x", "verb_name": "x"}}}}, opts).EventType(None).list(None, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = Hook0SDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.EventType(None).list({"application_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _event_type_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "event_type." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"event_type.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/event_types/\"}")
            print("LIVE STEP {\"id\":\"event_type.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/event_types/{event_type_name}\"}")
            print("LIVE STEP {\"id\":\"event_type.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        # CREATE
        event_type_ref01_ent = client.EventType(None)
        event_type_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.event_type"), "event_type_ref01"))

        event_type_ref01_data = helpers.to_map(runner.entity_data(event_type_ref01_ent.create(event_type_ref01_data, None)))
        assert event_type_ref01_data is not None
        assert event_type_ref01_data["id"] is not None

        # LIST
        event_type_ref01_match = {}

        event_type_ref01_list_result = event_type_ref01_ent.list(event_type_ref01_match, None)
        assert isinstance(event_type_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(event_type_ref01_list_result),
            {"id": event_type_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        event_type_ref01_match_dt0 = {
            "id": event_type_ref01_data["id"],
        }
        event_type_ref01_data_dt0_loaded = event_type_ref01_ent.load(event_type_ref01_match_dt0, None)
        event_type_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(event_type_ref01_data_dt0_loaded))
        assert event_type_ref01_data_dt0_load_result is not None
        assert event_type_ref01_data_dt0_load_result["id"] == event_type_ref01_data["id"]

        # REMOVE
        event_type_ref01_match_rm0 = {
            "id": event_type_ref01_data["id"],
        }
        event_type_ref01_ent.remove(event_type_ref01_match_rm0, None)

        # LIST
        event_type_ref01_match_rt0 = {}

        event_type_ref01_list_rt0_result = event_type_ref01_ent.list(event_type_ref01_match_rt0, None)
        assert isinstance(event_type_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(event_type_ref01_list_rt0_result),
            {"id": event_type_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "event_type",
                                 lambda: client.EventType(None).list({}, None))

        # Bootstrap entity data from existing test data.
        event_type_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.event_type")))
        event_type_ref01_data = None
        if len(event_type_ref01_data_raw) > 0:
            event_type_ref01_data = helpers.to_map(event_type_ref01_data_raw[0][1])

        # LIST
        event_type_ref01_ent = client.EventType(None)
        event_type_ref01_match = {}

        event_type_ref01_list_result = event_type_ref01_ent.list(event_type_ref01_match, None)
        assert isinstance(event_type_ref01_list_result, list)

        # LOAD
        event_type_ref01_match_dt0 = {
            "id": event_type_ref01_data["id"],
        }
        event_type_ref01_data_dt0_loaded = event_type_ref01_ent.load(event_type_ref01_match_dt0, None)
        event_type_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(event_type_ref01_data_dt0_loaded))
        assert event_type_ref01_data_dt0_load_result is not None
        assert event_type_ref01_data_dt0_load_result["id"] == event_type_ref01_data["id"]



def _event_type_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/event_type/EventTypeTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Hook0SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["event_type01", "event_type02", "event_type03"],
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
        "HOOK0_TEST_EVENT_TYPE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOOK0_TEST_EVENT_TYPE_ENTID": idmap,
        "HOOK0_TEST_LIVE": "FALSE",
        "HOOK0_TEST_EXPLAIN": "FALSE",
        "HOOK0_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOOK0_TEST_EVENT_TYPE_ENTID"))
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
