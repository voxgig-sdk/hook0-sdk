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
public class ApplicationSecretEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.applicationSecret(null);
    assertNotNull(ent, "expected non-null application_secret entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = applicationSecretBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "update", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "application_secret." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity applicationSecretRef01Ent = client.applicationSecret(null);
    Map<String, Object> applicationSecretRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.application_secret"), "application_secret_ref01"));

    Object applicationSecretRef01DataResult = applicationSecretRef01Ent.create(applicationSecretRef01Data, null);
    applicationSecretRef01Data = Helpers.toMapAny(applicationSecretRef01DataResult instanceof SdkEntity ? ((SdkEntity) applicationSecretRef01DataResult).data() : applicationSecretRef01DataResult);
    assertNotNull(applicationSecretRef01Data, "expected create result to be a map");
    assertNotNull(applicationSecretRef01Data.get("id"), "expected created entity to have an id");

    // LIST
    Map<String, Object> applicationSecretRef01Match = new LinkedHashMap<>();

    Object applicationSecretRef01ListResult = applicationSecretRef01Ent.list(applicationSecretRef01Match, null);
    assertTrue(applicationSecretRef01ListResult instanceof List,
        "expected list result to be an array, got " + applicationSecretRef01ListResult);
    List<Object> applicationSecretRef01List = (List<Object>) applicationSecretRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(applicationSecretRef01List),
        Struct.jm("id", applicationSecretRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // UPDATE
    Map<String, Object> applicationSecretRef01DataUp0Up = new LinkedHashMap<>();
    applicationSecretRef01DataUp0Up.put("id", applicationSecretRef01Data.get("id"));

    String applicationSecretRef01MarkdefUp0Name = "application_id";
    String applicationSecretRef01MarkdefUp0Value = "Mark01-application_secret_ref01_" + setup.now;
    applicationSecretRef01DataUp0Up.put(applicationSecretRef01MarkdefUp0Name, applicationSecretRef01MarkdefUp0Value);

    Object applicationSecretRef01ResdataUp0Result = applicationSecretRef01Ent.update(applicationSecretRef01DataUp0Up, null);
    Map<String, Object> applicationSecretRef01ResdataUp0 = Helpers.toMapAny(applicationSecretRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) applicationSecretRef01ResdataUp0Result).data() : applicationSecretRef01ResdataUp0Result);
    assertNotNull(applicationSecretRef01ResdataUp0, "expected update result to be a map");
    assertEquals(applicationSecretRef01DataUp0Up.get("id"), applicationSecretRef01ResdataUp0.get("id"),
        "expected update result id to match");
    assertEquals(applicationSecretRef01MarkdefUp0Value, applicationSecretRef01ResdataUp0.get(applicationSecretRef01MarkdefUp0Name),
        "expected " + applicationSecretRef01MarkdefUp0Name + " to be updated");

    // REMOVE
    Map<String, Object> applicationSecretRef01MatchRm0 = new LinkedHashMap<>();
    applicationSecretRef01MatchRm0.put("id", applicationSecretRef01Data.get("id"));
    applicationSecretRef01Ent.remove(applicationSecretRef01MatchRm0, null);

    // LIST
    Map<String, Object> applicationSecretRef01MatchRt0 = new LinkedHashMap<>();

    Object applicationSecretRef01ListRt0Result = applicationSecretRef01Ent.list(applicationSecretRef01MatchRt0, null);
    assertTrue(applicationSecretRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + applicationSecretRef01ListRt0Result);
    List<Object> applicationSecretRef01ListRt0 = (List<Object>) applicationSecretRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(applicationSecretRef01ListRt0),
        Struct.jm("id", applicationSecretRef01Data.get("id")));
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

    RunnerSupport.EntityTestSetup setup = applicationSecretBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.applicationSecret(null);
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
    RunnerSupport.EntityTestSetup setup2 = applicationSecretBasicSetup(null);
    SdkEntity ent2 = setup2.client.applicationSecret(null);
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
      throw new RuntimeException("application_secret hook failed");
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
        Hook0SDK.testSDK(offline, null).applicationSecret(null).stream("list", null, null)
            .collect(Collectors.toList()));
    assertTrue(err.getMessage().contains("offline"), err.getMessage());

    Hook0SDK.testSDK(offline, null).applicationSecret(null)
        .stream("list", null, Struct.jm("ctrl", Struct.jm("throw", false)))
        .collect(Collectors.toList());

    if (hasFeature("rbac")) {
      Hook0SDK denied = Hook0SDK.testSDK(null,
          Struct.jm("feature", Struct.jm("rbac", Struct.jm("active", true, "deny", true))));
      SdkError denyerr = assertThrows(SdkError.class, () ->
          denied.applicationSecret(null).stream("list", null, null).collect(Collectors.toList()));
      assertEquals("rbac_denied", denyerr.code);
    }
  }

  @Test
  public void streamCtrl() {
    Map<String, Object> explain = new LinkedHashMap<>();
    Map<String, Object> ctrl = new LinkedHashMap<>();
    ctrl.put("explain", explain);
    Hook0SDK.testSDK().applicationSecret(null).stream("list", null, Struct.jm("ctrl", ctrl))
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
        client.applicationSecret(null).list(null, null));
    assertTrue(err.getMessage().contains("hook failed"), err.getMessage());
    assertTrue(0 < hook.unexpected);

    int fired = hook.unexpected;
    client.applicationSecret(null).list(null, Struct.jm("throw", false));
    assertTrue(fired < hook.unexpected);
  }

  @Test
  public void validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate");
    Hook0SDK client = Hook0SDK.testSDK(null,
        Struct.jm("feature", Struct.jm("validate", Struct.jm("active", true))));
    SdkError err = assertThrows(SdkError.class, () ->
        client.applicationSecret(null).list(Struct.jm("application_id", 1), null));
    assertEquals("validate_failed", err.code);
  }

  static RunnerSupport.EntityTestSetup applicationSecretBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "application_secret", "ApplicationSecretTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read application_secret test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("application_secret01");
    idnames.add("application_secret02");
    idnames.add("application_secret03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_APPLICATION_SECRET_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_APPLICATION_SECRET_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_APPLICATION_SECRET_ENTID"));
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
