# Hook0 Golang SDK Reference

Complete API reference for the Hook0 Golang SDK.


## Hook0SDK

### Constructor

```go
func NewHook0SDK(options map[string]any) *Hook0SDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *Hook0SDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *Hook0SDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Application(data map[string]any) Hook0Entity`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationSecret(data map[string]any) Hook0Entity`

Create a new `ApplicationSecret` entity instance. Pass `nil` for no initial data.

#### `ApplicationsManagement(data map[string]any) Hook0Entity`

Create a new `ApplicationsManagement` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) Hook0Entity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `EventType(data map[string]any) Hook0Entity`

Create a new `EventType` entity instance. Pass `nil` for no initial data.

#### `EventsManagement(data map[string]any) Hook0Entity`

Create a new `EventsManagement` entity instance. Pass `nil` for no initial data.

#### `EventsPerDayEntry(data map[string]any) Hook0Entity`

Create a new `EventsPerDayEntry` entity instance. Pass `nil` for no initial data.

#### `Health(data map[string]any) Hook0Entity`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Hook0(data map[string]any) Hook0Entity`

Create a new `Hook0` entity instance. Pass `nil` for no initial data.

#### `IngestedEvent(data map[string]any) Hook0Entity`

Create a new `IngestedEvent` entity instance. Pass `nil` for no initial data.

#### `Instance(data map[string]any) Hook0Entity`

Create a new `Instance` entity instance. Pass `nil` for no initial data.

#### `Login(data map[string]any) Hook0Entity`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Organization(data map[string]any) Hook0Entity`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationEditRole(data map[string]any) Hook0Entity`

Create a new `OrganizationEditRole` entity instance. Pass `nil` for no initial data.

#### `Problem(data map[string]any) Hook0Entity`

Create a new `Problem` entity instance. Pass `nil` for no initial data.

#### `Quota(data map[string]any) Hook0Entity`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `Registration(data map[string]any) Hook0Entity`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `RequestAttempt(data map[string]any) Hook0Entity`

Create a new `RequestAttempt` entity instance. Pass `nil` for no initial data.

#### `Response(data map[string]any) Hook0Entity`

Create a new `Response` entity instance. Pass `nil` for no initial data.

#### `Revoke(data map[string]any) Hook0Entity`

Create a new `Revoke` entity instance. Pass `nil` for no initial data.

#### `ServiceToken(data map[string]any) Hook0Entity`

Create a new `ServiceToken` entity instance. Pass `nil` for no initial data.

#### `Subscription(data map[string]any) Hook0Entity`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `UserAuthentication(data map[string]any) Hook0Entity`

Create a new `UserAuthentication` entity instance. Pass `nil` for no initial data.

#### `UserInvitation(data map[string]any) Hook0Entity`

Create a new `UserInvitation` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ApplicationEntity

```go
application := client.Application(nil)
fmt.Println(application.GetName()) // "application"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `consumption` | `map[string]any` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `map[string]any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `quotas` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Application(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Application(nil).Load(map[string]any{"id": "application_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Application(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "consumption": map[string]any{},
    "name": "example_name",
    "onboarding_steps": map[string]any{},
    "organization_id": "example_organization_id",
    "quotas": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Application(nil).Update(map[string]any{
    "id": "application_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Application(nil).Remove(map[string]any{"id": "application_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ApplicationSecretEntity

```go
applicationSecret := client.ApplicationSecret(nil)
fmt.Println(applicationSecret.GetName()) // "application_secret"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | No |  |
| `name` | `string` | No |  |
| `token` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ApplicationSecret(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ApplicationSecret(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "created_at": "example_created_at",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ApplicationSecret(nil).Update(map[string]any{
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationSecretEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ApplicationsManagementEntity

```go
applicationsManagement := client.ApplicationsManagement(nil)
fmt.Println(applicationsManagement.GetName()) // "applications_management"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ApplicationsManagement(nil).Remove(map[string]any{"application_secret_token": "application_secret_token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationsManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `labels` | `map[string]any` | Yes |  |
| `metadata` | `map[string]any` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Event(nil).Load(map[string]any{"id": "event_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventTypeEntity

```go
eventType := client.EventType(nil)
fmt.Println(eventType.GetName()) // "event_type"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `resource_type` | `string` | Yes |  |
| `resource_type_name` | `string` | Yes |  |
| `service` | `string` | Yes |  |
| `service_name` | `string` | Yes |  |
| `verb` | `string` | Yes |  |
| `verb_name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EventType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EventType(nil).Load(map[string]any{"id": "event_type_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.EventType(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "event_type_name": "example_event_type_name",
    "resource_type": "example_resource_type",
    "resource_type_name": "example_resource_type_name",
    "service": "example_service",
    "service_name": "example_service_name",
    "verb": "example_verb",
    "verb_name": "example_verb_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventsManagementEntity

```go
eventsManagement := client.EventsManagement(nil)
fmt.Println(eventsManagement.GetName()) // "events_management"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EventsManagement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.EventsManagement(nil).Create(map[string]any{
    "event_id": "example_event_id",
    "application_id": "example_application_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.EventsManagement(nil).Remove(map[string]any{"event_type_name": "event_type_name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventsManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventsPerDayEntryEntity

```go
eventsPerDayEntry := client.EventsPerDayEntry(nil)
fmt.Println(eventsPerDayEntry.GetName()) // "events_per_day_entry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `int` | Yes |  |
| `application_id` | `string` | Yes |  |
| `application_name` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `is_provisional` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EventsPerDayEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventsPerDayEntryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HealthEntity

```go
health := client.Health(nil)
fmt.Println(health.GetName()) // "health"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `bool` | Yes |  |
| `database_duration_ms` | `int` | Yes |  |
| `object_storage` | `bool` | No |  |
| `object_storage_duration_ms` | `int` | No |  |
| `pulsar` | `bool` | No |  |
| `pulsar_duration_ms` | `int` | No |  |
| `total_duration_ms` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Health(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Hook0Entity

```go
hook0 := client.Hook0(nil)
fmt.Println(hook0.GetName()) // "hook0"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Hook0(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `Hook0Entity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IngestedEventEntity

```go
ingestedEvent := client.IngestedEvent(nil)
fmt.Println(ingestedEvent.GetName()) // "ingested_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_id` | `string` | No |  |
| `event_type` | `string` | Yes |  |
| `labels` | `map[string]any` | Yes |  |
| `metadata` | `map[string]any` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.IngestedEvent(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "event_type": "example_event_type",
    "labels": map[string]any{},
    "occurred_at": "example_occurred_at",
    "payload": "example_payload",
    "payload_content_type": "example_payload_content_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IngestedEventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InstanceEntity

```go
instance := client.Instance(nil)
fmt.Println(instance.GetName()) // "instance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `string` | Yes |  |
| `cloudflare_turnstile_site_key` | `string` | No |  |
| `formbricks` | `map[string]any` | Yes |  |
| `matomo` | `map[string]any` | Yes |  |
| `password_minimum_length` | `int` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Instance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InstanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LoginEntity

```go
login := client.Login(nil)
fmt.Println(login.GetName()) // "login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OrganizationEntity

```go
organization := client.Organization(nil)
fmt.Println(organization.GetName()) // "organization"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `map[string]any` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `map[string]any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `map[string]any` | Yes |  |
| `quotas` | `map[string]any` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Organization(nil).Create(map[string]any{
    "consumption": map[string]any{},
    "name": "example_name",
    "onboarding_steps": map[string]any{},
    "organization_id": "example_organization_id",
    "plan": map[string]any{},
    "quotas": map[string]any{},
    "role": "example_role",
    "users": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Organization(nil).Update(map[string]any{
    "id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Organization(nil).Remove(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OrganizationEditRoleEntity

```go
organizationEditRole := client.OrganizationEditRole(nil)
fmt.Println(organizationEditRole.GetName()) // "organization_edit_role"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.OrganizationEditRole(nil).Update(map[string]any{
    "id": "id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationEditRoleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ProblemEntity

```go
problem := client.Problem(nil)
fmt.Println(problem.GetName()) // "problem"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `int` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Problem(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProblemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QuotaEntity

```go
quota := client.Quota(nil)
fmt.Println(quota.GetName()) // "quota"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `global_applications_per_organization_limit` | `int` | Yes |  |
| `global_days_of_events_retention_limit` | `int` | Yes |  |
| `global_event_types_per_application_limit` | `int` | Yes |  |
| `global_events_per_day_limit` | `int` | Yes |  |
| `global_members_per_organization_limit` | `int` | Yes |  |
| `global_subscriptions_per_application_limit` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Quota(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegistrationEntity

```go
registration := client.Registration(nil)
fmt.Println(registration.GetName()) // "registration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `gclid` | `string` | No |  |
| `last_name` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `turnstile_token` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Registration(nil).Create(map[string]any{
    "email": "example_email",
    "first_name": "example_first_name",
    "last_name": "example_last_name",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RequestAttemptEntity

```go
requestAttempt := client.RequestAttempt(nil)
fmt.Println(requestAttempt.GetName()) // "request_attempt"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `delay_until` | `string` | No |  |
| `event` | `map[string]any` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `int` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `int` | Yes |  |
| `status` | `map[string]any` | Yes |  |
| `subscription` | `map[string]any` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RequestAttempt(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RequestAttempt(nil).Load(map[string]any{"id": "request_attempt_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RequestAttemptEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResponseEntity

```go
response := client.Response(nil)
fmt.Println(response.GetName()) // "response"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Response(nil).Load(map[string]any{"id": "response_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RevokeEntity

```go
revoke := client.Revoke(nil)
fmt.Println(revoke.GetName()) // "revoke"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Revoke(nil).Remove(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RevokeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ServiceTokenEntity

```go
serviceToken := client.ServiceToken(nil)
fmt.Println(serviceToken.GetName()) // "service_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `token_id` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ServiceToken(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ServiceToken(nil).Load(map[string]any{"id": "service_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ServiceToken(nil).Create(map[string]any{
    "biscuit": "example_biscuit",
    "created_at": "example_created_at",
    "name": "example_name",
    "organization_id": "example_organization_id",
    "token_id": "example_token_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ServiceToken(nil).Update(map[string]any{
    "id": "service_token_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ServiceToken(nil).Remove(map[string]any{"id": "service_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ServiceTokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SubscriptionEntity

```go
subscription := client.Subscription(nil)
fmt.Println(subscription.GetName()) // "subscription"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dedicated_workers` | `[]any` | Yes |  |
| `description` | `string` | No |  |
| `event_types` | `[]any` | Yes |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `string` | Yes |  |
| `label_value` | `string` | Yes |  |
| `labels` | `map[string]any` | Yes |  |
| `metadata` | `map[string]any` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `map[string]any` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `application_id` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `dedicated_workers` | - | - | Yes | Yes | - |
| `description` | - | - | - | - | - |
| `event_types` | - | - | - | - | - |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Subscription(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Subscription(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "created_at": "example_created_at",
    "dedicated_workers": []any{},
    "event_types": []any{},
    "is_enabled": true,
    "label_key": "example_label_key",
    "label_value": "example_label_value",
    "labels": map[string]any{},
    "metadata": map[string]any{},
    "secret": "example_secret",
    "subscription_id": "example_subscription_id",
    "target": map[string]any{},
    "updated_at": "example_updated_at",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Subscription(nil).Update(map[string]any{
    "id": "subscription_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Subscription(nil).Remove(map[string]any{"id": "subscription_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserAuthenticationEntity

```go
userAuthentication := client.UserAuthentication(nil)
fmt.Println(userAuthentication.GetName()) // "user_authentication"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `new_password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.UserAuthentication(nil).Create(map[string]any{
    "email": "example_email",
    "new_password": "example_new_password",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserAuthenticationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserInvitationEntity

```go
userInvitation := client.UserInvitation(nil)
fmt.Println(userInvitation.GetName()) // "user_invitation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.UserInvitation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserInvitationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewHook0SDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

