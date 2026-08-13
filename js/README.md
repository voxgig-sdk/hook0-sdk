# Hook0 JavaScript SDK



The JavaScript SDK for the Hook0 API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Application()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install hook0
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { Hook0SDK } = require('@voxgig-sdk/hook0-js')

const client = new Hook0SDK({
  apikey: process.env.HOOK0_APIKEY,
})
```

### Load an Application

```js
const application = await client.Application().load({ id: 'application_id' })
console.log(application)
```

### List Application Records

```js
const applications = await client.Application().list()
for (const application of applications) {
  console.log(application)
}
```

### Create a Application

```js
const created = await client.Application().create({
  application_id: 'example_application_id',
  consumption: {},
  name: 'example_name',
  onboarding_steps: {},
  organization_id: 'example_organization_id',
  quotas: {},
})
console.log(created)
```

### Update a Application

```js
const updated = await client.Application().update({
  id: 'application_id',
  application_id: 'example_application_id',
  consumption: {},
})
console.log(updated)
```

### Remove a Application

```js
await client.Application().remove({ id: 'application_id' })
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const applications = await client.Application().list()
  console.log(applications)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = Hook0SDK.test()

const application = await client.Application().list()
// application is the entity, populated with mock response data
// — call application.data() for the record itself
console.log(application)
```

You can also use the instance method:

```js
const client = new Hook0SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.Application()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new Hook0SDK({
  apikey: '...',
  extend: [logger],
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
cd js && npm test
```


## Reference

### Hook0SDK

#### Constructor

```js
new Hook0SDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Application(data?)` | `ApplicationEntity` | Create an Application entity instance. |
| `ApplicationSecret(data?)` | `ApplicationSecretEntity` | Create an ApplicationSecret entity instance. |
| `ApplicationsManagement(data?)` | `ApplicationsManagementEntity` | Create an ApplicationsManagement entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `EventType(data?)` | `EventTypeEntity` | Create an EventType entity instance. |
| `EventsManagement(data?)` | `EventsManagementEntity` | Create an EventsManagement entity instance. |
| `EventsPerDayEntry(data?)` | `EventsPerDayEntryEntity` | Create an EventsPerDayEntry entity instance. |
| `Health(data?)` | `HealthEntity` | Create a Health entity instance. |
| `Hook0(data?)` | `Hook0Entity` | Create a Hook0 entity instance. |
| `IngestedEvent(data?)` | `IngestedEventEntity` | Create an IngestedEvent entity instance. |
| `Instance(data?)` | `InstanceEntity` | Create an Instance entity instance. |
| `Login(data?)` | `LoginEntity` | Create a Login entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationEditRole(data?)` | `OrganizationEditRoleEntity` | Create an OrganizationEditRole entity instance. |
| `Problem(data?)` | `ProblemEntity` | Create a Problem entity instance. |
| `Quota(data?)` | `QuotaEntity` | Create a Quota entity instance. |
| `Registration(data?)` | `RegistrationEntity` | Create a Registration entity instance. |
| `RequestAttempt(data?)` | `RequestAttemptEntity` | Create a RequestAttempt entity instance. |
| `Response(data?)` | `ResponseEntity` | Create a Response entity instance. |
| `Revoke(data?)` | `RevokeEntity` | Create a Revoke entity instance. |
| `ServiceToken(data?)` | `ServiceTokenEntity` | Create a ServiceToken entity instance. |
| `Subscription(data?)` | `SubscriptionEntity` | Create a Subscription entity instance. |
| `UserAuthentication(data?)` | `UserAuthenticationEntity` | Create an UserAuthentication entity instance. |
| `UserInvitation(data?)` | `UserInvitationEntity` | Create an UserInvitation entity instance. |
| `tester(testopts?, sdkopts?)` | `Hook0SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `Hook0SDK.test(testopts?, sdkopts?)` | `Hook0SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): Hook0SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `undefined`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

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

Operations: create, list, load, remove, update.

API path: `/api/v1/applications/`

#### ApplicationSecret

| Field | Description |
| --- | --- |
| `application_id` |  |
| `created_at` |  |
| `deleted_at` |  |
| `name` |  |
| `token` |  |

Operations: create, list, update.

API path: `/api/v1/application_secrets/`

#### ApplicationsManagement

| Field | Description |
| --- | --- |

Operations: remove.

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

Operations: list, load.

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

Operations: create, list, load.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |
| `application_id` |  |

Operations: create, list, remove.

API path: `/api/v1/events/{event_id}/replay`

#### EventsPerDayEntry

| Field | Description |
| --- | --- |
| `amount` |  |
| `application_id` |  |
| `application_name` |  |
| `date` |  |
| `is_provisional` |  |

Operations: list.

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

Operations: load.

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

Operations: list.

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

Operations: create.

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

Operations: load.

API path: `/api/v1/instance/`

#### Login

| Field | Description |
| --- | --- |
| `email` |  |
| `password` |  |

Operations: create.

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

Operations: create, list, load, remove, update.

API path: `/api/v1/organizations/`

#### OrganizationEditRole

| Field | Description |
| --- | --- |
| `role` |  |
| `user_id` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Problem

| Field | Description |
| --- | --- |
| `detail` |  |
| `id` |  |
| `status` |  |
| `title` |  |

Operations: list.

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

Operations: load.

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

Operations: create.

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

Operations: list, load.

API path: `/api/v1/request_attempts/`

#### Response

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/responses/{response_id}`

#### Revoke

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/api/v1/organizations/{organization_id}/invite`

#### ServiceToken

| Field | Description |
| --- | --- |
| `biscuit` |  |
| `created_at` |  |
| `name` |  |
| `organization_id` |  |
| `token_id` |  |

Operations: create, list, load, remove, update.

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

Operations: create, list, load, remove, update.

API path: `/api/v1/subscriptions/`

#### UserAuthentication

| Field | Description |
| --- | --- |
| `email` |  |
| `new_password` |  |
| `token` |  |

Operations: create.

API path: `/api/v1/auth/begin-reset-password`

#### UserInvitation

| Field | Description |
| --- | --- |
| `email` |  |
| `role` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/invite`



## Entities


### Application

Create an instance: `const application = client.Application()`

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
| `consumption` | `Object` |  |
| `name` | `string` |  |
| `onboarding_steps` | `Object` |  |
| `organization_id` | `string` |  |
| `quotas` | `Object` |  |

#### Example: Load

```ts
const application = await client.Application().load({ id: 'application_id' })
```

#### Example: List

```ts
const applications = await client.Application().list()
```

#### Example: Create

```ts
const application = await client.Application().create({
  application_id: 'example_application_id',
  consumption: {},
  name: 'example_name',
  onboarding_steps: {},
  organization_id: 'example_organization_id',
  quotas: {},
})
```


### ApplicationSecret

Create an instance: `const application_secret = client.ApplicationSecret()`

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

```ts
const application_secrets = await client.ApplicationSecret().list()
```

#### Example: Create

```ts
const application_secret = await client.ApplicationSecret().create({
  application_id: 'example_application_id',
  created_at: 'example_created_at',
  token: 'example_token',
})
```


### ApplicationsManagement

Create an instance: `const applications_management = client.ApplicationsManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Event

Create an instance: `const event = client.Event()`

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
| `labels` | `Object` |  |
| `metadata` | `Object` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |
| `received_at` | `string` |  |

#### Example: Load

```ts
const event = await client.Event().load({ id: 'event_id' })
```

#### Example: List

```ts
const events = await client.Event().list()
```


### EventType

Create an instance: `const event_type = client.EventType()`

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

```ts
const event_type = await client.EventType().load({ id: 'event_type_id' })
```

#### Example: List

```ts
const event_types = await client.EventType().list()
```

#### Example: Create

```ts
const event_type = await client.EventType().create({
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


### EventsManagement

Create an instance: `const events_management = client.EventsManagement()`

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

```ts
const events_managements = await client.EventsManagement().list()
```

#### Example: Create

```ts
const events_management = await client.EventsManagement().create({
  event_id: 'example_event_id',
  application_id: 'example_application_id',
})
```


### EventsPerDayEntry

Create an instance: `const events_per_day_entry = client.EventsPerDayEntry()`

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

```ts
const events_per_day_entrys = await client.EventsPerDayEntry().list()
```


### Health

Create an instance: `const health = client.Health()`

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

```ts
const health = await client.Health().load()
```


### Hook0

Create an instance: `const hook0 = client.Hook0()`

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

```ts
const hook0s = await client.Hook0().list()
```


### IngestedEvent

Create an instance: `const ingested_event = client.IngestedEvent()`

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
| `labels` | `Object` |  |
| `metadata` | `Object` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |

#### Example: Create

```ts
const ingested_event = await client.IngestedEvent().create({
  application_id: 'example_application_id',
  event_type: 'example_event_type',
  labels: {},
  occurred_at: 'example_occurred_at',
  payload: 'example_payload',
  payload_content_type: 'example_payload_content_type',
})
```


### Instance

Create an instance: `const instance = client.Instance()`

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
| `formbricks` | `Object` |  |
| `matomo` | `Object` |  |
| `password_minimum_length` | `number` |  |
| `quota_enforcement` | `boolean` |  |
| `registration_disabled` | `boolean` |  |
| `support_email_address` | `string` |  |

#### Example: Load

```ts
const instance = await client.Instance().load()
```


### Login

Create an instance: `const login = client.Login()`

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

```ts
const login = await client.Login().create({
  email: 'example_email',
  password: 'example_password',
})
```


### Organization

Create an instance: `const organization = client.Organization()`

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
| `consumption` | `Object` |  |
| `name` | `string` |  |
| `onboarding_steps` | `Object` |  |
| `organization_id` | `string` |  |
| `plan` | `Object` |  |
| `quotas` | `Object` |  |
| `role` | `string` |  |
| `users` | `Array` |  |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.Organization().list()
```

#### Example: Create

```ts
const organization = await client.Organization().create({
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


### OrganizationEditRole

Create an instance: `const organization_edit_role = client.OrganizationEditRole()`

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

Create an instance: `const problem = client.Problem()`

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

```ts
const problems = await client.Problem().list()
```


### Quota

Create an instance: `const quota = client.Quota()`

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

```ts
const quota = await client.Quota().load()
```


### Registration

Create an instance: `const registration = client.Registration()`

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

```ts
const registration = await client.Registration().create({
  email: 'example_email',
  first_name: 'example_first_name',
  last_name: 'example_last_name',
  password: 'example_password',
})
```


### RequestAttempt

Create an instance: `const request_attempt = client.RequestAttempt()`

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
| `event` | `Object` |  |
| `event_id` | `string` |  |
| `failed_at` | `string` |  |
| `http_response_status` | `number` |  |
| `picked_at` | `string` |  |
| `request_attempt_id` | `string` |  |
| `response_id` | `string` |  |
| `retry_count` | `number` |  |
| `status` | `Object` |  |
| `subscription` | `Object` |  |
| `succeeded_at` | `string` |  |

#### Example: Load

```ts
const request_attempt = await client.RequestAttempt().load({ id: 'request_attempt_id' })
```

#### Example: List

```ts
const request_attempts = await client.RequestAttempt().list()
```


### Response

Create an instance: `const response = client.Response()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const response = await client.Response().load({ id: 'response_id' })
```


### Revoke

Create an instance: `const revoke = client.Revoke()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `const service_token = client.ServiceToken()`

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

```ts
const service_token = await client.ServiceToken().load({ id: 'service_token_id' })
```

#### Example: List

```ts
const service_tokens = await client.ServiceToken().list()
```

#### Example: Create

```ts
const service_token = await client.ServiceToken().create({
  biscuit: 'example_biscuit',
  created_at: 'example_created_at',
  name: 'example_name',
  organization_id: 'example_organization_id',
  token_id: 'example_token_id',
})
```


### Subscription

Create an instance: `const subscription = client.Subscription()`

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
| `dedicated_workers` | `Array` |  |
| `description` | `string` |  |
| `event_types` | `Array` |  |
| `is_enabled` | `boolean` |  |
| `label_key` | `string` |  |
| `label_value` | `string` |  |
| `labels` | `Object` |  |
| `metadata` | `Object` |  |
| `secret` | `string` |  |
| `subscription_id` | `string` |  |
| `target` | `Object` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const subscription = await client.Subscription().load({ id: 'subscription_id' })
```

#### Example: List

```ts
const subscriptions = await client.Subscription().list()
```

#### Example: Create

```ts
const subscription = await client.Subscription().create({
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


### UserAuthentication

Create an instance: `const user_authentication = client.UserAuthentication()`

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

```ts
const user_authentication = await client.UserAuthentication().create({
  email: 'example_email',
  new_password: 'example_new_password',
  token: 'example_token',
})
```


### UserInvitation

Create an instance: `const user_invitation = client.UserInvitation()`

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

```ts
const user_invitation = await client.UserInvitation().create({
  organization_id: 'example_organization_id',
  email: 'example_email',
  role: 'example_role',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
hook0/
├── src/
│   ├── Hook0SDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { Hook0SDK } = require('@voxgig-sdk/hook0-js')
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const application = client.Application()
await application.list()

// application.data() now returns the application data from the last `list`
// application.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
