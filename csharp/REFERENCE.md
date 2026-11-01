# Hook0 C# SDK Reference

Complete API reference for the Hook0 C# SDK.


## Hook0SDK

### Constructor

```csharp
using Hook0Sdk;
using Voxgig.Struct;

var client = new Hook0SDK(options);
```

Create a new SDK client instance. `options` is a
`Dictionary<string, object?>`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Dictionary` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `Dictionary` | Custom headers for all requests. |
| `options["feature"]` | `Dictionary` | Feature configuration. |
| `options["system"]` | `Dictionary` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK.TestSDK(testopts = null, sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```csharp
var client = Hook0SDK.TestSDK(null, null);
```


### Instance Methods

#### `Application(entopts = null)`

Create a new `Application` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `ApplicationSecret(entopts = null)`

Create a new `ApplicationSecret` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `EmailPreference(entopts = null)`

Create a new `EmailPreference` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Error(entopts = null)`

Create a new `Error` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Event(entopts = null)`

Create a new `Event` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `EventType(entopts = null)`

Create a new `EventType` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `EventsManagement(entopts = null)`

Create a new `EventsManagement` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Health(entopts = null)`

Create a new `Health` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Hook0(entopts = null)`

Create a new `Hook0` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `IngestedEvent(entopts = null)`

Create a new `IngestedEvent` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Instance(entopts = null)`

Create a new `Instance` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Login(entopts = null)`

Create a new `Login` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Organization(entopts = null)`

Create a new `Organization` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `OrganizationEditRole(entopts = null)`

Create a new `OrganizationEditRole` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Quota(entopts = null)`

Create a new `Quota` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Registration(entopts = null)`

Create a new `Registration` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `RequestAttempt(entopts = null)`

Create a new `RequestAttempt` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Response(entopts = null)`

Create a new `Response` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Revoke(entopts = null)`

Create a new `Revoke` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `ServiceToken(entopts = null)`

Create a new `ServiceToken` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `Subscription(entopts = null)`

Create a new `Subscription` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `UserAuthentication(entopts = null)`

Create a new `UserAuthentication` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `UserInvitation(entopts = null)`

Create a new `UserInvitation` entity instance (returns
`Hook0EntityBase`). Pass `null` for no initial options.

#### `OptionsMap() -> Dictionary`

Return a deep copy of the current SDK options.

#### `GetUtility() -> Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs = null) -> Dictionary`

Make a direct HTTP request to any API endpoint. Returns a result
`Dictionary<string, object?>` with `ok`, `status`, `headers`, and `data`
(or `err` on failure). This escape hatch never raises — branch on
`result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Dictionary` | Path parameter values. |
| `fetchargs["query"]` | `Dictionary` | Query string parameters. |
| `fetchargs["headers"]` | `Dictionary` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `object?` | Request body (dictionaries are JSON-serialized). |

**Returns:** `Dictionary<string, object?>`

#### `Prepare(fetchargs = null) -> Dictionary`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## Application

```csharp
var application = client.Application();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `long` | Yes |  |
| `application_id` | `string` | Yes | Unique identifier of the application. |
| `application_name` | `string` | Yes |  |
| `consumption` | `Dictionary<string, object?>` | Yes | Current consumption metrics for this application. |
| `date` | `string` | Yes |  |
| `id` | `string` | No |  |
| `is_provisional` | `bool` | Yes |  |
| `name` | `string` | Yes | Name of the application. |
| `onboarding_steps` | `Dictionary<string, object?>` | Yes | Onboarding completion status for this application. |
| `organization_id` | `string` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Dictionary<string, object?>` | Yes | Quota limits for this application. |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Application().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
    ["organization_id"] = "example_organization_id",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Application().List(new Dictionary<string, object?> { ["organization_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Application().Load(new Dictionary<string, object?> { ["id"] = "application_id" });
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.Application().Remove(new Dictionary<string, object?> { ["id"] = "application_id" });
```

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.Application().Update(new Dictionary<string, object?>
{
    ["id"] = "application_id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Application` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## ApplicationSecret

```csharp
var applicationSecret = client.ApplicationSecret();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.ApplicationSecret().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.ApplicationSecret().List(new Dictionary<string, object?> { ["application_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.ApplicationSecret().Remove(new Dictionary<string, object?> { ["id"] = "application_secret_id", ["application_id"] = "application_id" });
```

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.ApplicationSecret().Update(new Dictionary<string, object?>
{
    ["id"] = "application_secret_id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `ApplicationSecret` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## EmailPreference

```csharp
var emailPreference = client.EmailPreference();
```

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.EmailPreference().Create(new Dictionary<string, object?>
{
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `EmailPreference` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Error

```csharp
var error = client.Error();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | Yes |  |
| `id` | `string` | Yes | Identifier of the problem that occurred, stable across releases |
| `status` | `long` | Yes |  |
| `title` | `string` | Yes |  |
| `type` | `string` | Yes | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Dictionary<string, object?>` | No | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

### Operations

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Error().List(null)!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Error` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Event

```csharp
var event_ = client.Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `labels` | `Dictionary<string, object?>` | Yes |  |
| `metadata` | `Dictionary<string, object?>` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Event().Create(new Dictionary<string, object?>
{
    ["id"] = "example_id",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Event().List(new Dictionary<string, object?> { ["application_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Event().Load(new Dictionary<string, object?> { ["id"] = "event_id", ["application_id"] = "application_id" });
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Event` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## EventType

```csharp
var eventType = client.EventType();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `id` | `string` | No |  |
| `resource_type` | `string` | Yes |  |
| `resource_type_name` | `string` | Yes |  |
| `service` | `string` | Yes |  |
| `service_name` | `string` | Yes |  |
| `verb` | `string` | Yes |  |
| `verb_name` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.EventType().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["resource_type"] = "example_resource_type",  // string
    ["service"] = "example_service",  // string
    ["verb"] = "example_verb",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.EventType().List(new Dictionary<string, object?> { ["application_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.EventType().Load(new Dictionary<string, object?> { ["id"] = "event_type_id", ["application_id"] = "application_id" });
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.EventType().Remove(new Dictionary<string, object?> { ["id"] = "event_type_id", ["application_id"] = "application_id" });
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `EventType` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## EventsManagement

```csharp
var eventsManagement = client.EventsManagement();
```

### Operations

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.EventsManagement().List(null)!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `EventsManagement` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Health

```csharp
var health = client.Health();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `bool` | Yes |  |
| `database_duration_ms` | `long` | Yes |  |
| `object_storage` | `bool` | No |  |
| `object_storage_duration_ms` | `long` | No |  |
| `pulsar` | `bool` | No |  |
| `pulsar_duration_ms` | `long` | No |  |
| `total_duration_ms` | `long` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Health().Load(null);
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Health` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Hook0

```csharp
var hook0 = client.Hook0();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `string` | No |  |
| `description` | `string` | No |  |
| `env_var` | `string` | Yes |  |
| `group` | `string` | No |  |
| `name` | `string` | Yes |  |
| `required` | `bool` | Yes |  |
| `sensitive` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Hook0().List(null)!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Hook0` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## IngestedEvent

```csharp
var ingestedEvent = client.IngestedEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes | UUID of the application this event belongs to. |
| `event_id` | `string` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `string` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Dictionary<string, object?>` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Dictionary<string, object?>` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `string` | Yes | Timestamp when the event occurred. |
| `payload` | `string` | Yes | The event payload. |
| `payload_content_type` | `string` | Yes | Content type of the payload. |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.IngestedEvent().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["event_type"] = "example_event_type",  // string
    ["labels"] = new Dictionary<string, object?>(),  // Dictionary<string, object?>
    ["occurred_at"] = "example_occurred_at",  // string
    ["payload"] = "example_payload",  // string
    ["payload_content_type"] = "example_payload_content_type",  // string
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `IngestedEvent` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Instance

```csharp
var instance = client.Instance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `string` | Yes |  |
| `cloudflare_turnstile_site_key` | `string` | No |  |
| `formbricks` | `Dictionary<string, object?>` | Yes |  |
| `matomo` | `Dictionary<string, object?>` | Yes |  |
| `password_minimum_length` | `long` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Instance().Load(null);
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Instance` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Login

```csharp
var login = client.Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Login().Create(new Dictionary<string, object?>
{
    ["email"] = "example_email",  // string
    ["password"] = "example_password",  // string
    ["token"] = "example_token",  // string
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Login` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Organization

```csharp
var organization = client.Organization();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `long` | Yes |  |
| `application_id` | `string` | Yes |  |
| `application_name` | `string` | Yes |  |
| `consumption` | `Dictionary<string, object?>` | Yes |  |
| `date` | `string` | Yes |  |
| `id` | `string` | No |  |
| `is_provisional` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `Dictionary<string, object?>` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `Dictionary<string, object?>` | Yes |  |
| `quotas` | `Dictionary<string, object?>` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `List<object?>` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Organization().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Organization().List(null)!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Organization().Load(new Dictionary<string, object?> { ["id"] = "organization_id" });
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.Organization().Remove(new Dictionary<string, object?> { ["id"] = "organization_id" });
```

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.Organization().Update(new Dictionary<string, object?>
{
    ["id"] = "organization_id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Organization` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## OrganizationEditRole

```csharp
var organizationEditRole = client.OrganizationEditRole();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.OrganizationEditRole().Update(new Dictionary<string, object?>
{
    ["id"] = "id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `OrganizationEditRole` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Quota

```csharp
var quota = client.Quota();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | Yes |  |
| `limits` | `Dictionary<string, object?>` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Quota().Load(null);
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Quota` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Registration

```csharp
var registration = client.Registration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `gclid` | `string` | No | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `signup_channel` | `string` | No | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Registration().Create(new Dictionary<string, object?>
{
    ["email"] = "example_email",  // string
    ["first_name"] = "example_first_name",  // string
    ["last_name"] = "example_last_name",  // string
    ["password"] = "example_password",  // string
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Registration` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## RequestAttempt

```csharp
var requestAttempt = client.RequestAttempt();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `delay_until` | `string` | No |  |
| `event` | `Dictionary<string, object?>` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `long` | No |  |
| `id` | `string` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `long` | Yes |  |
| `status` | `Dictionary<string, object?>` | Yes | Status of a request attempt. |
| `subscription` | `Dictionary<string, object?>` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.RequestAttempt().List(new Dictionary<string, object?> { ["application_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.RequestAttempt().Load(new Dictionary<string, object?> { ["id"] = "request_attempt_id", ["application_id"] = "application_id" });
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `RequestAttempt` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Response

```csharp
var response = client.Response();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string` | No |  |
| `elapsed_time_ms` | `long` | No |  |
| `headers` | `Dictionary<string, object?>` | No |  |
| `http_code` | `long` | No |  |
| `id` | `string` | No |  |
| `response_error_name` | `string` | No |  |
| `response_id` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Response().Load(new Dictionary<string, object?> { ["id"] = "response_id", ["application_id"] = "application_id" });
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Response` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Revoke

```csharp
var revoke = client.Revoke();
```

### Operations

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.Revoke().Remove(new Dictionary<string, object?> { ["organization_id"] = "organization_id" });
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Revoke` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## ServiceToken

```csharp
var serviceToken = client.ServiceToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `token_id` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.ServiceToken().Create(new Dictionary<string, object?>
{
    ["name"] = "example_name",  // string
    ["organization_id"] = "example_organization_id",  // string
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.ServiceToken().List(new Dictionary<string, object?> { ["organization_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.ServiceToken().Load(new Dictionary<string, object?> { ["id"] = "service_token_id", ["organization_id"] = "organization_id" });
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.ServiceToken().Remove(new Dictionary<string, object?> { ["id"] = "service_token_id", ["organization_id"] = "organization_id" });
```

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.ServiceToken().Update(new Dictionary<string, object?>
{
    ["id"] = "service_token_id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `ServiceToken` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Subscription

```csharp
var subscription = client.Subscription();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dedicated_workers` | `List<object?>` | Yes |  |
| `description` | `string` | No |  |
| `event_types` | `List<object?>` | Yes |  |
| `id` | `string` | No |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `string` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `string` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Dictionary<string, object?>` | Yes |  |
| `metadata` | `Dictionary<string, object?>` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `Dictionary<string, object?>` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `application_id` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `dedicated_workers` | - | - | Yes | Yes | - |
| `description` | - | - | - | - | - |
| `event_types` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_enabled` | - | - | - | - | - |
| `label_key` | - | - | Yes | Yes | - |
| `label_value` | - | - | Yes | Yes | - |
| `labels` | - | - | Yes | Yes | - |
| `metadata` | - | - | Yes | Yes | - |
| `secret` | - | - | - | - | - |
| `subscription_id` | - | - | - | - | - |
| `target` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.Subscription().Create(new Dictionary<string, object?>
{
    ["application_id"] = "example_application_id",  // string
    ["event_types"] = new List<object?>(),  // List<object?>
    ["is_enabled"] = true,  // bool
    ["target"] = new Dictionary<string, object?>(),  // Dictionary<string, object?>
});
```

#### `List(reqmatch, ctrl = null) -> object?`

List entities matching the given criteria. The match is optional — call `List(null)` to list all records. Returns a list of entities, one per record, and raises on error.

```csharp
var results = (List<object?>)client.Subscription().List(new Dictionary<string, object?> { ["application_id"] = "example" })!;
foreach (var item in results)
{
    Console.WriteLine(StructUtils.Jsonify(((IEntity)item!).Data()));
}
```

#### `Load(reqmatch, ctrl = null) -> object?`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads, and raises on error.

```csharp
var result = client.Subscription().Load(new Dictionary<string, object?> { ["id"] = "subscription_id" });
```

#### `Remove(reqmatch, ctrl = null) -> object?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```csharp
var result = client.Subscription().Remove(new Dictionary<string, object?> { ["id"] = "subscription_id", ["application_id"] = "application_id" });
```

#### `Update(reqdata, ctrl = null) -> object?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```csharp
var result = client.Subscription().Update(new Dictionary<string, object?>
{
    ["id"] = "subscription_id",
    // Fields to update
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `Subscription` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## UserAuthentication

```csharp
var userAuthentication = client.UserAuthentication();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current_password` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `new_password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.UserAuthentication().Create(new Dictionary<string, object?>
{
    ["current_password"] = "example_current_password",  // string
    ["email"] = "example_email",  // string
    ["new_password"] = "example_new_password",  // string
    ["token"] = "example_token",  // string
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `UserAuthentication` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## UserInvitation

```csharp
var userInvitation = client.UserInvitation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl = null) -> object?`

Create a new entity with the given data. Returns the created entity and raises on error.

```csharp
var result = client.UserInvitation().Create(new Dictionary<string, object?>
{
    ["organization_id"] = "example_organization_id",  // string
    ["email"] = "example_email",  // string
    ["role"] = "example_role",  // string
});
```

### Common Methods

#### `Data(newdata = null) -> object?`

Get or set the entity data.

#### `Match(newmatch = null) -> object?`

Get or set the entity match criteria.

#### `Make() -> IEntity`

Create a new `UserInvitation` entity instance with the same options.

#### `GetName() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```csharp
var client = new Hook0SDK(new Dictionary<string, object?>
{
    ["feature"] = new Dictionary<string, object?>
    {
        ["debug"] = new Dictionary<string, object?> { ["active"] = true },
        ["idempotency"] = new Dictionary<string, object?> { ["active"] = true },
        ["metrics"] = new Dictionary<string, object?> { ["active"] = true },
        ["paging"] = new Dictionary<string, object?> { ["active"] = true },
        ["ratelimit"] = new Dictionary<string, object?> { ["active"] = true },
        ["retry"] = new Dictionary<string, object?> { ["active"] = true },
        ["secrets"] = new Dictionary<string, object?> { ["active"] = true },
        ["test"] = new Dictionary<string, object?> { ["active"] = true },
        ["timeout"] = new Dictionary<string, object?> { ["active"] = true },
    },
});
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

