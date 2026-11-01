// Hook0 SDK utility: prepareBody.

namespace Hook0Sdk.Util;

public static partial class SdkUtility
{
    internal static object? PrepareBodyUtil(Context ctx)
    {
        var op = ctx.Op!;

        if (op.Input == "data")
        {
            if (IsRawRequest(ctx.Point))
            {
                return RawBodyOf(ctx.Reqdata);
            }
            var body = ctx.Utility!.TransformRequest(ctx);
            return body;
        }

        return null;
    }
}
