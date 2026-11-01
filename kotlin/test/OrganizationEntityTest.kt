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
class OrganizationEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.organization(null)
    assertNotNull(ent, "expected non-null organization entity")
  }

  @Test
  fun basic() {
    val setup = organizationBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("create", "list", "update", "load", "remove")) {
      val reason = RunnerSupport.skipReason("entityOp", "organization.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"organization.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/\"}")
      println("LIVE STEP {\"id\":\"organization.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/\"}")
      println("LIVE STEP {\"id\":\"organization.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/\"}")
      println("LIVE STEP {\"id\":\"organization.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    val client = setup.client
    if (setup.live) {
      RunnerSupport.liveExisting(setup.data!!, LIVE_STRICT, "organization") {
        client.organization(null).list(linkedMapOf<String, Any?>(), null)
      }
    }

    // Bootstrap entity data from existing test data (no create step in flow).
    val organizationRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.organization")))
    val organizationRef01Data: MutableMap<String, Any?> = if (organizationRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(organizationRef01DataRaw[0][1]) ?: linkedMapOf())

    // LIST
    val organizationRef01Ent = client.organization(null)
    val organizationRef01Match = linkedMapOf<String, Any?>()

    val organizationRef01ListResult = organizationRef01Ent.list(organizationRef01Match, null)
    assertTrue(organizationRef01ListResult is List<*>,
        "expected list result to be an array, got " + organizationRef01ListResult)

    // LOAD
    val organizationRef01MatchDt0 = linkedMapOf<String, Any?>()
    organizationRef01MatchDt0["id"] = organizationRef01Data["id"]
    val organizationRef01DataDt0Loaded = organizationRef01Ent.load(organizationRef01MatchDt0, null)
    val organizationRef01DataDt0LoadResult = Helpers.toMapAny(if (organizationRef01DataDt0Loaded is SdkEntity) organizationRef01DataDt0Loaded.data() else organizationRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(organizationRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(organizationRef01Data["id"], organizationRef01DataDt0LoadResult["id"],
        "expected load result id to match")

      return
    }

    val client = setup.client

    // CREATE
    val organizationRef01Ent = client.organization(null)
    var organizationRef01Data: MutableMap<String, Any?> = (Helpers.toMapAny(Struct.getprop(
        Struct.getpath(setup.data, "new.organization"), "organization_ref01")) ?: linkedMapOf())

    val organizationRef01DataResult = organizationRef01Ent.create(organizationRef01Data, null)
    organizationRef01Data = Helpers.toMapAny(if (organizationRef01DataResult is SdkEntity) organizationRef01DataResult.data() else organizationRef01DataResult) ?: linkedMapOf()
    assertNotNull(organizationRef01Data, "expected create result to be a map")
    assertNotNull(organizationRef01Data["id"], "expected created entity to have an id")

    // LIST
    val organizationRef01Match = linkedMapOf<String, Any?>()

    val organizationRef01ListResult = organizationRef01Ent.list(organizationRef01Match, null)
    assertTrue(organizationRef01ListResult is List<*>,
        "expected list result to be an array, got " + organizationRef01ListResult)
    val organizationRef01List = organizationRef01ListResult as List<Any?>

    val foundItem = Struct.select(
        RunnerSupport.entityListToData(organizationRef01List),
        Struct.jm("id", organizationRef01Data["id"]))
    assertFalse(Struct.isempty(foundItem), "expected to find created entity in list")

    // UPDATE
    val organizationRef01DataUp0Up = linkedMapOf<String, Any?>()
    organizationRef01DataUp0Up["id"] = organizationRef01Data["id"]

    val organizationRef01MarkdefUp0Name = "application_id"
    val organizationRef01MarkdefUp0Value = "Mark01-organization_ref01_" + setup.now
    organizationRef01DataUp0Up[organizationRef01MarkdefUp0Name] = organizationRef01MarkdefUp0Value

    val organizationRef01ResdataUp0Result = organizationRef01Ent.update(organizationRef01DataUp0Up, null)
    val organizationRef01ResdataUp0 = Helpers.toMapAny(if (organizationRef01ResdataUp0Result is SdkEntity) organizationRef01ResdataUp0Result.data() else organizationRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(organizationRef01ResdataUp0, "expected update result to be a map")
    assertEquals(organizationRef01DataUp0Up["id"], organizationRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(organizationRef01MarkdefUp0Value, organizationRef01ResdataUp0[organizationRef01MarkdefUp0Name],
        "expected " + organizationRef01MarkdefUp0Name + " to be updated")

    // LOAD
    val organizationRef01MatchDt0 = linkedMapOf<String, Any?>()
    organizationRef01MatchDt0["id"] = organizationRef01Data["id"]
    val organizationRef01DataDt0Loaded = organizationRef01Ent.load(organizationRef01MatchDt0, null)
    val organizationRef01DataDt0LoadResult = Helpers.toMapAny(if (organizationRef01DataDt0Loaded is SdkEntity) organizationRef01DataDt0Loaded.data() else organizationRef01DataDt0Loaded) ?: linkedMapOf()
    assertNotNull(organizationRef01DataDt0LoadResult, "expected load result to be a map")
    assertEquals(organizationRef01Data["id"], organizationRef01DataDt0LoadResult["id"],
        "expected load result id to match")

    // REMOVE
    val organizationRef01MatchRm0 = linkedMapOf<String, Any?>()
    organizationRef01MatchRm0["id"] = organizationRef01Data["id"]
    organizationRef01Ent.remove(organizationRef01MatchRm0, null)

    // LIST
    val organizationRef01MatchRt0 = linkedMapOf<String, Any?>()

    val organizationRef01ListRt0Result = organizationRef01Ent.list(organizationRef01MatchRt0, null)
    assertTrue(organizationRef01ListRt0Result is List<*>,
        "expected list result to be an array, got " + organizationRef01ListRt0Result)
    val organizationRef01ListRt0 = organizationRef01ListRt0Result as List<Any?>

    val notFoundItem = Struct.select(
        RunnerSupport.entityListToData(organizationRef01ListRt0),
        Struct.jm("id", organizationRef01Data["id"]))
    assertTrue(Struct.isempty(notFoundItem), "expected removed entity to not be in list")

  }

  @Test
  fun stream() {
    val streamingActive = linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "streaming" to linkedMapOf<String, Any?>("active" to true),
      ),
    )
    val setup = organizationBasicSetup(streamingActive)
    Assumptions.assumeFalse(
      setup.live,
      "stream test streams the seeded fixture data (unit mode only)",
    )

    val ent = setup.client.organization(null)
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
    val setup2 = organizationBasicSetup(null)
    val ent2 = setup2.client.organization(null)
    val streamed2 = ent2.stream("list", match, null).toList()
    assertEquals(listed.size, streamed2.size, "expected fallback stream to match list")
  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  class FailHook : BaseFeature("failhook", "0.0.1", true) {
    var unexpected = 0
    override fun preSpec(ctx: Context) { throw RuntimeException("organization hook failed") }
    override fun preUnexpected(ctx: Context) { unexpected++ }
  }

  @Test
  fun streamError() {
    val offline = linkedMapOf<String, Any?>("net" to linkedMapOf<String, Any?>("offline" to true))
    val err = assertThrows(RuntimeException::class.java) {
      Hook0SDK.testSDK(offline, null).organization(null).stream("list", null, null).toList()
    }
    assertTrue(err.message.orEmpty().contains("offline"), err.message)

    Hook0SDK.testSDK(offline, null).organization(null).stream("list", null,
      linkedMapOf<String, Any?>("ctrl" to linkedMapOf<String, Any?>("throw" to false))).toList()

    if (hasFeature("rbac")) {
      val denied = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
        "feature" to linkedMapOf<String, Any?>(
          "rbac" to linkedMapOf<String, Any?>("active" to true, "deny" to true))))
      val denyerr = assertThrows(SdkError::class.java) {
        denied.organization(null).stream("list", null, null).toList()
      }
      assertEquals("rbac_denied", denyerr.code)
    }
  }

  @Test
  fun streamCtrl() {
    val explain = linkedMapOf<String, Any?>()
    val ctrl = linkedMapOf<String, Any?>("explain" to explain)
    Hook0SDK.testSDK().organization(null).stream("list", null,
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
      client.organization(null).list(null, null)
    }
    assertTrue(err.message.orEmpty().contains("hook failed"), err.message)
    assertTrue(0 < hook.unexpected)

    val fired = hook.unexpected
    client.organization(null).list(null, linkedMapOf<String, Any?>("throw" to false))
    assertTrue(fired < hook.unexpected)
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.organization(null).list(linkedMapOf<String, Any?>("amount" to "x"), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun organizationBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "organization", "OrganizationTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read organization test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("organization01")
      idnames.add("organization02")
      idnames.add("organization03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_ORGANIZATION_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_ORGANIZATION_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_ORGANIZATION_ENTID"])
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
