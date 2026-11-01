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
class HealthEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.health(null)
    assertNotNull(ent, "expected non-null health entity")
  }

  @Test
  fun basic() {
    val setup = healthBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("load")) {
      val reason = RunnerSupport.skipReason("entityOp", "health.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    val client = setup.client

    // Bootstrap entity data from existing test data (no create step in flow).
    val healthRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.health")))
    val healthRef01Data: MutableMap<String, Any?> = if (healthRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(healthRef01DataRaw[0][1]) ?: linkedMapOf())

    // LOAD
    val healthRef01Ent = client.health(null)
    val healthRef01MatchDt0 = linkedMapOf<String, Any?>()
    val healthRef01DataDt0Loaded = healthRef01Ent.load(healthRef01MatchDt0, null)
    assertNotNull(healthRef01DataDt0Loaded, "expected load result to be non-null")

  }

  private fun hasFeature(name: String): Boolean {
    val fm = Helpers.toMapAny(Config.sharedConfig()["feature"])
    return fm != null && fm[name] != null
  }

  @Test
  fun validate() {
    Assumptions.assumeTrue(hasFeature("validate"), "feature not present in this SDK: validate")
    val client = Hook0SDK.testSDK(null, linkedMapOf<String, Any?>(
      "feature" to linkedMapOf<String, Any?>(
        "validate" to linkedMapOf<String, Any?>("active" to true))))
    val err = assertThrows(SdkError::class.java) {
      client.health(null).load(linkedMapOf<String, Any?>("key" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun healthBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "health", "HealthTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read health test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("health01")
      idnames.add("health02")
      idnames.add("health03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_HEALTH_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_HEALTH_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_HEALTH_ENTID"])
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
