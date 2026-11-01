# Hook0 Kotlin SDK Reference

Complete API reference for the Hook0 Kotlin SDK.


## Hook0SDK

### Constructor

```kotlin
val client = Hook0SDK(options)
```

Create a new SDK client instance. `options` is a `MutableMap<String, Any?>`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Map` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Map` | Custom headers for all requests. |
| `options["feature"]` | `Map` | Feature configuration. |
| `options["system"]` | `Map` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK.testSDK(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `null`.

```kotlin
val client = Hook0SDK.testSDK(null, null)
```


### Instance Methods

#### `application(entopts)`

Create a new `Application` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `applicationSecret(entopts)`

Create a new `ApplicationSecret` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `emailPreference(entopts)`

Create a new `EmailPreference` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `error(entopts)`

Create a new `Error` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `event(entopts)`

Create a new `Event` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `eventType(entopts)`

Create a new `EventType` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `eventsManagement(entopts)`

Create a new `EventsManagement` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `health(entopts)`

Create a new `Health` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `hook0(entopts)`

Create a new `Hook0` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `ingestedEvent(entopts)`

Create a new `IngestedEvent` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `instance(entopts)`

Create a new `Instance` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `login(entopts)`

Create a new `Login` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `organization(entopts)`

Create a new `Organization` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `organizationEditRole(entopts)`

Create a new `OrganizationEditRole` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `quota(entopts)`

Create a new `Quota` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `registration(entopts)`

Create a new `Registration` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `requestAttempt(entopts)`

Create a new `RequestAttempt` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `response(entopts)`

Create a new `Response` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `revoke(entopts)`

Create a new `Revoke` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `serviceToken(entopts)`

Create a new `ServiceToken` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `subscription(entopts)`

Create a new `Subscription` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `userAuthentication(entopts)`

Create a new `UserAuthentication` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `userInvitation(entopts)`

Create a new `UserInvitation` entity instance (returns `SdkEntity`). Pass
`null` for no initial options.

#### `optionsMap() -> MutableMap`

Return a deep copy of the current SDK options.

#### `getUtility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> MutableMap`

Make a direct HTTP request to any API endpoint. Returns a result
`MutableMap<String, Any?>` with `ok`, `status`, `headers`, and `data`
(or `err` on failure). This escape hatch never raises — branch on
`result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Map` | Path parameter values. |
| `fetchargs["query"]` | `Map` | Query string parameters. |
| `fetchargs["headers"]` | `Map` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `Any?` | Request body (maps are JSON-serialized). |

**Returns:** `MutableMap<String, Any?>`

#### `prepare(fetchargs) -> MutableMap`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## Application

```kotlin
val application = client.application(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Long?` | Yes |  |
| `application_id` | `String?` | Yes | Unique identifier of the application. |
| `application_name` | `String?` | Yes |  |
| `consumption` | `Map<String, Any?>?` | Yes | Current consumption metrics for this application. |
| `date` | `String?` | Yes |  |
| `id` | `String?` | No |  |
| `is_provisional` | `Boolean?` | Yes |  |
| `name` | `String?` | Yes | Name of the application. |
| `onboarding_steps` | `Map<String, Any?>?` | Yes | Onboarding completion status for this application. |
| `organization_id` | `String?` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Map<String, Any?>?` | Yes | Quota limits for this application. |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.application(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name",  // String?
    "organization_id" to "example_organization_id"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.application(null).list(mutableMapOf<String, Any?>("organization_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.application(null).load(mutableMapOf<String, Any?>("id" to "application_id"), null)
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.application(null).remove(mutableMapOf<String, Any?>("id" to "application_id"), null)
```

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.application(null).update(mutableMapOf<String, Any?>(
    "id" to "application_id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Application` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## ApplicationSecret

```kotlin
val applicationSecret = client.applicationSecret(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String?` | Yes |  |
| `created_at` | `String?` | Yes |  |
| `deleted_at` | `String?` | No |  |
| `id` | `String?` | No |  |
| `name` | `String?` | No |  |
| `token` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.applicationSecret(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.applicationSecret(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.applicationSecret(null).remove(mutableMapOf<String, Any?>("id" to "application_secret_id", "application_id" to "application_id"), null)
```

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.applicationSecret(null).update(mutableMapOf<String, Any?>(
    "id" to "application_secret_id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationSecret` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## EmailPreference

```kotlin
val emailPreference = client.emailPreference(null)
```

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.emailPreference(null).create(mutableMapOf<String, Any?>(
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailPreference` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Error

```kotlin
val error = client.error(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String?` | Yes |  |
| `id` | `String?` | Yes | Identifier of the problem that occurred, stable across releases |
| `status` | `Long?` | Yes |  |
| `title` | `String?` | Yes |  |
| `type` | `String?` | Yes | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Map<String, Any?>?` | No | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

### Operations

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.error(null).list(null, null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Error` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Event

```kotlin
val event = client.event(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `String?` | Yes |  |
| `event_type_name` | `String?` | Yes |  |
| `id` | `String?` | No |  |
| `ip` | `String?` | Yes |  |
| `labels` | `Map<String, Any?>?` | Yes |  |
| `metadata` | `Map<String, Any?>?` | No |  |
| `occurred_at` | `String?` | Yes |  |
| `payload` | `String?` | Yes |  |
| `payload_content_type` | `String?` | Yes |  |
| `received_at` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.event(null).create(mutableMapOf<String, Any?>(
    "id" to "example_id"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.event(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.event(null).load(mutableMapOf<String, Any?>("id" to "event_id", "application_id" to "application_id"), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Event` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## EventType

```kotlin
val eventType = client.eventType(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String?` | Yes |  |
| `event_type_name` | `String?` | Yes |  |
| `id` | `String?` | No |  |
| `resource_type` | `String?` | Yes |  |
| `resource_type_name` | `String?` | Yes |  |
| `service` | `String?` | Yes |  |
| `service_name` | `String?` | Yes |  |
| `verb` | `String?` | Yes |  |
| `verb_name` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.eventType(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "resource_type" to "example_resource_type",  // String?
    "service" to "example_service",  // String?
    "verb" to "example_verb"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.eventType(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.eventType(null).load(mutableMapOf<String, Any?>("id" to "event_type_id", "application_id" to "application_id"), null)
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.eventType(null).remove(mutableMapOf<String, Any?>("id" to "event_type_id", "application_id" to "application_id"), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EventType` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## EventsManagement

```kotlin
val eventsManagement = client.eventsManagement(null)
```

### Operations

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.eventsManagement(null).list(null, null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsManagement` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Health

```kotlin
val health = client.health(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `Boolean?` | Yes |  |
| `database_duration_ms` | `Long?` | Yes |  |
| `object_storage` | `Boolean?` | No |  |
| `object_storage_duration_ms` | `Long?` | No |  |
| `pulsar` | `Boolean?` | No |  |
| `pulsar_duration_ms` | `Long?` | No |  |
| `total_duration_ms` | `Long?` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.health(null).load(null, null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Health` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Hook0

```kotlin
val hook0 = client.hook0(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `String?` | No |  |
| `description` | `String?` | No |  |
| `env_var` | `String?` | Yes |  |
| `group` | `String?` | No |  |
| `name` | `String?` | Yes |  |
| `required` | `Boolean?` | Yes |  |
| `sensitive` | `Boolean?` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.hook0(null).list(null, null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Hook0` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## IngestedEvent

```kotlin
val ingestedEvent = client.ingestedEvent(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String?` | Yes | UUID of the application this event belongs to. |
| `event_id` | `String?` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String?` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Map<String, Any?>?` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Map<String, Any?>?` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String?` | Yes | Timestamp when the event occurred. |
| `payload` | `String?` | Yes | The event payload. |
| `payload_content_type` | `String?` | Yes | Content type of the payload. |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.ingestedEvent(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "event_type" to "example_event_type",  // String?
    "labels" to mapOf<String, Any?>(),  // Map<String, Any?>?
    "occurred_at" to "example_occurred_at",  // String?
    "payload" to "example_payload",  // String?
    "payload_content_type" to "example_payload_content_type"  // String?
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `IngestedEvent` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Instance

```kotlin
val instance = client.instance(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `Boolean?` | Yes |  |
| `auto_db_migration` | `Boolean?` | Yes |  |
| `biscuit_public_key` | `String?` | Yes |  |
| `cloudflare_turnstile_site_key` | `String?` | No |  |
| `formbricks` | `Map<String, Any?>?` | Yes |  |
| `matomo` | `Map<String, Any?>?` | Yes |  |
| `password_minimum_length` | `Long?` | Yes |  |
| `quota_enforcement` | `Boolean?` | Yes |  |
| `registration_disabled` | `Boolean?` | Yes |  |
| `support_email_address` | `String?` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.instance(null).load(null, null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Instance` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Login

```kotlin
val login = client.login(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String?` | Yes |  |
| `password` | `String?` | Yes |  |
| `token` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.login(null).create(mutableMapOf<String, Any?>(
    "email" to "example_email",  // String?
    "password" to "example_password",  // String?
    "token" to "example_token"  // String?
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Login` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Organization

```kotlin
val organization = client.organization(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Long?` | Yes |  |
| `application_id` | `String?` | Yes |  |
| `application_name` | `String?` | Yes |  |
| `consumption` | `Map<String, Any?>?` | Yes |  |
| `date` | `String?` | Yes |  |
| `id` | `String?` | No |  |
| `is_provisional` | `Boolean?` | Yes |  |
| `name` | `String?` | Yes |  |
| `onboarding_steps` | `Map<String, Any?>?` | Yes |  |
| `organization_id` | `String?` | Yes |  |
| `plan` | `Map<String, Any?>?` | Yes |  |
| `quotas` | `Map<String, Any?>?` | Yes |  |
| `role` | `String?` | Yes |  |
| `users` | `List<Any?>?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.organization(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.organization(null).list(null, null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.organization(null).load(mutableMapOf<String, Any?>("id" to "organization_id"), null)
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.organization(null).remove(mutableMapOf<String, Any?>("id" to "organization_id"), null)
```

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.organization(null).update(mutableMapOf<String, Any?>(
    "id" to "organization_id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Organization` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## OrganizationEditRole

```kotlin
val organizationEditRole = client.organizationEditRole(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String?` | No |  |
| `role` | `String?` | Yes |  |
| `user_id` | `String?` | Yes |  |

### Operations

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.organizationEditRole(null).update(mutableMapOf<String, Any?>(
    "id" to "id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEditRole` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Quota

```kotlin
val quota = client.quota(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `Boolean?` | Yes |  |
| `limits` | `Map<String, Any?>?` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.quota(null).load(null, null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Quota` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Registration

```kotlin
val registration = client.registration(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String?` | Yes |  |
| `first_name` | `String?` | Yes |  |
| `gclid` | `String?` | No | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `String?` | Yes |  |
| `password` | `String?` | Yes |  |
| `signup_channel` | `String?` | No | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `String?` | No |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.registration(null).create(mutableMapOf<String, Any?>(
    "email" to "example_email",  // String?
    "first_name" to "example_first_name",  // String?
    "last_name" to "example_last_name",  // String?
    "password" to "example_password"  // String?
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Registration` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## RequestAttempt

```kotlin
val requestAttempt = client.requestAttempt(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String?` | Yes |  |
| `delay_until` | `String?` | No |  |
| `event` | `Map<String, Any?>?` | Yes |  |
| `event_id` | `String?` | Yes |  |
| `failed_at` | `String?` | No |  |
| `http_response_status` | `Long?` | No |  |
| `id` | `String?` | No |  |
| `picked_at` | `String?` | No |  |
| `request_attempt_id` | `String?` | Yes |  |
| `response_id` | `String?` | No |  |
| `retry_count` | `Long?` | Yes |  |
| `status` | `Map<String, Any?>?` | Yes | Status of a request attempt. |
| `subscription` | `Map<String, Any?>?` | Yes |  |
| `succeeded_at` | `String?` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.requestAttempt(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.requestAttempt(null).load(mutableMapOf<String, Any?>("id" to "request_attempt_id", "application_id" to "application_id"), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `RequestAttempt` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Response

```kotlin
val response = client.response(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `String?` | No |  |
| `elapsed_time_ms` | `Long?` | No |  |
| `headers` | `Map<String, Any?>?` | No |  |
| `http_code` | `Long?` | No |  |
| `id` | `String?` | No |  |
| `response_error_name` | `String?` | No |  |
| `response_id` | `String?` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.response(null).load(mutableMapOf<String, Any?>("id" to "response_id", "application_id" to "application_id"), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Response` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Revoke

```kotlin
val revoke = client.revoke(null)
```

### Operations

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.revoke(null).remove(mutableMapOf<String, Any?>("organization_id" to "organization_id"), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Revoke` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## ServiceToken

```kotlin
val serviceToken = client.serviceToken(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `String?` | Yes |  |
| `created_at` | `String?` | Yes |  |
| `id` | `String?` | No |  |
| `name` | `String?` | Yes |  |
| `organization_id` | `String?` | Yes |  |
| `token_id` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.serviceToken(null).create(mutableMapOf<String, Any?>(
    "name" to "example_name",  // String?
    "organization_id" to "example_organization_id"  // String?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.serviceToken(null).list(mutableMapOf<String, Any?>("organization_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.serviceToken(null).load(mutableMapOf<String, Any?>("id" to "service_token_id", "organization_id" to "organization_id"), null)
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.serviceToken(null).remove(mutableMapOf<String, Any?>("id" to "service_token_id", "organization_id" to "organization_id"), null)
```

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.serviceToken(null).update(mutableMapOf<String, Any?>(
    "id" to "service_token_id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceToken` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## Subscription

```kotlin
val subscription = client.subscription(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String?` | Yes |  |
| `created_at` | `String?` | Yes |  |
| `dedicated_workers` | `List<Any?>?` | Yes |  |
| `description` | `String?` | No |  |
| `event_types` | `List<Any?>?` | Yes |  |
| `id` | `String?` | No |  |
| `is_enabled` | `Boolean?` | Yes |  |
| `label_key` | `String?` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String?` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Map<String, Any?>?` | Yes |  |
| `metadata` | `Map<String, Any?>?` | Yes |  |
| `secret` | `String?` | Yes |  |
| `subscription_id` | `String?` | Yes |  |
| `target` | `Map<String, Any?>?` | Yes |  |
| `updated_at` | `String?` | Yes |  |

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

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.subscription(null).create(mutableMapOf<String, Any?>(
    "application_id" to "example_application_id",  // String?
    "event_types" to listOf<Any?>(),  // List<Any?>?
    "is_enabled" to true,  // Boolean?
    "target" to mapOf<String, Any?>()  // Map<String, Any?>?
), null)
```

#### `list(reqmatch, ctrl) -> Any?`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```kotlin
val results = client.subscription(null).list(mutableMapOf<String, Any?>("application_id" to "example"), null) as List<*>
for (item in results) {
    println((item as SdkEntity).data())
}
```

#### `load(reqmatch, ctrl) -> Any?`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```kotlin
val result = client.subscription(null).load(mutableMapOf<String, Any?>("id" to "subscription_id"), null)
```

#### `remove(reqmatch, ctrl) -> Any?`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```kotlin
val result = client.subscription(null).remove(mutableMapOf<String, Any?>("id" to "subscription_id", "application_id" to "application_id"), null)
```

#### `update(reqdata, ctrl) -> Any?`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```kotlin
val result = client.subscription(null).update(mutableMapOf<String, Any?>(
    "id" to "subscription_id"
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Subscription` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## UserAuthentication

```kotlin
val userAuthentication = client.userAuthentication(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current_password` | `String?` | Yes |  |
| `email` | `String?` | Yes |  |
| `new_password` | `String?` | Yes |  |
| `token` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.userAuthentication(null).create(mutableMapOf<String, Any?>(
    "current_password" to "example_current_password",  // String?
    "email" to "example_email",  // String?
    "new_password" to "example_new_password",  // String?
    "token" to "example_token"  // String?
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAuthentication` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


---

## UserInvitation

```kotlin
val userInvitation = client.userInvitation(null)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String?` | Yes |  |
| `role` | `String?` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Any?`

Create a new entity with the given data. Returns the created entity and raises on error.

```kotlin
val result = client.userInvitation(null).create(mutableMapOf<String, Any?>(
    "organization_id" to "example_organization_id",  // String?
    "email" to "example_email",  // String?
    "role" to "example_role"  // String?
), null)
```

### Common Methods

#### `data(vararg newdata) -> Any?`

Get or set the entity data.

#### `match(vararg newmatch) -> Any?`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInvitation` entity instance with the same options.

#### `name -> String`

The entity name (read-only property).


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

```kotlin
val feature = mutableMapOf<String, Any?>(
    "debug" to mapOf("active" to true),
    "idempotency" to mapOf("active" to true),
    "metrics" to mapOf("active" to true),
    "paging" to mapOf("active" to true),
    "ratelimit" to mapOf("active" to true),
    "retry" to mapOf("active" to true),
    "secrets" to mapOf("active" to true),
    "test" to mapOf("active" to true),
    "timeout" to mapOf("active" to true),
)
val client = Hook0SDK(mutableMapOf<String, Any?>("feature" to feature))
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

