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
public class EmailPreferenceEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  static final boolean LIVE_STRICT = true;

  @Test
  public void instance() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    SdkEntity ent = testsdk.emailPreference(null);
    assertNotNull(ent, "expected non-null email_preference entity");
  }

  @Test
  public void basic() {
    RunnerSupport.EntityTestSetup setup = emailPreferenceBasicSetup(null);
    // Per-op sdk-test-control.json skip — basic test exercises a flow
    // with multiple ops; skipping any op skips the whole flow.
    String mode = setup.live ? "live" : "unit";
    for (String op : new String[] { "create" }) {
      String reason = RunnerSupport.skipReason("entityOp", "email_preference." + op, mode);
      Assumptions.assumeTrue(reason == null,
          reason == null || "".equals(reason)
              ? "skipped via sdk-test-control.json" : reason);
    }
    if (setup.live && "TRUE".equals(System.getenv("VOXGIG_GETONLY_GUARD"))) {
      System.out.println("LIVE STEP {\"id\":\"email_preference.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/email-preferences/unsubscribe-reactivation\"}");
      Assumptions.abort("Live coverage incomplete: email_preference.create.0 excluded (GET-only live run: needs POST /api/v1/email-preferences/unsubscribe-reactivation)");
      return;
    }

    Hook0SDK client = setup.client;

    // CREATE
    SdkEntity emailPreferenceRef01Ent = client.emailPreference(null);
    Map<String, Object> emailPreferenceRef01Data = Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.email_preference"), "email_preference_ref01"));

    Object emailPreferenceRef01DataResult = emailPreferenceRef01Ent.create(emailPreferenceRef01Data, null);
    emailPreferenceRef01Data = Helpers.toMapAny(emailPreferenceRef01DataResult instanceof SdkEntity ? ((SdkEntity) emailPreferenceRef01DataResult).data() : emailPreferenceRef01DataResult);
    assertNotNull(emailPreferenceRef01Data, "expected create result to be a map");

  }

  static RunnerSupport.EntityTestSetup emailPreferenceBasicSetup(Map<String, Object> extra) {
    RunnerSupport.loadEnvLocal();

    Map<String, Object> entityData;
    try {
      String entityDataSource = Files.readString(Path.of(
          "..", ".sdk", "test", "entity", "email_preference", "EmailPreferenceTestData.json"));
      entityData = Helpers.toMapAny(Json.parse(entityDataSource));
    }
    catch (Exception e) {
      throw new AssertionError("failed to read email_preference test data: " + e.getMessage(), e);
    }

    Map<String, Object> options = new LinkedHashMap<>();
    options.put("entity", entityData.get("existing"));

    Hook0SDK client = Hook0SDK.testSDK(options, extra);

    // Generate idmap via transform, matching TS pattern.
    List<Object> idnames = new ArrayList<>();
    idnames.add("email_preference01");
    idnames.add("email_preference02");
    idnames.add("email_preference03");
    Object idmap = Struct.transform(idnames, Json.parse(
        "{\"`$PACK`\": [\"\", {"
        + "\"`$KEY`\": \"`$COPY`\","
        + "\"`$VAL`\": [\"`$FORMAT`\", \"upper\", \"`$COPY`\"]"
        + "}]}"));

    // Whether *_ENTID supplied the idmap, read before envOverride consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    String entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_EMAIL_PREFERENCE_ENTID");
    boolean idmapOverridden = entidEnvRaw != null
        && entidEnvRaw.trim().startsWith("{");

    Map<String, Object> envm = new LinkedHashMap<>();
    envm.put("HOOK0_TEST_EMAIL_PREFERENCE_ENTID", idmap);
    envm.put("HOOK0_TEST_LIVE", "FALSE");
    envm.put("HOOK0_TEST_EXPLAIN", "FALSE");
    envm.put("HOOK0_APIKEY", "");
    Map<String, Object> env = RunnerSupport.envOverride(envm);

    Map<String, Object> idmapResolved = Helpers.toMapAny(env.get("HOOK0_TEST_EMAIL_PREFERENCE_ENTID"));
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
