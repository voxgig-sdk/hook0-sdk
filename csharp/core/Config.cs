// Hook0 SDK - generated model configuration and feature
// factory. GENERATED from the API model - do not edit by hand.

namespace Hook0Sdk;

public static class SdkConfig
{
    public static Dictionary<string, object?> MakeConfig()
    {
        return new Dictionary<string, object?>
        {
            ["main"] = new Dictionary<string, object?>
            {
                ["name"] = "Hook0",
                ["slug"] = "hook0",
                ["version"] = "0.1.1",
                ["target"] = "csharp",
            },
            ["feature"] = new Dictionary<string, object?>
            {
                ["debug"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["max"] = 100,
                        ["redact"] = new List<object?>
                        {
                            "authorization",
                            "cookie",
                            "set-cookie",
                            "api-key",
                            "apikey",
                            "x-api-key",
                            "idempotency-key",
                        },
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["now"] = "`$FUNCTION`",
                        ["onEntry"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "none",
                },
                ["idempotency"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["header"] = "Idempotency-Key",
                        ["methods"] = new List<object?>
                        {
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE",
                        },
                        ["ops"] = new List<object?>
                        {
                            "create",
                            "update",
                            "remove",
                        },
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["keygen"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "none",
                },
                ["metrics"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["now"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "none",
                },
                ["paging"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["afterVar"] = "after",
                        ["cursorParam"] = "cursor",
                        ["firstVar"] = "first",
                        ["limitParam"] = "limit",
                        ["pageParam"] = "page",
                        ["startPage"] = 1,
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["limit"] = "`$NUMBER`",
                        ["ops"] = "`$LIST`",
                    },
                    ["strict"] = false,
                    ["transport"] = "none",
                },
                ["ratelimit"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["burst"] = 5,
                        ["rate"] = 5,
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["now"] = "`$FUNCTION`",
                        ["sleep"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "wrap",
                },
                ["retry"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["factor"] = 2,
                        ["maxDelay"] = 2000,
                        ["minDelay"] = 50,
                        ["retries"] = 2,
                        ["statuses"] = new List<object?>
                        {
                            408,
                            425,
                            429,
                            500,
                            502,
                            503,
                            504,
                        },
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["jitter"] = "`$BOOLEAN`",
                        ["sleep"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "wrap",
                },
                ["secrets"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["cache"] = true,
                        ["exchange"] = new Dictionary<string, object?>
                        {
                            ["active"] = false,
                            ["method"] = "POST",
                            ["path"] = "auth/token",
                            ["refresh"] = "",
                            ["request"] = "refresh_token",
                            ["response"] = "access_token",
                            ["retries"] = 1,
                            ["statuses"] = new List<object?>
                            {
                                401,
                            },
                        },
                        ["name"] = "apikey",
                        ["providers"] = new List<object?>(),
                    },
                    ["optspec"] = new Dictionary<string, object?>(),
                    ["strict"] = false,
                    ["transport"] = "wrap",
                },
                ["test"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["entity"] = "`$MAP`",
                        ["net"] = "`$MAP`",
                    },
                    ["strict"] = false,
                    ["transport"] = "base",
                },
                ["timeout"] = new Dictionary<string, object?>
                {
                    ["options"] = new Dictionary<string, object?>
                    {
                        ["active"] = false,
                        ["ms"] = 30000,
                    },
                    ["optspec"] = new Dictionary<string, object?>
                    {
                        ["clearTimer"] = "`$FUNCTION`",
                        ["now"] = "`$FUNCTION`",
                        ["setTimer"] = "`$FUNCTION`",
                    },
                    ["strict"] = false,
                    ["transport"] = "wrap",
                },
            },
            ["options"] = new Dictionary<string, object?>
            {
                ["base"] = "https://app.hook0.com",
                ["auth"] = new Dictionary<string, object?>
                {
                    ["prefix"] = "Bearer",
                },
                ["headers"] = new Dictionary<string, object?>
                {
                    ["content-type"] = "application/json",
                },
                ["entity"] = new Dictionary<string, object?>
                {
                    ["application"] = new Dictionary<string, object?>(),
                    ["application_secret"] = new Dictionary<string, object?>(),
                    ["email_preference"] = new Dictionary<string, object?>(),
                    ["error"] = new Dictionary<string, object?>(),
                    ["event"] = new Dictionary<string, object?>(),
                    ["event_type"] = new Dictionary<string, object?>(),
                    ["events_management"] = new Dictionary<string, object?>(),
                    ["health"] = new Dictionary<string, object?>(),
                    ["hook0"] = new Dictionary<string, object?>(),
                    ["ingested_event"] = new Dictionary<string, object?>(),
                    ["instance"] = new Dictionary<string, object?>(),
                    ["login"] = new Dictionary<string, object?>(),
                    ["organization"] = new Dictionary<string, object?>(),
                    ["organization_edit_role"] = new Dictionary<string, object?>(),
                    ["quota"] = new Dictionary<string, object?>(),
                    ["registration"] = new Dictionary<string, object?>(),
                    ["request_attempt"] = new Dictionary<string, object?>(),
                    ["response"] = new Dictionary<string, object?>(),
                    ["revoke"] = new Dictionary<string, object?>(),
                    ["service_token"] = new Dictionary<string, object?>(),
                    ["subscription"] = new Dictionary<string, object?>(),
                    ["user_authentication"] = new Dictionary<string, object?>(),
                    ["user_invitation"] = new Dictionary<string, object?>(),
                },
            },
            ["entity"] = new Dictionary<string, object?>
            {
                ["application"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "amount",
                            ["title"] = "Amount",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Unique identifier of the application.",
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_name",
                            ["title"] = "Application Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "consumption",
                            ["title"] = "Consumption",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["short"] = "Current consumption metrics for this application.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "date",
                            ["title"] = "Date",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "is_provisional",
                            ["title"] = "Is Provisional",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "name",
                            ["title"] = "Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Name of the application.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "onboarding_steps",
                            ["title"] = "Onboarding Steps",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["short"] = "Onboarding completion status for this application.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "organization_id",
                            ["title"] = "Organization Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "UUID of the organization this application belongs to.",
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "quotas",
                            ["title"] = "Quotas",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["short"] = "Quota limits for this application.",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "application",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/applications/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "applications",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "applications",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/events_per_day/application",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "events_per_day",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "application",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "events_per_day",
                                        "application",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "from",
                                                ["orig"] = "from",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "to",
                                                ["orig"] = "to",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/applications/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "applications",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "applications",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/applications/{application_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "applications",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "applications",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["application_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/applications/{application_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "applications",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "applications",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["application_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/applications/{application_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "applications",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "applications",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["application_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["application_secret"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "created_at",
                            ["title"] = "Created At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "deleted_at",
                            ["title"] = "Deleted At",
                            ["type"] = "`$STRING`",
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "name",
                            ["title"] = "Name",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "token",
                            ["title"] = "Token",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "application_secret",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/application_secrets/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "application_secrets",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "application_secrets",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/application_secrets/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "application_secrets",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "application_secrets",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/application_secrets/{application_secret_token}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "application_secrets",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "application_secrets",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["application_secret_token"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "application_secret_token",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/application_secrets/{application_secret_token}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "application_secrets",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "application_secrets",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["application_secret_token"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "application_secret_token",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["email_preference"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>(),
                    ["name"] = "email_preference",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/email-preferences/unsubscribe-reactivation",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "email-preferences",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "unsubscribe-reactivation",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "email-preferences",
                                        "unsubscribe-reactivation",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["$action"] = "unsubscribe_reactivation",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["error"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "detail",
                            ["title"] = "Detail",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Identifier of the problem that occurred, stable across releases",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "status",
                            ["title"] = "Status",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "title",
                            ["title"] = "Title",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "type",
                            ["title"] = "Type",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "validation",
                            ["title"] = "Validation",
                            ["type"] = "`$OBJECT`",
                            ["short"] = "Which submitted values were rejected and why, keyed by the name of the field they were submitted under.",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "error",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/errors/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "errors",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "errors",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["event"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_id",
                            ["title"] = "Event Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_type_name",
                            ["title"] = "Event Type Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "ip",
                            ["title"] = "Ip",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "labels",
                            ["title"] = "Labels",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "metadata",
                            ["title"] = "Metadata",
                            ["type"] = "`$OBJECT`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "occurred_at",
                            ["title"] = "Occurred At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "payload",
                            ["title"] = "Payload",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "payload_content_type",
                            ["title"] = "Payload Content Type",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "received_at",
                            ["title"] = "Received At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "event",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/events/{event_id}/replay",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "events",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "replay",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "events",
                                        "{id}",
                                        "replay",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["event_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "event_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["$action"] = "replay",
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/events/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "events",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "events",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/events/{event_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "events",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "events",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["event_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "event_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["event_type"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_type_name",
                            ["title"] = "Event Type Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "resource_type",
                            ["title"] = "Resource Type",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "resource_type_name",
                            ["title"] = "Resource Type Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "service",
                            ["title"] = "Service",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "service_name",
                            ["title"] = "Service Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "verb",
                            ["title"] = "Verb",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "verb_name",
                            ["title"] = "Verb Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "event_type",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/event_types/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "event_types",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "event_types",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/event_types/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "event_types",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "event_types",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/event_types/{event_type_name}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "event_types",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "event_types",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["event_type_name"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "event_type_name",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/event_types/{event_type_name}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "event_types",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "event_types",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["event_type_name"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "event_type_name",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["events_management"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>(),
                    ["name"] = "events_management",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/payload_content_types/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "payload_content_types",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "payload_content_types",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["health"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "database",
                            ["title"] = "Database",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "database_duration_ms",
                            ["title"] = "Database Duration Ms",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int64",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "object_storage",
                            ["title"] = "Object Storage",
                            ["type"] = "`$BOOLEAN`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "object_storage_duration_ms",
                            ["title"] = "Object Storage Duration Ms",
                            ["type"] = "`$INTEGER`",
                            ["format"] = "int64",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "pulsar",
                            ["title"] = "Pulsar",
                            ["type"] = "`$BOOLEAN`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "pulsar_duration_ms",
                            ["title"] = "Pulsar Duration Ms",
                            ["type"] = "`$INTEGER`",
                            ["format"] = "int64",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "total_duration_ms",
                            ["title"] = "Total Duration Ms",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int64",
                        },
                    },
                    ["name"] = "health",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/health/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "health",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "health",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "key",
                                                ["orig"] = "key",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["hook0"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "default",
                            ["title"] = "Default",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "description",
                            ["title"] = "Description",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "env_var",
                            ["title"] = "Env Var",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "group",
                            ["title"] = "Group",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "name",
                            ["title"] = "Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "required",
                            ["title"] = "Required",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "sensitive",
                            ["title"] = "Sensitive",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "hook0",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/environment_variables/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "environment_variables",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "environment_variables",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["ingested_event"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "UUID of the application this event belongs to.",
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_id",
                            ["title"] = "Event Id",
                            ["type"] = "`$STRING`",
                            ["short"] = "Optional unique identifier for this event (client-generated UUID).",
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_type",
                            ["title"] = "Event Type",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "The type of event (e.g., 'user.created', 'order.completed').",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "labels",
                            ["title"] = "Labels",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["short"] = "Labels for event filtering and routing to subscriptions.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "metadata",
                            ["title"] = "Metadata",
                            ["type"] = "`$OBJECT`",
                            ["short"] = "Optional metadata key-value pairs associated with the event.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "occurred_at",
                            ["title"] = "Occurred At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Timestamp when the event occurred.",
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "payload",
                            ["title"] = "Payload",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "The event payload.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "payload_content_type",
                            ["title"] = "Payload Content Type",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["short"] = "Content type of the payload.",
                        },
                    },
                    ["name"] = "ingested_event",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/event/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "event",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "event",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["instance"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_secret_compatibility",
                            ["title"] = "Application Secret Compatibility",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "auto_db_migration",
                            ["title"] = "Auto Db Migration",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "biscuit_public_key",
                            ["title"] = "Biscuit Public Key",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "cloudflare_turnstile_site_key",
                            ["title"] = "Cloudflare Turnstile Site Key",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "formbricks",
                            ["title"] = "Formbricks",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "matomo",
                            ["title"] = "Matomo",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "password_minimum_length",
                            ["title"] = "Password Minimum Length",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "quota_enforcement",
                            ["title"] = "Quota Enforcement",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "registration_disabled",
                            ["title"] = "Registration Disabled",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "support_email_address",
                            ["title"] = "Support Email Address",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "instance",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/instance/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "instance",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "instance",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["login"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "email",
                            ["title"] = "Email",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "password",
                            ["title"] = "Password",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "token",
                            ["title"] = "Token",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "login",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/login",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "login",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "login",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/refresh",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "refresh",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "refresh",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/verify-email",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "verify-email",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "verify-email",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["organization"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "amount",
                            ["title"] = "Amount",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_name",
                            ["title"] = "Application Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "consumption",
                            ["title"] = "Consumption",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "date",
                            ["title"] = "Date",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "is_provisional",
                            ["title"] = "Is Provisional",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "name",
                            ["title"] = "Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "onboarding_steps",
                            ["title"] = "Onboarding Steps",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "organization_id",
                            ["title"] = "Organization Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "plan",
                            ["title"] = "Plan",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "quotas",
                            ["title"] = "Quotas",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "role",
                            ["title"] = "Role",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "users",
                            ["title"] = "Users",
                            ["type"] = "`$ARRAY`",
                            ["req"] = true,
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "organization",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/organizations/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/events_per_day/organization",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "events_per_day",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organization",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "events_per_day",
                                        "organization",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "from",
                                                ["orig"] = "from",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "to",
                                                ["orig"] = "to",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/organizations/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["organization_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["organization_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["organization_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["organization_edit_role"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "role",
                            ["title"] = "Role",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "user_id",
                            ["title"] = "User Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "organization_edit_role",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "invite",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{id}",
                                        "invite",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["organization_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["$action"] = "invite",
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["quota"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "enabled",
                            ["title"] = "Enabled",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "limits",
                            ["title"] = "Limits",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "quota",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/quotas/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "quotas",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "quotas",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["registration"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "email",
                            ["title"] = "Email",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "first_name",
                            ["title"] = "First Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "gclid",
                            ["title"] = "Gclid",
                            ["type"] = "`$STRING`",
                            ["short"] = "Optional Google Ads click identifier captured during the user's journey from a Google Ad.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "last_name",
                            ["title"] = "Last Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "password",
                            ["title"] = "Password",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "signup_channel",
                            ["title"] = "Signup Channel",
                            ["type"] = "`$STRING`",
                            ["short"] = "Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "turnstile_token",
                            ["title"] = "Turnstile Token",
                            ["type"] = "`$STRING`",
                        },
                    },
                    ["name"] = "registration",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/register/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "register",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "register",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["request_attempt"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "created_at",
                            ["title"] = "Created At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "delay_until",
                            ["title"] = "Delay Until",
                            ["type"] = "`$STRING`",
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event",
                            ["title"] = "Event",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_id",
                            ["title"] = "Event Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "failed_at",
                            ["title"] = "Failed At",
                            ["type"] = "`$STRING`",
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "http_response_status",
                            ["title"] = "Http Response Status",
                            ["type"] = "`$INTEGER`",
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "picked_at",
                            ["title"] = "Picked At",
                            ["type"] = "`$STRING`",
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "request_attempt_id",
                            ["title"] = "Request Attempt Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "response_id",
                            ["title"] = "Response Id",
                            ["type"] = "`$STRING`",
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "retry_count",
                            ["title"] = "Retry Count",
                            ["type"] = "`$INTEGER`",
                            ["req"] = true,
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "status",
                            ["title"] = "Status",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["short"] = "Status of a request attempt.",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "subscription",
                            ["title"] = "Subscription",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "succeeded_at",
                            ["title"] = "Succeeded At",
                            ["type"] = "`$STRING`",
                            ["format"] = "date-time",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "request_attempt",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/request_attempts/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "request_attempts",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "request_attempts",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "event_event_type_name",
                                                ["orig"] = "event.event_type_names",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "event_id",
                                                ["orig"] = "event_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["field"] = true,
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "max_created_at",
                                                ["orig"] = "max_created_at",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "min_created_at",
                                                ["orig"] = "min_created_at",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "pagination_cursor",
                                                ["orig"] = "pagination_cursor",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "subscription_id",
                                                ["orig"] = "subscription_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/request_attempts/{request_attempt_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "request_attempts",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "request_attempts",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["request_attempt_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "request_attempt_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["response"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "body",
                            ["title"] = "Body",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "elapsed_time_ms",
                            ["title"] = "Elapsed Time Ms",
                            ["type"] = "`$INTEGER`",
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "headers",
                            ["title"] = "Headers",
                            ["type"] = "`$OBJECT`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "http_code",
                            ["title"] = "Http Code",
                            ["type"] = "`$INTEGER`",
                            ["format"] = "int32",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "response_error_name",
                            ["title"] = "Response Error Name",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "response_id",
                            ["title"] = "Response Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "response",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/responses/{response_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "responses",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "responses",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["response_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "response_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["revoke"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>(),
                    ["name"] = "revoke",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "organization_id",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "invite",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{organization_id}",
                                        "invite",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>
                        {
                            new List<object?>
                            {
                                "$.main.kit.entity.organization",
                            },
                        },
                    },
                },
                ["service_token"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "biscuit",
                            ["title"] = "Biscuit",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "created_at",
                            ["title"] = "Created At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "name",
                            ["title"] = "Name",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "organization_id",
                            ["title"] = "Organization Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "token_id",
                            ["title"] = "Token Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "service_token",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/service_token/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "service_token",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "service_token",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/service_token/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "service_token",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "service_token",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/service_token/{service_token_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "service_token",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "service_token",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["service_token_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "service_token_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/service_token/{service_token_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "service_token",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "service_token",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["service_token_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "service_token_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                            "organization_id",
                                        },
                                    },
                                },
                            },
                        },
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/service_token/{service_token_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "service_token",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "service_token",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["service_token_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "service_token_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["subscription"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "application_id",
                            ["title"] = "Application Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "created_at",
                            ["title"] = "Created At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "dedicated_workers",
                            ["title"] = "Dedicated Workers",
                            ["type"] = "`$ARRAY`",
                            ["req"] = true,
                            ["op"] = new Dictionary<string, object?>
                            {
                                ["create"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$ARRAY`",
                                },
                                ["update"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$ARRAY`",
                                },
                            },
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "description",
                            ["title"] = "Description",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "event_types",
                            ["title"] = "Event Types",
                            ["type"] = "`$ARRAY`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "id",
                            ["title"] = "Id",
                            ["type"] = "`$STRING`",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "is_enabled",
                            ["title"] = "Is Enabled",
                            ["type"] = "`$BOOLEAN`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "label_key",
                            ["title"] = "Label Key",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["op"] = new Dictionary<string, object?>
                            {
                                ["create"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$STRING`",
                                },
                                ["update"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$STRING`",
                                },
                            },
                            ["short"] = "_Kept for backward compatibility, you should use `labels`_",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "label_value",
                            ["title"] = "Label Value",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["op"] = new Dictionary<string, object?>
                            {
                                ["create"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$STRING`",
                                },
                                ["update"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$STRING`",
                                },
                            },
                            ["short"] = "_Kept for backward compatibility, you should use `labels`_",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "labels",
                            ["title"] = "Labels",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["op"] = new Dictionary<string, object?>
                            {
                                ["create"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$OBJECT`",
                                },
                                ["update"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$OBJECT`",
                                },
                            },
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "metadata",
                            ["title"] = "Metadata",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                            ["op"] = new Dictionary<string, object?>
                            {
                                ["create"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$OBJECT`",
                                },
                                ["update"] = new Dictionary<string, object?>
                                {
                                    ["type"] = "`$OBJECT`",
                                },
                            },
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "secret",
                            ["title"] = "Secret",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "subscription_id",
                            ["title"] = "Subscription Id",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "uuid",
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "target",
                            ["title"] = "Target",
                            ["type"] = "`$OBJECT`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "updated_at",
                            ["title"] = "Updated At",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                            ["format"] = "date-time",
                        },
                    },
                    ["id"] = new Dictionary<string, object?>
                    {
                        ["field"] = "id",
                        ["name"] = "id",
                    },
                    ["name"] = "subscription",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/subscriptions/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "subscriptions",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "subscriptions",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["list"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "list",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/subscriptions/",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "subscriptions",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "subscriptions",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["load"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "load",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "GET",
                                    ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "subscriptions",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "subscriptions",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["subscription_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "subscription_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                        ["remove"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "remove",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "DELETE",
                                    ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "subscriptions",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "subscriptions",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["subscription_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "subscription_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                        ["query"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "application_id",
                                                ["orig"] = "application_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "query",
                                                ["reqd"] = true,
                                                ["field"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "application_id",
                                            "id",
                                        },
                                    },
                                },
                            },
                        },
                        ["update"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "update",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "PUT",
                                    ["orig"] = "/api/v1/subscriptions/{subscription_id}",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "subscriptions",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "id",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "subscriptions",
                                        "{id}",
                                    },
                                    ["rename"] = new Dictionary<string, object?>
                                    {
                                        ["param"] = new Dictionary<string, object?>
                                        {
                                            ["subscription_id"] = "id",
                                        },
                                    },
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "id",
                                                ["orig"] = "subscription_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["user_authentication"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "current_password",
                            ["title"] = "Current Password",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "email",
                            ["title"] = "Email",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "new_password",
                            ["title"] = "New Password",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "token",
                            ["title"] = "Token",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "user_authentication",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/begin-reset-password",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "begin-reset-password",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "begin-reset-password",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/logout",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "logout",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "logout",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/password",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "password",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "password",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/resend-verification-email",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "resend-verification-email",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "resend-verification-email",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                },
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/auth/reset-password",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "auth",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "reset-password",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "auth",
                                        "reset-password",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>(),
                                    ["select"] = new Dictionary<string, object?>(),
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>(),
                    },
                },
                ["user_invitation"] = new Dictionary<string, object?>
                {
                    ["fields"] = new List<object?>
                    {
                        new Dictionary<string, object?>
                        {
                            ["name"] = "email",
                            ["title"] = "Email",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                        new Dictionary<string, object?>
                        {
                            ["name"] = "role",
                            ["title"] = "Role",
                            ["type"] = "`$STRING`",
                            ["req"] = true,
                        },
                    },
                    ["name"] = "user_invitation",
                    ["op"] = new Dictionary<string, object?>
                    {
                        ["create"] = new Dictionary<string, object?>
                        {
                            ["input"] = "data",
                            ["name"] = "create",
                            ["points"] = new List<object?>
                            {
                                new Dictionary<string, object?>
                                {
                                    ["kind"] = "http",
                                    ["method"] = "POST",
                                    ["orig"] = "/api/v1/organizations/{organization_id}/invite",
                                    ["segments"] = new List<object?>
                                    {
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "api",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "v1",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "organizations",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["var"] = "organization_id",
                                        },
                                        new Dictionary<string, object?>
                                        {
                                            ["lit"] = "invite",
                                        },
                                    },
                                    ["parts"] = new List<object?>
                                    {
                                        "api",
                                        "v1",
                                        "organizations",
                                        "{organization_id}",
                                        "invite",
                                    },
                                    ["rename"] = new Dictionary<string, object?>(),
                                    ["transform"] = new Dictionary<string, object?>
                                    {
                                        ["req"] = "`reqdata`",
                                        ["res"] = "`body`",
                                    },
                                    ["args"] = new Dictionary<string, object?>
                                    {
                                        ["params"] = new List<object?>
                                        {
                                            new Dictionary<string, object?>
                                            {
                                                ["name"] = "organization_id",
                                                ["orig"] = "organization_id",
                                                ["type"] = "`$STRING`",
                                                ["kind"] = "param",
                                                ["reqd"] = true,
                                            },
                                        },
                                    },
                                    ["select"] = new Dictionary<string, object?>
                                    {
                                        ["exist"] = new List<object?>
                                        {
                                            "organization_id",
                                        },
                                    },
                                    ["response"] = new Dictionary<string, object?>
                                    {
                                        ["kind"] = "json",
                                        ["media"] = "application/json",
                                    },
                                },
                            },
                        },
                    },
                    ["relations"] = new Dictionary<string, object?>
                    {
                        ["ancestors"] = new List<object?>
                        {
                            new List<object?>
                            {
                                "$.main.kit.entity.organization",
                            },
                        },
                    },
                },
            },
        };
    }

    private static readonly Lazy<Dictionary<string, object?>> SharedConfigVal =
        new(MakeConfig);

    // The process-wide config, built once on first use.
    //
    // The returned dictionary is SHARED: treat it as read-only. Callers that
    // need to mutate should use MakeConfig, which always returns a fresh copy.
    public static Dictionary<string, object?> SharedConfig()
    {
        return SharedConfigVal.Value;
    }

    public static List<object?> FeaturePlugins(string name)
    {
        switch (name)
        {
            default:
                return new List<object?>();
        }
    }

    public static Feature.BaseFeature MakeFeature(string name)
    {
        switch (name)
        {
            case "debug":
                return new Feature.DebugFeature();
            case "idempotency":
                return new Feature.IdempotencyFeature();
            case "metrics":
                return new Feature.MetricsFeature();
            case "paging":
                return new Feature.PagingFeature();
            case "ratelimit":
                return new Feature.RatelimitFeature();
            case "retry":
                return new Feature.RetryFeature();
            case "secrets":
                return new Feature.SecretsFeature();
            case "test":
                return new Feature.TestFeature();
            case "timeout":
                return new Feature.TimeoutFeature();
            default:
                return new Feature.BaseFeature();
        }
    }
}
