package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/hook0-sdk/go"
)

// ListArgs is what an agent sends to hook0_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: application | application_secret | error | event | event_type | events_management | hook0 | organization | request_attempt | service_token | subscription"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to hook0_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: application | event | event_type | health | instance | organization | quota | request_attempt | response | service_token | subscription"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.Hook0SDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "hook0_list",
		Description: "List records from Hook0. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("application", "application_secret", "error", "event", "event_type", "events_management", "hook0", "organization", "request_attempt", "service_token", "subscription"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "hook0_load",
		Description: "Load one record from Hook0. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("application", "event", "event_type", "health", "instance", "organization", "quota", "request_attempt", "response", "service_token", "subscription"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.Hook0SDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.Hook0SDK, name string) (sdk.Hook0Entity, error) {
	switch strings.ToLower(name) {
	case "application":
		return client.Application(nil), nil
	case "application_secret":
		return client.ApplicationSecret(nil), nil
	case "applications_management":
		return client.ApplicationsManagement(nil), nil
	case "email_preference":
		return client.EmailPreference(nil), nil
	case "error":
		return client.Error(nil), nil
	case "event":
		return client.Event(nil), nil
	case "event_type":
		return client.EventType(nil), nil
	case "events_management":
		return client.EventsManagement(nil), nil
	case "health":
		return client.Health(nil), nil
	case "hook0":
		return client.Hook0(nil), nil
	case "ingested_event":
		return client.IngestedEvent(nil), nil
	case "instance":
		return client.Instance(nil), nil
	case "login":
		return client.Login(nil), nil
	case "organization":
		return client.Organization(nil), nil
	case "organization_edit_role":
		return client.OrganizationEditRole(nil), nil
	case "quota":
		return client.Quota(nil), nil
	case "registration":
		return client.Registration(nil), nil
	case "request_attempt":
		return client.RequestAttempt(nil), nil
	case "response":
		return client.Response(nil), nil
	case "revoke":
		return client.Revoke(nil), nil
	case "service_token":
		return client.ServiceToken(nil), nil
	case "subscription":
		return client.Subscription(nil), nil
	case "user_authentication":
		return client.UserAuthentication(nil), nil
	case "user_invitation":
		return client.UserInvitation(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
