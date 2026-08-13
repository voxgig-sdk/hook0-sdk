# Hook0 Java SDK



The Java SDK for the Hook0 API — an entity-oriented client following idiomatic Java conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.application(null)` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Maven Central. Install it from the GitHub
release tag (`java/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hook0-sdk/releases)) or
from a source checkout — build the library with Maven:

```bash
cd java && mvn install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```java
import voxgig.hook0sdk.core.Hook0SDK;

Map<String, Object> options = new java.util.LinkedHashMap<>();
options.put("apikey", System.getenv("HOOK0_APIKEY"));
Hook0SDK client = new Hook0SDK(options);
```

### 2. List application records

`list(null, null)` returns an aggregate list of records (as `Object`, an
aggregate list) and raises on error.

```java
try {
    Object applicationList = client.application(null).list(null, null);
    System.out.println(applicationList);
}
catch (RuntimeException err) {
    System.out.println("list failed: " + err.getMessage());
}
```

### 3. Load an application

`load()` returns the ENTITY — call data() for the record — and raises on error.

```java
try {
    Object application = client.application(null).load(Map.of("id", "example_id"), null);
    System.out.println(application);
}
catch (RuntimeException err) {
    System.out.println("load failed: " + err.getMessage());
}
```

### 4. Create, update, and remove

```java
// Create — returns the ENTITY (call data() for the record)
Object created = client.application(null).create(Map.of("application_id", "example_application_id", "consumption", Map.of(), "name", "example_name", "onboarding_steps", Map.of(), "organization_id", "example_organization_id", "quotas", Map.of()), null);

// Update — supply the id in the match/data
client.application(null).update(Map.of("id", "example_id", "application_id", "example_application_id", "consumption", Map.of()), null);

// Remove
client.application(null).remove(Map.of("id", "example_id"), null);
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const applications = await client.Application().list()
  console.log(applications)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```java
Map<String, Object> result = client.direct(Map.of(
    "path", "/api/resource/{id}",
    "method", "GET",
    "params", Map.of("id", "example")));

if (Boolean.TRUE.equals(result.get("ok"))) {
    System.out.println(result.get("status"));  // 200
    System.out.println(result.get("data"));    // response body
}
else {
    // A non-2xx response carries status + data (the error body); a
    // transport-level failure carries err instead. Only one is present, so
    // read both — an absent key simply reads as null.
    System.out.println(result.get("status") + " " + result.get("err"));
}
```

### Prepare a request without sending it

```java
// prepare() returns the fetch definition and raises on error.
Map<String, Object> fetchdef = client.prepare(Map.of(
    "path", "/api/resource/{id}",
    "method", "DELETE",
    "params", Map.of("id", "example")));

System.out.println(fetchdef.get("url"));
System.out.println(fetchdef.get("method"));
System.out.println(fetchdef.get("headers"));
```

### Use test mode

Create a mock client for unit testing — no server required:

```java
Hook0SDK client = Hook0SDK.testSDK(null, null);

// Entity ops return the ENTITY and raises on error;
// call data() for the record.
Object application = client.application(null).list(null, null);
// application holds the mock response record
System.out.println(application);
```

### Use a custom fetch function

Replace the HTTP transport with your own `BiFunction`:

```java
java.util.function.BiFunction<String, Map<String, Object>, Object> mockFetch =
    (url, init) -> {
        Map<String, Object> res = new java.util.LinkedHashMap<>();
        res.put("status", 200);
        res.put("statusText", "OK");
        res.put("headers", new java.util.LinkedHashMap<String, Object>());
        res.put("json", (java.util.function.Supplier<Object>) () ->
            Map.of("id", "mock01"));
        return res;
    };

Map<String, Object> options = new java.util.LinkedHashMap<>();
options.put("base", "http://localhost:8080");
options.put("system", Map.of("fetch", mockFetch));
Hook0SDK client = new Hook0SDK(options);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd java && mvn test
```


## Reference

### Hook0SDK

```java
Hook0SDK client = new Hook0SDK(options);
```

Creates a new SDK client. `options` is a `Map<String, Object>`.

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

```java
Hook0SDK client = Hook0SDK.testSDK(testopts, sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `optionsMap` | `() -> Map` | Deep copy of current SDK options. |
| `getUtility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Map` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Map` | Build and send an HTTP request. Returns a result map (branch on `ok`). |
| `application` | `(entopts) -> SdkEntity` | Create an Application entity instance. |
| `applicationSecret` | `(entopts) -> SdkEntity` | Create an ApplicationSecret entity instance. |
| `applicationsManagement` | `(entopts) -> SdkEntity` | Create an ApplicationsManagement entity instance. |
| `event` | `(entopts) -> SdkEntity` | Create an Event entity instance. |
| `eventType` | `(entopts) -> SdkEntity` | Create an EventType entity instance. |
| `eventsManagement` | `(entopts) -> SdkEntity` | Create an EventsManagement entity instance. |
| `eventsPerDayEntry` | `(entopts) -> SdkEntity` | Create an EventsPerDayEntry entity instance. |
| `health` | `(entopts) -> SdkEntity` | Create a Health entity instance. |
| `hook0` | `(entopts) -> SdkEntity` | Create a Hook0 entity instance. |
| `ingestedEvent` | `(entopts) -> SdkEntity` | Create an IngestedEvent entity instance. |
| `instance` | `(entopts) -> SdkEntity` | Create an Instance entity instance. |
| `login` | `(entopts) -> SdkEntity` | Create a Login entity instance. |
| `organization` | `(entopts) -> SdkEntity` | Create an Organization entity instance. |
| `organizationEditRole` | `(entopts) -> SdkEntity` | Create an OrganizationEditRole entity instance. |
| `problem` | `(entopts) -> SdkEntity` | Create a Problem entity instance. |
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
| `load` | `(reqmatch, ctrl) -> Object` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Object` | List entities matching the criteria (an aggregate list). Raises on error. |
| `create` | `(reqdata, ctrl) -> Object` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> Object` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> Object` | Remove an entity. Raises on error. |
| `data` | `(newdata...) -> Object` | Get or set entity data. |
| `match` | `(newmatch...) -> Object` | Get or set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `getName` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data() for the record) (a `Map` for single-entity
ops, an aggregate `List` for `list`) as `Object` and raise on error. Wrap
calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never raises — it returns a result
`Map<String, Object>` you branch on via `result.get("ok")`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `Map` | Response headers. |
| `data` | `Object` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `application_id` |  |
| `consumption` |  |
| `name` |  |
| `onboarding_steps` |  |
| `organization_id` |  |
| `quotas` |  |

Operations: create, list, load, remove, update.

API path: `/api/v1/applications/`

#### ApplicationSecret

| Field | Description |
| --- | --- |
| `application_id` |  |
| `created_at` |  |
| `deleted_at` |  |
| `name` |  |
| `token` |  |

Operations: create, list, update.

API path: `/api/v1/application_secrets/`

#### ApplicationsManagement

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/api/v1/application_secrets/{application_secret_token}`

#### Event

| Field | Description |
| --- | --- |
| `event_id` |  |
| `event_type_name` |  |
| `ip` |  |
| `labels` |  |
| `metadata` |  |
| `occurred_at` |  |
| `payload` |  |
| `payload_content_type` |  |
| `received_at` |  |

Operations: list, load.

API path: `/api/v1/events/`

#### EventType

| Field | Description |
| --- | --- |
| `application_id` |  |
| `event_type_name` |  |
| `resource_type` |  |
| `resource_type_name` |  |
| `service` |  |
| `service_name` |  |
| `verb` |  |
| `verb_name` |  |

Operations: create, list, load.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |
| `application_id` |  |

Operations: create, list, remove.

API path: `/api/v1/events/{event_id}/replay`

#### EventsPerDayEntry

| Field | Description |
| --- | --- |
| `amount` |  |
| `application_id` |  |
| `application_name` |  |
| `date` |  |
| `is_provisional` |  |

Operations: list.

API path: `/api/v1/events_per_day/application`

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
| `application_id` |  |
| `event_id` |  |
| `event_type` |  |
| `labels` |  |
| `metadata` |  |
| `occurred_at` |  |
| `payload` |  |
| `payload_content_type` |  |

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

Operations: create.

API path: `/api/v1/auth/login`

#### Organization

| Field | Description |
| --- | --- |
| `consumption` |  |
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
| `role` |  |
| `user_id` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Problem

| Field | Description |
| --- | --- |
| `detail` |  |
| `id` |  |
| `status` |  |
| `title` |  |

Operations: list.

API path: `/api/v1/errors/`

#### Quota

| Field | Description |
| --- | --- |
| `global_applications_per_organization_limit` |  |
| `global_days_of_events_retention_limit` |  |
| `global_event_types_per_application_limit` |  |
| `global_events_per_day_limit` |  |
| `global_members_per_organization_limit` |  |
| `global_subscriptions_per_application_limit` |  |

Operations: load.

API path: `/api/v1/quotas/`

#### Registration

| Field | Description |
| --- | --- |
| `email` |  |
| `first_name` |  |
| `gclid` |  |
| `last_name` |  |
| `password` |  |
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
| `picked_at` |  |
| `request_attempt_id` |  |
| `response_id` |  |
| `retry_count` |  |
| `status` |  |
| `subscription` |  |
| `succeeded_at` |  |

Operations: list, load.

API path: `/api/v1/request_attempts/`

#### Response

| Field | Description |
| --- | --- |

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
| `is_enabled` |  |
| `label_key` |  |
| `label_value` |  |
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

Create an instance: `SdkEntity application = client.application(null);`

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
| `application_id` | `String` |  |
| `consumption` | `Map<String, Object>` |  |
| `name` | `String` |  |
| `onboarding_steps` | `Map<String, Object>` |  |
| `organization_id` | `String` |  |
| `quotas` | `Map<String, Object>` |  |

#### Example: Load

```java
Object application = client.application(null).load(Map.of("id", "application_id"), null);
```

#### Example: List

```java
Object applicationList = client.application(null).list(null, null);
```

#### Example: Create

```java
Object application = client.application(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "consumption", Map.of(),  // Map<String, Object>
    "name", "example_name",  // String
    "onboarding_steps", Map.of(),  // Map<String, Object>
    "organization_id", "example_organization_id",  // String
    "quotas", Map.of()  // Map<String, Object>
), null);
```


### ApplicationSecret

Create an instance: `SdkEntity applicationSecret = client.applicationSecret(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `created_at` | `String` |  |
| `deleted_at` | `String` |  |
| `name` | `String` |  |
| `token` | `String` |  |

#### Example: List

```java
Object applicationSecretList = client.applicationSecret(null).list(null, null);
```

#### Example: Create

```java
Object applicationSecret = client.applicationSecret(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "created_at", "example_created_at",  // String
    "token", "example_token"  // String
), null);
```


### ApplicationsManagement

Create an instance: `SdkEntity applicationsManagement = client.applicationsManagement(null);`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match, null)` | Remove the matching entity. |


### Event

Create an instance: `SdkEntity event = client.event(null);`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `String` |  |
| `event_type_name` | `String` |  |
| `ip` | `String` |  |
| `labels` | `Map<String, Object>` |  |
| `metadata` | `Map<String, Object>` |  |
| `occurred_at` | `String` |  |
| `payload` | `String` |  |
| `payload_content_type` | `String` |  |
| `received_at` | `String` |  |

#### Example: Load

```java
Object event = client.event(null).load(Map.of("id", "event_id"), null);
```

#### Example: List

```java
Object eventList = client.event(null).list(null, null);
```


### EventType

Create an instance: `SdkEntity eventType = client.eventType(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `event_type_name` | `String` |  |
| `resource_type` | `String` |  |
| `resource_type_name` | `String` |  |
| `service` | `String` |  |
| `service_name` | `String` |  |
| `verb` | `String` |  |
| `verb_name` | `String` |  |

#### Example: Load

```java
Object eventType = client.eventType(null).load(Map.of("id", "event_type_id"), null);
```

#### Example: List

```java
Object eventTypeList = client.eventType(null).list(null, null);
```

#### Example: Create

```java
Object eventType = client.eventType(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "event_type_name", "example_event_type_name",  // String
    "resource_type", "example_resource_type",  // String
    "resource_type_name", "example_resource_type_name",  // String
    "service", "example_service",  // String
    "service_name", "example_service_name",  // String
    "verb", "example_verb",  // String
    "verb_name", "example_verb_name"  // String
), null);
```


### EventsManagement

Create an instance: `SdkEntity eventsManagement = client.eventsManagement(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `remove(match, null)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |

#### Example: List

```java
Object eventsManagementList = client.eventsManagement(null).list(null, null);
```

#### Example: Create

```java
Object eventsManagement = client.eventsManagement(null).create(Map.of(
    "event_id", "example_event_id",  // String
    "application_id", "example_application_id"  // String
), null);
```


### EventsPerDayEntry

Create an instance: `SdkEntity eventsPerDayEntry = client.eventsPerDayEntry(null);`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Long` |  |
| `application_id` | `String` |  |
| `application_name` | `String` |  |
| `date` | `String` |  |
| `is_provisional` | `Boolean` |  |

#### Example: List

```java
Object eventsPerDayEntryList = client.eventsPerDayEntry(null).list(null, null);
```


### Health

Create an instance: `SdkEntity health = client.health(null);`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `Boolean` |  |
| `database_duration_ms` | `Long` |  |
| `object_storage` | `Boolean` |  |
| `object_storage_duration_ms` | `Long` |  |
| `pulsar` | `Boolean` |  |
| `pulsar_duration_ms` | `Long` |  |
| `total_duration_ms` | `Long` |  |

#### Example: Load

```java
Object health = client.health(null).load(null, null);
```


### Hook0

Create an instance: `SdkEntity hook0 = client.hook0(null);`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `String` |  |
| `description` | `String` |  |
| `env_var` | `String` |  |
| `group` | `String` |  |
| `name` | `String` |  |
| `required` | `Boolean` |  |
| `sensitive` | `Boolean` |  |

#### Example: List

```java
Object hook0List = client.hook0(null).list(null, null);
```


### IngestedEvent

Create an instance: `SdkEntity ingestedEvent = client.ingestedEvent(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` |  |
| `event_id` | `String` |  |
| `event_type` | `String` |  |
| `labels` | `Map<String, Object>` |  |
| `metadata` | `Map<String, Object>` |  |
| `occurred_at` | `String` |  |
| `payload` | `String` |  |
| `payload_content_type` | `String` |  |

#### Example: Create

```java
Object ingestedEvent = client.ingestedEvent(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "event_type", "example_event_type",  // String
    "labels", Map.of(),  // Map<String, Object>
    "occurred_at", "example_occurred_at",  // String
    "payload", "example_payload",  // String
    "payload_content_type", "example_payload_content_type"  // String
), null);
```


### Instance

Create an instance: `SdkEntity instance = client.instance(null);`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `Boolean` |  |
| `auto_db_migration` | `Boolean` |  |
| `biscuit_public_key` | `String` |  |
| `cloudflare_turnstile_site_key` | `String` |  |
| `formbricks` | `Map<String, Object>` |  |
| `matomo` | `Map<String, Object>` |  |
| `password_minimum_length` | `Long` |  |
| `quota_enforcement` | `Boolean` |  |
| `registration_disabled` | `Boolean` |  |
| `support_email_address` | `String` |  |

#### Example: Load

```java
Object instance = client.instance(null).load(null, null);
```


### Login

Create an instance: `SdkEntity login = client.login(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `password` | `String` |  |

#### Example: Create

```java
Object login = client.login(null).create(Map.of(
    "email", "example_email",  // String
    "password", "example_password"  // String
), null);
```


### Organization

Create an instance: `SdkEntity organization = client.organization(null);`

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
| `consumption` | `Map<String, Object>` |  |
| `name` | `String` |  |
| `onboarding_steps` | `Map<String, Object>` |  |
| `organization_id` | `String` |  |
| `plan` | `Map<String, Object>` |  |
| `quotas` | `Map<String, Object>` |  |
| `role` | `String` |  |
| `users` | `List<Object>` |  |

#### Example: Load

```java
Object organization = client.organization(null).load(Map.of("id", "organization_id"), null);
```

#### Example: List

```java
Object organizationList = client.organization(null).list(null, null);
```

#### Example: Create

```java
Object organization = client.organization(null).create(Map.of(
    "consumption", Map.of(),  // Map<String, Object>
    "name", "example_name",  // String
    "onboarding_steps", Map.of(),  // Map<String, Object>
    "organization_id", "example_organization_id",  // String
    "plan", Map.of(),  // Map<String, Object>
    "quotas", Map.of(),  // Map<String, Object>
    "role", "example_role",  // String
    "users", List.of()  // List<Object>
), null);
```


### OrganizationEditRole

Create an instance: `SdkEntity organizationEditRole = client.organizationEditRole(null);`

#### Operations

| Method | Description |
| --- | --- |
| `update(data, null)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `String` |  |
| `user_id` | `String` |  |


### Problem

Create an instance: `SdkEntity problem = client.problem(null);`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `String` |  |
| `id` | `String` |  |
| `status` | `Long` |  |
| `title` | `String` |  |

#### Example: List

```java
Object problemList = client.problem(null).list(null, null);
```


### Quota

Create an instance: `SdkEntity quota = client.quota(null);`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `global_applications_per_organization_limit` | `Long` |  |
| `global_days_of_events_retention_limit` | `Long` |  |
| `global_event_types_per_application_limit` | `Long` |  |
| `global_events_per_day_limit` | `Long` |  |
| `global_members_per_organization_limit` | `Long` |  |
| `global_subscriptions_per_application_limit` | `Long` |  |

#### Example: Load

```java
Object quota = client.quota(null).load(null, null);
```


### Registration

Create an instance: `SdkEntity registration = client.registration(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `first_name` | `String` |  |
| `gclid` | `String` |  |
| `last_name` | `String` |  |
| `password` | `String` |  |
| `turnstile_token` | `String` |  |

#### Example: Create

```java
Object registration = client.registration(null).create(Map.of(
    "email", "example_email",  // String
    "first_name", "example_first_name",  // String
    "last_name", "example_last_name",  // String
    "password", "example_password"  // String
), null);
```


### RequestAttempt

Create an instance: `SdkEntity requestAttempt = client.requestAttempt(null);`

#### Operations

| Method | Description |
| --- | --- |
| `list(null, null)` | List entities, optionally matching the given criteria. |
| `load(match, null)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `delay_until` | `String` |  |
| `event` | `Map<String, Object>` |  |
| `event_id` | `String` |  |
| `failed_at` | `String` |  |
| `http_response_status` | `Long` |  |
| `picked_at` | `String` |  |
| `request_attempt_id` | `String` |  |
| `response_id` | `String` |  |
| `retry_count` | `Long` |  |
| `status` | `Map<String, Object>` |  |
| `subscription` | `Map<String, Object>` |  |
| `succeeded_at` | `String` |  |

#### Example: Load

```java
Object requestAttempt = client.requestAttempt(null).load(Map.of("id", "request_attempt_id"), null);
```

#### Example: List

```java
Object requestAttemptList = client.requestAttempt(null).list(null, null);
```


### Response

Create an instance: `SdkEntity response = client.response(null);`

#### Operations

| Method | Description |
| --- | --- |
| `load(match, null)` | Load a single entity by match criteria. |

#### Example: Load

```java
Object response = client.response(null).load(Map.of("id", "response_id"), null);
```


### Revoke

Create an instance: `SdkEntity revoke = client.revoke(null);`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match, null)` | Remove the matching entity. |


### ServiceToken

Create an instance: `SdkEntity serviceToken = client.serviceToken(null);`

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
| `biscuit` | `String` |  |
| `created_at` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `token_id` | `String` |  |

#### Example: Load

```java
Object serviceToken = client.serviceToken(null).load(Map.of("id", "service_token_id"), null);
```

#### Example: List

```java
Object serviceTokenList = client.serviceToken(null).list(null, null);
```

#### Example: Create

```java
Object serviceToken = client.serviceToken(null).create(Map.of(
    "biscuit", "example_biscuit",  // String
    "created_at", "example_created_at",  // String
    "name", "example_name",  // String
    "organization_id", "example_organization_id",  // String
    "token_id", "example_token_id"  // String
), null);
```


### Subscription

Create an instance: `SdkEntity subscription = client.subscription(null);`

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
| `application_id` | `String` |  |
| `created_at` | `String` |  |
| `dedicated_workers` | `List<Object>` |  |
| `description` | `String` |  |
| `event_types` | `List<Object>` |  |
| `is_enabled` | `Boolean` |  |
| `label_key` | `String` |  |
| `label_value` | `String` |  |
| `labels` | `Map<String, Object>` |  |
| `metadata` | `Map<String, Object>` |  |
| `secret` | `String` |  |
| `subscription_id` | `String` |  |
| `target` | `Map<String, Object>` |  |
| `updated_at` | `String` |  |

#### Example: Load

```java
Object subscription = client.subscription(null).load(Map.of("id", "subscription_id"), null);
```

#### Example: List

```java
Object subscriptionList = client.subscription(null).list(null, null);
```

#### Example: Create

```java
Object subscription = client.subscription(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "created_at", "example_created_at",  // String
    "dedicated_workers", List.of(),  // List<Object>
    "event_types", List.of(),  // List<Object>
    "is_enabled", true,  // Boolean
    "label_key", "example_label_key",  // String
    "label_value", "example_label_value",  // String
    "labels", Map.of(),  // Map<String, Object>
    "metadata", Map.of(),  // Map<String, Object>
    "secret", "example_secret",  // String
    "subscription_id", "example_subscription_id",  // String
    "target", Map.of(),  // Map<String, Object>
    "updated_at", "example_updated_at"  // String
), null);
```


### UserAuthentication

Create an instance: `SdkEntity userAuthentication = client.userAuthentication(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `new_password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```java
Object userAuthentication = client.userAuthentication(null).create(Map.of(
    "email", "example_email",  // String
    "new_password", "example_new_password",  // String
    "token", "example_token"  // String
), null);
```


### UserInvitation

Create an instance: `SdkEntity userInvitation = client.userInvitation(null);`

#### Operations

| Method | Description |
| --- | --- |
| `create(data, null)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `role` | `String` |  |

#### Example: Create

```java
Object userInvitation = client.userInvitation(null).create(Map.of(
    "organization_id", "example_organization_id",  // String
    "email", "example_email",  // String
    "role", "example_role"  // String
), null);
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Java SDK uses a loose object model — `Map<String, Object>` throughout —
rather than a bespoke typed class per endpoint. This mirrors the dynamic
nature of the API and keeps the SDK flexible: no regeneration is needed when
the API schema changes.

Use `Helpers.toMapAny(value)` to safely coerce a value to a
`Map<String, Object>`. A `Hook0Types.java` module of reference
`record` types is also generated for editor documentation.

### Project structure

```
java/
├── pom.xml                     -- Maven project (compiles core/, utility/, feature/, entity/)
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const application = client.Application()
await application.list()

// application.data() now returns the application data from the last `list`
// application.match() returns the last match criteria
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
