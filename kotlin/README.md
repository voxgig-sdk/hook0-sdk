# Hook0 Kotlin SDK



The Kotlin SDK for the Hook0 API — an entity-oriented client following idiomatic Kotlin conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.application(null)` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Maven Central. Install it from the GitHub
release tag (`kotlin/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hook0-sdk/tags)) or
from a source checkout — build the library with Gradle:

```bash
cd kotlin && gradle build
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```kotlin
import voxgig.hook0sdk.core.Hook0SDK
import voxgig.hook0sdk.core.SdkEntity

val client = Hook0SDK(mutableMapOf<String, Any?>(
    "apikey" to System.getenv("HOOK0_APIKEY"),
))
```

### 2. List application records

`list(null, null)` returns a list of entities, one per record (as `Any?`),
and raises on error; an entity's `data()` reads its record.

```kotlin
try {
    val applicationList = client.application(null).list(mutableMapOf<String, Any?>("organization_id" to "example"), null) as List<*>
    for (applicationItem in applicationList) {
        println((applicationItem as SdkEntity).data())
    }
}
catch (err: RuntimeException) {
    println("list failed: " + err.message)
}
```

### 3. Load an application

`load()` returns the ENTITY — call data() for the record — and raises on error.

```kotlin
try {
    val application = client.application(null).load(mutableMapOf<String, Any?>("id" to "example_id"), null) as SdkEntity
    println(application.data())
}
catch (err: RuntimeException) {
    println("load failed: " + err.message)
}
```

### 4. Create, update, and remove

```kotlin
// Create — returns the ENTITY (call data() for the record)
val created = client.application(null).create(mutableMapOf<String, Any?>("name" to "example_name", "organization_id" to "example_organization_id"), null)

// Update — supply the id in the match/data
client.application(null).update(mutableMapOf<String, Any?>("id" to "example_id", "name" to "example_name", "organization_id" to "example_organization_id"), null)

// Remove
client.application(null).remove(mutableMapOf<String, Any?>("id" to "example_id"), null)
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

```kotlin
val result = client.direct(mutableMapOf<String, Any?>(
    "path" to "/api/resource/{id}",
    "method" to "GET",
    "params" to mapOf("id" to "example")))

if (result["ok"] == true) {
    println(result["status"])  // 200
    println(result["data"])    // response body
}
else {
    // A non-2xx response carries status + data (the error body); a
    // transport-level failure carries err instead. Only one is present, so
    // an absent key simply reads as null.
    println("" + result["status"] + " " + result["err"])
}
```

### Prepare a request without sending it

```kotlin
// prepare() returns the fetch definition and raises on error.
val fetchdef = client.prepare(mutableMapOf<String, Any?>(
    "path" to "/api/resource/{id}",
    "method" to "DELETE",
    "params" to mapOf("id" to "example")))

println(fetchdef["url"])
println(fetchdef["method"])
println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```kotlin
val client = Hook0SDK.testSDK(null, null)

// Entity ops return the entity; they raise on error.
val response = client.response(null).load(mutableMapOf<String, Any?>("id" to "test01", "application_id" to "example"), null) as SdkEntity
// data() reads the entity's mock record
println(response.data())
```

### Use a custom fetch function

Replace the HTTP transport with your own `BiFunction`:

```kotlin
val mockFetch = java.util.function.BiFunction<String, MutableMap<String, Any?>, Any?> { url, init ->
    mutableMapOf<String, Any?>(
        "status" to 200,
        "statusText" to "OK",
        "headers" to mutableMapOf<String, Any?>(),
        "json" to java.util.function.Supplier<Any?> { mapOf("id" to "mock01") },
    )
}

val client = Hook0SDK(mutableMapOf<String, Any?>(
    "base" to "http://localhost:8080",
    "system" to mapOf("fetch" to mockFetch),
))
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd kotlin && gradle test
```


## Reference

### Hook0SDK

```kotlin
val client = Hook0SDK(options)
```

Creates a new SDK client. `options` is a `MutableMap<String, Any?>`.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Map` | Feature activation flags. |
| `extend` | `List` | Additional Feature instances to load. |
| `system` | `Map` | System overrides (e.g. custom `fetch` function). |

### testSDK

```kotlin
val client = Hook0SDK.testSDK(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `optionsMap` | `() -> MutableMap` | Deep copy of current SDK options. |
| `getUtility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> MutableMap` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> MutableMap` | Build and send an HTTP request. Returns a result map (branch on `ok`). |
| `application` | `(entopts) -> SdkEntity` | Create an Application entity instance. |
| `applicationSecret` | `(entopts) -> SdkEntity` | Create an ApplicationSecret entity instance. |
| `emailPreference` | `(entopts) -> SdkEntity` | Create an EmailPreference entity instance. |
| `error` | `(entopts) -> SdkEntity` | Create an Error entity instance. |
| `event` | `(entopts) -> SdkEntity` | Create an Event entity instance. |
| `eventType` | `(entopts) -> SdkEntity` | Create an EventType entity instance. |
| `eventsManagement` | `(entopts) -> SdkEntity` | Create an EventsManagement entity instance. |
| `health` | `(entopts) -> SdkEntity` | Create a Health entity instance. |
| `hook0` | `(entopts) -> SdkEntity` | Create a Hook0 entity instance. |
| `ingestedEvent` | `(entopts) -> SdkEntity` | Create an IngestedEvent entity instance. |
| `instance` | `(entopts) -> SdkEntity` | Create an Instance entity instance. |
| `login` | `(entopts) -> SdkEntity` | Create a Login entity instance. |
| `organization` | `(entopts) -> SdkEntity` | Create an Organization entity instance. |
| `organizationEditRole` | `(entopts) -> SdkEntity` | Create an OrganizationEditRole entity instance. |
| `quota` | `(entopts) -> SdkEntity` | Create a Quota entity instance. |
| `registration` | `(entopts) -> SdkEntity` | Create a Registration entity instance. |
| `requestAttempt` | `(entopts) -> SdkEntity` | Create a RequestAttempt entity instance. |
| `response` | `(entopts) -> SdkEntity` | Create a Response entity instance. |
| `revoke` | `(entopts) -> SdkEntity` | Create a Revoke entity instance. |
| `serviceToken` | `(entopts) -> SdkEntity` | Create a ServiceToken entity instance. |
| `subscription` | `(entopts) -> SdkEntity` | Create a Subscription entity instance. |
| `userAuthentication` | `(entopts) -> SdkEntity` | Create an UserAuthentication entity instance. |
| `userInvitation` | `(entopts) -> SdkEntity` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> Any?` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Any?` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> Any?` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> Any?` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> Any?` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data` | `(vararg newdata) -> Any?` | Get or set entity data. |
| `match` | `(vararg newmatch) -> Any?` | Get or set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `name` | `val: String` | The entity name. |

### Result shape

Entity operations return the entity, and `list` a list of entities, one per
record, as `Any?`; an entity is an `SdkEntity`, whose `data()` reads its
record. They raise on error, so wrap calls in `try`/`catch` to handle
failures.

The `direct()` escape hatch never raises — it returns a result
`MutableMap<String, Any?>` you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Int` | HTTP status code. |
| `headers` | `Map` | Response headers. |
| `data` | `Any?` | Parsed JSON response body. |

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

Operations: create, list, load, remove, update.

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

Operations: create, list, remove, update.

API path: `/api/v1/application_secrets/`

#### EmailPreference

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: list.

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

Operations: create, list, load.

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

Operations: create, list, load, remove.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |

Operations: list.

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

Operations: load.

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

Operations: list.

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

Operations: create.

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

Operations: load.

API path: `/api/v1/instance/`

#### Login

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |
| `token` |  |

Operations: create.

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

Operations: create, list, load, remove, update.

API path: `/api/v1/organizations/`

#### OrganizationEditRole

| Field | Description |
| --- | --- |
| `id` |  |
| `role` |  |
| `user_id` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Quota

| Field | Description |
| --- | --- |
| `enabled` |  |
| `limits` |  |

Operations: load.

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

Operations: create.

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

Operations: list, load.

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

Operations: load.

API path: `/api/v1/responses/{response_id}`

#### Revoke

| Field | Description |
| --- | --- |

Operations: remove.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load, remove, update.

API path: `/api/v1/subscriptions/`

#### UserAuthentication

| Field | Description |
| --- | --- |
| `current_password` |  |
| `email` |  |
| `new_password` |  |
| `token` |  |

Operations: create.

API path: `/api/v1/auth/begin-reset-password`

#### UserInvitation

| Field | Description |
| --- | --- |
| `email` |  |
| `role` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/invite`



## Entities


### Application

Create an instance: `val application = client.application(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |
| `remove(match, null)` | Remove the matching entity. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Long?` |  |
| `application_id` | `String?` | Unique identifier of the application. |
| `application_name` | `String?` |  |
| `consumption` | `Map<String, Any?>?` | Current consumption metrics for this application. |
| `date` | `String?` |  |
| `id` | `String?` |  |
| `is_provisional` | `Boolean?` |  |
| `name` | `String?` | Name of the application. |
| `onboarding_steps` | `Map<String, Any?>?` | Onboarding completion status for this application. |
| `organization_id` | `String?` | UUID of the organization this application belongs to. |
| `quotas` | `Map<String, Any?>?` | Quota limits for this application. |

#### Example: Load

```kotlin
val application = client.application(null).load(mutableMapOf<String, Any?>("id" to "application_id"), null)
```

#### Example: List

```kotlin
val applicationList = client.application(null).list(mutableMapOf<String, Any?>("organization_id" to "example"), null)
```

#### Example: Create

```kotlin
val application = client.application(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name",  // String?
    "organization_id" to "example_organization_id"  // String?
), null)
```


### ApplicationSecret

Create an instance: `val applicationSecret = client.applicationSecret(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `remove(match, null)` | Remove the matching entity. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String?` |  |
| `created_at` | `String?` |  |
| `deleted_at` | `String?` |  |
| `id` | `String?` |  |
| `name` | `String?` |  |
| `token` | `String?` |  |

#### Example: List

```kotlin
val applicationSecretList = client.applicationSecret(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null)
```

#### Example: Create

```kotlin
val applicationSecret = client.applicationSecret(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id"  // String?
), null)
```


### EmailPreference

Create an instance: `val emailPreference = client.emailPreference(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Example: Create

```kotlin
val emailPreference = client.emailPreference(null).create(mutableMapOf<String, Any?>(
), null)
```


### Error

Create an instance: `val error = client.error(null)`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `String?` |  |
| `id` | `String?` | Identifier of the problem that occurred, stable across releases |
| `status` | `Long?` |  |
| `title` | `String?` |  |
| `type` | `String?` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Map<String, Any?>?` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

#### Example: List

```kotlin
val errorList = client.error(null).list(null, null)
```


### Event

Create an instance: `val event = client.event(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `String?` |  |
| `event_type_name` | `String?` |  |
| `id` | `String?` |  |
| `ip` | `String?` |  |
| `labels` | `Map<String, Any?>?` |  |
| `metadata` | `Map<String, Any?>?` |  |
| `occurred_at` | `String?` |  |
| `payload` | `String?` |  |
| `payload_content_type` | `String?` |  |
| `received_at` | `String?` |  |

#### Example: Load

```kotlin
val event = client.event(null).load(mutableMapOf<String, Any?>("id" to "event_id", "application_id" to "application_id"), null)
```

#### Example: List

```kotlin
val eventList = client.event(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null)
```

#### Example: Create

```kotlin
val event = client.event(null).create(mutableMapOf<String, Any?>(
    "id" to "example_id"  // String?
), null)
```


### EventType

Create an instance: `val eventType = client.eventType(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |
| `remove(match, null)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String?` |  |
| `event_type_name` | `String?` |  |
| `id` | `String?` |  |
| `resource_type` | `String?` |  |
| `resource_type_name` | `String?` |  |
| `service` | `String?` |  |
| `service_name` | `String?` |  |
| `verb` | `String?` |  |
| `verb_name` | `String?` |  |

#### Example: Load

```kotlin
val eventType = client.eventType(null).load(mutableMapOf<String, Any?>("id" to "event_type_id", "application_id" to "application_id"), null)
```

#### Example: List

```kotlin
val eventTypeList = client.eventType(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null)
```

#### Example: Create

```kotlin
val eventType = client.eventType(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "resource_type" to "example_resource_type",  // String?
    "service" to "example_service",  // String?
    "verb" to "example_verb"  // String?
), null)
```


### EventsManagement

Create an instance: `val eventsManagement = client.eventsManagement(null)`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Example: List

```kotlin
val eventsManagementList = client.eventsManagement(null).list(null, null)
```


### Health

Create an instance: `val health = client.health(null)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `Boolean?` |  |
| `database_duration_ms` | `Long?` |  |
| `object_storage` | `Boolean?` |  |
| `object_storage_duration_ms` | `Long?` |  |
| `pulsar` | `Boolean?` |  |
| `pulsar_duration_ms` | `Long?` |  |
| `total_duration_ms` | `Long?` |  |

#### Example: Load

```kotlin
val health = client.health(null).load(null, null)
```


### Hook0

Create an instance: `val hook0 = client.hook0(null)`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `String?` |  |
| `description` | `String?` |  |
| `env_var` | `String?` |  |
| `group` | `String?` |  |
| `name` | `String?` |  |
| `required` | `Boolean?` |  |
| `sensitive` | `Boolean?` |  |

#### Example: List

```kotlin
val hook0List = client.hook0(null).list(null, null)
```


### IngestedEvent

Create an instance: `val ingestedEvent = client.ingestedEvent(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String?` | UUID of the application this event belongs to. |
| `event_id` | `String?` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String?` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Map<String, Any?>?` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Map<String, Any?>?` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String?` | Timestamp when the event occurred. |
| `payload` | `String?` | The event payload. |
| `payload_content_type` | `String?` | Content type of the payload. |

#### Example: Create

```kotlin
val ingestedEvent = client.ingestedEvent(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "event_type" to "example_event_type",  // String?
    "labels" to mapOf<String, Any?>(),  // Map<String, Any?>?
    "occurred_at" to "example_occurred_at",  // String?
    "payload" to "example_payload",  // String?
    "payload_content_type" to "example_payload_content_type"  // String?
), null)
```


### Instance

Create an instance: `val instance = client.instance(null)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `Boolean?` |  |
| `auto_db_migration` | `Boolean?` |  |
| `biscuit_public_key` | `String?` |  |
| `cloudflare_turnstile_site_key` | `String?` |  |
| `formbricks` | `Map<String, Any?>?` |  |
| `matomo` | `Map<String, Any?>?` |  |
| `password_minimum_length` | `Long?` |  |
| `quota_enforcement` | `Boolean?` |  |
| `registration_disabled` | `Boolean?` |  |
| `support_email_address` | `String?` |  |

#### Example: Load

```kotlin
val instance = client.instance(null).load(null, null)
```


### Login

Create an instance: `val login = client.login(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String?` |  |
| `password` | `String?` |  |
| `token` | `String?` |  |

#### Example: Create

```kotlin
val login = client.login(null).create(mutableMapOf<String, Any?>(
    "email" to "example_email",  // String?
    "password" to "example_password",  // String?
    "token" to "example_token"  // String?
), null)
```


### Organization

Create an instance: `val organization = client.organization(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |
| `remove(match, null)` | Remove the matching entity. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Long?` |  |
| `application_id` | `String?` |  |
| `application_name` | `String?` |  |
| `consumption` | `Map<String, Any?>?` |  |
| `date` | `String?` |  |
| `id` | `String?` |  |
| `is_provisional` | `Boolean?` |  |
| `name` | `String?` |  |
| `onboarding_steps` | `Map<String, Any?>?` |  |
| `organization_id` | `String?` |  |
| `plan` | `Map<String, Any?>?` |  |
| `quotas` | `Map<String, Any?>?` |  |
| `role` | `String?` |  |
| `users` | `List<Any?>?` |  |

#### Example: Load

```kotlin
val organization = client.organization(null).load(mutableMapOf<String, Any?>("id" to "organization_id"), null)
```

#### Example: List

```kotlin
val organizationList = client.organization(null).list(null, null)
```

#### Example: Create

```kotlin
val organization = client.organization(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name"  // String?
), null)
```


### OrganizationEditRole

Create an instance: `val organizationEditRole = client.organizationEditRole(null)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String?` |  |
| `role` | `String?` |  |
| `user_id` | `String?` |  |


### Quota

Create an instance: `val quota = client.quota(null)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `Boolean?` |  |
| `limits` | `Map<String, Any?>?` |  |

#### Example: Load

```kotlin
val quota = client.quota(null).load(null, null)
```


### Registration

Create an instance: `val registration = client.registration(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String?` |  |
| `first_name` | `String?` |  |
| `gclid` | `String?` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `String?` |  |
| `password` | `String?` |  |
| `signup_channel` | `String?` | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `String?` |  |

#### Example: Create

```kotlin
val registration = client.registration(null).create(mutableMapOf<String, Any?>(
    "email" to "example_email",  // String?
    "first_name" to "example_first_name",  // String?
    "last_name" to "example_last_name",  // String?
    "password" to "example_password"  // String?
), null)
```


### RequestAttempt

Create an instance: `val requestAttempt = client.requestAttempt(null)`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String?` |  |
| `delay_until` | `String?` |  |
| `event` | `Map<String, Any?>?` |  |
| `event_id` | `String?` |  |
| `failed_at` | `String?` |  |
| `http_response_status` | `Long?` |  |
| `id` | `String?` |  |
| `picked_at` | `String?` |  |
| `request_attempt_id` | `String?` |  |
| `response_id` | `String?` |  |
| `retry_count` | `Long?` |  |
| `status` | `Map<String, Any?>?` | Status of a request attempt. |
| `subscription` | `Map<String, Any?>?` |  |
| `succeeded_at` | `String?` |  |

#### Example: Load

```kotlin
val requestAttempt = client.requestAttempt(null).load(mutableMapOf<String, Any?>("id" to "request_attempt_id", "application_id" to "application_id"), null)
```

#### Example: List

```kotlin
val requestAttemptList = client.requestAttempt(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null)
```


### Response

Create an instance: `val response = client.response(null)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String?` |  |
| `elapsed_time_ms` | `Long?` |  |
| `headers` | `Map<String, Any?>?` |  |
| `http_code` | `Long?` |  |
| `id` | `String?` |  |
| `response_error_name` | `String?` |  |
| `response_id` | `String?` |  |

#### Example: Load

```kotlin
val response = client.response(null).load(mutableMapOf<String, Any?>("id" to "response_id", "application_id" to "application_id"), null)
```


### Revoke

Create an instance: `val revoke = client.revoke(null)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match, null)` | Remove the matching entity. |


### ServiceToken

Create an instance: `val serviceToken = client.serviceToken(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |
| `remove(match, null)` | Remove the matching entity. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `String?` |  |
| `created_at` | `String?` |  |
| `id` | `String?` |  |
| `name` | `String?` |  |
| `organization_id` | `String?` |  |
| `token_id` | `String?` |  |

#### Example: Load

```kotlin
val serviceToken = client.serviceToken(null).load(mutableMapOf<String, Any?>("id" to "service_token_id", "organization_id" to "organization_id"), null)
```

#### Example: List

```kotlin
val serviceTokenList = client.serviceToken(null).list(mutableMapOf<String, Any?>("organization_id" to "example"), null)
```

#### Example: Create

```kotlin
val serviceToken = client.serviceToken(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name",  // String?
    "organization_id" to "example_organization_id"  // String?
), null)
```


### Subscription

Create an instance: `val subscription = client.subscription(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |
| `remove(match, null)` | Remove the matching entity. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String?` |  |
| `created_at` | `String?` |  |
| `dedicated_workers` | `List<Any?>?` |  |
| `description` | `String?` |  |
| `event_types` | `List<Any?>?` |  |
| `id` | `String?` |  |
| `is_enabled` | `Boolean?` |  |
| `label_key` | `String?` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String?` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Map<String, Any?>?` |  |
| `metadata` | `Map<String, Any?>?` |  |
| `secret` | `String?` |  |
| `subscription_id` | `String?` |  |
| `target` | `Map<String, Any?>?` |  |
| `updated_at` | `String?` |  |

#### Example: Load

```kotlin
val subscription = client.subscription(null).load(mutableMapOf<String, Any?>("id" to "subscription_id"), null)
```

#### Example: List

```kotlin
val subscriptionList = client.subscription(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null)
```

#### Example: Create

```kotlin
val subscription = client.subscription(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "event_types" to listOf<Any?>(),  // List<Any?>?
    "is_enabled" to true,  // Boolean?
    "target" to mapOf<String, Any?>()  // Map<String, Any?>?
), null)
```


### UserAuthentication

Create an instance: `val userAuthentication = client.userAuthentication(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_password` | `String?` |  |
| `email` | `String?` |  |
| `new_password` | `String?` |  |
| `token` | `String?` |  |

#### Example: Create

```kotlin
val userAuthentication = client.userAuthentication(null).create(mutableMapOf<String, Any?>(
    "current_password" to "example_current_password",  // String?
    "email" to "example_email",  // String?
    "new_password" to "example_new_password",  // String?
    "token" to "example_token"  // String?
), null)
```


### UserInvitation

Create an instance: `val userInvitation = client.userInvitation(null)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String?` |  |
| `role` | `String?` |  |

#### Example: Create

```kotlin
val userInvitation = client.userInvitation(null).create(mutableMapOf<String, Any?>(
    "organization_id" to "example_organization_id",  // String?
    "email" to "example_email",  // String?
    "role" to "example_role"  // String?
), null)
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

### Data as maps

The Kotlin SDK uses a loose object model — `MutableMap<String, Any?>`
throughout — rather than a bespoke typed class per endpoint. This mirrors the
dynamic nature of the API and keeps the SDK flexible: no regeneration is
needed when the API schema changes.

Use `Helpers.toMapAny(value)` to safely coerce a value to a
`MutableMap<String, Any?>`. A `Hook0Types.kt` module of
reference `data class` types is also generated for editor documentation.

### Project structure

```
kotlin/
├── build.gradle.kts            -- Gradle build (compiles core/, utility/, feature/, entity/)
├── settings.gradle.kts         -- Gradle project settings
├── core/                       -- Main SDK client, config, entity base, error type
├── entity/                     -- Entity implementations
├── feature/                    -- Built-in features (Base, Test, Log, ...)
├── utility/                    -- Utility functions and the vendored struct library
└── test/                       -- JUnit test suites
```

The main client class (`Hook0SDK`, package `voxgig.hook0sdk.core`)
exposes the entity accessors. Reference entity or utility types directly only
when needed.

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
