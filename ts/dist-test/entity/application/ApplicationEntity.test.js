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
(0, node_test_1.describe)('ApplicationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.Application();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'application.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "fo": "int32", "h": "Amount", "n": "amount", "r": true, "t": "`$INTEGER`", "key$": "amount", "index$": 0 }, "application_id": { "a": true, "fo": "uuid", "h": "Application Id", "n": "application_id", "r": true, "sh": "Unique identifier of the application.", "t": "`$STRING`", "key$": "application_id", "index$": 1 }, "application_name": { "a": true, "h": "Application Name", "n": "application_name", "r": true, "t": "`$STRING`", "key$": "application_name", "index$": 2 }, "consumption": { "a": true, "h": "Consumption", "n": "consumption", "r": true, "sh": "Current consumption metrics for this application.", "t": "`$OBJECT`", "key$": "consumption", "index$": 3 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": true, "t": "`$STRING`", "key$": "date", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "is_provisional": { "a": true, "h": "Is Provisional", "n": "is_provisional", "r": true, "t": "`$BOOLEAN`", "key$": "is_provisional", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the application.", "t": "`$STRING`", "key$": "name", "index$": 7 }, "onboarding_steps": { "a": true, "h": "Onboarding Steps", "n": "onboarding_steps", "r": true, "sh": "Onboarding completion status for this application.", "t": "`$OBJECT`", "key$": "onboarding_steps", "index$": 8 }, "organization_id": { "a": true, "fo": "uuid", "h": "Organization Id", "n": "organization_id", "r": true, "sh": "UUID of the organization this application belongs to.", "t": "`$STRING`", "key$": "organization_id", "index$": 9 }, "quotas": { "a": true, "h": "Quotas", "n": "quotas", "r": true, "sh": "Quota limits for this application.", "t": "`$OBJECT`", "key$": "quotas", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "application", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/applications/", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/applications/", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "applications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/events_per_day/application", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "application_id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "from", "or": "from", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "to", "or": "to", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/events_per_day/application", "q": { "exist": ["application_id", "from", "to"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "events_per_day" }, { "lit": "application" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/applications/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/applications/", "q": { "exist": ["organization_id"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "applications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/applications/{application_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/applications/{application_id}", "q": { "exist": ["id"] }, "r": { "param": { "application_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "applications" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/applications/{application_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/applications/{application_id}", "q": { "exist": ["id"] }, "r": { "param": { "application_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "applications" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /api/v1/applications/{application_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/applications/{application_id}", "q": { "exist": ["id"] }, "r": { "param": { "application_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "applications" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "application", "name__orig": "application", "Name": "Application", "name_": "application", "name-": "application", "NAME": "APPLICATION", "index$": 0 }, { "active": true, "entity": "application", "key$": "BasicApplicationFlow", "kind": "basic", "name": "BasicApplicationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "application_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "application_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "application_ref01", "srcdatavar": "application_ref01_data", "suffix": "_up0", "textfield": "application_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-application_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "application_ref01", "srcdatavar": "application_ref01_data", "suffix": "_dt0" }, "m": { "id": "application01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-application_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "application_ref01", "suffix": "_rm0" }, "m": { "id": "application01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "application_ref01" } }], "index$": 5 }] }, 'Application', { "POST /api/v1/applications/": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Request body to create a new application.", "type": "object", "properties": { "name": { "description": "Name of the application. Length: 2-50 characters.", "type": "string", "key$": "name" }, "organization_id": { "description": "UUID of the organization this application belongs to.", "type": "string", "format": "uuid", "key$": "organization_id" } }, "required": ["name", "organization_id"], "x-ref": "#/components/schemas/ApplicationPost", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/events_per_day/application": { "protocol": "http", "parameters": [{ "in": "query", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }, { "in": "query", "name": "from", "description": "Start of date range (inclusive). Defaults to 30 days before `to`.", "schema": { "type": "string", "format": "date" }, "style": "form", "index$": 1 }, { "in": "query", "name": "to", "description": "End of date range (inclusive). Defaults to today.", "schema": { "type": "string", "format": "date" }, "style": "form", "index$": 2 }] }, "GET /api/v1/applications/": { "protocol": "http", "parameters": [{ "in": "query", "name": "organization_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }] }, "GET /api/v1/applications/{application_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }] }, "DELETE /api/v1/applications/{application_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }] }, "PUT /api/v1/applications/{application_id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Request body to create a new application.", "type": "object", "properties": { "name": { "description": "Name of the application. Length: 2-50 characters.", "type": "string", "key$": "name" }, "organization_id": { "description": "UUID of the organization this application belongs to.", "type": "string", "format": "uuid", "key$": "organization_id" } }, "required": ["name", "organization_id"], "x-ref": "#/components/schemas/ApplicationPost", "index$": 1 } } }, "required": true }, "parameters": [{ "in": "path", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const application_ref01_ent = client.Application();
        let application_ref01_data = setup.data.new.application['application_ref01'];
        application_ref01_data = (await application_ref01_ent.create(application_ref01_data)).data();
        (0, node_assert_1.default)(null != application_ref01_data.id);
        // LIST
        const application_ref01_match = {};
        const application_ref01_list = (await application_ref01_ent.list(application_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(application_ref01_list, { id: application_ref01_data.id })));
        // UPDATE
        const application_ref01_data_up0 = {};
        application_ref01_data_up0.id = application_ref01_data.id;
        const application_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_ref01_' + setup.now };
        application_ref01_data_up0[application_ref01_markdef_up0.name] = application_ref01_markdef_up0.value;
        const application_ref01_resdata_up0 = (await application_ref01_ent.update(application_ref01_data_up0)).data();
        (0, node_assert_1.default)(application_ref01_resdata_up0.id === application_ref01_data_up0.id);
        (0, node_assert_1.default)(application_ref01_resdata_up0[application_ref01_markdef_up0.name] === application_ref01_markdef_up0.value);
        // LOAD
        const application_ref01_match_dt0 = {};
        application_ref01_match_dt0.id = application_ref01_data.id;
        const application_ref01_data_dt0 = (await application_ref01_ent.load(application_ref01_match_dt0)).data();
        (0, node_assert_1.default)(application_ref01_data_dt0.id === application_ref01_data.id);
        // REMOVE
        const application_ref01_match_rm0 = { id: application_ref01_data.id };
        await application_ref01_ent.remove(application_ref01_match_rm0);
        // LIST
        const application_ref01_match_rt0 = {};
        const application_ref01_list_rt0 = (await application_ref01_ent.list(application_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(application_ref01_list_rt0, { id: application_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/application/ApplicationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['application01', 'application02', 'application03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_APPLICATION_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_APPLICATION_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_APPLICATION_ENTID'];
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
//# sourceMappingURL=ApplicationEntity.test.js.map