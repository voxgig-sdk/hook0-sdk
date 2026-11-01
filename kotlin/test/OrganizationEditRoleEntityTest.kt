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
class OrganizationEditRoleEntityTest {

  // main.kit.test.live.strict is true (the default is true): a live
  // request that fails, or a live test missing an input it needs,
  // fails the test.
  // An account with no record for a test to read skips it either way.
  private val LIVE_STRICT = true

  @Test
  fun instance() {
    val testsdk = Hook0SDK.testSDK()
    val ent = testsdk.organizationEditRole(null)
    assertNotNull(ent, "expected non-null organization_edit_role entity")
  }

  @Test
  fun basic() {
    val setup = organizationEditRoleBasicSetup(null)
    // Per-op sdk-test-control.json skip.
    val mode = if (setup.live) "live" else "unit"
    for (op in arrayOf<String>("update")) {
      val reason = RunnerSupport.skipReason("entityOp", "organization_edit_role.$op", mode)
      Assumptions.assumeTrue(
        reason == null,
        if (reason == null || "" == reason) "skipped via sdk-test-control.json" else reason,
      )
    }
    if (setup.live && "TRUE" == System.getenv("VOXGIG_GETONLY_GUARD")) {
      println("LIVE STEP {\"id\":\"organization_edit_role.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite\"}")
      Assumptions.assumeTrue(false, "Live coverage incomplete: organization_edit_role.update.0 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite)")
      return
    }

    if (setup.live) {
      RunnerSupport.liveMiss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a organization_edit_role record it did not create")
    }
    val client = setup.client

    // Bootstrap entity data from existing test data (no create step in flow).
    val organizationEditRoleRef01DataRaw = Struct.items(Helpers.toMapAny(
        Struct.getpath(setup.data, "existing.organization_edit_role")))
    val organizationEditRoleRef01Data: MutableMap<String, Any?> = if (organizationEditRoleRef01DataRaw.isEmpty())
        linkedMapOf() else (Helpers.toMapAny(organizationEditRoleRef01DataRaw[0][1]) ?: linkedMapOf())

    // UPDATE
    val organizationEditRoleRef01Ent = client.organizationEditRole(null)
    val organizationEditRoleRef01DataUp0Up = linkedMapOf<String, Any?>()
    organizationEditRoleRef01DataUp0Up["id"] = organizationEditRoleRef01Data["id"]

    val organizationEditRoleRef01MarkdefUp0Name = "role"
    val organizationEditRoleRef01MarkdefUp0Value = "Mark01-organization_edit_role_ref01_" + setup.now
    organizationEditRoleRef01DataUp0Up[organizationEditRoleRef01MarkdefUp0Name] = organizationEditRoleRef01MarkdefUp0Value

    val organizationEditRoleRef01ResdataUp0Result = organizationEditRoleRef01Ent.update(organizationEditRoleRef01DataUp0Up, null)
    val organizationEditRoleRef01ResdataUp0 = Helpers.toMapAny(if (organizationEditRoleRef01ResdataUp0Result is SdkEntity) organizationEditRoleRef01ResdataUp0Result.data() else organizationEditRoleRef01ResdataUp0Result) ?: linkedMapOf()
    assertNotNull(organizationEditRoleRef01ResdataUp0, "expected update result to be a map")
    assertEquals(organizationEditRoleRef01DataUp0Up["id"], organizationEditRoleRef01ResdataUp0["id"],
        "expected update result id to match")
    assertEquals(organizationEditRoleRef01MarkdefUp0Value, organizationEditRoleRef01ResdataUp0[organizationEditRoleRef01MarkdefUp0Name],
        "expected " + organizationEditRoleRef01MarkdefUp0Name + " to be updated")

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
      client.organizationEditRole(null).update(linkedMapOf<String, Any?>("id" to 1), null)
    }
    assertEquals("validate_failed", err.code)
  }

  companion object {
    fun organizationEditRoleBasicSetup(extra: MutableMap<String, Any?>?): RunnerSupport.EntityTestSetup {
      RunnerSupport.loadEnvLocal()

      val entityData: MutableMap<String, Any?>
      try {
        val entityDataSource = Files.readString(Paths.get(
            "..", ".sdk", "test", "entity", "organization_edit_role", "OrganizationEditRoleTestData.json"))
        entityData = Helpers.toMapAny(Json.parse(entityDataSource)) ?: linkedMapOf()
      } catch (e: Exception) {
        throw AssertionError("failed to read organization_edit_role test data: " + e.message, e)
      }

      val options = linkedMapOf<String, Any?>()
      options["entity"] = entityData["existing"]

      var client = Hook0SDK.testSDK(options, extra)

      // Generate idmap via transform, matching TS pattern.
      val idnames = mutableListOf<Any?>()
      idnames.add("organization_edit_role01")
      idnames.add("organization_edit_role02")
      idnames.add("organization_edit_role03")
      val idmap = Struct.transform(idnames, Json.parse(
          "{\"`\$PACK`\": [\"\", {" +
          "\"`\$KEY`\": \"`\$COPY`\"," +
          "\"`\$VAL`\": [\"`\$FORMAT`\", \"upper\", \"`\$COPY`\"]" +
          "}]}"))

      // Whether *_ENTID supplied the idmap, read before envOverride consumes it.
      val entidEnvRaw = RunnerSupport.getenv("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID")
      val idmapOverridden = entidEnvRaw != null && entidEnvRaw.trim().startsWith("{")

      val envm = linkedMapOf<String, Any?>()
      envm["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"] = idmap
      envm["HOOK0_TEST_LIVE"] = "FALSE"
      envm["HOOK0_TEST_EXPLAIN"] = "FALSE"
      envm["HOOK0_APIKEY"] = "NONE"
      val env = RunnerSupport.envOverride(envm)

      var idmapResolved = Helpers.toMapAny(env["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"])
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
