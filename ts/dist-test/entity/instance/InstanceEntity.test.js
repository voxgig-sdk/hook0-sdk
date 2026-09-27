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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "application_secret_compatibility": { "a": true, "h": "Application Secret Compatibility", "n": "application_secret_compatibility", "r": true, "t": "`$BOOLEAN`", "key$": "application_secret_compatibility", "index$": 0 }, "auto_db_migration": { "a": true, "h": "Auto Db Migration", "n": "auto_db_migration", "r": true, "t": "`$BOOLEAN`", "key$": "auto_db_migration", "index$": 1 }, "biscuit_public_key": { "a": true, "h": "Biscuit Public Key", "n": "biscuit_public_key", "r": true, "t": "`$STRING`", "key$": "biscuit_public_key", "index$": 2 }, "cloudflare_turnstile_site_key": { "a": true, "h": "Cloudflare Turnstile Site Key", "n": "cloudflare_turnstile_site_key", "r": false, "t": "`$STRING`", "key$": "cloudflare_turnstile_site_key", "index$": 3 }, "formbricks": { "a": true, "h": "Formbricks", "n": "formbricks", "r": true, "t": "`$OBJECT`", "key$": "formbricks", "index$": 4 }, "matomo": { "a": true, "h": "Matomo", "n": "matomo", "r": true, "t": "`$OBJECT`", "key$": "matomo", "index$": 5 }, "password_minimum_length": { "a": true, "fo": "int32", "h": "Password Minimum Length", "n": "password_minimum_length", "r": true, "t": "`$INTEGER`", "key$": "password_minimum_length", "index$": 6 }, "quota_enforcement": { "a": true, "h": "Quota Enforcement", "n": "quota_enforcement", "r": true, "t": "`$BOOLEAN`", "key$": "quota_enforcement", "index$": 7 }, "registration_disabled": { "a": true, "h": "Registration Disabled", "n": "registration_disabled", "r": true, "t": "`$BOOLEAN`", "key$": "registration_disabled", "index$": 8 }, "support_email_address": { "a": true, "h": "Support Email Address", "n": "support_email_address", "r": true, "t": "`$STRING`", "key$": "support_email_address", "index$": 9 } }, "name": "instance", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/instance/", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/instance/", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "instance" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "instance", "name__orig": "instance", "Name": "Instance", "name_": "instance", "name-": "instance", "NAME": "INSTANCE", "index$": 9 }, { "active": true, "entity": "instance", "key$": "BasicInstanceFlow", "kind": "basic", "name": "BasicInstanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "instance_ref01", "srcdatavar": "instance_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-instance_ref01" } }], "index$": 0 }] }, 'Instance', { "GET /api/v1/instance/": { "protocol": "http", "parameters": [] } });
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