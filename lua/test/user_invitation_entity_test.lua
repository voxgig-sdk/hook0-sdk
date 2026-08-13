-- UserInvitation entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hook0_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("UserInvitationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:UserInvitation(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = user_invitation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "user_invitation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_USER_INVITATION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local user_invitation_ref01_ent = client:UserInvitation(nil)
    local user_invitation_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.user_invitation"), "user_invitation_ref01"))
    user_invitation_ref01_data["organization_id"] = setup.idmap["organization01"]

    local user_invitation_ref01_data_result, err = user_invitation_ref01_ent:create(user_invitation_ref01_data, nil)
    assert.is_nil(err)
    user_invitation_ref01_data = helpers.to_map(type(user_invitation_ref01_data_result) == 'table' and user_invitation_ref01_data_result.data_get and user_invitation_ref01_data_result:data_get() or user_invitation_ref01_data_result)
    assert.is_not_nil(user_invitation_ref01_data)

  end)
end)

function user_invitation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/user_invitation/UserInvitationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read user_invitation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "user_invitation01", "user_invitation02", "user_invitation03", "organization01", "organization02", "organization03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("HOOK0_TEST_USER_INVITATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOOK0_TEST_USER_INVITATION_ENTID"] = idmap,
    ["HOOK0_TEST_LIVE"] = "FALSE",
    ["HOOK0_TEST_EXPLAIN"] = "FALSE",
    ["HOOK0_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["HOOK0_TEST_USER_INVITATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HOOK0_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
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
