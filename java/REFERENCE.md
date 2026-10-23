# Hook0 Java SDK Reference

Complete API reference for the Hook0 Java SDK.


## Hook0SDK

### Constructor

```java
Hook0SDK client = new Hook0SDK(options);
```

Create a new SDK client instance. `options` is a `Map<String, Object>`.

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

```java
Hook0SDK client = Hook0SDK.testSDK(null, null);
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

#### `optionsMap() -> Map`

Return a deep copy of the current SDK options.

#### `getUtility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> Map`

Make a direct HTTP request to any API endpoint. Returns a result
`Map<String, Object>` with `ok`, `status`, `headers`, and `data` (or
`err` on failure). This escape hatch never raises — branch on
`result.get("ok")`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Map` | Path parameter values. |
| `fetchargs["query"]` | `Map` | Query string parameters. |
| `fetchargs["headers"]` | `Map` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `Object` | Request body (maps are JSON-serialized). |

**Returns:** `Map<String, Object>`

#### `prepare(fetchargs) -> Map`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## Application

```java
SdkEntity application = client.application(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Long` | Yes |  |
| `application_id` | `String` | Yes | Unique identifier of the application. |
| `application_name` | `String` | Yes |  |
| `consumption` | `Map<String, Object>` | Yes | Current consumption metrics for this application. |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `Boolean` | Yes |  |
| `name` | `String` | Yes | Name of the application. |
| `onboarding_steps` | `Map<String, Object>` | Yes | Onboarding completion status for this application. |
| `organization_id` | `String` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Map<String, Object>` | Yes | Quota limits for this application. |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.application(null).create(Map.of(
    "name", "example_name",  // String
    "organization_id", "example_organization_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.application(null).list(Map.of("organization_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.application(null).load(Map.of("id", "application_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.application(null).remove(Map.of("id", "application_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.application(null).update(Map.of(
    "id", "application_id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Application` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## ApplicationSecret

```java
SdkEntity applicationSecret = client.applicationSecret(null);
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

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.applicationSecret(null).create(Map.of(
    "application_id", "example_application_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.applicationSecret(null).list(Map.of("application_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.applicationSecret(null).remove(Map.of("id", "application_secret_id", "application_id", "application_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.applicationSecret(null).update(Map.of(
    "id", "application_secret_id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationSecret` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## EmailPreference

```java
SdkEntity emailPreference = client.emailPreference(null);
```

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.emailPreference(null).create(Map.of(
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailPreference` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Error

```java
SdkEntity error = client.error(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | Yes |  |
| `id` | `String` | Yes | Identifier of the problem that occurred, stable across releases |
| `status` | `Long` | Yes |  |
| `title` | `String` | Yes |  |
| `type` | `String` | Yes | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Map<String, Object>` | No | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.error(null).list(null, null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Error` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Event

```java
SdkEntity event = client.event(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `String` | Yes |  |
| `event_type_name` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `labels` | `Map<String, Object>` | Yes |  |
| `metadata` | `Map<String, Object>` | No |  |
| `occurred_at` | `String` | Yes |  |
| `payload` | `String` | Yes |  |
| `payload_content_type` | `String` | Yes |  |
| `received_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.event(null).create(Map.of(
    "id", "example_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.event(null).list(Map.of("application_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.event(null).load(Map.of("id", "event_id", "application_id", "application_id"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Event` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## EventType

```java
SdkEntity eventType = client.eventType(null);
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

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.eventType(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "resource_type", "example_resource_type",  // String
    "service", "example_service",  // String
    "verb", "example_verb"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.eventType(null).list(Map.of("application_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.eventType(null).load(Map.of("id", "event_type_id", "application_id", "application_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.eventType(null).remove(Map.of("id", "event_type_id", "application_id", "application_id"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EventType` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## EventsManagement

```java
SdkEntity eventsManagement = client.eventsManagement(null);
```

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.eventsManagement(null).list(null, null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsManagement` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Health

```java
SdkEntity health = client.health(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `Boolean` | Yes |  |
| `database_duration_ms` | `Long` | Yes |  |
| `object_storage` | `Boolean` | No |  |
| `object_storage_duration_ms` | `Long` | No |  |
| `pulsar` | `Boolean` | No |  |
| `pulsar_duration_ms` | `Long` | No |  |
| `total_duration_ms` | `Long` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.health(null).load(null, null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Health` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Hook0

```java
SdkEntity hook0 = client.hook0(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `String` | No |  |
| `description` | `String` | No |  |
| `env_var` | `String` | Yes |  |
| `group` | `String` | No |  |
| `name` | `String` | Yes |  |
| `required` | `Boolean` | Yes |  |
| `sensitive` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.hook0(null).list(null, null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Hook0` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## IngestedEvent

```java
SdkEntity ingestedEvent = client.ingestedEvent(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes | UUID of the application this event belongs to. |
| `event_id` | `String` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Map<String, Object>` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Map<String, Object>` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String` | Yes | Timestamp when the event occurred. |
| `payload` | `String` | Yes | The event payload. |
| `payload_content_type` | `String` | Yes | Content type of the payload. |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.ingestedEvent(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "event_type", "example_event_type",  // String
    "labels", Map.of(),  // Map<String, Object>
    "occurred_at", "example_occurred_at",  // String
    "payload", "example_payload",  // String
    "payload_content_type", "example_payload_content_type"  // String
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `IngestedEvent` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Instance

```java
SdkEntity instance = client.instance(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `Boolean` | Yes |  |
| `auto_db_migration` | `Boolean` | Yes |  |
| `biscuit_public_key` | `String` | Yes |  |
| `cloudflare_turnstile_site_key` | `String` | No |  |
| `formbricks` | `Map<String, Object>` | Yes |  |
| `matomo` | `Map<String, Object>` | Yes |  |
| `password_minimum_length` | `Long` | Yes |  |
| `quota_enforcement` | `Boolean` | Yes |  |
| `registration_disabled` | `Boolean` | Yes |  |
| `support_email_address` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.instance(null).load(null, null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Instance` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Login

```java
SdkEntity login = client.login(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.login(null).create(Map.of(
    "email", "example_email",  // String
    "password", "example_password",  // String
    "token", "example_token"  // String
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Login` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Organization

```java
SdkEntity organization = client.organization(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Long` | Yes |  |
| `application_id` | `String` | Yes |  |
| `application_name` | `String` | Yes |  |
| `consumption` | `Map<String, Object>` | Yes |  |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `onboarding_steps` | `Map<String, Object>` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `plan` | `Map<String, Object>` | Yes |  |
| `quotas` | `Map<String, Object>` | Yes |  |
| `role` | `String` | Yes |  |
| `users` | `List<Object>` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.organization(null).create(Map.of(
    "name", "example_name"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.organization(null).list(null, null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.organization(null).load(Map.of("id", "organization_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.organization(null).remove(Map.of("id", "organization_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.organization(null).update(Map.of(
    "id", "organization_id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Organization` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## OrganizationEditRole

```java
SdkEntity organizationEditRole = client.organizationEditRole(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `role` | `String` | Yes |  |
| `user_id` | `String` | Yes |  |

### Operations

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.organizationEditRole(null).update(Map.of(
    "id", "id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEditRole` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Quota

```java
SdkEntity quota = client.quota(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `Boolean` | Yes |  |
| `limits` | `Map<String, Object>` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.quota(null).load(null, null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Quota` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Registration

```java
SdkEntity registration = client.registration(null);
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

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.registration(null).create(Map.of(
    "email", "example_email",  // String
    "first_name", "example_first_name",  // String
    "last_name", "example_last_name",  // String
    "password", "example_password"  // String
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Registration` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## RequestAttempt

```java
SdkEntity requestAttempt = client.requestAttempt(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `delay_until` | `String` | No |  |
| `event` | `Map<String, Object>` | Yes |  |
| `event_id` | `String` | Yes |  |
| `failed_at` | `String` | No |  |
| `http_response_status` | `Long` | No |  |
| `id` | `String` | No |  |
| `picked_at` | `String` | No |  |
| `request_attempt_id` | `String` | Yes |  |
| `response_id` | `String` | No |  |
| `retry_count` | `Long` | Yes |  |
| `status` | `Map<String, Object>` | Yes | Status of a request attempt. |
| `subscription` | `Map<String, Object>` | Yes |  |
| `succeeded_at` | `String` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.requestAttempt(null).list(Map.of("application_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.requestAttempt(null).load(Map.of("id", "request_attempt_id", "application_id", "application_id"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `RequestAttempt` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Response

```java
SdkEntity response = client.response(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `String` | No |  |
| `elapsed_time_ms` | `Long` | No |  |
| `headers` | `Map<String, Object>` | No |  |
| `http_code` | `Long` | No |  |
| `id` | `String` | No |  |
| `response_error_name` | `String` | No |  |
| `response_id` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.response(null).load(Map.of("id", "response_id", "application_id", "application_id"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Response` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Revoke

```java
SdkEntity revoke = client.revoke(null);
```

### Operations

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.revoke(null).remove(Map.of("organization_id", "organization_id"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Revoke` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## ServiceToken

```java
SdkEntity serviceToken = client.serviceToken(null);
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

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.serviceToken(null).create(Map.of(
    "name", "example_name",  // String
    "organization_id", "example_organization_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.serviceToken(null).list(Map.of("organization_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.serviceToken(null).load(Map.of("id", "service_token_id", "organization_id", "organization_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.serviceToken(null).remove(Map.of("id", "service_token_id", "organization_id", "organization_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.serviceToken(null).update(Map.of(
    "id", "service_token_id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceToken` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## Subscription

```java
SdkEntity subscription = client.subscription(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dedicated_workers` | `List<Object>` | Yes |  |
| `description` | `String` | No |  |
| `event_types` | `List<Object>` | Yes |  |
| `id` | `String` | No |  |
| `is_enabled` | `Boolean` | Yes |  |
| `label_key` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Map<String, Object>` | Yes |  |
| `metadata` | `Map<String, Object>` | Yes |  |
| `secret` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |
| `target` | `Map<String, Object>` | Yes |  |
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

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.subscription(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "event_types", List.of(),  // List<Object>
    "is_enabled", true,  // Boolean
    "target", Map.of()  // Map<String, Object>
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns a list of entities, one per record, and raises on error.

```java
List<?> results = (List<?>) client.subscription(null).list(Map.of("application_id", "example"), null);
for (Object item : results) {
    System.out.println(((SdkEntity) item).data());
}
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity, whose record `data()` reads, and raises on error.

```java
Object result = client.subscription(null).load(Map.of("id", "subscription_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```java
Object result = client.subscription(null).remove(Map.of("id", "subscription_id", "application_id", "application_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```java
Object result = client.subscription(null).update(Map.of(
    "id", "subscription_id"
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Subscription` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## UserAuthentication

```java
SdkEntity userAuthentication = client.userAuthentication(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current_password` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `new_password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.userAuthentication(null).create(Map.of(
    "current_password", "example_current_password",  // String
    "email", "example_email",  // String
    "new_password", "example_new_password",  // String
    "token", "example_token"  // String
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAuthentication` entity instance with the same options.

#### `getName() -> String`

Return the entity name.


---

## UserInvitation

```java
SdkEntity userInvitation = client.userInvitation(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `role` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity and raises on error.

```java
Object result = client.userInvitation(null).create(Map.of(
    "organization_id", "example_organization_id",  // String
    "email", "example_email",  // String
    "role", "example_role"  // String
), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInvitation` entity instance with the same options.

#### `getName() -> String`

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

```java
Map<String, Object> feature = new java.util.LinkedHashMap<>();
feature.put("debug", Map.of("active", true));
feature.put("idempotency", Map.of("active", true));
feature.put("metrics", Map.of("active", true));
feature.put("paging", Map.of("active", true));
feature.put("ratelimit", Map.of("active", true));
feature.put("retry", Map.of("active", true));
feature.put("secrets", Map.of("active", true));
feature.put("test", Map.of("active", true));
feature.put("timeout", Map.of("active", true));
Map<String, Object> options = new java.util.LinkedHashMap<>();
options.put("feature", feature);
Hook0SDK client = new Hook0SDK(options);
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

