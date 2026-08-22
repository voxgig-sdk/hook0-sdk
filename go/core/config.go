package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Hook0",
			"slug": "hook0",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://app.hook0.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"application": map[string]any{},
				"application_secret": map[string]any{},
				"applications_management": map[string]any{},
				"event": map[string]any{},
				"event_type": map[string]any{},
				"events_management": map[string]any{},
				"events_per_day_entry": map[string]any{},
				"health": map[string]any{},
				"hook0": map[string]any{},
				"ingested_event": map[string]any{},
				"instance": map[string]any{},
				"login": map[string]any{},
				"organization": map[string]any{},
				"organization_edit_role": map[string]any{},
				"problem": map[string]any{},
				"quota": map[string]any{},
				"registration": map[string]any{},
				"request_attempt": map[string]any{},
				"response": map[string]any{},
				"revoke": map[string]any{},
				"service_token": map[string]any{},
				"subscription": map[string]any{},
				"user_authentication": map[string]any{},
				"user_invitation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"application": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"short": "Unique identifier of the application.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "consumption",
						"req": true,
						"short": "Current consumption metrics for this application.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Name of the application.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "onboarding_steps",
						"req": true,
						"short": "Onboarding completion status for this application.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "organization_id",
						"req": true,
						"short": "UUID of the organization this application belongs to.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quotas",
						"req": true,
						"short": "Quota limits for this application.",
						"type": "`$OBJECT`",
					},
				},
				"name": "application",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/applications/",
								"parts": []any{
									"api",
									"v1",
									"applications",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/applications/",
								"parts": []any{
									"api",
									"v1",
									"applications",
								},
								"select": map[string]any{
									"exist": []any{
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/applications/{application_id}",
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/applications/{application_id}",
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/applications/{application_id}",
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"application_secret": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deleted_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "application_secret",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/application_secrets/",
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/application_secrets/",
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "application_secret_token",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/application_secrets/{application_secret_token}",
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"application_secret_token": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"applications_management": map[string]any{
				"fields": []any{},
				"name": "applications_management",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "application_secret_token",
											"orig": "application_secret_token",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/application_secrets/{application_secret_token}",
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
									"{application_secret_token}",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"application_secret_token",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"application_secret",
						},
					},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "event_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_type_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "occurred_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload_content_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "received_at",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/events/",
								"parts": []any{
									"api",
									"v1",
									"events",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/events/{event_id}",
								"parts": []any{
									"api",
									"v1",
									"events",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"event_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event_type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_type_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resource_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resource_type_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "service",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "service_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verb",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verb_name",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "event_type",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/event_types/",
								"parts": []any{
									"api",
									"v1",
									"event_types",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/event_types/",
								"parts": []any{
									"api",
									"v1",
									"event_types",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "event_type_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/event_types/{event_type_name}",
								"parts": []any{
									"api",
									"v1",
									"event_types",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"event_type_name": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"events_management": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "events_management",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "event_id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/events/{event_id}/replay",
								"parts": []any{
									"api",
									"v1",
									"events",
									"{event_id}",
									"replay",
								},
								"select": map[string]any{
									"exist": []any{
										"event_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/payload_content_types/",
								"parts": []any{
									"api",
									"v1",
									"payload_content_types",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "event_type_name",
											"orig": "event_type_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/event_types/{event_type_name}",
								"parts": []any{
									"api",
									"v1",
									"event_types",
									"{event_type_name}",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"event_type_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"event_type",
						},
						[]any{
							"event",
						},
					},
				},
			},
			"events_per_day_entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "application_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_provisional",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "events_per_day_entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/events_per_day/application",
								"parts": []any{
									"api",
									"v1",
									"events_per_day",
									"application",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/events_per_day/organization",
								"parts": []any{
									"api",
									"v1",
									"events_per_day",
									"organization",
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"organization_id",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"health": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "database",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "database_duration_ms",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "object_storage",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "object_storage_duration_ms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pulsar",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "pulsar_duration_ms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_duration_ms",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "health",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/health/",
								"parts": []any{
									"api",
									"v1",
									"health",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hook0": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "default",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "env_var",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "group",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "required",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "sensitive",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "hook0",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/environment_variables/",
								"parts": []any{
									"api",
									"v1",
									"environment_variables",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ingested_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"short": "UUID of the application this event belongs to.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_id",
						"short": "Optional unique identifier for this event (client-generated UUID).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_type",
						"req": true,
						"short": "The type of event (e.g., 'user.created', 'order.completed').",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"req": true,
						"short": "Labels for event filtering and routing to subscriptions.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"short": "Optional metadata key-value pairs associated with the event.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "occurred_at",
						"req": true,
						"short": "Timestamp when the event occurred.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload",
						"req": true,
						"short": "The event payload.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload_content_type",
						"req": true,
						"short": "Content type of the payload.",
						"type": "`$STRING`",
					},
				},
				"name": "ingested_event",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/event/",
								"parts": []any{
									"api",
									"v1",
									"event",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"instance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_secret_compatibility",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "auto_db_migration",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "biscuit_public_key",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cloudflare_turnstile_site_key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "formbricks",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "matomo",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "password_minimum_length",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "quota_enforcement",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "registration_disabled",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "support_email_address",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "instance",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/instance/",
								"parts": []any{
									"api",
									"v1",
									"instance",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"login": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/login",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"login",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/refresh",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"refresh",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "consumption",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "onboarding_steps",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "organization_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "plan",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "quotas",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "role",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "users",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "organization",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/organizations/",
								"parts": []any{
									"api",
									"v1",
									"organizations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/organizations/",
								"parts": []any{
									"api",
									"v1",
									"organizations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/organizations/{organization_id}/",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/organizations/{organization_id}/",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/organizations/{organization_id}/",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organization_edit_role": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "role",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "organization_edit_role",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/organizations/{organization_id}/invite",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
									"invite",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"select": map[string]any{
									"$action": "invite",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"problem": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "detail",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "problem",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/errors/",
								"parts": []any{
									"api",
									"v1",
									"errors",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"quota": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "global_applications_per_organization_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "global_days_of_events_retention_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "global_event_types_per_application_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "global_events_per_day_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "global_members_per_organization_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "global_subscriptions_per_application_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "quota",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/quotas/",
								"parts": []any{
									"api",
									"v1",
									"quotas",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.limits`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"registration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "first_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gclid",
						"short": "Optional Google Ads click identifier captured during the user's journey from a Google Ad.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "turnstile_token",
						"type": "`$STRING`",
					},
				},
				"name": "registration",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/register/",
								"parts": []any{
									"api",
									"v1",
									"register",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"request_attempt": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "delay_until",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "failed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "http_response_status",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "picked_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "request_attempt_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "response_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "retry_count",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Status of a request attempt.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "subscription",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "succeeded_at",
						"type": "`$STRING`",
					},
				},
				"name": "request_attempt",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_event_type_name",
											"orig": "event_event_type_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_id",
											"orig": "event_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "max_created_at",
											"orig": "max_created_at",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "min_created_at",
											"orig": "min_created_at",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pagination_cursor",
											"orig": "pagination_cursor",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/request_attempts/",
								"parts": []any{
									"api",
									"v1",
									"request_attempts",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"event_event_type_name",
										"event_id",
										"max_created_at",
										"min_created_at",
										"pagination_cursor",
										"subscription_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "request_attempt_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/request_attempts/{request_attempt_id}",
								"parts": []any{
									"api",
									"v1",
									"request_attempts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"request_attempt_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"response": map[string]any{
				"fields": []any{},
				"name": "response",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "response_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/responses/{response_id}",
								"parts": []any{
									"api",
									"v1",
									"responses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"response_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.headers`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"revoke": map[string]any{
				"fields": []any{},
				"name": "revoke",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/organizations/{organization_id}/invite",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{organization_id}",
									"invite",
								},
								"select": map[string]any{
									"exist": []any{
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"organization",
						},
					},
				},
			},
			"service_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "biscuit",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "organization_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token_id",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "service_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/service_token/",
								"parts": []any{
									"api",
									"v1",
									"service_token",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/service_token/",
								"parts": []any{
									"api",
									"v1",
									"service_token",
								},
								"select": map[string]any{
									"exist": []any{
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "service_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/service_token/{service_token_id}",
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "service_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/service_token/{service_token_id}",
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "service_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/service_token/{service_token_id}",
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"subscription": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dedicated_workers",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event_types",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "is_enabled",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "label_key",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "_Kept for backward compatibility, you should use `labels`_",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label_value",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "_Kept for backward compatibility, you should use `labels`_",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
							"update": map[string]any{
								"type": "`$OBJECT`",
							},
						},
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
							"update": map[string]any{
								"type": "`$OBJECT`",
							},
						},
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "secret",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subscription_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "target",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "updated_at",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "subscription",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/subscriptions/",
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/subscriptions/",
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "subscription_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/subscriptions/{subscription_id}",
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "subscription_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/v1/subscriptions/{subscription_id}",
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "subscription_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/v1/subscriptions/{subscription_id}",
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_authentication": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "new_password",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "user_authentication",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/begin-reset-password",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"begin-reset-password",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/logout",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"logout",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/password",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"password",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/reset-password",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"reset-password",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/verify-email",
								"parts": []any{
									"api",
									"v1",
									"auth",
									"verify-email",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_invitation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "user_invitation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/organizations/{organization_id}/invite",
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{organization_id}",
									"invite",
								},
								"select": map[string]any{
									"exist": []any{
										"organization_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"organization",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
