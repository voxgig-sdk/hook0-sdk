# Hook0 Rust SDK Reference

Complete API reference for the Hook0 Rust SDK.


## Hook0SDK

### Constructor

```rust
use hook0_sdk::{jo, Hook0EntityBase, Hook0SDK, Entity, Value};

let client = Hook0SDK::new(options);
```

Create a new SDK client instance. `options` is a `Value` map
(`Value::Noval` for none).

**Parameters:**

| Key | Value type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL for API requests. |
| `prefix` | `string` | URL prefix appended after base. |
| `suffix` | `string` | URL suffix appended after path. |
| `headers` | `map` | Custom headers for all requests. |
| `feature` | `map` | Feature configuration. |
| `system` | `map` | System overrides. |


### Static Functions

#### `test_sdk(testopts: Value, sdkopts: Value) -> Rc<Hook0SDK>`

Create a test client with mock features active. Both arguments may be
`Value::Noval`.

```rust
use hook0_sdk::{test_sdk, Value};

let client = test_sdk(Value::Noval, Value::Noval);
```


### Instance Methods

#### `application(entopts: Value) -> Rc<ApplicationEntity>`

Create a new `ApplicationEntity` instance. Pass `Value::Noval` for no
initial options.

#### `application_secret(entopts: Value) -> Rc<ApplicationSecretEntity>`

Create a new `ApplicationSecretEntity` instance. Pass `Value::Noval` for no
initial options.

#### `email_preference(entopts: Value) -> Rc<EmailPreferenceEntity>`

Create a new `EmailPreferenceEntity` instance. Pass `Value::Noval` for no
initial options.

#### `error(entopts: Value) -> Rc<ErrorEntity>`

Create a new `ErrorEntity` instance. Pass `Value::Noval` for no
initial options.

#### `event(entopts: Value) -> Rc<EventEntity>`

Create a new `EventEntity` instance. Pass `Value::Noval` for no
initial options.

#### `event_type(entopts: Value) -> Rc<EventTypeEntity>`

Create a new `EventTypeEntity` instance. Pass `Value::Noval` for no
initial options.

#### `events_management(entopts: Value) -> Rc<EventsManagementEntity>`

Create a new `EventsManagementEntity` instance. Pass `Value::Noval` for no
initial options.

#### `health(entopts: Value) -> Rc<HealthEntity>`

Create a new `HealthEntity` instance. Pass `Value::Noval` for no
initial options.

#### `hook0(entopts: Value) -> Rc<Hook0Entity>`

Create a new `Hook0Entity` instance. Pass `Value::Noval` for no
initial options.

#### `ingested_event(entopts: Value) -> Rc<IngestedEventEntity>`

Create a new `IngestedEventEntity` instance. Pass `Value::Noval` for no
initial options.

#### `instance(entopts: Value) -> Rc<InstanceEntity>`

Create a new `InstanceEntity` instance. Pass `Value::Noval` for no
initial options.

#### `login(entopts: Value) -> Rc<LoginEntity>`

Create a new `LoginEntity` instance. Pass `Value::Noval` for no
initial options.

#### `organization(entopts: Value) -> Rc<OrganizationEntity>`

Create a new `OrganizationEntity` instance. Pass `Value::Noval` for no
initial options.

#### `organization_edit_role(entopts: Value) -> Rc<OrganizationEditRoleEntity>`

Create a new `OrganizationEditRoleEntity` instance. Pass `Value::Noval` for no
initial options.

#### `quota(entopts: Value) -> Rc<QuotaEntity>`

Create a new `QuotaEntity` instance. Pass `Value::Noval` for no
initial options.

#### `registration(entopts: Value) -> Rc<RegistrationEntity>`

Create a new `RegistrationEntity` instance. Pass `Value::Noval` for no
initial options.

#### `request_attempt(entopts: Value) -> Rc<RequestAttemptEntity>`

Create a new `RequestAttemptEntity` instance. Pass `Value::Noval` for no
initial options.

#### `response(entopts: Value) -> Rc<ResponseEntity>`

Create a new `ResponseEntity` instance. Pass `Value::Noval` for no
initial options.

#### `revoke(entopts: Value) -> Rc<RevokeEntity>`

Create a new `RevokeEntity` instance. Pass `Value::Noval` for no
initial options.

#### `service_token(entopts: Value) -> Rc<ServiceTokenEntity>`

Create a new `ServiceTokenEntity` instance. Pass `Value::Noval` for no
initial options.

#### `subscription(entopts: Value) -> Rc<SubscriptionEntity>`

Create a new `SubscriptionEntity` instance. Pass `Value::Noval` for no
initial options.

#### `user_authentication(entopts: Value) -> Rc<UserAuthenticationEntity>`

Create a new `UserAuthenticationEntity` instance. Pass `Value::Noval` for no
initial options.

#### `user_invitation(entopts: Value) -> Rc<UserInvitationEntity>`

Create a new `UserInvitationEntity` instance. Pass `Value::Noval` for no
initial options.

#### `options_map() -> Value`

Return a deep copy of the current SDK options.

#### `get_utility() -> Rc<Utility>`

Return a copy of the SDK utility object.

#### `direct(fetchargs: Value) -> Result<Value, Hook0Error>`

Make a direct HTTP request to any API endpoint. `Ok` is a result `Value::Map`
with `ok`, `status`, `headers`, and `data` (or `err` on failure). This
escape hatch resolves to `Ok` even on a non-2xx response — branch on
`getp(&result, "ok")`.

**Parameters (`fetchargs` map keys):**

| Key | Value type | Description |
| --- | --- | --- |
| `path` | `string` | URL path with optional `{param}` placeholders. |
| `method` | `string` | HTTP method (default: `"GET"`). |
| `params` | `map` | Path parameter values. |
| `query` | `map` | Query string parameters. |
| `headers` | `map` | Request headers (merged with defaults). |
| `body` | `any` | Request body (maps are JSON-serialized). |

#### `prepare(fetchargs: Value) -> Result<Value, Hook0Error>`

Prepare a fetch definition without sending. Returns the fetchdef on `Ok`.


---

## ApplicationEntity

```rust
let application = client.application(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `i64` | Yes |  |
| `application_id` | `String` | Yes | Unique identifier of the application. |
| `application_name` | `String` | Yes |  |
| `consumption` | `std::collections::HashMap<String, Value>` | Yes | Current consumption metrics for this application. |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `bool` | Yes |  |
| `name` | `String` | Yes | Name of the application. |
| `onboarding_steps` | `std::collections::HashMap<String, Value>` | Yes | Onboarding completion status for this application. |
| `organization_id` | `String` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `std::collections::HashMap<String, Value>` | Yes | Quota limits for this application. |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.application(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
    ("organization_id", Value::str("example_organization_id")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.application(Value::Noval).list(jo(vec![("organization_id", Value::str("example"))]), Value::Noval).unwrap();
for application in &results {
    println!("{:?}", application.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.application(Value::Noval).load(jo(vec![("id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.application(Value::Noval).remove(jo(vec![("id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.application(Value::Noval).update(jo(vec![
    ("id", Value::str("application_id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `ApplicationEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## ApplicationSecretEntity

```rust
let application_secret = client.application_secret(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `deleted_at` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.application_secret(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.application_secret(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for application_secret in &results {
    println!("{:?}", application_secret.data(None));
}
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.application_secret(Value::Noval).remove(jo(vec![("id", Value::str("application_secret_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.application_secret(Value::Noval).update(jo(vec![
    ("id", Value::str("application_secret_id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `ApplicationSecretEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## EmailPreferenceEntity

```rust
let email_preference = client.email_preference(Value::Noval);
```

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.email_preference(Value::Noval).create(jo(vec![
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `EmailPreferenceEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## ErrorEntity

```rust
let error = client.error(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | Yes |  |
| `id` | `String` | Yes | Identifier of the problem that occurred, stable across releases |
| `status` | `i64` | Yes |  |
| `title` | `String` | Yes |  |
| `type` | `String` | Yes | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `std::collections::HashMap<String, Value>` | No | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

### Operations

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.error(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for error in &results {
    println!("{:?}", error.data(None));
}
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `ErrorEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## EventEntity

```rust
let event = client.event(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `String` | Yes |  |
| `event_type_name` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `labels` | `std::collections::HashMap<String, Value>` | Yes |  |
| `metadata` | `std::collections::HashMap<String, Value>` | No |  |
| `occurred_at` | `String` | Yes |  |
| `payload` | `String` | Yes |  |
| `payload_content_type` | `String` | Yes |  |
| `received_at` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.event(Value::Noval).create(jo(vec![
    ("id", Value::str("example_id")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.event(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for event in &results {
    println!("{:?}", event.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.event(Value::Noval).load(jo(vec![("id", Value::str("event_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## EventTypeEntity

```rust
let event_type = client.event_type(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |
| `event_type_name` | `String` | Yes |  |
| `id` | `String` | No |  |
| `resource_type` | `String` | Yes |  |
| `resource_type_name` | `String` | Yes |  |
| `service` | `String` | Yes |  |
| `service_name` | `String` | Yes |  |
| `verb` | `String` | Yes |  |
| `verb_name` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.event_type(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("resource_type", Value::str("example_resource_type")),  // String
    ("service", Value::str("example_service")),  // String
    ("verb", Value::str("example_verb")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.event_type(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for event_type in &results {
    println!("{:?}", event_type.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.event_type(Value::Noval).load(jo(vec![("id", Value::str("event_type_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.event_type(Value::Noval).remove(jo(vec![("id", Value::str("event_type_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `EventTypeEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## EventsManagementEntity

```rust
let events_management = client.events_management(Value::Noval);
```

### Operations

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.events_management(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for events_management in &results {
    println!("{:?}", events_management.data(None));
}
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `EventsManagementEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## HealthEntity

```rust
let health = client.health(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `bool` | Yes |  |
| `database_duration_ms` | `i64` | Yes |  |
| `object_storage` | `bool` | No |  |
| `object_storage_duration_ms` | `i64` | No |  |
| `pulsar` | `bool` | No |  |
| `pulsar_duration_ms` | `i64` | No |  |
| `total_duration_ms` | `i64` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.health(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `HealthEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## Hook0Entity

```rust
let hook0 = client.hook0(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `String` | No |  |
| `description` | `String` | No |  |
| `env_var` | `String` | Yes |  |
| `group` | `String` | No |  |
| `name` | `String` | Yes |  |
| `required` | `bool` | Yes |  |
| `sensitive` | `bool` | Yes |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.hook0(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for hook0 in &results {
    println!("{:?}", hook0.data(None));
}
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `Hook0Entity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## IngestedEventEntity

```rust
let ingested_event = client.ingested_event(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes | UUID of the application this event belongs to. |
| `event_id` | `String` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `std::collections::HashMap<String, Value>` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `std::collections::HashMap<String, Value>` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String` | Yes | Timestamp when the event occurred. |
| `payload` | `String` | Yes | The event payload. |
| `payload_content_type` | `String` | Yes | Content type of the payload. |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.ingested_event(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("event_type", Value::str("example_event_type")),  // String
    ("labels", Value::empty_map()),  // std::collections::HashMap<String, Value>
    ("occurred_at", Value::str("example_occurred_at")),  // String
    ("payload", Value::str("example_payload")),  // String
    ("payload_content_type", Value::str("example_payload_content_type")),  // String
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `IngestedEventEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## InstanceEntity

```rust
let instance = client.instance(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `String` | Yes |  |
| `cloudflare_turnstile_site_key` | `String` | No |  |
| `formbricks` | `std::collections::HashMap<String, Value>` | Yes |  |
| `matomo` | `std::collections::HashMap<String, Value>` | Yes |  |
| `password_minimum_length` | `i64` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `String` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.instance(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `InstanceEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## LoginEntity

```rust
let login = client.login(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.login(Value::Noval).create(jo(vec![
    ("email", Value::str("example_email")),  // String
    ("password", Value::str("example_password")),  // String
    ("token", Value::str("example_token")),  // String
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `LoginEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## OrganizationEntity

```rust
let organization = client.organization(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `i64` | Yes |  |
| `application_id` | `String` | Yes |  |
| `application_name` | `String` | Yes |  |
| `consumption` | `std::collections::HashMap<String, Value>` | Yes |  |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `bool` | Yes |  |
| `name` | `String` | Yes |  |
| `onboarding_steps` | `std::collections::HashMap<String, Value>` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `plan` | `std::collections::HashMap<String, Value>` | Yes |  |
| `quotas` | `std::collections::HashMap<String, Value>` | Yes |  |
| `role` | `String` | Yes |  |
| `users` | `Vec<Value>` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.organization(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.organization(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for organization in &results {
    println!("{:?}", organization.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.organization(Value::Noval).load(jo(vec![("id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.organization(Value::Noval).remove(jo(vec![("id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.organization(Value::Noval).update(jo(vec![
    ("id", Value::str("organization_id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## OrganizationEditRoleEntity

```rust
let organization_edit_role = client.organization_edit_role(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `role` | `String` | Yes |  |
| `user_id` | `String` | Yes |  |

### Operations

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.organization_edit_role(Value::Noval).update(jo(vec![
    ("id", Value::str("id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `OrganizationEditRoleEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## QuotaEntity

```rust
let quota = client.quota(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | Yes |  |
| `limits` | `std::collections::HashMap<String, Value>` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.quota(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `QuotaEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## RegistrationEntity

```rust
let registration = client.registration(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `first_name` | `String` | Yes |  |
| `gclid` | `String` | No | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `signup_channel` | `String` | No | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `String` | No |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.registration(Value::Noval).create(jo(vec![
    ("email", Value::str("example_email")),  // String
    ("first_name", Value::str("example_first_name")),  // String
    ("last_name", Value::str("example_last_name")),  // String
    ("password", Value::str("example_password")),  // String
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `RegistrationEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## RequestAttemptEntity

```rust
let request_attempt = client.request_attempt(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `delay_until` | `String` | No |  |
| `event` | `std::collections::HashMap<String, Value>` | Yes |  |
| `event_id` | `String` | Yes |  |
| `failed_at` | `String` | No |  |
| `http_response_status` | `i64` | No |  |
| `id` | `String` | No |  |
| `picked_at` | `String` | No |  |
| `request_attempt_id` | `String` | Yes |  |
| `response_id` | `String` | No |  |
| `retry_count` | `i64` | Yes |  |
| `status` | `std::collections::HashMap<String, Value>` | Yes | Status of a request attempt. |
| `subscription` | `std::collections::HashMap<String, Value>` | Yes |  |
| `succeeded_at` | `String` | No |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.request_attempt(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for request_attempt in &results {
    println!("{:?}", request_attempt.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.request_attempt(Value::Noval).load(jo(vec![("id", Value::str("request_attempt_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `RequestAttemptEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## ResponseEntity

```rust
let response = client.response(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `String` | No |  |
| `elapsed_time_ms` | `i64` | No |  |
| `headers` | `std::collections::HashMap<String, Value>` | No |  |
| `http_code` | `i64` | No |  |
| `id` | `String` | No |  |
| `response_error_name` | `String` | No |  |
| `response_id` | `String` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.response(Value::Noval).load(jo(vec![("id", Value::str("response_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `ResponseEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## RevokeEntity

```rust
let revoke = client.revoke(Value::Noval);
```

### Operations

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.revoke(Value::Noval).remove(jo(vec![("organization_id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `RevokeEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## ServiceTokenEntity

```rust
let service_token = client.service_token(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `id` | `String` | No |  |
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `token_id` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.service_token(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
    ("organization_id", Value::str("example_organization_id")),  // String
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.service_token(Value::Noval).list(jo(vec![("organization_id", Value::str("example"))]), Value::Noval).unwrap();
for service_token in &results {
    println!("{:?}", service_token.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.service_token(Value::Noval).load(jo(vec![("id", Value::str("service_token_id")), ("organization_id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.service_token(Value::Noval).remove(jo(vec![("id", Value::str("service_token_id")), ("organization_id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.service_token(Value::Noval).update(jo(vec![
    ("id", Value::str("service_token_id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `ServiceTokenEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## SubscriptionEntity

```rust
let subscription = client.subscription(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dedicated_workers` | `Vec<Value>` | Yes |  |
| `description` | `String` | No |  |
| `event_types` | `Vec<Value>` | Yes |  |
| `id` | `String` | No |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `std::collections::HashMap<String, Value>` | Yes |  |
| `metadata` | `std::collections::HashMap<String, Value>` | Yes |  |
| `secret` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |
| `target` | `std::collections::HashMap<String, Value>` | Yes |  |
| `updated_at` | `String` | Yes |  |

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

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.subscription(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("event_types", Value::empty_list()),  // Vec<Value>
    ("is_enabled", Value::Bool(true)),  // bool
    ("target", Value::empty_map()),  // std::collections::HashMap<String, Value>
]), Value::Noval).unwrap();
```

#### `list(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>`

List entities matching the given criteria. The match is optional — pass `Value::Noval` to list all records. `Ok` is a `Vec` of entities, one per record.

```rust
let results = client.subscription(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for subscription in &results {
    println!("{:?}", subscription.data(None));
}
```

#### `load(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Load a single entity matching the given criteria. `Ok` is the entity, whose record `data(None)` reads, and `Err` a failure.

```rust
let result = client.subscription(Value::Noval).load(jo(vec![("id", Value::str("subscription_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `remove(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Remove the entity matching the given criteria. `Ok` is the entity, marked as deleted, and `Err` a failure.

```rust
let result = client.subscription(Value::Noval).remove(jo(vec![("id", Value::str("subscription_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", result.data(None));
```

#### `update(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Update an existing entity. The data must include the entity id. `Ok` is the updated entity.

```rust
let result = client.subscription(Value::Noval).update(jo(vec![
    ("id", Value::str("subscription_id")),
    // Fields to update
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `SubscriptionEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## UserAuthenticationEntity

```rust
let user_authentication = client.user_authentication(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current_password` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `new_password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.user_authentication(Value::Noval).create(jo(vec![
    ("current_password", Value::str("example_current_password")),  // String
    ("email", Value::str("example_email")),  // String
    ("new_password", Value::str("example_new_password")),  // String
    ("token", Value::str("example_token")),  // String
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `UserAuthenticationEntity` instance with the same options.

#### `get_name() -> String`

Return the entity name.


---

## UserInvitationEntity

```rust
let user_invitation = client.user_invitation(Value::Noval);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `role` | `String` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>`

Create a new entity with the given data. `Ok` is the created entity, and `Err` a failure.

```rust
let result = client.user_invitation(Value::Noval).create(jo(vec![
    ("organization_id", Value::str("example_organization_id")),  // String
    ("email", Value::str("example_email")),  // String
    ("role", Value::str("example_role")),  // String
]), Value::Noval).unwrap();
```

### Common Methods

#### `data(args: Option<&Value>) -> Value`

Get the entity data. Pass `Some(&map)` to set it.

#### `matchv(args: Option<&Value>) -> Value`

Get the entity match criteria. Pass `Some(&map)` to set it.

#### `make() -> Rc<dyn Entity>`

Create a new `UserInvitationEntity` instance with the same options.

#### `get_name() -> String`

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

```rust
let client = Hook0SDK::new(jo(vec![
    ("feature", jo(vec![
        ("debug", jo(vec![("active", Value::Bool(true))])),
        ("idempotency", jo(vec![("active", Value::Bool(true))])),
        ("metrics", jo(vec![("active", Value::Bool(true))])),
        ("paging", jo(vec![("active", Value::Bool(true))])),
        ("ratelimit", jo(vec![("active", Value::Bool(true))])),
        ("retry", jo(vec![("active", Value::Bool(true))])),
        ("secrets", jo(vec![("active", Value::Bool(true))])),
        ("test", jo(vec![("active", Value::Bool(true))])),
        ("timeout", jo(vec![("active", Value::Bool(true))])),
    ])),
]));
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

