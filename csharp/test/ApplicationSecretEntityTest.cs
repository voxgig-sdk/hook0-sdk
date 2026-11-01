// application_secret entity test - basic flow (generated from the API model).

using System.Text.Json;

using Hook0Sdk.Feature;
using Voxgig.Struct;
using Xunit;

namespace Hook0Sdk.Test;

public class ApplicationSecretEntityTest
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
        var ent = testsdk.ApplicationSecret();
        Assert.NotNull(ent);
    }

    [Fact]
    public void Basic()
    {
        var setup = ApplicationSecretBasicSetup(null);
        // Per-op sdk-test-control.json skip - basic test exercises a flow
        // with multiple ops; skipping any op skips the whole flow.
        var _mode = setup.Live ? "live" : "unit";
        foreach (var _op in new[] { "create", "list", "update", "remove" })
        {
            var (_shouldSkip, _) = TestRunner.IsControlSkipped(
                "entityOp", "application_secret." + _op, _mode);
            if (_shouldSkip)
            {
                return; // skipped via sdk-test-control.json
            }
        }
        if (setup.Live && Environment.GetEnvironmentVariable("VOXGIG_GETONLY_GUARD") == "TRUE")
        {
            Console.WriteLine("LIVE STEP {\"id\":\"application_secret.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/application_secrets/\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application_secret.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/application_secrets/{application_secret_token}\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application_secret.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/application_secrets/{application_secret_token}\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application_secret.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}");
            BasicGetOnly(setup);
            return;
        }

        var client = setup.Client;

        // CREATE
        var applicationSecretRef01Ent = client.ApplicationSecret();
        var applicationSecretRef01Data = Helpers.ToMapAny(StructUtils.GetProp(
            StructUtils.GetPath(setup.Data, StructUtils.Jt("new", "application_secret")),
            "application_secret_ref01"));

        var applicationSecretRef01DataResult = applicationSecretRef01Ent.Create(applicationSecretRef01Data, null);
        applicationSecretRef01Data = Helpers.ToMapAny(applicationSecretRef01DataResult is IEntity ce ? ce.Data() : applicationSecretRef01DataResult);
        Assert.True(applicationSecretRef01Data != null, "expected create result to be a map");
        Assert.True(applicationSecretRef01Data!["id"] != null, "expected created entity to have an id");

        // LIST
        var applicationSecretRef01Match = new Dictionary<string, object?>();

        var applicationSecretRef01ListResult = applicationSecretRef01Ent.List(applicationSecretRef01Match, null);
        var applicationSecretRef01List = applicationSecretRef01ListResult as List<object?>;
        Assert.True(applicationSecretRef01List != null,
            $"expected list result to be a list, got {applicationSecretRef01ListResult?.GetType()}");

        var applicationSecretRef01ListFound = StructUtils.Select(
            TestRunner.EntityListToData(applicationSecretRef01List!),
            new Dictionary<string, object?> { ["id"] = applicationSecretRef01Data!["id"] });
        Assert.False(StructUtils.IsEmpty(applicationSecretRef01ListFound),
            "expected to find created entity in list");

        // UPDATE
        var applicationSecretRef01DataUp0Up = new Dictionary<string, object?>
        {
            ["id"] = applicationSecretRef01Data!["id"],
        };

        var applicationSecretRef01MarkdefUp0Name = "application_id";
        var applicationSecretRef01MarkdefUp0Value = $"Mark01-application_secret_ref01_{setup.Now}";
        applicationSecretRef01DataUp0Up[applicationSecretRef01MarkdefUp0Name] = applicationSecretRef01MarkdefUp0Value;

        var applicationSecretRef01ResdataUp0Result = applicationSecretRef01Ent.Update(applicationSecretRef01DataUp0Up, null);
        var applicationSecretRef01ResdataUp0 = Helpers.ToMapAny(applicationSecretRef01ResdataUp0Result is IEntity ue ? ue.Data() : applicationSecretRef01ResdataUp0Result);
        Assert.True(applicationSecretRef01ResdataUp0 != null, "expected update result to be a map");
        Assert.True(StructRunner.DeepEqual(applicationSecretRef01ResdataUp0!["id"], applicationSecretRef01DataUp0Up["id"]),
            "expected update result id to match");
        Assert.True(Equals(applicationSecretRef01ResdataUp0![applicationSecretRef01MarkdefUp0Name], applicationSecretRef01MarkdefUp0Value),
            $"expected {applicationSecretRef01MarkdefUp0Name} to be updated, got {applicationSecretRef01ResdataUp0[applicationSecretRef01MarkdefUp0Name]}");

        // REMOVE
        var applicationSecretRef01MatchRm0 = new Dictionary<string, object?>
        {
            ["id"] = applicationSecretRef01Data!["id"],
        };
        applicationSecretRef01Ent.Remove(applicationSecretRef01MatchRm0, null);

        // LIST
        var applicationSecretRef01MatchRt0 = new Dictionary<string, object?>();

        var applicationSecretRef01ListRt0Result = applicationSecretRef01Ent.List(applicationSecretRef01MatchRt0, null);
        var applicationSecretRef01ListRt0 = applicationSecretRef01ListRt0Result as List<object?>;
        Assert.True(applicationSecretRef01ListRt0 != null,
            $"expected list result to be a list, got {applicationSecretRef01ListRt0Result?.GetType()}");

        var applicationSecretRef01ListRt0NotFound = StructUtils.Select(
            TestRunner.EntityListToData(applicationSecretRef01ListRt0!),
            new Dictionary<string, object?> { ["id"] = applicationSecretRef01Data!["id"] });
        Assert.True(StructUtils.IsEmpty(applicationSecretRef01ListRt0NotFound),
            "expected removed entity to not be in list");

    }

    private static void BasicGetOnly(EntityTestSetup setup)
    {
        var client = setup.Client;

        // Bootstrap entity data from existing test data (no create step in flow).
        var applicationSecretRef01DataRaw = StructUtils.Items(
            Helpers.ToMapAny(StructUtils.GetPath(setup.Data, "existing.application_secret")));
        var applicationSecretRef01Data = applicationSecretRef01DataRaw.Count > 0
            ? Helpers.ToMapAny(applicationSecretRef01DataRaw[0][1])
            : null;

        // LIST
        var applicationSecretRef01Ent = client.ApplicationSecret();
        var applicationSecretRef01Match = new Dictionary<string, object?>();

        var applicationSecretRef01ListResult = applicationSecretRef01Ent.List(applicationSecretRef01Match, null);
        var applicationSecretRef01List = applicationSecretRef01ListResult as List<object?>;
        Assert.True(applicationSecretRef01List != null,
            $"expected list result to be a list, got {applicationSecretRef01ListResult?.GetType()}");

    }

    [Fact]
    public async Task Stream()
    {
        var setup = ApplicationSecretBasicSetup(new Dictionary<string, object?>
        {
            ["feature"] = new Dictionary<string, object?>
            {
                ["streaming"] = new Dictionary<string, object?> { ["active"] = true },
            },
        });
        if (setup.Live)
        {
            return; // unit mode only - streams the seeded fixture data
        }

        var ent = setup.Client.ApplicationSecret();
        var match = new Dictionary<string, object?>();

        // Materialised list result for the same op.
        var listed = ent.List(match, null) as List<object?> ?? new List<object?>();

        // stream("list") yields items via the streaming feature's iterator.
        var streamed = new List<object?>();
        await foreach (var item in ent.Stream("list", match, null))
        {
            streamed.Add(item);
        }
        Assert.True(streamed.Count > 0, "expected stream to yield items");
        Assert.Equal(listed.Count, streamed.Count);

        // Fallback: with streaming inactive, stream still yields the
        // materialised items.
        var setup2 = ApplicationSecretBasicSetup(null);
        var ent2 = setup2.Client.ApplicationSecret();
        var streamed2 = new List<object?>();
        await foreach (var item in ent2.Stream("list", match, null))
        {
            streamed2.Add(item);
        }
        Assert.Equal(listed.Count, streamed2.Count);
    }

    private sealed class FailHook : BaseFeature
    {
        public int Unexpected;

        public FailHook()
        {
            Name = "failhook";
            Version = "0.0.1";
            Active = true;
        }

        public override void PreSpec(Context ctx) =>
            throw new Exception("application_secret hook failed");

        public override void PreUnexpected(Context ctx) => Unexpected++;
    }

    [Fact]
    public async Task StreamError()
    {
        var offline = new Dictionary<string, object?> { ["net"] = new Dictionary<string, object?> { ["offline"] = true } };
        var err = await Assert.ThrowsAnyAsync<Exception>(async () =>
        {
            await foreach (var _ in Hook0SDK.TestSDK(offline, null).ApplicationSecret().Stream("list", null, null)) { }
        });
        Assert.Contains("offline", err.Message);

        await foreach (var _ in Hook0SDK.TestSDK(offline, null).ApplicationSecret().Stream("list", null,
            new Dictionary<string, object?> { ["ctrl"] = new Dictionary<string, object?> { ["throw"] = false } })) { }

        if (Fh.HasFeature("rbac"))
        {
            var denied = Hook0SDK.TestSDK(null,
                new Dictionary<string, object?> { ["feature"] = new Dictionary<string, object?> { ["rbac"] = new Dictionary<string, object?> { ["active"] = true, ["deny"] = true } } });
            var denyerr = await Assert.ThrowsAnyAsync<Hook0Error>(async () =>
            {
                await foreach (var _ in denied.ApplicationSecret().Stream("list", null, null)) { }
            });
            Assert.Equal("rbac_denied", denyerr.Code);
        }
    }

    [Fact]
    public async Task StreamCtrl()
    {
        var explain = new Dictionary<string, object?>();
        var ctrl = new Dictionary<string, object?> { ["explain"] = explain };
        await foreach (var _ in Hook0SDK.TestSDK(null, null).ApplicationSecret().Stream("list", null,
            new Dictionary<string, object?> { ["ctrl"] = ctrl })) { }
        Assert.Equal(new[] { "explain" }, ctrl.Keys.ToArray());
        Assert.Same(explain, ctrl["explain"]);
        Assert.NotEmpty(explain);
    }

    [Fact]
    public void Unexpected()
    {
        var hook = new FailHook();
        var client = new Hook0SDK(new Dictionary<string, object?>
        {
            ["feature"] = new Dictionary<string, object?> { ["test"] = new Dictionary<string, object?> { ["active"] = true } },
            ["extend"] = new List<object?> { hook },
        });

        var err = Assert.ThrowsAny<Exception>(() => client.ApplicationSecret().List(null, null));
        Assert.Contains("hook failed", err.Message);
        Assert.True(hook.Unexpected > 0);

        var fired = hook.Unexpected;
        client.ApplicationSecret().List(null, new Dictionary<string, object?> { ["throw"] = false });
        Assert.True(hook.Unexpected > fired);
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
        var err = Assert.ThrowsAny<Hook0Error>(() => client.ApplicationSecret().List(
            new Dictionary<string, object?> { ["application_id"] = 1 }, null));
        Assert.Equal("validate_failed", err.Code);
    }

    private static EntityTestSetup ApplicationSecretBasicSetup(
        Dictionary<string, object?>? extra)
    {
        TestRunner.LoadEnvLocal();

        var entityDataFile = Path.Combine(TestRunner.TestDir(),
            "..", "..", ".sdk", "test", "entity", "application_secret",
            "ApplicationSecretTestData.json");

        var entityDataEl = JsonSerializer.Deserialize<JsonElement>(
            File.ReadAllText(entityDataFile));
        var entityData = StructRunner.ConvertElement(entityDataEl)
            as Dictionary<string, object?>
            ?? throw new InvalidOperationException(
                "failed to parse application_secret test data");

        var options = new Dictionary<string, object?>
        {
            ["entity"] = entityData["existing"],
        };

        var client = Hook0SDK.TestSDK(options, extra);

        // Generate idmap via transform, matching the TS pattern.
        var idmap = StructUtils.Transform(
            new List<object?> { "application_secret01", "application_secret02", "application_secret03" },
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
            "HOOK0_TEST_APPLICATION_SECRET_ENTID") ?? "";
        var idmapOverridden = entidEnvRaw != "" &&
            entidEnvRaw.Trim().StartsWith("{");

        var env = TestRunner.EnvOverride(new Dictionary<string, object?>
        {
            ["HOOK0_TEST_APPLICATION_SECRET_ENTID"] = idmap,
            ["HOOK0_TEST_LIVE"] = "FALSE",
            ["HOOK0_TEST_EXPLAIN"] = "FALSE",
            ["HOOK0_APIKEY"] = "",
        });

        var idmapResolved = Helpers.ToMapAny(env["HOOK0_TEST_APPLICATION_SECRET_ENTID"])
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
