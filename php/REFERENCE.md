# Hook0 PHP SDK Reference

Complete API reference for the Hook0 PHP SDK.


## Hook0SDK

### Constructor

```php
require_once __DIR__ . '/hook0_sdk.php';

$client = new Hook0SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = Hook0SDK::test();
```


### Instance Methods

#### `Application($data = null)`

Create a new `ApplicationEntity` instance. Pass `null` for no initial data.

#### `ApplicationSecret($data = null)`

Create a new `ApplicationSecretEntity` instance. Pass `null` for no initial data.

#### `ApplicationsManagement($data = null)`

Create a new `ApplicationsManagementEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `EventType($data = null)`

Create a new `EventTypeEntity` instance. Pass `null` for no initial data.

#### `EventsManagement($data = null)`

Create a new `EventsManagementEntity` instance. Pass `null` for no initial data.

#### `EventsPerDayEntry($data = null)`

Create a new `EventsPerDayEntryEntity` instance. Pass `null` for no initial data.

#### `Health($data = null)`

Create a new `HealthEntity` instance. Pass `null` for no initial data.

#### `Hook0($data = null)`

Create a new `Hook0Entity` instance. Pass `null` for no initial data.

#### `IngestedEvent($data = null)`

Create a new `IngestedEventEntity` instance. Pass `null` for no initial data.

#### `Instance($data = null)`

Create a new `InstanceEntity` instance. Pass `null` for no initial data.

#### `Login($data = null)`

Create a new `LoginEntity` instance. Pass `null` for no initial data.

#### `Organization($data = null)`

Create a new `OrganizationEntity` instance. Pass `null` for no initial data.

#### `OrganizationEditRole($data = null)`

Create a new `OrganizationEditRoleEntity` instance. Pass `null` for no initial data.

#### `Problem($data = null)`

Create a new `ProblemEntity` instance. Pass `null` for no initial data.

#### `Quota($data = null)`

Create a new `QuotaEntity` instance. Pass `null` for no initial data.

#### `Registration($data = null)`

Create a new `RegistrationEntity` instance. Pass `null` for no initial data.

#### `RequestAttempt($data = null)`

Create a new `RequestAttemptEntity` instance. Pass `null` for no initial data.

#### `Response($data = null)`

Create a new `ResponseEntity` instance. Pass `null` for no initial data.

#### `Revoke($data = null)`

Create a new `RevokeEntity` instance. Pass `null` for no initial data.

#### `ServiceToken($data = null)`

Create a new `ServiceTokenEntity` instance. Pass `null` for no initial data.

#### `Subscription($data = null)`

Create a new `SubscriptionEntity` instance. Pass `null` for no initial data.

#### `UserAuthentication($data = null)`

Create a new `UserAuthenticationEntity` instance. Pass `null` for no initial data.

#### `UserInvitation($data = null)`

Create a new `UserInvitationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): Hook0Utility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ApplicationEntity

```php
$application = $client->Application();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `consumption` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `array` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `quota` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Application()->create([
  "application_id" => null, // string
  "consumption" => null, // array
  "name" => null, // string
  "onboarding_steps" => null, // array
  "organization_id" => null, // string
  "quota" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Application()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Application()->load(["id" => "application_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Application()->remove(["id" => "application_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Application()->update([
  "id" => "application_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApplicationEntity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ApplicationSecretEntity

```php
$application_secret = $client->ApplicationSecret();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ApplicationSecret()->create([
  "application_id" => null, // string
  "created_at" => null, // string
  "token" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ApplicationSecret()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ApplicationSecret()->update([
  "id" => "id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApplicationSecretEntity`

Create a new `ApplicationSecretEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ApplicationsManagementEntity

```php
$applications_management = $client->ApplicationsManagement();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ApplicationsManagement()->remove(["application_secret_token" => "application_secret_token"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApplicationsManagementEntity`

Create a new `ApplicationsManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `labels` | `array` | Yes |  |
| `metadata` | `array` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Event()->load(["id" => "event_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventTypeEntity

```php
$event_type = $client->EventType();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->EventType()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EventType()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EventType()->load(["id" => "event_type_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventTypeEntity`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventsManagementEntity

```php
$events_management = $client->EventsManagement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->EventsManagement()->create([
  "event_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EventsManagement()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->EventsManagement()->remove(["event_type_name" => "event_type_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventsManagementEntity`

Create a new `EventsManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventsPerDayEntryEntity

```php
$events_per_day_entry = $client->EventsPerDayEntry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `int` | Yes |  |
| `application_id` | `string` | Yes |  |
| `application_name` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `is_provisional` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EventsPerDayEntry()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventsPerDayEntryEntity`

Create a new `EventsPerDayEntryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthEntity

```php
$health = $client->Health();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `bool` | Yes |  |
| `database_duration_ms` | `int` | Yes |  |
| `object_storage` | `bool` | No |  |
| `object_storage_duration_ms` | `int` | No |  |
| `pulsar` | `bool` | No |  |
| `pulsar_duration_ms` | `int` | No |  |
| `total_duration_ms` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Health()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthEntity`

Create a new `HealthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Hook0Entity

```php
$hook0 = $client->Hook0();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `string` | No |  |
| `description` | `string` | No |  |
| `env_var` | `string` | Yes |  |
| `group` | `string` | No |  |
| `name` | `string` | Yes |  |
| `required` | `bool` | Yes |  |
| `sensitive` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Hook0()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): Hook0Entity`

Create a new `Hook0Entity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IngestedEventEntity

```php
$ingested_event = $client->IngestedEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_id` | `string` | No |  |
| `event_type` | `string` | Yes |  |
| `labels` | `array` | Yes |  |
| `metadata` | `array` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->IngestedEvent()->create([
  "application_id" => null, // string
  "event_type" => null, // string
  "labels" => null, // array
  "occurred_at" => null, // string
  "payload" => null, // string
  "payload_content_type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IngestedEventEntity`

Create a new `IngestedEventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InstanceEntity

```php
$instance = $client->Instance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `string` | Yes |  |
| `cloudflare_turnstile_site_key` | `string` | No |  |
| `formbricks` | `array` | Yes |  |
| `matomo` | `array` | Yes |  |
| `password_minimum_length` | `int` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Instance()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InstanceEntity`

Create a new `InstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LoginEntity

```php
$login = $client->Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Login()->create([
  "email" => null, // string
  "password" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LoginEntity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEntity

```php
$organization = $client->Organization();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `array` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `array` | Yes |  |
| `quota` | `array` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Organization()->create([
  "consumption" => null, // array
  "name" => null, // string
  "onboarding_steps" => null, // array
  "organization_id" => null, // string
  "plan" => null, // array
  "quota" => null, // array
  "role" => null, // string
  "users" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Organization()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Organization()->load(["id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Organization()->remove(["id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Organization()->update([
  "id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEntity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEditRoleEntity

```php
$organization_edit_role = $client->OrganizationEditRole();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->OrganizationEditRole()->update([
  "id" => "id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEditRoleEntity`

Create a new `OrganizationEditRoleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProblemEntity

```php
$problem = $client->Problem();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `int` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Problem()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProblemEntity`

Create a new `ProblemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuotaEntity

```php
$quota = $client->Quota();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | Yes |  |
| `limits` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Quota()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuotaEntity`

Create a new `QuotaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegistrationEntity

```php
$registration = $client->Registration();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Registration()->create([
  "email" => null, // string
  "first_name" => null, // string
  "last_name" => null, // string
  "password" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegistrationEntity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RequestAttemptEntity

```php
$request_attempt = $client->RequestAttempt();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `delay_until` | `string` | No |  |
| `event` | `array` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `int` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `int` | Yes |  |
| `status` | `array` | Yes |  |
| `subscription` | `array` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RequestAttempt()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RequestAttempt()->load(["id" => "request_attempt_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RequestAttemptEntity`

Create a new `RequestAttemptEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResponseEntity

```php
$response = $client->Response();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string` | No |  |
| `elapsed_time_ms` | `int` | No |  |
| `headers` | `array` | No |  |
| `http_code` | `int` | No |  |
| `response_error_name` | `string` | No |  |
| `response_id` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Response()->load(["id" => "response_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResponseEntity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RevokeEntity

```php
$revoke = $client->Revoke();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Revoke()->remove(["organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RevokeEntity`

Create a new `RevokeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ServiceTokenEntity

```php
$service_token = $client->ServiceToken();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ServiceToken()->create([
  "biscuit" => null, // string
  "created_at" => null, // string
  "name" => null, // string
  "organization_id" => null, // string
  "token_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ServiceToken()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ServiceToken()->load(["id" => "service_token_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ServiceToken()->remove(["id" => "service_token_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ServiceToken()->update([
  "id" => "service_token_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ServiceTokenEntity`

Create a new `ServiceTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubscriptionEntity

```php
$subscription = $client->Subscription();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dedicated_workers` | `array` | Yes |  |
| `description` | `string` | No |  |
| `event_type` | `array` | Yes |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `string` | Yes |  |
| `label_value` | `string` | Yes |  |
| `labels` | `array` | Yes |  |
| `metadata` | `array` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Subscription()->create([
  "application_id" => null, // string
  "created_at" => null, // string
  "dedicated_workers" => null, // array
  "event_type" => null, // array
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Subscription()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Subscription()->load(["id" => "subscription_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Subscription()->remove(["id" => "subscription_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Subscription()->update([
  "id" => "subscription_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubscriptionEntity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserAuthenticationEntity

```php
$user_authentication = $client->UserAuthentication();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `new_password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UserAuthentication()->create([
  "email" => null, // string
  "new_password" => null, // string
  "token" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserAuthenticationEntity`

Create a new `UserAuthenticationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserInvitationEntity

```php
$user_invitation = $client->UserInvitation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UserInvitation()->create([
  "organization_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserInvitationEntity`

Create a new `UserInvitationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new Hook0SDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

