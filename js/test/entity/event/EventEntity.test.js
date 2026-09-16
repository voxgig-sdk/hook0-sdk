
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { Hook0SDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"application_id","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"uuid","name":"event_id","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"event_type_name","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"labels","req":true,"type":"`$OBJECT`","index$":5},{"active":true,"name":"metadata","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"format":"date-time","name":"occurred_at","req":true,"type":"`$STRING`","index$":7},{"active":true,"name":"payload","req":true,"type":"`$STRING`","index$":8},{"active":true,"name":"payload_content_type","req":true,"type":"`$STRING`","index$":9},{"active":true,"format":"date-time","name":"received_at","req":true,"type":"`$STRING`","index$":10}],"id":{"field":"id","name":"id"},"name":"event","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"event_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /api/v1/events/{event_id}/replay","json":"{\"operationId\":\"events.replay\",\"parameters\":[{\"in\":\"path\",\"name\":\"event_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"application_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"204\":{\"description\":\"No Content\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/events/{event_id}/replay","rename":{"param":{"event_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"events"},{"var":"id"},{"lit":"replay"}],"select":{"$action":"replay","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/events/","json":"{\"operationId\":\"events.list\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"event_type_name\":{\"type\":\"string\"},\"ip\":{\"type\":\"string\"},\"labels\":{\"type\":\"object\"},\"metadata\":{\"type\":\"object\"},\"occurred_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"payload_content_type\":{\"type\":\"string\"},\"received_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"event_id\",\"event_type_name\",\"ip\",\"labels\",\"occurred_at\",\"payload_content_type\",\"received_at\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/events/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"events"}],"select":{"exist":["application_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"event_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/events/{event_id}","json":"{\"operationId\":\"events.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"event_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"},{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"event_type_name\":{\"type\":\"string\"},\"ip\":{\"type\":\"string\"},\"labels\":{\"type\":\"object\"},\"metadata\":{\"type\":\"object\"},\"occurred_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"payload\":{\"type\":\"string\"},\"payload_content_type\":{\"type\":\"string\"},\"received_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"event_id\",\"event_type_name\",\"ip\",\"labels\",\"occurred_at\",\"payload\",\"payload_content_type\",\"received_at\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/events/{event_id}","rename":{"param":{"event_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"events"},{"var":"id"}],"select":{"exist":["application_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":3}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"event_ref01"},"match":{"event_id":"event01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"match":{"id":"event01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"index$":2}]}, 'Event')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_ref01_ent = client.Event()
    let event_ref01_data = setup.data.new.event['event_ref01']
    event_ref01_data['event_id'] = setup.idmap['event01']

    event_ref01_data = (await event_ref01_ent.create(event_ref01_data)).data()
    assert(null != event_ref01_data.id)


    // LIST
    const event_ref01_match = {}

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e) => e.data())

    assert(!isempty(select(event_ref01_list, { id: event_ref01_data.id })))


    // LOAD
    const event_ref01_match_dt0 = {}
    event_ref01_match_dt0.id = event_ref01_data.id
    const event_ref01_data_dt0 = (await event_ref01_ent.load(event_ref01_match_dt0)).data()
    assert(event_ref01_data_dt0.id === event_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/event/EventTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Hook0SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['event01','event02','event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_EVENT_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_EVENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Hook0SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HOOK0_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
