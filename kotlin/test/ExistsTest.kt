package voxgig.hook0sdk.sdktest

import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

import voxgig.hook0sdk.core.Hook0SDK

class ExistsTest {

  @Test
  fun testMode() {
    val testsdk = Hook0SDK.testSDK()
    assertNotNull(testsdk, "expected non-nil SDK")
  }
}
