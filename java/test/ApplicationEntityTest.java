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
public class ApplicationEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.application(null);
    assertNotNull(ent, "expected non-null application entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = applicationBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "update", "load", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "application." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity applicationRef01Ent = client.application(null);
    Map<String, Object> applicationRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.application"), "application_ref01"));

    Object applicationRef01DataResult = applicationRef01Ent.create(applicationRef01Data, null);
    applicationRef01Data = Helpers.toMapAny(applicationRef01DataResult instanceof SdkEntity ? ((SdkEntity) applicationRef01DataResult).data() : applicationRef01DataResult);
    assertNotNull(applicationRef01Data, "expected create result to be a map");
    assertNotNull(applicationRef01Data.get("id"), "expected created entity to have an id");

    // LIST
    Map<String, Object> applicationRef01Match = new LinkedHashMap<>();

    Object applicationRef01ListResult = applicationRef01Ent.list(applicationRef01Match, null);
    assertTrue(applicationRef01ListResult instanceof List,
        "expected list result to be an array, got " + applicationRef01ListResult);
    List<Object> applicationRef01List = (List<Object>) applicationRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(applicationRef01List),
        Struct.jm("id", applicationRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // UPDATE
    Map<String, Object> applicationRef01DataUp0Up = new LinkedHashMap<>();
    applicationRef01DataUp0Up.put("id", applicationRef01Data.get("id"));

    String applicationRef01MarkdefUp0Name = "application_id";
    String applicationRef01MarkdefUp0Value = "Mark01-application_ref01_" + setup.now;
    applicationRef01DataUp0Up.put(applicationRef01MarkdefUp0Name, applicationRef01MarkdefUp0Value);

    Object applicationRef01ResdataUp0Result = applicationRef01Ent.update(applicationRef01DataUp0Up, null);
    Map<String, Object> applicationRef01ResdataUp0 = Helpers.toMapAny(applicationRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) applicationRef01ResdataUp0Result).data() : applicationRef01ResdataUp0Result);
    assertNotNull(applicationRef01ResdataUp0, "expected update result to be a map");
    assertEquals(applicationRef01DataUp0Up.get("id"), applicationRef01ResdataUp0.get("id"),
        "expected update result id to match");
    assertEquals(applicationRef01MarkdefUp0Value, applicationRef01ResdataUp0.get(applicationRef01MarkdefUp0Name),
        "expected " + applicationRef01MarkdefUp0Name + " to be updated");

    // LOAD
    Map<String, Object> applicationRef01MatchDt0 = new LinkedHashMap<>();
    applicationRef01MatchDt0.put("id", applicationRef01Data.get("id"));
    Object applicationRef01DataDt0Loaded = applicationRef01Ent.load(applicationRef01MatchDt0, null);
    Map<String, Object> applicationRef01DataDt0LoadResult = Helpers.toMapAny(applicationRef01DataDt0Loaded instanceof SdkEntity ? ((SdkEntity) applicationRef01DataDt0Loaded).data() : applicationRef01DataDt0Loaded);
    assertNotNull(applicationRef01DataDt0LoadResult, "expected load result to be a map");
    assertEquals(applicationRef01Data.get("id"), applicationRef01DataDt0LoadResult.get("id"),
        "expected load result id to match");

    // REMOVE
    Map<String, Object> applicationRef01MatchRm0 = new LinkedHashMap<>();
    applicationRef01MatchRm0.put("id", applicationRef01Data.get("id"));
    applicationRef01Ent.remove(applicationRef01MatchRm0, null);

    // LIST
    Map<String, Object> applicationRef01MatchRt0 = new LinkedHashMap<>();

    Object applicationRef01ListRt0Result = applicationRef01Ent.list(applicationRef01MatchRt0, null);
    assertTrue(applicationRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + applicationRef01ListRt0Result);
    List<Object> applicationRef01ListRt0 = (List<Object>) applicationRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(applicationRef01ListRt0),
        Struct.jm("id", applicationRef01Data.get("id")));
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

    RunnerSupport.EntityTestSetup setup = applicationBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.application(null);
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
    RunnerSupport.EntityTestSetup setup2 = applicationBasicSetup(null);
    SdkEntity ent2 = setup2.client.application(null);
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
      throw new RuntimeException("application hook failed");
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
        Hook0SDK.testSDK(offline, null).application(null).stream("list", null, null)
            .collect(Collectors.toList()));
    assertTrue(err.getMessage().contains("offline"), err.getMessage());

    Hook0SDK.testSDK(offline, null).application(null)
        .stream("list", null, Struct.jm("ctrl", Struct.jm("throw", false)))
        .collect(Collectors.toList());

    if (hasFeature("rbac")) {
      Hook0SDK denied = Hook0SDK.testSDK(null,
          Struct.jm("feature", Struct.jm("rbac", Struct.jm("active", true, "deny", true))));
      SdkError denyerr = assertThrows(SdkError.class, () ->
          denied.application(null).stream("list", null, null).collect(Collectors.toList()));
      assertEquals("rbac_denied", denyerr.code);
    }
  }

  @Test
  public void streamCtrl() {
    Map<String, Object> explain = new LinkedHashMap<>();
    Map<String, Object> ctrl = new LinkedHashMap<>();
    ctrl.put("explain", explain);
    Hook0SDK.testSDK().application(null).stream("list", null, Struct.jm("ctrl", ctrl))
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
        client.application(null).list(null, null));
    assertTrue(err.getMessage().contains("hook failed"), err.getMessage());
    assertTrue(0 < hook.unexpected);

    int fired = hook.unexpected;
    client.application(null).list(null, Struct.jm("throw", false));
    assertTrue(fired < hook.unexpected);
  }

  @Test
  public void validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate");
    Hook0SDK client = Hook0SDK.testSDK(null,
        Struct.jm("feature", Struct.jm("validate", Struct.jm("active", true))));
    SdkError err = assertThrows(SdkError.class, () ->
        client.application(null).list(Struct.jm("organization_id", 1), null));
    assertEquals("validate_failed", err.code);
  }

  static RunnerSupport.EntityTestSetup applicationBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "application", "ApplicationTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read application test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("application01");
    idnames.add("application02");
    idnames.add("application03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_APPLICATION_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_APPLICATION_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_APPLICATION_ENTID"));
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
