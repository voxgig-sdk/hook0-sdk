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
(0, node_test_1.describe)('ServiceTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.ServiceToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'service_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "biscuit": { "a": true, "h": "Biscuit", "n": "biscuit", "r": true, "t": "`$STRING`", "key$": "biscuit", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 3 }, "organization_id": { "a": true, "fo": "uuid", "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 4 }, "token_id": { "a": true, "fo": "uuid", "h": "Token Id", "n": "token_id", "r": true, "t": "`$STRING`", "key$": "token_id", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "service_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/service_token/", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/service_token/", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "service_token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/service_token/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/service_token/", "q": { "exist": ["organization_id"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "service_token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/service_token/{service_token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "service_token_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/service_token/{service_token_id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "service_token_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "service_token" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/service_token/{service_token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "service_token_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/service_token/{service_token_id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "service_token_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "service_token" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /api/v1/service_token/{service_token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "service_token_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/service_token/{service_token_id}", "q": { "exist": ["id"] }, "r": { "param": { "service_token_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "service_token" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "service_token", "name__orig": "service_token", "Name": "ServiceToken", "name_": "service_token", "name-": "service-token", "NAME": "SERVICE_TOKEN", "index$": 19 }, { "active": true, "entity": "service_token", "key$": "BasicServiceTokenFlow", "kind": "basic", "name": "BasicServiceTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "service_token_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "service_token_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "service_token_ref01", "srcdatavar": "service_token_ref01_data", "suffix": "_up0", "textfield": "biscuit" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-service_token_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "service_token_ref01", "srcdatavar": "service_token_ref01_data", "suffix": "_dt0" }, "m": { "id": "service_token01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-service_token_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "service_token_ref01", "suffix": "_rm0" }, "m": { "id": "service_token01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "service_token_ref01" } }], "index$": 5 }] }, 'ServiceToken', { "POST /api/v1/service_token/": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "organization_id": { "type": "string", "format": "uuid", "key$": "organization_id" } }, "required": ["name", "organization_id"], "x-ref": "#/components/schemas/ServiceTokenPost", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/service_token/": { "protocol": "http", "parameters": [{ "in": "query", "name": "organization_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }] }, "GET /api/v1/service_token/{service_token_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "service_token_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }, { "in": "query", "name": "organization_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 1 }] }, "DELETE /api/v1/service_token/{service_token_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "service_token_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }, { "in": "query", "name": "organization_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 1 }] }, "PUT /api/v1/service_token/{service_token_id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "organization_id": { "type": "string", "format": "uuid", "key$": "organization_id" } }, "required": ["name", "organization_id"], "x-ref": "#/components/schemas/ServiceTokenPost", "index$": 1 } } }, "required": true }, "parameters": [{ "in": "path", "name": "service_token_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const service_token_ref01_ent = client.ServiceToken();
        let service_token_ref01_data = setup.data.new.service_token['service_token_ref01'];
        service_token_ref01_data = (await service_token_ref01_ent.create(service_token_ref01_data)).data();
        (0, node_assert_1.default)(null != service_token_ref01_data.id);
        // LIST
        const service_token_ref01_match = {};
        const service_token_ref01_list = (await service_token_ref01_ent.list(service_token_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(service_token_ref01_list, { id: service_token_ref01_data.id })));
        // UPDATE
        const service_token_ref01_data_up0 = {};
        service_token_ref01_data_up0.id = service_token_ref01_data.id;
        const service_token_ref01_markdef_up0 = { name: 'biscuit', value: 'Mark01-service_token_ref01_' + setup.now };
        service_token_ref01_data_up0[service_token_ref01_markdef_up0.name] = service_token_ref01_markdef_up0.value;
        const service_token_ref01_resdata_up0 = (await service_token_ref01_ent.update(service_token_ref01_data_up0)).data();
        (0, node_assert_1.default)(service_token_ref01_resdata_up0.id === service_token_ref01_data_up0.id);
        (0, node_assert_1.default)(service_token_ref01_resdata_up0[service_token_ref01_markdef_up0.name] === service_token_ref01_markdef_up0.value);
        // LOAD
        const service_token_ref01_match_dt0 = {};
        service_token_ref01_match_dt0.id = service_token_ref01_data.id;
        const service_token_ref01_data_dt0 = (await service_token_ref01_ent.load(service_token_ref01_match_dt0)).data();
        (0, node_assert_1.default)(service_token_ref01_data_dt0.id === service_token_ref01_data.id);
        // REMOVE
        const service_token_ref01_match_rm0 = { id: service_token_ref01_data.id };
        await service_token_ref01_ent.remove(service_token_ref01_match_rm0);
        // LIST
        const service_token_ref01_match_rt0 = {};
        const service_token_ref01_list_rt0 = (await service_token_ref01_ent.list(service_token_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(service_token_ref01_list_rt0, { id: service_token_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/service_token/ServiceTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['service_token01', 'service_token02', 'service_token03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_SERVICE_TOKEN_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_SERVICE_TOKEN_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_SERVICE_TOKEN_ENTID'];
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
//# sourceMappingURL=ServiceTokenEntity.test.js.map