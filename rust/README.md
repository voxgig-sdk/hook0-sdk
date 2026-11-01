# Hook0 Rust SDK



The Rust SDK for the Hook0 API — an entity-oriented client following idiomatic Rust conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.application(Value::Noval)` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This crate is not yet published to crates.io. Depend on it from the GitHub
release tag (`rust/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hook0-sdk/tags)) or
from a source checkout by adding it to your `Cargo.toml`:

```toml
[dependencies]
# From a source checkout:
voxgig-hook0-sdk = { path = "../rust" }

# Or from the git release tag:
# voxgig-hook0-sdk = { git = "<repo-url>", tag = "rust/vX.Y.Z" }
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```rust
use hook0_sdk::{getp, jo, Hook0EntityBase, Hook0SDK, Entity, Value};

let client = Hook0SDK::new(jo(vec![
    ("apikey", Value::str(std::env::var("HOOK0_APIKEY").unwrap_or_default())),
]));
```

### 2. List application records

`list()` returns one entity per record, and `Err` on failure — match on
the `Result`. `data(None)` reads an entity's record.

```rust
match client.application(Value::Noval).list(jo(vec![("organization_id", Value::str("example"))]), Value::Noval) {
    Ok(applications) => {
        for application in &applications {
            println!("{:?}", application.data(None));
        }
    }
    Err(err) => eprintln!("list failed: {}", err),
}
```

### 3. Load an application

`load()` returns the entity, and `Err` on failure; `data(None)` reads its
record.

```rust
match client.application(Value::Noval).load(jo(vec![("id", Value::str("example_id"))]), Value::Noval) {
    Ok(application) => println!("{:?}", application.data(None)),
    Err(err) => eprintln!("load failed: {}", err),
}
```

### 4. Create, update, and remove

```rust
// Create — returns the created entity
let created = client.application(Value::Noval).create(jo(vec![("name", Value::str("example_name")), ("organization_id", Value::str("example_organization_id"))]), Value::Noval).unwrap();

// Update
client.application(Value::Noval).update(jo(vec![("id", getp(&created.data(None), "id")), ("name", Value::str("example_name")), ("organization_id", Value::str("example_organization_id"))]), Value::Noval).unwrap();

// Remove
client.application(Value::Noval).remove(jo(vec![("id", getp(&created.data(None), "id"))]), Value::Noval).unwrap();
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

```rust
let result = client.direct(jo(vec![
    ("path", Value::str("/api/resource/{id}")),
    ("method", Value::str("GET")),
    ("params", jo(vec![("id", Value::str("example"))])),
])).unwrap();

if getp(&result, "ok") == Value::Bool(true) {
    println!("{:?}", getp(&result, "status"));  // 200
    println!("{:?}", getp(&result, "data"));    // response body
} else {
    // A non-2xx response carries status + data (the error body); a
    // transport-level failure carries err instead. Only one is present.
    println!("{:?} {:?}", getp(&result, "status"), getp(&result, "err"));
}
```

### Prepare a request without sending it

```rust
// prepare() returns the fetch definition on Ok and Err on failure.
let fetchdef = client.prepare(jo(vec![
    ("path", Value::str("/api/resource/{id}")),
    ("method", Value::str("DELETE")),
    ("params", jo(vec![("id", Value::str("example"))])),
])).unwrap();

println!("{:?}", getp(&fetchdef, "url"));
println!("{:?}", getp(&fetchdef, "method"));
println!("{:?}", getp(&fetchdef, "headers"));
```

### Use test mode

Create a mock client for unit testing — no server required:

```rust
use hook0_sdk::{jo, test_sdk, Hook0EntityBase, Entity, Value};

let client = test_sdk(Value::Noval, Value::Noval);

// Entity ops return the entity on Ok and Err on failure.
let response = client.response(Value::Noval).load(jo(vec![("id", Value::str("test01")), ("application_id", Value::str("example"))]), Value::Noval).unwrap();
// response.data(None) is the mock response record
```

### Point at a different server

Override the base URL to reach a local or staging server:

```rust
let client = Hook0SDK::new(jo(vec![
    ("base", Value::str("http://localhost:8080")),
]));
```

### Run live tests

Create a `.env.local` file at the crate root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd rust && cargo test
```


## Reference

### Hook0SDK

```rust
use hook0_sdk::{Hook0SDK, Value};

let client = Hook0SDK::new(options);
```

Creates a new SDK client. `options` is a `Value` map (`Value::Noval` for
none) carrying any of the following keys:

| Option | Value type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `map` | Feature activation flags. |
| `system` | `map` | System overrides (e.g. a custom fetcher). |

### test_sdk

```rust
use hook0_sdk::{test_sdk, Value};

let client = test_sdk(testopts, sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be
`Value::Noval`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Value` | Deep copy of the current SDK options. |
| `get_utility` | `() -> Rc<Utility>` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs: Value) -> Result<Value, Hook0Error>` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs: Value) -> Result<Value, Hook0Error>` | Build and send an HTTP request. `Ok` is a result map (branch on `ok`). |
| `application` | `(entopts: Value) -> Rc<ApplicationEntity>` | Create an Application entity instance. |
| `application_secret` | `(entopts: Value) -> Rc<ApplicationSecretEntity>` | Create an ApplicationSecret entity instance. |
| `email_preference` | `(entopts: Value) -> Rc<EmailPreferenceEntity>` | Create an EmailPreference entity instance. |
| `error` | `(entopts: Value) -> Rc<ErrorEntity>` | Create an Error entity instance. |
| `event` | `(entopts: Value) -> Rc<EventEntity>` | Create an Event entity instance. |
| `event_type` | `(entopts: Value) -> Rc<EventTypeEntity>` | Create an EventType entity instance. |
| `events_management` | `(entopts: Value) -> Rc<EventsManagementEntity>` | Create an EventsManagement entity instance. |
| `health` | `(entopts: Value) -> Rc<HealthEntity>` | Create a Health entity instance. |
| `hook0` | `(entopts: Value) -> Rc<Hook0Entity>` | Create a Hook0 entity instance. |
| `ingested_event` | `(entopts: Value) -> Rc<IngestedEventEntity>` | Create an IngestedEvent entity instance. |
| `instance` | `(entopts: Value) -> Rc<InstanceEntity>` | Create an Instance entity instance. |
| `login` | `(entopts: Value) -> Rc<LoginEntity>` | Create a Login entity instance. |
| `organization` | `(entopts: Value) -> Rc<OrganizationEntity>` | Create an Organization entity instance. |
| `organization_edit_role` | `(entopts: Value) -> Rc<OrganizationEditRoleEntity>` | Create an OrganizationEditRole entity instance. |
| `quota` | `(entopts: Value) -> Rc<QuotaEntity>` | Create a Quota entity instance. |
| `registration` | `(entopts: Value) -> Rc<RegistrationEntity>` | Create a Registration entity instance. |
| `request_attempt` | `(entopts: Value) -> Rc<RequestAttemptEntity>` | Create a RequestAttempt entity instance. |
| `response` | `(entopts: Value) -> Rc<ResponseEntity>` | Create a Response entity instance. |
| `revoke` | `(entopts: Value) -> Rc<RevokeEntity>` | Create a Revoke entity instance. |
| `service_token` | `(entopts: Value) -> Rc<ServiceTokenEntity>` | Create a ServiceToken entity instance. |
| `subscription` | `(entopts: Value) -> Rc<SubscriptionEntity>` | Create a Subscription entity instance. |
| `user_authentication` | `(entopts: Value) -> Rc<UserAuthenticationEntity>` | Create an UserAuthentication entity instance. |
| `user_invitation` | `(entopts: Value) -> Rc<UserInvitationEntity>` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>` | Load a single entity by match criteria. |
| `list` | `(reqmatch: Value, ctrl: Value) -> Result<Vec<Rc<Self>>, Hook0Error>` | List entities matching the criteria, one per record. |
| `create` | `(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>` | Create a new entity. |
| `update` | `(reqdata: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>` | Update an existing entity. |
| `remove` | `(reqmatch: Value, ctrl: Value) -> Result<Rc<Self>, Hook0Error>` | Remove an entity, which is returned marked as deleted. |
| `data` | `(args: Option<&Value>) -> Value` | Get entity data (pass `Some(&map)` to set). |
| `matchv` | `(args: Option<&Value>) -> Value` | Get entity match criteria (pass `Some(&map)` to set). |
| `make` | `() -> Rc<dyn Entity>` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity on `Ok`, and `list` a `Vec` of
entities, one per record; `data(None)` reads an entity's record. `Err` is
the branded error. The operations are methods of the
`Hook0EntityBase` trait and `data` of the `Entity` trait, so
import both.

The `direct()` escape hatch resolves to `Ok` even on a non-2xx response —
it returns a result `Value::Map` you branch on via `getp(&result, "ok")`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `map` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` carries the error value.

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

Create an instance: `let application = client.application(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `i64` |  |
| `application_id` | `String` | Unique identifier of the application. |
| `application_name` | `String` |  |
| `consumption` | `std::collections::HashMap<String, Value>` | Current consumption metrics for this application. |
| `date` | `String` |  |
| `id` | `String` |  |
| `is_provisional` | `bool` |  |
| `name` | `String` | Name of the application. |
| `onboarding_steps` | `std::collections::HashMap<String, Value>` | Onboarding completion status for this application. |
| `organization_id` | `String` | UUID of the organization this application belongs to. |
| `quotas` | `std::collections::HashMap<String, Value>` | Quota limits for this application. |

#### Example: Load

```rust
let application = client.application(Value::Noval).load(jo(vec![("id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", application.data(None));
```

#### Example: List

```rust
let applications = client.application(Value::Noval).list(jo(vec![("organization_id", Value::str("example"))]), Value::Noval).unwrap();
for application in &applications {
    println!("{:?}", application.data(None));
}
```

#### Example: Create

```rust
let application = client.application(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
    ("organization_id", Value::str("example_organization_id")),  // String
]), Value::Noval).unwrap();
```


### ApplicationSecret

Create an instance: `let application_secret = client.application_secret(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `created_at` | `String` |  |
| `deleted_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `token` | `String` |  |

#### Example: List

```rust
let application_secrets = client.application_secret(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for application_secret in &application_secrets {
    println!("{:?}", application_secret.data(None));
}
```

#### Example: Create

```rust
let application_secret = client.application_secret(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
]), Value::Noval).unwrap();
```


### EmailPreference

Create an instance: `let email_preference = client.email_preference(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Example: Create

```rust
let email_preference = client.email_preference(Value::Noval).create(jo(vec![
]), Value::Noval).unwrap();
```


### Error

Create an instance: `let error = client.error(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `String` |  |
| `id` | `String` | Identifier of the problem that occurred, stable across releases |
| `status` | `i64` |  |
| `title` | `String` |  |
| `type` | `String` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `std::collections::HashMap<String, Value>` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

#### Example: List

```rust
let errors = client.error(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for error in &errors {
    println!("{:?}", error.data(None));
}
```


### Event

Create an instance: `let event = client.event(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `String` |  |
| `event_type_name` | `String` |  |
| `id` | `String` |  |
| `ip` | `String` |  |
| `labels` | `std::collections::HashMap<String, Value>` |  |
| `metadata` | `std::collections::HashMap<String, Value>` |  |
| `occurred_at` | `String` |  |
| `payload` | `String` |  |
| `payload_content_type` | `String` |  |
| `received_at` | `String` |  |

#### Example: Load

```rust
let event = client.event(Value::Noval).load(jo(vec![("id", Value::str("event_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", event.data(None));
```

#### Example: List

```rust
let events = client.event(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for event in &events {
    println!("{:?}", event.data(None));
}
```

#### Example: Create

```rust
let event = client.event(Value::Noval).create(jo(vec![
    ("id", Value::str("example_id")),  // String
]), Value::Noval).unwrap();
```


### EventType

Create an instance: `let event_type = client.event_type(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `event_type_name` | `String` |  |
| `id` | `String` |  |
| `resource_type` | `String` |  |
| `resource_type_name` | `String` |  |
| `service` | `String` |  |
| `service_name` | `String` |  |
| `verb` | `String` |  |
| `verb_name` | `String` |  |

#### Example: Load

```rust
let event_type = client.event_type(Value::Noval).load(jo(vec![("id", Value::str("event_type_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", event_type.data(None));
```

#### Example: List

```rust
let event_types = client.event_type(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for event_type in &event_types {
    println!("{:?}", event_type.data(None));
}
```

#### Example: Create

```rust
let event_type = client.event_type(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("resource_type", Value::str("example_resource_type")),  // String
    ("service", Value::str("example_service")),  // String
    ("verb", Value::str("example_verb")),  // String
]), Value::Noval).unwrap();
```


### EventsManagement

Create an instance: `let events_management = client.events_management(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |

#### Example: List

```rust
let events_managements = client.events_management(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for events_management in &events_managements {
    println!("{:?}", events_management.data(None));
}
```


### Health

Create an instance: `let health = client.health(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `bool` |  |
| `database_duration_ms` | `i64` |  |
| `object_storage` | `bool` |  |
| `object_storage_duration_ms` | `i64` |  |
| `pulsar` | `bool` |  |
| `pulsar_duration_ms` | `i64` |  |
| `total_duration_ms` | `i64` |  |

#### Example: Load

```rust
let health = client.health(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", health.data(None));
```


### Hook0

Create an instance: `let hook0 = client.hook0(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `String` |  |
| `description` | `String` |  |
| `env_var` | `String` |  |
| `group` | `String` |  |
| `name` | `String` |  |
| `required` | `bool` |  |
| `sensitive` | `bool` |  |

#### Example: List

```rust
let hook0s = client.hook0(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for hook0 in &hook0s {
    println!("{:?}", hook0.data(None));
}
```


### IngestedEvent

Create an instance: `let ingested_event = client.ingested_event(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` | UUID of the application this event belongs to. |
| `event_id` | `String` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `std::collections::HashMap<String, Value>` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `std::collections::HashMap<String, Value>` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String` | Timestamp when the event occurred. |
| `payload` | `String` | The event payload. |
| `payload_content_type` | `String` | Content type of the payload. |

#### Example: Create

```rust
let ingested_event = client.ingested_event(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("event_type", Value::str("example_event_type")),  // String
    ("labels", Value::empty_map()),  // std::collections::HashMap<String, Value>
    ("occurred_at", Value::str("example_occurred_at")),  // String
    ("payload", Value::str("example_payload")),  // String
    ("payload_content_type", Value::str("example_payload_content_type")),  // String
]), Value::Noval).unwrap();
```


### Instance

Create an instance: `let instance = client.instance(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `String` |  |
| `cloudflare_turnstile_site_key` | `String` |  |
| `formbricks` | `std::collections::HashMap<String, Value>` |  |
| `matomo` | `std::collections::HashMap<String, Value>` |  |
| `password_minimum_length` | `i64` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `String` |  |

#### Example: Load

```rust
let instance = client.instance(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", instance.data(None));
```


### Login

Create an instance: `let login = client.login(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```rust
let login = client.login(Value::Noval).create(jo(vec![
    ("email", Value::str("example_email")),  // String
    ("password", Value::str("example_password")),  // String
    ("token", Value::str("example_token")),  // String
]), Value::Noval).unwrap();
```


### Organization

Create an instance: `let organization = client.organization(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `i64` |  |
| `application_id` | `String` |  |
| `application_name` | `String` |  |
| `consumption` | `std::collections::HashMap<String, Value>` |  |
| `date` | `String` |  |
| `id` | `String` |  |
| `is_provisional` | `bool` |  |
| `name` | `String` |  |
| `onboarding_steps` | `std::collections::HashMap<String, Value>` |  |
| `organization_id` | `String` |  |
| `plan` | `std::collections::HashMap<String, Value>` |  |
| `quotas` | `std::collections::HashMap<String, Value>` |  |
| `role` | `String` |  |
| `users` | `Vec<Value>` |  |

#### Example: Load

```rust
let organization = client.organization(Value::Noval).load(jo(vec![("id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", organization.data(None));
```

#### Example: List

```rust
let organizations = client.organization(Value::Noval).list(Value::Noval, Value::Noval).unwrap();
for organization in &organizations {
    println!("{:?}", organization.data(None));
}
```

#### Example: Create

```rust
let organization = client.organization(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
]), Value::Noval).unwrap();
```


### OrganizationEditRole

Create an instance: `let organization_edit_role = client.organization_edit_role(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `role` | `String` |  |
| `user_id` | `String` |  |


### Quota

Create an instance: `let quota = client.quota(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |
| `limits` | `std::collections::HashMap<String, Value>` |  |

#### Example: Load

```rust
let quota = client.quota(Value::Noval).load(Value::Noval, Value::Noval).unwrap();
println!("{:?}", quota.data(None));
```


### Registration

Create an instance: `let registration = client.registration(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `first_name` | `String` |  |
| `gclid` | `String` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `String` |  |
| `password` | `String` |  |
| `signup_channel` | `String` | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `String` |  |

#### Example: Create

```rust
let registration = client.registration(Value::Noval).create(jo(vec![
    ("email", Value::str("example_email")),  // String
    ("first_name", Value::str("example_first_name")),  // String
    ("last_name", Value::str("example_last_name")),  // String
    ("password", Value::str("example_password")),  // String
]), Value::Noval).unwrap();
```


### RequestAttempt

Create an instance: `let request_attempt = client.request_attempt(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `delay_until` | `String` |  |
| `event` | `std::collections::HashMap<String, Value>` |  |
| `event_id` | `String` |  |
| `failed_at` | `String` |  |
| `http_response_status` | `i64` |  |
| `id` | `String` |  |
| `picked_at` | `String` |  |
| `request_attempt_id` | `String` |  |
| `response_id` | `String` |  |
| `retry_count` | `i64` |  |
| `status` | `std::collections::HashMap<String, Value>` | Status of a request attempt. |
| `subscription` | `std::collections::HashMap<String, Value>` |  |
| `succeeded_at` | `String` |  |

#### Example: Load

```rust
let request_attempt = client.request_attempt(Value::Noval).load(jo(vec![("id", Value::str("request_attempt_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", request_attempt.data(None));
```

#### Example: List

```rust
let request_attempts = client.request_attempt(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for request_attempt in &request_attempts {
    println!("{:?}", request_attempt.data(None));
}
```


### Response

Create an instance: `let response = client.response(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String` |  |
| `elapsed_time_ms` | `i64` |  |
| `headers` | `std::collections::HashMap<String, Value>` |  |
| `http_code` | `i64` |  |
| `id` | `String` |  |
| `response_error_name` | `String` |  |
| `response_id` | `String` |  |

#### Example: Load

```rust
let response = client.response(Value::Noval).load(jo(vec![("id", Value::str("response_id")), ("application_id", Value::str("application_id"))]), Value::Noval).unwrap();
println!("{:?}", response.data(None));
```


### Revoke

Create an instance: `let revoke = client.revoke(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |


### ServiceToken

Create an instance: `let service_token = client.service_token(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `token_id` | `String` |  |

#### Example: Load

```rust
let service_token = client.service_token(Value::Noval).load(jo(vec![("id", Value::str("service_token_id")), ("organization_id", Value::str("organization_id"))]), Value::Noval).unwrap();
println!("{:?}", service_token.data(None));
```

#### Example: List

```rust
let service_tokens = client.service_token(Value::Noval).list(jo(vec![("organization_id", Value::str("example"))]), Value::Noval).unwrap();
for service_token in &service_tokens {
    println!("{:?}", service_token.data(None));
}
```

#### Example: Create

```rust
let service_token = client.service_token(Value::Noval).create(jo(vec![
    ("name", Value::str("example_name")),  // String
    ("organization_id", Value::str("example_organization_id")),  // String
]), Value::Noval).unwrap();
```


### Subscription

Create an instance: `let subscription = client.subscription(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. `Ok` is a `Vec` of entities, one per record. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. `Ok` is the entity. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. `Ok` is the entity, marked as deleted. |
| `update(reqdata, ctrl)` | Update an existing entity. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `created_at` | `String` |  |
| `dedicated_workers` | `Vec<Value>` |  |
| `description` | `String` |  |
| `event_types` | `Vec<Value>` |  |
| `id` | `String` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `String` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `std::collections::HashMap<String, Value>` |  |
| `metadata` | `std::collections::HashMap<String, Value>` |  |
| `secret` | `String` |  |
| `subscription_id` | `String` |  |
| `target` | `std::collections::HashMap<String, Value>` |  |
| `updated_at` | `String` |  |

#### Example: Load

```rust
let subscription = client.subscription(Value::Noval).load(jo(vec![("id", Value::str("subscription_id"))]), Value::Noval).unwrap();
println!("{:?}", subscription.data(None));
```

#### Example: List

```rust
let subscriptions = client.subscription(Value::Noval).list(jo(vec![("application_id", Value::str("example"))]), Value::Noval).unwrap();
for subscription in &subscriptions {
    println!("{:?}", subscription.data(None));
}
```

#### Example: Create

```rust
let subscription = client.subscription(Value::Noval).create(jo(vec![
    ("application_id", Value::str("example_application_id")),  // String
    ("event_types", Value::empty_list()),  // Vec<Value>
    ("is_enabled", Value::Bool(true)),  // bool
    ("target", Value::empty_map()),  // std::collections::HashMap<String, Value>
]), Value::Noval).unwrap();
```


### UserAuthentication

Create an instance: `let user_authentication = client.user_authentication(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_password` | `String` |  |
| `email` | `String` |  |
| `new_password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```rust
let user_authentication = client.user_authentication(Value::Noval).create(jo(vec![
    ("current_password", Value::str("example_current_password")),  // String
    ("email", Value::str("example_email")),  // String
    ("new_password", Value::str("example_new_password")),  // String
    ("token", Value::str("example_token")),  // String
]), Value::Noval).unwrap();
```


### UserInvitation

Create an instance: `let user_invitation = client.user_invitation(Value::Noval);`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. `Ok` is the entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `role` | `String` |  |

#### Example: Create

```rust
let user_invitation = client.user_invitation(Value::Noval).create(jo(vec![
    ("organization_id", Value::str("example_organization_id")),  // String
    ("email", Value::str("example_email")),  // String
    ("role", Value::str("example_role")),  // String
]), Value::Noval).unwrap();
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

### Data as `Value`

The Rust SDK uses a single dynamic `Value` type throughout rather than a
typed struct per entity. `Value` is the vendored voxgig struct port (a
JSON-shaped enum: `Str`, `Num`, `Bool`, `List`, `Map`, `Null`,
`Noval`). This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Build request maps with the `jo` / `ja` helpers and read fields back with
`getp`; use `to_map` to safely coerce a value to a map.

### Crate structure

```
rust/
├── lib.rs                       -- Crate root (module decls + re-exports)
├── core/                        -- Pipeline types, config, client (sdk.rs)
├── entity/                      -- Per-entity clients (one module each)
├── feature/                     -- Built-in features (base, test, log)
└── utility/                     -- Utilities + the vendored voxgig struct port
```

The public API is re-exported from the crate root, so `use hook0_sdk::{...}`
reaches the SDK client, `Value`, and the `jo` / `ja` / `getp` helpers
directly. Import entity or utility modules only when needed.

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
