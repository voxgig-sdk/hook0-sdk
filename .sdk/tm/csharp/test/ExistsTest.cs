// Hook0 SDK exists test.

using Xunit;

using Hook0Sdk;

namespace Hook0Sdk.Test;

public class ExistsTest
{
    [Fact]
    public void TestMode()
    {
        var testsdk = Hook0SDK.TestSDK(null, null);
        Assert.NotNull(testsdk);
    }
}
