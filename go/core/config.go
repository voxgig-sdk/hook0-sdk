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
				"transport": "base",
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
						"format": "uuid",
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
						"name": "id",
						"type": "`$STRING`",
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
						"format": "uuid",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "applications",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"applications",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "applications",
									},
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
								"parts": []any{
									"api",
									"v1",
									"applications",
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
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "applications",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "applications",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"application_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "applications",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"applications",
									"{id}",
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
						"format": "uuid",
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "deleted_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "token",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "application_secrets",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "application_secrets",
									},
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
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
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
								"rename": map[string]any{
									"param": map[string]any{
										"application_secret_token": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "application_secrets",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "application_secrets",
									},
									map[string]any{
										"var": "application_secret_token",
									},
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
								"parts": []any{
									"api",
									"v1",
									"application_secrets",
									"{application_secret_token}",
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
						"format": "uuid",
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
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
						"name": "id",
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
						"format": "date-time",
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
						"format": "date-time",
						"name": "received_at",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "event",
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
											"name": "id",
											"orig": "event_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/events/{event_id}/replay",
								"rename": map[string]any{
									"param": map[string]any{
										"event_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "replay",
									},
								},
								"select": map[string]any{
									"$action": "replay",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"events",
									"{id}",
									"replay",
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
								"orig": "/api/v1/events/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "events",
									},
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
								"parts": []any{
									"api",
									"v1",
									"events",
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
								"rename": map[string]any{
									"param": map[string]any{
										"event_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"events",
									"{id}",
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
						"format": "uuid",
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
						"name": "id",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "event_types",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"event_types",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "event_types",
									},
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
								"parts": []any{
									"api",
									"v1",
									"event_types",
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
								"rename": map[string]any{
									"param": map[string]any{
										"event_type_name": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "event_types",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"event_types",
									"{id}",
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
				"fields": []any{},
				"name": "events_management",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/payload_content_types/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "payload_content_types",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"payload_content_types",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "event_types",
									},
									map[string]any{
										"var": "event_type_name",
									},
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
								"parts": []any{
									"api",
									"v1",
									"event_types",
									"{event_type_name}",
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
					},
				},
			},
			"events_per_day_entry": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "int32",
						"name": "amount",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "uuid",
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
						"format": "date",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "events_per_day",
									},
									map[string]any{
										"lit": "application",
									},
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
								"parts": []any{
									"api",
									"v1",
									"events_per_day",
									"application",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "events_per_day",
									},
									map[string]any{
										"lit": "organization",
									},
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
								"parts": []any{
									"api",
									"v1",
									"events_per_day",
									"organization",
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
						"format": "int64",
						"name": "database_duration_ms",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "object_storage",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "int64",
						"name": "object_storage_duration_ms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pulsar",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "int64",
						"name": "pulsar_duration_ms",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int64",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "health",
									},
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
								"parts": []any{
									"api",
									"v1",
									"health",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "environment_variables",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"environment_variables",
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
						"format": "uuid",
						"name": "application_id",
						"req": true,
						"short": "UUID of the application this event belongs to.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
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
						"format": "date-time",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "event",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"event",
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
						"format": "int32",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "instance",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"instance",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "login",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"login",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/refresh",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "refresh",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"refresh",
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
						"name": "id",
						"type": "`$STRING`",
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
						"format": "uuid",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"organizations",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"organizations",
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
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"organizations",
									"{id}",
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
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "user_id",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "invite",
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
								"parts": []any{
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
						"format": "int32",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "errors",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"errors",
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
						"format": "int32",
						"name": "global_applications_per_organization_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "global_days_of_events_retention_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "global_event_types_per_application_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "global_events_per_day_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "global_members_per_organization_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "quotas",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.limits`",
								},
								"parts": []any{
									"api",
									"v1",
									"quotas",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "register",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"register",
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
						"format": "date-time",
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "delay_until",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "event",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uuid",
						"name": "event_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "failed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "http_response_status",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "picked_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "request_attempt_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "response_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
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
						"format": "date-time",
						"name": "succeeded_at",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "request_attempts",
									},
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
								"parts": []any{
									"api",
									"v1",
									"request_attempts",
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
								"rename": map[string]any{
									"param": map[string]any{
										"request_attempt_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "request_attempts",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"request_attempts",
									"{id}",
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
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
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
								"rename": map[string]any{
									"param": map[string]any{
										"response_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "responses",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"responses",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_id",
									},
									map[string]any{
										"lit": "invite",
									},
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
								"parts": []any{
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
						"format": "date-time",
						"name": "created_at",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "organization_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
						"name": "token_id",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "service_token",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"service_token",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "service_token",
									},
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
								"parts": []any{
									"api",
									"v1",
									"service_token",
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
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "service_token",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "service_token",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"service_token_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "service_token",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"service_token",
									"{id}",
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
						"format": "uuid",
						"name": "application_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
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
						"name": "id",
						"type": "`$STRING`",
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
						"format": "uuid",
						"name": "secret",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uuid",
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
						"format": "date-time",
						"name": "updated_at",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "subscriptions",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "subscriptions",
									},
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
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
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
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"subscription_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"v1",
									"subscriptions",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "begin-reset-password",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"begin-reset-password",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/logout",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "logout",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"logout",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/password",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "password",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"password",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/reset-password",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "reset-password",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"reset-password",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/verify-email",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "verify-email",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"verify-email",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_id",
									},
									map[string]any{
										"lit": "invite",
									},
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
								"parts": []any{
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
