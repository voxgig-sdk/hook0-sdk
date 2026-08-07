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
public class InstanceEntityTest {

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.instance(null);
    assertNotNull(ent, "expected non-null instance entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = instanceBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "load" }) {
      String reason = RunnerSupport.skipReason("entityOp", "instance." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    // The basic flow consumes synthetic IDs from the fixture. In live mode
    // without an *_ENTID env override, those IDs hit the live API and 4xx.
    Assumptions.assumeFalse(setup.syntheticOnly,
        "live entity test uses synthetic IDs from fixture — set HOOK__TEST_INSTANCE_ENTID JSON to run live");
    Hook0SDK client = setup.client;

    // Bootstrap entity data from existing test data (no create step in flow).
    List<List<Object>> instanceRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.instance")));
    Map<String, Object> instanceRef01Data = instanceRef01DataRaw.isEmpty()
        ? null : Helpers.toMapAny(instanceRef01DataRaw.get(0).get(1));

    // LOAD
    SdkEntity instanceRef01Ent = client.instance(null);
    Map<String, Object> instanceRef01MatchDt0 = new LinkedHashMap<>();
    Object instanceRef01DataDt0Loaded = instanceRef01Ent.load(instanceRef01MatchDt0, null);
    assertNotNull(instanceRef01DataDt0Loaded, "expected load result to be non-null");

  }

  static RunnerSupport.EntityTestSetup instanceBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "instance", "InstanceTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read instance test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("instance01");
    idnames.add("instance02");
    idnames.add("instance03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against
    // synthetic IDs from the fixture and 4xx's. Surface this so the test
    // can skip.
    String entidEnvRaw = RunnerSupport.getenv("HOOK__TEST_INSTANCE_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK__TEST_INSTANCE_ENTID", idmap);
    envm.put("HOOK__TEST_LIVE", "FALSE");
    envm.put("HOOK__TEST_EXPLAIN", "FALSE");
    envm.put("HOOK__APIKEY", "NONE");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK__TEST_INSTANCE_ENTID"));
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
