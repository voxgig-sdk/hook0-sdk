# Hook0 Python SDK



The Python SDK for the Hook0 API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Application()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/hook0-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from hook0_sdk import Hook0SDK

client = Hook0SDK({
    "apikey": os.environ.get("HOOK0_APIKEY"),
})
```

### 2. List application records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    applications = client.Application().list()
    for application in applications:
        print(application)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an application

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    application = client.Application().load({"id": "example_id"})
    print(application)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Application().create({"application_id": "example_application_id", "consumption": {}, "name": "example_name", "onboarding_steps": {}, "organization_id": "example_organization_id", "quotas": {}})

# Update
client.Application().update({"id": "example_id", "application_id": "example_application_id", "consumption": {}})

# Remove
client.Application().remove({"id": "example_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    applications = client.Application().list()
    print(applications)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = Hook0SDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
application = client.Application().list()
# application contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = Hook0SDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### Hook0SDK

```python
from hook0_sdk import Hook0SDK

client = Hook0SDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = Hook0SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `application_id` | Unique identifier of the application. |
| `consumption` | Current consumption metrics for this application. |
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
| `gclid` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
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
| `status` | Status of a request attempt. |
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

Create an instance: `application = client.Application()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` | Unique identifier of the application. |
| `consumption` | `dict` | Current consumption metrics for this application. |
| `name` | `str` | Name of the application. |
| `onboarding_steps` | `dict` | Onboarding completion status for this application. |
| `organization_id` | `str` | UUID of the organization this application belongs to. |
| `quotas` | `dict` | Quota limits for this application. |

#### Example: Load

```python
application = client.Application().load({"id": "application_id"})
```

#### Example: List

```python
applications = client.Application().list()
```

#### Example: Create

```python
application = client.Application().create({
    "application_id": "example_application_id",  # str
    "consumption": {},  # dict
    "name": "example_name",  # str
    "onboarding_steps": {},  # dict
    "organization_id": "example_organization_id",  # str
    "quotas": {},  # dict
})
```


### ApplicationSecret

Create an instance: `application_secret = client.ApplicationSecret()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` |  |
| `created_at` | `str` |  |
| `deleted_at` | `str` |  |
| `name` | `str` |  |
| `token` | `str` |  |

#### Example: List

```python
application_secrets = client.ApplicationSecret().list()
```

#### Example: Create

```python
application_secret = client.ApplicationSecret().create({
    "application_id": "example_application_id",  # str
    "created_at": "example_created_at",  # str
    "token": "example_token",  # str
})
```


### ApplicationsManagement

Create an instance: `applications_management = client.ApplicationsManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `str` |  |
| `event_type_name` | `str` |  |
| `ip` | `str` |  |
| `labels` | `dict` |  |
| `metadata` | `dict` |  |
| `occurred_at` | `str` |  |
| `payload` | `str` |  |
| `payload_content_type` | `str` |  |
| `received_at` | `str` |  |

#### Example: Load

```python
event = client.Event().load({"id": "event_id"})
```

#### Example: List

```python
events = client.Event().list()
```


### EventType

Create an instance: `event_type = client.EventType()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` |  |
| `event_type_name` | `str` |  |
| `resource_type` | `str` |  |
| `resource_type_name` | `str` |  |
| `service` | `str` |  |
| `service_name` | `str` |  |
| `verb` | `str` |  |
| `verb_name` | `str` |  |

#### Example: Load

```python
event_type = client.EventType().load({"id": "event_type_id"})
```

#### Example: List

```python
event_types = client.EventType().list()
```

#### Example: Create

```python
event_type = client.EventType().create({
    "application_id": "example_application_id",  # str
    "event_type_name": "example_event_type_name",  # str
    "resource_type": "example_resource_type",  # str
    "resource_type_name": "example_resource_type_name",  # str
    "service": "example_service",  # str
    "service_name": "example_service_name",  # str
    "verb": "example_verb",  # str
    "verb_name": "example_verb_name",  # str
})
```


### EventsManagement

Create an instance: `events_management = client.EventsManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` |  |

#### Example: List

```python
events_managements = client.EventsManagement().list()
```

#### Example: Create

```python
events_management = client.EventsManagement().create({
    "event_id": "example_event_id",  # str
    "application_id": "example_application_id",  # str
})
```


### EventsPerDayEntry

Create an instance: `events_per_day_entry = client.EventsPerDayEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `int` |  |
| `application_id` | `str` |  |
| `application_name` | `str` |  |
| `date` | `str` |  |
| `is_provisional` | `bool` |  |

#### Example: List

```python
events_per_day_entrys = client.EventsPerDayEntry().list()
```


### Health

Create an instance: `health = client.Health()`

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

```python
health = client.Health().load()
```


### Hook0

Create an instance: `hook0 = client.Hook0()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `str` |  |
| `description` | `str` |  |
| `env_var` | `str` |  |
| `group` | `str` |  |
| `name` | `str` |  |
| `required` | `bool` |  |
| `sensitive` | `bool` |  |

#### Example: List

```python
hook0s = client.Hook0().list()
```


### IngestedEvent

Create an instance: `ingested_event = client.IngestedEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` | UUID of the application this event belongs to. |
| `event_id` | `str` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `str` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `dict` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `dict` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `str` | Timestamp when the event occurred. |
| `payload` | `str` | The event payload. |
| `payload_content_type` | `str` | Content type of the payload. |

#### Example: Create

```python
ingested_event = client.IngestedEvent().create({
    "application_id": "example_application_id",  # str
    "event_type": "example_event_type",  # str
    "labels": {},  # dict
    "occurred_at": "example_occurred_at",  # str
    "payload": "example_payload",  # str
    "payload_content_type": "example_payload_content_type",  # str
})
```


### Instance

Create an instance: `instance = client.Instance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `str` |  |
| `cloudflare_turnstile_site_key` | `str` |  |
| `formbricks` | `dict` |  |
| `matomo` | `dict` |  |
| `password_minimum_length` | `int` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `str` |  |

#### Example: Load

```python
instance = client.Instance().load()
```


### Login

Create an instance: `login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `password` | `str` |  |

#### Example: Create

```python
login = client.Login().create({
    "email": "example_email",  # str
    "password": "example_password",  # str
})
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consumption` | `dict` |  |
| `name` | `str` |  |
| `onboarding_steps` | `dict` |  |
| `organization_id` | `str` |  |
| `plan` | `dict` |  |
| `quotas` | `dict` |  |
| `role` | `str` |  |
| `users` | `list` |  |

#### Example: Load

```python
organization = client.Organization().load({"id": "organization_id"})
```

#### Example: List

```python
organizations = client.Organization().list()
```

#### Example: Create

```python
organization = client.Organization().create({
    "consumption": {},  # dict
    "name": "example_name",  # str
    "onboarding_steps": {},  # dict
    "organization_id": "example_organization_id",  # str
    "plan": {},  # dict
    "quotas": {},  # dict
    "role": "example_role",  # str
    "users": [],  # list
})
```


### OrganizationEditRole

Create an instance: `organization_edit_role = client.OrganizationEditRole()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `str` |  |
| `user_id` | `str` |  |


### Problem

Create an instance: `problem = client.Problem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `str` |  |
| `id` | `str` |  |
| `status` | `int` |  |
| `title` | `str` |  |

#### Example: List

```python
problems = client.Problem().list()
```


### Quota

Create an instance: `quota = client.Quota()`

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

```python
quota = client.Quota().load()
```


### Registration

Create an instance: `registration = client.Registration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `first_name` | `str` |  |
| `gclid` | `str` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `str` |  |
| `password` | `str` |  |
| `turnstile_token` | `str` |  |

#### Example: Create

```python
registration = client.Registration().create({
    "email": "example_email",  # str
    "first_name": "example_first_name",  # str
    "last_name": "example_last_name",  # str
    "password": "example_password",  # str
})
```


### RequestAttempt

Create an instance: `request_attempt = client.RequestAttempt()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `delay_until` | `str` |  |
| `event` | `dict` |  |
| `event_id` | `str` |  |
| `failed_at` | `str` |  |
| `http_response_status` | `int` |  |
| `picked_at` | `str` |  |
| `request_attempt_id` | `str` |  |
| `response_id` | `str` |  |
| `retry_count` | `int` |  |
| `status` | `dict` | Status of a request attempt. |
| `subscription` | `dict` |  |
| `succeeded_at` | `str` |  |

#### Example: Load

```python
request_attempt = client.RequestAttempt().load({"id": "request_attempt_id"})
```

#### Example: List

```python
request_attempts = client.RequestAttempt().list()
```


### Response

Create an instance: `response = client.Response()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
response = client.Response().load({"id": "response_id"})
```


### Revoke

Create an instance: `revoke = client.Revoke()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ServiceToken

Create an instance: `service_token = client.ServiceToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `str` |  |
| `created_at` | `str` |  |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `token_id` | `str` |  |

#### Example: Load

```python
service_token = client.ServiceToken().load({"id": "service_token_id"})
```

#### Example: List

```python
service_tokens = client.ServiceToken().list()
```

#### Example: Create

```python
service_token = client.ServiceToken().create({
    "biscuit": "example_biscuit",  # str
    "created_at": "example_created_at",  # str
    "name": "example_name",  # str
    "organization_id": "example_organization_id",  # str
    "token_id": "example_token_id",  # str
})
```


### Subscription

Create an instance: `subscription = client.Subscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` |  |
| `created_at` | `str` |  |
| `dedicated_workers` | `list` |  |
| `description` | `str` |  |
| `event_types` | `list` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `str` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `str` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `dict` |  |
| `metadata` | `dict` |  |
| `secret` | `str` |  |
| `subscription_id` | `str` |  |
| `target` | `dict` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
subscription = client.Subscription().load({"id": "subscription_id"})
```

#### Example: List

```python
subscriptions = client.Subscription().list()
```

#### Example: Create

```python
subscription = client.Subscription().create({
    "application_id": "example_application_id",  # str
    "created_at": "example_created_at",  # str
    "dedicated_workers": [],  # list
    "event_types": [],  # list
    "is_enabled": True,  # bool
    "label_key": "example_label_key",  # str
    "label_value": "example_label_value",  # str
    "labels": {},  # dict
    "metadata": {},  # dict
    "secret": "example_secret",  # str
    "subscription_id": "example_subscription_id",  # str
    "target": {},  # dict
    "updated_at": "example_updated_at",  # str
})
```


### UserAuthentication

Create an instance: `user_authentication = client.UserAuthentication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `new_password` | `str` |  |
| `token` | `str` |  |

#### Example: Create

```python
user_authentication = client.UserAuthentication().create({
    "email": "example_email",  # str
    "new_password": "example_new_password",  # str
    "token": "example_token",  # str
})
```


### UserInvitation

Create an instance: `user_invitation = client.UserInvitation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `role` | `str` |  |

#### Example: Create

```python
user_invitation = client.UserInvitation().create({
    "organization_id": "example_organization_id",  # str
    "email": "example_email",  # str
    "role": "example_role",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── hook0_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`hook0_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
application = client.Application()
application.list()

# application.data_get() now returns the application data from the last list
# application.match_get() returns the last match criteria
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
