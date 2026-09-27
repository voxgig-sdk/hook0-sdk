
const { BaseFeature } = require('./feature/base/BaseFeature')
const { DebugFeature } = require('./feature/debug/DebugFeature')
const { IdempotencyFeature } = require('./feature/idempotency/IdempotencyFeature')
const { MetricsFeature } = require('./feature/metrics/MetricsFeature')
const { PagingFeature } = require('./feature/paging/PagingFeature')
const { RatelimitFeature } = require('./feature/ratelimit/RatelimitFeature')
const { RetryFeature } = require('./feature/retry/RetryFeature')
const { TestFeature } = require('./feature/test/TestFeature')
const { TimeoutFeature } = require('./feature/timeout/TimeoutFeature')



const FEATURE_CLASS = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
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
    version: "0.1.1",
    target: "js",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "name": "amount",
          "title": "Amount",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "application_id",
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique identifier of the application.",
          "format": "uuid"
        },
        {
          "name": "application_name",
          "title": "Application Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "consumption",
          "title": "Consumption",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Current consumption metrics for this application."
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true,
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "is_provisional",
          "title": "Is Provisional",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the application."
        },
        {
          "name": "onboarding_steps",
          "title": "Onboarding Steps",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Onboarding completion status for this application."
        },
        {
          "name": "organization_id",
          "title": "Organization Id",
          "type": "`$STRING`",
          "req": true,
          "short": "UUID of the organization this application belongs to.",
          "format": "uuid"
        },
        {
          "name": "quotas",
          "title": "Quotas",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Quota limits for this application."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "application",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/applications/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "applications"
                }
              ],
              "parts": [
                "api",
                "v1",
                "applications"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events_per_day/application",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "events_per_day"
                },
                {
                  "lit": "application"
                }
              ],
              "parts": [
                "api",
                "v1",
                "events_per_day",
                "application"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "from",
                  "to"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/applications/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "applications"
                }
              ],
              "parts": [
                "api",
                "v1",
                "applications"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "organization_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/applications/{application_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "applications"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/applications/{application_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "applications"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/applications/{application_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "applications"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "deleted_at",
          "title": "Deleted At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "token",
          "title": "Token",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "application_secret",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/application_secrets/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "application_secrets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "application_secrets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/application_secrets/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "application_secrets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "application_secrets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/application_secrets/{application_secret_token}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "application_secrets"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "application_secret_token",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/application_secrets/{application_secret_token}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "application_secrets"
                },
                {
                  "var": "application_secret_token"
                }
              ],
              "parts": [
                "api",
                "v1",
                "application_secrets",
                "{application_secret_token}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "application_secret_token",
                    "orig": "application_secret_token",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "application_secret_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.application_secret"
          ]
        ]
      }
    },
    "event": {
      "fields": [
        {
          "name": "event_id",
          "title": "Event Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "event_type_name",
          "title": "Event Type Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "title": "Ip",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "occurred_at",
          "title": "Occurred At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "payload",
          "title": "Payload",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "payload_content_type",
          "title": "Payload Content Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "received_at",
          "title": "Received At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "event",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/events/{event_id}/replay",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "events"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "replay"
                }
              ],
              "parts": [
                "api",
                "v1",
                "events",
                "{id}",
                "replay"
              ],
              "rename": {
                "param": {
                  "event_id": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "event_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "replay",
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "events"
                }
              ],
              "parts": [
                "api",
                "v1",
                "events"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events/{event_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "events"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "event_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
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
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "event_type_name",
          "title": "Event Type Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "resource_type",
          "title": "Resource Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "resource_type_name",
          "title": "Resource Type Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "service",
          "title": "Service",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "service_name",
          "title": "Service Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "verb",
          "title": "Verb",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "verb_name",
          "title": "Verb Name",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "event_type",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/event_types/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "event_types"
                }
              ],
              "parts": [
                "api",
                "v1",
                "event_types"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/event_types/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "event_types"
                }
              ],
              "parts": [
                "api",
                "v1",
                "event_types"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/event_types/{event_type_name}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "event_types"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "event_type_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
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
      "fields": [],
      "name": "events_management",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/payload_content_types/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "payload_content_types"
                }
              ],
              "parts": [
                "api",
                "v1",
                "payload_content_types"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/event_types/{event_type_name}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "event_types"
                },
                {
                  "var": "event_type_name"
                }
              ],
              "parts": [
                "api",
                "v1",
                "event_types",
                "{event_type_name}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_type_name",
                    "orig": "event_type_name",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "event_type_name"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.event_type"
          ]
        ]
      }
    },
    "health": {
      "fields": [
        {
          "name": "database",
          "title": "Database",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "database_duration_ms",
          "title": "Database Duration Ms",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "object_storage",
          "title": "Object Storage",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "object_storage_duration_ms",
          "title": "Object Storage Duration Ms",
          "type": "`$INTEGER`",
          "format": "int64"
        },
        {
          "name": "pulsar",
          "title": "Pulsar",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "pulsar_duration_ms",
          "title": "Pulsar Duration Ms",
          "type": "`$INTEGER`",
          "format": "int64"
        },
        {
          "name": "total_duration_ms",
          "title": "Total Duration Ms",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        }
      ],
      "name": "health",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/health/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "health"
                }
              ],
              "parts": [
                "api",
                "v1",
                "health"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
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
          "title": "Default",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "env_var",
          "title": "Env Var",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "group",
          "title": "Group",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "required",
          "title": "Required",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "sensitive",
          "title": "Sensitive",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "hook0",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/environment_variables/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "environment_variables"
                }
              ],
              "parts": [
                "api",
                "v1",
                "environment_variables"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "short": "UUID of the application this event belongs to.",
          "format": "uuid"
        },
        {
          "name": "event_id",
          "title": "Event Id",
          "type": "`$STRING`",
          "short": "Optional unique identifier for this event (client-generated UUID).",
          "format": "uuid"
        },
        {
          "name": "event_type",
          "title": "Event Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The type of event (e.g., 'user.created', 'order.completed')."
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Labels for event filtering and routing to subscriptions."
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`",
          "short": "Optional metadata key-value pairs associated with the event."
        },
        {
          "name": "occurred_at",
          "title": "Occurred At",
          "type": "`$STRING`",
          "req": true,
          "short": "Timestamp when the event occurred.",
          "format": "date-time"
        },
        {
          "name": "payload",
          "title": "Payload",
          "type": "`$STRING`",
          "req": true,
          "short": "The event payload."
        },
        {
          "name": "payload_content_type",
          "title": "Payload Content Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Content type of the payload."
        }
      ],
      "name": "ingested_event",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/event/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "event"
                }
              ],
              "parts": [
                "api",
                "v1",
                "event"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Application Secret Compatibility",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "auto_db_migration",
          "title": "Auto Db Migration",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "biscuit_public_key",
          "title": "Biscuit Public Key",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "cloudflare_turnstile_site_key",
          "title": "Cloudflare Turnstile Site Key",
          "type": "`$STRING`"
        },
        {
          "name": "formbricks",
          "title": "Formbricks",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "matomo",
          "title": "Matomo",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "password_minimum_length",
          "title": "Password Minimum Length",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "quota_enforcement",
          "title": "Quota Enforcement",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "registration_disabled",
          "title": "Registration Disabled",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "support_email_address",
          "title": "Support Email Address",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "instance",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/instance/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "instance"
                }
              ],
              "parts": [
                "api",
                "v1",
                "instance"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Email",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "password",
          "title": "Password",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "login",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/login",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "login"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "login"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/refresh",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "refresh"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "refresh"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "name": "amount",
          "title": "Amount",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "application_id",
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "application_name",
          "title": "Application Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "consumption",
          "title": "Consumption",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true,
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "is_provisional",
          "title": "Is Provisional",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "onboarding_steps",
          "title": "Onboarding Steps",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "organization_id",
          "title": "Organization Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "plan",
          "title": "Plan",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "quotas",
          "title": "Quotas",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "role",
          "title": "Role",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "users",
          "title": "Users",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "organization",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/organizations/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                }
              ],
              "parts": [
                "api",
                "v1",
                "organizations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/events_per_day/organization",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "events_per_day"
                },
                {
                  "lit": "organization"
                }
              ],
              "parts": [
                "api",
                "v1",
                "events_per_day",
                "organization"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "from",
                  "organization_id",
                  "to"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/organizations/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                }
              ],
              "parts": [
                "api",
                "v1",
                "organizations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/organizations/{organization_id}/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/organizations/{organization_id}/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/organizations/{organization_id}/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "role",
          "title": "Role",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "user_id",
          "title": "User Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "organization_edit_role",
      "op": {
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "invite"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "invite",
                "exist": [
                  "id"
                ]
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
          "title": "Detail",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "problem",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/errors/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "errors"
                }
              ],
              "parts": [
                "api",
                "v1",
                "errors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Global Applications Per Organization Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "global_days_of_events_retention_limit",
          "title": "Global Days Of Events Retention Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "global_event_types_per_application_limit",
          "title": "Global Event Types Per Application Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "global_events_per_day_limit",
          "title": "Global Events Per Day Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "global_members_per_organization_limit",
          "title": "Global Members Per Organization Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "global_subscriptions_per_application_limit",
          "title": "Global Subscriptions Per Application Limit",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        }
      ],
      "name": "quota",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/quotas/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "quotas"
                }
              ],
              "parts": [
                "api",
                "v1",
                "quotas"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.limits`"
              },
              "args": {},
              "select": {}
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
          "title": "Email",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "first_name",
          "title": "First Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "gclid",
          "title": "Gclid",
          "type": "`$STRING`",
          "short": "Optional Google Ads click identifier captured during the user's journey from a Google Ad."
        },
        {
          "name": "last_name",
          "title": "Last Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "password",
          "title": "Password",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "turnstile_token",
          "title": "Turnstile Token",
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
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/register/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "register"
                }
              ],
              "parts": [
                "api",
                "v1",
                "register"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "delay_until",
          "title": "Delay Until",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "event",
          "title": "Event",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "event_id",
          "title": "Event Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "failed_at",
          "title": "Failed At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "http_response_status",
          "title": "Http Response Status",
          "type": "`$INTEGER`",
          "format": "int32"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "picked_at",
          "title": "Picked At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "request_attempt_id",
          "title": "Request Attempt Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "response_id",
          "title": "Response Id",
          "type": "`$STRING`",
          "format": "uuid"
        },
        {
          "name": "retry_count",
          "title": "Retry Count",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Status of a request attempt."
        },
        {
          "name": "subscription",
          "title": "Subscription",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "succeeded_at",
          "title": "Succeeded At",
          "type": "`$STRING`",
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "request_attempt",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/request_attempts/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "request_attempts"
                }
              ],
              "parts": [
                "api",
                "v1",
                "request_attempts"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "event_event_type_name",
                    "orig": "event_event_type_name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "event_id",
                    "orig": "event_id",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "max_created_at",
                    "orig": "max_created_at",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "min_created_at",
                    "orig": "min_created_at",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "pagination_cursor",
                    "orig": "pagination_cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "subscription_id",
                    "orig": "subscription_id",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
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
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/request_attempts/{request_attempt_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "request_attempts"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "request_attempt_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
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
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "response",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/responses/{response_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "responses"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body.headers`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "response_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
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
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "organization_id"
                },
                {
                  "lit": "invite"
                }
              ],
              "parts": [
                "api",
                "v1",
                "organizations",
                "{organization_id}",
                "invite"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "organization_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.organization"
          ]
        ]
      }
    },
    "service_token": {
      "fields": [
        {
          "name": "biscuit",
          "title": "Biscuit",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "organization_id",
          "title": "Organization Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "token_id",
          "title": "Token Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "service_token",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/service_token/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "service_token"
                }
              ],
              "parts": [
                "api",
                "v1",
                "service_token"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/service_token/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "service_token"
                }
              ],
              "parts": [
                "api",
                "v1",
                "service_token"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "organization_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/service_token/{service_token_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "service_token"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "service_token_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "organization_id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/service_token/{service_token_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "service_token"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "service_token_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "organization_id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/service_token/{service_token_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "service_token"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "service_token_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Application Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "dedicated_workers",
          "title": "Dedicated Workers",
          "type": "`$ARRAY`",
          "req": true,
          "op": {
            "create": {
              "type": "`$ARRAY`"
            },
            "update": {
              "type": "`$ARRAY`"
            }
          }
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "event_types",
          "title": "Event Types",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "is_enabled",
          "title": "Is Enabled",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "label_key",
          "title": "Label Key",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            },
            "update": {
              "type": "`$STRING`"
            }
          },
          "short": "_Kept for backward compatibility, you should use `labels`_"
        },
        {
          "name": "label_value",
          "title": "Label Value",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            },
            "update": {
              "type": "`$STRING`"
            }
          },
          "short": "_Kept for backward compatibility, you should use `labels`_"
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$OBJECT`",
          "req": true,
          "op": {
            "create": {
              "type": "`$OBJECT`"
            },
            "update": {
              "type": "`$OBJECT`"
            }
          }
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`",
          "req": true,
          "op": {
            "create": {
              "type": "`$OBJECT`"
            },
            "update": {
              "type": "`$OBJECT`"
            }
          }
        },
        {
          "name": "secret",
          "title": "Secret",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "subscription_id",
          "title": "Subscription Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "target",
          "title": "Target",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "subscription",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/subscriptions/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "subscriptions"
                }
              ],
              "parts": [
                "api",
                "v1",
                "subscriptions"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/subscriptions/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "subscriptions"
                }
              ],
              "parts": [
                "api",
                "v1",
                "subscriptions"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "subscriptions"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "subscription_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "subscriptions"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "subscription_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "application_id",
                    "orig": "application_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "application_id",
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/v1/subscriptions/{subscription_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "subscriptions"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "subscription_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Email",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "new_password",
          "title": "New Password",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "token",
          "title": "Token",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "user_authentication",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/begin-reset-password",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "begin-reset-password"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "begin-reset-password"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/logout",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "logout"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "logout"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/password",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "password"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "password"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/reset-password",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "reset-password"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "reset-password"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/verify-email",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "verify-email"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "verify-email"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Email",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "role",
          "title": "Role",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "user_invitation",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/organizations/{organization_id}/invite",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "organization_id"
                },
                {
                  "lit": "invite"
                }
              ],
              "parts": [
                "api",
                "v1",
                "organizations",
                "{organization_id}",
                "invite"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "organization_id",
                    "orig": "organization_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "organization_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.organization"
          ]
        ]
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

