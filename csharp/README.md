# Hook0 C# SDK



The C# SDK for the Hook0 API — an entity-oriented client following idiomatic C# conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Application()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to NuGet. Install it from the GitHub
release tag (`csharp/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hook0-sdk/tags)) or
from a source checkout — build the library and add a project reference:

```bash
cd csharp && dotnet build Hook0SDK.csproj
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```csharp
using Hook0Sdk;
using Voxgig.Struct;

var client = new Hook0SDK(new Dictionary<string, object?>
{
    ["apikey"] = Environment.GetEnvironmentVariable("HOOK0_APIKEY"),
});
```

### 2. List application records

`List(null)` returns a list of entities, one per record (as `object?`), and
raises on error; an entity's `Data()` reads its record.

```csharp
try
{
    var applicationList = (List<object?>)client.Application().List(new Dictionary<string, object?> { ["organization_id"] = "example" })!;
    foreach (var applicationItem in applicationList)
    {
        Console.WriteLine(StructUtils.Jsonify(((IEntity)applicationItem!).Data()));
    }
}
catch (Exception err)
{
    Console.WriteLine($"list failed: {err.Message}");
}
```

### 3. Load an application

`Load()` returns the entity (as `object?`) and raises on error; an entity's
`Data()` reads its record.

```csharp
try
{
    var application = (IEntity)client.Application().Load(new Dictionary<string, object?> { ["id"] = "example_id" })!;
    Console.WriteLine(StructUtils.Jsonify(application.Data()));
}
catch (Exception err)
{
    Console.WriteLine($"load failed: {err.Message}");
}
```

### 4. Create, update, and remove

```csharp
// Create — returns the created entity (as object?)
var created = client.Application().Create(new Dictionary<string, object?> { ["name"] = "example_name", ["organization_id"] = "example_organization_id" });

// Update — supply the id in the match/data
client.Application().Update(new Dictionary<string, object?> { ["id"] = "example_id", ["name"] = "example_name", ["organization_id"] = "example_organization_id" });

// Remove
client.Application().Remove(new Dictionary<string, object?> { ["id"] = "example_id" });
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const response = await client.Response().load({ id: "example_id", application_id: "example" })
  console.log(response.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```csharp
var result = client.Direct(new Dictionary<string, object?>
{
    ["path"] = "/api/resource/{id}",
    ["method"] = "GET",
    ["params"] = new Dictionary<string, object?> { ["id"] = "example" },
});

if (Equals(result["ok"], true))
{
    Console.WriteLine(result["status"]);  // 200
    Console.WriteLine(result["data"]);    // response body
}
else
{
    // A non-2xx response carries status + data (the error body); a
    // transport-level failure carries err instead. Only one is present, so
    // read both with TryGetValue rather than indexing a key that may be absent.
    result.TryGetValue("status", out var status);
    result.TryGetValue("err", out var err);
    Console.WriteLine($"{status} {err}");
}
```

### Prepare a request without sending it

```csharp
// Prepare() returns the fetch definition and raises on error.
var fetchdef = client.Prepare(new Dictionary<string, object?>
{
    ["path"] = "/api/resource/{id}",
    ["method"] = "DELETE",
    ["params"] = new Dictionary<string, object?> { ["id"] = "example" },
});

Console.WriteLine(fetchdef["url"]);
Console.WriteLine(fetchdef["method"]);
Console.WriteLine(fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```csharp
var client = Hook0SDK.TestSDK(null, null);

// Entity ops return the entity; they raise on error.
var response = (IEntity)client.Response().Load(new Dictionary<string, object?> { ["id"] = "test01", ["application_id"] = "example" })!;
// Data() reads the entity's mock record
Console.WriteLine(StructUtils.Jsonify(response.Data()));
```

### Use a custom fetch function

Replace the HTTP transport with your own delegate:

```csharp
Func<string, Dictionary<string, object?>, Dictionary<string, object?>> mockFetch =
    (url, init) => new Dictionary<string, object?>
    {
        ["status"] = 200,
        ["statusText"] = "OK",
        ["headers"] = new Dictionary<string, object?>(),
        ["json"] = (Func<object?>)(() => new Dictionary<string, object?> { ["id"] = "mock01" }),
    };

var client = new Hook0SDK(new Dictionary<string, object?>
{
    ["base"] = "http://localhost:8080",
    ["system"] = new Dictionary<string, object?>
    {
        ["fetch"] = mockFetch,
    },
});
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd csharp && dotnet test
```


## Reference

### Hook0SDK

```csharp
using Hook0Sdk;

var client = new Hook0SDK(options);
```

Creates a new SDK client. `options` is a `Dictionary<string, object?>`.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `Dictionary` | Feature activation flags. |
| `extend` | `List` | Additional Feature instances to load. |
| `system` | `Dictionary` | System overrides (e.g. custom `fetch` delegate). |

### TestSDK

```csharp
var client = Hook0SDK.TestSDK(testopts, sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() -> Dictionary` | Deep copy of current SDK options. |
| `GetUtility` | `() -> Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs) -> Dictionary` | Build an HTTP request definition without sending. Raises on error. |
| `Direct` | `(fetchargs) -> Dictionary` | Build and send an HTTP request. Returns a result dictionary (branch on `ok`). |
| `Application` | `(entopts) -> Hook0EntityBase` | Create an Application entity instance. |
| `ApplicationSecret` | `(entopts) -> Hook0EntityBase` | Create an ApplicationSecret entity instance. |
| `EmailPreference` | `(entopts) -> Hook0EntityBase` | Create an EmailPreference entity instance. |
| `Error` | `(entopts) -> Hook0EntityBase` | Create an Error entity instance. |
| `Event` | `(entopts) -> Hook0EntityBase` | Create an Event entity instance. |
| `EventType` | `(entopts) -> Hook0EntityBase` | Create an EventType entity instance. |
| `EventsManagement` | `(entopts) -> Hook0EntityBase` | Create an EventsManagement entity instance. |
| `Health` | `(entopts) -> Hook0EntityBase` | Create a Health entity instance. |
| `Hook0` | `(entopts) -> Hook0EntityBase` | Create a Hook0 entity instance. |
| `IngestedEvent` | `(entopts) -> Hook0EntityBase` | Create an IngestedEvent entity instance. |
| `Instance` | `(entopts) -> Hook0EntityBase` | Create an Instance entity instance. |
| `Login` | `(entopts) -> Hook0EntityBase` | Create a Login entity instance. |
| `Organization` | `(entopts) -> Hook0EntityBase` | Create an Organization entity instance. |
| `OrganizationEditRole` | `(entopts) -> Hook0EntityBase` | Create an OrganizationEditRole entity instance. |
| `Quota` | `(entopts) -> Hook0EntityBase` | Create a Quota entity instance. |
| `Registration` | `(entopts) -> Hook0EntityBase` | Create a Registration entity instance. |
| `RequestAttempt` | `(entopts) -> Hook0EntityBase` | Create a RequestAttempt entity instance. |
| `Response` | `(entopts) -> Hook0EntityBase` | Create a Response entity instance. |
| `Revoke` | `(entopts) -> Hook0EntityBase` | Create a Revoke entity instance. |
| `ServiceToken` | `(entopts) -> Hook0EntityBase` | Create a ServiceToken entity instance. |
| `Subscription` | `(entopts) -> Hook0EntityBase` | Create a Subscription entity instance. |
| `UserAuthentication` | `(entopts) -> Hook0EntityBase` | Create an UserAuthentication entity instance. |
| `UserInvitation` | `(entopts) -> Hook0EntityBase` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl) -> object?` | Load a single entity by match criteria, and return it. Raises on error. |
| `List` | `(reqmatch, ctrl) -> object?` | List entities matching the criteria, one per record. Raises on error. |
| `Create` | `(reqdata, ctrl) -> object?` | Create a new entity, and return it. Raises on error. |
| `Update` | `(reqdata, ctrl) -> object?` | Update an existing entity, and return it. Raises on error. |
| `Remove` | `(reqmatch, ctrl) -> object?` | Remove an entity, and return it marked as deleted. Raises on error. |
| `Data` | `(newdata) -> object?` | Get or set entity data. |
| `Match` | `(newmatch) -> object?` | Get or set entity match criteria. |
| `Make` | `() -> IEntity` | Create a new instance with the same options. |
| `GetName` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `List` a list of entities, one per
record, as `object?`; an entity is an `IEntity`, whose `Data()` reads its
record. They raise on error, so wrap calls in `try`/`catch` to handle
failures.

The `Direct()` escape hatch never raises — it returns a result
`Dictionary<string, object?>` you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `Dictionary` | Response headers. |
| `data` | `object?` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `amount` |  |
| `application_id` | Unique identifier of the application. |
| `application_name` |  |
| `consumption` | Current consumption metrics for this application. |
| `date` |  |
| `id` |  |
| `is_provisional` |  |
| `name` | Name of the application. |
| `onboarding_steps` | Onboarding completion status for this application. |
| `organization_id` | UUID of the organization this application belongs to. |
| `quotas` | Quota limits for this application. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/applications/`

#### ApplicationSecret

| Field | Description |
| --- | --- |
| `application_id` |  |
| `created_at` |  |
| `deleted_at` |  |
| `id` |  |
| `name` |  |
| `token` |  |

Operations: Create, List, Remove, Update.

API path: `/api/v1/application_secrets/`

#### EmailPreference

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/email-preferences/unsubscribe-reactivation`

#### Error

| Field | Description |
| --- | --- |
| `detail` |  |
| `id` | Identifier of the problem that occurred, stable across releases |
| `status` |  |
| `title` |  |
| `type` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

Operations: List.

API path: `/api/v1/errors/`

#### Event

| Field | Description |
| --- | --- |
| `event_id` |  |
| `event_type_name` |  |
| `id` |  |
| `ip` |  |
| `labels` |  |
| `metadata` |  |
| `occurred_at` |  |
| `payload` |  |
| `payload_content_type` |  |
| `received_at` |  |

Operations: Create, List, Load.

API path: `/api/v1/events/{event_id}/replay`

#### EventType

| Field | Description |
| --- | --- |
| `application_id` |  |
| `event_type_name` |  |
| `id` |  |
| `resource_type` |  |
| `resource_type_name` |  |
| `service` |  |
| `service_name` |  |
| `verb` |  |
| `verb_name` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/payload_content_types/`

#### Health

| Field | Description |
| --- | --- |
| `database` |  |
| `database_duration_ms` |  |
| `object_storage` |  |
| `object_storage_duration_ms` |  |
| `pulsar` |  |
| `pulsar_duration_ms` |  |
| `total_duration_ms` |  |

Operations: Load.

API path: `/api/v1/health/`

#### Hook0

| Field | Description |
| --- | --- |
| `default` |  |
| `description` |  |
| `env_var` |  |
| `group` |  |
| `name` |  |
| `required` |  |
| `sensitive` |  |

Operations: List.

API path: `/api/v1/environment_variables/`

#### IngestedEvent

| Field | Description |
| --- | --- |
| `application_id` | UUID of the application this event belongs to. |
| `event_id` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | Labels for event filtering and routing to subscriptions. |
| `metadata` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | Timestamp when the event occurred. |
| `payload` | The event payload. |
| `payload_content_type` | Content type of the payload. |

Operations: Create.

API path: `/api/v1/event/`

#### Instance

| Field | Description |
| --- | --- |
| `application_secret_compatibility` |  |
| `auto_db_migration` |  |
| `biscuit_public_key` |  |
| `cloudflare_turnstile_site_key` |  |
| `formbricks` |  |
| `matomo` |  |
| `password_minimum_length` |  |
| `quota_enforcement` |  |
| `registration_disabled` |  |
| `support_email_address` |  |

Operations: Load.

API path: `/api/v1/instance/`

#### Login

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |
| `token` |  |

Operations: Create.

API path: `/api/v1/auth/login`

#### Organization

| Field | Description |
| --- | --- |
| `amount` |  |
| `application_id` |  |
| `application_name` |  |
| `consumption` |  |
| `date` |  |
| `id` |  |
| `is_provisional` |  |
| `name` |  |
| `onboarding_steps` |  |
| `organization_id` |  |
| `plan` |  |
| `quotas` |  |
| `role` |  |
| `users` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/`

#### OrganizationEditRole

| Field | Description |
| --- | --- |
| `id` |  |
| `role` |  |
| `user_id` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Quota

| Field | Description |
| --- | --- |
| `enabled` |  |
| `limits` |  |

Operations: Load.

API path: `/api/v1/quotas/`

#### Registration

| Field | Description |
| --- | --- |
| `email` |  |
| `first_name` |  |
| `gclid` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` |  |
| `password` |  |
| `signup_channel` | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` |  |

Operations: Create.

API path: `/api/v1/register/`

#### RequestAttempt

| Field | Description |
| --- | --- |
| `created_at` |  |
| `delay_until` |  |
| `event` |  |
| `event_id` |  |
| `failed_at` |  |
| `http_response_status` |  |
| `id` |  |
| `picked_at` |  |
| `request_attempt_id` |  |
| `response_id` |  |
| `retry_count` |  |
| `status` | Status of a request attempt. |
| `subscription` |  |
| `succeeded_at` |  |

Operations: List, Load.

API path: `/api/v1/request_attempts/`

#### Response

| Field | Description |
| --- | --- |
| `body` |  |
| `elapsed_time_ms` |  |
| `headers` |  |
| `http_code` |  |
| `id` |  |
| `response_error_name` |  |
| `response_id` |  |

Operations: Load.

API path: `/api/v1/responses/{response_id}`

#### Revoke

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/invite`

#### ServiceToken

| Field | Description |
| --- | --- |
| `biscuit` |  |
| `created_at` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `token_id` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/service_token/`

#### Subscription

| Field | Description |
| --- | --- |
| `application_id` |  |
| `created_at` |  |
| `dedicated_workers` |  |
| `description` |  |
| `event_types` |  |
| `id` |  |
| `is_enabled` |  |
| `label_key` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` |  |
| `metadata` |  |
| `secret` |  |
| `subscription_id` |  |
| `target` |  |
| `updated_at` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/subscriptions/`

#### UserAuthentication

| Field | Description |
| --- | --- |
| `current_password` |  |
| `email` |  |
| `new_password` |  |
| `token` |  |

Operations: Create.

API path: `/api/v1/auth/begin-reset-password`

#### UserInvitation

| Field | Description |
| --- | --- |
| `email` |  |
| `role` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/invite`



## Entities


### Application

Create an instance: `var application = client.Application();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |
| `Remove(match)` | Remove the matching entity. |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `long` |  |
| `application_id` | `string` | Unique identifier of the application. |
| `application_name` | `string` |  |
| `consumption` | `Dictionary<string, object?>` | Current consumption metrics for this application. |
| `date` | `string` |  |
| `id` | `string` |  |
| `is_provisional` | `bool` |  |
| `name` | `string` | Name of the application. |
| `onboarding_steps` | `Dictionary<string, object?>` | Onboarding completion status for this application. |
| `organization_id` | `string` | UUID of the organization this application belongs to. |
| `quotas` | `Dictionary<string, object?>` | Quota limits for this application. |

#### Example: Load

```csharp
var application = client.Application().Load(new Dictionary<string, object?> { ["id"] = "application_id" });
```

#### Example: List

```csharp
var applicationList = client.Application().List(new Dictionary<string, object?> { ["organization_id"] = "example" });
```

#### Example: Create

```csharp
var application = client.Application().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
    ["organization_id"] = "example_organization_id",  // string
});
```


### ApplicationSecret

Create an instance: `var applicationSecret = client.ApplicationSecret();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Remove(match)` | Remove the matching entity. |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `deleted_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `token` | `string` |  |

#### Example: List

```csharp
var applicationSecretList = client.ApplicationSecret().List(new Dictionary<string, object?> { ["application_id"] = "example" });
```

#### Example: Create

```csharp
var applicationSecret = client.ApplicationSecret().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
});
```


### EmailPreference

Create an instance: `var emailPreference = client.EmailPreference();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Example: Create

```csharp
var emailPreference = client.EmailPreference().Create(new Dictionary<string, object?>
{
});
```


### Error

Create an instance: `var error = client.Error();`

#### Operations

| Method | Description |
| --- | --- |
| `List(null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `id` | `string` | Identifier of the problem that occurred, stable across releases |
| `status` | `long` |  |
| `title` | `string` |  |
| `type` | `string` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Dictionary<string, object?>` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

#### Example: List

```csharp
var errorList = client.Error().List(null);
```


### Event

Create an instance: `var event_ = client.Event();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `string` |  |
| `event_type_name` | `string` |  |
| `id` | `string` |  |
| `ip` | `string` |  |
| `labels` | `Dictionary<string, object?>` |  |
| `metadata` | `Dictionary<string, object?>` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |
| `received_at` | `string` |  |

#### Example: Load

```csharp
var event_ = client.Event().Load(new Dictionary<string, object?> { ["id"] = "event_id", ["application_id"] = "application_id" });
```

#### Example: List

```csharp
var event_List = client.Event().List(new Dictionary<string, object?> { ["application_id"] = "example" });
```

#### Example: Create

```csharp
var event_ = client.Event().Create(new Dictionary<string, object?>
{
    ["id"] = "example_id",  // string
});
```


### EventType

Create an instance: `var eventType = client.EventType();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |
| `Remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `event_type_name` | `string` |  |
| `id` | `string` |  |
| `resource_type` | `string` |  |
| `resource_type_name` | `string` |  |
| `service` | `string` |  |
| `service_name` | `string` |  |
| `verb` | `string` |  |
| `verb_name` | `string` |  |

#### Example: Load

```csharp
var eventType = client.EventType().Load(new Dictionary<string, object?> { ["id"] = "event_type_id", ["application_id"] = "application_id" });
```

#### Example: List

```csharp
var eventTypeList = client.EventType().List(new Dictionary<string, object?> { ["application_id"] = "example" });
```

#### Example: Create

```csharp
var eventType = client.EventType().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["resource_type"] = "example_resource_type",  // string
    ["service"] = "example_service",  // string
    ["verb"] = "example_verb",  // string
});
```


### EventsManagement

Create an instance: `var eventsManagement = client.EventsManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `List(null)` | List entities, optionally matching the given criteria. |

#### Example: List

```csharp
var eventsManagementList = client.EventsManagement().List(null);
```


### Health

Create an instance: `var health = client.Health();`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `bool` |  |
| `database_duration_ms` | `long` |  |
| `object_storage` | `bool` |  |
| `object_storage_duration_ms` | `long` |  |
| `pulsar` | `bool` |  |
| `pulsar_duration_ms` | `long` |  |
| `total_duration_ms` | `long` |  |

#### Example: Load

```csharp
var health = client.Health().Load(null);
```


### Hook0

Create an instance: `var hook0 = client.Hook0();`

#### Operations

| Method | Description |
| --- | --- |
| `List(null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `string` |  |
| `description` | `string` |  |
| `env_var` | `string` |  |
| `group` | `string` |  |
| `name` | `string` |  |
| `required` | `bool` |  |
| `sensitive` | `bool` |  |

#### Example: List

```csharp
var hook0List = client.Hook0().List(null);
```


### IngestedEvent

Create an instance: `var ingestedEvent = client.IngestedEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` | UUID of the application this event belongs to. |
| `event_id` | `string` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `string` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Dictionary<string, object?>` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Dictionary<string, object?>` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `string` | Timestamp when the event occurred. |
| `payload` | `string` | The event payload. |
| `payload_content_type` | `string` | Content type of the payload. |

#### Example: Create

```csharp
var ingestedEvent = client.IngestedEvent().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["event_type"] = "example_event_type",  // string
    ["labels"] = new Dictionary<string, object?>(),  // Dictionary<string, object?>
    ["occurred_at"] = "example_occurred_at",  // string
    ["payload"] = "example_payload",  // string
    ["payload_content_type"] = "example_payload_content_type",  // string
});
```


### Instance

Create an instance: `var instance = client.Instance();`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `string` |  |
| `cloudflare_turnstile_site_key` | `string` |  |
| `formbricks` | `Dictionary<string, object?>` |  |
| `matomo` | `Dictionary<string, object?>` |  |
| `password_minimum_length` | `long` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `string` |  |

#### Example: Load

```csharp
var instance = client.Instance().Load(null);
```


### Login

Create an instance: `var login = client.Login();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```csharp
var login = client.Login().Create(new Dictionary<string, object?>
{
    ["email"] = "example_email",  // string
    ["password"] = "example_password",  // string
    ["token"] = "example_token",  // string
});
```


### Organization

Create an instance: `var organization = client.Organization();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |
| `Remove(match)` | Remove the matching entity. |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `long` |  |
| `application_id` | `string` |  |
| `application_name` | `string` |  |
| `consumption` | `Dictionary<string, object?>` |  |
| `date` | `string` |  |
| `id` | `string` |  |
| `is_provisional` | `bool` |  |
| `name` | `string` |  |
| `onboarding_steps` | `Dictionary<string, object?>` |  |
| `organization_id` | `string` |  |
| `plan` | `Dictionary<string, object?>` |  |
| `quotas` | `Dictionary<string, object?>` |  |
| `role` | `string` |  |
| `users` | `List<object?>` |  |

#### Example: Load

```csharp
var organization = client.Organization().Load(new Dictionary<string, object?> { ["id"] = "organization_id" });
```

#### Example: List

```csharp
var organizationList = client.Organization().List(null);
```

#### Example: Create

```csharp
var organization = client.Organization().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
});
```


### OrganizationEditRole

Create an instance: `var organizationEditRole = client.OrganizationEditRole();`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `role` | `string` |  |
| `user_id` | `string` |  |


### Quota

Create an instance: `var quota = client.Quota();`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |
| `limits` | `Dictionary<string, object?>` |  |

#### Example: Load

```csharp
var quota = client.Quota().Load(null);
```


### Registration

Create an instance: `var registration = client.Registration();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `gclid` | `string` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `string` |  |
| `password` | `string` |  |
| `signup_channel` | `string` | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `string` |  |

#### Example: Create

```csharp
var registration = client.Registration().Create(new Dictionary<string, object?>
{
    ["email"] = "example_email",  // string
    ["first_name"] = "example_first_name",  // string
    ["last_name"] = "example_last_name",  // string
    ["password"] = "example_password",  // string
});
```


### RequestAttempt

Create an instance: `var requestAttempt = client.RequestAttempt();`

#### Operations

| Method | Description |
| --- | --- |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `delay_until` | `string` |  |
| `event` | `Dictionary<string, object?>` |  |
| `event_id` | `string` |  |
| `failed_at` | `string` |  |
| `http_response_status` | `long` |  |
| `id` | `string` |  |
| `picked_at` | `string` |  |
| `request_attempt_id` | `string` |  |
| `response_id` | `string` |  |
| `retry_count` | `long` |  |
| `status` | `Dictionary<string, object?>` | Status of a request attempt. |
| `subscription` | `Dictionary<string, object?>` |  |
| `succeeded_at` | `string` |  |

#### Example: Load

```csharp
var requestAttempt = client.RequestAttempt().Load(new Dictionary<string, object?> { ["id"] = "request_attempt_id", ["application_id"] = "application_id" });
```

#### Example: List

```csharp
var requestAttemptList = client.RequestAttempt().List(new Dictionary<string, object?> { ["application_id"] = "example" });
```


### Response

Create an instance: `var response = client.Response();`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `elapsed_time_ms` | `long` |  |
| `headers` | `Dictionary<string, object?>` |  |
| `http_code` | `long` |  |
| `id` | `string` |  |
| `response_error_name` | `string` |  |
| `response_id` | `string` |  |

#### Example: Load

```csharp
var response = client.Response().Load(new Dictionary<string, object?> { ["id"] = "response_id", ["application_id"] = "application_id" });
```


### Revoke

Create an instance: `var revoke = client.Revoke();`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `var serviceToken = client.ServiceToken();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |
| `Remove(match)` | Remove the matching entity. |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `token_id` | `string` |  |

#### Example: Load

```csharp
var serviceToken = client.ServiceToken().Load(new Dictionary<string, object?> { ["id"] = "service_token_id", ["organization_id"] = "organization_id" });
```

#### Example: List

```csharp
var serviceTokenList = client.ServiceToken().List(new Dictionary<string, object?> { ["organization_id"] = "example" });
```

#### Example: Create

```csharp
var serviceToken = client.ServiceToken().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
    ["organization_id"] = "example_organization_id",  // string
});
```


### Subscription

Create an instance: `var subscription = client.Subscription();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |
| `List(null)` | List entities, optionally matching the given criteria. |
| `Load(match)` | Load a single entity by match criteria. |
| `Remove(match)` | Remove the matching entity. |
| `Update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `dedicated_workers` | `List<object?>` |  |
| `description` | `string` |  |
| `event_types` | `List<object?>` |  |
| `id` | `string` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `string` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `string` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Dictionary<string, object?>` |  |
| `metadata` | `Dictionary<string, object?>` |  |
| `secret` | `string` |  |
| `subscription_id` | `string` |  |
| `target` | `Dictionary<string, object?>` |  |
| `updated_at` | `string` |  |

#### Example: Load

```csharp
var subscription = client.Subscription().Load(new Dictionary<string, object?> { ["id"] = "subscription_id" });
```

#### Example: List

```csharp
var subscriptionList = client.Subscription().List(new Dictionary<string, object?> { ["application_id"] = "example" });
```

#### Example: Create

```csharp
var subscription = client.Subscription().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["event_types"] = new List<object?>(),  // List<object?>
    ["is_enabled"] = true,  // bool
    ["target"] = new Dictionary<string, object?>(),  // Dictionary<string, object?>
});
```


### UserAuthentication

Create an instance: `var userAuthentication = client.UserAuthentication();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_password` | `string` |  |
| `email` | `string` |  |
| `new_password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```csharp
var userAuthentication = client.UserAuthentication().Create(new Dictionary<string, object?>
{
    ["current_password"] = "example_current_password",  // string
    ["email"] = "example_email",  // string
    ["new_password"] = "example_new_password",  // string
    ["token"] = "example_token",  // string
});
```


### UserInvitation

Create an instance: `var userInvitation = client.UserInvitation();`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```csharp
var userInvitation = client.UserInvitation().Create(new Dictionary<string, object?>
{
    ["organization_id"] = "example_organization_id",  // string
    ["email"] = "example_email",  // string
    ["role"] = "example_role",  // string
});
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dictionaries

The C# SDK uses a loose object model — `Dictionary<string, object?>`
throughout — rather than a bespoke typed class per endpoint. This mirrors
the dynamic nature of the API and keeps the SDK flexible: no regeneration is
needed when the API schema changes.

Use `Helpers.ToMapAny(value)` to safely coerce a value to a
`Dictionary<string, object?>`. A `Hook0Types.cs` module of
reference `record` types is also generated for editor documentation.

### Project structure

```
csharp/
├── Hook0SDK.csproj    -- Library project (compiles everything except test/)
├── core/                       -- Main SDK client, config, entity base, error type
├── entity/                     -- Entity implementations
├── feature/                    -- Built-in features (Base, Test, Log, ...)
├── utility/                    -- Utility functions and the vendored struct library
└── test/                       -- xUnit test suites
```

The main client class (`Hook0SDK`, namespace
`Hook0Sdk`) exposes the entity accessors. Reference entity or
utility types directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const response = client.Response()
await response.load({ id: "example_id", application_id: "example" })

// response.data() now returns the response data from the last `load`
// response.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
