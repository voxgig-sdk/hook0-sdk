# Hook0 TypeScript SDK Reference

Complete API reference for the Hook0 TypeScript SDK.


## Hook0SDK

### Constructor

```ts
new Hook0SDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = Hook0SDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `Hook0SDK` instance in test mode.


### Instance Methods

#### `Application(data?: object)`

Create a new `Application` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationEntity` instance.

#### `ApplicationSecret(data?: object)`

Create a new `ApplicationSecret` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationSecretEntity` instance.

#### `ApplicationsManagement(data?: object)`

Create a new `ApplicationsManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationsManagementEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `EventType(data?: object)`

Create a new `EventType` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventTypeEntity` instance.

#### `EventsManagement(data?: object)`

Create a new `EventsManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventsManagementEntity` instance.

#### `EventsPerDayEntry(data?: object)`

Create a new `EventsPerDayEntry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventsPerDayEntryEntity` instance.

#### `Health(data?: object)`

Create a new `Health` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthEntity` instance.

#### `Hook0(data?: object)`

Create a new `Hook0` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Hook0Entity` instance.

#### `IngestedEvent(data?: object)`

Create a new `IngestedEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IngestedEventEntity` instance.

#### `Instance(data?: object)`

Create a new `Instance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InstanceEntity` instance.

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `Organization(data?: object)`

Create a new `Organization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEntity` instance.

#### `OrganizationEditRole(data?: object)`

Create a new `OrganizationEditRole` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEditRoleEntity` instance.

#### `Problem(data?: object)`

Create a new `Problem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProblemEntity` instance.

#### `Quota(data?: object)`

Create a new `Quota` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuotaEntity` instance.

#### `Registration(data?: object)`

Create a new `Registration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegistrationEntity` instance.

#### `RequestAttempt(data?: object)`

Create a new `RequestAttempt` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RequestAttemptEntity` instance.

#### `Response(data?: object)`

Create a new `Response` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResponseEntity` instance.

#### `Revoke(data?: object)`

Create a new `Revoke` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RevokeEntity` instance.

#### `ServiceToken(data?: object)`

Create a new `ServiceToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ServiceTokenEntity` instance.

#### `Subscription(data?: object)`

Create a new `Subscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubscriptionEntity` instance.

#### `UserAuthentication(data?: object)`

Create a new `UserAuthentication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserAuthenticationEntity` instance.

#### `UserInvitation(data?: object)`

Create a new `UserInvitation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserInvitationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `Hook0SDK.test()`.

**Returns:** `Hook0SDK` instance in test mode.


---

## ApplicationEntity

```ts
const application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes | Unique identifier of the application. |
| `consumption` | `Record<string, any>` | Yes | Current consumption metrics for this application. |
| `id` | `string` | No |  |
| `name` | `string` | Yes | Name of the application. |
| `onboarding_steps` | `Record<string, any>` | Yes | Onboarding completion status for this application. |
| `organization_id` | `string` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Record<string, any>` | Yes | Quota limits for this application. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Application().create({
  application_id: 'example_application_id',
  consumption: {},
  name: 'example_name',
  onboarding_steps: {},
  organization_id: 'example_organization_id',
  quotas: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Application().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Application().load({ id: 'application_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Application().remove({ id: 'application_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Application().update({
  id: 'application_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApplicationSecretEntity

```ts
const application_secret = client.ApplicationSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApplicationSecret().create({
  application_id: 'example_application_id',
  created_at: 'example_created_at',
  token: 'example_token',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApplicationSecret().list({ application_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApplicationSecret().update({
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationSecretEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApplicationsManagementEntity

```ts
const applications_management = client.ApplicationsManagement()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApplicationsManagement().remove({ application_secret_token: 'application_secret_token', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationsManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `labels` | `Record<string, any>` | Yes |  |
| `metadata` | `Record<string, any>` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `replay` | `/api/v1/events/{event_id}/replay` | `client.Event().create({ $action: 'replay', ... })` |

An action returns that action's OWN response, which is not necessarily a
Event record — check the API definition for its shape.

```ts
const result = await client.Event().create({
  $action: 'replay',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Event().create({
  id: 'example_id',
  application_id: 'example_application_id',
  event_id: 'example_event_id',
  event_type_name: 'example_event_type_name',
  ip: 'example_ip',
  labels: {},
  occurred_at: 'example_occurred_at',
  payload: 'example_payload',
  payload_content_type: 'example_payload_content_type',
  received_at: 'example_received_at',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list({ application_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Event().load({ id: 'event_id', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventTypeEntity

```ts
const event_type = client.EventType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `id` | `string` | No |  |
| `resource_type` | `string` | Yes |  |
| `resource_type_name` | `string` | Yes |  |
| `service` | `string` | Yes |  |
| `service_name` | `string` | Yes |  |
| `verb` | `string` | Yes |  |
| `verb_name` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EventType().create({
  application_id: 'example_application_id',
  event_type_name: 'example_event_type_name',
  resource_type: 'example_resource_type',
  resource_type_name: 'example_resource_type_name',
  service: 'example_service',
  service_name: 'example_service_name',
  verb: 'example_verb',
  verb_name: 'example_verb_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventType().list({ application_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventType().load({ id: 'event_type_id', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventTypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventsManagementEntity

```ts
const events_management = client.EventsManagement()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventsManagement().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.EventsManagement().remove({ event_type_name: 'event_type_name', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventsManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventsPerDayEntryEntity

```ts
const events_per_day_entry = client.EventsPerDayEntry()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventsPerDayEntry().list({ application_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventsPerDayEntryEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthEntity

```ts
const health = client.Health()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Health().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Hook0Entity

```ts
const hook0 = client.Hook0()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Hook0().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Hook0Entity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IngestedEventEntity

```ts
const ingested_event = client.IngestedEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes | UUID of the application this event belongs to. |
| `event_id` | `string` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `string` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Record<string, any>` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Record<string, any>` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `string` | Yes | Timestamp when the event occurred. |
| `payload` | `string` | Yes | The event payload. |
| `payload_content_type` | `string` | Yes | Content type of the payload. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.IngestedEvent().create({
  application_id: 'example_application_id',
  event_type: 'example_event_type',
  labels: {},
  occurred_at: 'example_occurred_at',
  payload: 'example_payload',
  payload_content_type: 'example_payload_content_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IngestedEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InstanceEntity

```ts
const instance = client.Instance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `boolean` | Yes |  |
| `auto_db_migration` | `boolean` | Yes |  |
| `biscuit_public_key` | `string` | Yes |  |
| `cloudflare_turnstile_site_key` | `string` | No |  |
| `formbricks` | `Record<string, any>` | Yes |  |
| `matomo` | `Record<string, any>` | Yes |  |
| `password_minimum_length` | `number` | Yes |  |
| `quota_enforcement` | `boolean` | Yes |  |
| `registration_disabled` | `boolean` | Yes |  |
| `support_email_address` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Instance().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoginEntity

```ts
const login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `password` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Login().create({
  email: 'example_email',
  password: 'example_password',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEntity

```ts
const organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `Record<string, any>` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `Record<string, any>` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `Record<string, any>` | Yes |  |
| `quotas` | `Record<string, any>` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Organization().create({
  consumption: {},
  name: 'example_name',
  onboarding_steps: {},
  organization_id: 'example_organization_id',
  plan: {},
  quotas: {},
  role: 'example_role',
  users: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Organization().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Organization().load({ id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Organization().remove({ id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Organization().update({
  id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEditRoleEntity

```ts
const organization_edit_role = client.OrganizationEditRole()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `invite` | `/api/v1/organizations/{organization_id}/invite` | `client.OrganizationEditRole().update({ $action: 'invite', ... })` |

An action returns that action's OWN response, which is not necessarily a
OrganizationEditRole record — check the API definition for its shape.

```ts
const result = await client.OrganizationEditRole().update({
  $action: 'invite',
  /* ...the action's own arguments */
})
```

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OrganizationEditRole().update({
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEditRoleEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProblemEntity

```ts
const problem = client.Problem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `number` | Yes |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Problem().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProblemEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuotaEntity

```ts
const quota = client.Quota()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `global_applications_per_organization_limit` | `number` | Yes |  |
| `global_days_of_events_retention_limit` | `number` | Yes |  |
| `global_event_types_per_application_limit` | `number` | Yes |  |
| `global_events_per_day_limit` | `number` | Yes |  |
| `global_members_per_organization_limit` | `number` | Yes |  |
| `global_subscriptions_per_application_limit` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Quota().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuotaEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegistrationEntity

```ts
const registration = client.Registration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `first_name` | `string` | Yes |  |
| `gclid` | `string` | No | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `turnstile_token` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Registration().create({
  email: 'example_email',
  first_name: 'example_first_name',
  last_name: 'example_last_name',
  password: 'example_password',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RequestAttemptEntity

```ts
const request_attempt = client.RequestAttempt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `delay_until` | `string` | No |  |
| `event` | `Record<string, any>` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `number` | No |  |
| `id` | `string` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `number` | Yes |  |
| `status` | `Record<string, any>` | Yes | Status of a request attempt. |
| `subscription` | `Record<string, any>` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RequestAttempt().list({ application_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RequestAttempt().load({ id: 'request_attempt_id', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RequestAttemptEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResponseEntity

```ts
const response = client.Response()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Response().load({ id: 'response_id', application_id: 'application_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResponseEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RevokeEntity

```ts
const revoke = client.Revoke()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Revoke().remove({ organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RevokeEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ServiceTokenEntity

```ts
const service_token = client.ServiceToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `token_id` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ServiceToken().create({
  biscuit: 'example_biscuit',
  created_at: 'example_created_at',
  name: 'example_name',
  organization_id: 'example_organization_id',
  token_id: 'example_token_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ServiceToken().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ServiceToken().load({ id: 'service_token_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ServiceToken().remove({ id: 'service_token_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ServiceToken().update({
  id: 'service_token_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ServiceTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubscriptionEntity

```ts
const subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dedicated_workers` | `any[]` | Yes |  |
| `description` | `string` | No |  |
| `event_types` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `is_enabled` | `boolean` | Yes |  |
| `label_key` | `string` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `string` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Record<string, any>` | Yes |  |
| `metadata` | `Record<string, any>` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `Record<string, any>` | Yes |  |
| `updated_at` | `string` | Yes |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Subscription().create({
  application_id: 'example_application_id',
  created_at: 'example_created_at',
  dedicated_workers: [],
  event_types: [],
  is_enabled: true,
  label_key: 'example_label_key',
  label_value: 'example_label_value',
  labels: {},
  metadata: {},
  secret: 'example_secret',
  subscription_id: 'example_subscription_id',
  target: {},
  updated_at: 'example_updated_at',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Subscription().list({ application_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Subscription().load({ id: 'subscription_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Subscription().remove({ id: 'subscription_id', application_id: 'application_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Subscription().update({
  id: 'subscription_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserAuthenticationEntity

```ts
const user_authentication = client.UserAuthentication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `new_password` | `string` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UserAuthentication().create({
  email: 'example_email',
  new_password: 'example_new_password',
  token: 'example_token',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserAuthenticationEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserInvitationEntity

```ts
const user_invitation = client.UserInvitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UserInvitation().create({
  organization_id: 'example_organization_id',
  email: 'example_email',
  role: 'example_role',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserInvitationEntity` instance with the same client and
options.

#### `client()`

Return the parent `Hook0SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new Hook0SDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Request/response capture ring buffer for debugging.

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

Idempotency keys for safe retries of mutating operations.

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

Statistics capture: per-operation counters and latency.

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

Pagination signals for list operations.

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

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

#### `test`

In-memory mock transport for testing without a live server.

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

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
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

