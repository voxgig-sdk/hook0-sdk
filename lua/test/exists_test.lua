-- Hook0 SDK exists test

local sdk = require("hook0_sdk")

describe("Hook0SDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
