// organization_edit_role entity test - basic flow (generated from the API model).

using System.Text.Json;

using Hook0Sdk.Feature;
using Voxgig.Struct;
using Xunit;

namespace Hook0Sdk.Test;

public class OrganizationEditRoleEntityTest
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const bool LIVE_STRICT = true;

    [Fact]
    public void Instance()
    {
        var testsdk = Hook0SDK.TestSDK(null, null);
        var ent = testsdk.OrganizationEditRole();
        Assert.NotNull(ent);
    }

    [Fact]
    public void Basic()
    {
        var setup = OrganizationEditRoleBasicSetup(null);
        // Per-op sdk-test-control.json skip - basic test exercises a flow
        // with multiple ops; skipping any op skips the whole flow.
        var _mode = setup.Live ? "live" : "unit";
        foreach (var _op in new[] { "update" })
        {
            var (_shouldSkip, _) = TestRunner.IsControlSkipped(
                "entityOp", "organization_edit_role." + _op, _mode);
            if (_shouldSkip)
            {
                return; // skipped via sdk-test-control.json
            }
        }
        if (setup.Live && Environment.GetEnvironmentVariable("VOXGIG_GETONLY_GUARD") == "TRUE")
        {
            Console.WriteLine("LIVE STEP {\"id\":\"organization_edit_role.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite\"}");
            Console.WriteLine("skip: Live coverage incomplete: organization_edit_role.update.0 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/invite)");
            return;
        }

        if (setup.Live)
        {
            TestRunner.LiveMiss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a organization_edit_role record it did not create");
            return;
        }
        var client = setup.Client;

        // Bootstrap entity data from existing test data (no create step in flow).
        var organizationEditRoleRef01DataRaw = StructUtils.Items(
            Helpers.ToMapAny(StructUtils.GetPath(setup.Data, "existing.organization_edit_role")));
        var organizationEditRoleRef01Data = organizationEditRoleRef01DataRaw.Count > 0
            ? Helpers.ToMapAny(organizationEditRoleRef01DataRaw[0][1])
            : null;

        // UPDATE
        var organizationEditRoleRef01Ent = client.OrganizationEditRole();
        var organizationEditRoleRef01DataUp0Up = new Dictionary<string, object?>
        {
            ["id"] = organizationEditRoleRef01Data!["id"],
        };

        var organizationEditRoleRef01MarkdefUp0Name = "role";
        var organizationEditRoleRef01MarkdefUp0Value = $"Mark01-organization_edit_role_ref01_{setup.Now}";
        organizationEditRoleRef01DataUp0Up[organizationEditRoleRef01MarkdefUp0Name] = organizationEditRoleRef01MarkdefUp0Value;

        var organizationEditRoleRef01ResdataUp0Result = organizationEditRoleRef01Ent.Update(organizationEditRoleRef01DataUp0Up, null);
        var organizationEditRoleRef01ResdataUp0 = Helpers.ToMapAny(organizationEditRoleRef01ResdataUp0Result is IEntity ue ? ue.Data() : organizationEditRoleRef01ResdataUp0Result);
        Assert.True(organizationEditRoleRef01ResdataUp0 != null, "expected update result to be a map");
        Assert.True(StructRunner.DeepEqual(organizationEditRoleRef01ResdataUp0!["id"], organizationEditRoleRef01DataUp0Up["id"]),
            "expected update result id to match");
        Assert.True(Equals(organizationEditRoleRef01ResdataUp0![organizationEditRoleRef01MarkdefUp0Name], organizationEditRoleRef01MarkdefUp0Value),
            $"expected {organizationEditRoleRef01MarkdefUp0Name} to be updated, got {organizationEditRoleRef01ResdataUp0[organizationEditRoleRef01MarkdefUp0Name]}");

    }

    [Fact]
    public void Validate()
    {
        if (!Fh.HasFeature("validate"))
        {
            Console.WriteLine("skip: feature not present in this SDK: validate");
            return;
        }
        var client = Hook0SDK.TestSDK(null,
            new Dictionary<string, object?> { ["feature"] = new Dictionary<string, object?> { ["validate"] = new Dictionary<string, object?> { ["active"] = true } } });
        var err = Assert.ThrowsAny<Hook0Error>(() => client.OrganizationEditRole().Update(
            new Dictionary<string, object?> { ["id"] = 1 }, null));
        Assert.Equal("validate_failed", err.Code);
    }

    private static EntityTestSetup OrganizationEditRoleBasicSetup(
        Dictionary<string, object?>? extra)
    {
        TestRunner.LoadEnvLocal();

        var entityDataFile = Path.Combine(TestRunner.TestDir(),
            "..", "..", ".sdk", "test", "entity", "organization_edit_role",
            "OrganizationEditRoleTestData.json");

        var entityDataEl = JsonSerializer.Deserialize<JsonElement>(
            File.ReadAllText(entityDataFile));
        var entityData = StructRunner.ConvertElement(entityDataEl)
            as Dictionary<string, object?>
            ?? throw new InvalidOperationException(
                "failed to parse organization_edit_role test data");

        var options = new Dictionary<string, object?>
        {
            ["entity"] = entityData["existing"],
        };

        var client = Hook0SDK.TestSDK(options, extra);

        // Generate idmap via transform, matching the TS pattern.
        var idmap = StructUtils.Transform(
            new List<object?> { "organization_edit_role01", "organization_edit_role02", "organization_edit_role03" },
            new Dictionary<string, object?>
            {
                ["`$PACK`"] = new List<object?>
                {
                    "",
                    new Dictionary<string, object?>
                    {
                        ["`$KEY`"] = "`$COPY`",
                        ["`$VAL`"] = new List<object?> { "`$FORMAT`", "upper", "`$COPY`" },
                    },
                },
            });

        // Whether *_ENTID supplied the idmap, read before EnvOverride consumes
        // it: without it, the ids a live flow binds are the fixture's synthetic ones.
        var entidEnvRaw = Environment.GetEnvironmentVariable(
            "HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID") ?? "";
        var idmapOverridden = entidEnvRaw != "" &&
            entidEnvRaw.Trim().StartsWith("{");

        var env = TestRunner.EnvOverride(new Dictionary<string, object?>
        {
            ["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"] = idmap,
            ["HOOK0_TEST_LIVE"] = "FALSE",
            ["HOOK0_TEST_EXPLAIN"] = "FALSE",
            ["HOOK0_APIKEY"] = "",
        });

        var idmapResolved = Helpers.ToMapAny(env["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"])
            ?? Helpers.ToMapAny(idmap)
            ?? new Dictionary<string, object?>();

        if (Equals(env["HOOK0_TEST_LIVE"], "TRUE"))
        {
            // 'extra ?? new ...', not a bare 'extra': Merge returns null when
            // the last entry is null, and BasicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK null.
            var extraOpts = extra ?? new Dictionary<string, object?>();
            var mergedOpts = StructUtils.Merge(new List<object?>
            {
                // FIRST, so the generated fields below win: sdk-test-control.json's
                // test.client.options adds to the live client, it does not redirect it.
                TestRunner.LiveClientOptions(),
                new Dictionary<string, object?>
                {
                    ["apikey"] = env["HOOK0_APIKEY"],
                },
                extraOpts,
            });
            client = new Hook0SDK(Helpers.ToMapAny(mergedOpts));
        }

        var live = Equals(env["HOOK0_TEST_LIVE"], "TRUE");
        return new EntityTestSetup
        {
            Client = client,
            Data = entityData,
            Idmap = idmapResolved,
            Env = env,
            Explain = Equals(env["HOOK0_TEST_EXPLAIN"], "TRUE"),
            Live = live,
            SyntheticOnly = live && !idmapOverridden,
            Now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
        };
    }
}
