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

func TestOrganizationEditRoleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationEditRole(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationEditRoleEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := organization_edit_roleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_edit_role." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationEditRoleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.organization_edit_role", setup.data)))
		var organizationEditRoleRef01Data map[string]any
		if len(organizationEditRoleRef01DataRaw) > 0 {
			organizationEditRoleRef01Data = core.ToMapAny(organizationEditRoleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationEditRoleRef01Data

		// UPDATE
		organizationEditRoleRef01Ent := client.OrganizationEditRole(nil)
		organizationEditRoleRef01DataUp0Up := map[string]any{
		}

		organizationEditRoleRef01MarkdefUp0Name := "role"
		organizationEditRoleRef01MarkdefUp0Value := fmt.Sprintf("Mark01-organization_edit_role_ref01_%d", setup.now)
		organizationEditRoleRef01DataUp0Up[organizationEditRoleRef01MarkdefUp0Name] = organizationEditRoleRef01MarkdefUp0Value

		organizationEditRoleRef01ResdataUp0Result, err := organizationEditRoleRef01Ent.Update(organizationEditRoleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationEditRoleRef01ResdataUp0 := core.ToMapAny(entityData(organizationEditRoleRef01ResdataUp0Result))
		if organizationEditRoleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if organizationEditRoleRef01ResdataUp0[organizationEditRoleRef01MarkdefUp0Name] != organizationEditRoleRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", organizationEditRoleRef01MarkdefUp0Name, organizationEditRoleRef01ResdataUp0[organizationEditRoleRef01MarkdefUp0Name])
		}

	})
}

func organization_edit_roleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_edit_role", "OrganizationEditRoleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_edit_role test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_edit_role test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"organization_edit_role01", "organization_edit_role02", "organization_edit_role03"},
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
	entidEnvRaw := os.Getenv("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID": idmap,
		"HOOK0_TEST_LIVE":      "FALSE",
		"HOOK0_TEST_EXPLAIN":   "FALSE",
		"HOOK0_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"])
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
