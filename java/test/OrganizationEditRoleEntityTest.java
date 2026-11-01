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
public class OrganizationEditRoleEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.organizationEditRole(null);
    assertNotNull(ent, "expected non-null organization_edit_role entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = organizationEditRoleBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "update" }) {
      String reason = RunnerSupport.skipReason("entityOp", "organization_edit_role." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    if (setup.live && "TRUE".equals(System.getenv("VOXGIG_GETONLY_GUARD"))) {
      System.out.println("LIVE STEP {\"id\":\"organization_edit_role.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite\"}");
      Assumptions.abort("Live coverage incomplete: organization_edit_role.update.0 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite)");
      return;
    }

    if (setup.live) {
      RunnerSupport.liveMiss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a organization_edit_role record it did not create");
    }
    Hook0SDK client = setup.client;

    // Bootstrap entity data from existing test data (no create step in flow).
    List<List<Object>> organizationEditRoleRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.organization_edit_role")));
    Map<String, Object> organizationEditRoleRef01Data = organizationEditRoleRef01DataRaw.isEmpty()
        ? null : Helpers.toMapAny(organizationEditRoleRef01DataRaw.get(0).get(1));

    // UPDATE
    SdkEntity organizationEditRoleRef01Ent = client.organizationEditRole(null);
    Map<String, Object> organizationEditRoleRef01DataUp0Up = new LinkedHashMap<>();
    organizationEditRoleRef01DataUp0Up.put("id", organizationEditRoleRef01Data.get("id"));

    String organizationEditRoleRef01MarkdefUp0Name = "role";
    String organizationEditRoleRef01MarkdefUp0Value = "Mark01-organization_edit_role_ref01_" + setup.now;
    organizationEditRoleRef01DataUp0Up.put(organizationEditRoleRef01MarkdefUp0Name, organizationEditRoleRef01MarkdefUp0Value);

    Object organizationEditRoleRef01ResdataUp0Result = organizationEditRoleRef01Ent.update(organizationEditRoleRef01DataUp0Up, null);
    Map<String, Object> organizationEditRoleRef01ResdataUp0 = Helpers.toMapAny(organizationEditRoleRef01ResdataUp0Result instanceof SdkEntity ? ((SdkEntity) organizationEditRoleRef01ResdataUp0Result).data() : organizationEditRoleRef01ResdataUp0Result);
    assertNotNull(organizationEditRoleRef01ResdataUp0, "expected update result to be a map");
    assertEquals(organizationEditRoleRef01DataUp0Up.get("id"), organizationEditRoleRef01ResdataUp0.get("id"),
        "expected update result id to match");
    assertEquals(organizationEditRoleRef01MarkdefUp0Value, organizationEditRoleRef01ResdataUp0.get(organizationEditRoleRef01MarkdefUp0Name),
        "expected " + organizationEditRoleRef01MarkdefUp0Name + " to be updated");

  }

  static boolean hasFeature(String name) {
    Map<String, Object> fm = Helpers.toMapAny(Config.makeConfig().get("feature"));
    return fm != null && fm.get(name) != null;
  }

  @Test
  public void validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate");
    Hook0SDK client = Hook0SDK.testSDK(null,
        Struct.jm("feature", Struct.jm("validate", Struct.jm("active", true))));
    SdkError err = assertThrows(SdkError.class, () ->
        client.organizationEditRole(null).update(Struct.jm("id", 1), null));
    assertEquals("validate_failed", err.code);
  }

  static RunnerSupport.EntityTestSetup organizationEditRoleBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "organization_edit_role", "OrganizationEditRoleTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read organization_edit_role test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("organization_edit_role01");
    idnames.add("organization_edit_role02");
    idnames.add("organization_edit_role03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"));
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
