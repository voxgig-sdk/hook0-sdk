# Hook0 Ruby SDK Reference

Complete API reference for the Hook0 Ruby SDK.


## Hook0SDK

### Constructor

```ruby
require_relative 'Hook0_sdk'

client = Hook0SDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = Hook0SDK.test
```


### Instance Methods

#### `Application(data = nil)`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationSecret(data = nil)`

Create a new `ApplicationSecret` entity instance. Pass `nil` for no initial data.

#### `EmailPreference(data = nil)`

Create a new `EmailPreference` entity instance. Pass `nil` for no initial data.

#### `Error(data = nil)`

Create a new `Error` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `EventType(data = nil)`

Create a new `EventType` entity instance. Pass `nil` for no initial data.

#### `EventsManagement(data = nil)`

Create a new `EventsManagement` entity instance. Pass `nil` for no initial data.

#### `Health(data = nil)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Hook0(data = nil)`

Create a new `Hook0` entity instance. Pass `nil` for no initial data.

#### `IngestedEvent(data = nil)`

Create a new `IngestedEvent` entity instance. Pass `nil` for no initial data.

#### `Instance(data = nil)`

Create a new `Instance` entity instance. Pass `nil` for no initial data.

#### `Login(data = nil)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Organization(data = nil)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationEditRole(data = nil)`

Create a new `OrganizationEditRole` entity instance. Pass `nil` for no initial data.

#### `Quota(data = nil)`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `Registration(data = nil)`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `RequestAttempt(data = nil)`

Create a new `RequestAttempt` entity instance. Pass `nil` for no initial data.

#### `Response(data = nil)`

Create a new `Response` entity instance. Pass `nil` for no initial data.

#### `Revoke(data = nil)`

Create a new `Revoke` entity instance. Pass `nil` for no initial data.

#### `ServiceToken(data = nil)`

Create a new `ServiceToken` entity instance. Pass `nil` for no initial data.

#### `Subscription(data = nil)`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `UserAuthentication(data = nil)`

Create a new `UserAuthentication` entity instance. Pass `nil` for no initial data.

#### `UserInvitation(data = nil)`

Create a new `UserInvitation` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ApplicationEntity

```ruby
application = client.Application
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Integer` | Yes |  |
| `application_id` | `String` | Yes | Unique identifier of the application. |
| `application_name` | `String` | Yes |  |
| `consumption` | `Hash` | Yes | Current consumption metrics for this application. |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `Boolean` | Yes |  |
| `name` | `String` | Yes | Name of the application. |
| `onboarding_steps` | `Hash` | Yes | Onboarding completion status for this application. |
| `organization_id` | `String` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Hash` | Yes | Quota limits for this application. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Application.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Application.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Application.load({ "id" => "application_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Application.remove({ "id" => "application_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Application.update({
  "id" => "application_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ApplicationSecretEntity

```ruby
application_secret = client.ApplicationSecret
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ApplicationSecret.create({
  "application_id" => "example_application_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ApplicationSecret.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ApplicationSecret.remove({ "id" => "application_secret_id", "application_id" => "application_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ApplicationSecret.update({
  "id" => "application_secret_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApplicationSecretEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailPreferenceEntity

```ruby
email_preference = client.EmailPreference
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EmailPreference.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailPreferenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ErrorEntity

```ruby
error = client.Error
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `String` | Yes |  |
| `id` | `String` | Yes | Identifier of the problem that occurred, stable across releases |
| `status` | `Integer` | Yes |  |
| `title` | `String` | Yes |  |
| `type` | `String` | Yes | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Hash` | No | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Error.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ErrorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `String` | Yes |  |
| `event_type_name` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `labels` | `Hash` | Yes |  |
| `metadata` | `Hash` | No |  |
| `occurred_at` | `String` | Yes |  |
| `payload` | `String` | Yes |  |
| `payload_content_type` | `String` | Yes |  |
| `received_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Event.create({
  "id" => "example_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Event.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Event.load({ "id" => "event_id", "application_id" => "application_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventTypeEntity

```ruby
event_type = client.EventType
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EventType.create({
  "application_id" => "example_application_id", # String
  "resource_type" => "example_resource_type", # String
  "service" => "example_service", # String
  "verb" => "example_verb", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EventType.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EventType.load({ "id" => "event_type_id", "application_id" => "application_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.EventType.remove({ "id" => "event_type_id", "application_id" => "application_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventsManagementEntity

```ruby
events_management = client.EventsManagement
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EventsManagement.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventsManagementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HealthEntity

```ruby
health = client.Health
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `Boolean` | Yes |  |
| `database_duration_ms` | `Integer` | Yes |  |
| `object_storage` | `Boolean` | No |  |
| `object_storage_duration_ms` | `Integer` | No |  |
| `pulsar` | `Boolean` | No |  |
| `pulsar_duration_ms` | `Integer` | No |  |
| `total_duration_ms` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Health.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Hook0Entity

```ruby
hook0 = client.Hook0
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Hook0.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `Hook0Entity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IngestedEventEntity

```ruby
ingested_event = client.IngestedEvent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes | UUID of the application this event belongs to. |
| `event_id` | `String` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Hash` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Hash` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String` | Yes | Timestamp when the event occurred. |
| `payload` | `String` | Yes | The event payload. |
| `payload_content_type` | `String` | Yes | Content type of the payload. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.IngestedEvent.create({
  "application_id" => "example_application_id", # String
  "event_type" => "example_event_type", # String
  "labels" => {}, # Hash
  "occurred_at" => "example_occurred_at", # String
  "payload" => "example_payload", # String
  "payload_content_type" => "example_payload_content_type", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IngestedEventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InstanceEntity

```ruby
instance = client.Instance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `Boolean` | Yes |  |
| `auto_db_migration` | `Boolean` | Yes |  |
| `biscuit_public_key` | `String` | Yes |  |
| `cloudflare_turnstile_site_key` | `String` | No |  |
| `formbricks` | `Hash` | Yes |  |
| `matomo` | `Hash` | Yes |  |
| `password_minimum_length` | `Integer` | Yes |  |
| `quota_enforcement` | `Boolean` | Yes |  |
| `registration_disabled` | `Boolean` | Yes |  |
| `support_email_address` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Instance.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InstanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LoginEntity

```ruby
login = client.Login
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Login.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationEntity

```ruby
organization = client.Organization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Integer` | Yes |  |
| `application_id` | `String` | Yes |  |
| `application_name` | `String` | Yes |  |
| `consumption` | `Hash` | Yes |  |
| `date` | `String` | Yes |  |
| `id` | `String` | No |  |
| `is_provisional` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |
| `onboarding_steps` | `Hash` | Yes |  |
| `organization_id` | `String` | Yes |  |
| `plan` | `Hash` | Yes |  |
| `quotas` | `Hash` | Yes |  |
| `role` | `String` | Yes |  |
| `users` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Organization.create({
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Organization.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Organization.load({ "id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Organization.remove({ "id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Organization.update({
  "id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationEditRoleEntity

```ruby
organization_edit_role = client.OrganizationEditRole
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `role` | `String` | Yes |  |
| `user_id` | `String` | Yes |  |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.OrganizationEditRole.update({
  "id" => "id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationEditRoleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QuotaEntity

```ruby
quota = client.Quota
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `Boolean` | Yes |  |
| `limits` | `Hash` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Quota.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistrationEntity

```ruby
registration = client.Registration
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Registration.create({
  "email" => "example_email", # String
  "first_name" => "example_first_name", # String
  "last_name" => "example_last_name", # String
  "password" => "example_password", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RequestAttemptEntity

```ruby
request_attempt = client.RequestAttempt
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `delay_until` | `String` | No |  |
| `event` | `Hash` | Yes |  |
| `event_id` | `String` | Yes |  |
| `failed_at` | `String` | No |  |
| `http_response_status` | `Integer` | No |  |
| `id` | `String` | No |  |
| `picked_at` | `String` | No |  |
| `request_attempt_id` | `String` | Yes |  |
| `response_id` | `String` | No |  |
| `retry_count` | `Integer` | Yes |  |
| `status` | `Hash` | Yes | Status of a request attempt. |
| `subscription` | `Hash` | Yes |  |
| `succeeded_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.RequestAttempt.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.RequestAttempt.load({ "id" => "request_attempt_id", "application_id" => "application_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RequestAttemptEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResponseEntity

```ruby
response = client.Response
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `String` | No |  |
| `elapsed_time_ms` | `Integer` | No |  |
| `headers` | `Hash` | No |  |
| `http_code` | `Integer` | No |  |
| `id` | `String` | No |  |
| `response_error_name` | `String` | No |  |
| `response_id` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Response.load({ "id" => "response_id", "application_id" => "application_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RevokeEntity

```ruby
revoke = client.Revoke
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Revoke.remove({ "organization_id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RevokeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ServiceTokenEntity

```ruby
service_token = client.ServiceToken
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ServiceToken.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ServiceToken.list({ "organization_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ServiceToken.load({ "id" => "service_token_id", "organization_id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ServiceToken.remove({ "id" => "service_token_id", "organization_id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ServiceToken.update({
  "id" => "service_token_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ServiceTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubscriptionEntity

```ruby
subscription = client.Subscription
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dedicated_workers` | `Array` | Yes |  |
| `description` | `String` | No |  |
| `event_types` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `is_enabled` | `Boolean` | Yes |  |
| `label_key` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Hash` | Yes |  |
| `metadata` | `Hash` | Yes |  |
| `secret` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |
| `target` | `Hash` | Yes |  |
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Subscription.create({
  "application_id" => "example_application_id", # String
  "event_types" => [], # Array
  "is_enabled" => true, # Boolean
  "target" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Subscription.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Subscription.load({ "id" => "subscription_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Subscription.remove({ "id" => "subscription_id", "application_id" => "application_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Subscription.update({
  "id" => "subscription_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserAuthenticationEntity

```ruby
user_authentication = client.UserAuthentication
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current_password` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `new_password` | `String` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.UserAuthentication.create({
  "current_password" => "example_current_password", # String
  "email" => "example_email", # String
  "new_password" => "example_new_password", # String
  "token" => "example_token", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserAuthenticationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserInvitationEntity

```ruby
user_invitation = client.UserInvitation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `role` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.UserInvitation.create({
  "organization_id" => "example_organization_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserInvitationEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = Hook0SDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
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

