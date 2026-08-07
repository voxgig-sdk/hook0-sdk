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
public class ServiceTokenEntityTest {

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.serviceToken(null);
    assertNotNull(ent, "expected non-null service_token entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = serviceTokenBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "update", "load", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "service_token." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    // The basic flow consumes synthetic IDs from the fixture. In live mode
    // without an *_ENTID env override, those IDs hit the live API and 4xx.
    Assumptions.assumeFalse(setup.syntheticOnly,
        "live entity test uses synthetic IDs from fixture — set HOOK__TEST_SERVICE_TOKEN_ENTID JSON to run live");
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity serviceTokenRef01Ent = client.serviceToken(null);
    Map<String, Object> serviceTokenRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.service_token"), "service_token_ref01"));

    Object serviceTokenRef01DataResult = serviceTokenRef01Ent.create(serviceTokenRef01Data, null);
    serviceTokenRef01Data = Helpers.toMapAny(serviceTokenRef01DataResult);
    assertNotNull(serviceTokenRef01Data, "expected create result to be a map");

    // LIST
    Map<String, Object> serviceTokenRef01Match = new LinkedHashMap<>();

    Object serviceTokenRef01ListResult = serviceTokenRef01Ent.list(serviceTokenRef01Match, null);
    assertTrue(serviceTokenRef01ListResult instanceof List,
        "expected list result to be an array, got " + serviceTokenRef01ListResult);
    List<Object> serviceTokenRef01List = (List<Object>) serviceTokenRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(serviceTokenRef01List),
        Struct.jm("id", serviceTokenRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // UPDATE
    Map<String, Object> serviceTokenRef01DataUp0Up = new LinkedHashMap<>();

    String serviceTokenRef01MarkdefUp0Name = "biscuit";
    String serviceTokenRef01MarkdefUp0Value = "Mark01-service_token_ref01_" + setup.now;
    serviceTokenRef01DataUp0Up.put(serviceTokenRef01MarkdefUp0Name, serviceTokenRef01MarkdefUp0Value);

    Object serviceTokenRef01ResdataUp0Result = serviceTokenRef01Ent.update(serviceTokenRef01DataUp0Up, null);
    Map<String, Object> serviceTokenRef01ResdataUp0 = Helpers.toMapAny(serviceTokenRef01ResdataUp0Result);
    assertNotNull(serviceTokenRef01ResdataUp0, "expected update result to be a map");
    assertEquals(serviceTokenRef01MarkdefUp0Value, serviceTokenRef01ResdataUp0.get(serviceTokenRef01MarkdefUp0Name),
        "expected " + serviceTokenRef01MarkdefUp0Name + " to be updated");

    // LOAD
    Map<String, Object> serviceTokenRef01MatchDt0 = new LinkedHashMap<>();
    Object serviceTokenRef01DataDt0Loaded = serviceTokenRef01Ent.load(serviceTokenRef01MatchDt0, null);
    assertNotNull(serviceTokenRef01DataDt0Loaded, "expected load result to be non-null");

    // REMOVE
    Map<String, Object> serviceTokenRef01MatchRm0 = new LinkedHashMap<>();
    serviceTokenRef01MatchRm0.put("id", serviceTokenRef01Data.get("id"));
    serviceTokenRef01Ent.remove(serviceTokenRef01MatchRm0, null);

    // LIST
    Map<String, Object> serviceTokenRef01MatchRt0 = new LinkedHashMap<>();

    Object serviceTokenRef01ListRt0Result = serviceTokenRef01Ent.list(serviceTokenRef01MatchRt0, null);
    assertTrue(serviceTokenRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + serviceTokenRef01ListRt0Result);
    List<Object> serviceTokenRef01ListRt0 = (List<Object>) serviceTokenRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(serviceTokenRef01ListRt0),
        Struct.jm("id", serviceTokenRef01Data.get("id")));
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

    RunnerSupport.EntityTestSetup setup = serviceTokenBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.serviceToken(null);
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
    RunnerSupport.EntityTestSetup setup2 = serviceTokenBasicSetup(null);
    SdkEntity ent2 = setup2.client.serviceToken(null);
    List<Object> streamed2 = ent2.stream("list", match, null)
        .collect(Collectors.toList());
    assertEquals(listed.size(), streamed2.size(),
        "expected fallback stream to yield the materialised items");
  }

  static RunnerSupport.EntityTestSetup serviceTokenBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "service_token", "ServiceTokenTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read service_token test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("service_token01");
    idnames.add("service_token02");
    idnames.add("service_token03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against
    // synthetic IDs from the fixture and 4xx's. Surface this so the test
    // can skip.
    String entidEnvRaw = RunnerSupport.getenv("HOOK__TEST_SERVICE_TOKEN_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK__TEST_SERVICE_TOKEN_ENTID", idmap);
    envm.put("HOOK__TEST_LIVE", "FALSE");
    envm.put("HOOK__TEST_EXPLAIN", "FALSE");
    envm.put("HOOK__APIKEY", "NONE");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK__TEST_SERVICE_TOKEN_ENTID"));
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
