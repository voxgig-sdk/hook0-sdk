# API Definition

`hook0-openapi.json` is Hook0's own OpenAPI specification, vendored here
unmodified so this SDK is self-contained and reproducible.

| | |
| --- | --- |
| Source | https://app.hook0.com/api/v1/swagger.json |
| Format | OpenAPI 3.0.0 |
| Title / version | Hook0 API, v1.0.2 |
| Fetched | 2026-08-07 |
| Size | 63,426 bytes |
| sha256 | `368349cfec9c54b208937aba5dddbc1dd919f15ada2d34d33e51f60667d0c40b` |

The file is byte-for-byte as served. No edits were made to it. Where this SDK
departs from what the spec literally says, the change is made in the model
instead, and commented there:

- `.sdk/model/config.aontu` sets the `Authorization` prefix to `Bearer`. The
  spec declares its three Biscuit schemes as `type: apiKey`, which carries no
  prefix, while the scheme descriptions say to use the format `Bearer TOKEN`.
- `.sdk/model/custom.aontu` stops a handful of field names being depluralized
  by the generator (`formbricks`, `headers`, `labels`, `users`,
  `dedicated_workers`, `onboarding_steps`, and the `_ms` duration fields).

The specification is Hook0's work, not ours, and is not relicensed by this
repository. The MIT licence in `LICENSE` covers the generated client code only.
Hook0's server is source-available under SSPL-1.0.

Hook0: https://hook0.com
