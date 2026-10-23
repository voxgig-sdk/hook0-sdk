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
(0, node_test_1.describe)('ApplicationSecretEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.ApplicationSecret();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('application_secret hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.Hook0SDK.test(offline).ApplicationSecret().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.Hook0SDK.test(offline).ApplicationSecret()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.Hook0SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApplicationSecret().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.Hook0SDK.test().ApplicationSecret().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.Hook0SDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApplicationSecret().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApplicationSecret().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.Hook0SDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApplicationSecret().list({ "application_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'application_secret.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "application_id": { "a": true, "fo": "uuid", "h": "Application Id", "n": "application_id", "r": true, "t": "`$STRING`", "key$": "application_id", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "t": "`$STRING`", "key$": "deleted_at", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 4 }, "token": { "a": true, "fo": "uuid", "h": "Token", "n": "token", "r": true, "t": "`$STRING`", "key$": "token", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "application_secret", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["application_id", "name"], "co": { "id": "POST /api/v1/application_secrets/", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/application_secrets/", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "application_secrets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/application_secrets/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "application_id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/application_secrets/", "q": { "exist": ["application_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "application_secrets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/application_secrets/{application_secret_token}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_secret_token", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "application_id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/application_secrets/{application_secret_token}", "q": { "exist": ["application_id", "id"] }, "r": { "param": { "application_secret_token": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "application_secrets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["application_id", "name"], "co": { "id": "PUT /api/v1/application_secrets/{application_secret_token}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_secret_token", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/application_secrets/{application_secret_token}", "q": { "exist": ["id"] }, "r": { "param": { "application_secret_token": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "application_secrets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "application_secret", "name__orig": "application_secret", "Name": "ApplicationSecret", "name_": "application_secret", "name-": "application-secret", "NAME": "APPLICATION_SECRET", "index$": 1 }, { "active": true, "entity": "application_secret", "key$": "BasicApplicationSecretFlow", "kind": "basic", "name": "BasicApplicationSecretFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "application_secret_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "application_secret_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "application_secret_ref01", "srcdatavar": "application_secret_ref01_data", "suffix": "_up0", "textfield": "application_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-application_secret_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "application_secret_ref01", "suffix": "_rm0" }, "m": { "id": "application_secret01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "application_secret_ref01" } }], "index$": 4 }] }, 'ApplicationSecret', { "POST /api/v1/application_secrets/": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "application_id": { "type": "string", "format": "uuid", "key$": "application_id" }, "name": { "type": "string", "key$": "name" } }, "required": ["application_id"], "x-ref": "#/components/schemas/ApplicationSecretPost", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/application_secrets/": { "protocol": "http", "parameters": [{ "in": "query", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }] }, "DELETE /api/v1/application_secrets/{application_secret_token}": { "protocol": "http", "parameters": [{ "in": "path", "name": "application_secret_token", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }, { "in": "query", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 1 }] }, "PUT /api/v1/application_secrets/{application_secret_token}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "application_id": { "type": "string", "format": "uuid", "key$": "application_id" }, "name": { "type": "string", "key$": "name" } }, "required": ["application_id"], "x-ref": "#/components/schemas/ApplicationSecretPost", "index$": 1 } } }, "required": true }, "parameters": [{ "in": "path", "name": "application_secret_token", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const application_secret_ref01_ent = client.ApplicationSecret();
        let application_secret_ref01_data = setup.data.new.application_secret['application_secret_ref01'];
        application_secret_ref01_data = (await application_secret_ref01_ent.create(application_secret_ref01_data)).data();
        (0, node_assert_1.default)(null != application_secret_ref01_data.id);
        // LIST
        const application_secret_ref01_match = {};
        const application_secret_ref01_list = (await application_secret_ref01_ent.list(application_secret_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(application_secret_ref01_list, { id: application_secret_ref01_data.id })));
        // UPDATE
        const application_secret_ref01_data_up0 = {};
        application_secret_ref01_data_up0.id = application_secret_ref01_data.id;
        const application_secret_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_secret_ref01_' + setup.now };
        application_secret_ref01_data_up0[application_secret_ref01_markdef_up0.name] = application_secret_ref01_markdef_up0.value;
        const application_secret_ref01_resdata_up0 = (await application_secret_ref01_ent.update(application_secret_ref01_data_up0)).data();
        (0, node_assert_1.default)(application_secret_ref01_resdata_up0.id === application_secret_ref01_data_up0.id);
        (0, node_assert_1.default)(application_secret_ref01_resdata_up0[application_secret_ref01_markdef_up0.name] === application_secret_ref01_markdef_up0.value);
        // REMOVE
        const application_secret_ref01_match_rm0 = { id: application_secret_ref01_data.id };
        await application_secret_ref01_ent.remove(application_secret_ref01_match_rm0);
        // LIST
        const application_secret_ref01_match_rt0 = {};
        const application_secret_ref01_list_rt0 = (await application_secret_ref01_ent.list(application_secret_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(application_secret_ref01_list_rt0, { id: application_secret_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/application_secret/ApplicationSecretTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['application_secret01', 'application_secret02', 'application_secret03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_APPLICATION_SECRET_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_APPLICATION_SECRET_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_APPLICATION_SECRET_ENTID'];
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
//# sourceMappingURL=ApplicationSecretEntity.test.js.map