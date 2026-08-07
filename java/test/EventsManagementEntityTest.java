package voxgig.hook0sdk.sdktest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

import voxgig.hook0sdk.core.Helpers;
import voxgig.hook0sdk.core.SdkEntity;
import voxgig.hook0sdk.core.Hook0SDK;
import voxgig.hook0sdk.utility.Json;
import voxgig.hook0sdk.utility.struct.Struct;

@SuppressWarnings({"unchecked", "unused"})
public class EventsManagementEntityTest {

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.eventsManagement(null);
    assertNotNull(ent, "expected non-null events_management entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = eventsManagementBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "events_management." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    // The basic flow consumes synthetic IDs from the fixture. In live mode
    // without an *_ENTID env override, those IDs hit the live API and 4xx.
    Assumptions.assumeFalse(setup.syntheticOnly,
        "live entity test uses synthetic IDs from fixture — set HOOK__TEST_EVENTS_MANAGEMENT_ENTID JSON to run live");
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity eventsManagementRef01Ent = client.eventsManagement(null);
    Map<String, Object> eventsManagementRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.events_management"), "events_management_ref01"));
    eventsManagementRef01Data.put("event_id", setup.idmap.get("event01"));

    Object eventsManagementRef01DataResult = eventsManagementRef01Ent.create(eventsManagementRef01Data, null);
    eventsManagementRef01Data = Helpers.toMapAny(eventsManagementRef01DataResult);
    assertNotNull(eventsManagementRef01Data, "expected create result to be a map");

    // LIST
    Map<String, Object> eventsManagementRef01Match = new LinkedHashMap<>();

    Object eventsManagementRef01ListResult = eventsManagementRef01Ent.list(eventsManagementRef01Match, null);
    assertTrue(eventsManagementRef01ListResult instanceof List,
        "expected list result to be an array, got " + eventsManagementRef01ListResult);
    List<Object> eventsManagementRef01List = (List<Object>) eventsManagementRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(eventsManagementRef01List),
        Struct.jm("id", eventsManagementRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // REMOVE
    Map<String, Object> eventsManagementRef01MatchRm0 = new LinkedHashMap<>();
    eventsManagementRef01MatchRm0.put("id", eventsManagementRef01Data.get("id"));
    eventsManagementRef01Ent.remove(eventsManagementRef01MatchRm0, null);

    // LIST
    Map<String, Object> eventsManagementRef01MatchRt0 = new LinkedHashMap<>();

    Object eventsManagementRef01ListRt0Result = eventsManagementRef01Ent.list(eventsManagementRef01MatchRt0, null);
    assertTrue(eventsManagementRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + eventsManagementRef01ListRt0Result);
    List<Object> eventsManagementRef01ListRt0 = (List<Object>) eventsManagementRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(eventsManagementRef01ListRt0),
        Struct.jm("id", eventsManagementRef01Data.get("id")));
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list");

  }

  @Test
  public void stream() {
    Map<String, Object> streamingActive = new LinkedHashMap<>();
    Map<String, Object> streamingOpts = new LinkedHashMap<>();
    streamingOpts.put("active", true);
    Map<String, Object> featureOpts = new LinkedHashMap<>();
    featureOpts.put("streaming", streamingOpts);
    streamingActive.put("feature", featureOpts);

    RunnerSupport.EntityTestSetup setup = eventsManagementBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.eventsManagement(null);
    Map<String, Object> match = new LinkedHashMap<>();

    // Materialised list result for the same op.
    Object listedResult = ent.list(match, null);
    List<Object> listed = listedResult instanceof List
        ? (List<Object>) listedResult : new ArrayList<>();

    // stream("list") yields items via the streaming feature's iterator.
    List<Object> streamed = ent.stream("list", match, null)
        .collect(Collectors.toList());
    assertTrue(streamed.size() > 0, "expected stream to yield items");
    assertEquals(listed.size(), streamed.size(),
        "expected stream to yield the same item count as list");

    // Fallback: with streaming inactive, stream still yields the
    // materialised items.
    RunnerSupport.EntityTestSetup setup2 = eventsManagementBasicSetup(null);
    SdkEntity ent2 = setup2.client.eventsManagement(null);
    List<Object> streamed2 = ent2.stream("list", match, null)
        .collect(Collectors.toList());
    assertEquals(listed.size(), streamed2.size(),
        "expected fallback stream to yield the materialised items");
  }

  static RunnerSupport.EntityTestSetup eventsManagementBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "events_management", "EventsManagementTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read events_management test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("events_management01");
    idnames.add("events_management02");
    idnames.add("events_management03");
    idnames.add("event_type01");
    idnames.add("event_type02");
    idnames.add("event_type03");
    idnames.add("event01");
    idnames.add("event02");
    idnames.add("event03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against
    // synthetic IDs from the fixture and 4xx's. Surface this so the test
    // can skip.
    String entidEnvRaw = RunnerSupport.getenv("HOOK__TEST_EVENTS_MANAGEMENT_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK__TEST_EVENTS_MANAGEMENT_ENTID", idmap);
    envm.put("HOOK__TEST_LIVE", "FALSE");
    envm.put("HOOK__TEST_EXPLAIN", "FALSE");
    envm.put("HOOK__APIKEY", "NONE");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK__TEST_EVENTS_MANAGEMENT_ENTID"));
    if (idmapResolved == null) {
      idmapResolved = Helpers.toMapAny(idmap);
    }

    boolean live = "TRUE".equals(env.get("HOOK__TEST_LIVE"));
    if (live) {
      Map<String, Object> liveOpts = new LinkedHashMap<>();
      liveOpts.put("apikey", env.get("HOOK__APIKEY"));
      Object mergedOpts = Struct.merge(Struct.jt(liveOpts, extra));
      client = new Hook0SDK(Helpers.toMapAny(mergedOpts));
    }

    RunnerSupport.EntityTestSetup setup = new RunnerSupport.EntityTestSetup();
    setup.client = client;
    setup.data = entityData;
    setup.idmap = idmapResolved;
    setup.env = env;
    setup.explain = "TRUE".equals(env.get("HOOK__TEST_EXPLAIN"));
    setup.live = live;
    setup.syntheticOnly = live && !idmapOverridden;
    setup.now = System.currentTimeMillis();
    return setup;
  }
}
