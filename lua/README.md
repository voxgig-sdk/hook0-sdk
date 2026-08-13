# Hook0 Lua SDK



The Lua SDK for the Hook0 API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Application()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hook0-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("hook0_sdk")

local client = sdk.new({
  apikey = os.getenv("HOOK0_APIKEY"),
})
```

### 2. List application records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local applications, err = client:Application():list()
if err then error(err) end

for _, item in ipairs(applications) do
  print(item["application_id"])
end
```

### 3. Load an application

```lua
local application, err = client:Application():load({ id = "example_id" })
if err then error(err) end
print(application)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Application():create({ application_id = "example_application_id", consumption = {}, name = "example_name", onboarding_steps = {}, organization_id = "example_organization_id", quotas = {} })
if err then error(err) end

-- Update
client:Application():update({ id = "example_id", application_id = "example_application_id", consumption = {} })

-- Remove
client:Application():remove({ id = "example_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local applications, err = client:Application():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Application():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### Hook0SDK

```lua
local sdk = require("hook0_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Application` | `(data) -> ApplicationEntity` | Create an Application entity instance. |
| `ApplicationSecret` | `(data) -> ApplicationSecretEntity` | Create an ApplicationSecret entity instance. |
| `ApplicationsManagement` | `(data) -> ApplicationsManagementEntity` | Create an ApplicationsManagement entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `EventType` | `(data) -> EventTypeEntity` | Create an EventType entity instance. |
| `EventsManagement` | `(data) -> EventsManagementEntity` | Create an EventsManagement entity instance. |
| `EventsPerDayEntry` | `(data) -> EventsPerDayEntryEntity` | Create an EventsPerDayEntry entity instance. |
| `Health` | `(data) -> HealthEntity` | Create a Health entity instance. |
| `Hook0` | `(data) -> Hook0Entity` | Create a Hook0 entity instance. |
| `IngestedEvent` | `(data) -> IngestedEventEntity` | Create an IngestedEvent entity instance. |
| `Instance` | `(data) -> InstanceEntity` | Create an Instance entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationEditRole` | `(data) -> OrganizationEditRoleEntity` | Create an OrganizationEditRole entity instance. |
| `Problem` | `(data) -> ProblemEntity` | Create a Problem entity instance. |
| `Quota` | `(data) -> QuotaEntity` | Create a Quota entity instance. |
| `Registration` | `(data) -> RegistrationEntity` | Create a Registration entity instance. |
| `RequestAttempt` | `(data) -> RequestAttemptEntity` | Create a RequestAttempt entity instance. |
| `Response` | `(data) -> ResponseEntity` | Create a Response entity instance. |
| `Revoke` | `(data) -> RevokeEntity` | Create a Revoke entity instance. |
| `ServiceToken` | `(data) -> ServiceTokenEntity` | Create a ServiceToken entity instance. |
| `Subscription` | `(data) -> SubscriptionEntity` | Create a Subscription entity instance. |
| `UserAuthentication` | `(data) -> UserAuthenticationEntity` | Create an UserAuthentication entity instance. |
| `UserInvitation` | `(data) -> UserInvitationEntity` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local application, err = client:Application():load({ id = "example_id" })
    if err then error(err) end
    -- application is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/applications/`

#### ApplicationSecret

| Field | Description |
| --- | --- |
| `application_id` |  |
| `created_at` |  |
| `deleted_at` |  |
| `name` |  |
| `token` |  |

Operations: Create, List, Update.

API path: `/api/v1/application_secrets/`

#### ApplicationsManagement

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: List, Load.

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

Operations: Create, List, Load.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |
| `application_id` |  |

Operations: Create, List, Remove.

API path: `/api/v1/events/{event_id}/replay`

#### EventsPerDayEntry

| Field | Description |
| --- | --- |
| `amount` |  |
| `application_id` |  |
| `application_name` |  |
| `date` |  |
| `is_provisional` |  |

Operations: List.

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
| `application_id` |  |
| `event_id` |  |
| `event_type` |  |
| `labels` |  |
| `metadata` |  |
| `occurred_at` |  |
| `payload` |  |
| `payload_content_type` |  |

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

Operations: Create.

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

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/`

#### OrganizationEditRole

| Field | Description |
| --- | --- |
| `role` |  |
| `user_id` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Problem

| Field | Description |
| --- | --- |
| `detail` |  |
| `id` |  |
| `status` |  |
| `title` |  |

Operations: List.

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

Operations: Load.

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
| `picked_at` |  |
| `request_attempt_id` |  |
| `response_id` |  |
| `retry_count` |  |
| `status` |  |
| `subscription` |  |
| `succeeded_at` |  |

Operations: List, Load.

API path: `/api/v1/request_attempts/`

#### Response

| Field | Description |
| --- | --- |

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
| `is_enabled` |  |
| `label_key` |  |
| `label_value` |  |
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

Create an instance: `local application = client:Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `consumption` | `table` |  |
| `name` | `string` |  |
| `onboarding_steps` | `table` |  |
| `organization_id` | `string` |  |
| `quotas` | `table` |  |

#### Example: Load

```lua
local application, err = client:Application():load({ id = "application_id" })
```

#### Example: List

```lua
local applications, err = client:Application():list()
```

#### Example: Create

```lua
local application, err = client:Application():create({
  application_id = "example_application_id", -- string
  consumption = {}, -- table
  name = "example_name", -- string
  onboarding_steps = {}, -- table
  organization_id = "example_organization_id", -- string
  quotas = {}, -- table
})
```


### ApplicationSecret

Create an instance: `local application_secret = client:ApplicationSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `deleted_at` | `string` |  |
| `name` | `string` |  |
| `token` | `string` |  |

#### Example: List

```lua
local application_secrets, err = client:ApplicationSecret():list()
```

#### Example: Create

```lua
local application_secret, err = client:ApplicationSecret():create({
  application_id = "example_application_id", -- string
  created_at = "example_created_at", -- string
  token = "example_token", -- string
})
```


### ApplicationsManagement

Create an instance: `local applications_management = client:ApplicationsManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `string` |  |
| `event_type_name` | `string` |  |
| `ip` | `string` |  |
| `labels` | `table` |  |
| `metadata` | `table` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |
| `received_at` | `string` |  |

#### Example: Load

```lua
local event, err = client:Event():load({ id = "event_id" })
```

#### Example: List

```lua
local events, err = client:Event():list()
```


### EventType

Create an instance: `local event_type = client:EventType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `event_type_name` | `string` |  |
| `resource_type` | `string` |  |
| `resource_type_name` | `string` |  |
| `service` | `string` |  |
| `service_name` | `string` |  |
| `verb` | `string` |  |
| `verb_name` | `string` |  |

#### Example: Load

```lua
local event_type, err = client:EventType():load({ id = "event_type_id" })
```

#### Example: List

```lua
local event_types, err = client:EventType():list()
```

#### Example: Create

```lua
local event_type, err = client:EventType():create({
  application_id = "example_application_id", -- string
  event_type_name = "example_event_type_name", -- string
  resource_type = "example_resource_type", -- string
  resource_type_name = "example_resource_type_name", -- string
  service = "example_service", -- string
  service_name = "example_service_name", -- string
  verb = "example_verb", -- string
  verb_name = "example_verb_name", -- string
})
```


### EventsManagement

Create an instance: `local events_management = client:EventsManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |

#### Example: List

```lua
local events_managements, err = client:EventsManagement():list()
```

#### Example: Create

```lua
local events_management, err = client:EventsManagement():create({
  event_id = "example_event_id", -- string
  application_id = "example_application_id", -- string
})
```


### EventsPerDayEntry

Create an instance: `local events_per_day_entry = client:EventsPerDayEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` |  |
| `application_id` | `string` |  |
| `application_name` | `string` |  |
| `date` | `string` |  |
| `is_provisional` | `boolean` |  |

#### Example: List

```lua
local events_per_day_entrys, err = client:EventsPerDayEntry():list()
```


### Health

Create an instance: `local health = client:Health(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `boolean` |  |
| `database_duration_ms` | `number` |  |
| `object_storage` | `boolean` |  |
| `object_storage_duration_ms` | `number` |  |
| `pulsar` | `boolean` |  |
| `pulsar_duration_ms` | `number` |  |
| `total_duration_ms` | `number` |  |

#### Example: Load

```lua
local health, err = client:Health():load()
```


### Hook0

Create an instance: `local hook0 = client:Hook0(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `string` |  |
| `description` | `string` |  |
| `env_var` | `string` |  |
| `group` | `string` |  |
| `name` | `string` |  |
| `required` | `boolean` |  |
| `sensitive` | `boolean` |  |

#### Example: List

```lua
local hook0s, err = client:Hook0():list()
```


### IngestedEvent

Create an instance: `local ingested_event = client:IngestedEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `event_id` | `string` |  |
| `event_type` | `string` |  |
| `labels` | `table` |  |
| `metadata` | `table` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |

#### Example: Create

```lua
local ingested_event, err = client:IngestedEvent():create({
  application_id = "example_application_id", -- string
  event_type = "example_event_type", -- string
  labels = {}, -- table
  occurred_at = "example_occurred_at", -- string
  payload = "example_payload", -- string
  payload_content_type = "example_payload_content_type", -- string
})
```


### Instance

Create an instance: `local instance = client:Instance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `boolean` |  |
| `auto_db_migration` | `boolean` |  |
| `biscuit_public_key` | `string` |  |
| `cloudflare_turnstile_site_key` | `string` |  |
| `formbricks` | `table` |  |
| `matomo` | `table` |  |
| `password_minimum_length` | `number` |  |
| `quota_enforcement` | `boolean` |  |
| `registration_disabled` | `boolean` |  |
| `support_email_address` | `string` |  |

#### Example: Load

```lua
local instance, err = client:Instance():load()
```


### Login

Create an instance: `local login = client:Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |

#### Example: Create

```lua
local login, err = client:Login():create({
  email = "example_email", -- string
  password = "example_password", -- string
})
```


### Organization

Create an instance: `local organization = client:Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consumption` | `table` |  |
| `name` | `string` |  |
| `onboarding_steps` | `table` |  |
| `organization_id` | `string` |  |
| `plan` | `table` |  |
| `quotas` | `table` |  |
| `role` | `string` |  |
| `users` | `table` |  |

#### Example: Load

```lua
local organization, err = client:Organization():load({ id = "organization_id" })
```

#### Example: List

```lua
local organizations, err = client:Organization():list()
```

#### Example: Create

```lua
local organization, err = client:Organization():create({
  consumption = {}, -- table
  name = "example_name", -- string
  onboarding_steps = {}, -- table
  organization_id = "example_organization_id", -- string
  plan = {}, -- table
  quotas = {}, -- table
  role = "example_role", -- string
  users = {}, -- table
})
```


### OrganizationEditRole

Create an instance: `local organization_edit_role = client:OrganizationEditRole(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `string` |  |
| `user_id` | `string` |  |


### Problem

Create an instance: `local problem = client:Problem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `id` | `string` |  |
| `status` | `number` |  |
| `title` | `string` |  |

#### Example: List

```lua
local problems, err = client:Problem():list()
```


### Quota

Create an instance: `local quota = client:Quota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `global_applications_per_organization_limit` | `number` |  |
| `global_days_of_events_retention_limit` | `number` |  |
| `global_event_types_per_application_limit` | `number` |  |
| `global_events_per_day_limit` | `number` |  |
| `global_members_per_organization_limit` | `number` |  |
| `global_subscriptions_per_application_limit` | `number` |  |

#### Example: Load

```lua
local quota, err = client:Quota():load()
```


### Registration

Create an instance: `local registration = client:Registration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `gclid` | `string` |  |
| `last_name` | `string` |  |
| `password` | `string` |  |
| `turnstile_token` | `string` |  |

#### Example: Create

```lua
local registration, err = client:Registration():create({
  email = "example_email", -- string
  first_name = "example_first_name", -- string
  last_name = "example_last_name", -- string
  password = "example_password", -- string
})
```


### RequestAttempt

Create an instance: `local request_attempt = client:RequestAttempt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `delay_until` | `string` |  |
| `event` | `table` |  |
| `event_id` | `string` |  |
| `failed_at` | `string` |  |
| `http_response_status` | `number` |  |
| `picked_at` | `string` |  |
| `request_attempt_id` | `string` |  |
| `response_id` | `string` |  |
| `retry_count` | `number` |  |
| `status` | `table` |  |
| `subscription` | `table` |  |
| `succeeded_at` | `string` |  |

#### Example: Load

```lua
local request_attempt, err = client:RequestAttempt():load({ id = "request_attempt_id" })
```

#### Example: List

```lua
local request_attempts, err = client:RequestAttempt():list()
```


### Response

Create an instance: `local response = client:Response(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local response, err = client:Response():load({ id = "response_id" })
```


### Revoke

Create an instance: `local revoke = client:Revoke(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `local service_token = client:ServiceToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `string` |  |
| `created_at` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `token_id` | `string` |  |

#### Example: Load

```lua
local service_token, err = client:ServiceToken():load({ id = "service_token_id" })
```

#### Example: List

```lua
local service_tokens, err = client:ServiceToken():list()
```

#### Example: Create

```lua
local service_token, err = client:ServiceToken():create({
  biscuit = "example_biscuit", -- string
  created_at = "example_created_at", -- string
  name = "example_name", -- string
  organization_id = "example_organization_id", -- string
  token_id = "example_token_id", -- string
})
```


### Subscription

Create an instance: `local subscription = client:Subscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `dedicated_workers` | `table` |  |
| `description` | `string` |  |
| `event_types` | `table` |  |
| `is_enabled` | `boolean` |  |
| `label_key` | `string` |  |
| `label_value` | `string` |  |
| `labels` | `table` |  |
| `metadata` | `table` |  |
| `secret` | `string` |  |
| `subscription_id` | `string` |  |
| `target` | `table` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local subscription, err = client:Subscription():load({ id = "subscription_id" })
```

#### Example: List

```lua
local subscriptions, err = client:Subscription():list()
```

#### Example: Create

```lua
local subscription, err = client:Subscription():create({
  application_id = "example_application_id", -- string
  created_at = "example_created_at", -- string
  dedicated_workers = {}, -- table
  event_types = {}, -- table
  is_enabled = true, -- boolean
  label_key = "example_label_key", -- string
  label_value = "example_label_value", -- string
  labels = {}, -- table
  metadata = {}, -- table
  secret = "example_secret", -- string
  subscription_id = "example_subscription_id", -- string
  target = {}, -- table
  updated_at = "example_updated_at", -- string
})
```


### UserAuthentication

Create an instance: `local user_authentication = client:UserAuthentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `new_password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```lua
local user_authentication, err = client:UserAuthentication():create({
  email = "example_email", -- string
  new_password = "example_new_password", -- string
  token = "example_token", -- string
})
```


### UserInvitation

Create an instance: `local user_invitation = client:UserInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```lua
local user_invitation, err = client:UserInvitation():create({
  organization_id = "example_organization_id", -- string
  email = "example_email", -- string
  role = "example_role", -- string
})
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── hook0_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`hook0_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local application = client:Application()
application:list()

-- application:data_get() now returns the application data from the last list
-- application:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
