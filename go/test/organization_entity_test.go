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

func TestOrganizationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Organization(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"organization": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Organization(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Organization(nil).Stream("list", nil, nil) {
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
		setup := organizationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_ORGANIZATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		organizationRef01Ent := client.Organization(nil)
		organizationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "organization"}, setup.data), "organization_ref01"))

		organizationRef01DataResult, err := organizationRef01Ent.Create(organizationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationRef01Data = core.ToMapAny(entityData(organizationRef01DataResult))
		if organizationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		organizationRef01Match := map[string]any{}

		organizationRef01ListResult, err := organizationRef01Ent.List(organizationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationRef01ListOk := organizationRef01ListResult.([]any)
		if !organizationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationRef01ListResult)
		}

		// UPDATE
		organizationRef01DataUp0Up := map[string]any{
		}

		organizationRef01MarkdefUp0Name := "name"
		organizationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-organization_ref01_%d", setup.now)
		organizationRef01DataUp0Up[organizationRef01MarkdefUp0Name] = organizationRef01MarkdefUp0Value

		organizationRef01ResdataUp0Result, err := organizationRef01Ent.Update(organizationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationRef01ResdataUp0 := core.ToMapAny(entityData(organizationRef01ResdataUp0Result))
		if organizationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if organizationRef01ResdataUp0[organizationRef01MarkdefUp0Name] != organizationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", organizationRef01MarkdefUp0Name, organizationRef01ResdataUp0[organizationRef01MarkdefUp0Name])
		}

		// LOAD
		organizationRef01MatchDt0 := map[string]any{}
		organizationRef01DataDt0Loaded, err := organizationRef01Ent.Load(organizationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if organizationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}


		// LIST
		organizationRef01MatchRt0 := map[string]any{}

		organizationRef01ListRt0Result, err := organizationRef01Ent.List(organizationRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationRef01ListRt0Ok := organizationRef01ListRt0Result.([]any)
		if !organizationRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationRef01ListRt0Result)
		}

	})
}

func organizationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization", "OrganizationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"organization01", "organization02", "organization03"},
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
	entidEnvRaw := os.Getenv("HOOK0_TEST_ORGANIZATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOOK0_TEST_ORGANIZATION_ENTID": idmap,
		"HOOK0_TEST_LIVE":      "FALSE",
		"HOOK0_TEST_EXPLAIN":   "FALSE",
		"HOOK0_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOOK0_TEST_ORGANIZATION_ENTID"])
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
