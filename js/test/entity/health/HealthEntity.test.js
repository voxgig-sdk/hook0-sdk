
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


describe('HealthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Health()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"database","req":true,"type":"`$BOOLEAN`","index$":0},{"active":true,"format":"int64","name":"database_duration_ms","req":true,"type":"`$INTEGER`","index$":1},{"active":true,"name":"object_storage","req":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"format":"int64","name":"object_storage_duration_ms","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"pulsar","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"format":"int64","name":"pulsar_duration_ms","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"format":"int64","name":"total_duration_ms","req":true,"type":"`$INTEGER`","index$":6}],"name":"health","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/health/","json":"{\"operationId\":\"instance.health\",\"parameters\":[{\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"database\":{\"type\":\"boolean\"},\"database_duration_ms\":{\"format\":\"int64\",\"type\":\"integer\"},\"object_storage\":{\"type\":\"boolean\"},\"object_storage_duration_ms\":{\"format\":\"int64\",\"type\":\"integer\"},\"pulsar\":{\"type\":\"boolean\"},\"pulsar_duration_ms\":{\"format\":\"int64\",\"type\":\"integer\"},\"total_duration_ms\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"database\",\"database_duration_ms\",\"total_duration_ms\"],\"type\":\"object\"}}},\"description\":\"\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/health/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"health"}],"select":{"exist":["key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"health","name__orig":"health","Name":"Health","name_":"health","name-":"health","NAME":"HEALTH","index$":7}, {"active":true,"entity":"health","key$":"BasicHealthFlow","kind":"basic","name":"BasicHealthFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"health_ref01","srcdatavar":"health_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-health_ref01"}}],"index$":0}]}, 'Health')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let health_ref01_data = Object.values(setup.data.existing.health)[0]

    // LOAD
    const health_ref01_ent = client.Health()
    const health_ref01_match_dt0 = {}
    const health_ref01_data_dt0 = (await health_ref01_ent.load(health_ref01_match_dt0)).data()
    assert(null != health_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/health/HealthTestData.json')

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
    ['health01','health02','health03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_HEALTH_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_HEALTH_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_HEALTH_ENTID']
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
  
