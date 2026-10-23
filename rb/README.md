# Hook0 Ruby SDK



The Ruby SDK for the Hook0 API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Application` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hook0-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/hook0-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-hook0-sdk", path: "./hook0-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Hook0_sdk"

client = Hook0SDK.new({
  "apikey" => ENV["HOOK0_APIKEY"],
})
```

### 2. List application records

```ruby
begin
  # list returns an Array of Application entities, one per record; data_get reads the record.
  applications = client.Application.list({ "organization_id" => "example" })
  applications.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["amount"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an application

```ruby
begin
  # load returns the ENTITY — call data_get for the Application record (raises on error).
  application = client.Application.load({ "id" => "example_id" })
  puts application.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Application record.
created = client.Application.create({ "name" => "example_name", "organization_id" => "example_organization_id" })

# Update — index the record via data_get (created.data_get["id"]).
client.Application.update({ "id" => created.data_get["id"], "name" => "example_name", "organization_id" => "example_organization_id" })

# Remove
client.Application.remove({ "id" => created.data_get["id"] })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  response = client.Response.load({ "id" => "example_id", "application_id" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = Hook0SDK.test({
  "entity" => { "response" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
response = client.Response.load({ "id" => "test01", "application_id" => "example" })
puts response.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = Hook0SDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### Hook0SDK

```ruby
require_relative "Hook0_sdk"
client = Hook0SDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = Hook0SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Application` | `(data) -> ApplicationEntity` | Create an Application entity instance. |
| `ApplicationSecret` | `(data) -> ApplicationSecretEntity` | Create an ApplicationSecret entity instance. |
| `EmailPreference` | `(data) -> EmailPreferenceEntity` | Create an EmailPreference entity instance. |
| `Error` | `(data) -> ErrorEntity` | Create an Error entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `EventType` | `(data) -> EventTypeEntity` | Create an EventType entity instance. |
| `EventsManagement` | `(data) -> EventsManagementEntity` | Create an EventsManagement entity instance. |
| `Health` | `(data) -> HealthEntity` | Create a Health entity instance. |
| `Hook0` | `(data) -> Hook0Entity` | Create a Hook0 entity instance. |
| `IngestedEvent` | `(data) -> IngestedEventEntity` | Create an IngestedEvent entity instance. |
| `Instance` | `(data) -> InstanceEntity` | Create an Instance entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationEditRole` | `(data) -> OrganizationEditRoleEntity` | Create an OrganizationEditRole entity instance. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`Hook0Error` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `application = client.Application`

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
| `amount` | `Integer` |  |
| `application_id` | `String` | Unique identifier of the application. |
| `application_name` | `String` |  |
| `consumption` | `Hash` | Current consumption metrics for this application. |
| `date` | `String` |  |
| `id` | `String` |  |
| `is_provisional` | `Boolean` |  |
| `name` | `String` | Name of the application. |
| `onboarding_steps` | `Hash` | Onboarding completion status for this application. |
| `organization_id` | `String` | UUID of the organization this application belongs to. |
| `quotas` | `Hash` | Quota limits for this application. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Application record (raises on error).
application = client.Application.load({ "id" => "application_id" })
```

#### Example: List

```ruby
# list returns an Array of Application entities, one per record (raises on error).
applications = client.Application.list({ "organization_id" => "example" })
applications.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
application = client.Application.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
})
```


### ApplicationSecret

Create an instance: `application_secret = client.ApplicationSecret`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

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

```ruby
# list returns an Array of ApplicationSecret entities, one per record (raises on error).
application_secrets = client.ApplicationSecret.list({ "application_id" => "example" })
application_secrets.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
application_secret = client.ApplicationSecret.create({
  "application_id" => "example_application_id", # String
})
```


### EmailPreference

Create an instance: `email_preference = client.EmailPreference`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
email_preference = client.EmailPreference.create({
})
```


### Error

Create an instance: `error = client.Error`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `String` |  |
| `id` | `String` | Identifier of the problem that occurred, stable across releases |
| `status` | `Integer` |  |
| `title` | `String` |  |
| `type` | `String` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Hash` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

#### Example: List

```ruby
# list returns an Array of Error entities, one per record (raises on error).
errors = client.Error.list
errors.each { |item| puts item.data_get }
```


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `String` |  |
| `event_type_name` | `String` |  |
| `id` | `String` |  |
| `ip` | `String` |  |
| `labels` | `Hash` |  |
| `metadata` | `Hash` |  |
| `occurred_at` | `String` |  |
| `payload` | `String` |  |
| `payload_content_type` | `String` |  |
| `received_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Event record (raises on error).
event = client.Event.load({ "id" => "event_id", "application_id" => "application_id" })
```

#### Example: List

```ruby
# list returns an Array of Event entities, one per record (raises on error).
events = client.Event.list({ "application_id" => "example" })
events.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
event = client.Event.create({
  "id" => "example_id", # String
})
```


### EventType

Create an instance: `event_type = client.EventType`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

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

```ruby
# load returns the ENTITY — call data_get for the EventType record (raises on error).
event_type = client.EventType.load({ "id" => "event_type_id", "application_id" => "application_id" })
```

#### Example: List

```ruby
# list returns an Array of EventType entities, one per record (raises on error).
event_types = client.EventType.list({ "application_id" => "example" })
event_types.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
event_type = client.EventType.create({
  "application_id" => "example_application_id", # String
  "resource_type" => "example_resource_type", # String
  "service" => "example_service", # String
  "verb" => "example_verb", # String
})
```


### EventsManagement

Create an instance: `events_management = client.EventsManagement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of EventsManagement entities, one per record (raises on error).
events_managements = client.EventsManagement.list
events_managements.each { |item| puts item.data_get }
```


### Health

Create an instance: `health = client.Health`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `Boolean` |  |
| `database_duration_ms` | `Integer` |  |
| `object_storage` | `Boolean` |  |
| `object_storage_duration_ms` | `Integer` |  |
| `pulsar` | `Boolean` |  |
| `pulsar_duration_ms` | `Integer` |  |
| `total_duration_ms` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Health record (raises on error).
health = client.Health.load()
```


### Hook0

Create an instance: `hook0 = client.Hook0`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ruby
# list returns an Array of Hook0 entities, one per record (raises on error).
hook0s = client.Hook0.list
hook0s.each { |item| puts item.data_get }
```


### IngestedEvent

Create an instance: `ingested_event = client.IngestedEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `String` | UUID of the application this event belongs to. |
| `event_id` | `String` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `String` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Hash` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Hash` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `String` | Timestamp when the event occurred. |
| `payload` | `String` | The event payload. |
| `payload_content_type` | `String` | Content type of the payload. |

#### Example: Create

```ruby
ingested_event = client.IngestedEvent.create({
  "application_id" => "example_application_id", # String
  "event_type" => "example_event_type", # String
  "labels" => {}, # Hash
  "occurred_at" => "example_occurred_at", # String
  "payload" => "example_payload", # String
  "payload_content_type" => "example_payload_content_type", # String
})
```


### Instance

Create an instance: `instance = client.Instance`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `Boolean` |  |
| `auto_db_migration` | `Boolean` |  |
| `biscuit_public_key` | `String` |  |
| `cloudflare_turnstile_site_key` | `String` |  |
| `formbricks` | `Hash` |  |
| `matomo` | `Hash` |  |
| `password_minimum_length` | `Integer` |  |
| `quota_enforcement` | `Boolean` |  |
| `registration_disabled` | `Boolean` |  |
| `support_email_address` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Instance record (raises on error).
instance = client.Instance.load()
```


### Login

Create an instance: `login = client.Login`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```ruby
login = client.Login.create({
  "email" => "example_email", # String
  "password" => "example_password", # String
  "token" => "example_token", # String
})
```


### Organization

Create an instance: `organization = client.Organization`

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
| `amount` | `Integer` |  |
| `application_id` | `String` |  |
| `application_name` | `String` |  |
| `consumption` | `Hash` |  |
| `date` | `String` |  |
| `id` | `String` |  |
| `is_provisional` | `Boolean` |  |
| `name` | `String` |  |
| `onboarding_steps` | `Hash` |  |
| `organization_id` | `String` |  |
| `plan` | `Hash` |  |
| `quotas` | `Hash` |  |
| `role` | `String` |  |
| `users` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Organization record (raises on error).
organization = client.Organization.load({ "id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Organization entities, one per record (raises on error).
organizations = client.Organization.list
organizations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
organization = client.Organization.create({
  "name" => "example_name", # String
})
```


### OrganizationEditRole

Create an instance: `organization_edit_role = client.OrganizationEditRole`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `role` | `String` |  |
| `user_id` | `String` |  |


### Quota

Create an instance: `quota = client.Quota`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `Boolean` |  |
| `limits` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Quota record (raises on error).
quota = client.Quota.load()
```


### Registration

Create an instance: `registration = client.Registration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

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

```ruby
registration = client.Registration.create({
  "email" => "example_email", # String
  "first_name" => "example_first_name", # String
  "last_name" => "example_last_name", # String
  "password" => "example_password", # String
})
```


### RequestAttempt

Create an instance: `request_attempt = client.RequestAttempt`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `delay_until` | `String` |  |
| `event` | `Hash` |  |
| `event_id` | `String` |  |
| `failed_at` | `String` |  |
| `http_response_status` | `Integer` |  |
| `id` | `String` |  |
| `picked_at` | `String` |  |
| `request_attempt_id` | `String` |  |
| `response_id` | `String` |  |
| `retry_count` | `Integer` |  |
| `status` | `Hash` | Status of a request attempt. |
| `subscription` | `Hash` |  |
| `succeeded_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RequestAttempt record (raises on error).
request_attempt = client.RequestAttempt.load({ "id" => "request_attempt_id", "application_id" => "application_id" })
```

#### Example: List

```ruby
# list returns an Array of RequestAttempt entities, one per record (raises on error).
request_attempts = client.RequestAttempt.list({ "application_id" => "example" })
request_attempts.each { |item| puts item.data_get }
```


### Response

Create an instance: `response = client.Response`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String` |  |
| `elapsed_time_ms` | `Integer` |  |
| `headers` | `Hash` |  |
| `http_code` | `Integer` |  |
| `id` | `String` |  |
| `response_error_name` | `String` |  |
| `response_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Response record (raises on error).
response = client.Response.load({ "id" => "response_id", "application_id" => "application_id" })
```


### Revoke

Create an instance: `revoke = client.Revoke`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `service_token = client.ServiceToken`

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
| `biscuit` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `token_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ServiceToken record (raises on error).
service_token = client.ServiceToken.load({ "id" => "service_token_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of ServiceToken entities, one per record (raises on error).
service_tokens = client.ServiceToken.list({ "organization_id" => "example" })
service_tokens.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
service_token = client.ServiceToken.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
})
```


### Subscription

Create an instance: `subscription = client.Subscription`

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
| `application_id` | `String` |  |
| `created_at` | `String` |  |
| `dedicated_workers` | `Array` |  |
| `description` | `String` |  |
| `event_types` | `Array` |  |
| `id` | `String` |  |
| `is_enabled` | `Boolean` |  |
| `label_key` | `String` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `String` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Hash` |  |
| `metadata` | `Hash` |  |
| `secret` | `String` |  |
| `subscription_id` | `String` |  |
| `target` | `Hash` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Subscription record (raises on error).
subscription = client.Subscription.load({ "id" => "subscription_id" })
```

#### Example: List

```ruby
# list returns an Array of Subscription entities, one per record (raises on error).
subscriptions = client.Subscription.list({ "application_id" => "example" })
subscriptions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
subscription = client.Subscription.create({
  "application_id" => "example_application_id", # String
  "event_types" => [], # Array
  "is_enabled" => true, # Boolean
  "target" => {}, # Hash
})
```


### UserAuthentication

Create an instance: `user_authentication = client.UserAuthentication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_password` | `String` |  |
| `email` | `String` |  |
| `new_password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```ruby
user_authentication = client.UserAuthentication.create({
  "current_password" => "example_current_password", # String
  "email" => "example_email", # String
  "new_password" => "example_new_password", # String
  "token" => "example_token", # String
})
```


### UserInvitation

Create an instance: `user_invitation = client.UserInvitation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `role` | `String` |  |

#### Example: Create

```ruby
user_invitation = client.UserInvitation.create({
  "organization_id" => "example_organization_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Hook0_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Hook0_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
response = client.Response
response.load({ "id" => "example_id", "application_id" => "example" })

# response.data_get now returns the response data from the last load
# response.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
