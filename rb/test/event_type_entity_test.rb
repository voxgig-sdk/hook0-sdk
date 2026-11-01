# EventType entity test

require "minitest/autorun"
require "json"
require_relative "../Hook0_sdk"
require_relative "runner"

class EventTypeEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = Hook0SDK.test(nil, nil)
    ent = testsdk.EventType(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "event_type" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = Hook0SDK.test(seed, nil).EventType(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "event_type" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = Hook0SDK.test(seed, nil)
    seen = base.EventType(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = Hook0Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = Hook0SDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.EventType(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < Hook0BaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "event_type hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      Hook0SDK.test(offline, nil).EventType(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    Hook0SDK.test(offline, nil).EventType(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = Hook0Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = Hook0SDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.EventType(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    Hook0SDK.test(nil, nil).EventType(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = Hook0SDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.EventType(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.EventType(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = Hook0Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = Hook0SDK.test({ "entity" => { "event_type" => { "v1" => { "application_id" => "x", "event_type_name" => "x", "resource_type" => "x", "resource_type_name" => "x", "service" => "x", "service_name" => "x", "verb" => "x", "verb_name" => "x" } } } }, opts).EventType(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      Hook0SDK.test({ "entity" => { "event_type" => { "v1" => { "application_id" => 1, "event_type_name" => "x", "resource_type" => "x", "resource_type_name" => "x", "service" => "x", "service_name" => "x", "verb" => "x", "verb_name" => "x" } } } }, opts).EventType(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = Hook0Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = Hook0SDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.EventType(nil).list({ "application_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = event_type_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "event_type." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"event_type.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/event_types/\"}"
      puts "LIVE STEP {\"id\":\"event_type.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/event_types/{event_type_name}\"}"
      puts "LIVE STEP {\"id\":\"event_type.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "event_type") do
        client.EventType(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    event_type_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.event_type")))
    event_type_ref01_data = nil
    if event_type_ref01_data_raw.length > 0
      event_type_ref01_data = Helpers.to_map(event_type_ref01_data_raw[0][1])
    end

    # LIST
    event_type_ref01_ent = client.EventType(nil)
    event_type_ref01_match = {}

    event_type_ref01_list_result = event_type_ref01_ent.list(event_type_ref01_match, nil)
    assert event_type_ref01_list_result.is_a?(Array)

    # LOAD
    event_type_ref01_match_dt0 = {
      "id" => event_type_ref01_data["id"],
    }
    event_type_ref01_data_dt0_loaded = event_type_ref01_ent.load(event_type_ref01_match_dt0, nil)
    event_type_ref01_data_dt0_load_result = Helpers.to_map(event_type_ref01_data_dt0_loaded.respond_to?(:data_get) ? event_type_ref01_data_dt0_loaded.data_get : event_type_ref01_data_dt0_loaded)
    assert !event_type_ref01_data_dt0_load_result.nil?
    assert_equal event_type_ref01_data_dt0_load_result["id"], event_type_ref01_data["id"]

      return
    end

    client = setup[:client]

    # CREATE
    event_type_ref01_ent = client.EventType(nil)
    event_type_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.event_type"), "event_type_ref01"))

    event_type_ref01_data_result = event_type_ref01_ent.create(event_type_ref01_data, nil)
    event_type_ref01_data = Helpers.to_map(event_type_ref01_data_result.respond_to?(:data_get) ? event_type_ref01_data_result.data_get : event_type_ref01_data_result)
    assert !event_type_ref01_data.nil?
    assert !event_type_ref01_data["id"].nil?

    # LIST
    event_type_ref01_match = {}

    event_type_ref01_list_result = event_type_ref01_ent.list(event_type_ref01_match, nil)
    assert event_type_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(event_type_ref01_list_result),
      { "id" => event_type_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    event_type_ref01_match_dt0 = {
      "id" => event_type_ref01_data["id"],
    }
    event_type_ref01_data_dt0_loaded = event_type_ref01_ent.load(event_type_ref01_match_dt0, nil)
    event_type_ref01_data_dt0_load_result = Helpers.to_map(event_type_ref01_data_dt0_loaded.respond_to?(:data_get) ? event_type_ref01_data_dt0_loaded.data_get : event_type_ref01_data_dt0_loaded)
    assert !event_type_ref01_data_dt0_load_result.nil?
    assert_equal event_type_ref01_data_dt0_load_result["id"], event_type_ref01_data["id"]

    # REMOVE
    event_type_ref01_match_rm0 = {
      "id" => event_type_ref01_data["id"],
    }
    event_type_ref01_ent.remove(event_type_ref01_match_rm0, nil)

    # LIST
    event_type_ref01_match_rt0 = {}

    event_type_ref01_list_rt0_result = event_type_ref01_ent.list(event_type_ref01_match_rt0, nil)
    assert event_type_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(event_type_ref01_list_rt0_result),
      { "id" => event_type_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def event_type_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "event_type", "EventTypeTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = Hook0SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["event_type01", "event_type02", "event_type03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["HOOK0_TEST_EVENT_TYPE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOOK0_TEST_EVENT_TYPE_ENTID" => idmap,
    "HOOK0_TEST_LIVE" => "FALSE",
    "HOOK0_TEST_EXPLAIN" => "FALSE",
    "HOOK0_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["HOOK0_TEST_EVENT_TYPE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HOOK0_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["HOOK0_APIKEY"],
      },
      extra || {},
    ])
    client = Hook0SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HOOK0_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HOOK0_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
