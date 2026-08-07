# Hook0 SDK

Hook0 API clients in TypeScript, JavaScript, Go, Python, PHP, and Lua, plus a
CLI and an MCP server. All generated from Hook0's public OpenAPI spec, so every
surface stays in sync with the API.

> **Unofficial.** This is an unofficial SDK for the Hook0 public API, built by
> [Voxgig](https://voxgig.com/sdk). It is not affiliated with, endorsed by, or
> sponsored by Hook0.

**Why this exists:** Voxgig builds public SDK and MCP examples for APIs we think
are interesting. This is one of those. MIT-licensed, take whatever's useful.

Hook0 already publishes its own producer-side clients for TypeScript and Rust,
plus an MCP server and a CLI. This repo is a different slice: the full
54-operation management API (applications, subscriptions, event types, service
tokens, organizations, invites, request attempts, replay), in six languages,
generated straight from `swagger.json`.

## Try it (TypeScript)

```bash
git clone https://github.com/voxgig-sdk/hook0-sdk
cd hook0-sdk/ts
npm install && npm run build && npm test
```

The test suite runs fully offline. Every SDK ships a test mode that swaps the
HTTP transport for an in-memory mock, so you can try it without credentials or a
network.

## 30-second quickstart

No credentials needed for this one. `GET /api/v1/instance/` is public, and this
snippet was run live against `app.hook0.com` on 2026-08-07:

```ts
import { Hook0SDK } from '@voxgig-sdk/hook0'

const client = new Hook0SDK()

const instance = await client.Instance().load()
console.log(instance.support_email_address)
// support@hook0.com
```

With a token, the management API works the same way. Pass the bare token, the
SDK adds the `Bearer` prefix:

```ts
import { Hook0SDK } from '@voxgig-sdk/hook0'

const client = new Hook0SDK({
  apikey: process.env.HOOK0_APIKEY,
})

// GET /api/v1/applications/?organization_id=...
const applications = await client.Application().list({
  organization_id: process.env.HOOK0_ORGANIZATION_ID,
})

for (const application of applications) {
  console.log(application.application_id, application.name)
}
```

## Point it at your own instance

Hook0 is self-hostable, so the base URL is a constructor option. The default is
the cloud host, `https://app.hook0.com`:

```ts
import { Hook0SDK } from '@voxgig-sdk/hook0'

const client = new Hook0SDK({
  base: 'http://localhost:8081',
  apikey: process.env.HOOK0_APIKEY,
})

const req = await client.prepare({ path: '/api/v1/applications', method: 'GET' })
console.log(req.url)
// http://localhost:8081/api/v1/applications
```

Every language target takes the same `base` option. The CLI reads `HOOK0_BASE`
from the environment.

One note on the spec, since self-hosting is the reason this matters. Hook0's
`swagger.json` declares a single hardcoded server, `https://app.hook0.com`, with
no server variable. Generated clients are therefore cloud-only unless the
generator, or the caller, overrides the base URL. A `{baseUrl}` server variable
defaulted to the cloud host would fix that for every OpenAPI generator at once.

## What's in the box

| Surface | Use it for | Where |
| --- | --- | --- |
| SDK, 6 languages | App integration | `ts/` `js/` `go/` `py/` `php/` `lua/` |
| CLI | Scripts, CI, exploration (interactive REPL mode included) | `go-cli/` |
| MCP server | AI agents: Claude, Cursor, and friends | `go-mcp/` |
| Agent guide | Points coding agents at all of the above | `AGENTS.md` |
| Vendored spec | The exact `swagger.json` this was built from | `.sdk/def/` |

All of it comes from one spec. Change the spec, regenerate, and every surface
updates together. None of them drift.

## Using the MCP server

Build the server, then register it with your agent:

```bash
cd go-mcp && go build -o hook0-mcp .
```

```json
{
  "mcpServers": {
    "hook0": {
      "command": "/abs/path/to/hook0-mcp",
      "env": { "HOOK0_APIKEY": "your-token" }
    }
  }
}
```

It speaks stdio by default, and streamable HTTP with `-transport http`. It
exposes two tools, `hook0_list` and `hook0_load`, each taking an `entity` name
from the table below plus an optional `query` map. Verified against the built
binary on 2026-08-07.

## Honest state

Generated from Hook0's public OpenAPI spec (`https://app.hook0.com/api/v1/swagger.json`,
fetched 2026-08-07, sha256 `368349cf...`) on 2026-08-07. Not production-tuned.

Known rough edge: entity names are derived from the spec's tags and path shapes,
and a few of them land badly. `Hook0` is really the `/environment_variables/`
endpoint, because five unrelated read-only endpoints (environment variables,
errors, health, instance, quotas) all carry the single catch-all tag `Hook0`.
`UserInvitation`, `OrganizationEditRole` and `Revoke` are three entity names
sitting on the one `/organizations/{organization_id}/invite` path, one per HTTP
method. Read those rows in the Entities table as the paths, not the nouns. A
top-level `tags` block with one tag per resource would fix this for every
generator, not just this one.

Use it as a starting point or a reference.

When teams want SDKs like these production-grade, idiomatic per language,
tested, documented, and released through a real pipeline, Voxgig does that work
as a consulting engagement. The toolkit also generates Java and C# if your
customers need them.

## Entities, not endpoints

This SDK exposes the API as **24 semantic entities** that you
call directly, instead of assembling URL paths and query strings. See the [Entities](#entities) table below for the full list. Entities are
**Capitalised** to mark them as the primary surface, each with the operations they
support (`list`, `load`, `create`, `update`, `remove`):

```ts
const client = new Hook0SDK()
const items = await client.Application().list()
```

Thinking in entities keeps the mental model small — for people and AI agents alike —
rather than reasoning about raw HTTP routes and query parameters.

## Entities

The API exposes 24 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Application** | The Application entity (create, list, load, remove, update). | `/api/v1/applications/` |
| **ApplicationSecret** | The ApplicationSecret entity (create, list, update). | `/api/v1/application_secrets/` |
| **ApplicationsManagement** | The ApplicationsManagement entity (remove). | `/api/v1/application_secrets/{application_secret_token}` |
| **Event** | The Event entity (list, load). | `/api/v1/events/` |
| **EventType** | The EventType entity (create, list, load). | `/api/v1/event_types/` |
| **EventsManagement** | The EventsManagement entity (create, list, remove). | `/api/v1/events/{event_id}/replay` |
| **EventsPerDayEntry** | The EventsPerDayEntry entity (list). | `/api/v1/events_per_day/application` |
| **Health** | The Health entity (load). | `/api/v1/health/` |
| **Hook0** | The Hook0 entity (list). | `/api/v1/environment_variables/` |
| **IngestedEvent** | The IngestedEvent entity (create). | `/api/v1/event/` |
| **Instance** | The Instance entity (load). | `/api/v1/instance/` |
| **Login** | The Login entity (create). | `/api/v1/auth/login` |
| **Organization** | The Organization entity (create, list, load, remove, update). | `/api/v1/organizations/` |
| **OrganizationEditRole** | The OrganizationEditRole entity (update). | `/api/v1/organizations/{organization_id}/invite` |
| **Problem** | The Problem entity (list). | `/api/v1/errors/` |
| **Quota** | The Quota entity (load). | `/api/v1/quotas/` |
| **Registration** | The Registration entity (create). | `/api/v1/register/` |
| **RequestAttempt** | The RequestAttempt entity (list, load). | `/api/v1/request_attempts/` |
| **Response** | The Response entity (load). | `/api/v1/responses/{response_id}` |
| **Revoke** | The Revoke entity (remove). | `/api/v1/organizations/{organization_id}/invite` |
| **ServiceToken** | The ServiceToken entity (create, list, load, remove, update). | `/api/v1/service_token/` |
| **Subscription** | The Subscription entity (create, list, load, remove, update). | `/api/v1/subscriptions/` |
| **UserAuthentication** | The UserAuthentication entity (create). | `/api/v1/auth/begin-reset-password` |
| **UserInvitation** | The UserInvitation entity (create). | `/api/v1/organizations/{organization_id}/invite` |

The operations available across these entities are **load**, **list**, **create**, **update**, **remove** — see each entity's
own list above for exactly which it supports.

## Quickstart in other languages

### Python

```python
import os
from hook0_sdk import Hook0SDK

client = Hook0SDK({
    "apikey": os.environ.get("HOOK0_APIKEY"),
})

# List all applications (returns a list, raises on error)
applications = client.Application().list()
for application in applications:
    print(application)

# Load a specific application (returns the record, raises on error)
application = client.Application().load({"id": "example_id"})
print(application)
```

### PHP

```php
<?php
require_once 'hook0_sdk.php';

$client = new Hook0SDK([
    "apikey" => getenv("HOOK0_APIKEY"),
]);

// List all applications (returns an array; throws on error)
$applications = $client->Application()->list();
print_r($applications);

// Load a specific application (returns the bare record; throws on error)
$application = $client->Application()->load(["id" => "example_id"]);
print_r($application);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/hook0-sdk/go"

client := sdk.NewHook0SDK(map[string]any{
    "apikey": os.Getenv("HOOK0_APIKEY"),
})

// List all applications
applications, err := client.Application(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(applications)
```

### Lua

```lua
local sdk = require("hook0_sdk")

local client = sdk.new({
  apikey = os.getenv("HOOK0_APIKEY"),
})

-- List all applications
local applications, err = client:Application():list()
print(applications)

-- Load a specific application
local application, err = client:Application():load({ id = "example_id" })
print(application)
```

### JavaScript

```js
const { Hook0SDK } = require('@voxgig-sdk/hook0-js')

const client = new Hook0SDK({
  apikey: process.env.HOOK0_APIKEY,
})

// List all applications (returns an array)
const applications = await client.Application().list()
for (const application of applications) {
  console.log(application)
}
```

## Offline unit testing

Every SDK ships a built-in **test mode** that swaps the HTTP transport for
an in-memory mock, so your unit tests run fully offline — no server, no
network, and no credentials:

### TypeScript

```ts
const client = Hook0SDK.test()
const applications = await client.Application().list()
// applications is an array of bare Application records populated with mock data
console.log(applications)
```

### Python

```python
client = Hook0SDK.test()
applications = client.Application().list()
print(applications)
```

### PHP

```php
// Seed fixture data so offline calls resolve without a live server.
$client = Hook0SDK::test([
    "entity" => ["application" => ["test01" => ["id" => "test01"]]],
]);
$applications = $client->Application()->list();
```

### Golang

```go
client := sdk.Test()
result, err := client.Application(nil).List(
    nil, nil,
)
```

### Lua

```lua
local client = sdk.test()
local results, err = client:Application():list()
```

### JavaScript

```js
const client = Hook0SDK.test()
const applications = await client.Application().list()
// applications is an array of bare entities populated with mock data
console.log(applications)
```

## Direct and prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

**Python:**
```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**JavaScript:**
```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
if (result instanceof Error) {
  throw result
}
console.log(result.data)
```

## Advanced

> Everyday use only needs the sections above. This explains the internals
> behind every call — relevant when writing custom features.

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Lua](lua/README.md)
- [JavaScript](js/README.md)

## Upstream API and spec

This SDK is generated from Hook0's public OpenAPI specification. It is an
unofficial client and is not affiliated with Hook0.

- Upstream API: [https://app.hook0.com](https://app.hook0.com)
- Spec: [https://app.hook0.com/api/v1/swagger.json](https://app.hook0.com/api/v1/swagger.json),
  OpenAPI 3.0.0, "Hook0 API" v1.0.2, fetched 2026-08-07
- The exact copy used is vendored unmodified at
  [`.sdk/def/hook0-openapi.json`](.sdk/def/hook0-openapi.json)

The spec file is Hook0's, and stays theirs. The MIT licence on this repository
covers the generated client code, not the vendored specification. Hook0's server
is source-available under SSPL-1.0.

## Security

Please report security issues to security@voxgig.com. See [SECURITY.md](SECURITY.md).
Do not open public issues for suspected vulnerabilities.

---

Generated by the [Voxgig SDK Generator](https://voxgig.com/sdk), MIT-licensed.
Browse 600+ generated SDKs at [github.com/voxgig-sdk](https://github.com/voxgig-sdk).

Questions, or want these production-grade? Email richard@voxgig.com.

If you are from Hook0 and would like this repository removed, or transferred to
your own GitHub organisation, email richard@voxgig.com and it will be done
within two business days, no questions asked.
