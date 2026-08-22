# Hook0 Zig SDK Reference

Complete API reference for the Hook0 Zig SDK.


## Hook0SDK

### Constructor

```zig
const sdk = @import("sdk");
const h = sdk.h;

const client = sdk.Hook0SDK.new(options);
```

Create a new SDK client instance. `options` is a `Value` map
(`h.vnull()` for none).

**Parameters:**

| Key | Value type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL for API requests. |
| `prefix` | `string` | URL prefix appended after base. |
| `suffix` | `string` | URL suffix appended after path. |
| `headers` | `map` | Custom headers for all requests. |
| `feature` | `map` | Feature configuration. |
| `system` | `map` | System overrides. |


### Static Functions

#### `test_sdk(testopts: Value, sdkopts: Value) *Hook0SDK`

Create a test client with mock features active. Both arguments may be
`h.vnull()`.

```zig
const client = sdk.test_sdk(h.vnull(), h.vnull());
```


### Instance Methods

#### `application(entopts: Value) *ApplicationEntity`

Create a new `ApplicationEntity` instance. Pass `h.vnull()` for no
initial options.

#### `application_secret(entopts: Value) *ApplicationSecretEntity`

Create a new `ApplicationSecretEntity` instance. Pass `h.vnull()` for no
initial options.

#### `applications_management(entopts: Value) *ApplicationsManagementEntity`

Create a new `ApplicationsManagementEntity` instance. Pass `h.vnull()` for no
initial options.

#### `event(entopts: Value) *EventEntity`

Create a new `EventEntity` instance. Pass `h.vnull()` for no
initial options.

#### `event_type(entopts: Value) *EventTypeEntity`

Create a new `EventTypeEntity` instance. Pass `h.vnull()` for no
initial options.

#### `events_management(entopts: Value) *EventsManagementEntity`

Create a new `EventsManagementEntity` instance. Pass `h.vnull()` for no
initial options.

#### `events_per_day_entry(entopts: Value) *EventsPerDayEntryEntity`

Create a new `EventsPerDayEntryEntity` instance. Pass `h.vnull()` for no
initial options.

#### `health(entopts: Value) *HealthEntity`

Create a new `HealthEntity` instance. Pass `h.vnull()` for no
initial options.

#### `hook0(entopts: Value) *Hook0Entity`

Create a new `Hook0Entity` instance. Pass `h.vnull()` for no
initial options.

#### `ingested_event(entopts: Value) *IngestedEventEntity`

Create a new `IngestedEventEntity` instance. Pass `h.vnull()` for no
initial options.

#### `instance(entopts: Value) *InstanceEntity`

Create a new `InstanceEntity` instance. Pass `h.vnull()` for no
initial options.

#### `login(entopts: Value) *LoginEntity`

Create a new `LoginEntity` instance. Pass `h.vnull()` for no
initial options.

#### `organization(entopts: Value) *OrganizationEntity`

Create a new `OrganizationEntity` instance. Pass `h.vnull()` for no
initial options.

#### `organization_edit_role(entopts: Value) *OrganizationEditRoleEntity`

Create a new `OrganizationEditRoleEntity` instance. Pass `h.vnull()` for no
initial options.

#### `problem(entopts: Value) *ProblemEntity`

Create a new `ProblemEntity` instance. Pass `h.vnull()` for no
initial options.

#### `quota(entopts: Value) *QuotaEntity`

Create a new `QuotaEntity` instance. Pass `h.vnull()` for no
initial options.

#### `registration(entopts: Value) *RegistrationEntity`

Create a new `RegistrationEntity` instance. Pass `h.vnull()` for no
initial options.

#### `request_attempt(entopts: Value) *RequestAttemptEntity`

Create a new `RequestAttemptEntity` instance. Pass `h.vnull()` for no
initial options.

#### `response(entopts: Value) *ResponseEntity`

Create a new `ResponseEntity` instance. Pass `h.vnull()` for no
initial options.

#### `revoke(entopts: Value) *RevokeEntity`

Create a new `RevokeEntity` instance. Pass `h.vnull()` for no
initial options.

#### `service_token(entopts: Value) *ServiceTokenEntity`

Create a new `ServiceTokenEntity` instance. Pass `h.vnull()` for no
initial options.

#### `subscription(entopts: Value) *SubscriptionEntity`

Create a new `SubscriptionEntity` instance. Pass `h.vnull()` for no
initial options.

#### `user_authentication(entopts: Value) *UserAuthenticationEntity`

Create a new `UserAuthenticationEntity` instance. Pass `h.vnull()` for no
initial options.

#### `user_invitation(entopts: Value) *UserInvitationEntity`

Create a new `UserInvitationEntity` instance. Pass `h.vnull()` for no
initial options.

#### `options_map() Value`

Return a deep copy of the current SDK options.

#### `get_utility() *Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs: Value) Value`

Make a direct HTTP request to any API endpoint. Returns a result `Value`
map with `ok`, `status`, `headers`, and `data` (or `err` on failure).
This escape hatch returns a map even on a non-2xx response — branch on
`h.get_bool(result, "ok")`.

**Parameters (`fetchargs` map keys):**

| Key | Value type | Description |
| --- | --- | --- |
| `path` | `string` | URL path with optional `{param}` placeholders. |
| `method` | `string` | HTTP method (default: `"GET"`). |
| `params` | `map` | Path parameter values. |
| `query` | `map` | Query string parameters. |
| `headers` | `map` | Request headers (merged with defaults). |
| `body` | `any` | Request body (maps are JSON-serialized). |

#### `prepare(fetchargs: Value) E!Value`

Prepare a fetch definition without sending. Returns the fetchdef (use
`catch`/`try` to handle the error union).


---

## ApplicationEntity

```zig
const application = client.application(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes | Unique identifier of the application. |
| `consumption` | `Value (object)` | Yes | Current consumption metrics for this application. |
| `name` | `[]const u8` | Yes | Name of the application. |
| `onboarding_steps` | `Value (object)` | Yes | Onboarding completion status for this application. |
| `organization_id` | `[]const u8` | Yes | UUID of the organization this application belongs to. |
| `quotas` | `Value (object)` | Yes | Quota limits for this application. |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.application(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "consumption", h.omap() }, // Value (object)
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "onboarding_steps", h.omap() }, // Value (object)
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "quotas", h.omap() }, // Value (object)
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.application(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.application(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.application(h.vnull()).remove(h.jo(&.{.{ "id", h.vstr("application_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.application(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("application_id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## ApplicationSecretEntity

```zig
const application_secret = client.application_secret(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes |  |
| `created_at` | `[]const u8` | Yes |  |
| `deleted_at` | `[]const u8` | No |  |
| `name` | `[]const u8` | No |  |
| `token` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.application_secret(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "created_at", h.vstr("example_created_at") }, // []const u8
    .{ "token", h.vstr("example_token") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.application_secret(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.application_secret(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## ApplicationsManagementEntity

```zig
const applications_management = client.applications_management(h.vnull());
```

### Operations

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.applications_management(h.vnull()).remove(h.jo(&.{.{ "application_secret_token", h.vstr("application_secret_token") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## EventEntity

```zig
const event = client.event(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `[]const u8` | Yes |  |
| `event_type_name` | `[]const u8` | Yes |  |
| `ip` | `[]const u8` | Yes |  |
| `labels` | `Value (object)` | Yes |  |
| `metadata` | `Value (object)` | No |  |
| `occurred_at` | `[]const u8` | Yes |  |
| `payload` | `[]const u8` | Yes |  |
| `payload_content_type` | `[]const u8` | Yes |  |
| `received_at` | `[]const u8` | Yes |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.event(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.event(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("event_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## EventTypeEntity

```zig
const event_type = client.event_type(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes |  |
| `event_type_name` | `[]const u8` | Yes |  |
| `resource_type` | `[]const u8` | Yes |  |
| `resource_type_name` | `[]const u8` | Yes |  |
| `service` | `[]const u8` | Yes |  |
| `service_name` | `[]const u8` | Yes |  |
| `verb` | `[]const u8` | Yes |  |
| `verb_name` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

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
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.event_type(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.event_type(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("event_type_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## EventsManagementEntity

```zig
const events_management = client.events_management(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.events_management(h.vnull()).create(h.jo(&.{
    .{ "event_id", h.vstr("example_event_id") }, // []const u8
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.events_management(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.events_management(h.vnull()).remove(h.jo(&.{.{ "event_type_name", h.vstr("event_type_name") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## EventsPerDayEntryEntity

```zig
const events_per_day_entry = client.events_per_day_entry(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `i64` | Yes |  |
| `application_id` | `[]const u8` | Yes |  |
| `application_name` | `[]const u8` | Yes |  |
| `date` | `[]const u8` | Yes |  |
| `is_provisional` | `bool` | Yes |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.events_per_day_entry(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## HealthEntity

```zig
const health = client.health(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `bool` | Yes |  |
| `database_duration_ms` | `i64` | Yes |  |
| `object_storage` | `bool` | No |  |
| `object_storage_duration_ms` | `i64` | No |  |
| `pulsar` | `bool` | No |  |
| `pulsar_duration_ms` | `i64` | No |  |
| `total_duration_ms` | `i64` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.health(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## Hook0Entity

```zig
const hook0 = client.hook0(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default` | `[]const u8` | No |  |
| `description` | `[]const u8` | No |  |
| `env_var` | `[]const u8` | Yes |  |
| `group` | `[]const u8` | No |  |
| `name` | `[]const u8` | Yes |  |
| `required` | `bool` | Yes |  |
| `sensitive` | `bool` | Yes |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.hook0(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## IngestedEventEntity

```zig
const ingested_event = client.ingested_event(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes | UUID of the application this event belongs to. |
| `event_id` | `[]const u8` | No | Optional unique identifier for this event (client-generated UUID). |
| `event_type` | `[]const u8` | Yes | The type of event (e.g., 'user.created', 'order.completed'). |
| `labels` | `Value (object)` | Yes | Labels for event filtering and routing to subscriptions. |
| `metadata` | `Value (object)` | No | Optional metadata key-value pairs associated with the event. |
| `occurred_at` | `[]const u8` | Yes | Timestamp when the event occurred. |
| `payload` | `[]const u8` | Yes | The event payload. |
| `payload_content_type` | `[]const u8` | Yes | Content type of the payload. |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.ingested_event(h.vnull()).create(h.jo(&.{
    .{ "application_id", h.vstr("example_application_id") }, // []const u8
    .{ "event_type", h.vstr("example_event_type") }, // []const u8
    .{ "labels", h.omap() }, // Value (object)
    .{ "occurred_at", h.vstr("example_occurred_at") }, // []const u8
    .{ "payload", h.vstr("example_payload") }, // []const u8
    .{ "payload_content_type", h.vstr("example_payload_content_type") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## InstanceEntity

```zig
const instance = client.instance(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_secret_compatibility` | `bool` | Yes |  |
| `auto_db_migration` | `bool` | Yes |  |
| `biscuit_public_key` | `[]const u8` | Yes |  |
| `cloudflare_turnstile_site_key` | `[]const u8` | No |  |
| `formbricks` | `Value (object)` | Yes |  |
| `matomo` | `Value (object)` | Yes |  |
| `password_minimum_length` | `i64` | Yes |  |
| `quota_enforcement` | `bool` | Yes |  |
| `registration_disabled` | `bool` | Yes |  |
| `support_email_address` | `[]const u8` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.instance(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## LoginEntity

```zig
const login = client.login(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `[]const u8` | Yes |  |
| `password` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.login(h.vnull()).create(h.jo(&.{
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "password", h.vstr("example_password") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## OrganizationEntity

```zig
const organization = client.organization(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `consumption` | `Value (object)` | Yes |  |
| `name` | `[]const u8` | Yes |  |
| `onboarding_steps` | `Value (object)` | Yes |  |
| `organization_id` | `[]const u8` | Yes |  |
| `plan` | `Value (object)` | Yes |  |
| `quotas` | `Value (object)` | Yes |  |
| `role` | `[]const u8` | Yes |  |
| `users` | `Value (array)` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.organization(h.vnull()).create(h.jo(&.{
    .{ "consumption", h.omap() }, // Value (object)
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "onboarding_steps", h.omap() }, // Value (object)
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "plan", h.omap() }, // Value (object)
    .{ "quotas", h.omap() }, // Value (object)
    .{ "role", h.vstr("example_role") }, // []const u8
    .{ "users", h.olist() }, // Value (array)
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.organization(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.organization(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("organization_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.organization(h.vnull()).remove(h.jo(&.{.{ "id", h.vstr("organization_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.organization(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("organization_id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## OrganizationEditRoleEntity

```zig
const organization_edit_role = client.organization_edit_role(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `[]const u8` | Yes |  |
| `user_id` | `[]const u8` | Yes |  |

### Operations

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.organization_edit_role(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## ProblemEntity

```zig
const problem = client.problem(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `[]const u8` | Yes |  |
| `id` | `[]const u8` | Yes |  |
| `status` | `i64` | Yes |  |
| `title` | `[]const u8` | Yes |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.problem(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## QuotaEntity

```zig
const quota = client.quota(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `global_applications_per_organization_limit` | `i64` | Yes |  |
| `global_days_of_events_retention_limit` | `i64` | Yes |  |
| `global_event_types_per_application_limit` | `i64` | Yes |  |
| `global_events_per_day_limit` | `i64` | Yes |  |
| `global_members_per_organization_limit` | `i64` | Yes |  |
| `global_subscriptions_per_application_limit` | `i64` | Yes |  |

### Operations

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.quota(h.vnull()).load(h.vnull(), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## RegistrationEntity

```zig
const registration = client.registration(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `[]const u8` | Yes |  |
| `first_name` | `[]const u8` | Yes |  |
| `gclid` | `[]const u8` | No | Optional Google Ads click identifier captured during the user's journey from a Google Ad. |
| `last_name` | `[]const u8` | Yes |  |
| `password` | `[]const u8` | Yes |  |
| `turnstile_token` | `[]const u8` | No |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.registration(h.vnull()).create(h.jo(&.{
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "first_name", h.vstr("example_first_name") }, // []const u8
    .{ "last_name", h.vstr("example_last_name") }, // []const u8
    .{ "password", h.vstr("example_password") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## RequestAttemptEntity

```zig
const request_attempt = client.request_attempt(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `[]const u8` | Yes |  |
| `delay_until` | `[]const u8` | No |  |
| `event` | `Value (object)` | Yes |  |
| `event_id` | `[]const u8` | Yes |  |
| `failed_at` | `[]const u8` | No |  |
| `http_response_status` | `i64` | No |  |
| `picked_at` | `[]const u8` | No |  |
| `request_attempt_id` | `[]const u8` | Yes |  |
| `response_id` | `[]const u8` | No |  |
| `retry_count` | `i64` | Yes |  |
| `status` | `Value (object)` | Yes | Status of a request attempt. |
| `subscription` | `Value (object)` | Yes |  |
| `succeeded_at` | `[]const u8` | No |  |

### Operations

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.request_attempt(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.request_attempt(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("request_attempt_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## ResponseEntity

```zig
const response = client.response(h.vnull());
```

### Operations

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.response(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("response_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## RevokeEntity

```zig
const revoke = client.revoke(h.vnull());
```

### Operations

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.revoke(h.vnull()).remove(h.jo(&.{.{ "organization_id", h.vstr("organization_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## ServiceTokenEntity

```zig
const service_token = client.service_token(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biscuit` | `[]const u8` | Yes |  |
| `created_at` | `[]const u8` | Yes |  |
| `name` | `[]const u8` | Yes |  |
| `organization_id` | `[]const u8` | Yes |  |
| `token_id` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.service_token(h.vnull()).create(h.jo(&.{
    .{ "biscuit", h.vstr("example_biscuit") }, // []const u8
    .{ "created_at", h.vstr("example_created_at") }, // []const u8
    .{ "name", h.vstr("example_name") }, // []const u8
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "token_id", h.vstr("example_token_id") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.service_token(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.service_token(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("service_token_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.service_token(h.vnull()).remove(h.jo(&.{.{ "id", h.vstr("service_token_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.service_token(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("service_token_id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## SubscriptionEntity

```zig
const subscription = client.subscription(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `[]const u8` | Yes |  |
| `created_at` | `[]const u8` | Yes |  |
| `dedicated_workers` | `Value (array)` | Yes |  |
| `description` | `[]const u8` | No |  |
| `event_types` | `Value (array)` | Yes |  |
| `is_enabled` | `bool` | Yes |  |
| `label_key` | `[]const u8` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `label_value` | `[]const u8` | Yes | _Kept for backward compatibility, you should use `labels`_ |
| `labels` | `Value (object)` | Yes |  |
| `metadata` | `Value (object)` | Yes |  |
| `secret` | `[]const u8` | Yes |  |
| `subscription_id` | `[]const u8` | Yes |  |
| `target` | `Value (object)` | Yes |  |
| `updated_at` | `[]const u8` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `application_id` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `dedicated_workers` | - | - | Yes | Yes | - |
| `description` | - | - | - | - | - |
| `event_types` | - | - | - | - | - |
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

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

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
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

#### `list(reqmatch: Value, ctrl: Value) OpResult`

List entities matching the given criteria. The match is optional — pass `h.vnull()` to list all records. `.ok` is a `Value` array.

```zig
switch (client.subscription(h.vnull()).list(h.vnull(), h.vnull())) {
    .ok => |results| std.debug.print("{s}\n", .{h.stringify(results)}),
    .err => |e| std.debug.print("list failed: {s}\n", .{e.msg}),
}
```

#### `load(reqmatch: Value, ctrl: Value) OpResult`

Load a single entity matching the given criteria. `.ok` carries the entity data, `.err` the branded error.

```zig
switch (client.subscription(h.vnull()).load(h.jo(&.{.{ "id", h.vstr("subscription_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("load failed: {s}\n", .{e.msg}),
}
```

#### `remove(reqmatch: Value, ctrl: Value) OpResult`

Remove the entity matching the given criteria. `.err` on failure.

```zig
switch (client.subscription(h.vnull()).remove(h.jo(&.{.{ "id", h.vstr("subscription_id") }}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("remove failed: {s}\n", .{e.msg}),
}
```

#### `update(reqdata: Value, ctrl: Value) OpResult`

Update an existing entity. The data must include the entity id. `.ok` carries the updated entity data.

```zig
switch (client.subscription(h.vnull()).update(h.jo(&.{
    .{ "id", h.vstr("subscription_id") },
    // Fields to update
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("update failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## UserAuthenticationEntity

```zig
const user_authentication = client.user_authentication(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `[]const u8` | Yes |  |
| `new_password` | `[]const u8` | Yes |  |
| `token` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.user_authentication(h.vnull()).create(h.jo(&.{
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "new_password", h.vstr("example_new_password") }, // []const u8
    .{ "token", h.vstr("example_token") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## UserInvitationEntity

```zig
const user_invitation = client.user_invitation(h.vnull());
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `[]const u8` | Yes |  |
| `role` | `[]const u8` | Yes |  |

### Operations

#### `create(reqdata: Value, ctrl: Value) OpResult`

Create a new entity with the given data. `.ok` carries the created entity data.

```zig
switch (client.user_invitation(h.vnull()).create(h.jo(&.{
    .{ "organization_id", h.vstr("example_organization_id") }, // []const u8
    .{ "email", h.vstr("example_email") }, // []const u8
    .{ "role", h.vstr("example_role") }, // []const u8
}), h.vnull())) {
    .ok => |result| std.debug.print("{s}\n", .{h.stringify(result)}),
    .err => |e| std.debug.print("create failed: {s}\n", .{e.msg}),
}
```

### Common Methods

#### `data(args: ?Value) Value`

Get the entity data. Pass a map to set it.

#### `matchv(args: ?Value) Value`

Get the entity match criteria. Pass a map to set it.

#### `stream(action: []const u8, args: Value, callopts: Value) []Value`

Run an operation through the pipeline and materialise its result items.

#### `get_name() []const u8`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```zig
const client = sdk.Hook0SDK.new(h.jo(&.{
    .{ "feature", h.jo(&.{
        .{ "test", h.jo(&.{.{ "active", h.vbool(true) }}) },
    }) },
}));
```

