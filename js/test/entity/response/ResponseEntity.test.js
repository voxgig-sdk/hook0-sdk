
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


describe('ResponseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Response()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"response","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/responses/{response_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"response_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/responses/{response_id}","q":{"exist":["application_id","id"]},"r":{"param":{"response_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"responses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.headers`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"response","name__orig":"response","Name":"Response","name_":"response","name-":"response","NAME":"RESPONSE","index$":17}, {"active":true,"entity":"response","key$":"BasicResponseFlow","kind":"basic","name":"BasicResponseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"response_ref01","srcdatavar":"response_ref01_data","suffix":"_dt0"},"m":{"id":"response01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-response_ref01"}}],"index$":0}]}, 'Response', {"GET /api/v1/responses/{response_id}":{"protocol":"http","parameters":[{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":0},{"in":"path","name":"response_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let response_ref01_data = Object.values(setup.data.existing.response)[0]

    // LOAD
    const response_ref01_ent = client.Response()
    const response_ref01_match_dt0 = {}
    response_ref01_match_dt0.id = response_ref01_data.id
    const response_ref01_data_dt0 = (await response_ref01_ent.load(response_ref01_match_dt0)).data()
    assert(response_ref01_data_dt0.id === response_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/response/ResponseTestData.json')

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
    ['response01','response02','response03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_RESPONSE_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_RESPONSE_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_RESPONSE_ENTID']
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
  
