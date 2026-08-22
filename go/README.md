# Hook0 Golang SDK



The Golang SDK for the Hook0 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Application(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `java`, `js`, `lua`, `php`, `py`, `ts`, `zig` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/hook0-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/hook0-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/hook0-sdk/go=../hook0-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/hook0-sdk/go"
)

func main() {
    client := sdk.NewHook0SDK(map[string]any{
        "apikey": os.Getenv("HOOK0_APIKEY"),
    })

    // List application records — the value is the array of records itself.
    applications, err := client.Application(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range applications.([]any) {
        fmt.Println(item)
    }

    // Load a single application — the value is the loaded record.
    application, err := client.Application(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(application)

    // Create a application.
    created, err := client.Application(nil).Create(map[string]any{"application_id": "example_application_id", "consumption": map[string]any{}, "name": "example_name", "onboarding_steps": map[string]any{}, "organization_id": "example_organization_id", "quotas": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a application.
    updated, err := client.Application(nil).Update(map[string]any{"id": "example_id", "application_id": "example_application_id", "consumption": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a application.
    removed, err := client.Application(nil).Remove(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
applications, err := client.Application(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = applications
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

application, err := client.Application(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(application) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewHook0SDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewHook0SDK

```go
func NewHook0SDK(options map[string]any) *Hook0SDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *Hook0SDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Application` | `(data map[string]any) Hook0Entity` | Create an Application entity instance. |
| `ApplicationSecret` | `(data map[string]any) Hook0Entity` | Create an ApplicationSecret entity instance. |
| `ApplicationsManagement` | `(data map[string]any) Hook0Entity` | Create an ApplicationsManagement entity instance. |
| `Event` | `(data map[string]any) Hook0Entity` | Create an Event entity instance. |
| `EventType` | `(data map[string]any) Hook0Entity` | Create an EventType entity instance. |
| `EventsManagement` | `(data map[string]any) Hook0Entity` | Create an EventsManagement entity instance. |
| `EventsPerDayEntry` | `(data map[string]any) Hook0Entity` | Create an EventsPerDayEntry entity instance. |
| `Health` | `(data map[string]any) Hook0Entity` | Create a Health entity instance. |
| `Hook0` | `(data map[string]any) Hook0Entity` | Create a Hook0 entity instance. |
| `IngestedEvent` | `(data map[string]any) Hook0Entity` | Create an IngestedEvent entity instance. |
| `Instance` | `(data map[string]any) Hook0Entity` | Create an Instance entity instance. |
| `Login` | `(data map[string]any) Hook0Entity` | Create a Login entity instance. |
| `Organization` | `(data map[string]any) Hook0Entity` | Create an Organization entity instance. |
| `OrganizationEditRole` | `(data map[string]any) Hook0Entity` | Create an OrganizationEditRole entity instance. |
| `Problem` | `(data map[string]any) Hook0Entity` | Create a Problem entity instance. |
| `Quota` | `(data map[string]any) Hook0Entity` | Create a Quota entity instance. |
| `Registration` | `(data map[string]any) Hook0Entity` | Create a Registration entity instance. |
| `RequestAttempt` | `(data map[string]any) Hook0Entity` | Create a RequestAttempt entity instance. |
| `Response` | `(data map[string]any) Hook0Entity` | Create a Response entity instance. |
| `Revoke` | `(data map[string]any) Hook0Entity` | Create a Revoke entity instance. |
| `ServiceToken` | `(data map[string]any) Hook0Entity` | Create a ServiceToken entity instance. |
| `Subscription` | `(data map[string]any) Hook0Entity` | Create a Subscription entity instance. |
| `UserAuthentication` | `(data map[string]any) Hook0Entity` | Create an UserAuthentication entity instance. |
| `UserInvitation` | `(data map[string]any) Hook0Entity` | Create an UserInvitation entity instance. |

### Entity interface (Hook0Entity)

All entities implement the `Hook0Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    application, err := client.Application(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // application is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `"application_id"` | Unique identifier of the application. |
| `"consumption"` | Current consumption metrics for this application. |
| `"name"` | Name of the application. |
| `"onboarding_steps"` | Onboarding completion status for this application. |
| `"organization_id"` | UUID of the organization this application belongs to. |
| `"quotas"` | Quota limits for this application. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/applications/`

#### ApplicationSecret

| Field | Description |
| --- | --- |
| `"application_id"` |  |
| `"created_at"` |  |
| `"deleted_at"` |  |
| `"name"` |  |
| `"token"` |  |

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
| `"event_id"` |  |
| `"event_type_name"` |  |
| `"ip"` |  |
| `"labels"` |  |
| `"metadata"` |  |
| `"occurred_at"` |  |
| `"payload"` |  |
| `"payload_content_type"` |  |
| `"received_at"` |  |

Operations: List, Load.

API path: `/api/v1/events/`

#### EventType

| Field | Description |
| --- | --- |
| `"application_id"` |  |
| `"event_type_name"` |  |
| `"resource_type"` |  |
| `"resource_type_name"` |  |
| `"service"` |  |
| `"service_name"` |  |
| `"verb"` |  |
| `"verb_name"` |  |

Operations: Create, List, Load.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |
| `"application_id"` |  |

Operations: Create, List, Remove.

API path: `/api/v1/events/{event_id}/replay`

#### EventsPerDayEntry

| Field | Description |
| --- | --- |
| `"amount"` |  |
| `"application_id"` |  |
| `"application_name"` |  |
| `"date"` |  |
| `"is_provisional"` |  |

Operations: List.

API path: `/api/v1/events_per_day/application`

#### Health

| Field | Description |
| --- | --- |
| `"database"` |  |
| `"database_duration_ms"` |  |
| `"object_storage"` |  |
| `"object_storage_duration_ms"` |  |
| `"pulsar"` |  |
| `"pulsar_duration_ms"` |  |
| `"total_duration_ms"` |  |

Operations: Load.

API path: `/api/v1/health/`

#### Hook0

| Field | Description |
| --- | --- |
| `"default"` |  |
| `"description"` |  |
| `"env_var"` |  |
| `"group"` |  |
| `"name"` |  |
| `"required"` |  |
| `"sensitive"` |  |

Operations: List.

API path: `/api/v1/environment_variables/`

#### IngestedEvent

| Field | Description |
| --- | --- |
| `"application_id"` | UUID of the application this event belongs to. |
| `"event_id"` | Optional unique identifier for this event (client-generated UUID). |
| `"event_type"` | The type of event (e.g., 'user.created', 'order.completed'). |
| `"labels"` | Labels for event filtering and routing to subscriptions. |
| `"metadata"` | Optional metadata key-value pairs associated with the event. |
| `"occurred_at"` | Timestamp when the event occurred. |
| `"payload"` | The event payload. |
| `"payload_content_type"` | Content type of the payload. |

Operations: Create.

API path: `/api/v1/event/`

#### Instance

| Field | Description |
| --- | --- |
| `"application_secret_compatibility"` |  |
| `"auto_db_migration"` |  |
| `"biscuit_public_key"` |  |
| `"cloudflare_turnstile_site_key"` |  |
| `"formbricks"` |  |
| `"matomo"` |  |
| `"password_minimum_length"` |  |
| `"quota_enforcement"` |  |
| `"registration_disabled"` |  |
| `"support_email_address"` |  |

Operations: Load.

API path: `/api/v1/instance/`

#### Login

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"password"` |  |

Operations: Create.

API path: `/api/v1/auth/login`

#### Organization

| Field | Description |
| --- | --- |
| `"consumption"` |  |
| `"name"` |  |
| `"onboarding_steps"` |  |
| `"organization_id"` |  |
| `"plan"` |  |
| `"quotas"` |  |
| `"role"` |  |
| `"users"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/`

#### OrganizationEditRole

| Field | Description |
| --- | --- |
| `"role"` |  |
| `"user_id"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/invite`

#### Problem

| Field | Description |
| --- | --- |
| `"detail"` |  |
| `"id"` |  |
| `"status"` |  |
| `"title"` |  |

Operations: List.

API path: `/api/v1/errors/`

#### Quota

| Field | Description |
| --- | --- |
| `"global_applications_per_organization_limit"` |  |
| `"global_days_of_events_retention_limit"` |  |
| `"global_event_types_per_application_limit"` |  |
| `"global_events_per_day_limit"` |  |
| `"global_members_per_organization_limit"` |  |
| `"global_subscriptions_per_application_limit"` |  |

Operations: Load.

API path: `/api/v1/quotas/`

#### Registration

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"first_name"` |  |
| `"gclid"` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `"last_name"` |  |
| `"password"` |  |
| `"turnstile_token"` |  |

Operations: Create.

API path: `/api/v1/register/`

#### RequestAttempt

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"delay_until"` |  |
| `"event"` |  |
| `"event_id"` |  |
| `"failed_at"` |  |
| `"http_response_status"` |  |
| `"picked_at"` |  |
| `"request_attempt_id"` |  |
| `"response_id"` |  |
| `"retry_count"` |  |
| `"status"` | Status of a request attempt. |
| `"subscription"` |  |
| `"succeeded_at"` |  |

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
| `"biscuit"` |  |
| `"created_at"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"token_id"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/service_token/`

#### Subscription

| Field | Description |
| --- | --- |
| `"application_id"` |  |
| `"created_at"` |  |
| `"dedicated_workers"` |  |
| `"description"` |  |
| `"event_types"` |  |
| `"is_enabled"` |  |
| `"label_key"` | _Kept for backward compatibility, you should use `labels`_ |
| `"label_value"` | _Kept for backward compatibility, you should use `labels`_ |
| `"labels"` |  |
| `"metadata"` |  |
| `"secret"` |  |
| `"subscription_id"` |  |
| `"target"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/subscriptions/`

#### UserAuthentication

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"new_password"` |  |
| `"token"` |  |

Operations: Create.

API path: `/api/v1/auth/begin-reset-password`

#### UserInvitation

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"role"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/invite`



## Entities


### Application

Create an instance: `application := client.Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` | Unique identifier of the application. |
| `consumption` | `map[string]any` | Current consumption metrics for this application. |
| `name` | `string` | Name of the application. |
| `onboarding_steps` | `map[string]any` | Onboarding completion status for this application. |
| `organization_id` | `string` | UUID of the organization this application belongs to. |
| `quotas` | `map[string]any` | Quota limits for this application. |

#### Example: Load

```go
application, err := client.Application(nil).Load(map[string]any{"id": "application_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(application) // the loaded record
```

#### Example: List

```go
applications, err := client.Application(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(applications) // the array of records
```

#### Example: Create

```go
result, err := client.Application(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "consumption": map[string]any{},
    "name": "example_name",
    "onboarding_steps": map[string]any{},
    "organization_id": "example_organization_id",
    "quotas": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ApplicationSecret

Create an instance: `applicationSecret := client.ApplicationSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `deleted_at` | `string` |  |
| `name` | `string` |  |
| `token` | `string` |  |

#### Example: List

```go
applicationSecrets, err := client.ApplicationSecret(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(applicationSecrets) // the array of records
```

#### Example: Create

```go
result, err := client.ApplicationSecret(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "created_at": "example_created_at",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ApplicationsManagement

Create an instance: `applicationsManagement := client.ApplicationsManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `string` |  |
| `event_type_name` | `string` |  |
| `ip` | `string` |  |
| `labels` | `map[string]any` |  |
| `metadata` | `map[string]any` |  |
| `occurred_at` | `string` |  |
| `payload` | `string` |  |
| `payload_content_type` | `string` |  |
| `received_at` | `string` |  |

#### Example: Load

```go
event, err := client.Event(nil).Load(map[string]any{"id": "event_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(event) // the loaded record
```

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
```


### EventType

Create an instance: `eventType := client.EventType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
eventType, err := client.EventType(nil).Load(map[string]any{"id": "event_type_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventType) // the loaded record
```

#### Example: List

```go
eventTypes, err := client.EventType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventTypes) // the array of records
```

#### Example: Create

```go
result, err := client.EventType(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "event_type_name": "example_event_type_name",
    "resource_type": "example_resource_type",
    "resource_type_name": "example_resource_type_name",
    "service": "example_service",
    "service_name": "example_service_name",
    "verb": "example_verb",
    "verb_name": "example_verb_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### EventsManagement

Create an instance: `eventsManagement := client.EventsManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |

#### Example: List

```go
eventsManagements, err := client.EventsManagement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventsManagements) // the array of records
```

#### Example: Create

```go
result, err := client.EventsManagement(nil).Create(map[string]any{
    "event_id": "example_event_id",
    "application_id": "example_application_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### EventsPerDayEntry

Create an instance: `eventsPerDayEntry := client.EventsPerDayEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `int` |  |
| `application_id` | `string` |  |
| `application_name` | `string` |  |
| `date` | `string` |  |
| `is_provisional` | `bool` |  |

#### Example: List

```go
eventsPerDayEntrys, err := client.EventsPerDayEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventsPerDayEntrys) // the array of records
```


### Health

Create an instance: `health := client.Health(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
health, err := client.Health(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(health) // the loaded record
```


### Hook0

Create an instance: `hook0 := client.Hook0(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
hook0s, err := client.Hook0(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(hook0s) // the array of records
```


### IngestedEvent

Create an instance: `ingestedEvent := client.IngestedEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` | UUID of the application this event belongs to. |
| `event_id` | `string` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `string` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `map[string]any` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `map[string]any` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `string` | Timestamp when the event occurred. |
| `payload` | `string` | The event payload. |
| `payload_content_type` | `string` | Content type of the payload. |

#### Example: Create

```go
result, err := client.IngestedEvent(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "event_type": "example_event_type",
    "labels": map[string]any{},
    "occurred_at": "example_occurred_at",
    "payload": "example_payload",
    "payload_content_type": "example_payload_content_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Instance

Create an instance: `instance := client.Instance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `string` |  |
| `cloudflare_turnstile_site_key` | `string` |  |
| `formbricks` | `map[string]any` |  |
| `matomo` | `map[string]any` |  |
| `password_minimum_length` | `int` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `string` |  |

#### Example: Load

```go
instance, err := client.Instance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(instance) // the loaded record
```


### Login

Create an instance: `login := client.Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `password` | `string` |  |

#### Example: Create

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Organization

Create an instance: `organization := client.Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `consumption` | `map[string]any` |  |
| `name` | `string` |  |
| `onboarding_steps` | `map[string]any` |  |
| `organization_id` | `string` |  |
| `plan` | `map[string]any` |  |
| `quotas` | `map[string]any` |  |
| `role` | `string` |  |
| `users` | `[]any` |  |

#### Example: Load

```go
organization, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organization) // the loaded record
```

#### Example: List

```go
organizations, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizations) // the array of records
```

#### Example: Create

```go
result, err := client.Organization(nil).Create(map[string]any{
    "consumption": map[string]any{},
    "name": "example_name",
    "onboarding_steps": map[string]any{},
    "organization_id": "example_organization_id",
    "plan": map[string]any{},
    "quotas": map[string]any{},
    "role": "example_role",
    "users": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### OrganizationEditRole

Create an instance: `organizationEditRole := client.OrganizationEditRole(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `string` |  |
| `user_id` | `string` |  |


### Problem

Create an instance: `problem := client.Problem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `string` |  |
| `id` | `string` |  |
| `status` | `int` |  |
| `title` | `string` |  |

#### Example: List

```go
problems, err := client.Problem(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(problems) // the array of records
```


### Quota

Create an instance: `quota := client.Quota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
quota, err := client.Quota(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(quota) // the loaded record
```


### Registration

Create an instance: `registration := client.Registration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `gclid` | `string` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `string` |  |
| `password` | `string` |  |
| `turnstile_token` | `string` |  |

#### Example: Create

```go
result, err := client.Registration(nil).Create(map[string]any{
    "email": "example_email",
    "first_name": "example_first_name",
    "last_name": "example_last_name",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### RequestAttempt

Create an instance: `requestAttempt := client.RequestAttempt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `delay_until` | `string` |  |
| `event` | `map[string]any` |  |
| `event_id` | `string` |  |
| `failed_at` | `string` |  |
| `http_response_status` | `int` |  |
| `picked_at` | `string` |  |
| `request_attempt_id` | `string` |  |
| `response_id` | `string` |  |
| `retry_count` | `int` |  |
| `status` | `map[string]any` | Status of a request attempt. |
| `subscription` | `map[string]any` |  |
| `succeeded_at` | `string` |  |

#### Example: Load

```go
requestAttempt, err := client.RequestAttempt(nil).Load(map[string]any{"id": "request_attempt_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(requestAttempt) // the loaded record
```

#### Example: List

```go
requestAttempts, err := client.RequestAttempt(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(requestAttempts) // the array of records
```


### Response

Create an instance: `response := client.Response(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
response, err := client.Response(nil).Load(map[string]any{"id": "response_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(response) // the loaded record
```


### Revoke

Create an instance: `revoke := client.Revoke(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### ServiceToken

Create an instance: `serviceToken := client.ServiceToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `string` |  |
| `created_at` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `token_id` | `string` |  |

#### Example: Load

```go
serviceToken, err := client.ServiceToken(nil).Load(map[string]any{"id": "service_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(serviceToken) // the loaded record
```

#### Example: List

```go
serviceTokens, err := client.ServiceToken(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(serviceTokens) // the array of records
```

#### Example: Create

```go
result, err := client.ServiceToken(nil).Create(map[string]any{
    "biscuit": "example_biscuit",
    "created_at": "example_created_at",
    "name": "example_name",
    "organization_id": "example_organization_id",
    "token_id": "example_token_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Subscription

Create an instance: `subscription := client.Subscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `created_at` | `string` |  |
| `dedicated_workers` | `[]any` |  |
| `description` | `string` |  |
| `event_types` | `[]any` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `string` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `string` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `map[string]any` |  |
| `metadata` | `map[string]any` |  |
| `secret` | `string` |  |
| `subscription_id` | `string` |  |
| `target` | `map[string]any` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
subscription, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscription) // the loaded record
```

#### Example: List

```go
subscriptions, err := client.Subscription(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscriptions) // the array of records
```

#### Example: Create

```go
result, err := client.Subscription(nil).Create(map[string]any{
    "application_id": "example_application_id",
    "created_at": "example_created_at",
    "dedicated_workers": []any{},
    "event_types": []any{},
    "is_enabled": true,
    "label_key": "example_label_key",
    "label_value": "example_label_value",
    "labels": map[string]any{},
    "metadata": map[string]any{},
    "secret": "example_secret",
    "subscription_id": "example_subscription_id",
    "target": map[string]any{},
    "updated_at": "example_updated_at",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UserAuthentication

Create an instance: `userAuthentication := client.UserAuthentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `new_password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```go
result, err := client.UserAuthentication(nil).Create(map[string]any{
    "email": "example_email",
    "new_password": "example_new_password",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UserInvitation

Create an instance: `userInvitation := client.UserInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```go
result, err := client.UserInvitation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/hook0-sdk/go/
├── hook0.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/hook0-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
application := client.Application(nil)
application.List(nil, nil)

// application.Data() now returns the application data from the last list
// application.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
