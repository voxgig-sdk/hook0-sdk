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
public class SubscriptionEntityTest {

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.subscription(null);
    assertNotNull(ent, "expected non-null subscription entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = subscriptionBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "update", "load", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "subscription." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    // The basic flow consumes synthetic IDs from the fixture. In live mode
    // without an *_ENTID env override, those IDs hit the live API and 4xx.
    Assumptions.assumeFalse(setup.syntheticOnly,
        "live entity test uses synthetic IDs from fixture — set HOOK0_TEST_SUBSCRIPTION_ENTID JSON to run live");
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity subscriptionRef01Ent = client.subscription(null);
    Map<String, Object> subscriptionRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.subscription"), "subscription_ref01"));

    Object subscriptionRef01DataResult = subscriptionRef01Ent.create(subscriptionRef01Data, null);
    subscriptionRef01Data = Helpers.toMapAny(subscriptionRef01DataResult instanceof SdkEntity ? ((SdkEntity) subscriptionRef01DataResult).data() : subscriptionRef01DataResult);
    assertNotNull(subscriptionRef01Data, "expected create result to be a map");

    // LIST
    Map<String, Object> subscriptionRef01Match = new LinkedHashMap<>();

    Object subscriptionRef01ListResult = subscriptionRef01Ent.list(subscriptionRef01Match, null);
    assertTrue(subscriptionRef01ListResult instanceof List,
        "expected list result to be an array, got " + subscriptionRef01ListResult);
    List<Object> subscriptionRef01List = (List<Object>) subscriptionRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(subscriptionRef01List),
        Struct.jm("id", subscriptionRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // UPDATE
    Map<String, Object> subscriptionRef01DataUp0Up = new LinkedHashMap<>();

    String subscriptionRef01MarkdefUp0Name = "application_id";
    String subscriptionRef01MarkdefUp0Value = "Mark01-subscription_ref01_" + setup.now;
    subscriptionRef01DataUp0Up.put(subscriptionRef01MarkdefUp0Name, subscriptionRef01MarkdefUp0Value);

    Object subscriptionRef01ResdataUp0Result = subscriptionRef01Ent.update(subscriptionRef01DataUp0Up, null);
    Map<String, Object> subscriptionRef01ResdataUp0 = Helpers.toMapAny(subscriptionRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) subscriptionRef01ResdataUp0Result).data() : subscriptionRef01ResdataUp0Result);
    assertNotNull(subscriptionRef01ResdataUp0, "expected update result to be a map");
    assertEquals(subscriptionRef01MarkdefUp0Value, subscriptionRef01ResdataUp0.get(subscriptionRef01MarkdefUp0Name),
        "expected " + subscriptionRef01MarkdefUp0Name + " to be updated");

    // LOAD
    Map<String, Object> subscriptionRef01MatchDt0 = new LinkedHashMap<>();
    Object subscriptionRef01DataDt0Loaded = subscriptionRef01Ent.load(subscriptionRef01MatchDt0, null);
    assertNotNull(subscriptionRef01DataDt0Loaded, "expected load result to be non-null");

    // REMOVE
    Map<String, Object> subscriptionRef01MatchRm0 = new LinkedHashMap<>();
    subscriptionRef01MatchRm0.put("id", subscriptionRef01Data.get("id"));
    subscriptionRef01Ent.remove(subscriptionRef01MatchRm0, null);

    // LIST
    Map<String, Object> subscriptionRef01MatchRt0 = new LinkedHashMap<>();

    Object subscriptionRef01ListRt0Result = subscriptionRef01Ent.list(subscriptionRef01MatchRt0, null);
    assertTrue(subscriptionRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + subscriptionRef01ListRt0Result);
    List<Object> subscriptionRef01ListRt0 = (List<Object>) subscriptionRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(subscriptionRef01ListRt0),
        Struct.jm("id", subscriptionRef01Data.get("id")));
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

    RunnerSupport.EntityTestSetup setup = subscriptionBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.subscription(null);
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
    RunnerSupport.EntityTestSetup setup2 = subscriptionBasicSetup(null);
    SdkEntity ent2 = setup2.client.subscription(null);
    List<Object> streamed2 = ent2.stream("list", match, null)
        .collect(Collectors.toList());
    assertEquals(listed.size(), streamed2.size(),
        "expected fallback stream to yield the materialised items");
  }

  static RunnerSupport.EntityTestSetup subscriptionBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "subscription", "SubscriptionTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read subscription test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("subscription01");
    idnames.add("subscription02");
    idnames.add("subscription03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against
    // synthetic IDs from the fixture and 4xx's. Surface this so the test
    // can skip.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_SUBSCRIPTION_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_SUBSCRIPTION_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "NONE");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_SUBSCRIPTION_ENTID"));
    if (idmapResolved == null) {
      idmapResolved = Helpers.toMapAny(idmap);
    }

    boolean live = "TRUE".equals(env.get("HOOK0_TEST_LIVE"));
    if (live) {
      Map<String, Object> liveOpts = new LinkedHashMap<>();
      liveOpts.put("apikey", env.get("HOOK0_APIKEY"));
      Object mergedOpts = Struct.merge(Struct.jt(liveOpts, extra));
      client = new Hook0SDK(Helpers.toMapAny(mergedOpts));
    }

    RunnerSupport.EntityTestSetup setup = new RunnerSupport.EntityTestSetup();
    setup.client = client;
    setup.data = entityData;
    setup.idmap = idmapResolved;
    setup.env = env;
    setup.explain = "TRUE".equals(env.get("HOOK0_TEST_EXPLAIN"));
    setup.live = live;
    setup.syntheticOnly = live && !idmapOverridden;
    setup.now = System.currentTimeMillis();
    return setup;
  }
}
