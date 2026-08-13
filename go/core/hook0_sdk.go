package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/hook0-sdk/go/utility/struct"
)

type Hook0SDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewHook0SDK(options map[string]any) *Hook0SDK {
	sdk := &Hook0SDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *Hook0SDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *Hook0SDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *Hook0SDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *Hook0SDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *Hook0SDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *Hook0SDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *Hook0SDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("Hook0SDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *Hook0SDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *Hook0SDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath([]any{"data", "errors"}, res).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("Hook0SDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Application returns a Application entity bound to this client.
// Idiomatic usage: client.Application(nil).List(nil, nil) or
// client.Application(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Application(data map[string]any) Hook0Entity {
	return NewApplicationEntityFunc(sdk, data)
}


// ApplicationSecret returns a ApplicationSecret entity bound to this client.
// Idiomatic usage: client.ApplicationSecret(nil).List(nil, nil) or
// client.ApplicationSecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) ApplicationSecret(data map[string]any) Hook0Entity {
	return NewApplicationSecretEntityFunc(sdk, data)
}


// ApplicationsManagement returns a ApplicationsManagement entity bound to this client.
// Idiomatic usage: client.ApplicationsManagement(nil).List(nil, nil) or
// client.ApplicationsManagement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) ApplicationsManagement(data map[string]any) Hook0Entity {
	return NewApplicationsManagementEntityFunc(sdk, data)
}


// Event returns a Event entity bound to this client.
// Idiomatic usage: client.Event(nil).List(nil, nil) or
// client.Event(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Event(data map[string]any) Hook0Entity {
	return NewEventEntityFunc(sdk, data)
}


// EventType returns a EventType entity bound to this client.
// Idiomatic usage: client.EventType(nil).List(nil, nil) or
// client.EventType(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) EventType(data map[string]any) Hook0Entity {
	return NewEventTypeEntityFunc(sdk, data)
}


// EventsManagement returns a EventsManagement entity bound to this client.
// Idiomatic usage: client.EventsManagement(nil).List(nil, nil) or
// client.EventsManagement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) EventsManagement(data map[string]any) Hook0Entity {
	return NewEventsManagementEntityFunc(sdk, data)
}


// EventsPerDayEntry returns a EventsPerDayEntry entity bound to this client.
// Idiomatic usage: client.EventsPerDayEntry(nil).List(nil, nil) or
// client.EventsPerDayEntry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) EventsPerDayEntry(data map[string]any) Hook0Entity {
	return NewEventsPerDayEntryEntityFunc(sdk, data)
}


// Health returns a Health entity bound to this client.
// Idiomatic usage: client.Health(nil).List(nil, nil) or
// client.Health(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Health(data map[string]any) Hook0Entity {
	return NewHealthEntityFunc(sdk, data)
}


// Hook0 returns a Hook0 entity bound to this client.
// Idiomatic usage: client.Hook0(nil).List(nil, nil) or
// client.Hook0(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Hook0(data map[string]any) Hook0Entity {
	return NewHook0EntityFunc(sdk, data)
}


// IngestedEvent returns a IngestedEvent entity bound to this client.
// Idiomatic usage: client.IngestedEvent(nil).List(nil, nil) or
// client.IngestedEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) IngestedEvent(data map[string]any) Hook0Entity {
	return NewIngestedEventEntityFunc(sdk, data)
}


// Instance returns a Instance entity bound to this client.
// Idiomatic usage: client.Instance(nil).List(nil, nil) or
// client.Instance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Instance(data map[string]any) Hook0Entity {
	return NewInstanceEntityFunc(sdk, data)
}


// Login returns a Login entity bound to this client.
// Idiomatic usage: client.Login(nil).List(nil, nil) or
// client.Login(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Login(data map[string]any) Hook0Entity {
	return NewLoginEntityFunc(sdk, data)
}


// Organization returns a Organization entity bound to this client.
// Idiomatic usage: client.Organization(nil).List(nil, nil) or
// client.Organization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Organization(data map[string]any) Hook0Entity {
	return NewOrganizationEntityFunc(sdk, data)
}


// OrganizationEditRole returns a OrganizationEditRole entity bound to this client.
// Idiomatic usage: client.OrganizationEditRole(nil).List(nil, nil) or
// client.OrganizationEditRole(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) OrganizationEditRole(data map[string]any) Hook0Entity {
	return NewOrganizationEditRoleEntityFunc(sdk, data)
}


// Problem returns a Problem entity bound to this client.
// Idiomatic usage: client.Problem(nil).List(nil, nil) or
// client.Problem(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Problem(data map[string]any) Hook0Entity {
	return NewProblemEntityFunc(sdk, data)
}


// Quota returns a Quota entity bound to this client.
// Idiomatic usage: client.Quota(nil).List(nil, nil) or
// client.Quota(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Quota(data map[string]any) Hook0Entity {
	return NewQuotaEntityFunc(sdk, data)
}


// Registration returns a Registration entity bound to this client.
// Idiomatic usage: client.Registration(nil).List(nil, nil) or
// client.Registration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Registration(data map[string]any) Hook0Entity {
	return NewRegistrationEntityFunc(sdk, data)
}


// RequestAttempt returns a RequestAttempt entity bound to this client.
// Idiomatic usage: client.RequestAttempt(nil).List(nil, nil) or
// client.RequestAttempt(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) RequestAttempt(data map[string]any) Hook0Entity {
	return NewRequestAttemptEntityFunc(sdk, data)
}


// Response returns a Response entity bound to this client.
// Idiomatic usage: client.Response(nil).List(nil, nil) or
// client.Response(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Response(data map[string]any) Hook0Entity {
	return NewResponseEntityFunc(sdk, data)
}


// Revoke returns a Revoke entity bound to this client.
// Idiomatic usage: client.Revoke(nil).List(nil, nil) or
// client.Revoke(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Revoke(data map[string]any) Hook0Entity {
	return NewRevokeEntityFunc(sdk, data)
}


// ServiceToken returns a ServiceToken entity bound to this client.
// Idiomatic usage: client.ServiceToken(nil).List(nil, nil) or
// client.ServiceToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) ServiceToken(data map[string]any) Hook0Entity {
	return NewServiceTokenEntityFunc(sdk, data)
}


// Subscription returns a Subscription entity bound to this client.
// Idiomatic usage: client.Subscription(nil).List(nil, nil) or
// client.Subscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) Subscription(data map[string]any) Hook0Entity {
	return NewSubscriptionEntityFunc(sdk, data)
}


// UserAuthentication returns a UserAuthentication entity bound to this client.
// Idiomatic usage: client.UserAuthentication(nil).List(nil, nil) or
// client.UserAuthentication(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) UserAuthentication(data map[string]any) Hook0Entity {
	return NewUserAuthenticationEntityFunc(sdk, data)
}


// UserInvitation returns a UserInvitation entity bound to this client.
// Idiomatic usage: client.UserInvitation(nil).List(nil, nil) or
// client.UserInvitation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *Hook0SDK) UserInvitation(data map[string]any) Hook0Entity {
	return NewUserInvitationEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *Hook0SDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewHook0SDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
