# Hook0 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Hook0",
            "slug": "hook0",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://app.hook0.com",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "application": {},
                "application_secret": {},
                "applications_management": {},
                "event": {},
                "event_type": {},
                "events_management": {},
                "events_per_day_entry": {},
                "health": {},
                "hook0": {},
                "ingested_event": {},
                "instance": {},
                "login": {},
                "organization": {},
                "organization_edit_role": {},
                "problem": {},
                "quota": {},
                "registration": {},
                "request_attempt": {},
                "response": {},
                "revoke": {},
                "service_token": {},
                "subscription": {},
                "user_authentication": {},
                "user_invitation": {},
            },
        },
        "entity": {
      "application": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "short": "Unique identifier of the application.",
            "type": "`$STRING`",
          },
          {
            "name": "consumption",
            "req": True,
            "short": "Current consumption metrics for this application.",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Name of the application.",
            "type": "`$STRING`",
          },
          {
            "name": "onboarding_steps",
            "req": True,
            "short": "Onboarding completion status for this application.",
            "type": "`$OBJECT`",
          },
          {
            "format": "uuid",
            "name": "organization_id",
            "req": True,
            "short": "UUID of the organization this application belongs to.",
            "type": "`$STRING`",
          },
          {
            "name": "quotas",
            "req": True,
            "short": "Quota limits for this application.",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "application",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/applications/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "applications",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "applications",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/applications/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "applications",
                  },
                ],
                "select": {
                  "exist": [
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "applications",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/applications/{application_id}",
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "applications",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/applications/{application_id}",
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "applications",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/applications/{application_id}",
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "applications",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "application_secret": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "deleted_at",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "token",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "application_secret",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/application_secrets/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "application_secrets",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/application_secrets/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "application_secrets",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "application_secret_token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/application_secrets/{application_secret_token}",
                "rename": {
                  "param": {
                    "application_secret_token": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "application_secrets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "applications_management": {
        "fields": [],
        "name": "applications_management",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "application_secret_token",
                      "orig": "application_secret_token",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/application_secrets/{application_secret_token}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "application_secrets",
                  },
                  {
                    "var": "application_secret_token",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "application_secret_token",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                  "{application_secret_token}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "application_secret",
            ],
          ],
        },
      },
      "event": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "event_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "event_type_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "occurred_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "payload",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "payload_content_type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "received_at",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "event",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/events/{event_id}/replay",
                "rename": {
                  "param": {
                    "event_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "replay",
                  },
                ],
                "select": {
                  "$action": "replay",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "events",
                  "{id}",
                  "replay",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/events/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "events",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/events/{event_id}",
                "rename": {
                  "param": {
                    "event_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "events",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "events",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event_type": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "event_type_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "resource_type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "resource_type_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "service",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "service_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "verb",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "verb_name",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "event_type",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/event_types/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "event_types",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/event_types/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "event_types",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "event_type_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/event_types/{event_type_name}",
                "rename": {
                  "param": {
                    "event_type_name": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "event_types",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "events_management": {
        "fields": [],
        "name": "events_management",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/payload_content_types/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "payload_content_types",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "payload_content_types",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "event_type_name",
                      "orig": "event_type_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/event_types/{event_type_name}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "event_types",
                  },
                  {
                    "var": "event_type_name",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "event_type_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                  "{event_type_name}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "event_type",
            ],
          ],
        },
      },
      "events_per_day_entry": {
        "fields": [
          {
            "format": "int32",
            "name": "amount",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "application_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "date",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "is_provisional",
            "req": True,
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "events_per_day_entry",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/events_per_day/application",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "events_per_day",
                  },
                  {
                    "lit": "application",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "events_per_day",
                  "application",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/events_per_day/organization",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "events_per_day",
                  },
                  {
                    "lit": "organization",
                  },
                ],
                "select": {
                  "exist": [
                    "from",
                    "organization_id",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "events_per_day",
                  "organization",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "health": {
        "fields": [
          {
            "name": "database",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "format": "int64",
            "name": "database_duration_ms",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "object_storage",
            "type": "`$BOOLEAN`",
          },
          {
            "format": "int64",
            "name": "object_storage_duration_ms",
            "type": "`$INTEGER`",
          },
          {
            "name": "pulsar",
            "type": "`$BOOLEAN`",
          },
          {
            "format": "int64",
            "name": "pulsar_duration_ms",
            "type": "`$INTEGER`",
          },
          {
            "format": "int64",
            "name": "total_duration_ms",
            "req": True,
            "type": "`$INTEGER`",
          },
        ],
        "name": "health",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/health/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "health",
                  },
                ],
                "select": {
                  "exist": [
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "health",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "hook0": {
        "fields": [
          {
            "name": "default",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "env_var",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "group",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "required",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "sensitive",
            "req": True,
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "hook0",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/environment_variables/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "environment_variables",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "environment_variables",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ingested_event": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "short": "UUID of the application this event belongs to.",
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "event_id",
            "short": "Optional unique identifier for this event (client-generated UUID).",
            "type": "`$STRING`",
          },
          {
            "name": "event_type",
            "req": True,
            "short": "The type of event (e.g., 'user.created', 'order.completed').",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "req": True,
            "short": "Labels for event filtering and routing to subscriptions.",
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "short": "Optional metadata key-value pairs associated with the event.",
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "occurred_at",
            "req": True,
            "short": "Timestamp when the event occurred.",
            "type": "`$STRING`",
          },
          {
            "name": "payload",
            "req": True,
            "short": "The event payload.",
            "type": "`$STRING`",
          },
          {
            "name": "payload_content_type",
            "req": True,
            "short": "Content type of the payload.",
            "type": "`$STRING`",
          },
        ],
        "name": "ingested_event",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/event/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "event",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "event",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "instance": {
        "fields": [
          {
            "name": "application_secret_compatibility",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "auto_db_migration",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "biscuit_public_key",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "cloudflare_turnstile_site_key",
            "type": "`$STRING`",
          },
          {
            "name": "formbricks",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "matomo",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "int32",
            "name": "password_minimum_length",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "quota_enforcement",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "registration_disabled",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "support_email_address",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "instance",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/instance/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "instance",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "instance",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "login": {
        "fields": [
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "password",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/login",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "login",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "login",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/refresh",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "refresh",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "refresh",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "organization": {
        "fields": [
          {
            "name": "consumption",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "onboarding_steps",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "uuid",
            "name": "organization_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "plan",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "quotas",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "role",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "users",
            "req": True,
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "organization",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/organizations/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/organizations/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/organizations/{organization_id}/",
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/organizations/{organization_id}/",
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/organizations/{organization_id}/",
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "organization_edit_role": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "user_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "organization_edit_role",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/organizations/{organization_id}/invite",
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "invite",
                  },
                ],
                "select": {
                  "$action": "invite",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                  "invite",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "problem": {
        "fields": [
          {
            "name": "detail",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "problem",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/errors/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "errors",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "errors",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "quota": {
        "fields": [
          {
            "format": "int32",
            "name": "global_applications_per_organization_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "int32",
            "name": "global_days_of_events_retention_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "int32",
            "name": "global_event_types_per_application_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "int32",
            "name": "global_events_per_day_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "int32",
            "name": "global_members_per_organization_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "format": "int32",
            "name": "global_subscriptions_per_application_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
        ],
        "name": "quota",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/quotas/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "quotas",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.limits`",
                },
                "parts": [
                  "api",
                  "v1",
                  "quotas",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "registration": {
        "fields": [
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "first_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "gclid",
            "short": "Optional Google Ads click identifier captured during the user's journey from a Google Ad.",
            "type": "`$STRING`",
          },
          {
            "name": "last_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "password",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "turnstile_token",
            "type": "`$STRING`",
          },
        ],
        "name": "registration",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/register/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "register",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "register",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "request_attempt": {
        "fields": [
          {
            "format": "date-time",
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "delay_until",
            "type": "`$STRING`",
          },
          {
            "name": "event",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "uuid",
            "name": "event_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "failed_at",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "http_response_status",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "picked_at",
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "request_attempt_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "response_id",
            "type": "`$STRING`",
          },
          {
            "format": "int32",
            "name": "retry_count",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "req": True,
            "short": "Status of a request attempt.",
            "type": "`$OBJECT`",
          },
          {
            "name": "subscription",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "succeeded_at",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "request_attempt",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "event_event_type_name",
                      "orig": "event_event_type_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "event_id",
                      "orig": "event_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "max_created_at",
                      "orig": "max_created_at",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "min_created_at",
                      "orig": "min_created_at",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pagination_cursor",
                      "orig": "pagination_cursor",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/request_attempts/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "request_attempts",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "event_event_type_name",
                    "event_id",
                    "max_created_at",
                    "min_created_at",
                    "pagination_cursor",
                    "subscription_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "request_attempts",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "request_attempt_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/request_attempts/{request_attempt_id}",
                "rename": {
                  "param": {
                    "request_attempt_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "request_attempts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "request_attempts",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "response": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "response",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "response_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/responses/{response_id}",
                "rename": {
                  "param": {
                    "response_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "responses",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.headers`",
                },
                "parts": [
                  "api",
                  "v1",
                  "responses",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "revoke": {
        "fields": [],
        "name": "revoke",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/organizations/{organization_id}/invite",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_id",
                  },
                  {
                    "lit": "invite",
                  },
                ],
                "select": {
                  "exist": [
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "organization",
            ],
          ],
        },
      },
      "service_token": {
        "fields": [
          {
            "name": "biscuit",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "organization_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "token_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "service_token",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/service_token/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "service_token",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/service_token/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "service_token",
                  },
                ],
                "select": {
                  "exist": [
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "service_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/service_token/{service_token_id}",
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "service_token",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "service_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/service_token/{service_token_id}",
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "service_token",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "service_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/service_token/{service_token_id}",
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "service_token",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "subscription": {
        "fields": [
          {
            "format": "uuid",
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "dedicated_workers",
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
              "update": {
                "type": "`$ARRAY`",
              },
            },
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "event_types",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "is_enabled",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "label_key",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "_Kept for backward compatibility, you should use `labels`_",
            "type": "`$STRING`",
          },
          {
            "name": "label_value",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "_Kept for backward compatibility, you should use `labels`_",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "op": {
              "create": {
                "type": "`$OBJECT`",
              },
              "update": {
                "type": "`$OBJECT`",
              },
            },
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "op": {
              "create": {
                "type": "`$OBJECT`",
              },
              "update": {
                "type": "`$OBJECT`",
              },
            },
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "uuid",
            "name": "secret",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "subscription_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "target",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "subscription",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/subscriptions/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "subscriptions",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/subscriptions/",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "subscriptions",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "subscription_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/subscriptions/{subscription_id}",
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "subscription_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/v1/subscriptions/{subscription_id}",
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "application_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "subscription_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/v1/subscriptions/{subscription_id}",
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user_authentication": {
        "fields": [
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "new_password",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "user_authentication",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/begin-reset-password",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "begin-reset-password",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "begin-reset-password",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/logout",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "logout",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "logout",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/password",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "password",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "password",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/reset-password",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "reset-password",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "reset-password",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/verify-email",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "verify-email",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "verify-email",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user_invitation": {
        "fields": [
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "user_invitation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "organization_id",
                      "orig": "organization_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/organizations/{organization_id}/invite",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "organization_id",
                  },
                  {
                    "lit": "invite",
                  },
                ],
                "select": {
                  "exist": [
                    "organization_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "organization",
            ],
          ],
        },
      },
    },
    }
