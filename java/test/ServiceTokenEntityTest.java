package voxgig.hook0sdk.sdktest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

import voxgig.hook0sdk.core.Config;
import voxgig.hook0sdk.core.Context;
import voxgig.hook0sdk.core.Helpers;
import voxgig.hook0sdk.core.SdkEntity;
import voxgig.hook0sdk.core.SdkError;
import voxgig.hook0sdk.core.Hook0SDK;
import voxgig.hook0sdk.feature.BaseFeature;
import voxgig.hook0sdk.utility.Json;
import voxgig.hook0sdk.utility.struct.Struct;

@SuppressWarnings({"unchecked", "unused"})
public class ServiceTokenEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

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
    if (setup.live && "TRUE".equals(System.getenv("VOXGIG_GETONLY_GUARD"))) {
      System.out.println("LIVE STEP {\"id\":\"service_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/service_token/\"}");
      System.out.println("LIVE STEP {\"id\":\"service_token.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/service_token/{service_token_id}\"}");
      System.out.println("LIVE STEP {\"id\":\"service_token.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/service_token/{service_token_id}\"}");
      System.out.println("LIVE STEP {\"id\":\"service_token.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}");
    Hook0SDK client = setup.client;
    if (setup.live) {
      RunnerSupport.liveExisting(setup.data, LIVE_STRICT, "service_token", () -> {
        Map<String, Object> match = new LinkedHashMap<>();
        return client.serviceToken(null).list(match, null);
      });
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    List<List<Object>> serviceTokenRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.service_token")));
    Map<String, Object> serviceTokenRef01Data = serviceTokenRef01DataRaw.isEmpty()
        ? null : Helpers.toMapAny(serviceTokenRef01DataRaw.get(0).get(1));

    // LIST
    SdkEntity serviceTokenRef01Ent = client.serviceToken(null);
    Map<String, Object> serviceTokenRef01Match = new LinkedHashMap<>();

    Object serviceTokenRef01ListResult = serviceTokenRef01Ent.list(serviceTokenRef01Match, null);
    assertTrue(serviceTokenRef01ListResult instanceof List,
        "expected list result to be an array, got " + serviceTokenRef01ListResult);

    // LOAD
    Map<String, Object> serviceTokenRef01MatchDt0 = new LinkedHashMap<>();
    serviceTokenRef01MatchDt0.put("id", serviceTokenRef01Data.get("id"));
    Object serviceTokenRef01DataDt0Loaded = serviceTokenRef01Ent.load(serviceTokenRef01MatchDt0, null);
    Map<String, Object> serviceTokenRef01DataDt0LoadResult = Helpers.toMapAny(serviceTokenRef01DataDt0Loaded instanceof SdkEntity ? ((SdkEntity) serviceTokenRef01DataDt0Loaded).data() : serviceTokenRef01DataDt0Loaded);
    assertNotNull(serviceTokenRef01DataDt0LoadResult, "expected load result to be a map");
    assertEquals(serviceTokenRef01Data.get("id"), serviceTokenRef01DataDt0LoadResult.get("id"),
        "expected load result id to match");

      return;
    }

    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity serviceTokenRef01Ent = client.serviceToken(null);
    Map<String, Object> serviceTokenRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.service_token"), "service_token_ref01"));

    Object serviceTokenRef01DataResult = serviceTokenRef01Ent.create(serviceTokenRef01Data, null);
    serviceTokenRef01Data = Helpers.toMapAny(serviceTokenRef01DataResult instanceof SdkEntity ? ((SdkEntity) serviceTokenRef01DataResult).data() : serviceTokenRef01DataResult);
    assertNotNull(serviceTokenRef01Data, "expected create result to be a map");
    assertNotNull(serviceTokenRef01Data.get("id"), "expected created entity to have an id");

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
    serviceTokenRef01DataUp0Up.put("id", serviceTokenRef01Data.get("id"));

    String serviceTokenRef01MarkdefUp0Name = "biscuit";
    String serviceTokenRef01MarkdefUp0Value = "Mark01-service_token_ref01_" + setup.now;
    serviceTokenRef01DataUp0Up.put(serviceTokenRef01MarkdefUp0Name, serviceTokenRef01MarkdefUp0Value);

    Object serviceTokenRef01ResdataUp0Result = serviceTokenRef01Ent.update(serviceTokenRef01DataUp0Up, null);
    Map<String, Object> serviceTokenRef01ResdataUp0 = Helpers.toMapAny(serviceTokenRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) serviceTokenRef01ResdataUp0Result).data() : serviceTokenRef01ResdataUp0Result);
    assertNotNull(serviceTokenRef01ResdataUp0, "expected update result to be a map");
    assertEquals(serviceTokenRef01DataUp0Up.get("id"), serviceTokenRef01ResdataUp0.get("id"),
        "expected update result id to match");
    assertEquals(serviceTokenRef01MarkdefUp0Value, serviceTokenRef01ResdataUp0.get(serviceTokenRef01MarkdefUp0Name),
        "expected " + serviceTokenRef01MarkdefUp0Name + " to be updated");

    // LOAD
    Map<String, Object> serviceTokenRef01MatchDt0 = new LinkedHashMap<>();
    serviceTokenRef01MatchDt0.put("id", serviceTokenRef01Data.get("id"));
    Object serviceTokenRef01DataDt0Loaded = serviceTokenRef01Ent.load(serviceTokenRef01MatchDt0, null);
    Map<String, Object> serviceTokenRef01DataDt0LoadResult = Helpers.toMapAny(serviceTokenRef01DataDt0Loaded instanceof SdkEntity ? ((SdkEntity) serviceTokenRef01DataDt0Loaded).data() : serviceTokenRef01DataDt0Loaded);
    assertNotNull(serviceTokenRef01DataDt0LoadResult, "expected load result to be a map");
    assertEquals(serviceTokenRef01Data.get("id"), serviceTokenRef01DataDt0LoadResult.get("id"),
        "expected load result id to match");

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

  static boolean hasFeature(String name) {
    Map<String, Object> fm = Helpers.toMapAny(Config.makeConfig().get("feature"));
    return fm != null && fm.get(name) != null;
  }

  public static final class FailHook extends BaseFeature {
    int unexpected = 0;

    FailHook() {
      super("failhook", "0.0.1", true);
    }

    @Override
    public void preSpec(Context ctx) {
      throw new RuntimeException("service_token hook failed");
    }

    @Override
    public void preUnexpected(Context ctx) {
      this.unexpected++;
    }
  }

  @Test
  public void streamError() {
    Map<String, Object> offline = Struct.jm("net", Struct.jm("offline", true));
    RuntimeException err = assertThrows(RuntimeException.class, () ->
        Hook0SDK.testSDK(offline, null).serviceToken(null).stream("list", null, null)
            .collect(Collectors.toList()));
    assertTrue(err.getMessage().contains("offline"), err.getMessage());

    Hook0SDK.testSDK(offline, null).serviceToken(null)
        .stream("list", null, Struct.jm("ctrl", Struct.jm("throw", false)))
        .collect(Collectors.toList());

    if (hasFeature("rbac")) {
      Hook0SDK denied = Hook0SDK.testSDK(null,
          Struct.jm("feature", Struct.jm("rbac", Struct.jm("active", true, "deny", true))));
      SdkError denyerr = assertThrows(SdkError.class, () ->
          denied.serviceToken(null).stream("list", null, null).collect(Collectors.toList()));
      assertEquals("rbac_denied", denyerr.code);
    }
  }

  @Test
  public void streamCtrl() {
    Map<String, Object> explain = new LinkedHashMap<>();
    Map<String, Object> ctrl = new LinkedHashMap<>();
    ctrl.put("explain", explain);
    Hook0SDK.testSDK().serviceToken(null).stream("list", null, Struct.jm("ctrl", ctrl))
        .collect(Collectors.toList());
    assertEquals(List.of("explain"), new ArrayList<>(ctrl.keySet()));
    assertTrue(explain == ctrl.get("explain") && !explain.isEmpty());
  }

  @Test
  public void unexpected() {
    FailHook hook = new FailHook();
    Hook0SDK client = new Hook0SDK(Struct.jm(
        "feature", Struct.jm("test", Struct.jm("active", true)),
        "extend", Struct.jt(hook)));

    RuntimeException err = assertThrows(RuntimeException.class, () ->
        client.serviceToken(null).list(null, null));
    assertTrue(err.getMessage().contains("hook failed"), err.getMessage());
    assertTrue(0 < hook.unexpected);

    int fired = hook.unexpected;
    client.serviceToken(null).list(null, Struct.jm("throw", false));
    assertTrue(fired < hook.unexpected);
  }

  @Test
  public void validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate");
    Hook0SDK client = Hook0SDK.testSDK(null,
        Struct.jm("feature", Struct.jm("validate", Struct.jm("active", true))));
    SdkError err = assertThrows(SdkError.class, () ->
        client.serviceToken(null).list(Struct.jm("organization_id", 1), null));
    assertEquals("validate_failed", err.code);
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

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_SERVICE_TOKEN_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_SERVICE_TOKEN_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_SERVICE_TOKEN_ENTID"));
    if (idmapResolved == null) {
      idmapResolved = Helpers.toMapAny(idmap);
    }

    boolean live = "TRUE".equals(env.get("HOOK0_TEST_LIVE"));
    if (live) {
      // sdk-test-control.json's test.client.options seeds the live
      // client; the generated fields below overwrite anything they name.
      Map<String, Object> liveOpts =
          new LinkedHashMap<>(RunnerSupport.liveClientOptions());
      liveOpts.put("apikey", env.get("HOOK0_APIKEY"));
      // An empty map, not a null one: merge answers null when its last
      // entry is null, and basicSetup is normally called with no extras -
      // so a bare null silently discarded the apikey and server values
      // above.
      Map<String, Object> extraOpts =
          extra == null ? new LinkedHashMap<>() : extra;
      Object mergedOpts = Struct.merge(Struct.jt(liveOpts, extraOpts));
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
