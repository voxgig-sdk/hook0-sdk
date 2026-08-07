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
public class RevokeEntityTest {

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.revoke(null);
    assertNotNull(ent, "expected non-null revoke entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = revokeBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] {  }) {
      String reason = RunnerSupport.skipReason("entityOp", "revoke." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    // The basic flow consumes synthetic IDs from the fixture. In live mode
    // without an *_ENTID env override, those IDs hit the live API and 4xx.
    Assumptions.assumeFalse(setup.syntheticOnly,
        "live entity test uses synthetic IDs from fixture — set HOOK__TEST_REVOKE_ENTID JSON to run live");
    // Bootstrap entity data from existing test data (no create step in flow).
    List<List<Object>> revokeRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.revoke")));
    Map<String, Object> revokeRef01Data = revokeRef01DataRaw.isEmpty()
        ? null : Helpers.toMapAny(revokeRef01DataRaw.get(0).get(1));

  }

  static RunnerSupport.EntityTestSetup revokeBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "revoke", "RevokeTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read revoke test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("revoke01");
    idnames.add("revoke02");
    idnames.add("revoke03");
    idnames.add("organization01");
    idnames.add("organization02");
    idnames.add("organization03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against
    // synthetic IDs from the fixture and 4xx's. Surface this so the test
    // can skip.
    String entidEnvRaw = RunnerSupport.getenv("HOOK__TEST_REVOKE_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK__TEST_REVOKE_ENTID", idmap);
    envm.put("HOOK__TEST_LIVE", "FALSE");
    envm.put("HOOK__TEST_EXPLAIN", "FALSE");
    envm.put("HOOK__APIKEY", "NONE");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK__TEST_REVOKE_ENTID"));
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
