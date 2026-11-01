// instance entity test - basic flow (generated from the API model).

using System.Text.Json;

using Hook0Sdk.Feature;
using Voxgig.Struct;
using Xunit;

namespace Hook0Sdk.Test;

public class InstanceEntityTest
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
        var ent = testsdk.Instance();
        Assert.NotNull(ent);
    }

    [Fact]
    public void Basic()
    {
        var setup = InstanceBasicSetup(null);
        // Per-op sdk-test-control.json skip - basic test exercises a flow
        // with multiple ops; skipping any op skips the whole flow.
        var _mode = setup.Live ? "live" : "unit";
        foreach (var _op in new[] { "load" })
        {
            var (_shouldSkip, _) = TestRunner.IsControlSkipped(
                "entityOp", "instance." + _op, _mode);
            if (_shouldSkip)
            {
                return; // skipped via sdk-test-control.json
            }
        }
        var client = setup.Client;

        // Bootstrap entity data from existing test data (no create step in flow).
        var instanceRef01DataRaw = StructUtils.Items(
            Helpers.ToMapAny(StructUtils.GetPath(setup.Data, "existing.instance")));
        var instanceRef01Data = instanceRef01DataRaw.Count > 0
            ? Helpers.ToMapAny(instanceRef01DataRaw[0][1])
            : null;

        // LOAD
        var instanceRef01Ent = client.Instance();
        var instanceRef01MatchDt0 = new Dictionary<string, object?>();
        var instanceRef01DataDt0Loaded = instanceRef01Ent.Load(instanceRef01MatchDt0, null);
        Assert.True(instanceRef01DataDt0Loaded != null, "expected load result to be non-null");

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
        var err = Assert.ThrowsAny<Hook0Error>(() => client.Instance().Load(
            new Dictionary<string, object?> { ["application_secret_compatibility"] = "x" }, null));
        Assert.Equal("validate_failed", err.Code);
    }

    private static EntityTestSetup InstanceBasicSetup(
        Dictionary<string, object?>? extra)
    {
        TestRunner.LoadEnvLocal();

        var entityDataFile = Path.Combine(TestRunner.TestDir(),
            "..", "..", ".sdk", "test", "entity", "instance",
            "InstanceTestData.json");

        var entityDataEl = JsonSerializer.Deserialize<JsonElement>(
            File.ReadAllText(entityDataFile));
        var entityData = StructRunner.ConvertElement(entityDataEl)
            as Dictionary<string, object?>
            ?? throw new InvalidOperationException(
                "failed to parse instance test data");

        var options = new Dictionary<string, object?>
        {
            ["entity"] = entityData["existing"],
        };

        var client = Hook0SDK.TestSDK(options, extra);

        // Generate idmap via transform, matching the TS pattern.
        var idmap = StructUtils.Transform(
            new List<object?> { "instance01", "instance02", "instance03" },
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
            "HOOK0_TEST_INSTANCE_ENTID") ?? "";
        var idmapOverridden = entidEnvRaw != "" &&
            entidEnvRaw.Trim().StartsWith("{");

        var env = TestRunner.EnvOverride(new Dictionary<string, object?>
        {
            ["HOOK0_TEST_INSTANCE_ENTID"] = idmap,
            ["HOOK0_TEST_LIVE"] = "FALSE",
            ["HOOK0_TEST_EXPLAIN"] = "FALSE",
            ["HOOK0_APIKEY"] = "",
        });

        var idmapResolved = Helpers.ToMapAny(env["HOOK0_TEST_INSTANCE_ENTID"])
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
