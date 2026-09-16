"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('InstanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.Instance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'instance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "application_secret_compatibility", "req": true, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "auto_db_migration", "req": true, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "biscuit_public_key", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "cloudflare_turnstile_site_key", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "formbricks", "req": true, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "matomo", "req": true, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "format": "int32", "name": "password_minimum_length", "req": true, "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "quota_enforcement", "req": true, "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "name": "registration_disabled", "req": true, "type": "`$BOOLEAN`", "index$": 8 }, { "active": true, "name": "support_email_address", "req": true, "type": "`$STRING`", "index$": 9 }], "name": "instance", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/v1/instance/", "json": "{\"operationId\":\"instance.get\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_secret_compatibility\":{\"type\":\"boolean\"},\"auto_db_migration\":{\"type\":\"boolean\"},\"biscuit_public_key\":{\"type\":\"string\"},\"cloudflare_turnstile_site_key\":{\"type\":\"string\"},\"formbricks\":{\"properties\":{\"api_host\":{\"type\":\"string\"},\"environment_id\":{\"type\":\"string\"}},\"required\":[\"api_host\",\"environment_id\"],\"type\":\"object\"},\"matomo\":{\"properties\":{\"site_id\":{\"format\":\"int32\",\"type\":\"integer\"},\"url\":{\"type\":\"string\"}},\"required\":[\"site_id\",\"url\"],\"type\":\"object\"},\"password_minimum_length\":{\"format\":\"int32\",\"type\":\"integer\"},\"quota_enforcement\":{\"type\":\"boolean\"},\"registration_disabled\":{\"type\":\"boolean\"},\"support_email_address\":{\"type\":\"string\"}},\"required\":[\"application_secret_compatibility\",\"auto_db_migration\",\"biscuit_public_key\",\"password_minimum_length\",\"quota_enforcement\",\"registration_disabled\",\"support_email_address\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/v1/instance/", "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "instance" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "instance", "name__orig": "instance", "Name": "Instance", "name_": "instance", "name-": "instance", "NAME": "INSTANCE", "index$": 10 }, { "active": true, "entity": "instance", "key$": "BasicInstanceFlow", "kind": "basic", "name": "BasicInstanceFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "instance_ref01", "srcdatavar": "instance_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-instance_ref01" } }], "index$": 0 }] }, 'Instance');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let instance_ref01_data = Object.values(setup.data.existing.instance)[0];
        // LOAD
        const instance_ref01_ent = client.Instance();
        const instance_ref01_match_dt0 = {};
        const instance_ref01_data_dt0 = (await instance_ref01_ent.load(instance_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != instance_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/instance/InstanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['instance01', 'instance02', 'instance03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_INSTANCE_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_INSTANCE_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_INSTANCE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Hook0SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.HOOK0_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HOOK0_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=InstanceEntity.test.js.map