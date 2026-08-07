# Hook0 Python SDK Reference

Complete API reference for the Hook0 Python SDK.


## Hook0SDK

### Constructor

```python
from hook0_sdk import Hook0SDK

client = Hook0SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Hook0SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = Hook0SDK.test()
```


### Instance Methods

#### `Application(data=None)`

Create a new `ApplicationEntity` instance. Pass `None` for no initial data.

#### `ApplicationSecret(data=None)`

Create a new `ApplicationSecretEntity` instance. Pass `None` for no initial data.

#### `ApplicationsManagement(data=None)`

Create a new `ApplicationsManagementEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `EventType(data=None)`

Create a new `EventTypeEntity` instance. Pass `None` for no initial data.

#### `EventsManagement(data=None)`

Create a new `EventsManagementEntity` instance. Pass `None` for no initial data.

#### `EventsPerDayEntry(data=None)`

Create a new `EventsPerDayEntryEntity` instance. Pass `None` for no initial data.

#### `Health(data=None)`

Create a new `HealthEntity` instance. Pass `None` for no initial data.

#### `Hook0(data=None)`

Create a new `Hook0Entity` instance. Pass `None` for no initial data.

#### `IngestedEvent(data=None)`

Create a new `IngestedEventEntity` instance. Pass `None` for no initial data.

#### `Instance(data=None)`

Create a new `InstanceEntity` instance. Pass `None` for no initial data.

#### `Login(data=None)`

Create a new `LoginEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `OrganizationEditRole(data=None)`

Create a new `OrganizationEditRoleEntity` instance. Pass `None` for no initial data.

#### `Problem(data=None)`

Create a new `ProblemEntity` instance. Pass `None` for no initial data.

#### `Quota(data=None)`

Create a new `QuotaEntity` instance. Pass `None` for no initial data.

#### `Registration(data=None)`

Create a new `RegistrationEntity` instance. Pass `None` for no initial data.

#### `RequestAttempt(data=None)`

Create a new `RequestAttemptEntity` instance. Pass `None` for no initial data.

#### `Response(data=None)`

Create a new `ResponseEntity` instance. Pass `None` for no initial data.

#### `Revoke(data=None)`

Create a new `RevokeEntity` instance. Pass `None` for no initial data.

#### `ServiceToken(data=None)`

Create a new `ServiceTokenEntity` instance. Pass `None` for no initial data.

#### `Subscription(data=None)`

Create a new `SubscriptionEntity` instance. Pass `None` for no initial data.

#### `UserAuthentication(data=None)`

Create a new `UserAuthenticationEntity` instance. Pass `None` for no initial data.

#### `UserInvitation(data=None)`

Create a new `UserInvitationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ApplicationEntity

```python
application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |
| `consumption` | `dict` | Yes |  |
| `name` | `str` | Yes |  |
| `onboarding_steps` | `dict` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `quota` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Application().create({
    "application_id": "example_application_id",  # str
    "consumption": {},  # dict
    "name": "example_name",  # str
    "onboarding_steps": {},  # dict
    "organization_id": "example_organization_id",  # str
    "quota": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Application().list()
for application in results:
    print(application)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Application().load({"id": "application_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Application().remove({"id": "application_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Application().update({
    "id": "application_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApplicationSecretEntity

```python
application_secret = client.ApplicationSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `deleted_at` | `str` | No |  |
| `name` | `str` | No |  |
| `token` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApplicationSecret().create({
    "application_id": "example_application_id",  # str
    "created_at": "example_created_at",  # str
    "token": "example_token",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApplicationSecret().list()
for application_secret in results:
    print(application_secret)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApplicationSecret().update({
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationSecretEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApplicationsManagementEntity

```python
applications_management = client.ApplicationsManagement()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApplicationsManagement().remove({"application_secret_token": "application_secret_token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationsManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `str` | Yes |  |
| `event_type_name` | `str` | Yes |  |
| `ip` | `str` | Yes |  |
| `labels` | `dict` | Yes |  |
| `metadata` | `dict` | No |  |
| `occurred_at` | `str` | Yes |  |
| `payload` | `str` | Yes |  |
| `payload_content_type` | `str` | Yes |  |
| `received_at` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Event().list()
for event in results:
    print(event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Event().load({"id": "event_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventTypeEntity

```python
event_type = client.EventType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |
| `event_type_name` | `str` | Yes |  |
| `resource_type` | `str` | Yes |  |
| `resource_type_name` | `str` | Yes |  |
| `service` | `str` | Yes |  |
| `service_name` | `str` | Yes |  |
| `verb` | `str` | Yes |  |
| `verb_name` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EventType().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EventType().list()
for event_type in results:
    print(event_type)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EventType().load({"id": "event_type_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventTypeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventsManagementEntity

```python
events_management = client.EventsManagement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EventsManagement().create({
    "event_id": "example_event_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EventsManagement().list()
for events_management in results:
    print(events_management)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.EventsManagement().remove({"event_type_name": "event_type_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventsPerDayEntryEntity

```python
events_per_day_entry = client.EventsPerDayEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `int` | Yes |  |
| `application_id` | `str` | Yes |  |
| `application_name` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `is_provisional` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EventsPerDayEntry().list()
for events_per_day_entry in results:
    print(events_per_day_entry)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventsPerDayEntryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthEntity

```python
health = client.Health()
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Health().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Hook0Entity

```python
hook0 = client.Hook0()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `str` | No |  |
| `description` | `str` | No |  |
| `env_var` | `str` | Yes |  |
| `group` | `str` | No |  |
| `name` | `str` | Yes |  |
| `required` | `bool` | Yes |  |
| `sensitive` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Hook0().list()
for hook0 in results:
    print(hook0)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Hook0Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IngestedEventEntity

```python
ingested_event = client.IngestedEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |
| `event_id` | `str` | No |  |
| `event_type` | `str` | Yes |  |
| `labels` | `dict` | Yes |  |
| `metadata` | `dict` | No |  |
| `occurred_at` | `str` | Yes |  |
| `payload` | `str` | Yes |  |
| `payload_content_type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.IngestedEvent().create({
    "application_id": "example_application_id",  # str
    "event_type": "example_event_type",  # str
    "labels": {},  # dict
    "occurred_at": "example_occurred_at",  # str
    "payload": "example_payload",  # str
    "payload_content_type": "example_payload_content_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IngestedEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InstanceEntity

```python
instance = client.Instance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `str` | Yes |  |
| `cloudflare_turnstile_site_key` | `str` | No |  |
| `formbricks` | `dict` | Yes |  |
| `matomo` | `dict` | Yes |  |
| `password_minimum_length` | `int` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Instance().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LoginEntity

```python
login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `password` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Login().create({
    "email": "example_email",  # str
    "password": "example_password",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `dict` | Yes |  |
| `name` | `str` | Yes |  |
| `onboarding_steps` | `dict` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `plan` | `dict` | Yes |  |
| `quota` | `dict` | Yes |  |
| `role` | `str` | Yes |  |
| `users` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Organization().create({
    "consumption": {},  # dict
    "name": "example_name",  # str
    "onboarding_steps": {},  # dict
    "organization_id": "example_organization_id",  # str
    "plan": {},  # dict
    "quota": {},  # dict
    "role": "example_role",  # str
    "users": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Organization().list()
for organization in results:
    print(organization)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Organization().load({"id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Organization().remove({"id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Organization().update({
    "id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEditRoleEntity

```python
organization_edit_role = client.OrganizationEditRole()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `str` | Yes |  |
| `user_id` | `str` | Yes |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.OrganizationEditRole().update({
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEditRoleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProblemEntity

```python
problem = client.Problem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `status` | `int` | Yes |  |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Problem().list()
for problem in results:
    print(problem)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProblemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuotaEntity

```python
quota = client.Quota()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | Yes |  |
| `limits` | `dict` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Quota().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuotaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistrationEntity

```python
registration = client.Registration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `first_name` | `str` | Yes |  |
| `gclid` | `str` | No |  |
| `last_name` | `str` | Yes |  |
| `password` | `str` | Yes |  |
| `turnstile_token` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Registration().create({
    "email": "example_email",  # str
    "first_name": "example_first_name",  # str
    "last_name": "example_last_name",  # str
    "password": "example_password",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RequestAttemptEntity

```python
request_attempt = client.RequestAttempt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `delay_until` | `str` | No |  |
| `event` | `dict` | Yes |  |
| `event_id` | `str` | Yes |  |
| `failed_at` | `str` | No |  |
| `http_response_status` | `int` | No |  |
| `picked_at` | `str` | No |  |
| `request_attempt_id` | `str` | Yes |  |
| `response_id` | `str` | No |  |
| `retry_count` | `int` | Yes |  |
| `status` | `dict` | Yes |  |
| `subscription` | `dict` | Yes |  |
| `succeeded_at` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RequestAttempt().list()
for request_attempt in results:
    print(request_attempt)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RequestAttempt().load({"id": "request_attempt_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RequestAttemptEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResponseEntity

```python
response = client.Response()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `str` | No |  |
| `elapsed_time_ms` | `int` | No |  |
| `headers` | `dict` | No |  |
| `http_code` | `int` | No |  |
| `response_error_name` | `str` | No |  |
| `response_id` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Response().load({"id": "response_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResponseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RevokeEntity

```python
revoke = client.Revoke()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Revoke().remove({"organization_id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RevokeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ServiceTokenEntity

```python
service_token = client.ServiceToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `organization_id` | `str` | Yes |  |
| `token_id` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ServiceToken().create({
    "biscuit": "example_biscuit",  # str
    "created_at": "example_created_at",  # str
    "name": "example_name",  # str
    "organization_id": "example_organization_id",  # str
    "token_id": "example_token_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ServiceToken().list()
for service_token in results:
    print(service_token)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ServiceToken().load({"id": "service_token_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ServiceToken().remove({"id": "service_token_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ServiceToken().update({
    "id": "service_token_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubscriptionEntity

```python
subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dedicated_workers` | `list` | Yes |  |
| `description` | `str` | No |  |
| `event_type` | `list` | Yes |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `str` | Yes |  |
| `label_value` | `str` | Yes |  |
| `labels` | `dict` | Yes |  |
| `metadata` | `dict` | Yes |  |
| `secret` | `str` | Yes |  |
| `subscription_id` | `str` | Yes |  |
| `target` | `dict` | Yes |  |
| `updated_at` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Subscription().create({
    "application_id": "example_application_id",  # str
    "created_at": "example_created_at",  # str
    "dedicated_workers": [],  # list
    "event_type": [],  # list
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Subscription().list()
for subscription in results:
    print(subscription)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Subscription().load({"id": "subscription_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Subscription().remove({"id": "subscription_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Subscription().update({
    "id": "subscription_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserAuthenticationEntity

```python
user_authentication = client.UserAuthentication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `new_password` | `str` | Yes |  |
| `token` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UserAuthentication().create({
    "email": "example_email",  # str
    "new_password": "example_new_password",  # str
    "token": "example_token",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAuthenticationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserInvitationEntity

```python
user_invitation = client.UserInvitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `role` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UserInvitation().create({
    "organization_id": "example_organization_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInvitationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = Hook0SDK({
    "feature": {
        "test": {"active": True},
    },
})
```

