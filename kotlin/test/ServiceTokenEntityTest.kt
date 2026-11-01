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
class ServiceTokenEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.serviceToken(null)
    assertNotNull(ent, "expected non-null service_token entity")
  }

  @Test
  fun basic() {
    val setup = serviceTokenBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("create", "list", "update", "load", "remove")) {
      val reason = RunnerSupport.skipReason("entityOp", "service_token.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"service_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/service_token/\"}")
      println("LIVE STEP {\"id\":\"service_token.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/service_token/{service_token_id}\"}")
      println("LIVE STEP {\"id\":\"service_token.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/service_token/{service_token_id}\"}")
      println("LIVE STEP {\"id\":\"service_token.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    val client = setup.client
    if (setup.live) {
      RunnerSupport.liveExisting(setup.data!!, LIVE_STRICT, "service_token") {
        client.serviceToken(null).list(linkedMapOf<String, Any?>(), null)
      }
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    val serviceTokenRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.service_token")))
    val serviceTokenRef01Data: MutableMap<String, Any?> = if (serviceTokenRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(serviceTokenRef01DataRaw[0][1]) ?: linkedMapOf())

    // LIST
    val serviceTokenRef01Ent = client.serviceToken(null)
    val serviceTokenRef01Match = linkedMapOf<String, Any?>()

    val serviceTokenRef01ListResult = serviceTokenRef01Ent.list(serviceTokenRef01Match, null)
    assertTrue(serviceTokenRef01ListResult is List<*>,
        "expected list result to be an array, got " + serviceTokenRef01ListResult)

    // LOAD
    val serviceTokenRef01MatchDt0 = linkedMapOf<String, Any?>()
    serviceTokenRef01MatchDt0["id"] = serviceTokenRef01Data["id"]
    val serviceTokenRef01DataDt0Loaded = serviceTokenRef01Ent.load(serviceTokenRef01MatchDt0, null)
    val serviceTokenRef01DataDt0LoadResult = Helpers.toMapAny(if (serviceTokenRef01DataDt0Loaded is SdkEntity) serviceTokenRef01DataDt0Loaded.data() else serviceTokenRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(serviceTokenRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(serviceTokenRef01Data["id"], serviceTokenRef01DataDt0LoadResult["id"],
        "expected load result id to match")

      return
    }

    val client = setup.client

    // CREATE
    val serviceTokenRef01Ent = client.serviceToken(null)
    var serviceTokenRef01Data: MutableMap<String, Any?> = (Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.service_token"), "service_token_ref01")) ?: linkedMapOf())

    val serviceTokenRef01DataResult = serviceTokenRef01Ent.create(serviceTokenRef01Data, null)
    serviceTokenRef01Data = Helpers.toMapAny(if (serviceTokenRef01DataResult is SdkEntity) serviceTokenRef01DataResult.data() else serviceTokenRef01DataResult) ?: linkedMapOf()
    assertNotNull(serviceTokenRef01Data, "expected create result to be a map")
    assertNotNull(serviceTokenRef01Data["id"], "expected created entity to have an id")

    // LIST
    val serviceTokenRef01Match = linkedMapOf<String, Any?>()

    val serviceTokenRef01ListResult = serviceTokenRef01Ent.list(serviceTokenRef01Match, null)
    assertTrue(serviceTokenRef01ListResult is List<*>,
        "expected list result to be an array, got " + serviceTokenRef01ListResult)
    val serviceTokenRef01List = serviceTokenRef01ListResult as List<Any?>

    val foundItem = Struct.select(
        RunnerSupport.entityListToData(serviceTokenRef01List),
        Struct.jm("id", serviceTokenRef01Data["id"]))
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list")

    // UPDATE
    val serviceTokenRef01DataUp0Up = linkedMapOf<String, Any?>()
    serviceTokenRef01DataUp0Up["id"] = serviceTokenRef01Data["id"]

    val serviceTokenRef01MarkdefUp0Name = "biscuit"
    val serviceTokenRef01MarkdefUp0Value = "Mark01-service_token_ref01_" + setup.now
    serviceTokenRef01DataUp0Up[serviceTokenRef01MarkdefUp0Name] = serviceTokenRef01MarkdefUp0Value

    val serviceTokenRef01ResdataUp0Result = serviceTokenRef01Ent.update(serviceTokenRef01DataUp0Up, null)
    val serviceTokenRef01ResdataUp0 = Helpers.toMapAny(if (serviceTokenRef01ResdataUp0Result is SdkEntity) serviceTokenRef01ResdataUp0Result.data() else serviceTokenRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(serviceTokenRef01ResdataUp0, "expected update result to be a map")
    assertEquals(serviceTokenRef01DataUp0Up["id"], serviceTokenRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(serviceTokenRef01MarkdefUp0Value, serviceTokenRef01ResdataUp0[serviceTokenRef01MarkdefUp0Name],
        "expected " + serviceTokenRef01MarkdefUp0Name + " to be updated")

    // LOAD
    val serviceTokenRef01MatchDt0 = linkedMapOf<String, Any?>()
    serviceTokenRef01MatchDt0["id"] = serviceTokenRef01Data["id"]
    val serviceTokenRef01DataDt0Loaded = serviceTokenRef01Ent.load(serviceTokenRef01MatchDt0, null)
    val serviceTokenRef01DataDt0LoadResult = Helpers.toMapAny(if (serviceTokenRef01DataDt0Loaded is SdkEntity) serviceTokenRef01DataDt0Loaded.data() else serviceTokenRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(serviceTokenRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(serviceTokenRef01Data["id"], serviceTokenRef01DataDt0LoadResult["id"],
        "expected load result id to match")

    // REMOVE
    val serviceTokenRef01MatchRm0 = linkedMapOf<String, Any?>()
    serviceTokenRef01MatchRm0["id"] = serviceTokenRef01Data["id"]
    serviceTokenRef01Ent.remove(serviceTokenRef01MatchRm0, null)

    // LIST
    val serviceTokenRef01MatchRt0 = linkedMapOf<String, Any?>()

    val serviceTokenRef01ListRt0Result = serviceTokenRef01Ent.list(serviceTokenRef01MatchRt0, null)
    assertTrue(serviceTokenRef01ListRt0Result is List<*>,
        "expected list result to be an array, got " + serviceTokenRef01ListRt0Result)
    val serviceTokenRef01ListRt0 = serviceTokenRef01ListRt0Result as List<Any?>

    val notFoundItem = Struct.select(
        RunnerSupport.entityListToData(serviceTokenRef01ListRt0),
        Struct.jm("id", serviceTokenRef01Data["id"]))
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list")

  }

  @Test
  fun stream() {
    val streamingActive = linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "streaming" to linkedMapOf<String, Any?>("active" to true),
      ),
    )
    val setup = serviceTokenBasicSetup(streamingActive)
    Assumptions.assumeFalse(
      setup.live,
      "stream test streams the seeded fixture data (unit mode only)",
    )

    val ent = setup.client.serviceToken(null)
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
    val setup2 = serviceTokenBasicSetup(null)
    val ent2 = setup2.client.serviceToken(null)
    val streamed2 = ent2.stream("list", match, null).toList()
    assertEquals(listed.size, streamed2.size, "expected fallback stream to match list")
  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  class FailHook : BaseFeature("failhook", "0.0.1", true) {
    var unexpected = 0
    override fun preSpec(ctx: Context) { throw RuntimeException("service_token hook failed") }
    override fun preUnexpected(ctx: Context) { unexpected++ }
  }

  @Test
  fun streamError() {
    val offline = linkedMapOf<String, Any?>("net" to linkedMapOf<String, Any?>("offline" to true))
    val err = assertThrows(RuntimeException::class.java) {
      Hook0SDK.testSDK(offline, null).serviceToken(null).stream("list", null, null).toList()
    }
    assertTrue(err.message.orEmpty().contains("offline"), err.message)

    Hook0SDK.testSDK(offline, null).serviceToken(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to linkedMapOf<String, Any?>("throw" to false))).toList()

    if (hasFeature("rbac")) {
      val denied = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
        "feature" to linkedMapOf<String, Any?>(
          "rbac" to linkedMapOf<String, Any?>("active" to true, "deny" to true))))
      val denyerr = assertThrows(SdkError::class.java) {
        denied.serviceToken(null).stream("list", null, null).toList()
      }
      assertEquals("rbac_denied", denyerr.code)
    }
  }

  @Test
  fun streamCtrl() {
    val explain = linkedMapOf<String, Any?>()
    val ctrl = linkedMapOf<String, Any?>("explain" to explain)
    Hook0SDK.testSDK().serviceToken(null).stream("list", null,
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
      client.serviceToken(null).list(null, null)
    }
    assertTrue(err.message.orEmpty().contains("hook failed"), err.message)
    assertTrue(0 < hook.unexpected)

    val fired = hook.unexpected
    client.serviceToken(null).list(null, linkedMapOf<String, Any?>("throw" to false))
    assertTrue(fired < hook.unexpected)
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.serviceToken(null).list(linkedMapOf<String, Any?>("organization_id" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun serviceTokenBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "service_token", "ServiceTokenTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read service_token test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("service_token01")
      idnames.add("service_token02")
      idnames.add("service_token03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_SERVICE_TOKEN_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_SERVICE_TOKEN_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_SERVICE_TOKEN_ENTID"])
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
