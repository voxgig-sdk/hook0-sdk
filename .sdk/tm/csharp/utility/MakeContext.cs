// Hook0 SDK utility: makeContext.

namespace Hook0Sdk.Util;

public static partial class SdkUtility
{
    internal static Context MakeContextUtil(Dictionary<string, object?>? ctxmap, Context? basectx)
    {
        return new Context(ctxmap, basectx);
    }
}
