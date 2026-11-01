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
class ApplicationEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.application(null)
    assertNotNull(ent, "expected non-null application entity")
  }

  @Test
  fun basic() {
    val setup = applicationBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("create", "list", "update", "load", "remove")) {
      val reason = RunnerSupport.skipReason("entityOp", "application.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"application.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/applications/\"}")
      println("LIVE STEP {\"id\":\"application.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/applications/{application_id}\"}")
      println("LIVE STEP {\"id\":\"application.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/applications/{application_id}\"}")
      println("LIVE STEP {\"id\":\"application.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    val client = setup.client
    if (setup.live) {
      RunnerSupport.liveExisting(setup.data!!, LIVE_STRICT, "application") {
        client.application(null).list(linkedMapOf<String, Any?>(), null)
      }
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    val applicationRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.application")))
    val applicationRef01Data: MutableMap<String, Any?> = if (applicationRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(applicationRef01DataRaw[0][1]) ?: linkedMapOf())

    // LIST
    val applicationRef01Ent = client.application(null)
    val applicationRef01Match = linkedMapOf<String, Any?>()

    val applicationRef01ListResult = applicationRef01Ent.list(applicationRef01Match, null)
    assertTrue(applicationRef01ListResult is List<*>,
        "expected list result to be an array, got " + applicationRef01ListResult)

    // LOAD
    val applicationRef01MatchDt0 = linkedMapOf<String, Any?>()
    applicationRef01MatchDt0["id"] = applicationRef01Data["id"]
    val applicationRef01DataDt0Loaded = applicationRef01Ent.load(applicationRef01MatchDt0, null)
    val applicationRef01DataDt0LoadResult = Helpers.toMapAny(if (applicationRef01DataDt0Loaded is SdkEntity) applicationRef01DataDt0Loaded.data() else applicationRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(applicationRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(applicationRef01Data["id"], applicationRef01DataDt0LoadResult["id"],
        "expected load result id to match")

      return
    }

    val client = setup.client

    // CREATE
    val applicationRef01Ent = client.application(null)
    var applicationRef01Data: MutableMap<String, Any?> = (Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.application"), "application_ref01")) ?: linkedMapOf())

    val applicationRef01DataResult = applicationRef01Ent.create(applicationRef01Data, null)
    applicationRef01Data = Helpers.toMapAny(if (applicationRef01DataResult is SdkEntity) applicationRef01DataResult.data() else applicationRef01DataResult) ?: linkedMapOf()
    assertNotNull(applicationRef01Data, "expected create result to be a map")
    assertNotNull(applicationRef01Data["id"], "expected created entity to have an id")

    // LIST
    val applicationRef01Match = linkedMapOf<String, Any?>()

    val applicationRef01ListResult = applicationRef01Ent.list(applicationRef01Match, null)
    assertTrue(applicationRef01ListResult is List<*>,
        "expected list result to be an array, got " + applicationRef01ListResult)
    val applicationRef01List = applicationRef01ListResult as List<Any?>

    val foundItem = Struct.select(
        RunnerSupport.entityListToData(applicationRef01List),
        Struct.jm("id", applicationRef01Data["id"]))
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list")

    // UPDATE
    val applicationRef01DataUp0Up = linkedMapOf<String, Any?>()
    applicationRef01DataUp0Up["id"] = applicationRef01Data["id"]

    val applicationRef01MarkdefUp0Name = "application_id"
    val applicationRef01MarkdefUp0Value = "Mark01-application_ref01_" + setup.now
    applicationRef01DataUp0Up[applicationRef01MarkdefUp0Name] = applicationRef01MarkdefUp0Value

    val applicationRef01ResdataUp0Result = applicationRef01Ent.update(applicationRef01DataUp0Up, null)
    val applicationRef01ResdataUp0 = Helpers.toMapAny(if (applicationRef01ResdataUp0Result is SdkEntity) applicationRef01ResdataUp0Result.data() else applicationRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(applicationRef01ResdataUp0, "expected update result to be a map")
    assertEquals(applicationRef01DataUp0Up["id"], applicationRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(applicationRef01MarkdefUp0Value, applicationRef01ResdataUp0[applicationRef01MarkdefUp0Name],
        "expected " + applicationRef01MarkdefUp0Name + " to be updated")

    // LOAD
    val applicationRef01MatchDt0 = linkedMapOf<String, Any?>()
    applicationRef01MatchDt0["id"] = applicationRef01Data["id"]
    val applicationRef01DataDt0Loaded = applicationRef01Ent.load(applicationRef01MatchDt0, null)
    val applicationRef01DataDt0LoadResult = Helpers.toMapAny(if (applicationRef01DataDt0Loaded is SdkEntity) applicationRef01DataDt0Loaded.data() else applicationRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(applicationRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(applicationRef01Data["id"], applicationRef01DataDt0LoadResult["id"],
        "expected load result id to match")

    // REMOVE
    val applicationRef01MatchRm0 = linkedMapOf<String, Any?>()
    applicationRef01MatchRm0["id"] = applicationRef01Data["id"]
    applicationRef01Ent.remove(applicationRef01MatchRm0, null)

    // LIST
    val applicationRef01MatchRt0 = linkedMapOf<String, Any?>()

    val applicationRef01ListRt0Result = applicationRef01Ent.list(applicationRef01MatchRt0, null)
    assertTrue(applicationRef01ListRt0Result is List<*>,
        "expected list result to be an array, got " + applicationRef01ListRt0Result)
    val applicationRef01ListRt0 = applicationRef01ListRt0Result as List<Any?>

    val notFoundItem = Struct.select(
        RunnerSupport.entityListToData(applicationRef01ListRt0),
        Struct.jm("id", applicationRef01Data["id"]))
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list")

  }

  @Test
  fun stream() {
    val streamingActive = linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "streaming" to linkedMapOf<String, Any?>("active" to true),
      ),
    )
    val setup = applicationBasicSetup(streamingActive)
    Assumptions.assumeFalse(
      setup.live,
      "stream test streams the seeded fixture data (unit mode only)",
    )

    val ent = setup.client.application(null)
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
    val setup2 = applicationBasicSetup(null)
    val ent2 = setup2.client.application(null)
    val streamed2 = ent2.stream("list", match, null).toList()
    assertEquals(listed.size, streamed2.size, "expected fallback stream to match list")
  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  class FailHook : BaseFeature("failhook", "0.0.1", true) {
    var unexpected = 0
    override fun preSpec(ctx: Context) { throw RuntimeException("application hook failed") }
    override fun preUnexpected(ctx: Context) { unexpected++ }
  }

  @Test
  fun streamError() {
    val offline = linkedMapOf<String, Any?>("net" to linkedMapOf<String, Any?>("offline" to true))
    val err = assertThrows(RuntimeException::class.java) {
      Hook0SDK.testSDK(offline, null).application(null).stream("list", null, null).toList()
    }
    assertTrue(err.message.orEmpty().contains("offline"), err.message)

    Hook0SDK.testSDK(offline, null).application(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to linkedMapOf<String, Any?>("throw" to false))).toList()

    if (hasFeature("rbac")) {
      val denied = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
        "feature" to linkedMapOf<String, Any?>(
          "rbac" to linkedMapOf<String, Any?>("active" to true, "deny" to true))))
      val denyerr = assertThrows(SdkError::class.java) {
        denied.application(null).stream("list", null, null).toList()
      }
      assertEquals("rbac_denied", denyerr.code)
    }
  }

  @Test
  fun streamCtrl() {
    val explain = linkedMapOf<String, Any?>()
    val ctrl = linkedMapOf<String, Any?>("explain" to explain)
    Hook0SDK.testSDK().application(null).stream("list", null,
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
      client.application(null).list(null, null)
    }
    assertTrue(err.message.orEmpty().contains("hook failed"), err.message)
    assertTrue(0 < hook.unexpected)

    val fired = hook.unexpected
    client.application(null).list(null, linkedMapOf<String, Any?>("throw" to false))
    assertTrue(fired < hook.unexpected)
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.application(null).list(linkedMapOf<String, Any?>("organization_id" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun applicationBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "application", "ApplicationTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read application test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("application01")
      idnames.add("application02")
      idnames.add("application03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_APPLICATION_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_APPLICATION_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_APPLICATION_ENTID"])
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
