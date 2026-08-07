# Hook0 Lua SDK Reference

Complete API reference for the Hook0 Lua SDK.


## Hook0SDK

### Constructor

```lua
local sdk = require("hook0_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Application(data)`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationSecret(data)`

Create a new `ApplicationSecret` entity instance. Pass `nil` for no initial data.

#### `ApplicationsManagement(data)`

Create a new `ApplicationsManagement` entity instance. Pass `nil` for no initial data.

#### `Event(data)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `EventType(data)`

Create a new `EventType` entity instance. Pass `nil` for no initial data.

#### `EventsManagement(data)`

Create a new `EventsManagement` entity instance. Pass `nil` for no initial data.

#### `EventsPerDayEntry(data)`

Create a new `EventsPerDayEntry` entity instance. Pass `nil` for no initial data.

#### `Health(data)`

Create a new `Health` entity instance. Pass `nil` for no initial data.

#### `Hook0(data)`

Create a new `Hook0` entity instance. Pass `nil` for no initial data.

#### `IngestedEvent(data)`

Create a new `IngestedEvent` entity instance. Pass `nil` for no initial data.

#### `Instance(data)`

Create a new `Instance` entity instance. Pass `nil` for no initial data.

#### `Login(data)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Organization(data)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationEditRole(data)`

Create a new `OrganizationEditRole` entity instance. Pass `nil` for no initial data.

#### `Problem(data)`

Create a new `Problem` entity instance. Pass `nil` for no initial data.

#### `Quota(data)`

Create a new `Quota` entity instance. Pass `nil` for no initial data.

#### `Registration(data)`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `RequestAttempt(data)`

Create a new `RequestAttempt` entity instance. Pass `nil` for no initial data.

#### `Response(data)`

Create a new `Response` entity instance. Pass `nil` for no initial data.

#### `Revoke(data)`

Create a new `Revoke` entity instance. Pass `nil` for no initial data.

#### `ServiceToken(data)`

Create a new `ServiceToken` entity instance. Pass `nil` for no initial data.

#### `Subscription(data)`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `UserAuthentication(data)`

Create a new `UserAuthentication` entity instance. Pass `nil` for no initial data.

#### `UserInvitation(data)`

Create a new `UserInvitation` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ApplicationEntity

```lua
local application = client:Application(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `consumption` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `table` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `quota` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Application():create({
  application_id = --[[ string ]],
  consumption = --[[ table ]],
  name = --[[ string ]],
  onboarding_steps = --[[ table ]],
  organization_id = --[[ string ]],
  quota = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Application():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Application():load({ id = "application_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Application():remove({ id = "application_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Application():update({
  id = "application_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ApplicationSecretEntity

```lua
local application_secret = client:ApplicationSecret(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ApplicationSecret():create({
  application_id = --[[ string ]],
  created_at = --[[ string ]],
  token = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ApplicationSecret():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ApplicationSecret():update({
  id = "id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationSecretEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ApplicationsManagementEntity

```lua
local applications_management = client:ApplicationsManagement(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ApplicationsManagement():remove({ application_secret_token = "application_secret_token" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationsManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventEntity

```lua
local event = client:Event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `labels` | `table` | Yes |  |
| `metadata` | `table` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Event():load({ id = "event_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventTypeEntity

```lua
local event_type = client:EventType(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:EventType():create({
  application_id = --[[ string ]],
  event_type_name = --[[ string ]],
  resource_type = --[[ string ]],
  resource_type_name = --[[ string ]],
  service = --[[ string ]],
  service_name = --[[ string ]],
  verb = --[[ string ]],
  verb_name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EventType():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:EventType():load({ id = "event_type_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventsManagementEntity

```lua
local events_management = client:EventsManagement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:EventsManagement():create({
  event_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EventsManagement():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:EventsManagement():remove({ event_type_name = "event_type_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventsPerDayEntryEntity

```lua
local events_per_day_entry = client:EventsPerDayEntry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes |  |
| `application_id` | `string` | Yes |  |
| `application_name` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `is_provisional` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EventsPerDayEntry():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsPerDayEntryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HealthEntity

```lua
local health = client:Health(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `boolean` | Yes |  |
| `database_duration_ms` | `number` | Yes |  |
| `object_storage` | `boolean` | No |  |
| `object_storage_duration_ms` | `number` | No |  |
| `pulsar` | `boolean` | No |  |
| `pulsar_duration_ms` | `number` | No |  |
| `total_duration_ms` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Health():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Hook0Entity

```lua
local hook0 = client:Hook0(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `string` | No |  |
| `description` | `string` | No |  |
| `env_var` | `string` | Yes |  |
| `group` | `string` | No |  |
| `name` | `string` | Yes |  |
| `required` | `boolean` | Yes |  |
| `sensitive` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Hook0():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Hook0Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IngestedEventEntity

```lua
local ingested_event = client:IngestedEvent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_id` | `string` | No |  |
| `event_type` | `string` | Yes |  |
| `labels` | `table` | Yes |  |
| `metadata` | `table` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:IngestedEvent():create({
  application_id = --[[ string ]],
  event_type = --[[ string ]],
  labels = --[[ table ]],
  occurred_at = --[[ string ]],
  payload = --[[ string ]],
  payload_content_type = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IngestedEventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InstanceEntity

```lua
local instance = client:Instance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `boolean` | Yes |  |
| `auto_db_migration` | `boolean` | Yes |  |
| `biscuit_public_key` | `string` | Yes |  |
| `cloudflare_turnstile_site_key` | `string` | No |  |
| `formbricks` | `table` | Yes |  |
| `matomo` | `table` | Yes |  |
| `password_minimum_length` | `number` | Yes |  |
| `quota_enforcement` | `boolean` | Yes |  |
| `registration_disabled` | `boolean` | Yes |  |
| `support_email_address` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Instance():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LoginEntity

```lua
local login = client:Login(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Login():create({
  email = --[[ string ]],
  password = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganizationEntity

```lua
local organization = client:Organization(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `table` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `table` | Yes |  |
| `quota` | `table` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Organization():create({
  consumption = --[[ table ]],
  name = --[[ string ]],
  onboarding_steps = --[[ table ]],
  organization_id = --[[ string ]],
  plan = --[[ table ]],
  quota = --[[ table ]],
  role = --[[ string ]],
  users = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Organization():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Organization():load({ id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Organization():remove({ id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Organization():update({
  id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganizationEditRoleEntity

```lua
local organization_edit_role = client:OrganizationEditRole(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:OrganizationEditRole():update({
  id = "id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEditRoleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProblemEntity

```lua
local problem = client:Problem(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `number` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Problem():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProblemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QuotaEntity

```lua
local quota = client:Quota(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | Yes |  |
| `limits` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Quota():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegistrationEntity

```lua
local registration = client:Registration(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Registration():create({
  email = --[[ string ]],
  first_name = --[[ string ]],
  last_name = --[[ string ]],
  password = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RequestAttemptEntity

```lua
local request_attempt = client:RequestAttempt(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `delay_until` | `string` | No |  |
| `event` | `table` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `number` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `number` | Yes |  |
| `status` | `table` | Yes |  |
| `subscription` | `table` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RequestAttempt():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RequestAttempt():load({ id = "request_attempt_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RequestAttemptEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResponseEntity

```lua
local response = client:Response(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string` | No |  |
| `elapsed_time_ms` | `number` | No |  |
| `headers` | `table` | No |  |
| `http_code` | `number` | No |  |
| `response_error_name` | `string` | No |  |
| `response_id` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Response():load({ id = "response_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RevokeEntity

```lua
local revoke = client:Revoke(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Revoke():remove({ organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RevokeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ServiceTokenEntity

```lua
local service_token = client:ServiceToken(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ServiceToken():create({
  biscuit = --[[ string ]],
  created_at = --[[ string ]],
  name = --[[ string ]],
  organization_id = --[[ string ]],
  token_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ServiceToken():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ServiceToken():load({ id = "service_token_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ServiceToken():remove({ id = "service_token_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ServiceToken():update({
  id = "service_token_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SubscriptionEntity

```lua
local subscription = client:Subscription(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dedicated_workers` | `table` | Yes |  |
| `description` | `string` | No |  |
| `event_type` | `table` | Yes |  |
| `is_enabled` | `boolean` | Yes |  |
| `label_key` | `string` | Yes |  |
| `label_value` | `string` | Yes |  |
| `labels` | `table` | Yes |  |
| `metadata` | `table` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `table` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Subscription():create({
  application_id = --[[ string ]],
  created_at = --[[ string ]],
  dedicated_workers = --[[ table ]],
  event_type = --[[ table ]],
  is_enabled = --[[ boolean ]],
  label_key = --[[ string ]],
  label_value = --[[ string ]],
  labels = --[[ table ]],
  metadata = --[[ table ]],
  secret = --[[ string ]],
  subscription_id = --[[ string ]],
  target = --[[ table ]],
  updated_at = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Subscription():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Subscription():load({ id = "subscription_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Subscription():remove({ id = "subscription_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Subscription():update({
  id = "subscription_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserAuthenticationEntity

```lua
local user_authentication = client:UserAuthentication(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `new_password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:UserAuthentication():create({
  email = --[[ string ]],
  new_password = --[[ string ]],
  token = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAuthenticationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserInvitationEntity

```lua
local user_invitation = client:UserInvitation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:UserInvitation():create({
  organization_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInvitationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

