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
class SubscriptionEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.subscription(null)
    assertNotNull(ent, "expected non-null subscription entity")
  }

  @Test
  fun basic() {
    val setup = subscriptionBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("create", "list", "update", "load", "remove")) {
      val reason = RunnerSupport.skipReason("entityOp", "subscription.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/subscriptions/\"}")
      println("LIVE STEP {\"id\":\"subscription.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/subscriptions/{subscription_id}\"}")
      println("LIVE STEP {\"id\":\"subscription.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/subscriptions/{subscription_id}\"}")
      println("LIVE STEP {\"id\":\"subscription.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    val client = setup.client
    if (setup.live) {
      RunnerSupport.liveExisting(setup.data!!, LIVE_STRICT, "subscription") {
        client.subscription(null).list(linkedMapOf<String, Any?>(), null)
      }
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    val subscriptionRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.subscription")))
    val subscriptionRef01Data: MutableMap<String, Any?> = if (subscriptionRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(subscriptionRef01DataRaw[0][1]) ?: linkedMapOf())

    // LIST
    val subscriptionRef01Ent = client.subscription(null)
    val subscriptionRef01Match = linkedMapOf<String, Any?>()

    val subscriptionRef01ListResult = subscriptionRef01Ent.list(subscriptionRef01Match, null)
    assertTrue(subscriptionRef01ListResult is List<*>,
        "expected list result to be an array, got " + subscriptionRef01ListResult)

    // LOAD
    val subscriptionRef01MatchDt0 = linkedMapOf<String, Any?>()
    subscriptionRef01MatchDt0["id"] = subscriptionRef01Data["id"]
    val subscriptionRef01DataDt0Loaded = subscriptionRef01Ent.load(subscriptionRef01MatchDt0, null)
    val subscriptionRef01DataDt0LoadResult = Helpers.toMapAny(if (subscriptionRef01DataDt0Loaded is SdkEntity) subscriptionRef01DataDt0Loaded.data() else subscriptionRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(subscriptionRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(subscriptionRef01Data["id"], subscriptionRef01DataDt0LoadResult["id"],
        "expected load result id to match")

      return
    }

    val client = setup.client

    // CREATE
    val subscriptionRef01Ent = client.subscription(null)
    var subscriptionRef01Data: MutableMap<String, Any?> = (Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.subscription"), "subscription_ref01")) ?: linkedMapOf())

    val subscriptionRef01DataResult = subscriptionRef01Ent.create(subscriptionRef01Data, null)
    subscriptionRef01Data = Helpers.toMapAny(if (subscriptionRef01DataResult is SdkEntity) subscriptionRef01DataResult.data() else subscriptionRef01DataResult) ?: linkedMapOf()
    assertNotNull(subscriptionRef01Data, "expected create result to be a map")
    assertNotNull(subscriptionRef01Data["id"], "expected created entity to have an id")

    // LIST
    val subscriptionRef01Match = linkedMapOf<String, Any?>()

    val subscriptionRef01ListResult = subscriptionRef01Ent.list(subscriptionRef01Match, null)
    assertTrue(subscriptionRef01ListResult is List<*>,
        "expected list result to be an array, got " + subscriptionRef01ListResult)
    val subscriptionRef01List = subscriptionRef01ListResult as List<Any?>

    val foundItem = Struct.select(
        RunnerSupport.entityListToData(subscriptionRef01List),
        Struct.jm("id", subscriptionRef01Data["id"]))
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list")

    // UPDATE
    val subscriptionRef01DataUp0Up = linkedMapOf<String, Any?>()
    subscriptionRef01DataUp0Up["id"] = subscriptionRef01Data["id"]

    val subscriptionRef01MarkdefUp0Name = "application_id"
    val subscriptionRef01MarkdefUp0Value = "Mark01-subscription_ref01_" + setup.now
    subscriptionRef01DataUp0Up[subscriptionRef01MarkdefUp0Name] = subscriptionRef01MarkdefUp0Value

    val subscriptionRef01ResdataUp0Result = subscriptionRef01Ent.update(subscriptionRef01DataUp0Up, null)
    val subscriptionRef01ResdataUp0 = Helpers.toMapAny(if (subscriptionRef01ResdataUp0Result is SdkEntity) subscriptionRef01ResdataUp0Result.data() else subscriptionRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(subscriptionRef01ResdataUp0, "expected update result to be a map")
    assertEquals(subscriptionRef01DataUp0Up["id"], subscriptionRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(subscriptionRef01MarkdefUp0Value, subscriptionRef01ResdataUp0[subscriptionRef01MarkdefUp0Name],
        "expected " + subscriptionRef01MarkdefUp0Name + " to be updated")

    // LOAD
    val subscriptionRef01MatchDt0 = linkedMapOf<String, Any?>()
    subscriptionRef01MatchDt0["id"] = subscriptionRef01Data["id"]
    val subscriptionRef01DataDt0Loaded = subscriptionRef01Ent.load(subscriptionRef01MatchDt0, null)
    val subscriptionRef01DataDt0LoadResult = Helpers.toMapAny(if (subscriptionRef01DataDt0Loaded is SdkEntity) subscriptionRef01DataDt0Loaded.data() else subscriptionRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(subscriptionRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(subscriptionRef01Data["id"], subscriptionRef01DataDt0LoadResult["id"],
        "expected load result id to match")

    // REMOVE
    val subscriptionRef01MatchRm0 = linkedMapOf<String, Any?>()
    subscriptionRef01MatchRm0["id"] = subscriptionRef01Data["id"]
    subscriptionRef01Ent.remove(subscriptionRef01MatchRm0, null)

    // LIST
    val subscriptionRef01MatchRt0 = linkedMapOf<String, Any?>()

    val subscriptionRef01ListRt0Result = subscriptionRef01Ent.list(subscriptionRef01MatchRt0, null)
    assertTrue(subscriptionRef01ListRt0Result is List<*>,
        "expected list result to be an array, got " + subscriptionRef01ListRt0Result)
    val subscriptionRef01ListRt0 = subscriptionRef01ListRt0Result as List<Any?>

    val notFoundItem = Struct.select(
        RunnerSupport.entityListToData(subscriptionRef01ListRt0),
        Struct.jm("id", subscriptionRef01Data["id"]))
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list")

  }

  @Test
  fun stream() {
    val streamingActive = linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "streaming" to linkedMapOf<String, Any?>("active" to true),
      ),
    )
    val setup = subscriptionBasicSetup(streamingActive)
    Assumptions.assumeFalse(
      setup.live,
      "stream test streams the seeded fixture data (unit mode only)",
    )

    val ent = setup.client.subscription(null)
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
    val setup2 = subscriptionBasicSetup(null)
    val ent2 = setup2.client.subscription(null)
    val streamed2 = ent2.stream("list", match, null).toList()
    assertEquals(listed.size, streamed2.size, "expected fallback stream to match list")
  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  class FailHook : BaseFeature("failhook", "0.0.1", true) {
    var unexpected = 0
    override fun preSpec(ctx: Context) { throw RuntimeException("subscription hook failed") }
    override fun preUnexpected(ctx: Context) { unexpected++ }
  }

  @Test
  fun streamError() {
    val offline = linkedMapOf<String, Any?>("net" to linkedMapOf<String, Any?>("offline" to true))
    val err = assertThrows(RuntimeException::class.java) {
      Hook0SDK.testSDK(offline, null).subscription(null).stream("list", null, null).toList()
    }
    assertTrue(err.message.orEmpty().contains("offline"), err.message)

    Hook0SDK.testSDK(offline, null).subscription(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to linkedMapOf<String, Any?>("throw" to false))).toList()

    if (hasFeature("rbac")) {
      val denied = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
        "feature" to linkedMapOf<String, Any?>(
          "rbac" to linkedMapOf<String, Any?>("active" to true, "deny" to true))))
      val denyerr = assertThrows(SdkError::class.java) {
        denied.subscription(null).stream("list", null, null).toList()
      }
      assertEquals("rbac_denied", denyerr.code)
    }
  }

  @Test
  fun streamCtrl() {
    val explain = linkedMapOf<String, Any?>()
    val ctrl = linkedMapOf<String, Any?>("explain" to explain)
    Hook0SDK.testSDK().subscription(null).stream("list", null,
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
      client.subscription(null).list(null, null)
    }
    assertTrue(err.message.orEmpty().contains("hook failed"), err.message)
    assertTrue(0 < hook.unexpected)

    val fired = hook.unexpected
    client.subscription(null).list(null, linkedMapOf<String, Any?>("throw" to false))
    assertTrue(fired < hook.unexpected)
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.subscription(null).list(linkedMapOf<String, Any?>("application_id" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun subscriptionBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "subscription", "SubscriptionTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read subscription test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("subscription01")
      idnames.add("subscription02")
      idnames.add("subscription03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_SUBSCRIPTION_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_SUBSCRIPTION_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_SUBSCRIPTION_ENTID"])
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
