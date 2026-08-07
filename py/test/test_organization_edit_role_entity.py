# OrganizationEditRole entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from hook0_sdk import Hook0SDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestOrganizationEditRoleEntity:

    def test_should_create_instance(self):
        testsdk = Hook0SDK.test(None, None)
        ent = testsdk.OrganizationEditRole(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _organization_edit_role_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "organization_edit_role." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        organization_edit_role_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.organization_edit_role")))
        organization_edit_role_ref01_data = None
        if len(organization_edit_role_ref01_data_raw) > 0:
            organization_edit_role_ref01_data = helpers.to_map(organization_edit_role_ref01_data_raw[0][1])

        # UPDATE
        organization_edit_role_ref01_ent = client.OrganizationEditRole(None)
        organization_edit_role_ref01_data_up0_up = {
        }

        organization_edit_role_ref01_markdef_up0_name = "role"
        organization_edit_role_ref01_markdef_up0_value = "Mark01-organization_edit_role_ref01_" + str(setup["now"])
        organization_edit_role_ref01_data_up0_up[organization_edit_role_ref01_markdef_up0_name] = organization_edit_role_ref01_markdef_up0_value

        organization_edit_role_ref01_resdata_up0 = helpers.to_map(organization_edit_role_ref01_ent.update(organization_edit_role_ref01_data_up0_up, None))
        assert organization_edit_role_ref01_resdata_up0 is not None
        assert organization_edit_role_ref01_resdata_up0[organization_edit_role_ref01_markdef_up0_name] == organization_edit_role_ref01_markdef_up0_value



def _organization_edit_role_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/organization_edit_role/OrganizationEditRoleTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Hook0SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["organization_edit_role01", "organization_edit_role02", "organization_edit_role03"],
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
        "HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID": idmap,
        "HOOK__TEST_LIVE": "FALSE",
        "HOOK__TEST_EXPLAIN": "FALSE",
        "HOOK__APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID"))
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
