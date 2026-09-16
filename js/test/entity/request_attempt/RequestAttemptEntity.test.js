
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


describe('RequestAttemptEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.RequestAttempt()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"delay_until","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"event","req":true,"type":"`$OBJECT`","index$":2},{"active":true,"format":"uuid","name":"event_id","req":true,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"failed_at","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"int32","name":"http_response_status","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":6},{"active":true,"format":"date-time","name":"picked_at","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"uuid","name":"request_attempt_id","req":true,"type":"`$STRING`","index$":8},{"active":true,"format":"uuid","name":"response_id","req":false,"type":"`$STRING`","index$":9},{"active":true,"format":"int32","name":"retry_count","req":true,"type":"`$INTEGER`","index$":10},{"active":true,"name":"status","req":true,"short":"Status of a request attempt.","type":"`$OBJECT`","index$":11},{"active":true,"name":"subscription","req":true,"type":"`$OBJECT`","index$":12},{"active":true,"format":"date-time","name":"succeeded_at","req":false,"type":"`$STRING`","index$":13}],"id":{"field":"id","name":"id"},"name":"request_attempt","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"event_event_type_name","orig":"event_event_type_name","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"event_id","orig":"event_id","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"max_created_at","orig":"max_created_at","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"min_created_at","orig":"min_created_at","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"pagination_cursor","orig":"pagination_cursor","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"subscription_id","orig":"subscription_id","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /api/v1/request_attempts/","json":"{\"operationId\":\"requestAttempts.read\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"},{\"description\":\"Comma-separated event types\",\"in\":\"query\",\"name\":\"event.event_type_names\",\"schema\":{\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"query\",\"name\":\"event_id\",\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"query\",\"name\":\"max_created_at\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"query\",\"name\":\"min_created_at\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"query\",\"name\":\"pagination_cursor\",\"schema\":{\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"query\",\"name\":\"subscription_id\",\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"delay_until\":{\"format\":\"date-time\",\"type\":\"string\"},\"event\":{\"properties\":{\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"event_type_name\":{\"type\":\"string\"}},\"required\":[\"event_id\",\"event_type_name\"],\"type\":\"object\"},\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"failed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"http_response_status\":{\"format\":\"int32\",\"type\":\"integer\"},\"picked_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"request_attempt_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"response_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"retry_count\":{\"format\":\"int32\",\"type\":\"integer\"},\"status\":{\"description\":\"Status of a request attempt. The 'type' field indicates the status variant. - waiting: {type, since, until} - Scheduled for future delivery - pending: {type, since} - Ready to be processed - in_progress: {type, since} - Currently being delivered - successful: {type, at, full_processing_ms} - Delivered successfully - failed: {type, at, full_processing_ms} - Delivery failed\",\"properties\":{\"at\":{\"description\":\"Timestamp when completed (present in successful, failed)\",\"format\":\"date-time\",\"type\":\"string\"},\"full_processing_ms\":{\"description\":\"Total processing time in milliseconds (present in successful, failed)\",\"format\":\"int64\",\"type\":\"integer\"},\"since\":{\"description\":\"Timestamp when the status started (present in waiting, pending, in_progress)\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Status type discriminator. One of: waiting, pending, in_progress, successful, failed\",\"enum\":[\"waiting\",\"pending\",\"in_progress\",\"successful\",\"failed\"],\"type\":\"string\"},\"until\":{\"description\":\"Timestamp until which waiting (only present in waiting status)\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"subscription\":{\"properties\":{\"description\":{\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"subscription_id\"],\"type\":\"object\"},\"succeeded_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"created_at\",\"event\",\"event_id\",\"request_attempt_id\",\"retry_count\",\"status\",\"subscription\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/request_attempts/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"request_attempts"}],"select":{"exist":["application_id","event_event_type_name","event_id","max_created_at","min_created_at","pagination_cursor","subscription_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"request_attempt_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/request_attempts/{request_attempt_id}","json":"{\"operationId\":\"requestAttempts.get\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"path\",\"name\":\"request_attempt_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"delay_until\":{\"format\":\"date-time\",\"type\":\"string\"},\"event\":{\"properties\":{\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"event_type_name\":{\"type\":\"string\"}},\"required\":[\"event_id\",\"event_type_name\"],\"type\":\"object\"},\"event_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"failed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"http_response_status\":{\"format\":\"int32\",\"type\":\"integer\"},\"picked_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"request_attempt_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"response_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"retry_count\":{\"format\":\"int32\",\"type\":\"integer\"},\"status\":{\"description\":\"Status of a request attempt. The 'type' field indicates the status variant. - waiting: {type, since, until} - Scheduled for future delivery - pending: {type, since} - Ready to be processed - in_progress: {type, since} - Currently being delivered - successful: {type, at, full_processing_ms} - Delivered successfully - failed: {type, at, full_processing_ms} - Delivery failed\",\"properties\":{\"at\":{\"description\":\"Timestamp when completed (present in successful, failed)\",\"format\":\"date-time\",\"type\":\"string\"},\"full_processing_ms\":{\"description\":\"Total processing time in milliseconds (present in successful, failed)\",\"format\":\"int64\",\"type\":\"integer\"},\"since\":{\"description\":\"Timestamp when the status started (present in waiting, pending, in_progress)\",\"format\":\"date-time\",\"type\":\"string\"},\"type\":{\"description\":\"Status type discriminator. One of: waiting, pending, in_progress, successful, failed\",\"enum\":[\"waiting\",\"pending\",\"in_progress\",\"successful\",\"failed\"],\"type\":\"string\"},\"until\":{\"description\":\"Timestamp until which waiting (only present in waiting status)\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"subscription\":{\"properties\":{\"description\":{\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"subscription_id\"],\"type\":\"object\"},\"succeeded_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"created_at\",\"event\",\"event_id\",\"request_attempt_id\",\"retry_count\",\"status\",\"subscription\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/request_attempts/{request_attempt_id}","rename":{"param":{"request_attempt_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"request_attempts"},{"var":"id"}],"select":{"exist":["application_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"request_attempt","name__orig":"request_attempt","Name":"RequestAttempt","name_":"request_attempt","name-":"request-attempt","NAME":"REQUEST_ATTEMPT","index$":17}, {"active":true,"entity":"request_attempt","key$":"BasicRequestAttemptFlow","kind":"basic","name":"BasicRequestAttemptFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"request_attempt_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"request_attempt_ref01","srcdatavar":"request_attempt_ref01_data","suffix":"_dt0"},"match":{"id":"request_attempt01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-request_attempt_ref01"}}],"index$":1}]}, 'RequestAttempt')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let request_attempt_ref01_data = Object.values(setup.data.existing.request_attempt)[0]

    // LIST
    const request_attempt_ref01_ent = client.RequestAttempt()
    const request_attempt_ref01_match = {}

    const request_attempt_ref01_list = (await request_attempt_ref01_ent.list(request_attempt_ref01_match)).map((e) => e.data())


    // LOAD
    const request_attempt_ref01_match_dt0 = {}
    request_attempt_ref01_match_dt0.id = request_attempt_ref01_data.id
    const request_attempt_ref01_data_dt0 = (await request_attempt_ref01_ent.load(request_attempt_ref01_match_dt0)).data()
    assert(request_attempt_ref01_data_dt0.id === request_attempt_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/request_attempt/RequestAttemptTestData.json')

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
    ['request_attempt01','request_attempt02','request_attempt03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_REQUEST_ATTEMPT_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_REQUEST_ATTEMPT_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_REQUEST_ATTEMPT_ENTID']
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
  
