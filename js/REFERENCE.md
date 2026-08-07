# Hook0 JavaScript SDK Reference

Complete API reference for the Hook0 JavaScript SDK.


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
| `application_id` | `string` | Yes |  |
| `consumption` | `Object` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `Object` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `quota` | `Object` | Yes |  |

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
  quota: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Application().list()
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
const results = await client.ApplicationSecret().list()
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
const result = await client.ApplicationsManagement().remove({ application_secret_token: 'application_secret_token' })
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
| `event_id` | `string` | Yes |  |
| `event_type_name` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `labels` | `Object` | Yes |  |
| `metadata` | `Object` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |
| `received_at` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Event().load({ id: 'event_id' })
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
const results = await client.EventType().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventType().load({ id: 'event_type_id' })
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EventsManagement().create({
  event_id: 'example_event_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EventsManagement().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.EventsManagement().remove({ event_type_name: 'event_type_name' })
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
const results = await client.EventsPerDayEntry().list()
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
| `application_id` | `string` | Yes |  |
| `event_id` | `string` | No |  |
| `event_type` | `string` | Yes |  |
| `labels` | `Object` | Yes |  |
| `metadata` | `Object` | No |  |
| `occurred_at` | `string` | Yes |  |
| `payload` | `string` | Yes |  |
| `payload_content_type` | `string` | Yes |  |

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
| `formbricks` | `Object` | Yes |  |
| `matomo` | `Object` | Yes |  |
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
| `consumption` | `Object` | Yes |  |
| `name` | `string` | Yes |  |
| `onboarding_steps` | `Object` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `plan` | `Object` | Yes |  |
| `quota` | `Object` | Yes |  |
| `role` | `string` | Yes |  |
| `users` | `Array` | Yes |  |

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
  quota: {},
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
| `role` | `string` | Yes |  |
| `user_id` | `string` | Yes |  |

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
| `enabled` | `boolean` | Yes |  |
| `limits` | `Object` | Yes |  |

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
| `gclid` | `string` | No |  |
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
| `event` | `Object` | Yes |  |
| `event_id` | `string` | Yes |  |
| `failed_at` | `string` | No |  |
| `http_response_status` | `number` | No |  |
| `picked_at` | `string` | No |  |
| `request_attempt_id` | `string` | Yes |  |
| `response_id` | `string` | No |  |
| `retry_count` | `number` | Yes |  |
| `status` | `Object` | Yes |  |
| `subscription` | `Object` | Yes |  |
| `succeeded_at` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RequestAttempt().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RequestAttempt().load({ id: 'request_attempt_id' })
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
| `body` | `string` | No |  |
| `elapsed_time_ms` | `number` | No |  |
| `headers` | `Object` | No |  |
| `http_code` | `number` | No |  |
| `response_error_name` | `string` | No |  |
| `response_id` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Response().load({ id: 'response_id' })
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
const results = await client.ServiceToken().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ServiceToken().load({ id: 'service_token_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ServiceToken().remove({ id: 'service_token_id' })
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
| `dedicated_workers` | `Array` | Yes |  |
| `description` | `string` | No |  |
| `event_type` | `Array` | Yes |  |
| `is_enabled` | `boolean` | Yes |  |
| `label_key` | `string` | Yes |  |
| `label_value` | `string` | Yes |  |
| `labels` | `Object` | Yes |  |
| `metadata` | `Object` | Yes |  |
| `secret` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `target` | `Object` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Subscription().create({
  application_id: 'example_application_id',
  created_at: 'example_created_at',
  dedicated_workers: [],
  event_type: [],
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
const results = await client.Subscription().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Subscription().load({ id: 'subscription_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Subscription().remove({ id: 'subscription_id' })
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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new Hook0SDK({
  feature: {
    test: { active: true },
  }
})
```

