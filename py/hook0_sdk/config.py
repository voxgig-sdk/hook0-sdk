# Hook0 SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "consumption",
            "req": True,
            "type": "`$OBJECT`",
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
            "name": "organization_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "quotas",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "applications",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "applications",
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
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "application_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "deleted_at",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
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
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "application_secret_token": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "application_secrets",
                  "{application_secret_token}",
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
            "name": "received_at",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "event",
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
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/events/",
                "parts": [
                  "api",
                  "v1",
                  "events",
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
                "parts": [
                  "api",
                  "v1",
                  "events",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "event_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "event_types",
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
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "event_type_name": "id",
                  },
                },
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "events_management": {
        "fields": [
          {
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "events_management",
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
                      "name": "event_id",
                      "orig": "event_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/events/{event_id}/replay",
                "parts": [
                  "api",
                  "v1",
                  "events",
                  "{event_id}",
                  "replay",
                ],
                "select": {
                  "exist": [
                    "event_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "orig": "/api/v1/payload_content_types/",
                "parts": [
                  "api",
                  "v1",
                  "payload_content_types",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "event_types",
                  "{event_type_name}",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "event_type",
            ],
            [
              "event",
            ],
          ],
        },
      },
      "events_per_day_entry": {
        "fields": [
          {
            "name": "amount",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
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
                "parts": [
                  "api",
                  "v1",
                  "events_per_day",
                  "application",
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
                "parts": [
                  "api",
                  "v1",
                  "events_per_day",
                  "organization",
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
            "name": "database_duration_ms",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "object_storage",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "object_storage_duration_ms",
            "type": "`$INTEGER`",
          },
          {
            "name": "pulsar",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "pulsar_duration_ms",
            "type": "`$INTEGER`",
          },
          {
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
                "parts": [
                  "api",
                  "v1",
                  "health",
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
                "parts": [
                  "api",
                  "v1",
                  "environment_variables",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "event_id",
            "type": "`$STRING`",
          },
          {
            "name": "event_type",
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
                "parts": [
                  "api",
                  "v1",
                  "event",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "instance",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/refresh",
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "refresh",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "role",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                  "invite",
                ],
                "rename": {
                  "param": {
                    "organization_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "errors",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "global_applications_per_organization_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "global_days_of_events_retention_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "global_event_types_per_application_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "global_events_per_day_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "global_members_per_organization_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
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
                "parts": [
                  "api",
                  "v1",
                  "quotas",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "register",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "delay_until",
            "type": "`$STRING`",
          },
          {
            "name": "event",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "event_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "failed_at",
            "type": "`$STRING`",
          },
          {
            "name": "http_response_status",
            "type": "`$INTEGER`",
          },
          {
            "name": "picked_at",
            "type": "`$STRING`",
          },
          {
            "name": "request_attempt_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "response_id",
            "type": "`$STRING`",
          },
          {
            "name": "retry_count",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "subscription",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "succeeded_at",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "request_attempts",
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
                "parts": [
                  "api",
                  "v1",
                  "request_attempts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "request_attempt_id": "id",
                  },
                },
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "response": {
        "fields": [],
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
                "parts": [
                  "api",
                  "v1",
                  "responses",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "response_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
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
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "organization_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "token_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "service_token",
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
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "service_token_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "application_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
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
            "name": "secret",
            "req": True,
            "type": "`$STRING`",
          },
          {
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
            "name": "updated_at",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
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
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
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
                "parts": [
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "subscription_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "begin-reset-password",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/logout",
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "logout",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/password",
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "password",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/reset-password",
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "reset-password",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/auth/verify-email",
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "verify-email",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
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
