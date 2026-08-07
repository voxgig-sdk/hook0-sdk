// Hook0 SDK exists test.

import XCTest

@testable import Hook0Sdk

final class ExistsTest: XCTestCase {
  func testMode() {
    let testsdk = Hook0SDK.testSDK(nil, nil)
    XCTAssertEqual(testsdk.mode, "test")
  }
}
