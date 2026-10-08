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
public class OrganizationEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.organization(null);
    assertNotNull(ent, "expected non-null organization entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = organizationBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create", "list", "update", "load", "remove" }) {
      String reason = RunnerSupport.skipReason("entityOp", "organization." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity organizationRef01Ent = client.organization(null);
    Map<String, Object> organizationRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.organization"), "organization_ref01"));

    Object organizationRef01DataResult = organizationRef01Ent.create(organizationRef01Data, null);
    organizationRef01Data = Helpers.toMapAny(organizationRef01DataResult instanceof SdkEntity ? ((SdkEntity) organizationRef01DataResult).data() : organizationRef01DataResult);
    assertNotNull(organizationRef01Data, "expected create result to be a map");
    assertNotNull(organizationRef01Data.get("id"), "expected created entity to have an id");

    // LIST
    Map<String, Object> organizationRef01Match = new LinkedHashMap<>();

    Object organizationRef01ListResult = organizationRef01Ent.list(organizationRef01Match, null);
    assertTrue(organizationRef01ListResult instanceof List,
        "expected list result to be an array, got " + organizationRef01ListResult);
    List<Object> organizationRef01List = (List<Object>) organizationRef01ListResult;

    List<Object> foundItem = Struct.select(
        RunnerSupport.entityListToData(organizationRef01List),
        Struct.jm("id", organizationRef01Data.get("id")));
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list");

    // UPDATE
    Map<String, Object> organizationRef01DataUp0Up = new LinkedHashMap<>();
    organizationRef01DataUp0Up.put("id", organizationRef01Data.get("id"));

    String organizationRef01MarkdefUp0Name = "application_id";
    String organizationRef01MarkdefUp0Value = "Mark01-organization_ref01_" + setup.now;
    organizationRef01DataUp0Up.put(organizationRef01MarkdefUp0Name, organizationRef01MarkdefUp0Value);

    Object organizationRef01ResdataUp0Result = organizationRef01Ent.update(organizationRef01DataUp0Up, null);
    Map<String, Object> organizationRef01ResdataUp0 = Helpers.toMapAny(organizationRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) organizationRef01ResdataUp0Result).data() : organizationRef01ResdataUp0Result);
    assertNotNull(organizationRef01ResdataUp0, "expected update result to be a map");
    assertEquals(organizationRef01DataUp0Up.get("id"), organizationRef01ResdataUp0.get("id"),
        "expected update result id to match");
    assertEquals(organizationRef01MarkdefUp0Value, organizationRef01ResdataUp0.get(organizationRef01MarkdefUp0Name),
        "expected " + organizationRef01MarkdefUp0Name + " to be updated");

    // LOAD
    Map<String, Object> organizationRef01MatchDt0 = new LinkedHashMap<>();
    organizationRef01MatchDt0.put("id", organizationRef01Data.get("id"));
    Object organizationRef01DataDt0Loaded = organizationRef01Ent.load(organizationRef01MatchDt0, null);
    Map<String, Object> organizationRef01DataDt0LoadResult = Helpers.toMapAny(organizationRef01DataDt0Loaded instanceof SdkEntity ? ((SdkEntity) organizationRef01DataDt0Loaded).data() : organizationRef01DataDt0Loaded);
    assertNotNull(organizationRef01DataDt0LoadResult, "expected load result to be a map");
    assertEquals(organizationRef01Data.get("id"), organizationRef01DataDt0LoadResult.get("id"),
        "expected load result id to match");

    // REMOVE
    Map<String, Object> organizationRef01MatchRm0 = new LinkedHashMap<>();
    organizationRef01MatchRm0.put("id", organizationRef01Data.get("id"));
    organizationRef01Ent.remove(organizationRef01MatchRm0, null);

    // LIST
    Map<String, Object> organizationRef01MatchRt0 = new LinkedHashMap<>();

    Object organizationRef01ListRt0Result = organizationRef01Ent.list(organizationRef01MatchRt0, null);
    assertTrue(organizationRef01ListRt0Result instanceof List,
        "expected list result to be an array, got " + organizationRef01ListRt0Result);
    List<Object> organizationRef01ListRt0 = (List<Object>) organizationRef01ListRt0Result;

    List<Object> notFoundItem = Struct.select(
        RunnerSupport.entityListToData(organizationRef01ListRt0),
        Struct.jm("id", organizationRef01Data.get("id")));
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

    RunnerSupport.EntityTestSetup setup = organizationBasicSetup(streamingActive);
    Assumptions.assumeFalse(setup.live,
        "stream test streams the seeded fixture data (unit mode only)");

    SdkEntity ent = setup.client.organization(null);
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
    RunnerSupport.EntityTestSetup setup2 = organizationBasicSetup(null);
    SdkEntity ent2 = setup2.client.organization(null);
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
      throw new RuntimeException("organization hook failed");
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
        Hook0SDK.testSDK(offline, null).organization(null).stream("list", null, null)
            .collect(Collectors.toList()));
    assertTrue(err.getMessage().contains("offline"), err.getMessage());

    Hook0SDK.testSDK(offline, null).organization(null)
        .stream("list", null, Struct.jm("ctrl", Struct.jm("throw", false)))
        .collect(Collectors.toList());

    if (hasFeature("rbac")) {
      Hook0SDK denied = Hook0SDK.testSDK(null,
          Struct.jm("feature", Struct.jm("rbac", Struct.jm("active", true, "deny", true))));
      SdkError denyerr = assertThrows(SdkError.class, () ->
          denied.organization(null).stream("list", null, null).collect(Collectors.toList()));
      assertEquals("rbac_denied", denyerr.code);
    }
  }

  @Test
  public void streamCtrl() {
    Map<String, Object> explain = new LinkedHashMap<>();
    Map<String, Object> ctrl = new LinkedHashMap<>();
    ctrl.put("explain", explain);
    Hook0SDK.testSDK().organization(null).stream("list", null, Struct.jm("ctrl", ctrl))
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
        client.organization(null).list(null, null));
    assertTrue(err.getMessage().contains("hook failed"), err.getMessage());
    assertTrue(0 < hook.unexpected);

    int fired = hook.unexpected;
    client.organization(null).list(null, Struct.jm("throw", false));
    assertTrue(fired < hook.unexpected);
  }

  @Test
  public void validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate");
    Hook0SDK client = Hook0SDK.testSDK(null,
        Struct.jm("feature", Struct.jm("validate", Struct.jm("active", true))));
    SdkError err = assertThrows(SdkError.class, () ->
        client.organization(null).list(Struct.jm("amount", "x"), null));
    assertEquals("validate_failed", err.code);
  }

  static RunnerSupport.EntityTestSetup organizationBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "organization", "OrganizationTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read organization test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("organization01");
    idnames.add("organization02");
    idnames.add("organization03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_ORGANIZATION_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_ORGANIZATION_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_ORGANIZATION_ENTID"));
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
