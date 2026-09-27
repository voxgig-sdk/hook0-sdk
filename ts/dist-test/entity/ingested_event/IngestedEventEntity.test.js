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
(0, node_test_1.describe)('IngestedEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOOK0_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Hook0SDK.test();
        const ent = testsdk.IngestedEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOOK0_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ingested_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "application_id": { "a": true, "fo": "uuid", "h": "Application Id", "n": "application_id", "r": true, "sh": "UUID of the application this event belongs to.", "t": "`$STRING`", "key$": "application_id", "index$": 0 }, "event_id": { "a": true, "fo": "uuid", "h": "Event Id", "n": "event_id", "r": false, "sh": "Optional unique identifier for this event (client-generated UUID).", "t": "`$STRING`", "key$": "event_id", "index$": 1 }, "event_type": { "a": true, "h": "Event Type", "n": "event_type", "r": true, "sh": "The type of event (e.g., 'user.created', 'order.completed').", "t": "`$STRING`", "key$": "event_type", "index$": 2 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": true, "sh": "Labels for event filtering and routing to subscriptions.", "t": "`$OBJECT`", "key$": "labels", "index$": 3 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Optional metadata key-value pairs associated with the event.", "t": "`$OBJECT`", "key$": "metadata", "index$": 4 }, "occurred_at": { "a": true, "fo": "date-time", "h": "Occurred At", "n": "occurred_at", "r": true, "sh": "Timestamp when the event occurred.", "t": "`$STRING`", "key$": "occurred_at", "index$": 5 }, "payload": { "a": true, "h": "Payload", "n": "payload", "r": true, "sh": "The event payload.", "t": "`$STRING`", "key$": "payload", "index$": 6 }, "payload_content_type": { "a": true, "h": "Payload Content Type", "n": "payload_content_type", "r": true, "sh": "Content type of the payload.", "t": "`$STRING`", "key$": "payload_content_type", "index$": 7 } }, "name": "ingested_event", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/event/", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/event/", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "event" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "ingested_event", "name__orig": "ingested_event", "Name": "IngestedEvent", "name_": "ingested_event", "name-": "ingested-event", "NAME": "INGESTED_EVENT", "index$": 8 }, { "active": true, "entity": "ingested_event", "key$": "BasicIngestedEventFlow", "kind": "basic", "name": "BasicIngestedEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ingested_event_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'IngestedEvent', { "POST /api/v1/event/": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Event to be ingested into Hook0.", "type": "object", "properties": { "application_id": { "description": "UUID of the application this event belongs to.", "type": "string", "format": "uuid", "key$": "application_id" }, "event_id": { "description": "Optional unique identifier for this event (client-generated UUID). If not provided, a UUIDv7 will be generated by the server.", "type": "string", "format": "uuid", "key$": "event_id" }, "event_type": { "description": "The type of event (e.g., 'user.created', 'order.completed'). Length: 1-200 characters.", "type": "string", "key$": "event_type" }, "labels": { "description": "Labels for event filtering and routing to subscriptions.", "type": "object", "additionalProperties": { "type": "string" }, "key$": "labels" }, "metadata": { "description": "Optional metadata key-value pairs associated with the event.", "type": "object", "additionalProperties": { "type": "string" }, "key$": "metadata" }, "occurred_at": { "description": "Timestamp when the event occurred.", "type": "string", "format": "date-time", "key$": "occurred_at" }, "payload": { "description": "The event payload. For binary content, use base64 encoding. Max length: 699050 characters (512 KiB base64-encoded).", "type": "string", "key$": "payload" }, "payload_content_type": { "description": "Content type of the payload. Valid values: text/plain, application/json, application/octet-stream+base64. Length: 1-100 characters.", "type": "string", "key$": "payload_content_type" } }, "required": ["application_id", "event_type", "labels", "occurred_at", "payload", "payload_content_type"], "x-ref": "#/components/schemas/EventPost", "index$": 1 } } }, "required": true }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ingested_event_ref01_ent = client.IngestedEvent();
        let ingested_event_ref01_data = setup.data.new.ingested_event['ingested_event_ref01'];
        ingested_event_ref01_data = (await ingested_event_ref01_ent.create(ingested_event_ref01_data)).data();
        (0, node_assert_1.default)(null != ingested_event_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ingested_event/IngestedEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Hook0SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ingested_event01', 'ingested_event02', 'ingested_event03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOOK0_TEST_INGESTED_EVENT_ENTID': idmap,
        'HOOK0_TEST_LIVE': 'FALSE',
        'HOOK0_TEST_EXPLAIN': 'FALSE',
        'HOOK0_APIKEY': '',
    });
    idmap = env['HOOK0_TEST_INGESTED_EVENT_ENTID'];
    const live = 'TRUE' === env.HOOK0_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOOK0_TEST_INGESTED_EVENT_ENTID'];
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
//# sourceMappingURL=IngestedEventEntity.test.js.map