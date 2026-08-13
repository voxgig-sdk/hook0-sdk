# Hook0 PHP SDK



The PHP SDK for the Hook0 API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Application()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/hook0-sdk/releases](https://github.com/voxgig-sdk/hook0-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'hook0_sdk.php';

$client = new Hook0SDK([
    "apikey" => getenv("HOOK0_APIKEY"),
]);
```

### 2. List application records

```php
try {
    // list() returns an array of Application records — iterate directly.
    $applications = $client->Application()->list();
    foreach ($applications as $item) {
        echo $item["application_id"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an application

```php
try {
    // load() returns the ENTITY — call data_get() for the Application record (throws on error).
    $application = $client->Application()->load(["id" => "example_id"]);
    print_r($application);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Application record.
$created = $client->Application()->create(["application_id" => "example_application_id", "consumption" => [], "name" => "example_name", "onboarding_steps" => [], "organization_id" => "example_organization_id", "quotas" => []]);

// Update
$client->Application()->update(["id" => "example_id", "application_id" => "example_application_id", "consumption" => []]);

// Remove
$client->Application()->remove(["id" => "example_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $applications = $client->Application()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = Hook0SDK::test([
    "entity" => ["application" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$application = $client->Application()->list();
print_r($application);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new Hook0SDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### Hook0SDK

```php
require_once 'hook0_sdk.php';
$client = new Hook0SDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = Hook0SDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Application` | `($data): ApplicationEntity` | Create an Application entity instance. |
| `ApplicationSecret` | `($data): ApplicationSecretEntity` | Create an ApplicationSecret entity instance. |
| `ApplicationsManagement` | `($data): ApplicationsManagementEntity` | Create an ApplicationsManagement entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `EventType` | `($data): EventTypeEntity` | Create an EventType entity instance. |
| `EventsManagement` | `($data): EventsManagementEntity` | Create an EventsManagement entity instance. |
| `EventsPerDayEntry` | `($data): EventsPerDayEntryEntity` | Create an EventsPerDayEntry entity instance. |
| `Health` | `($data): HealthEntity` | Create a Health entity instance. |
| `Hook0` | `($data): Hook0Entity` | Create a Hook0 entity instance. |
| `IngestedEvent` | `($data): IngestedEventEntity` | Create an IngestedEvent entity instance. |
| `Instance` | `($data): InstanceEntity` | Create an Instance entity instance. |
| `Login` | `($data): LoginEntity` | Create a Login entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationEditRole` | `($data): OrganizationEditRoleEntity` | Create an OrganizationEditRole entity instance. |
| `Problem` | `($data): ProblemEntity` | Create a Problem entity instance. |
| `Quota` | `($data): QuotaEntity` | Create a Quota entity instance. |
| `Registration` | `($data): RegistrationEntity` | Create a Registration entity instance. |
| `RequestAttempt` | `($data): RequestAttemptEntity` | Create a RequestAttempt entity instance. |
| `Response` | `($data): ResponseEntity` | Create a Response entity instance. |
| `Revoke` | `($data): RevokeEntity` | Create a Revoke entity instance. |
| `ServiceToken` | `($data): ServiceTokenEntity` | Create a ServiceToken entity instance. |
| `Subscription` | `($data): SubscriptionEntity` | Create a Subscription entity instance. |
| `UserAuthentication` | `($data): UserAuthenticationEntity` | Create an UserAuthentication entity instance. |
| `UserInvitation` | `($data): UserInvitationEntity` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$application = $client->Application();`

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
| `consumption` | `array` |  |
| `name` | `string` |  |
| `onboarding_steps` | `array` |  |
| `organization_id` | `string` |  |
| `quotas` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Application record (throws on error).
$application = $client->Application()->load(["id" => "application_id"]);
```

#### Example: List

```php
// list() returns an array of Application records (throws on error).
$applications = $client->Application()->list();
```

#### Example: Create

```php
$application = $client->Application()->create([
    "application_id" => null, // string
    "consumption" => null, // array
    "name" => null, // string
    "onboarding_steps" => null, // array
    "organization_id" => null, // string
    "quotas" => null, // array
]);
```


### ApplicationSecret

Create an instance: `$application_secret = $client->ApplicationSecret();`

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

```php
// list() returns an array of ApplicationSecret records (throws on error).
$application_secrets = $client->ApplicationSecret()->list();
```

#### Example: Create

```php
$application_secret = $client->ApplicationSecret()->create([
    "application_id" => null, // string
    "created_at" => null, // string
    "token" => null, // string
]);
```


### ApplicationsManagement

Create an instance: `$applications_management = $client->ApplicationsManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Event

Create an instance: `$event = $client->Event();`

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
| `labels` | `array` |  |
| `metadata` | `array` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |
| `received_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Event record (throws on error).
$event = $client->Event()->load(["id" => "event_id"]);
```

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```


### EventType

Create an instance: `$event_type = $client->EventType();`

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

```php
// load() returns the ENTITY — call data_get() for the EventType record (throws on error).
$event_type = $client->EventType()->load(["id" => "event_type_id"]);
```

#### Example: List

```php
// list() returns an array of EventType records (throws on error).
$event_types = $client->EventType()->list();
```

#### Example: Create

```php
$event_type = $client->EventType()->create([
    "application_id" => null, // string
    "event_type_name" => null, // string
    "resource_type" => null, // string
    "resource_type_name" => null, // string
    "service" => null, // string
    "service_name" => null, // string
    "verb" => null, // string
    "verb_name" => null, // string
]);
```


### EventsManagement

Create an instance: `$events_management = $client->EventsManagement();`

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

```php
// list() returns an array of EventsManagement records (throws on error).
$events_managements = $client->EventsManagement()->list();
```

#### Example: Create

```php
$events_management = $client->EventsManagement()->create([
    "event_id" => null, // string
    "application_id" => null, // string
]);
```


### EventsPerDayEntry

Create an instance: `$events_per_day_entry = $client->EventsPerDayEntry();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `int` |  |
| `application_id` | `string` |  |
| `application_name` | `string` |  |
| `date` | `string` |  |
| `is_provisional` | `bool` |  |

#### Example: List

```php
// list() returns an array of EventsPerDayEntry records (throws on error).
$events_per_day_entrys = $client->EventsPerDayEntry()->list();
```


### Health

Create an instance: `$health = $client->Health();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `bool` |  |
| `database_duration_ms` | `int` |  |
| `object_storage` | `bool` |  |
| `object_storage_duration_ms` | `int` |  |
| `pulsar` | `bool` |  |
| `pulsar_duration_ms` | `int` |  |
| `total_duration_ms` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Health record (throws on error).
$health = $client->Health()->load();
```


### Hook0

Create an instance: `$hook0 = $client->Hook0();`

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
| `required` | `bool` |  |
| `sensitive` | `bool` |  |

#### Example: List

```php
// list() returns an array of Hook0 records (throws on error).
$hook0s = $client->Hook0()->list();
```


### IngestedEvent

Create an instance: `$ingested_event = $client->IngestedEvent();`

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
| `labels` | `array` |  |
| `metadata` | `array` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |

#### Example: Create

```php
$ingested_event = $client->IngestedEvent()->create([
    "application_id" => null, // string
    "event_type" => null, // string
    "labels" => null, // array
    "occurred_at" => null, // string
    "payload" => null, // string
    "payload_content_type" => null, // string
]);
```


### Instance

Create an instance: `$instance = $client->Instance();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `string` |  |
| `cloudflare_turnstile_site_key` | `string` |  |
| `formbricks` | `array` |  |
| `matomo` | `array` |  |
| `password_minimum_length` | `int` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Instance record (throws on error).
$instance = $client->Instance()->load();
```


### Login

Create an instance: `$login = $client->Login();`

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

```php
$login = $client->Login()->create([
    "email" => null, // string
    "password" => null, // string
]);
```


### Organization

Create an instance: `$organization = $client->Organization();`

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
| `consumption` | `array` |  |
| `name` | `string` |  |
| `onboarding_steps` | `array` |  |
| `organization_id` | `string` |  |
| `plan` | `array` |  |
| `quotas` | `array` |  |
| `role` | `string` |  |
| `users` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Organization record (throws on error).
$organization = $client->Organization()->load(["id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Organization records (throws on error).
$organizations = $client->Organization()->list();
```

#### Example: Create

```php
$organization = $client->Organization()->create([
    "consumption" => null, // array
    "name" => null, // string
    "onboarding_steps" => null, // array
    "organization_id" => null, // string
    "plan" => null, // array
    "quotas" => null, // array
    "role" => null, // string
    "users" => null, // array
]);
```


### OrganizationEditRole

Create an instance: `$organization_edit_role = $client->OrganizationEditRole();`

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

Create an instance: `$problem = $client->Problem();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `id` | `string` |  |
| `status` | `int` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of Problem records (throws on error).
$problems = $client->Problem()->list();
```


### Quota

Create an instance: `$quota = $client->Quota();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `global_applications_per_organization_limit` | `int` |  |
| `global_days_of_events_retention_limit` | `int` |  |
| `global_event_types_per_application_limit` | `int` |  |
| `global_events_per_day_limit` | `int` |  |
| `global_members_per_organization_limit` | `int` |  |
| `global_subscriptions_per_application_limit` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Quota record (throws on error).
$quota = $client->Quota()->load();
```


### Registration

Create an instance: `$registration = $client->Registration();`

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

```php
$registration = $client->Registration()->create([
    "email" => null, // string
    "first_name" => null, // string
    "last_name" => null, // string
    "password" => null, // string
]);
```


### RequestAttempt

Create an instance: `$request_attempt = $client->RequestAttempt();`

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
| `event` | `array` |  |
| `event_id` | `string` |  |
| `failed_at` | `string` |  |
| `http_response_status` | `int` |  |
| `picked_at` | `string` |  |
| `request_attempt_id` | `string` |  |
| `response_id` | `string` |  |
| `retry_count` | `int` |  |
| `status` | `array` |  |
| `subscription` | `array` |  |
| `succeeded_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RequestAttempt record (throws on error).
$request_attempt = $client->RequestAttempt()->load(["id" => "request_attempt_id"]);
```

#### Example: List

```php
// list() returns an array of RequestAttempt records (throws on error).
$request_attempts = $client->RequestAttempt()->list();
```


### Response

Create an instance: `$response = $client->Response();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Response record (throws on error).
$response = $client->Response()->load(["id" => "response_id"]);
```


### Revoke

Create an instance: `$revoke = $client->Revoke();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `$service_token = $client->ServiceToken();`

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

```php
// load() returns the ENTITY — call data_get() for the ServiceToken record (throws on error).
$service_token = $client->ServiceToken()->load(["id" => "service_token_id"]);
```

#### Example: List

```php
// list() returns an array of ServiceToken records (throws on error).
$service_tokens = $client->ServiceToken()->list();
```

#### Example: Create

```php
$service_token = $client->ServiceToken()->create([
    "biscuit" => null, // string
    "created_at" => null, // string
    "name" => null, // string
    "organization_id" => null, // string
    "token_id" => null, // string
]);
```


### Subscription

Create an instance: `$subscription = $client->Subscription();`

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
| `dedicated_workers` | `array` |  |
| `description` | `string` |  |
| `event_types` | `array` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `string` |  |
| `label_value` | `string` |  |
| `labels` | `array` |  |
| `metadata` | `array` |  |
| `secret` | `string` |  |
| `subscription_id` | `string` |  |
| `target` | `array` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Subscription record (throws on error).
$subscription = $client->Subscription()->load(["id" => "subscription_id"]);
```

#### Example: List

```php
// list() returns an array of Subscription records (throws on error).
$subscriptions = $client->Subscription()->list();
```

#### Example: Create

```php
$subscription = $client->Subscription()->create([
    "application_id" => null, // string
    "created_at" => null, // string
    "dedicated_workers" => null, // array
    "event_types" => null, // array
    "is_enabled" => null, // bool
    "label_key" => null, // string
    "label_value" => null, // string
    "labels" => null, // array
    "metadata" => null, // array
    "secret" => null, // string
    "subscription_id" => null, // string
    "target" => null, // array
    "updated_at" => null, // string
]);
```


### UserAuthentication

Create an instance: `$user_authentication = $client->UserAuthentication();`

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

```php
$user_authentication = $client->UserAuthentication()->create([
    "email" => null, // string
    "new_password" => null, // string
    "token" => null, // string
]);
```


### UserInvitation

Create an instance: `$user_invitation = $client->UserInvitation();`

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

```php
$user_invitation = $client->UserInvitation()->create([
    "organization_id" => null, // string
    "email" => null, // string
    "role" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── hook0_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`hook0_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$application = $client->Application();
$application->list();

// $application->data_get() now returns the application data from the last list
// $application->match_get() returns the last match criteria
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
