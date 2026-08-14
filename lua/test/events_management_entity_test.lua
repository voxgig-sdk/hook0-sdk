-- EventsManagement entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("hook0_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EventsManagementEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EventsManagement(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["events_management"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:EventsManagement(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:EventsManagement(nil):stream("list", nil, nil) do
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
    local setup = events_management_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "events_management." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_EVENTS_MANAGEMENT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local events_management_ref01_ent = client:EventsManagement(nil)
    local events_management_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.events_management"), "events_management_ref01"))
    events_management_ref01_data["event_id"] = setup.idmap["event01"]

    local events_management_ref01_data_result, err = events_management_ref01_ent:create(events_management_ref01_data, nil)
    assert.is_nil(err)
    events_management_ref01_data = helpers.to_map(type(events_management_ref01_data_result) == 'table' and events_management_ref01_data_result.data_get and events_management_ref01_data_result:data_get() or events_management_ref01_data_result)
    assert.is_not_nil(events_management_ref01_data)

    -- LIST
    local events_management_ref01_match = {}

    local events_management_ref01_list_result, err = events_management_ref01_ent:list(events_management_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(events_management_ref01_list_result)


    -- LIST
    local events_management_ref01_match_rt0 = {}

    local events_management_ref01_list_rt0_result, err = events_management_ref01_ent:list(events_management_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(events_management_ref01_list_rt0_result)

  end)
end)

function events_management_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/events_management/EventsManagementTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read events_management test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "events_management01", "events_management02", "events_management03", "event_type01", "event_type02", "event_type03", "event01", "event02", "event03" },
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
  local entid_env_raw = os.getenv("HOOK0_TEST_EVENTS_MANAGEMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HOOK0_TEST_EVENTS_MANAGEMENT_ENTID"] = idmap,
    ["HOOK0_TEST_LIVE"] = "FALSE",
    ["HOOK0_TEST_EXPLAIN"] = "FALSE",
    ["HOOK0_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["HOOK0_TEST_EVENTS_MANAGEMENT_ENTID"])
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
