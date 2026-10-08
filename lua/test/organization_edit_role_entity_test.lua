-- OrganizationEditRole entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hook0_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("OrganizationEditRoleEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:OrganizationEditRole(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:OrganizationEditRole(nil):update({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = organization_edit_role_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "organization_edit_role." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a organization_edit_role record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local organization_edit_role_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.organization_edit_role")))
    local organization_edit_role_ref01_data = nil
    if #organization_edit_role_ref01_data_raw > 0 then
      organization_edit_role_ref01_data = helpers.to_map(organization_edit_role_ref01_data_raw[1][2])
    end

    -- UPDATE
    local organization_edit_role_ref01_ent = client:OrganizationEditRole(nil)
    local organization_edit_role_ref01_data_up0_up = {
      id = organization_edit_role_ref01_data["id"],
    }

    local organization_edit_role_ref01_markdef_up0_name = "role"
    local organization_edit_role_ref01_markdef_up0_value = "Mark01-organization_edit_role_ref01_" .. tostring(setup.now)
    organization_edit_role_ref01_data_up0_up[organization_edit_role_ref01_markdef_up0_name] = organization_edit_role_ref01_markdef_up0_value

    local organization_edit_role_ref01_resdata_up0_result, err = organization_edit_role_ref01_ent:update(organization_edit_role_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local organization_edit_role_ref01_resdata_up0 = helpers.to_map(type(organization_edit_role_ref01_resdata_up0_result) == 'table' and organization_edit_role_ref01_resdata_up0_result.data_get and organization_edit_role_ref01_resdata_up0_result:data_get() or organization_edit_role_ref01_resdata_up0_result)
    assert.is_not_nil(organization_edit_role_ref01_resdata_up0)
    assert.are.equal(organization_edit_role_ref01_resdata_up0["id"], organization_edit_role_ref01_data_up0_up["id"])
    assert.are.equal(organization_edit_role_ref01_resdata_up0[organization_edit_role_ref01_markdef_up0_name], organization_edit_role_ref01_markdef_up0_value)

  end)
end)

function organization_edit_role_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/organization_edit_role/OrganizationEditRoleTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read organization_edit_role test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "organization_edit_role01", "organization_edit_role02", "organization_edit_role03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"] = idmap,
    ["HOOK0_TEST_LIVE"] = "FALSE",
    ["HOOK0_TEST_EXPLAIN"] = "FALSE",
    ["HOOK0_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HOOK0_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["HOOK0_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HOOK0_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HOOK0_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
