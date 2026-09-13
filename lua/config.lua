-- Hook0 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Hook0",
      slug = "hook0",
      version = "0.1.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://app.hook0.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["application"] = {},
        ["application_secret"] = {},
        ["applications_management"] = {},
        ["event"] = {},
        ["event_type"] = {},
        ["events_management"] = {},
        ["events_per_day_entry"] = {},
        ["health"] = {},
        ["hook0"] = {},
        ["ingested_event"] = {},
        ["instance"] = {},
        ["login"] = {},
        ["organization"] = {},
        ["organization_edit_role"] = {},
        ["problem"] = {},
        ["quota"] = {},
        ["registration"] = {},
        ["request_attempt"] = {},
        ["response"] = {},
        ["revoke"] = {},
        ["service_token"] = {},
        ["subscription"] = {},
        ["user_authentication"] = {},
        ["user_invitation"] = {},
      },
    },
    entity = {
      ["application"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["short"] = "Unique identifier of the application.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "consumption",
            ["req"] = true,
            ["short"] = "Current consumption metrics for this application.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Name of the application.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "onboarding_steps",
            ["req"] = true,
            ["short"] = "Onboarding completion status for this application.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "organization_id",
            ["req"] = true,
            ["short"] = "UUID of the organization this application belongs to.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quotas",
            ["req"] = true,
            ["short"] = "Quota limits for this application.",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "application",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/applications/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "applications",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "applications",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/applications/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "applications",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "applications",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/applications/{application_id}",
                ["rename"] = {
                  ["param"] = {
                    ["application_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "applications",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/applications/{application_id}",
                ["rename"] = {
                  ["param"] = {
                    ["application_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "applications",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/applications/{application_id}",
                ["rename"] = {
                  ["param"] = {
                    ["application_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "applications",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "applications",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["application_secret"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "deleted_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "token",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "application_secret",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/application_secrets/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "application_secrets",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "application_secrets",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/application_secrets/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "application_secrets",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "application_secrets",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "application_secret_token",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/application_secrets/{application_secret_token}",
                ["rename"] = {
                  ["param"] = {
                    ["application_secret_token"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "application_secrets",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "application_secrets",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["applications_management"] = {
        ["fields"] = {},
        ["name"] = "applications_management",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "application_secret_token",
                      ["orig"] = "application_secret_token",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/application_secrets/{application_secret_token}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "application_secrets",
                  },
                  {
                    ["var"] = "application_secret_token",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "application_secret_token",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "application_secrets",
                  "{application_secret_token}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "application_secret",
            },
          },
        },
      },
      ["event"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "event_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "event_type_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ip",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "labels",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "metadata",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "occurred_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "payload",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "payload_content_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "received_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "event",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "event_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/events/{event_id}/replay",
                ["rename"] = {
                  ["param"] = {
                    ["event_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "events",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "replay",
                  },
                },
                ["select"] = {
                  ["$action"] = "replay",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "events",
                  "{id}",
                  "replay",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/events/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "events",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "events",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "event_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/events/{event_id}",
                ["rename"] = {
                  ["param"] = {
                    ["event_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "events",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "events",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["event_type"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "event_type_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resource_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resource_type_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "service",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "service_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "verb",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "verb_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "event_type",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/event_types/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "event_types",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "event_types",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/event_types/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "event_types",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "event_types",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "event_type_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/event_types/{event_type_name}",
                ["rename"] = {
                  ["param"] = {
                    ["event_type_name"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "event_types",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "event_types",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["events_management"] = {
        ["fields"] = {},
        ["name"] = "events_management",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/payload_content_types/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "payload_content_types",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "payload_content_types",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "event_type_name",
                      ["orig"] = "event_type_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/event_types/{event_type_name}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "event_types",
                  },
                  {
                    ["var"] = "event_type_name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "event_type_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "event_types",
                  "{event_type_name}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "event_type",
            },
          },
        },
      },
      ["events_per_day_entry"] = {
        ["fields"] = {
          {
            ["format"] = "int32",
            ["name"] = "amount",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "application_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_provisional",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "events_per_day_entry",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/events_per_day/application",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "events_per_day",
                  },
                  {
                    ["lit"] = "application",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "from",
                    "to",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "events_per_day",
                  "application",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/events_per_day/organization",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "events_per_day",
                  },
                  {
                    ["lit"] = "organization",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "organization_id",
                    "to",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "events_per_day",
                  "organization",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["health"] = {
        ["fields"] = {
          {
            ["name"] = "database",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["format"] = "int64",
            ["name"] = "database_duration_ms",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "object_storage",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["format"] = "int64",
            ["name"] = "object_storage_duration_ms",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "pulsar",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["format"] = "int64",
            ["name"] = "pulsar_duration_ms",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int64",
            ["name"] = "total_duration_ms",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "health",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/health/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "health",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "health",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["hook0"] = {
        ["fields"] = {
          {
            ["name"] = "default",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "env_var",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "group",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "required",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "sensitive",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "hook0",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/environment_variables/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "environment_variables",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "environment_variables",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ingested_event"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["short"] = "UUID of the application this event belongs to.",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "event_id",
            ["short"] = "Optional unique identifier for this event (client-generated UUID).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "event_type",
            ["req"] = true,
            ["short"] = "The type of event (e.g., 'user.created', 'order.completed').",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "labels",
            ["req"] = true,
            ["short"] = "Labels for event filtering and routing to subscriptions.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "metadata",
            ["short"] = "Optional metadata key-value pairs associated with the event.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "occurred_at",
            ["req"] = true,
            ["short"] = "Timestamp when the event occurred.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "payload",
            ["req"] = true,
            ["short"] = "The event payload.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "payload_content_type",
            ["req"] = true,
            ["short"] = "Content type of the payload.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "ingested_event",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/event/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "event",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "event",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["instance"] = {
        ["fields"] = {
          {
            ["name"] = "application_secret_compatibility",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "auto_db_migration",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "biscuit_public_key",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cloudflare_turnstile_site_key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "formbricks",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "matomo",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "int32",
            ["name"] = "password_minimum_length",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "quota_enforcement",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "registration_disabled",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "support_email_address",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "instance",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/instance/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "instance",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "instance",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["login"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "password",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "login",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/login",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "login",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "login",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/refresh",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "refresh",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "refresh",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["organization"] = {
        ["fields"] = {
          {
            ["name"] = "consumption",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "onboarding_steps",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "organization_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "plan",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "quotas",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "users",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "organization",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/organizations/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/organizations/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/organizations/{organization_id}/",
                ["rename"] = {
                  ["param"] = {
                    ["organization_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/organizations/{organization_id}/",
                ["rename"] = {
                  ["param"] = {
                    ["organization_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/organizations/{organization_id}/",
                ["rename"] = {
                  ["param"] = {
                    ["organization_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["organization_edit_role"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "user_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "organization_edit_role",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                ["rename"] = {
                  ["param"] = {
                    ["organization_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "invite",
                  },
                },
                ["select"] = {
                  ["$action"] = "invite",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{id}",
                  "invite",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["problem"] = {
        ["fields"] = {
          {
            ["name"] = "detail",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "int32",
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "problem",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/errors/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "errors",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "errors",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["quota"] = {
        ["fields"] = {
          {
            ["format"] = "int32",
            ["name"] = "global_applications_per_organization_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int32",
            ["name"] = "global_days_of_events_retention_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int32",
            ["name"] = "global_event_types_per_application_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int32",
            ["name"] = "global_events_per_day_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int32",
            ["name"] = "global_members_per_organization_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "int32",
            ["name"] = "global_subscriptions_per_application_limit",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "quota",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/quotas/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "quotas",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.limits`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "quotas",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["registration"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "first_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "gclid",
            ["short"] = "Optional Google Ads click identifier captured during the user's journey from a Google Ad.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "password",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "turnstile_token",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "registration",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/register/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "register",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "register",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["request_attempt"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "delay_until",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "event",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "event_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "failed_at",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "int32",
            ["name"] = "http_response_status",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "picked_at",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "request_attempt_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "response_id",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "int32",
            ["name"] = "retry_count",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["short"] = "Status of a request attempt.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "subscription",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "succeeded_at",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "request_attempt",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "event_event_type_name",
                      ["orig"] = "event_event_type_name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "event_id",
                      ["orig"] = "event_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "max_created_at",
                      ["orig"] = "max_created_at",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "min_created_at",
                      ["orig"] = "min_created_at",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "pagination_cursor",
                      ["orig"] = "pagination_cursor",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "subscription_id",
                      ["orig"] = "subscription_id",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/request_attempts/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "request_attempts",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "event_event_type_name",
                    "event_id",
                    "max_created_at",
                    "min_created_at",
                    "pagination_cursor",
                    "subscription_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "request_attempts",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "request_attempt_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/request_attempts/{request_attempt_id}",
                ["rename"] = {
                  ["param"] = {
                    ["request_attempt_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "request_attempts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "request_attempts",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["response"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "response",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "response_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/responses/{response_id}",
                ["rename"] = {
                  ["param"] = {
                    ["response_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "responses",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.headers`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "responses",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["revoke"] = {
        ["fields"] = {},
        ["name"] = "revoke",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "organization_id",
                  },
                  {
                    ["lit"] = "invite",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "organization",
            },
          },
        },
      },
      ["service_token"] = {
        ["fields"] = {
          {
            ["name"] = "biscuit",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "organization_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "token_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "service_token",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/service_token/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "service_token",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "service_token",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/service_token/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "service_token",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "service_token",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "service_token_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/service_token/{service_token_id}",
                ["rename"] = {
                  ["param"] = {
                    ["service_token_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "service_token",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "service_token_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/service_token/{service_token_id}",
                ["rename"] = {
                  ["param"] = {
                    ["service_token_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "service_token",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "service_token_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/service_token/{service_token_id}",
                ["rename"] = {
                  ["param"] = {
                    ["service_token_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "service_token",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "service_token",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["subscription"] = {
        ["fields"] = {
          {
            ["format"] = "uuid",
            ["name"] = "application_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "dedicated_workers",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$ARRAY`",
              },
              ["update"] = {
                ["type"] = "`$ARRAY`",
              },
            },
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "event_types",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_enabled",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "label_key",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["short"] = "_Kept for backward compatibility, you should use `labels`_",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "label_value",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$STRING`",
              },
              ["update"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["short"] = "_Kept for backward compatibility, you should use `labels`_",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "labels",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$OBJECT`",
              },
              ["update"] = {
                ["type"] = "`$OBJECT`",
              },
            },
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "metadata",
            ["op"] = {
              ["create"] = {
                ["type"] = "`$OBJECT`",
              },
              ["update"] = {
                ["type"] = "`$OBJECT`",
              },
            },
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "secret",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "subscription_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "target",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updated_at",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "subscription",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/subscriptions/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "subscriptions",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "subscriptions",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/subscriptions/",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "subscriptions",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "subscriptions",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "subscription_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                ["rename"] = {
                  ["param"] = {
                    ["subscription_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "subscriptions",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "subscription_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                ["rename"] = {
                  ["param"] = {
                    ["subscription_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "subscriptions",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "application_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "subscription_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                ["rename"] = {
                  ["param"] = {
                    ["subscription_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "subscriptions",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "subscriptions",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_authentication"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "new_password",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "token",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "user_authentication",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/begin-reset-password",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "begin-reset-password",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "begin-reset-password",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/logout",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "logout",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "logout",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/password",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "password",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "password",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/reset-password",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "reset-password",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "reset-password",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/auth/verify-email",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "auth",
                  },
                  {
                    ["lit"] = "verify-email",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "auth",
                  "verify-email",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_invitation"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "user_invitation",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "organization_id",
                      ["orig"] = "organization_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "organizations",
                  },
                  {
                    ["var"] = "organization_id",
                  },
                  {
                    ["lit"] = "invite",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "organization_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "organizations",
                  "{organization_id}",
                  "invite",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "organization",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
