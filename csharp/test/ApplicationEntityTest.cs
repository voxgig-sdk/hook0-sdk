// application entity test - basic flow (generated from the API model).

using System.Text.Json;

using Hook0Sdk.Feature;
using Voxgig.Struct;
using Xunit;

namespace Hook0Sdk.Test;

public class ApplicationEntityTest
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
        var ent = testsdk.Application();
        Assert.NotNull(ent);
    }

    [Fact]
    public void Basic()
    {
        var setup = ApplicationBasicSetup(null);
        // Per-op sdk-test-control.json skip - basic test exercises a flow
        // with multiple ops; skipping any op skips the whole flow.
        var _mode = setup.Live ? "live" : "unit";
        foreach (var _op in new[] { "create", "list", "update", "load", "remove" })
        {
            var (_shouldSkip, _) = TestRunner.IsControlSkipped(
                "entityOp", "application." + _op, _mode);
            if (_shouldSkip)
            {
                return; // skipped via sdk-test-control.json
            }
        }
        if (setup.Live && Environment.GetEnvironmentVariable("VOXGIG_GETONLY_GUARD") == "TRUE")
        {
            Console.WriteLine("LIVE STEP {\"id\":\"application.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/applications/\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/applications/{application_id}\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/applications/{application_id}\"}");
            Console.WriteLine("LIVE STEP {\"id\":\"application.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}");
            BasicGetOnly(setup);
            return;
        }

        var client = setup.Client;

        // CREATE
        var applicationRef01Ent = client.Application();
        var applicationRef01Data = Helpers.ToMapAny(StructUtils.GetProp(
            StructUtils.GetPath(setup.Data, StructUtils.Jt("new", "application")),
            "application_ref01"));

        var applicationRef01DataResult = applicationRef01Ent.Create(applicationRef01Data, null);
        applicationRef01Data = Helpers.ToMapAny(applicationRef01DataResult is IEntity ce ? ce.Data() : applicationRef01DataResult);
        Assert.True(applicationRef01Data != null, "expected create result to be a map");
        Assert.True(applicationRef01Data!["id"] != null, "expected created entity to have an id");

        // LIST
        var applicationRef01Match = new Dictionary<string, object?>();

        var applicationRef01ListResult = applicationRef01Ent.List(applicationRef01Match, null);
        var applicationRef01List = applicationRef01ListResult as List<object?>;
        Assert.True(applicationRef01List != null,
            $"expected list result to be a list, got {applicationRef01ListResult?.GetType()}");

        var applicationRef01ListFound = StructUtils.Select(
            TestRunner.EntityListToData(applicationRef01List!),
            new Dictionary<string, object?> { ["id"] = applicationRef01Data!["id"] });
        Assert.False(StructUtils.IsEmpty(applicationRef01ListFound),
            "expected to find created entity in list");

        // UPDATE
        var applicationRef01DataUp0Up = new Dictionary<string, object?>
        {
            ["id"] = applicationRef01Data!["id"],
        };

        var applicationRef01MarkdefUp0Name = "application_id";
        var applicationRef01MarkdefUp0Value = $"Mark01-application_ref01_{setup.Now}";
        applicationRef01DataUp0Up[applicationRef01MarkdefUp0Name] = applicationRef01MarkdefUp0Value;

        var applicationRef01ResdataUp0Result = applicationRef01Ent.Update(applicationRef01DataUp0Up, null);
        var applicationRef01ResdataUp0 = Helpers.ToMapAny(applicationRef01ResdataUp0Result is IEntity ue ? ue.Data() : applicationRef01ResdataUp0Result);
        Assert.True(applicationRef01ResdataUp0 != null, "expected update result to be a map");
        Assert.True(StructRunner.DeepEqual(applicationRef01ResdataUp0!["id"], applicationRef01DataUp0Up["id"]),
            "expected update result id to match");
        Assert.True(Equals(applicationRef01ResdataUp0![applicationRef01MarkdefUp0Name], applicationRef01MarkdefUp0Value),
            $"expected {applicationRef01MarkdefUp0Name} to be updated, got {applicationRef01ResdataUp0[applicationRef01MarkdefUp0Name]}");

        // LOAD
        var applicationRef01MatchDt0 = new Dictionary<string, object?>
        {
            ["id"] = applicationRef01Data!["id"],
        };
        var applicationRef01DataDt0Loaded = applicationRef01Ent.Load(applicationRef01MatchDt0, null);
        var applicationRef01DataDt0LoadResult = Helpers.ToMapAny(applicationRef01DataDt0Loaded is IEntity le ? le.Data() : applicationRef01DataDt0Loaded);
        Assert.True(applicationRef01DataDt0LoadResult != null, "expected load result to be a map");
        Assert.True(StructRunner.DeepEqual(applicationRef01DataDt0LoadResult!["id"], applicationRef01Data["id"]),
            "expected load result id to match");

        // REMOVE
        var applicationRef01MatchRm0 = new Dictionary<string, object?>
        {
            ["id"] = applicationRef01Data!["id"],
        };
        applicationRef01Ent.Remove(applicationRef01MatchRm0, null);

        // LIST
        var applicationRef01MatchRt0 = new Dictionary<string, object?>();

        var applicationRef01ListRt0Result = applicationRef01Ent.List(applicationRef01MatchRt0, null);
        var applicationRef01ListRt0 = applicationRef01ListRt0Result as List<object?>;
        Assert.True(applicationRef01ListRt0 != null,
            $"expected list result to be a list, got {applicationRef01ListRt0Result?.GetType()}");

        var applicationRef01ListRt0NotFound = StructUtils.Select(
            TestRunner.EntityListToData(applicationRef01ListRt0!),
            new Dictionary<string, object?> { ["id"] = applicationRef01Data!["id"] });
        Assert.True(StructUtils.IsEmpty(applicationRef01ListRt0NotFound),
            "expected removed entity to not be in list");

    }

    private static void BasicGetOnly(EntityTestSetup setup)
    {
        var client = setup.Client;
        if (setup.Live && !TestRunner.LiveExisting(setup.Data, LIVE_STRICT, "application",
            () => client.Application().List(new Dictionary<string, object?> { }, null)))
        {
            return;
        }

        // Bootstrap entity data from existing test data (no create step in flow).
        var applicationRef01DataRaw = StructUtils.Items(
            Helpers.ToMapAny(StructUtils.GetPath(setup.Data, "existing.application")));
        var applicationRef01Data = applicationRef01DataRaw.Count > 0
            ? Helpers.ToMapAny(applicationRef01DataRaw[0][1])
            : null;

        // LIST
        var applicationRef01Ent = client.Application();
        var applicationRef01Match = new Dictionary<string, object?>();

        var applicationRef01ListResult = applicationRef01Ent.List(applicationRef01Match, null);
        var applicationRef01List = applicationRef01ListResult as List<object?>;
        Assert.True(applicationRef01List != null,
            $"expected list result to be a list, got {applicationRef01ListResult?.GetType()}");

        // LOAD
        var applicationRef01MatchDt0 = new Dictionary<string, object?>
        {
            ["id"] = applicationRef01Data!["id"],
        };
        var applicationRef01DataDt0Loaded = applicationRef01Ent.Load(applicationRef01MatchDt0, null);
        var applicationRef01DataDt0LoadResult = Helpers.ToMapAny(applicationRef01DataDt0Loaded is IEntity le ? le.Data() : applicationRef01DataDt0Loaded);
        Assert.True(applicationRef01DataDt0LoadResult != null, "expected load result to be a map");
        Assert.True(StructRunner.DeepEqual(applicationRef01DataDt0LoadResult!["id"], applicationRef01Data["id"]),
            "expected load result id to match");

    }

    [Fact]
    public async Task Stream()
    {
        var setup = ApplicationBasicSetup(new Dictionary<string, object?>
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

        var ent = setup.Client.Application();
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
        var setup2 = ApplicationBasicSetup(null);
        var ent2 = setup2.Client.Application();
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
            throw new Exception("application hook failed");

        public override void PreUnexpected(Context ctx) => Unexpected++;
    }

    [Fact]
    public async Task StreamError()
    {
        var offline = new Dictionary<string, object?> { ["net"] = new Dictionary<string, object?> { ["offline"] = true } };
        var err = await Assert.ThrowsAnyAsync<Exception>(async () =>
        {
            await foreach (var _ in Hook0SDK.TestSDK(offline, null).Application().Stream("list", null, null)) { }
        });
        Assert.Contains("offline", err.Message);

        await foreach (var _ in Hook0SDK.TestSDK(offline, null).Application().Stream("list", null,
            new Dictionary<string, object?> { ["ctrl"] = new Dictionary<string, object?> { ["throw"] = false } })) { }

        if (Fh.HasFeature("rbac"))
        {
            var denied = Hook0SDK.TestSDK(null,
                new Dictionary<string, object?> { ["feature"] = new Dictionary<string, object?> { ["rbac"] = new Dictionary<string, object?> { ["active"] = true, ["deny"] = true } } });
            var denyerr = await Assert.ThrowsAnyAsync<Hook0Error>(async () =>
            {
                await foreach (var _ in denied.Application().Stream("list", null, null)) { }
            });
            Assert.Equal("rbac_denied", denyerr.Code);
        }
    }

    [Fact]
    public async Task StreamCtrl()
    {
        var explain = new Dictionary<string, object?>();
        var ctrl = new Dictionary<string, object?> { ["explain"] = explain };
        await foreach (var _ in Hook0SDK.TestSDK(null, null).Application().Stream("list", null,
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

        var err = Assert.ThrowsAny<Exception>(() => client.Application().List(null, null));
        Assert.Contains("hook failed", err.Message);
        Assert.True(hook.Unexpected > 0);

        var fired = hook.Unexpected;
        client.Application().List(null, new Dictionary<string, object?> { ["throw"] = false });
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
        var err = Assert.ThrowsAny<Hook0Error>(() => client.Application().List(
            new Dictionary<string, object?> { ["organization_id"] = 1 }, null));
        Assert.Equal("validate_failed", err.Code);
    }

    private static EntityTestSetup ApplicationBasicSetup(
        Dictionary<string, object?>? extra)
    {
        TestRunner.LoadEnvLocal();

        var entityDataFile = Path.Combine(TestRunner.TestDir(),
            "..", "..", ".sdk", "test", "entity", "application",
            "ApplicationTestData.json");

        var entityDataEl = JsonSerializer.Deserialize<JsonElement>(
            File.ReadAllText(entityDataFile));
        var entityData = StructRunner.ConvertElement(entityDataEl)
            as Dictionary<string, object?>
            ?? throw new InvalidOperationException(
                "failed to parse application test data");

        var options = new Dictionary<string, object?>
        {
            ["entity"] = entityData["existing"],
        };

        var client = Hook0SDK.TestSDK(options, extra);

        // Generate idmap via transform, matching the TS pattern.
        var idmap = StructUtils.Transform(
            new List<object?> { "application01", "application02", "application03" },
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
            "HOOK0_TEST_APPLICATION_ENTID") ?? "";
        var idmapOverridden = entidEnvRaw != "" &&
            entidEnvRaw.Trim().StartsWith("{");

        var env = TestRunner.EnvOverride(new Dictionary<string, object?>
        {
            ["HOOK0_TEST_APPLICATION_ENTID"] = idmap,
            ["HOOK0_TEST_LIVE"] = "FALSE",
            ["HOOK0_TEST_EXPLAIN"] = "FALSE",
            ["HOOK0_APIKEY"] = "",
        });

        var idmapResolved = Helpers.ToMapAny(env["HOOK0_TEST_APPLICATION_ENTID"])
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
