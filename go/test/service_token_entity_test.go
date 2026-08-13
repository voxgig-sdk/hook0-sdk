package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/hook0-sdk/go"
	"github.com/voxgig-sdk/hook0-sdk/go/core"

	vs "github.com/voxgig-sdk/hook0-sdk/go/utility/struct"
)

func TestServiceTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ServiceToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil ServiceTokenEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"service_token": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.ServiceToken(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.ServiceToken(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := service_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "service_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_SERVICE_TOKEN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		serviceTokenRef01Ent := client.ServiceToken(nil)
		serviceTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "service_token"}, setup.data), "service_token_ref01"))

		serviceTokenRef01DataResult, err := serviceTokenRef01Ent.Create(serviceTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		serviceTokenRef01Data = core.ToMapAny(entityData(serviceTokenRef01DataResult))
		if serviceTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		serviceTokenRef01Match := map[string]any{}

		serviceTokenRef01ListResult, err := serviceTokenRef01Ent.List(serviceTokenRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, serviceTokenRef01ListOk := serviceTokenRef01ListResult.([]any)
		if !serviceTokenRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", serviceTokenRef01ListResult)
		}

		// UPDATE
		serviceTokenRef01DataUp0Up := map[string]any{
		}

		serviceTokenRef01MarkdefUp0Name := "biscuit"
		serviceTokenRef01MarkdefUp0Value := fmt.Sprintf("Mark01-service_token_ref01_%d", setup.now)
		serviceTokenRef01DataUp0Up[serviceTokenRef01MarkdefUp0Name] = serviceTokenRef01MarkdefUp0Value

		serviceTokenRef01ResdataUp0Result, err := serviceTokenRef01Ent.Update(serviceTokenRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		serviceTokenRef01ResdataUp0 := core.ToMapAny(entityData(serviceTokenRef01ResdataUp0Result))
		if serviceTokenRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if serviceTokenRef01ResdataUp0[serviceTokenRef01MarkdefUp0Name] != serviceTokenRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", serviceTokenRef01MarkdefUp0Name, serviceTokenRef01ResdataUp0[serviceTokenRef01MarkdefUp0Name])
		}

		// LOAD
		serviceTokenRef01MatchDt0 := map[string]any{}
		serviceTokenRef01DataDt0Loaded, err := serviceTokenRef01Ent.Load(serviceTokenRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if serviceTokenRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}


		// LIST
		serviceTokenRef01MatchRt0 := map[string]any{}

		serviceTokenRef01ListRt0Result, err := serviceTokenRef01Ent.List(serviceTokenRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, serviceTokenRef01ListRt0Ok := serviceTokenRef01ListRt0Result.([]any)
		if !serviceTokenRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", serviceTokenRef01ListRt0Result)
		}

	})
}

func service_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "service_token", "ServiceTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read service_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse service_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"service_token01", "service_token02", "service_token03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HOOK0_TEST_SERVICE_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOOK0_TEST_SERVICE_TOKEN_ENTID": idmap,
		"HOOK0_TEST_LIVE":      "FALSE",
		"HOOK0_TEST_EXPLAIN":   "FALSE",
		"HOOK0_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOOK0_TEST_SERVICE_TOKEN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOOK0_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["HOOK0_APIKEY"],
			},
			extra,
		})
		client = sdk.NewHook0SDK(core.ToMapAny(mergedOpts))
	}

	live := env["HOOK0_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HOOK0_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
