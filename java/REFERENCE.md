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

#### `applicationsManagement(entopts)`

Create a new `ApplicationsManagement` entity instance (returns `SdkEntity`). Pass
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

#### `eventsPerDayEntry(entopts)`

Create a new `EventsPerDayEntry` entity instance (returns `SdkEntity`). Pass
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

#### `problem(entopts)`

Create a new `Problem` entity instance (returns `SdkEntity`). Pass
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
| `application_id` | `String` | Yes |  |
| `consumption` | `Map<String, Object>` | Yes |  |
| `name` | `String` | Yes |  |
| `onboarding_steps` | `Map<String, Object>` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `quota` | `Map<String, Object>` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.application(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "consumption", Map.of(),  // Map<String, Object>
    "name", "example_name",  // String
    "onboarding_steps", Map.of(),  // Map<String, Object>
    "organization_id", "example_organization_id",  // String
    "quota", Map.of()  // Map<String, Object>
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.application(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.application(null).load(Map.of("id", "application_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.application(null).remove(Map.of("id", "application_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `name` | `String` | No |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.applicationSecret(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "created_at", "example_created_at",  // String
    "token", "example_token"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.applicationSecret(null).list(null, null);
System.out.println(results);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```java
Object result = client.applicationSecret(null).update(Map.of(
    "id", "id"
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

## ApplicationsManagement

```java
SdkEntity applicationsManagement = client.applicationsManagement(null);
```

### Operations

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.applicationsManagement(null).remove(Map.of("application_secret_token", "application_secret_token"), null);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationsManagement` entity instance with the same options.

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
| `ip` | `String` | Yes |  |
| `labels` | `Map<String, Object>` | Yes |  |
| `metadata` | `Map<String, Object>` | No |  |
| `occurred_at` | `String` | Yes |  |
| `payload` | `String` | Yes |  |
| `payload_content_type` | `String` | Yes |  |
| `received_at` | `String` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.event(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.event(null).load(Map.of("id", "event_id"), null);
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
| `resource_type` | `String` | Yes |  |
| `resource_type_name` | `String` | Yes |  |
| `service` | `String` | Yes |  |
| `service_name` | `String` | Yes |  |
| `verb` | `String` | Yes |  |
| `verb_name` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.eventType(null).create(Map.of(
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

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.eventType(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.eventType(null).load(Map.of("id", "event_type_id"), null);
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.eventsManagement(null).create(Map.of(
    "event_id", "example_event_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.eventsManagement(null).list(null, null);
System.out.println(results);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.eventsManagement(null).remove(Map.of("event_type_name", "event_type_name"), null);
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

## EventsPerDayEntry

```java
SdkEntity eventsPerDayEntry = client.eventsPerDayEntry(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Long` | Yes |  |
| `application_id` | `String` | Yes |  |
| `application_name` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `is_provisional` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.eventsPerDayEntry(null).list(null, null);
System.out.println(results);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsPerDayEntry` entity instance with the same options.

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

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.hook0(null).list(null, null);
System.out.println(results);
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
| `application_id` | `String` | Yes |  |
| `event_id` | `String` | No |  |
| `event_type` | `String` | Yes |  |
| `labels` | `Map<String, Object>` | Yes |  |
| `metadata` | `Map<String, Object>` | No |  |
| `occurred_at` | `String` | Yes |  |
| `payload` | `String` | Yes |  |
| `payload_content_type` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

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

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.login(null).create(Map.of(
    "email", "example_email",  // String
    "password", "example_password"  // String
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
| `consumption` | `Map<String, Object>` | Yes |  |
| `name` | `String` | Yes |  |
| `onboarding_steps` | `Map<String, Object>` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `plan` | `Map<String, Object>` | Yes |  |
| `quota` | `Map<String, Object>` | Yes |  |
| `role` | `String` | Yes |  |
| `users` | `List<Object>` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.organization(null).create(Map.of(
    "consumption", Map.of(),  // Map<String, Object>
    "name", "example_name",  // String
    "onboarding_steps", Map.of(),  // Map<String, Object>
    "organization_id", "example_organization_id",  // String
    "plan", Map.of(),  // Map<String, Object>
    "quota", Map.of(),  // Map<String, Object>
    "role", "example_role",  // String
    "users", List.of()  // List<Object>
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.organization(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.organization(null).load(Map.of("id", "organization_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.organization(null).remove(Map.of("id", "organization_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `role` | `String` | Yes |  |
| `user_id` | `String` | Yes |  |

### Operations

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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

## Problem

```java
SdkEntity problem = client.problem(null);
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `status` | `Long` | Yes |  |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.problem(null).list(null, null);
System.out.println(results);
```

### Common Methods

#### `data(newdata...) -> Object`

Get or set the entity data.

#### `match(newmatch...) -> Object`

Get or set the entity match criteria.

#### `make() -> Entity`

Create a new `Problem` entity instance with the same options.

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

Load a single entity matching the given criteria. Returns the entity data and raises on error.

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
| `gclid` | `String` | No |  |
| `last_name` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `turnstile_token` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

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
| `picked_at` | `String` | No |  |
| `request_attempt_id` | `String` | Yes |  |
| `response_id` | `String` | No |  |
| `retry_count` | `Long` | Yes |  |
| `status` | `Map<String, Object>` | Yes |  |
| `subscription` | `Map<String, Object>` | Yes |  |
| `succeeded_at` | `String` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.requestAttempt(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.requestAttempt(null).load(Map.of("id", "request_attempt_id"), null);
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
| `response_error_name` | `String` | No |  |
| `response_id` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.response(null).load(Map.of("id", "response_id"), null);
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

Remove the entity matching the given criteria. Raises on error.

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
| `name` | `String` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `token_id` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.serviceToken(null).create(Map.of(
    "biscuit", "example_biscuit",  // String
    "created_at", "example_created_at",  // String
    "name", "example_name",  // String
    "organization_id", "example_organization_id",  // String
    "token_id", "example_token_id"  // String
), null);
```

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.serviceToken(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.serviceToken(null).load(Map.of("id", "service_token_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.serviceToken(null).remove(Map.of("id", "service_token_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `event_type` | `List<Object>` | Yes |  |
| `is_enabled` | `Boolean` | Yes |  |
| `label_key` | `String` | Yes |  |
| `label_value` | `String` | Yes |  |
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
| `event_type` | - | - | - | - | - |
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

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.subscription(null).create(Map.of(
    "application_id", "example_application_id",  // String
    "created_at", "example_created_at",  // String
    "dedicated_workers", List.of(),  // List<Object>
    "event_type", List.of(),  // List<Object>
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

#### `list(reqmatch, ctrl) -> Object`

List entities matching the given criteria. The match is optional — call `list(null, null)` to list all records. Returns an aggregate list and raises on error.

```java
Object results = client.subscription(null).list(null, null);
System.out.println(results);
```

#### `load(reqmatch, ctrl) -> Object`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```java
Object result = client.subscription(null).load(Map.of("id", "subscription_id"), null);
```

#### `remove(reqmatch, ctrl) -> Object`

Remove the entity matching the given criteria. Raises on error.

```java
Object result = client.subscription(null).remove(Map.of("id", "subscription_id"), null);
```

#### `update(reqdata, ctrl) -> Object`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

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
| `email` | `String` | Yes |  |
| `new_password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> Object`

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.userAuthentication(null).create(Map.of(
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

Create a new entity with the given data. Returns the created entity data and raises on error.

```java
Object result = client.userInvitation(null).create(Map.of(
    "organization_id", "example_organization_id"  // String
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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```java
Map<String, Object> feature = new java.util.LinkedHashMap<>();
feature.put("test", Map.of("active", true));
Map<String, Object> options = new java.util.LinkedHashMap<>();
options.put("feature", feature);
Hook0SDK client = new Hook0SDK(options);
```

