const { describe, test } = require('node:test')
const { SDK } = require('..')
const { runDefinitionPoint } = require('./definition-runner')
const { isControlSkipped } = require('./utility')


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
  {
    "entity": "application",
    "accessor": "Application",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/applications/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "application_id": "x",
      "name": "x",
      "organization_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/events_per_day/application",
    "args": [],
    "select": {
      "application_id": "v1",
      "from": "v1",
      "to": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id",
      "from",
      "to"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "amount": 1,
        "application_id": "x",
        "application_name": "x",
        "date": "2026-01-01",
        "is_provisional": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/applications/",
    "args": [],
    "select": {
      "organization_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "organization_id"
    ],
    "queryArgs": [
      {
        "name": "organization_id",
        "wire": "organization_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "application_id": "x",
        "name": "x",
        "organization_id": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/applications/{application_id}",
    "args": [
      {
        "name": "id",
        "wire": "application_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "application_id": "x",
      "consumption": {
        "events_per_day": 1
      },
      "name": "x",
      "onboarding_steps": {
        "event": "ToDo",
        "event_type": "ToDo",
        "subscription": "ToDo"
      },
      "organization_id": "x",
      "quotas": {
        "days_of_events_retention_limit": 1,
        "events_per_day_limit": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/applications/{application_id}",
    "args": [
      {
        "name": "id",
        "wire": "application_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/applications/{application_id}",
    "args": [
      {
        "name": "id",
        "wire": "application_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "application_id": "x",
      "name": "x",
      "organization_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "application_secret",
    "accessor": "ApplicationSecret",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/application_secrets/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "created_at": "2026-01-01T00:00:00Z",
      "deleted_at": "2026-01-01T00:00:00Z",
      "name": "x",
      "token": "x"
    },
    "idField": "id"
  },
  {
    "entity": "application_secret",
    "accessor": "ApplicationSecret",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/application_secrets/",
    "args": [],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "created_at": "2026-01-01T00:00:00Z",
        "deleted_at": "2026-01-01T00:00:00Z",
        "name": "x",
        "token": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "application_secret",
    "accessor": "ApplicationSecret",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/application_secrets/{application_secret_token}",
    "args": [
      {
        "name": "id",
        "wire": "application_secret_token",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "created_at": "2026-01-01T00:00:00Z",
      "deleted_at": "2026-01-01T00:00:00Z",
      "name": "x",
      "token": "x"
    },
    "idField": "id"
  },
  {
    "entity": "applications_management",
    "accessor": "ApplicationsManagement",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/application_secrets/{application_secret_token}",
    "args": [
      {
        "name": "application_secret_token",
        "wire": "application_secret_token",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "email_preference",
    "accessor": "EmailPreference",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/email-preferences/unsubscribe-reactivation",
    "action": "unsubscribe_reactivation",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "error",
    "accessor": "Error",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/errors/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "detail": "x",
        "id": "OrganizationNameMissing",
        "status": 1,
        "title": "x",
        "type": "x",
        "validation": {}
      }
    ],
    "idField": "id"
  },
  {
    "entity": "event",
    "accessor": "Event",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/replay",
    "action": "replay",
    "args": [
      {
        "name": "id",
        "wire": "event_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "event",
    "accessor": "Event",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/events/",
    "args": [],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "event_id": "x",
        "event_type_name": "x",
        "ip": "x",
        "labels": {},
        "metadata": {},
        "occurred_at": "2026-01-01T00:00:00Z",
        "payload_content_type": "x",
        "received_at": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "event",
    "accessor": "Event",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/events/{event_id}",
    "args": [
      {
        "name": "id",
        "wire": "event_id",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "event_id": "x",
      "event_type_name": "x",
      "ip": "x",
      "labels": {},
      "metadata": {},
      "occurred_at": "2026-01-01T00:00:00Z",
      "payload": "x",
      "payload_content_type": "x",
      "received_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/event_types/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "event_type_name": "x",
      "resource_type_name": "x",
      "service_name": "x",
      "verb_name": "x"
    },
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/event_types/",
    "args": [],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "event_type_name": "x",
        "resource_type_name": "x",
        "service_name": "x",
        "verb_name": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "event_type",
    "accessor": "EventType",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/event_types/{event_type_name}",
    "args": [
      {
        "name": "id",
        "wire": "event_type_name",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "event_type_name": "x",
      "resource_type_name": "x",
      "service_name": "x",
      "verb_name": "x"
    },
    "idField": "id"
  },
  {
    "entity": "events_management",
    "accessor": "EventsManagement",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/payload_content_types/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": [
      "x"
    ],
    "idField": "id"
  },
  {
    "entity": "events_management",
    "accessor": "EventsManagement",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/event_types/{event_type_name}",
    "args": [
      {
        "name": "event_type_name",
        "wire": "event_type_name",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "health",
    "accessor": "Health",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/health/",
    "args": [],
    "select": {
      "key": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "key"
    ],
    "queryArgs": [
      {
        "name": "key",
        "wire": "key"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "database": true,
      "database_duration_ms": 1,
      "object_storage": true,
      "object_storage_duration_ms": 1,
      "pulsar": true,
      "pulsar_duration_ms": 1,
      "total_duration_ms": 1
    },
    "idField": "id"
  },
  {
    "entity": "hook0",
    "accessor": "Hook0",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/environment_variables/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "default": "x",
        "description": "x",
        "env_var": "x",
        "group": "x",
        "name": "x",
        "required": true,
        "sensitive": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "ingested_event",
    "accessor": "IngestedEvent",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/event/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "application_id": "x",
      "event_id": "x",
      "received_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "instance",
    "accessor": "Instance",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/instance/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "application_secret_compatibility": true,
      "auto_db_migration": true,
      "biscuit_public_key": "x",
      "cloudflare_turnstile_site_key": "x",
      "formbricks": {
        "api_host": "x",
        "environment_id": "x"
      },
      "matomo": {
        "site_id": 1,
        "url": "x"
      },
      "password_minimum_length": 1,
      "quota_enforcement": true,
      "registration_disabled": true,
      "support_email_address": "x"
    },
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/organizations/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "consumption": {
        "applications": 1,
        "events_per_day": 1,
        "members": 1
      },
      "name": "x",
      "onboarding_steps": {
        "application": "ToDo",
        "event": "ToDo",
        "event_type": "ToDo",
        "subscription": "ToDo"
      },
      "organization_id": "x",
      "plan": {
        "label": "x",
        "name": "x"
      },
      "quotas": {
        "applications_per_organization_limit": 1,
        "days_of_events_retention_limit": 1,
        "events_per_day_limit": 1,
        "members_per_organization_limit": 1
      },
      "users": [
        {
          "email": "x",
          "first_name": "x",
          "last_name": "x",
          "role": "x",
          "user_id": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/events_per_day/organization",
    "args": [],
    "select": {
      "organization_id": "v1",
      "from": "v1",
      "to": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "organization_id",
      "to"
    ],
    "queryArgs": [
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "organization_id",
        "wire": "organization_id"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "amount": 1,
        "application_id": "x",
        "application_name": "x",
        "date": "2026-01-01",
        "is_provisional": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/organizations/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "name": "x",
        "organization_id": "x",
        "plan": {
          "label": "x",
          "name": "x"
        },
        "role": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/organizations/{organization_id}/",
    "args": [
      {
        "name": "id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "consumption": {
        "applications": 1,
        "events_per_day": 1,
        "members": 1
      },
      "name": "x",
      "onboarding_steps": {
        "application": "ToDo",
        "event": "ToDo",
        "event_type": "ToDo",
        "subscription": "ToDo"
      },
      "organization_id": "x",
      "plan": {
        "label": "x",
        "name": "x"
      },
      "quotas": {
        "applications_per_organization_limit": 1,
        "days_of_events_retention_limit": 1,
        "events_per_day_limit": 1,
        "members_per_organization_limit": 1
      },
      "users": [
        {
          "email": "x",
          "first_name": "x",
          "last_name": "x",
          "role": "x",
          "user_id": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/organizations/{organization_id}/",
    "args": [
      {
        "name": "id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "organization",
    "accessor": "Organization",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/organizations/{organization_id}/",
    "args": [
      {
        "name": "id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "consumption": {
        "applications": 1,
        "events_per_day": 1,
        "members": 1
      },
      "name": "x",
      "onboarding_steps": {
        "application": "ToDo",
        "event": "ToDo",
        "event_type": "ToDo",
        "subscription": "ToDo"
      },
      "organization_id": "x",
      "plan": {
        "label": "x",
        "name": "x"
      },
      "quotas": {
        "applications_per_organization_limit": 1,
        "days_of_events_retention_limit": 1,
        "events_per_day_limit": 1,
        "members_per_organization_limit": 1
      },
      "users": [
        {
          "email": "x",
          "first_name": "x",
          "last_name": "x",
          "role": "x",
          "user_id": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "organization_edit_role",
    "accessor": "OrganizationEditRole",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/organizations/{organization_id}/invite",
    "action": "invite",
    "args": [
      {
        "name": "id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "role": "x",
      "user_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "quota",
    "accessor": "Quota",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/quotas/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "enabled": true,
      "limits": {
        "global_applications_per_organization_limit": 1,
        "global_days_of_events_retention_limit": 1,
        "global_event_types_per_application_limit": 1,
        "global_events_per_day_limit": 1,
        "global_free_organizations_per_user_limit": 1,
        "global_members_per_organization_limit": 1,
        "global_subscriptions_per_application_limit": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "registration",
    "accessor": "Registration",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/register/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 201,
    "sample": {
      "organization_id": "x",
      "user_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "request_attempt",
    "accessor": "RequestAttempt",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/request_attempts/",
    "args": [],
    "select": {
      "application_id": "v1",
      "event_event_type_name": "v1",
      "event_id": "v1",
      "max_created_at": "v1",
      "min_created_at": "v1",
      "pagination_cursor": "v1",
      "subscription_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id",
      "event.event_type_names",
      "event_id",
      "max_created_at",
      "min_created_at",
      "pagination_cursor",
      "subscription_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      },
      {
        "name": "event_event_type_name",
        "wire": "event.event_type_names"
      },
      {
        "name": "event_id",
        "wire": "event_id"
      },
      {
        "name": "max_created_at",
        "wire": "max_created_at"
      },
      {
        "name": "min_created_at",
        "wire": "min_created_at"
      },
      {
        "name": "pagination_cursor",
        "wire": "pagination_cursor"
      },
      {
        "name": "subscription_id",
        "wire": "subscription_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "created_at": "2026-01-01T00:00:00Z",
        "delay_until": "2026-01-01T00:00:00Z",
        "event": {
          "event_id": "x",
          "event_type_name": "x"
        },
        "event_id": "x",
        "failed_at": "2026-01-01T00:00:00Z",
        "http_response_status": 1,
        "picked_at": "2026-01-01T00:00:00Z",
        "request_attempt_id": "x",
        "response_id": "x",
        "retry_count": 1,
        "status": {
          "at": "2026-01-01T00:00:00Z",
          "full_processing_ms": 1,
          "since": "2026-01-01T00:00:00Z",
          "type": "waiting",
          "until": "2026-01-01T00:00:00Z"
        },
        "subscription": {
          "description": "x",
          "subscription_id": "x"
        },
        "succeeded_at": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "request_attempt",
    "accessor": "RequestAttempt",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/request_attempts/{request_attempt_id}",
    "args": [
      {
        "name": "id",
        "wire": "request_attempt_id",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "created_at": "2026-01-01T00:00:00Z",
      "delay_until": "2026-01-01T00:00:00Z",
      "event": {
        "event_id": "x",
        "event_type_name": "x"
      },
      "event_id": "x",
      "failed_at": "2026-01-01T00:00:00Z",
      "http_response_status": 1,
      "picked_at": "2026-01-01T00:00:00Z",
      "request_attempt_id": "x",
      "response_id": "x",
      "retry_count": 1,
      "status": {
        "at": "2026-01-01T00:00:00Z",
        "full_processing_ms": 1,
        "since": "2026-01-01T00:00:00Z",
        "type": "waiting",
        "until": "2026-01-01T00:00:00Z"
      },
      "subscription": {
        "description": "x",
        "subscription_id": "x"
      },
      "succeeded_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "response",
    "accessor": "Response",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/responses/{response_id}",
    "args": [
      {
        "name": "id",
        "wire": "response_id",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "body": "x",
      "elapsed_time_ms": 1,
      "headers": {},
      "http_code": 1,
      "response_error_name": "x",
      "response_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "revoke",
    "accessor": "Revoke",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/organizations/{organization_id}/invite",
    "args": [
      {
        "name": "organization_id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "user_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "service_token",
    "accessor": "ServiceToken",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/service_token/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "biscuit": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "name": "x",
      "token_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "service_token",
    "accessor": "ServiceToken",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/service_token/",
    "args": [],
    "select": {
      "organization_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "organization_id"
    ],
    "queryArgs": [
      {
        "name": "organization_id",
        "wire": "organization_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "biscuit": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "name": "x",
        "token_id": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "service_token",
    "accessor": "ServiceToken",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/service_token/{service_token_id}",
    "args": [
      {
        "name": "id",
        "wire": "service_token_id",
        "value": "p1"
      }
    ],
    "select": {
      "organization_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "organization_id"
    ],
    "queryArgs": [
      {
        "name": "organization_id",
        "wire": "organization_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "biscuit": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "name": "x",
      "token_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "service_token",
    "accessor": "ServiceToken",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/service_token/{service_token_id}",
    "args": [
      {
        "name": "id",
        "wire": "service_token_id",
        "value": "p1"
      }
    ],
    "select": {
      "organization_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "organization_id"
    ],
    "queryArgs": [
      {
        "name": "organization_id",
        "wire": "organization_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "service_token",
    "accessor": "ServiceToken",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/service_token/{service_token_id}",
    "args": [
      {
        "name": "id",
        "wire": "service_token_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "biscuit": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "name": "x",
      "token_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "subscription",
    "accessor": "Subscription",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/subscriptions/",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "application_id": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "dedicated_workers": [
        "x"
      ],
      "description": "x",
      "event_types": [
        "x"
      ],
      "is_enabled": true,
      "label_key": "x",
      "label_value": "x",
      "labels": {},
      "metadata": {},
      "secret": "x",
      "subscription_id": "x",
      "target": {
        "headers": {},
        "method": "x",
        "type": "http",
        "url": "x"
      },
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "subscription",
    "accessor": "Subscription",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/subscriptions/",
    "args": [],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "application_id": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "dedicated_workers": [
          "x"
        ],
        "description": "x",
        "event_types": [
          "x"
        ],
        "is_enabled": true,
        "label_key": "x",
        "label_value": "x",
        "labels": {},
        "metadata": {},
        "secret": "x",
        "subscription_id": "x",
        "target": {
          "headers": {},
          "method": "x",
          "type": "http",
          "url": "x"
        },
        "updated_at": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "subscription",
    "accessor": "Subscription",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/subscriptions/{subscription_id}",
    "args": [
      {
        "name": "id",
        "wire": "subscription_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "application_id": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "dedicated_workers": [
        "x"
      ],
      "description": "x",
      "event_types": [
        "x"
      ],
      "is_enabled": true,
      "label_key": "x",
      "label_value": "x",
      "labels": {},
      "metadata": {},
      "secret": "x",
      "subscription_id": "x",
      "target": {
        "headers": {},
        "method": "x",
        "type": "http",
        "url": "x"
      },
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "subscription",
    "accessor": "Subscription",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/subscriptions/{subscription_id}",
    "args": [
      {
        "name": "id",
        "wire": "subscription_id",
        "value": "p1"
      }
    ],
    "select": {
      "application_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "application_id"
    ],
    "queryArgs": [
      {
        "name": "application_id",
        "wire": "application_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "subscription",
    "accessor": "Subscription",
    "op": "update",
    "method": "PUT",
    "path": "/api/v1/subscriptions/{subscription_id}",
    "args": [
      {
        "name": "id",
        "wire": "subscription_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "application_id": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "dedicated_workers": [
        "x"
      ],
      "description": "x",
      "event_types": [
        "x"
      ],
      "is_enabled": true,
      "label_key": "x",
      "label_value": "x",
      "labels": {},
      "metadata": {},
      "secret": "x",
      "subscription_id": "x",
      "target": {
        "headers": {},
        "method": "x",
        "type": "http",
        "url": "x"
      },
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "user_invitation",
    "accessor": "UserInvitation",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/organizations/{organization_id}/invite",
    "args": [
      {
        "name": "organization_id",
        "wire": "organization_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "email": "x",
      "role": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
