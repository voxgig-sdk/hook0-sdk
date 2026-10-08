# Hook0 Zig SDK



The Zig SDK for the Hook0 API — an entity-oriented client following idiomatic Zig conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.application(h.vnull())` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
Zig has no central package registry, so this package is distributed as a
git tag (`zig/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/hook0-sdk/tags)). Add it to
your `build.zig.zon` dependencies, or build from a source checkout:

```bash
cd zig && zig build
```

To depend on it from another project, add the tagged archive to
`build.zig.zon`:

```zig
.dependencies = .{
    .sdk = .{
        .url = "<repo-url>/archive/refs/tags/zig/vX.Y.Z.tar.gz",
        // .hash = "...", // filled in by `zig fetch`
    },
},
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```zig
const std = @import("std");
const sdk = @import("sdk");
const h = sdk.h;

const client = sdk.Hook0SDK.new(h.jo(&.{
    .{ "apikey", h.vstr(std.posix.getenv("HOOK0_APIKEY") orelse "") },
}));
```

### 2. List application records

`list()`'s `.ok` is a slice of entities, one per record — `switch` on
it. `asEntity().data(null)` reads an entity's record.

```zig
switch (client.application(h.vnull()).list(h.jo(&.{.{ "organization_id", h.vstr("example") }}), h.vnull())) {
    .ok => |applications| {
        for (applications) |application| {
            std.debug.print("{s}\n", .{h.stringify(application.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

### 3. Load an application

`load()`'s `.ok` carries the entity; `asEntity().data(null)` reads its
record.

```zig
switch (client.application(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("example_id") }}), h.vnull())) {
    .ok => |application| std.debug.print("{s}\n", .{h.stringify(application.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### 4. Create, update, and remove

```zig
// Create — .ok carries the created entity
switch (client.application(h.vnull()).create(h.jo(&.{.{ "amount", h.vnum(1) }, .{ "application_id", h.vstr("example_application_id") }, .{ "application_name", h.vstr("example_application_name") }, .{ "consumption", h.omap() }, .{ "date", h.vstr("example_date") }, .{ "is_provisional", h.vbool(true) }, .{ "name", h.vstr("example_name") }, .{ "onboarding_steps", h.omap() }, .{ "organization_id", h.vstr("example_organization_id") }, .{ "quotas", h.omap() }}), h.vnull())) {
    .ok => |created| std.debug.print("{s}\n", .{h.stringify(created.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}

// Update
switch (client.application(h.vnull()).update(h.jo(&.{.{ "id", h.vstr("example_id") }, .{ "amount", h.vnum(1) }, .{ "application_id", h.vstr("example_application_id") }}), h.vnull())) {
    .ok => |updated| std.debug.print("{s}\n", .{h.stringify(updated.asEntity().data(null))}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}

// Remove
switch (client.application(h.vnull()).remove(h.jo(&.{.{ "id", h.vstr("example_id") }}), h.vnull())) {
    .ok => std.debug.print("removed\n", .{}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const response = await client.Response().load({ id: "example_id", application_id: "example" })
  console.log(response.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```zig
const result = client.direct(h.jo(&.{
    .{ "path", h.vstr("/api/resource/{id}") },
    .{ "method", h.vstr("GET") },
    .{ "params", h.jo(&.{.{ "id", h.vstr("example") }}) },
}));

if (h.get_bool(result, "ok") orelse false) {
    std.debug.print("{d}\n", .{h.to_int(h.getp(result, "status"))}); // 200
    std.debug.print("{s}\n", .{h.stringify(h.getp(result, "data"))}); // response body
} else {
    // A non-2xx response carries status + data (the error body); a
    // transport-level failure carries err instead. Only one is present.
    std.debug.print("{s}\n", .{h.get_str(result, "err") orelse ""});
}
```

### Prepare a request without sending it

```zig
// prepare() returns the fetch definition (an error union — use `catch`/`try`).
const fetchdef = client.prepare(h.jo(&.{
    .{ "path", h.vstr("/api/resource/{id}") },
    .{ "method", h.vstr("DELETE") },
    .{ "params", h.jo(&.{.{ "id", h.vstr("example") }}) },
})) catch unreachable;

std.debug.print("{s}\n", .{h.get_str(fetchdef, "url") orelse ""});
std.debug.print("{s}\n", .{h.get_str(fetchdef, "method") orelse ""});
std.debug.print("{s}\n", .{h.stringify(h.getp(fetchdef, "headers"))});
```

### Use test mode

Create a mock client for unit testing — no server required:

```zig
const client = sdk.test_sdk(h.vnull(), h.vnull());

// Entity ops return a result union — .ok carries the entity, .err the error.
switch (client.response(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("test01") }}), h.vnull())) {
    .ok => |response| std.debug.print("{s}\n", .{h.stringify(response.asEntity().data(null))}), // the mock record
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Point at a different server

Override the base URL to reach a local or staging server:

```zig
const client = sdk.Hook0SDK.new(h.jo(&.{
    .{ "base", h.vstr("http://localhost:8080") },
}));
```

### Run live tests

Create a `.env.local` file at the project root:

```
HOOK0_TEST_LIVE=TRUE
HOOK0_APIKEY=<your-key>
```

Then run:

```bash
cd zig && zig build test
```


## Reference

### Hook0SDK

```zig
const sdk = @import("sdk");
const h = sdk.h;

const client = sdk.Hook0SDK.new(options);
```

Creates a new SDK client. `options` is a `Value` map (`h.vnull()` for
none) carrying any of the following keys:

| Option | Value type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `map` | Feature activation flags. |
| `system` | `map` | System overrides (e.g. a custom fetcher). |

### test_sdk

```zig
const client = sdk.test_sdk(testopts, sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be
`h.vnull()`.

### Hook0SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() Value` | Deep copy of the current SDK options. |
| `get_utility` | `() *Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs: Value) E!Value` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs: Value) Value` | Build and send an HTTP request. Returns a result map (branch on `ok`). |
| `application` | `(entopts: Value) *ApplicationEntity` | Create an Application entity instance. |
| `application_secret` | `(entopts: Value) *ApplicationSecretEntity` | Create an ApplicationSecret entity instance. |
| `applications_management` | `(entopts: Value) *ApplicationsManagementEntity` | Create an ApplicationsManagement entity instance. |
| `email_preference` | `(entopts: Value) *EmailPreferenceEntity` | Create an EmailPreference entity instance. |
| `error_` | `(entopts: Value) *ErrorEntity` | Create an Error entity instance. |
| `event` | `(entopts: Value) *EventEntity` | Create an Event entity instance. |
| `event_type` | `(entopts: Value) *EventTypeEntity` | Create an EventType entity instance. |
| `events_management` | `(entopts: Value) *EventsManagementEntity` | Create an EventsManagement entity instance. |
| `health` | `(entopts: Value) *HealthEntity` | Create a Health entity instance. |
| `hook0` | `(entopts: Value) *Hook0Entity` | Create a Hook0 entity instance. |
| `ingested_event` | `(entopts: Value) *IngestedEventEntity` | Create an IngestedEvent entity instance. |
| `instance` | `(entopts: Value) *InstanceEntity` | Create an Instance entity instance. |
| `login` | `(entopts: Value) *LoginEntity` | Create a Login entity instance. |
| `organization` | `(entopts: Value) *OrganizationEntity` | Create an Organization entity instance. |
| `organization_edit_role` | `(entopts: Value) *OrganizationEditRoleEntity` | Create an OrganizationEditRole entity instance. |
| `quota` | `(entopts: Value) *QuotaEntity` | Create a Quota entity instance. |
| `registration` | `(entopts: Value) *RegistrationEntity` | Create a Registration entity instance. |
| `request_attempt` | `(entopts: Value) *RequestAttemptEntity` | Create a RequestAttempt entity instance. |
| `response` | `(entopts: Value) *ResponseEntity` | Create a Response entity instance. |
| `revoke` | `(entopts: Value) *RevokeEntity` | Create a Revoke entity instance. |
| `service_token` | `(entopts: Value) *ServiceTokenEntity` | Create a ServiceToken entity instance. |
| `subscription` | `(entopts: Value) *SubscriptionEntity` | Create a Subscription entity instance. |
| `user_authentication` | `(entopts: Value) *UserAuthenticationEntity` | Create an UserAuthentication entity instance. |
| `user_invitation` | `(entopts: Value) *UserInvitationEntity` | Create an UserInvitation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch: Value, ctrl: Value) EntResult` | Load a single entity by match criteria. |
| `list` | `(reqmatch: Value, ctrl: Value) EntListResult` | List entities matching the criteria (`.ok` is a slice of entities, one per record). |
| `create` | `(reqdata: Value, ctrl: Value) EntResult` | Create a new entity. |
| `update` | `(reqdata: Value, ctrl: Value) EntResult` | Update an existing entity. |
| `remove` | `(reqmatch: Value, ctrl: Value) EntResult` | Remove an entity, which is returned marked as deleted. |
| `stream` | `(action: []const u8, args: Value, callopts: Value) StreamResult` | Run an op through the pipeline: `.ok` with its result items, or `.err` with the error that failed it. |
| `data` | `(args: ?Value) Value` | Get entity data (pass a map to set). |
| `matchv` | `(args: ?Value) Value` | Get entity match criteria (pass a map to set). |
| `get_name` | `() []const u8` | Return the entity name. |

### Result shape

Entity operations return a result union — `switch` on it: `.ok` carries
the entity (`EntResult`), or for `list` a slice of entities, one per record
(`EntListResult`), and `asEntity().data(null)` reads an entity's record;
`.err` carries the branded error pointer.

The `direct()` escape hatch returns a result `Value` map directly (no
error union) — even on a non-2xx response — that you branch on via
`h.get_bool(result, "ok")`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `map` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` carries the error message.

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

Operations: Create, List, Update.

API path: `/api/v1/application_secrets/`

#### ApplicationsManagement

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/api/v1/application_secrets/{application_secret_token}`

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

Operations: Create, List, Load.

API path: `/api/v1/event_types/`

#### EventsManagement

| Field | Description |
| --- | --- |

Operations: List, Remove.

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

Create an instance: `const application = client.application(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `i64` |  |
| `application_id` | `[]const u8` | Unique identifier of the application. |
| `application_name` | `[]const u8` |  |
| `consumption` | `Value (object)` | Current consumption metrics for this application. |
| `date` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `is_provisional` | `bool` |  |
| `name` | `[]const u8` | Name of the application. |
| `onboarding_steps` | `Value (object)` | Onboarding completion status for this application. |
| `organization_id` | `[]const u8` | UUID of the organization this application belongs to. |
| `quotas` | `Value (object)` | Quota limits for this application. |

#### Example: Load

```zig
switch (client.application(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |application| std.debug.print("{s}\n", .{h.stringify(application.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.application(h.vnull()).list(h.jo(&.{.{ "organization_id", h.vstr("example") }}), h.vnull())) {
    .ok => |applications| {
        for (applications) |application| {
            std.debug.print("{s}\n", .{h.stringify(application.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.application(h.vnull()).create(h.jo(&.{
    .{ "amount", h.vnum(1) }, // i64
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "application_name", h.vstr("example_application_name") }, // []const u8
    .{ "consumption", h.omap() }, // Value (object)
    .{ "date", h.vstr("example_date") }, // []const u8
    .{ "is_provisional", h.vbool(true) }, // bool
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "onboarding_steps", h.omap() }, // Value (object)
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "quotas", h.omap() }, // Value (object)
}), h.vnull())) {
    .ok => |application| std.debug.print("{s}\n", .{h.stringify(application.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### ApplicationSecret

Create an instance: `const application_secret = client.application_secret(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `[]const u8` |  |
| `created_at` | `[]const u8` |  |
| `deleted_at` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `name` | `[]const u8` |  |
| `token` | `[]const u8` |  |

#### Example: List

```zig
switch (client.application_secret(h.vnull()).list(h.jo(&.{.{ "application_id", h.vstr("example") }}), h.vnull())) {
    .ok => |application_secrets| {
        for (application_secrets) |application_secret| {
            std.debug.print("{s}\n", .{h.stringify(application_secret.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.application_secret(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "created_at", h.vstr("example_created_at") }, // []const u8
    .{ "token", h.vstr("example_token") }, // []const u8
}), h.vnull())) {
    .ok => |application_secret| std.debug.print("{s}\n", .{h.stringify(application_secret.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### ApplicationsManagement

Create an instance: `const applications_management = client.applications_management(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.


### EmailPreference

Create an instance: `const email_preference = client.email_preference(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Example: Create

```zig
switch (client.email_preference(h.vnull()).create(h.jo(&.{
}), h.vnull())) {
    .ok => |email_preference| std.debug.print("{s}\n", .{h.stringify(email_preference.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### Error

Create an instance: `const error_ = client.error_(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `detail` | `[]const u8` |  |
| `id` | `[]const u8` | Identifier of the problem that occurred, stable across releases |
| `status` | `i64` |  |
| `title` | `[]const u8` |  |
| `type` | `[]const u8` | Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks. |
| `validation` | `Value (object)` | Which submitted values were rejected and why, keyed by the name of the field they were submitted under. |

#### Example: List

```zig
switch (client.error_(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |error_s| {
        for (error_s) |error_| {
            std.debug.print("{s}\n", .{h.stringify(error_.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```


### Event

Create an instance: `const event = client.event(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | `[]const u8` |  |
| `event_type_name` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `ip` | `[]const u8` |  |
| `labels` | `Value (object)` |  |
| `metadata` | `Value (object)` |  |
| `occurred_at` | `[]const u8` |  |
| `payload` | `[]const u8` |  |
| `payload_content_type` | `[]const u8` |  |
| `received_at` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.event(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("event_id") }, .{ "application_id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |event| std.debug.print("{s}\n", .{h.stringify(event.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.event(h.vnull()).list(h.jo(&.{.{ "application_id", h.vstr("example") }}), h.vnull())) {
    .ok => |events| {
        for (events) |event| {
            std.debug.print("{s}\n", .{h.stringify(event.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.event(h.vnull()).create(h.jo(&.{
    .{ "id", h.vstr("example_id") }, // []const u8
    .{ "event_id", h.vstr("example_event_id") }, // []const u8
    .{ "event_type_name", h.vstr("example_event_type_name") }, // []const u8
    .{ "ip", h.vstr("example_ip") }, // []const u8
    .{ "labels", h.omap() }, // Value (object)
    .{ "occurred_at", h.vstr("example_occurred_at") }, // []const u8
    .{ "payload", h.vstr("example_payload") }, // []const u8
    .{ "payload_content_type", h.vstr("example_payload_content_type") }, // []const u8
    .{ "received_at", h.vstr("example_received_at") }, // []const u8
}), h.vnull())) {
    .ok => |event| std.debug.print("{s}\n", .{h.stringify(event.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### EventType

Create an instance: `const event_type = client.event_type(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `[]const u8` |  |
| `event_type_name` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `resource_type` | `[]const u8` |  |
| `resource_type_name` | `[]const u8` |  |
| `service` | `[]const u8` |  |
| `service_name` | `[]const u8` |  |
| `verb` | `[]const u8` |  |
| `verb_name` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.event_type(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("event_type_id") }, .{ "application_id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |event_type| std.debug.print("{s}\n", .{h.stringify(event_type.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.event_type(h.vnull()).list(h.jo(&.{.{ "application_id", h.vstr("example") }}), h.vnull())) {
    .ok => |event_types| {
        for (event_types) |event_type| {
            std.debug.print("{s}\n", .{h.stringify(event_type.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.event_type(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "event_type_name", h.vstr("example_event_type_name") }, // []const u8
    .{ "resource_type", h.vstr("example_resource_type") }, // []const u8
    .{ "resource_type_name", h.vstr("example_resource_type_name") }, // []const u8
    .{ "service", h.vstr("example_service") }, // []const u8
    .{ "service_name", h.vstr("example_service_name") }, // []const u8
    .{ "verb", h.vstr("example_verb") }, // []const u8
    .{ "verb_name", h.vstr("example_verb_name") }, // []const u8
}), h.vnull())) {
    .ok => |event_type| std.debug.print("{s}\n", .{h.stringify(event_type.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### EventsManagement

Create an instance: `const events_management = client.events_management(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Example: List

```zig
switch (client.events_management(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |events_managements| {
        for (events_managements) |events_management| {
            std.debug.print("{s}\n", .{h.stringify(events_management.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```


### Health

Create an instance: `const health = client.health(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `bool` |  |
| `database_duration_ms` | `i64` |  |
| `object_storage` | `bool` |  |
| `object_storage_duration_ms` | `i64` |  |
| `pulsar` | `bool` |  |
| `pulsar_duration_ms` | `i64` |  |
| `total_duration_ms` | `i64` |  |

#### Example: Load

```zig
switch (client.health(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |health| std.debug.print("{s}\n", .{h.stringify(health.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```


### Hook0

Create an instance: `const hook0 = client.hook0(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default` | `[]const u8` |  |
| `description` | `[]const u8` |  |
| `env_var` | `[]const u8` |  |
| `group` | `[]const u8` |  |
| `name` | `[]const u8` |  |
| `required` | `bool` |  |
| `sensitive` | `bool` |  |

#### Example: List

```zig
switch (client.hook0(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |hook0s| {
        for (hook0s) |hook0| {
            std.debug.print("{s}\n", .{h.stringify(hook0.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```


### IngestedEvent

Create an instance: `const ingested_event = client.ingested_event(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `[]const u8` | UUID of the application this event belongs to. |
| `event_id` | `[]const u8` | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `[]const u8` | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Value (object)` | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Value (object)` | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `[]const u8` | Timestamp when the event occurred. |
| `payload` | `[]const u8` | The event payload. |
| `payload_content_type` | `[]const u8` | Content type of the payload. |

#### Example: Create

```zig
switch (client.ingested_event(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "event_type", h.vstr("example_event_type") }, // []const u8
    .{ "labels", h.omap() }, // Value (object)
    .{ "occurred_at", h.vstr("example_occurred_at") }, // []const u8
    .{ "payload", h.vstr("example_payload") }, // []const u8
    .{ "payload_content_type", h.vstr("example_payload_content_type") }, // []const u8
}), h.vnull())) {
    .ok => |ingested_event| std.debug.print("{s}\n", .{h.stringify(ingested_event.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### Instance

Create an instance: `const instance = client.instance(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_secret_compatibility` | `bool` |  |
| `auto_db_migration` | `bool` |  |
| `biscuit_public_key` | `[]const u8` |  |
| `cloudflare_turnstile_site_key` | `[]const u8` |  |
| `formbricks` | `Value (object)` |  |
| `matomo` | `Value (object)` |  |
| `password_minimum_length` | `i64` |  |
| `quota_enforcement` | `bool` |  |
| `registration_disabled` | `bool` |  |
| `support_email_address` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.instance(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |instance| std.debug.print("{s}\n", .{h.stringify(instance.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```


### Login

Create an instance: `const login = client.login(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `[]const u8` |  |
| `password` | `[]const u8` |  |
| `token` | `[]const u8` |  |

#### Example: Create

```zig
switch (client.login(h.vnull()).create(h.jo(&.{
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "password", h.vstr("example_password") }, // []const u8
    .{ "token", h.vstr("example_token") }, // []const u8
}), h.vnull())) {
    .ok => |login| std.debug.print("{s}\n", .{h.stringify(login.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### Organization

Create an instance: `const organization = client.organization(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `i64` |  |
| `application_id` | `[]const u8` |  |
| `application_name` | `[]const u8` |  |
| `consumption` | `Value (object)` |  |
| `date` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `is_provisional` | `bool` |  |
| `name` | `[]const u8` |  |
| `onboarding_steps` | `Value (object)` |  |
| `organization_id` | `[]const u8` |  |
| `plan` | `Value (object)` |  |
| `quotas` | `Value (object)` |  |
| `role` | `[]const u8` |  |
| `users` | `Value (array)` |  |

#### Example: Load

```zig
switch (client.organization(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("organization_id") }}), h.vnull())) {
    .ok => |organization| std.debug.print("{s}\n", .{h.stringify(organization.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.organization(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |organizations| {
        for (organizations) |organization| {
            std.debug.print("{s}\n", .{h.stringify(organization.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.organization(h.vnull()).create(h.jo(&.{
    .{ "amount", h.vnum(1) }, // i64
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "application_name", h.vstr("example_application_name") }, // []const u8
    .{ "consumption", h.omap() }, // Value (object)
    .{ "date", h.vstr("example_date") }, // []const u8
    .{ "is_provisional", h.vbool(true) }, // bool
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "onboarding_steps", h.omap() }, // Value (object)
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "plan", h.omap() }, // Value (object)
    .{ "quotas", h.omap() }, // Value (object)
    .{ "role", h.vstr("example_role") }, // []const u8
    .{ "users", h.olist() }, // Value (array)
}), h.vnull())) {
    .ok => |organization| std.debug.print("{s}\n", .{h.stringify(organization.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### OrganizationEditRole

Create an instance: `const organization_edit_role = client.organization_edit_role(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `[]const u8` |  |
| `role` | `[]const u8` |  |
| `user_id` | `[]const u8` |  |


### Quota

Create an instance: `const quota = client.quota(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |
| `limits` | `Value (object)` |  |

#### Example: Load

```zig
switch (client.quota(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |quota| std.debug.print("{s}\n", .{h.stringify(quota.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```


### Registration

Create an instance: `const registration = client.registration(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `[]const u8` |  |
| `first_name` | `[]const u8` |  |
| `gclid` | `[]const u8` | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `[]const u8` |  |
| `password` | `[]const u8` |  |
| `signup_channel` | `[]const u8` | Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters. |
| `turnstile_token` | `[]const u8` |  |

#### Example: Create

```zig
switch (client.registration(h.vnull()).create(h.jo(&.{
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "first_name", h.vstr("example_first_name") }, // []const u8
    .{ "last_name", h.vstr("example_last_name") }, // []const u8
    .{ "password", h.vstr("example_password") }, // []const u8
}), h.vnull())) {
    .ok => |registration| std.debug.print("{s}\n", .{h.stringify(registration.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### RequestAttempt

Create an instance: `const request_attempt = client.request_attempt(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `[]const u8` |  |
| `delay_until` | `[]const u8` |  |
| `event` | `Value (object)` |  |
| `event_id` | `[]const u8` |  |
| `failed_at` | `[]const u8` |  |
| `http_response_status` | `i64` |  |
| `id` | `[]const u8` |  |
| `picked_at` | `[]const u8` |  |
| `request_attempt_id` | `[]const u8` |  |
| `response_id` | `[]const u8` |  |
| `retry_count` | `i64` |  |
| `status` | `Value (object)` | Status of a request attempt. |
| `subscription` | `Value (object)` |  |
| `succeeded_at` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.request_attempt(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("request_attempt_id") }, .{ "application_id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |request_attempt| std.debug.print("{s}\n", .{h.stringify(request_attempt.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.request_attempt(h.vnull()).list(h.jo(&.{.{ "application_id", h.vstr("example") }}), h.vnull())) {
    .ok => |request_attempts| {
        for (request_attempts) |request_attempt| {
            std.debug.print("{s}\n", .{h.stringify(request_attempt.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```


### Response

Create an instance: `const response = client.response(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `[]const u8` |  |
| `elapsed_time_ms` | `i64` |  |
| `headers` | `Value (object)` |  |
| `http_code` | `i64` |  |
| `id` | `[]const u8` |  |
| `response_error_name` | `[]const u8` |  |
| `response_id` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.response(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("response_id") }, .{ "application_id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |response| std.debug.print("{s}\n", .{h.stringify(response.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```


### Revoke

Create an instance: `const revoke = client.revoke(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.


### ServiceToken

Create an instance: `const service_token = client.service_token(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biscuit` | `[]const u8` |  |
| `created_at` | `[]const u8` |  |
| `id` | `[]const u8` |  |
| `name` | `[]const u8` |  |
| `organization_id` | `[]const u8` |  |
| `token_id` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.service_token(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("service_token_id") }, .{ "organization_id", h.vstr("organization_id") }}), h.vnull())) {
    .ok => |service_token| std.debug.print("{s}\n", .{h.stringify(service_token.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.service_token(h.vnull()).list(h.jo(&.{.{ "organization_id", h.vstr("example") }}), h.vnull())) {
    .ok => |service_tokens| {
        for (service_tokens) |service_token| {
            std.debug.print("{s}\n", .{h.stringify(service_token.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.service_token(h.vnull()).create(h.jo(&.{
    .{ "biscuit", h.vstr("example_biscuit") }, // []const u8
    .{ "created_at", h.vstr("example_created_at") }, // []const u8
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "token_id", h.vstr("example_token_id") }, // []const u8
}), h.vnull())) {
    .ok => |service_token| std.debug.print("{s}\n", .{h.stringify(service_token.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### Subscription

Create an instance: `const subscription = client.subscription(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |
| `list(reqmatch, ctrl)` | List entities, optionally matching the given criteria. |
| `load(reqmatch, ctrl)` | Load a single entity by match criteria. |
| `remove(reqmatch, ctrl)` | Remove the matching entity. |
| `update(reqdata, ctrl)` | Update an existing entity. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `[]const u8` |  |
| `created_at` | `[]const u8` |  |
| `dedicated_workers` | `Value (array)` |  |
| `description` | `[]const u8` |  |
| `event_types` | `Value (array)` |  |
| `id` | `[]const u8` |  |
| `is_enabled` | `bool` |  |
| `label_key` | `[]const u8` | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `[]const u8` | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Value (object)` |  |
| `metadata` | `Value (object)` |  |
| `secret` | `[]const u8` |  |
| `subscription_id` | `[]const u8` |  |
| `target` | `Value (object)` |  |
| `updated_at` | `[]const u8` |  |

#### Example: Load

```zig
switch (client.subscription(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("subscription_id") }}), h.vnull())) {
    .ok => |subscription| std.debug.print("{s}\n", .{h.stringify(subscription.asEntity().data(null))}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### Example: List

```zig
switch (client.subscription(h.vnull()).list(h.jo(&.{.{ "application_id", h.vstr("example") }}), h.vnull())) {
    .ok => |subscriptions| {
        for (subscriptions) |subscription| {
            std.debug.print("{s}\n", .{h.stringify(subscription.asEntity().data(null))});
        }
    },
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### Example: Create

```zig
switch (client.subscription(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "created_at", h.vstr("example_created_at") }, // []const u8
    .{ "dedicated_workers", h.olist() }, // Value (array)
    .{ "event_types", h.olist() }, // Value (array)
    .{ "is_enabled", h.vbool(true) }, // bool
    .{ "label_key", h.vstr("example_label_key") }, // []const u8
    .{ "label_value", h.vstr("example_label_value") }, // []const u8
    .{ "labels", h.omap() }, // Value (object)
    .{ "metadata", h.omap() }, // Value (object)
    .{ "secret", h.vstr("example_secret") }, // []const u8
    .{ "subscription_id", h.vstr("example_subscription_id") }, // []const u8
    .{ "target", h.omap() }, // Value (object)
    .{ "updated_at", h.vstr("example_updated_at") }, // []const u8
}), h.vnull())) {
    .ok => |subscription| std.debug.print("{s}\n", .{h.stringify(subscription.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### UserAuthentication

Create an instance: `const user_authentication = client.user_authentication(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current_password` | `[]const u8` |  |
| `email` | `[]const u8` |  |
| `new_password` | `[]const u8` |  |
| `token` | `[]const u8` |  |

#### Example: Create

```zig
switch (client.user_authentication(h.vnull()).create(h.jo(&.{
    .{ "current_password", h.vstr("example_current_password") }, // []const u8
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "new_password", h.vstr("example_new_password") }, // []const u8
    .{ "token", h.vstr("example_token") }, // []const u8
}), h.vnull())) {
    .ok => |user_authentication| std.debug.print("{s}\n", .{h.stringify(user_authentication.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```


### UserInvitation

Create an instance: `const user_invitation = client.user_invitation(h.vnull());`

#### Operations

| Method | Description |
| --- | --- |
| `create(reqdata, ctrl)` | Create a new entity with the given data. |

Each operation returns a result union — `switch` on it: `.ok` carries the
entity (for `list`, a slice of entities, one per record), whose record
`asEntity().data(null)` reads, and `.err => |e|` the branded error.

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `[]const u8` |  |
| `role` | `[]const u8` |  |

#### Example: Create

```zig
switch (client.user_invitation(h.vnull()).create(h.jo(&.{
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "role", h.vstr("example_role") }, // []const u8
}), h.vnull())) {
    .ok => |user_invitation| std.debug.print("{s}\n", .{h.stringify(user_invitation.asEntity().data(null))}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
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
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as `Value`

The Zig SDK uses a single dynamic `Value` type throughout rather than a
typed struct per entity. `Value` is the vendored voxgig struct port's
`JsonValue` (a JSON-shaped tagged union: `.string`, `.integer`,
`.float`, `.bool`, `.array`, `.object`, `.null`). This mirrors the
dynamic nature of the API and keeps the SDK flexible — no code generation is
needed when the API schema changes.

Build request maps with the `h.jo` / `h.ja` helpers and read fields back
with `h.getp` (or the typed `h.get_str` / `h.get_bool` / `h.to_int`
accessors); use `h.to_map` to safely coerce a value to a map.

### Module structure

```
zig/
├── root.zig                     -- Module root (re-exports the public surface)
├── build.zig                    -- Build + test wiring
├── core/                        -- Pipeline types, config, client (sdk.zig)
├── entity/                      -- Per-entity clients (one file each)
├── feature/                     -- Built-in features (base, test, log)
├── utility/                     -- Utilities + the vendored voxgig struct port
└── test/                        -- Test suites
```

The public API is re-exported from `root.zig`, so `@import("sdk")` reaches
the SDK client, `Value`, and the `h` (helpers) namespace directly. Import
entity or utility modules only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const response = client.Response()
await response.load({ id: "example_id", application_id: "example" })

// response.data() now returns the response data from the last `load`
// response.match() returns { id: "example_id" }
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
