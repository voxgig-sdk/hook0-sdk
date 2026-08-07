package voxgig.hook0sdk.sdktest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import voxgig.hook0sdk.core.Hook0SDK;

public class ExistsTest {

  @Test
  public void testMode() {
    Hook0SDK testsdk = Hook0SDK.testSDK();
    assertNotNull(testsdk, "expected non-nil SDK");
  }
}
