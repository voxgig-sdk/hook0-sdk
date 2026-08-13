-- ApplicationSecret entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hook0_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ApplicationSecretEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ApplicationSecret(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["application_secret"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:ApplicationSecret(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:ApplicationSecret(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = application_secret_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "application_secret." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_APPLICATION_SECRET_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local application_secret_ref01_ent = client:ApplicationSecret(nil)
    local application_secret_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.application_secret"), "application_secret_ref01"))

    local application_secret_ref01_data_result, err = application_secret_ref01_ent:create(application_secret_ref01_data, nil)
    assert.is_nil(err)
    application_secret_ref01_data = helpers.to_map(type(application_secret_ref01_data_result) == 'table' and application_secret_ref01_data_result.data_get and application_secret_ref01_data_result:data_get() or application_secret_ref01_data_result)
    assert.is_not_nil(application_secret_ref01_data)

    -- LIST
    local application_secret_ref01_match = {}

    local application_secret_ref01_list_result, err = application_secret_ref01_ent:list(application_secret_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(application_secret_ref01_list_result)

    -- UPDATE
    local application_secret_ref01_data_up0_up = {
    }

    local application_secret_ref01_markdef_up0_name = "application_id"
    local application_secret_ref01_markdef_up0_value = "Mark01-application_secret_ref01_" .. tostring(setup.now)
    application_secret_ref01_data_up0_up[application_secret_ref01_markdef_up0_name] = application_secret_ref01_markdef_up0_value

    local application_secret_ref01_resdata_up0_result, err = application_secret_ref01_ent:update(application_secret_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local application_secret_ref01_resdata_up0 = helpers.to_map(type(application_secret_ref01_resdata_up0_result) == 'table' and application_secret_ref01_resdata_up0_result.data_get and application_secret_ref01_resdata_up0_result:data_get() or application_secret_ref01_resdata_up0_result)
    assert.is_not_nil(application_secret_ref01_resdata_up0)
    assert.are.equal(application_secret_ref01_resdata_up0[application_secret_ref01_markdef_up0_name], application_secret_ref01_markdef_up0_value)

  end)
end)

function application_secret_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/application_secret/ApplicationSecretTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read application_secret test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "application_secret01", "application_secret02", "application_secret03" },
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
  local entid_env_raw = os.getenv("HOOK0_TEST_APPLICATION_SECRET_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOOK0_TEST_APPLICATION_SECRET_ENTID"] = idmap,
    ["HOOK0_TEST_LIVE"] = "FALSE",
    ["HOOK0_TEST_EXPLAIN"] = "FALSE",
    ["HOOK0_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["HOOK0_TEST_APPLICATION_SECRET_ENTID"])
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
