// Generated API configuration (mirrors go core/config.go).

use std::cell::RefCell;
use std::rc::Rc;

use crate::core::types::FeatureRef;
use crate::utility::voxgigstruct::Value;

pub fn make_config() -> Value {
    Value::map_of([
        ("main".to_string(), Value::map_of([
            ("name".to_string(), Value::str("Hook0")),
            ("slug".to_string(), Value::str("hook0")),
            ("version".to_string(), Value::str("0.1.1")),
            ("target".to_string(), Value::str("rust")),
        ])),
        ("feature".to_string(), Value::map_of([
            ("debug".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("max".to_string(), Value::Num(100f64)),
                    ("redact".to_string(), Value::list(vec![
                        Value::str("authorization"),
                        Value::str("cookie"),
                        Value::str("set-cookie"),
                        Value::str("api-key"),
                        Value::str("apikey"),
                        Value::str("x-api-key"),
                        Value::str("idempotency-key"),
                    ])),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("now".to_string(), Value::str("`$FUNCTION`")),
                    ("onEntry".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("none")),
            ])),
            ("idempotency".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("header".to_string(), Value::str("Idempotency-Key")),
                    ("methods".to_string(), Value::list(vec![
                        Value::str("POST"),
                        Value::str("PUT"),
                        Value::str("PATCH"),
                        Value::str("DELETE"),
                    ])),
                    ("ops".to_string(), Value::list(vec![
                        Value::str("create"),
                        Value::str("update"),
                        Value::str("remove"),
                    ])),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("keygen".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("none")),
            ])),
            ("metrics".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("now".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("none")),
            ])),
            ("paging".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("afterVar".to_string(), Value::str("after")),
                    ("cursorParam".to_string(), Value::str("cursor")),
                    ("firstVar".to_string(), Value::str("first")),
                    ("limitParam".to_string(), Value::str("limit")),
                    ("pageParam".to_string(), Value::str("page")),
                    ("startPage".to_string(), Value::Num(1f64)),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("limit".to_string(), Value::str("`$NUMBER`")),
                    ("ops".to_string(), Value::str("`$LIST`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("none")),
            ])),
            ("ratelimit".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("burst".to_string(), Value::Num(5f64)),
                    ("rate".to_string(), Value::Num(5f64)),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("now".to_string(), Value::str("`$FUNCTION`")),
                    ("sleep".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("wrap")),
            ])),
            ("retry".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("factor".to_string(), Value::Num(2f64)),
                    ("maxDelay".to_string(), Value::Num(2000f64)),
                    ("minDelay".to_string(), Value::Num(50f64)),
                    ("retries".to_string(), Value::Num(2f64)),
                    ("statuses".to_string(), Value::list(vec![
                        Value::Num(408f64),
                        Value::Num(425f64),
                        Value::Num(429f64),
                        Value::Num(500f64),
                        Value::Num(502f64),
                        Value::Num(503f64),
                        Value::Num(504f64),
                    ])),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("jitter".to_string(), Value::str("`$BOOLEAN`")),
                    ("sleep".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("wrap")),
            ])),
            ("secrets".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("cache".to_string(), Value::Bool(true)),
                    ("exchange".to_string(), Value::map_of([
                        ("active".to_string(), Value::Bool(false)),
                        ("method".to_string(), Value::str("POST")),
                        ("path".to_string(), Value::str("auth/token")),
                        ("refresh".to_string(), Value::str("")),
                        ("request".to_string(), Value::str("refresh_token")),
                        ("response".to_string(), Value::str("access_token")),
                        ("retries".to_string(), Value::Num(1f64)),
                        ("statuses".to_string(), Value::list(vec![
                            Value::Num(401f64),
                        ])),
                    ])),
                    ("name".to_string(), Value::str("apikey")),
                    ("providers".to_string(), Value::empty_list()),
                ])),
                ("optspec".to_string(), Value::empty_map()),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("wrap")),
            ])),
            ("test".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("entity".to_string(), Value::str("`$MAP`")),
                    ("net".to_string(), Value::str("`$MAP`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("base")),
            ])),
            ("timeout".to_string(), Value::map_of([
                ("options".to_string(), Value::map_of([
                    ("active".to_string(), Value::Bool(false)),
                    ("ms".to_string(), Value::Num(30000f64)),
                ])),
                ("optspec".to_string(), Value::map_of([
                    ("clearTimer".to_string(), Value::str("`$FUNCTION`")),
                    ("now".to_string(), Value::str("`$FUNCTION`")),
                    ("setTimer".to_string(), Value::str("`$FUNCTION`")),
                ])),
                ("strict".to_string(), Value::Bool(false)),
                ("transport".to_string(), Value::str("wrap")),
            ])),
        ])),
        ("options".to_string(), Value::map_of([
            ("base".to_string(), Value::str("https://app.hook0.com")),
            ("auth".to_string(), Value::map_of([
                ("prefix".to_string(), Value::str("Bearer")),
            ])),
            ("headers".to_string(), Value::map_of([
                ("content-type".to_string(), Value::str("application/json")),
            ])),
            ("entity".to_string(), Value::map_of([
                ("application".to_string(), Value::empty_map()),
                ("application_secret".to_string(), Value::empty_map()),
                ("email_preference".to_string(), Value::empty_map()),
                ("error".to_string(), Value::empty_map()),
                ("event".to_string(), Value::empty_map()),
                ("event_type".to_string(), Value::empty_map()),
                ("events_management".to_string(), Value::empty_map()),
                ("health".to_string(), Value::empty_map()),
                ("hook0".to_string(), Value::empty_map()),
                ("ingested_event".to_string(), Value::empty_map()),
                ("instance".to_string(), Value::empty_map()),
                ("login".to_string(), Value::empty_map()),
                ("organization".to_string(), Value::empty_map()),
                ("organization_edit_role".to_string(), Value::empty_map()),
                ("quota".to_string(), Value::empty_map()),
                ("registration".to_string(), Value::empty_map()),
                ("request_attempt".to_string(), Value::empty_map()),
                ("response".to_string(), Value::empty_map()),
                ("revoke".to_string(), Value::empty_map()),
                ("service_token".to_string(), Value::empty_map()),
                ("subscription".to_string(), Value::empty_map()),
                ("user_authentication".to_string(), Value::empty_map()),
                ("user_invitation".to_string(), Value::empty_map()),
            ])),
        ])),
        ("entity".to_string(), Value::map_of([
            ("application".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("amount")),
                        ("title".to_string(), Value::str("Amount")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Unique identifier of the application.")),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("application_name")),
                        ("title".to_string(), Value::str("Application Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("consumption")),
                        ("title".to_string(), Value::str("Consumption")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Current consumption metrics for this application.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("date")),
                        ("title".to_string(), Value::str("Date")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("is_provisional")),
                        ("title".to_string(), Value::str("Is Provisional")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("name")),
                        ("title".to_string(), Value::str("Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Name of the application.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("onboarding_steps")),
                        ("title".to_string(), Value::str("Onboarding Steps")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Onboarding completion status for this application.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("organization_id")),
                        ("title".to_string(), Value::str("Organization Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("UUID of the organization this application belongs to.")),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("quotas")),
                        ("title".to_string(), Value::str("Quotas")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Quota limits for this application.")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("application")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/applications/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("applications")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("applications"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/events_per_day/application")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("events_per_day")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("application")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("events_per_day"),
                                    Value::str("application"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("from")),
                                            ("orig".to_string(), Value::str("from")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("to")),
                                            ("orig".to_string(), Value::str("to")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/applications/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("applications")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("applications"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/applications/{application_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("applications")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("applications"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("application_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/applications/{application_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("applications")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("applications"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("application_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/applications/{application_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("applications")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("applications"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("application_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("application_secret".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("created_at")),
                        ("title".to_string(), Value::str("Created At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("deleted_at")),
                        ("title".to_string(), Value::str("Deleted At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("name")),
                        ("title".to_string(), Value::str("Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("token")),
                        ("title".to_string(), Value::str("Token")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("application_secret")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/application_secrets/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("application_secrets")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("application_secrets"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/application_secrets/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("application_secrets")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("application_secrets"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/application_secrets/{application_secret_token}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("application_secrets")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("application_secrets"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("application_secret_token".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("application_secret_token")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/application_secrets/{application_secret_token}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("application_secrets")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("application_secrets"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("application_secret_token".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("application_secret_token")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("email_preference".to_string(), Value::map_of([
                ("fields".to_string(), Value::empty_list()),
                ("name".to_string(), Value::str("email_preference")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/email-preferences/unsubscribe-reactivation")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("email-preferences")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("unsubscribe-reactivation")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("email-preferences"),
                                    Value::str("unsubscribe-reactivation"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::map_of([
                                    ("$action".to_string(), Value::str("unsubscribe_reactivation")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("error".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("detail")),
                        ("title".to_string(), Value::str("Detail")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Identifier of the problem that occurred, stable across releases")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("status")),
                        ("title".to_string(), Value::str("Status")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("title")),
                        ("title".to_string(), Value::str("Title")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("type")),
                        ("title".to_string(), Value::str("Type")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Documentation page of this problem, which is also what distinguishes one problem type from another as RFC 7807 asks.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("validation")),
                        ("title".to_string(), Value::str("Validation")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("short".to_string(), Value::str("Which submitted values were rejected and why, keyed by the name of the field they were submitted under.")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("error")),
                ("op".to_string(), Value::map_of([
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/errors/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("errors")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("errors"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("event".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("event_id")),
                        ("title".to_string(), Value::str("Event Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_type_name")),
                        ("title".to_string(), Value::str("Event Type Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("ip")),
                        ("title".to_string(), Value::str("Ip")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("labels")),
                        ("title".to_string(), Value::str("Labels")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("metadata")),
                        ("title".to_string(), Value::str("Metadata")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("occurred_at")),
                        ("title".to_string(), Value::str("Occurred At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("payload")),
                        ("title".to_string(), Value::str("Payload")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("payload_content_type")),
                        ("title".to_string(), Value::str("Payload Content Type")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("received_at")),
                        ("title".to_string(), Value::str("Received At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("event")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/events/{event_id}/replay")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("events")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("replay")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("events"),
                                    Value::str("{id}"),
                                    Value::str("replay"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("event_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("event_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("$action".to_string(), Value::str("replay")),
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/events/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("events")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("events"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/events/{event_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("events")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("events"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("event_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("event_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("event_type".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_type_name")),
                        ("title".to_string(), Value::str("Event Type Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("resource_type")),
                        ("title".to_string(), Value::str("Resource Type")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("resource_type_name")),
                        ("title".to_string(), Value::str("Resource Type Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("service")),
                        ("title".to_string(), Value::str("Service")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("service_name")),
                        ("title".to_string(), Value::str("Service Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("verb")),
                        ("title".to_string(), Value::str("Verb")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("verb_name")),
                        ("title".to_string(), Value::str("Verb Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("event_type")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/event_types/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("event_types")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("event_types"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/event_types/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("event_types")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("event_types"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/event_types/{event_type_name}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("event_types")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("event_types"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("event_type_name".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("event_type_name")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/event_types/{event_type_name}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("event_types")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("event_types"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("event_type_name".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("event_type_name")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("events_management".to_string(), Value::map_of([
                ("fields".to_string(), Value::empty_list()),
                ("name".to_string(), Value::str("events_management")),
                ("op".to_string(), Value::map_of([
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/payload_content_types/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("payload_content_types")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("payload_content_types"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("health".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("database")),
                        ("title".to_string(), Value::str("Database")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("database_duration_ms")),
                        ("title".to_string(), Value::str("Database Duration Ms")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int64")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("object_storage")),
                        ("title".to_string(), Value::str("Object Storage")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("object_storage_duration_ms")),
                        ("title".to_string(), Value::str("Object Storage Duration Ms")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("format".to_string(), Value::str("int64")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("pulsar")),
                        ("title".to_string(), Value::str("Pulsar")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("pulsar_duration_ms")),
                        ("title".to_string(), Value::str("Pulsar Duration Ms")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("format".to_string(), Value::str("int64")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("total_duration_ms")),
                        ("title".to_string(), Value::str("Total Duration Ms")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int64")),
                    ]),
                ])),
                ("name".to_string(), Value::str("health")),
                ("op".to_string(), Value::map_of([
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/health/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("health")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("health"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("key")),
                                            ("orig".to_string(), Value::str("key")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("hook0".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("default")),
                        ("title".to_string(), Value::str("Default")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("description")),
                        ("title".to_string(), Value::str("Description")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("env_var")),
                        ("title".to_string(), Value::str("Env Var")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("group")),
                        ("title".to_string(), Value::str("Group")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("name")),
                        ("title".to_string(), Value::str("Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("required")),
                        ("title".to_string(), Value::str("Required")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("sensitive")),
                        ("title".to_string(), Value::str("Sensitive")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("hook0")),
                ("op".to_string(), Value::map_of([
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/environment_variables/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("environment_variables")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("environment_variables"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("ingested_event".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("UUID of the application this event belongs to.")),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_id")),
                        ("title".to_string(), Value::str("Event Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("short".to_string(), Value::str("Optional unique identifier for this event (client-generated UUID).")),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_type")),
                        ("title".to_string(), Value::str("Event Type")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("The type of event (e.g., 'user.created', 'order.completed').")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("labels")),
                        ("title".to_string(), Value::str("Labels")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Labels for event filtering and routing to subscriptions.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("metadata")),
                        ("title".to_string(), Value::str("Metadata")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("short".to_string(), Value::str("Optional metadata key-value pairs associated with the event.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("occurred_at")),
                        ("title".to_string(), Value::str("Occurred At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Timestamp when the event occurred.")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("payload")),
                        ("title".to_string(), Value::str("Payload")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("The event payload.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("payload_content_type")),
                        ("title".to_string(), Value::str("Payload Content Type")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Content type of the payload.")),
                    ]),
                ])),
                ("name".to_string(), Value::str("ingested_event")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/event/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("event")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("event"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("instance".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("application_secret_compatibility")),
                        ("title".to_string(), Value::str("Application Secret Compatibility")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("auto_db_migration")),
                        ("title".to_string(), Value::str("Auto Db Migration")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("biscuit_public_key")),
                        ("title".to_string(), Value::str("Biscuit Public Key")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("cloudflare_turnstile_site_key")),
                        ("title".to_string(), Value::str("Cloudflare Turnstile Site Key")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("formbricks")),
                        ("title".to_string(), Value::str("Formbricks")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("matomo")),
                        ("title".to_string(), Value::str("Matomo")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("password_minimum_length")),
                        ("title".to_string(), Value::str("Password Minimum Length")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("quota_enforcement")),
                        ("title".to_string(), Value::str("Quota Enforcement")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("registration_disabled")),
                        ("title".to_string(), Value::str("Registration Disabled")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("support_email_address")),
                        ("title".to_string(), Value::str("Support Email Address")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("instance")),
                ("op".to_string(), Value::map_of([
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/instance/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("instance")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("instance"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("login".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("email")),
                        ("title".to_string(), Value::str("Email")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("password")),
                        ("title".to_string(), Value::str("Password")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("token")),
                        ("title".to_string(), Value::str("Token")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("login")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/login")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("login")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("login"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/refresh")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("refresh")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("refresh"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/verify-email")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("verify-email")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("verify-email"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("organization".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("amount")),
                        ("title".to_string(), Value::str("Amount")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("application_name")),
                        ("title".to_string(), Value::str("Application Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("consumption")),
                        ("title".to_string(), Value::str("Consumption")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("date")),
                        ("title".to_string(), Value::str("Date")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("is_provisional")),
                        ("title".to_string(), Value::str("Is Provisional")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("name")),
                        ("title".to_string(), Value::str("Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("onboarding_steps")),
                        ("title".to_string(), Value::str("Onboarding Steps")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("organization_id")),
                        ("title".to_string(), Value::str("Organization Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("plan")),
                        ("title".to_string(), Value::str("Plan")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("quotas")),
                        ("title".to_string(), Value::str("Quotas")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("role")),
                        ("title".to_string(), Value::str("Role")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("users")),
                        ("title".to_string(), Value::str("Users")),
                        ("type".to_string(), Value::str("`$ARRAY`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("organization")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/events_per_day/organization")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("events_per_day")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organization")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("events_per_day"),
                                    Value::str("organization"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("from")),
                                            ("orig".to_string(), Value::str("from")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("to")),
                                            ("orig".to_string(), Value::str("to")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("organization_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("organization_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("organization_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("organization_edit_role".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("role")),
                        ("title".to_string(), Value::str("Role")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("user_id")),
                        ("title".to_string(), Value::str("User Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("organization_edit_role")),
                ("op".to_string(), Value::map_of([
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/invite")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("invite")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{id}"),
                                    Value::str("invite"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("organization_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("$action".to_string(), Value::str("invite")),
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("quota".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("enabled")),
                        ("title".to_string(), Value::str("Enabled")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("limits")),
                        ("title".to_string(), Value::str("Limits")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("quota")),
                ("op".to_string(), Value::map_of([
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/quotas/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("quotas")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("quotas"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("registration".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("email")),
                        ("title".to_string(), Value::str("Email")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("first_name")),
                        ("title".to_string(), Value::str("First Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("gclid")),
                        ("title".to_string(), Value::str("Gclid")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("short".to_string(), Value::str("Optional Google Ads click identifier captured during the user's journey from a Google Ad.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("last_name")),
                        ("title".to_string(), Value::str("Last Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("password")),
                        ("title".to_string(), Value::str("Password")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("signup_channel")),
                        ("title".to_string(), Value::str("Signup Channel")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("short".to_string(), Value::str("Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("turnstile_token")),
                        ("title".to_string(), Value::str("Turnstile Token")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                ])),
                ("name".to_string(), Value::str("registration")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/register/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("register")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("register"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("request_attempt".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("created_at")),
                        ("title".to_string(), Value::str("Created At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("delay_until")),
                        ("title".to_string(), Value::str("Delay Until")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event")),
                        ("title".to_string(), Value::str("Event")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_id")),
                        ("title".to_string(), Value::str("Event Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("failed_at")),
                        ("title".to_string(), Value::str("Failed At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("http_response_status")),
                        ("title".to_string(), Value::str("Http Response Status")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("picked_at")),
                        ("title".to_string(), Value::str("Picked At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("request_attempt_id")),
                        ("title".to_string(), Value::str("Request Attempt Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("response_id")),
                        ("title".to_string(), Value::str("Response Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("retry_count")),
                        ("title".to_string(), Value::str("Retry Count")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("status")),
                        ("title".to_string(), Value::str("Status")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("short".to_string(), Value::str("Status of a request attempt.")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("subscription")),
                        ("title".to_string(), Value::str("Subscription")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("succeeded_at")),
                        ("title".to_string(), Value::str("Succeeded At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("request_attempt")),
                ("op".to_string(), Value::map_of([
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/request_attempts/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("request_attempts")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("request_attempts"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("event_event_type_name")),
                                            ("orig".to_string(), Value::str("event.event_type_names")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("event_id")),
                                            ("orig".to_string(), Value::str("event_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("max_created_at")),
                                            ("orig".to_string(), Value::str("max_created_at")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("min_created_at")),
                                            ("orig".to_string(), Value::str("min_created_at")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("pagination_cursor")),
                                            ("orig".to_string(), Value::str("pagination_cursor")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                        Value::map_of([
                                            ("name".to_string(), Value::str("subscription_id")),
                                            ("orig".to_string(), Value::str("subscription_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/request_attempts/{request_attempt_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("request_attempts")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("request_attempts"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("request_attempt_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("request_attempt_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("response".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("body")),
                        ("title".to_string(), Value::str("Body")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("elapsed_time_ms")),
                        ("title".to_string(), Value::str("Elapsed Time Ms")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("headers")),
                        ("title".to_string(), Value::str("Headers")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("http_code")),
                        ("title".to_string(), Value::str("Http Code")),
                        ("type".to_string(), Value::str("`$INTEGER`")),
                        ("format".to_string(), Value::str("int32")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("response_error_name")),
                        ("title".to_string(), Value::str("Response Error Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("response_id")),
                        ("title".to_string(), Value::str("Response Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("response")),
                ("op".to_string(), Value::map_of([
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/responses/{response_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("responses")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("responses"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("response_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("response_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("revoke".to_string(), Value::map_of([
                ("fields".to_string(), Value::empty_list()),
                ("name".to_string(), Value::str("revoke")),
                ("op".to_string(), Value::map_of([
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/invite")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("organization_id")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("invite")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{organization_id}"),
                                    Value::str("invite"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::list(vec![
                        Value::list(vec![
                            Value::str("$.main.kit.entity.organization"),
                        ]),
                    ])),
                ])),
            ])),
            ("service_token".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("biscuit")),
                        ("title".to_string(), Value::str("Biscuit")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("created_at")),
                        ("title".to_string(), Value::str("Created At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("name")),
                        ("title".to_string(), Value::str("Name")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("organization_id")),
                        ("title".to_string(), Value::str("Organization Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("token_id")),
                        ("title".to_string(), Value::str("Token Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("service_token")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/service_token/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("service_token")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("service_token"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/service_token/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("service_token")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("service_token"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/service_token/{service_token_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("service_token")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("service_token"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("service_token_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("service_token_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/service_token/{service_token_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("service_token")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("service_token"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("service_token_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("service_token_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/service_token/{service_token_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("service_token")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("service_token"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("service_token_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("service_token_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("subscription".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("application_id")),
                        ("title".to_string(), Value::str("Application Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("created_at")),
                        ("title".to_string(), Value::str("Created At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("dedicated_workers")),
                        ("title".to_string(), Value::str("Dedicated Workers")),
                        ("type".to_string(), Value::str("`$ARRAY`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("op".to_string(), Value::map_of([
                            ("create".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$ARRAY`")),
                            ])),
                            ("update".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$ARRAY`")),
                            ])),
                        ])),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("description")),
                        ("title".to_string(), Value::str("Description")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("event_types")),
                        ("title".to_string(), Value::str("Event Types")),
                        ("type".to_string(), Value::str("`$ARRAY`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("id")),
                        ("title".to_string(), Value::str("Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("is_enabled")),
                        ("title".to_string(), Value::str("Is Enabled")),
                        ("type".to_string(), Value::str("`$BOOLEAN`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("label_key")),
                        ("title".to_string(), Value::str("Label Key")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("op".to_string(), Value::map_of([
                            ("create".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$STRING`")),
                            ])),
                            ("update".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$STRING`")),
                            ])),
                        ])),
                        ("short".to_string(), Value::str("_Kept for backward compatibility, you should use `labels`_")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("label_value")),
                        ("title".to_string(), Value::str("Label Value")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("op".to_string(), Value::map_of([
                            ("create".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$STRING`")),
                            ])),
                            ("update".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$STRING`")),
                            ])),
                        ])),
                        ("short".to_string(), Value::str("_Kept for backward compatibility, you should use `labels`_")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("labels")),
                        ("title".to_string(), Value::str("Labels")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("op".to_string(), Value::map_of([
                            ("create".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$OBJECT`")),
                            ])),
                            ("update".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$OBJECT`")),
                            ])),
                        ])),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("metadata")),
                        ("title".to_string(), Value::str("Metadata")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("op".to_string(), Value::map_of([
                            ("create".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$OBJECT`")),
                            ])),
                            ("update".to_string(), Value::map_of([
                                ("type".to_string(), Value::str("`$OBJECT`")),
                            ])),
                        ])),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("secret")),
                        ("title".to_string(), Value::str("Secret")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("subscription_id")),
                        ("title".to_string(), Value::str("Subscription Id")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("uuid")),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("target")),
                        ("title".to_string(), Value::str("Target")),
                        ("type".to_string(), Value::str("`$OBJECT`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("updated_at")),
                        ("title".to_string(), Value::str("Updated At")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                        ("format".to_string(), Value::str("date-time")),
                    ]),
                ])),
                ("id".to_string(), Value::map_of([
                    ("field".to_string(), Value::str("id")),
                    ("name".to_string(), Value::str("id")),
                ])),
                ("name".to_string(), Value::str("subscription")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/subscriptions/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("subscriptions")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("subscriptions"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("list".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("list")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/subscriptions/")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("subscriptions")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("subscriptions"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("load".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("load")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("GET")),
                                ("orig".to_string(), Value::str("/api/v1/subscriptions/{subscription_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("subscriptions")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("subscriptions"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("subscription_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("subscription_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("remove".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("remove")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("DELETE")),
                                ("orig".to_string(), Value::str("/api/v1/subscriptions/{subscription_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("subscriptions")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("subscriptions"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("subscription_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("subscription_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                    ("query".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("application_id")),
                                            ("orig".to_string(), Value::str("application_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("query")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                            ("field".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("application_id"),
                                        Value::str("id"),
                                    ])),
                                ])),
                            ]),
                        ])),
                    ])),
                    ("update".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("update")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("PUT")),
                                ("orig".to_string(), Value::str("/api/v1/subscriptions/{subscription_id}")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("subscriptions")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("id")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("subscriptions"),
                                    Value::str("{id}"),
                                ])),
                                ("rename".to_string(), Value::map_of([
                                    ("param".to_string(), Value::map_of([
                                        ("subscription_id".to_string(), Value::str("id")),
                                    ])),
                                ])),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("id")),
                                            ("orig".to_string(), Value::str("subscription_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("user_authentication".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("current_password")),
                        ("title".to_string(), Value::str("Current Password")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("email")),
                        ("title".to_string(), Value::str("Email")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("new_password")),
                        ("title".to_string(), Value::str("New Password")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("token")),
                        ("title".to_string(), Value::str("Token")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("user_authentication")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/begin-reset-password")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("begin-reset-password")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("begin-reset-password"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/logout")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("logout")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("logout"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/password")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("password")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("password"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/resend-verification-email")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("resend-verification-email")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("resend-verification-email"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                            ]),
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/auth/reset-password")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("auth")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("reset-password")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("auth"),
                                    Value::str("reset-password"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::empty_map()),
                                ("select".to_string(), Value::empty_map()),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::empty_list()),
                ])),
            ])),
            ("user_invitation".to_string(), Value::map_of([
                ("fields".to_string(), Value::list(vec![
                    Value::map_of([
                        ("name".to_string(), Value::str("email")),
                        ("title".to_string(), Value::str("Email")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                    Value::map_of([
                        ("name".to_string(), Value::str("role")),
                        ("title".to_string(), Value::str("Role")),
                        ("type".to_string(), Value::str("`$STRING`")),
                        ("req".to_string(), Value::Bool(true)),
                    ]),
                ])),
                ("name".to_string(), Value::str("user_invitation")),
                ("op".to_string(), Value::map_of([
                    ("create".to_string(), Value::map_of([
                        ("input".to_string(), Value::str("data")),
                        ("name".to_string(), Value::str("create")),
                        ("points".to_string(), Value::list(vec![
                            Value::map_of([
                                ("kind".to_string(), Value::str("http")),
                                ("method".to_string(), Value::str("POST")),
                                ("orig".to_string(), Value::str("/api/v1/organizations/{organization_id}/invite")),
                                ("segments".to_string(), Value::list(vec![
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("api")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("v1")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("organizations")),
                                    ]),
                                    Value::map_of([
                                        ("var".to_string(), Value::str("organization_id")),
                                    ]),
                                    Value::map_of([
                                        ("lit".to_string(), Value::str("invite")),
                                    ]),
                                ])),
                                ("parts".to_string(), Value::list(vec![
                                    Value::str("api"),
                                    Value::str("v1"),
                                    Value::str("organizations"),
                                    Value::str("{organization_id}"),
                                    Value::str("invite"),
                                ])),
                                ("rename".to_string(), Value::empty_map()),
                                ("transform".to_string(), Value::map_of([
                                    ("req".to_string(), Value::str("`reqdata`")),
                                    ("res".to_string(), Value::str("`body`")),
                                ])),
                                ("args".to_string(), Value::map_of([
                                    ("params".to_string(), Value::list(vec![
                                        Value::map_of([
                                            ("name".to_string(), Value::str("organization_id")),
                                            ("orig".to_string(), Value::str("organization_id")),
                                            ("type".to_string(), Value::str("`$STRING`")),
                                            ("kind".to_string(), Value::str("param")),
                                            ("reqd".to_string(), Value::Bool(true)),
                                        ]),
                                    ])),
                                ])),
                                ("select".to_string(), Value::map_of([
                                    ("exist".to_string(), Value::list(vec![
                                        Value::str("organization_id"),
                                    ])),
                                ])),
                                ("response".to_string(), Value::map_of([
                                    ("kind".to_string(), Value::str("json")),
                                    ("media".to_string(), Value::str("application/json")),
                                ])),
                            ]),
                        ])),
                    ])),
                ])),
                ("relations".to_string(), Value::map_of([
                    ("ancestors".to_string(), Value::list(vec![
                        Value::list(vec![
                            Value::str("$.main.kit.entity.organization"),
                        ]),
                    ])),
                ])),
            ])),
        ])),
    ])
}

// SHARED CONFIG (sdkgen rung L2).
//
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client. Above the
// size threshold make_config re-parses the whole embedded JSON, so this is the
// difference between parsing the model once and once per client.
//
// THREAD-LOCAL, not a global: Value is Rc/RefCell-backed and so is neither
// Send nor Sync. One config per thread is the widest scope that is sound here,
// and the clone is an Rc bump, not a deep copy.
thread_local! {
    static SHARED_CONFIG: Value = make_config();
}

/// The per-thread config, built once on first use.
///
/// The returned Value SHARES its nodes: treat it as read-only. Callers that
/// need to mutate should use make_config, which always returns a fresh copy.
pub fn shared_config() -> Value {
    SHARED_CONFIG.with(|c| c.clone())
}

pub fn make_feature(name: &str) -> FeatureRef {
    match name {
        "debug" => Rc::new(RefCell::new(crate::feature::debug::DebugFeature::new())),
        "idempotency" => Rc::new(RefCell::new(crate::feature::idempotency::IdempotencyFeature::new())),
        "metrics" => Rc::new(RefCell::new(crate::feature::metrics::MetricsFeature::new())),
        "paging" => Rc::new(RefCell::new(crate::feature::paging::PagingFeature::new())),
        "ratelimit" => Rc::new(RefCell::new(crate::feature::ratelimit::RatelimitFeature::new())),
        "retry" => Rc::new(RefCell::new(crate::feature::retry::RetryFeature::new())),
        "secrets" => Rc::new(RefCell::new(crate::feature::secrets::SecretsFeature::new())),
        "test" => Rc::new(RefCell::new(crate::feature::test::TestFeature::new())),
        "timeout" => Rc::new(RefCell::new(crate::feature::timeout::TimeoutFeature::new())),
        _ => Rc::new(RefCell::new(crate::feature::base::BaseFeature::new())),
    }
}
