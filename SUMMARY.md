# Hook0 API

Core REST API of Hook0, Open-Source Webhooks as a service for SaaS

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 24 entities and 54 HTTP routes. There are 8 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Application](docs/api/application.html)

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `application_id`: Unique identifier of the application.
- `consumption`: Current consumption metrics for this application.
- `name`: Name of the application. Length: 2-50 characters.
- `onboarding_steps`: Onboarding completion status for this application.
- `organization_id`: UUID of the organization this application belongs to.

### [ApplicationSecret](docs/api/application_secret.html)

Results: Created; OK.

SDK operations: `create`, `list`, `update`.

### [ApplicationsManagement](docs/api/applications_management.html)

Results: No Content.

SDK operations: `remove`.

### [Event](docs/api/event.html)

Results: No Content; OK.

SDK operations: `create`, `list`, `load`.

### [EventType](docs/api/event_type.html)

Results: Created; OK.

SDK operations: `create`, `list`, `load`.

### [EventsManagement](docs/api/events_management.html)

Results: OK; No Content.

SDK operations: `list`, `remove`.

### [EventsPerDayEntry](docs/api/events_per_day_entry.html)

Results: OK.

SDK operations: `list`.

### [Health](docs/api/health.html)

SDK operations: `load`.

### [Hook0](docs/api/hook0.html)

Results: OK.

SDK operations: `list`.

### [IngestedEvent](docs/api/ingested_event.html)

Results: Created.

SDK operations: `create`.

Key fields to recognise:

- `application_id`: UUID of the application this event belongs to.
- `event_id`: Optional unique identifier for this event (client-generated UUID).
- `event_type`: The type of event (for example, &#39;user.created&#39;, &#39;order.completed&#39;).
- `labels`: Labels for event filtering and routing to subscriptions.
- `metadata`: Optional metadata key-value pairs associated with the event.

### [Instance](docs/api/instance.html)

Results: OK.

SDK operations: `load`.

### [Login](docs/api/login.html)

Results: Created.

SDK operations: `create`.

### [Organization](docs/api/organization.html)

Results: OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [OrganizationEditRole](docs/api/organization_edit_role.html)

Results: OK.

SDK operations: `update`.

### [Problem](docs/api/problem.html)

Results: OK.

SDK operations: `list`.

### [Quota](docs/api/quota.html)

Results: OK.

SDK operations: `load`.

### [Registration](docs/api/registration.html)

Results: Created.

SDK operations: `create`.

Key fields to recognise:

- `gclid`: Optional Google Ads click identifier captured during the user&#39;s journey from a Google Ad.

### [RequestAttempt](docs/api/request_attempt.html)

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `status`: Status of a request attempt. The &#39;type&#39; field indicates the status variant. - waiting: &#123;type, since, until&#125; - Scheduled for future delivery - pending: &#123;type, since&#125; - Ready to be processed - in_progress: &#123;type, since&#125; - Currently being delivered - successful: &#123;type, at, full_processing_ms&#125; - Delivered successfully - failed: &#123;type, at, full_processing_ms&#125; - Delivery failed

### [Response](docs/api/response.html)

Results: OK.

SDK operations: `load`.

### [Revoke](docs/api/revoke.html)

Results: OK.

SDK operations: `remove`.

### [ServiceToken](docs/api/service_token.html)

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [Subscription](docs/api/subscription.html)

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `label_key`: _Kept for backward compatibility, you should use `labels`_
- `label_value`: _Kept for backward compatibility, you should use `labels`_

### [UserAuthentication](docs/api/user_authentication.html)

Results: No Content.

SDK operations: `create`.

### [UserInvitation](docs/api/user_invitation.html)

Results: OK.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Application](docs/api/application.html) | `create` | `POST /api/v1/applications/` | Required |
| [Application](docs/api/application.html) | `list` | `GET /api/v1/applications/` | Required |
| [Application](docs/api/application.html) | `load` | `GET /api/v1/applications/{application_id}` | Required |
| [Application](docs/api/application.html) | `remove` | `DELETE /api/v1/applications/{application_id}` | Required |
| [Application](docs/api/application.html) | `update` | `PUT /api/v1/applications/{application_id}` | Required |
| [ApplicationSecret](docs/api/application_secret.html) | `create` | `POST /api/v1/application_secrets/` | Required |
| [ApplicationSecret](docs/api/application_secret.html) | `list` | `GET /api/v1/application_secrets/` | Required |
| [ApplicationSecret](docs/api/application_secret.html) | `update` | `PUT /api/v1/application_secrets/{application_secret_token}` | Required |
| [ApplicationsManagement](docs/api/applications_management.html) | `remove` | `DELETE /api/v1/application_secrets/{application_secret_token}` | Required |
| [Event](docs/api/event.html) | `create` | `POST /api/v1/events/{event_id}/replay` | Required |
| [Event](docs/api/event.html) | `list` | `GET /api/v1/events/` | Required |
| [Event](docs/api/event.html) | `load` | `GET /api/v1/events/{event_id}` | Required |
| [EventType](docs/api/event_type.html) | `create` | `POST /api/v1/event_types/` | Required |
| [EventType](docs/api/event_type.html) | `list` | `GET /api/v1/event_types/` | Required |
| [EventType](docs/api/event_type.html) | `load` | `GET /api/v1/event_types/{event_type_name}` | Required |
| [EventsManagement](docs/api/events_management.html) | `list` | `GET /api/v1/payload_content_types/` | See reference |
| [EventsManagement](docs/api/events_management.html) | `remove` | `DELETE /api/v1/event_types/{event_type_name}` | Required |
| [EventsPerDayEntry](docs/api/events_per_day_entry.html) | `list` | `GET /api/v1/events_per_day/application` | Required |
| [EventsPerDayEntry](docs/api/events_per_day_entry.html) | `list` | `GET /api/v1/events_per_day/organization` | Required |
| [Health](docs/api/health.html) | `load` | `GET /api/v1/health/` | See reference |
| [Hook0](docs/api/hook0.html) | `list` | `GET /api/v1/environment_variables/` | See reference |
| [IngestedEvent](docs/api/ingested_event.html) | `create` | `POST /api/v1/event/` | Required |
| [Instance](docs/api/instance.html) | `load` | `GET /api/v1/instance/` | See reference |
| [Login](docs/api/login.html) | `create` | `POST /api/v1/auth/login` | See reference |
| [Login](docs/api/login.html) | `create` | `POST /api/v1/auth/refresh` | Required |
| [Organization](docs/api/organization.html) | `create` | `POST /api/v1/organizations/` | Required |
| [Organization](docs/api/organization.html) | `list` | `GET /api/v1/organizations/` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /api/v1/organizations/{organization_id}/` | Required |
| [Organization](docs/api/organization.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/` | Required |
| [Organization](docs/api/organization.html) | `update` | `PUT /api/v1/organizations/{organization_id}/` | Required |
| [OrganizationEditRole](docs/api/organization_edit_role.html) | `update` | `PUT /api/v1/organizations/{organization_id}/invite` | Required |
| [Problem](docs/api/problem.html) | `list` | `GET /api/v1/errors/` | See reference |
| [Quota](docs/api/quota.html) | `load` | `GET /api/v1/quotas/` | See reference |
| [Registration](docs/api/registration.html) | `create` | `POST /api/v1/register/` | See reference |
| [RequestAttempt](docs/api/request_attempt.html) | `list` | `GET /api/v1/request_attempts/` | Required |
| [RequestAttempt](docs/api/request_attempt.html) | `load` | `GET /api/v1/request_attempts/{request_attempt_id}` | Required |
| [Response](docs/api/response.html) | `load` | `GET /api/v1/responses/{response_id}` | Required |
| [Revoke](docs/api/revoke.html) | `remove` | `DELETE /api/v1/organizations/{organization_id}/invite` | Required |
| [ServiceToken](docs/api/service_token.html) | `create` | `POST /api/v1/service_token/` | Required |
| [ServiceToken](docs/api/service_token.html) | `list` | `GET /api/v1/service_token/` | Required |
| [ServiceToken](docs/api/service_token.html) | `load` | `GET /api/v1/service_token/{service_token_id}` | Required |
| [ServiceToken](docs/api/service_token.html) | `remove` | `DELETE /api/v1/service_token/{service_token_id}` | Required |
| [ServiceToken](docs/api/service_token.html) | `update` | `PUT /api/v1/service_token/{service_token_id}` | Required |
| [Subscription](docs/api/subscription.html) | `create` | `POST /api/v1/subscriptions/` | Required |
| [Subscription](docs/api/subscription.html) | `list` | `GET /api/v1/subscriptions/` | Required |
| [Subscription](docs/api/subscription.html) | `load` | `GET /api/v1/subscriptions/{subscription_id}` | Required |
| [Subscription](docs/api/subscription.html) | `remove` | `DELETE /api/v1/subscriptions/{subscription_id}` | Required |
| [Subscription](docs/api/subscription.html) | `update` | `PUT /api/v1/subscriptions/{subscription_id}` | Required |
| [UserAuthentication](docs/api/user_authentication.html) | `create` | `POST /api/v1/auth/begin-reset-password` | See reference |
| [UserAuthentication](docs/api/user_authentication.html) | `create` | `POST /api/v1/auth/logout` | Required |
| [UserAuthentication](docs/api/user_authentication.html) | `create` | `POST /api/v1/auth/password` | Required |
| [UserAuthentication](docs/api/user_authentication.html) | `create` | `POST /api/v1/auth/reset-password` | See reference |
| [UserAuthentication](docs/api/user_authentication.html) | `create` | `POST /api/v1/auth/verify-email` | See reference |
| [UserInvitation](docs/api/user_invitation.html) | `create` | `POST /api/v1/organizations/{organization_id}/invite` | Required |

## Connect to the API

- API server: `https://app.hook0.com`

The default credential is sent in the `Authorization` header.

Authentication using a Biscuit token (use the format `Bearer TOKEN`)

Authentication using a Biscuit token of type &#39;refresh&#39; (use the format `Bearer TOKEN`)

Authentication using a Biscuit token of type &#39;user_access&#39; (use the format `Bearer TOKEN`)

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Java](docs/sdks/java.html) | `java/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |
| [Zig](docs/sdks/zig.html) | `zig/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `hook0_list`: List records for an entity. Supported entities: `application`, `application_secret`, `event`, `event_type`, `events_management`, `events_per_day_entry`, `hook0`, `organization`, `problem`, `request_attempt`, `service_token`, `subscription`.
- `hook0_load`: Load one record for an entity. Supported entities: `application`, `event`, `event_type`, `health`, `instance`, `organization`, `quota`, `request_attempt`, `response`, `service_token`, `subscription`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

