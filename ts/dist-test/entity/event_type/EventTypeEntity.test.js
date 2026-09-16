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
(0, node_test_1.describe)('EventTypeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.EventType();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'event_type.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "uuid", "name": "application_id", "req": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "event_type_name", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "resource_type", "req": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "resource_type_name", "req": true, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "service", "req": true, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "service_name", "req": true, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "verb", "req": true, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "verb_name", "req": true, "type": "`$STRING`", "index$": 8 }], "id": { "field": "id", "name": "id" }, "name": "event_type", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/v1/event_types/", "json": "{\"operationId\":\"eventTypes.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"resource_type\":{\"type\":\"string\"},\"service\":{\"type\":\"string\"},\"verb\":{\"type\":\"string\"}},\"required\":[\"application_id\",\"resource_type\",\"service\",\"verb\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"event_type_name\":{\"type\":\"string\"},\"resource_type_name\":{\"type\":\"string\"},\"service_name\":{\"type\":\"string\"},\"verb_name\":{\"type\":\"string\"}},\"required\":[\"event_type_name\",\"resource_type_name\",\"service_name\",\"verb_name\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/v1/event_types/", "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "event_types" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "application_id", "orig": "application_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/v1/event_types/", "json": "{\"operationId\":\"eventTypes.list\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"event_type_name\":{\"type\":\"string\"},\"resource_type_name\":{\"type\":\"string\"},\"service_name\":{\"type\":\"string\"},\"verb_name\":{\"type\":\"string\"}},\"required\":[\"event_type_name\",\"resource_type_name\",\"service_name\",\"verb_name\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/v1/event_types/", "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "event_types" }], "select": { "exist": ["application_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "event_type_name", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "application_id", "orig": "application_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/v1/event_types/{event_type_name}", "json": "{\"operationId\":\"eventTypes.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"event_type_name\",\"required\":true,\"schema\":{\"type\":\"string\"},\"style\":\"simple\"},{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"event_type_name\":{\"type\":\"string\"},\"resource_type_name\":{\"type\":\"string\"},\"service_name\":{\"type\":\"string\"},\"verb_name\":{\"type\":\"string\"}},\"required\":[\"event_type_name\",\"resource_type_name\",\"service_name\",\"verb_name\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/v1/event_types/{event_type_name}", "rename": { "param": { "event_type_name": "id" } }, "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "event_types" }, { "var": "id" }], "select": { "exist": ["application_id", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "event_type", "name__orig": "event_type", "Name": "EventType", "name_": "event_type", "name-": "event-type", "NAME": "EVENT_TYPE", "index$": 4 }, { "active": true, "entity": "event_type", "key$": "BasicEventTypeFlow", "kind": "basic", "name": "BasicEventTypeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "event_type_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "event_type_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "event_type_ref01", "srcdatavar": "event_type_ref01_data", "suffix": "_dt0" }, "match": { "id": "event_type01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-event_type_ref01" } }], "index$": 2 }] }, 'EventType');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const event_type_ref01_ent = client.EventType();
        let event_type_ref01_data = setup.data.new.event_type['event_type_ref01'];
        event_type_ref01_data = (await event_type_ref01_ent.create(event_type_ref01_data)).data();
        (0, node_assert_1.default)(null != event_type_ref01_data.id);
        // LIST
        const event_type_ref01_match = {};
        const event_type_ref01_list = (await event_type_ref01_ent.list(event_type_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(event_type_ref01_list, { id: event_type_ref01_data.id })));
        // LOAD
        const event_type_ref01_match_dt0 = {};
        event_type_ref01_match_dt0.id = event_type_ref01_data.id;
        const event_type_ref01_data_dt0 = (await event_type_ref01_ent.load(event_type_ref01_match_dt0)).data();
        (0, node_assert_1.default)(event_type_ref01_data_dt0.id === event_type_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/event_type/EventTypeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['event_type01', 'event_type02', 'event_type03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_EVENT_TYPE_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_EVENT_TYPE_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_EVENT_TYPE_ENTID'];
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
//# sourceMappingURL=EventTypeEntity.test.js.map