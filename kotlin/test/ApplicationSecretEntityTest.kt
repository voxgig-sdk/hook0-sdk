package voxgig.hook0sdk.sdktest

import java.nio.file.Files
import java.nio.file.Paths

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assumptions
import org.junit.jupiter.api.Test

import voxgig.hook0sdk.core.Config
import voxgig.hook0sdk.core.Context
import voxgig.hook0sdk.core.Helpers
import voxgig.hook0sdk.core.SdkEntity
import voxgig.hook0sdk.core.SdkError
import voxgig.hook0sdk.core.Hook0SDK
import voxgig.hook0sdk.feature.BaseFeature
import voxgig.hook0sdk.utility.Json
import voxgig.hook0sdk.utility.struct.Struct

@Suppress("UNCHECKED_CAST", "UNUSED_VARIABLE", "UNUSED_VALUE")
class ApplicationSecretEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.applicationSecret(null)
    assertNotNull(ent, "expected non-null application_secret entity")
  }

  @Test
  fun basic() {
    val setup = applicationSecretBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("create", "list", "update", "remove")) {
      val reason = RunnerSupport.skipReason("entityOp", "application_secret.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"application_secret.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/application_secrets/\"}")
      println("LIVE STEP {\"id\":\"application_secret.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/application_secrets/{application_secret_token}\"}")
      println("LIVE STEP {\"id\":\"application_secret.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/application_secrets/{application_secret_token}\"}")
      println("LIVE STEP {\"id\":\"application_secret.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    val client = setup.client

    // Bootstrap entity data from existing test data (no create step in flow).
    val applicationSecretRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.application_secret")))
    val applicationSecretRef01Data: MutableMap<String, Any?> = if (applicationSecretRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(applicationSecretRef01DataRaw[0][1]) ?: linkedMapOf())

    // LIST
    val applicationSecretRef01Ent = client.applicationSecret(null)
    val applicationSecretRef01Match = linkedMapOf<String, Any?>()

    val applicationSecretRef01ListResult = applicationSecretRef01Ent.list(applicationSecretRef01Match, null)
    assertTrue(applicationSecretRef01ListResult is List<*>,
        "expected list result to be an array, got " + applicationSecretRef01ListResult)

      return
    }

    val client = setup.client

    // CREATE
    val applicationSecretRef01Ent = client.applicationSecret(null)
    var applicationSecretRef01Data: MutableMap<String, Any?> = (Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.application_secret"), "application_secret_ref01")) ?: linkedMapOf())

    val applicationSecretRef01DataResult = applicationSecretRef01Ent.create(applicationSecretRef01Data, null)
    applicationSecretRef01Data = Helpers.toMapAny(if (applicationSecretRef01DataResult is SdkEntity) applicationSecretRef01DataResult.data() else applicationSecretRef01DataResult) ?: linkedMapOf()
    assertNotNull(applicationSecretRef01Data, "expected create result to be a map")
    assertNotNull(applicationSecretRef01Data["id"], "expected created entity to have an id")

    // LIST
    val applicationSecretRef01Match = linkedMapOf<String, Any?>()

    val applicationSecretRef01ListResult = applicationSecretRef01Ent.list(applicationSecretRef01Match, null)
    assertTrue(applicationSecretRef01ListResult is List<*>,
        "expected list result to be an array, got " + applicationSecretRef01ListResult)
    val applicationSecretRef01List = applicationSecretRef01ListResult as List<Any?>

    val foundItem = Struct.select(
        RunnerSupport.entityListToData(applicationSecretRef01List),
        Struct.jm("id", applicationSecretRef01Data["id"]))
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list")

    // UPDATE
    val applicationSecretRef01DataUp0Up = linkedMapOf<String, Any?>()
    applicationSecretRef01DataUp0Up["id"] = applicationSecretRef01Data["id"]

    val applicationSecretRef01MarkdefUp0Name = "application_id"
    val applicationSecretRef01MarkdefUp0Value = "Mark01-application_secret_ref01_" + setup.now
    applicationSecretRef01DataUp0Up[applicationSecretRef01MarkdefUp0Name] = applicationSecretRef01MarkdefUp0Value

    val applicationSecretRef01ResdataUp0Result = applicationSecretRef01Ent.update(applicationSecretRef01DataUp0Up, null)
    val applicationSecretRef01ResdataUp0 = Helpers.toMapAny(if (applicationSecretRef01ResdataUp0Result is SdkEntity) applicationSecretRef01ResdataUp0Result.data() else applicationSecretRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(applicationSecretRef01ResdataUp0, "expected update result to be a map")
    assertEquals(applicationSecretRef01DataUp0Up["id"], applicationSecretRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(applicationSecretRef01MarkdefUp0Value, applicationSecretRef01ResdataUp0[applicationSecretRef01MarkdefUp0Name],
        "expected " + applicationSecretRef01MarkdefUp0Name + " to be updated")

    // REMOVE
    val applicationSecretRef01MatchRm0 = linkedMapOf<String, Any?>()
    applicationSecretRef01MatchRm0["id"] = applicationSecretRef01Data["id"]
    applicationSecretRef01Ent.remove(applicationSecretRef01MatchRm0, null)

    // LIST
    val applicationSecretRef01MatchRt0 = linkedMapOf<String, Any?>()

    val applicationSecretRef01ListRt0Result = applicationSecretRef01Ent.list(applicationSecretRef01MatchRt0, null)
    assertTrue(applicationSecretRef01ListRt0Result is List<*>,
        "expected list result to be an array, got " + applicationSecretRef01ListRt0Result)
    val applicationSecretRef01ListRt0 = applicationSecretRef01ListRt0Result as List<Any?>

    val notFoundItem = Struct.select(
        RunnerSupport.entityListToData(applicationSecretRef01ListRt0),
        Struct.jm("id", applicationSecretRef01Data["id"]))
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list")

  }

  @Test
  fun stream() {
    val streamingActive = linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "streaming" to linkedMapOf<String, Any?>("active" to true),
      ),
    )
    val setup = applicationSecretBasicSetup(streamingActive)
    Assumptions.assumeFalse(
      setup.live,
      "stream test streams the seeded fixture data (unit mode only)",
    )

    val ent = setup.client.applicationSecret(null)
    val match = linkedMapOf<String, Any?>()

    // Materialised list result for the same op.
    val listedResult = ent.list(match, null)
    val listed = (listedResult as? List<Any?>) ?: emptyList<Any?>()

    // stream("list") yields items via the streaming feature's iterator.
    val streamed = ent.stream("list", match, null).toList()
    assertTrue(streamed.size > 0, "expected stream to yield items")
    assertEquals(listed.size, streamed.size, "expected stream to match list count")

    // Fallback: with streaming inactive, stream still yields the materialised
    // items.
    val setup2 = applicationSecretBasicSetup(null)
    val ent2 = setup2.client.applicationSecret(null)
    val streamed2 = ent2.stream("list", match, null).toList()
    assertEquals(listed.size, streamed2.size, "expected fallback stream to match list")
  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  class FailHook : BaseFeature("failhook", "0.0.1", true) {
    var unexpected = 0
    override fun preSpec(ctx: Context) { throw RuntimeException("application_secret hook failed") }
    override fun preUnexpected(ctx: Context) { unexpected++ }
  }

  @Test
  fun streamError() {
    val offline = linkedMapOf<String, Any?>("net" to linkedMapOf<String, Any?>("offline" to true))
    val err = assertThrows(RuntimeException::class.java) {
      Hook0SDK.testSDK(offline, null).applicationSecret(null).stream("list", null, null).toList()
    }
    assertTrue(err.message.orEmpty().contains("offline"), err.message)

    Hook0SDK.testSDK(offline, null).applicationSecret(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to linkedMapOf<String, Any?>("throw" to false))).toList()

    if (hasFeature("rbac")) {
      val denied = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
        "feature" to linkedMapOf<String, Any?>(
          "rbac" to linkedMapOf<String, Any?>("active" to true, "deny" to true))))
      val denyerr = assertThrows(SdkError::class.java) {
        denied.applicationSecret(null).stream("list", null, null).toList()
      }
      assertEquals("rbac_denied", denyerr.code)
    }
  }

  @Test
  fun streamCtrl() {
    val explain = linkedMapOf<String, Any?>()
    val ctrl = linkedMapOf<String, Any?>("explain" to explain)
    Hook0SDK.testSDK().applicationSecret(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to ctrl)).toList()
    assertEquals(listOf("explain"), ctrl.keys.toList())
    assertTrue(explain === ctrl["explain"] && explain.isNotEmpty())
  }

  @Test
  fun unexpected() {
    val hook = FailHook()
    val client = Hook0SDK(linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>("test" to linkedMapOf<String, Any?>("active" to true)),
      "extend" to mutableListOf<Any?>(hook)))

    val err = assertThrows(RuntimeException::class.java) {
      client.applicationSecret(null).list(null, null)
    }
    assertTrue(err.message.orEmpty().contains("hook failed"), err.message)
    assertTrue(0 < hook.unexpected)

    val fired = hook.unexpected
    client.applicationSecret(null).list(null, linkedMapOf<String, Any?>("throw" to false))
    assertTrue(fired < hook.unexpected)
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.applicationSecret(null).list(linkedMapOf<String, Any?>("application_id" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun applicationSecretBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "application_secret", "ApplicationSecretTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read application_secret test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("application_secret01")
      idnames.add("application_secret02")
      idnames.add("application_secret03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_APPLICATION_SECRET_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_APPLICATION_SECRET_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_APPLICATION_SECRET_ENTID"])
      if (idmapResolved == null) {
        idmapResolved = Helpers.toMapAny(idmap) ?: linkedMapOf()
      }

      val live = "TRUE" == env["HOOK0_TEST_LIVE"]
      if (live) {
        val liveOpts = linkedMapOf<String, Any?>()
        liveOpts["apikey"] = env["HOOK0_APIKEY"]
        val mergedOpts = Struct.merge(Struct.jt(liveOpts, extra))
        client = Hook0SDK(Helpers.toMapAny(mergedOpts))
      }

      val setup = RunnerSupport.EntityTestSetup()
      setup.client = client
      setup.data = entityData
      setup.idmap = idmapResolved
      setup.env = env
      setup.explain = "TRUE" == env["HOOK0_TEST_EXPLAIN"]
      setup.live = live
      setup.syntheticOnly = live && !idmapOverridden
      setup.now = System.currentTimeMillis()
      return setup
    }
  }
}
