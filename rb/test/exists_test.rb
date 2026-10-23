# Hook0 SDK exists test

require "minitest/autorun"
require_relative "../Hook0_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Hook0SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
