
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Hook0',
        slug: "hook0",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://app.hook0.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      application: {
      },

      application_secret: {
      },

      applications_management: {
      },

      event: {
      },

      event_type: {
      },

      events_management: {
      },

      events_per_day_entry: {
      },

      health: {
      },

      hook0: {
      },

      ingested_event: {
      },

      instance: {
      },

      login: {
      },

      organization: {
      },

      organization_edit_role: {
      },

      problem: {
      },

      quota: {
      },

      registration: {
      },

      request_attempt: {
      },

      response: {
      },

      revoke: {
      },

      service_token: {
      },

      subscription: {
      },

      user_authentication: {
      },

      user_invitation: {
      },

    }
  }


  entity = {
    "application": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "short": "Unique identifier of the application.",
          "type": "`$STRING`"
        },
        {
          "name": "consumption",
          "req": true,
          "short": "Current consumption metrics for this application.",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Name of the application.",
          "type": "`$STRING`"
        },
        {
          "name": "onboarding_steps",
          "req": true,
          "short": "Onboarding completion status for this application.",
          "type": "`$OBJECT`"
        },
        {
          "name": "organization_id",
          "req": true,
          "short": "UUID of the organization this application belongs to.",
          "type": "`$STRING`"
        },
        {
          "name": "quotas",
          "req": true,
          "short": "Quota limits for this application.",
          "type": "`$OBJECT`"
        }
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
                "applications"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/applications/",
              "parts": [
                "api",
                "v1",
                "applications"
              ],
              "select": {
                "exist": [
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/applications/{application_id}",
              "parts": [
                "api",
                "v1",
                "applications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "application_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/applications/{application_id}",
              "parts": [
                "api",
                "v1",
                "applications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "application_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/applications/{application_id}",
              "parts": [
                "api",
                "v1",
                "applications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "application_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "application_secret": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "deleted_at",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "token",
          "req": true,
          "type": "`$STRING`"
        }
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
                "application_secrets"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/application_secrets/",
              "parts": [
                "api",
                "v1",
                "application_secrets"
              ],
              "select": {
                "exist": [
                  "application_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/application_secrets/{application_secret_token}",
              "parts": [
                "api",
                "v1",
                "application_secrets",
                "{id}"
              ],
              "rename": {
                "param": {
                  "application_secret_token": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/application_secrets/{application_secret_token}",
              "parts": [
                "api",
                "v1",
                "application_secrets",
                "{application_secret_token}"
              ],
              "select": {
                "exist": [
                  "application_id",
                  "application_secret_token"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "application_secret"
          ]
        ]
      }
    },
    "event": {
      "fields": [
        {
          "name": "event_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "event_type_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "labels",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "occurred_at",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "payload",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "payload_content_type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "received_at",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events/",
              "parts": [
                "api",
                "v1",
                "events"
              ],
              "select": {
                "exist": [
                  "application_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events/{event_id}",
              "parts": [
                "api",
                "v1",
                "events",
                "{id}"
              ],
              "rename": {
                "param": {
                  "event_id": "id"
                }
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event_type": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "event_type_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "resource_type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "resource_type_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "service",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "service_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "verb",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "verb_name",
          "req": true,
          "type": "`$STRING`"
        }
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
                "event_types"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/event_types/",
              "parts": [
                "api",
                "v1",
                "event_types"
              ],
              "select": {
                "exist": [
                  "application_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/event_types/{event_type_name}",
              "parts": [
                "api",
                "v1",
                "event_types",
                "{id}"
              ],
              "rename": {
                "param": {
                  "event_type_name": "id"
                }
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "events_management": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/events/{event_id}/replay",
              "parts": [
                "api",
                "v1",
                "events",
                "{event_id}",
                "replay"
              ],
              "select": {
                "exist": [
                  "event_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "payload_content_types"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/event_types/{event_type_name}",
              "parts": [
                "api",
                "v1",
                "event_types",
                "{event_type_name}"
              ],
              "select": {
                "exist": [
                  "application_id",
                  "event_type_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "event_type"
          ],
          [
            "event"
          ]
        ]
      }
    },
    "events_per_day_entry": {
      "fields": [
        {
          "name": "amount",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "application_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "application_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "is_provisional",
          "req": true,
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events_per_day/application",
              "parts": [
                "api",
                "v1",
                "events_per_day",
                "application"
              ],
              "select": {
                "exist": [
                  "application_id",
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "organization_id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events_per_day/organization",
              "parts": [
                "api",
                "v1",
                "events_per_day",
                "organization"
              ],
              "select": {
                "exist": [
                  "from",
                  "organization_id",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "health": {
      "fields": [
        {
          "name": "database",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "database_duration_ms",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "object_storage",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "object_storage_duration_ms",
          "type": "`$INTEGER`"
        },
        {
          "name": "pulsar",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "pulsar_duration_ms",
          "type": "`$INTEGER`"
        },
        {
          "name": "total_duration_ms",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/health/",
              "parts": [
                "api",
                "v1",
                "health"
              ],
              "select": {
                "exist": [
                  "key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "hook0": {
      "fields": [
        {
          "name": "default",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "env_var",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "group",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "required",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "sensitive",
          "req": true,
          "type": "`$BOOLEAN`"
        }
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
                "environment_variables"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ingested_event": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "short": "UUID of the application this event belongs to.",
          "type": "`$STRING`"
        },
        {
          "name": "event_id",
          "short": "Optional unique identifier for this event (client-generated UUID).",
          "type": "`$STRING`"
        },
        {
          "name": "event_type",
          "req": true,
          "short": "The type of event (e.g., 'user.created', 'order.completed').",
          "type": "`$STRING`"
        },
        {
          "name": "labels",
          "req": true,
          "short": "Labels for event filtering and routing to subscriptions.",
          "type": "`$OBJECT`"
        },
        {
          "name": "metadata",
          "short": "Optional metadata key-value pairs associated with the event.",
          "type": "`$OBJECT`"
        },
        {
          "name": "occurred_at",
          "req": true,
          "short": "Timestamp when the event occurred.",
          "type": "`$STRING`"
        },
        {
          "name": "payload",
          "req": true,
          "short": "The event payload.",
          "type": "`$STRING`"
        },
        {
          "name": "payload_content_type",
          "req": true,
          "short": "Content type of the payload.",
          "type": "`$STRING`"
        }
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
                "event"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "instance": {
      "fields": [
        {
          "name": "application_secret_compatibility",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "auto_db_migration",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "biscuit_public_key",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "cloudflare_turnstile_site_key",
          "type": "`$STRING`"
        },
        {
          "name": "formbricks",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "matomo",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "password_minimum_length",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "quota_enforcement",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "registration_disabled",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "support_email_address",
          "req": true,
          "type": "`$STRING`"
        }
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
                "instance"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "login": {
      "fields": [
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "password",
          "req": true,
          "type": "`$STRING`"
        }
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
                "login"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
                "refresh"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "organization": {
      "fields": [
        {
          "name": "consumption",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "onboarding_steps",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "organization_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "plan",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "quotas",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "role",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "users",
          "req": true,
          "type": "`$ARRAY`"
        }
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
                "organizations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "organizations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/organizations/{organization_id}/",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{id}"
              ],
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/organizations/{organization_id}/",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{id}"
              ],
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/organizations/{organization_id}/",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{id}"
              ],
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "organization_edit_role": {
      "fields": [
        {
          "name": "role",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "user_id",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{id}",
                "invite"
              ],
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "select": {
                "$action": "invite",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "problem": {
      "fields": [
        {
          "name": "detail",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`"
        }
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
                "errors"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "quota": {
      "fields": [
        {
          "name": "global_applications_per_organization_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "global_days_of_events_retention_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "global_event_types_per_application_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "global_events_per_day_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "global_members_per_organization_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "global_subscriptions_per_application_limit",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                "quotas"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "registration": {
      "fields": [
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "first_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "gclid",
          "short": "Optional Google Ads click identifier captured during the user's journey from a Google Ad.",
          "type": "`$STRING`"
        },
        {
          "name": "last_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "password",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "turnstile_token",
          "type": "`$STRING`"
        }
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
                "register"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "request_attempt": {
      "fields": [
        {
          "name": "created_at",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "delay_until",
          "type": "`$STRING`"
        },
        {
          "name": "event",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "event_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "failed_at",
          "type": "`$STRING`"
        },
        {
          "name": "http_response_status",
          "type": "`$INTEGER`"
        },
        {
          "name": "picked_at",
          "type": "`$STRING`"
        },
        {
          "name": "request_attempt_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "response_id",
          "type": "`$STRING`"
        },
        {
          "name": "retry_count",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "req": true,
          "short": "Status of a request attempt.",
          "type": "`$OBJECT`"
        },
        {
          "name": "subscription",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "succeeded_at",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "event_event_type_name",
                    "orig": "event_event_type_name",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "event_id",
                    "orig": "event_id",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "max_created_at",
                    "orig": "max_created_at",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "min_created_at",
                    "orig": "min_created_at",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "pagination_cursor",
                    "orig": "pagination_cursor",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "subscription_id",
                    "orig": "subscription_id",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/request_attempts/",
              "parts": [
                "api",
                "v1",
                "request_attempts"
              ],
              "select": {
                "exist": [
                  "application_id",
                  "event_event_type_name",
                  "event_id",
                  "max_created_at",
                  "min_created_at",
                  "pagination_cursor",
                  "subscription_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/request_attempts/{request_attempt_id}",
              "parts": [
                "api",
                "v1",
                "request_attempts",
                "{id}"
              ],
              "rename": {
                "param": {
                  "request_attempt_id": "id"
                }
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/responses/{response_id}",
              "parts": [
                "api",
                "v1",
                "responses",
                "{id}"
              ],
              "rename": {
                "param": {
                  "response_id": "id"
                }
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{organization_id}",
                "invite"
              ],
              "select": {
                "exist": [
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "organization"
          ]
        ]
      }
    },
    "service_token": {
      "fields": [
        {
          "name": "biscuit",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "organization_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "token_id",
          "req": true,
          "type": "`$STRING`"
        }
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
                "service_token"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/service_token/",
              "parts": [
                "api",
                "v1",
                "service_token"
              ],
              "select": {
                "exist": [
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "organization_id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/service_token/{service_token_id}",
              "parts": [
                "api",
                "v1",
                "service_token",
                "{id}"
              ],
              "rename": {
                "param": {
                  "service_token_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "organization_id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/service_token/{service_token_id}",
              "parts": [
                "api",
                "v1",
                "service_token",
                "{id}"
              ],
              "rename": {
                "param": {
                  "service_token_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/service_token/{service_token_id}",
              "parts": [
                "api",
                "v1",
                "service_token",
                "{id}"
              ],
              "rename": {
                "param": {
                  "service_token_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "subscription": {
      "fields": [
        {
          "name": "application_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "dedicated_workers",
          "op": {
            "create": {
              "type": "`$ARRAY`"
            },
            "update": {
              "type": "`$ARRAY`"
            }
          },
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "event_types",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "is_enabled",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "label_key",
          "op": {
            "create": {
              "type": "`$STRING`"
            },
            "update": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "_Kept for backward compatibility, you should use `labels`_",
          "type": "`$STRING`"
        },
        {
          "name": "label_value",
          "op": {
            "create": {
              "type": "`$STRING`"
            },
            "update": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "_Kept for backward compatibility, you should use `labels`_",
          "type": "`$STRING`"
        },
        {
          "name": "labels",
          "op": {
            "create": {
              "type": "`$OBJECT`"
            },
            "update": {
              "type": "`$OBJECT`"
            }
          },
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "metadata",
          "op": {
            "create": {
              "type": "`$OBJECT`"
            },
            "update": {
              "type": "`$OBJECT`"
            }
          },
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "secret",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "subscription_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "target",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "updated_at",
          "req": true,
          "type": "`$STRING`"
        }
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
                "subscriptions"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/subscriptions/",
              "parts": [
                "api",
                "v1",
                "subscriptions"
              ],
              "select": {
                "exist": [
                  "application_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "parts": [
                "api",
                "v1",
                "subscriptions",
                "{id}"
              ],
              "rename": {
                "param": {
                  "subscription_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "application_id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "parts": [
                "api",
                "v1",
                "subscriptions",
                "{id}"
              ],
              "rename": {
                "param": {
                  "subscription_id": "id"
                }
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "parts": [
                "api",
                "v1",
                "subscriptions",
                "{id}"
              ],
              "rename": {
                "param": {
                  "subscription_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user_authentication": {
      "fields": [
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "new_password",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "token",
          "req": true,
          "type": "`$STRING`"
        }
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
                "begin-reset-password"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
                "logout"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
                "password"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
                "reset-password"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
                "verify-email"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user_invitation": {
      "fields": [
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "role",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "parts": [
                "api",
                "v1",
                "organizations",
                "{organization_id}",
                "invite"
              ],
              "select": {
                "exist": [
                  "organization_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "organization"
          ]
        ]
      }
    }
  }
}


const config = new Config()

module.exports = {
  config
}

