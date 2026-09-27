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
(0, node_test_1.describe)('RequestAttemptEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.RequestAttempt();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'request_attempt.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "delay_until": { "a": true, "fo": "date-time", "h": "Delay Until", "n": "delay_until", "r": false, "t": "`$STRING`", "key$": "delay_until", "index$": 1 }, "event": { "a": true, "h": "Event", "n": "event", "r": true, "t": "`$OBJECT`", "key$": "event", "index$": 2 }, "event_id": { "a": true, "fo": "uuid", "h": "Event Id", "n": "event_id", "r": true, "t": "`$STRING`", "key$": "event_id", "index$": 3 }, "failed_at": { "a": true, "fo": "date-time", "h": "Failed At", "n": "failed_at", "r": false, "t": "`$STRING`", "key$": "failed_at", "index$": 4 }, "http_response_status": { "a": true, "fo": "int32", "h": "Http Response Status", "n": "http_response_status", "r": false, "t": "`$INTEGER`", "key$": "http_response_status", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "picked_at": { "a": true, "fo": "date-time", "h": "Picked At", "n": "picked_at", "r": false, "t": "`$STRING`", "key$": "picked_at", "index$": 7 }, "request_attempt_id": { "a": true, "fo": "uuid", "h": "Request Attempt Id", "n": "request_attempt_id", "r": true, "t": "`$STRING`", "key$": "request_attempt_id", "index$": 8 }, "response_id": { "a": true, "fo": "uuid", "h": "Response Id", "n": "response_id", "r": false, "t": "`$STRING`", "key$": "response_id", "index$": 9 }, "retry_count": { "a": true, "fo": "int32", "h": "Retry Count", "n": "retry_count", "r": true, "t": "`$INTEGER`", "key$": "retry_count", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Status of a request attempt.", "t": "`$OBJECT`", "key$": "status", "index$": 11 }, "subscription": { "a": true, "h": "Subscription", "n": "subscription", "r": true, "t": "`$OBJECT`", "key$": "subscription", "index$": 12 }, "succeeded_at": { "a": true, "fo": "date-time", "h": "Succeeded At", "n": "succeeded_at", "r": false, "t": "`$STRING`", "key$": "succeeded_at", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "request_attempt", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/request_attempts/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "application_id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "event_event_type_name", "or": "event_event_type_name", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "event_id", "or": "event_id", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "max_created_at", "or": "max_created_at", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "min_created_at", "or": "min_created_at", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "pagination_cursor", "or": "pagination_cursor", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "subscription_id", "or": "subscription_id", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/request_attempts/", "q": { "exist": ["application_id", "event_event_type_name", "event_id", "max_created_at", "min_created_at", "pagination_cursor", "subscription_id"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "request_attempts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/request_attempts/{request_attempt_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "request_attempt_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "application_id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/request_attempts/{request_attempt_id}", "q": { "exist": ["application_id", "id"] }, "r": { "param": { "request_attempt_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "request_attempts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "request_attempt", "name__orig": "request_attempt", "Name": "RequestAttempt", "name_": "request_attempt", "name-": "request-attempt", "NAME": "REQUEST_ATTEMPT", "index$": 16 }, { "active": true, "entity": "request_attempt", "key$": "BasicRequestAttemptFlow", "kind": "basic", "name": "BasicRequestAttemptFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "request_attempt_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "request_attempt_ref01", "srcdatavar": "request_attempt_ref01_data", "suffix": "_dt0" }, "m": { "id": "request_attempt01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-request_attempt_ref01" } }], "index$": 1 }] }, 'RequestAttempt', { "GET /api/v1/request_attempts/": { "protocol": "http", "parameters": [{ "in": "query", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }, { "in": "query", "name": "event.event_type_names", "description": "Comma-separated event types", "schema": { "type": "string" }, "style": "form", "index$": 1 }, { "in": "query", "name": "event_id", "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 2 }, { "in": "query", "name": "max_created_at", "schema": { "type": "string", "format": "date-time" }, "style": "form", "index$": 3 }, { "in": "query", "name": "min_created_at", "schema": { "type": "string", "format": "date-time" }, "style": "form", "index$": 4 }, { "in": "query", "name": "pagination_cursor", "schema": { "type": "string" }, "style": "form", "index$": 5 }, { "in": "query", "name": "subscription_id", "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 6 }] }, "GET /api/v1/request_attempts/{request_attempt_id}": { "protocol": "http", "parameters": [{ "in": "query", "name": "application_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "form", "index$": 0 }, { "in": "path", "name": "request_attempt_id", "required": true, "schema": { "type": "string", "format": "uuid" }, "style": "simple", "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let request_attempt_ref01_data = Object.values(setup.data.existing.request_attempt)[0];
        // LIST
        const request_attempt_ref01_ent = client.RequestAttempt();
        const request_attempt_ref01_match = {};
        const request_attempt_ref01_list = (await request_attempt_ref01_ent.list(request_attempt_ref01_match)).map((e) => e.data());
        // LOAD
        const request_attempt_ref01_match_dt0 = {};
        request_attempt_ref01_match_dt0.id = request_attempt_ref01_data.id;
        const request_attempt_ref01_data_dt0 = (await request_attempt_ref01_ent.load(request_attempt_ref01_match_dt0)).data();
        (0, node_assert_1.default)(request_attempt_ref01_data_dt0.id === request_attempt_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/request_attempt/RequestAttemptTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['request_attempt01', 'request_attempt02', 'request_attempt03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_REQUEST_ATTEMPT_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_REQUEST_ATTEMPT_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_REQUEST_ATTEMPT_ENTID'];
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
//# sourceMappingURL=RequestAttemptEntity.test.js.map