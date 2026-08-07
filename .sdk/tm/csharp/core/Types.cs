// Hook0 SDK - core contracts.

namespace Hook0Sdk;

// The minimal entity contract the pipeline depends on (list-wrapping in
// MakeResult, feature hooks). Concrete entity classes derive from
// Hook0EntityBase which implements this.
public interface IEntity
{
    string GetName();
    IEntity Make();
    object? Data(object? data = null);
    object? Match(object? match = null);
}

// Transport function: performs the HTTP (or mock) request. Returns a
// transport-shaped response map:
//   { status, statusText, headers, json: Func<object?>, body }
// Throws (typically Hook0Error) on transport-level failure - the C#
// twin of go's (any, error) return.
public delegate object? FetcherFunc(Context ctx, string fullurl, Dictionary<string, object?> fetchdef);
