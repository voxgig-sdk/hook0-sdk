
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


describe('ApplicationSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.ApplicationSecret()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"application_id":{"a":true,"fo":"uuid","h":"Application Id","n":"application_id","r":true,"t":"`$STRING`","key$":"application_id","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"t":"`$STRING`","key$":"deleted_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":4},"token":{"a":true,"fo":"uuid","h":"Token","n":"token","r":true,"t":"`$STRING`","key$":"token","index$":5}},"id":{"field":"id","name":"id"},"name":"application_secret","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/application_secrets/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/application_secrets/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/application_secrets/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/application_secrets/","q":{"exist":["application_id"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/v1/application_secrets/{application_secret_token}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"application_secret_token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/application_secrets/{application_secret_token}","q":{"exist":["id"]},"r":{"param":{"application_secret_token":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"application_secret","name__orig":"application_secret","Name":"ApplicationSecret","name_":"application_secret","name-":"application-secret","NAME":"APPLICATION_SECRET","index$":1}, {"active":true,"entity":"application_secret","key$":"BasicApplicationSecretFlow","kind":"basic","name":"BasicApplicationSecretFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"application_secret_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"application_secret_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"application_secret_ref01","srcdatavar":"application_secret_ref01_data","suffix":"_up0","textfield":"application_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_secret_ref01"}}],"v":[],"index$":2}]}, 'ApplicationSecret', {"POST /api/v1/application_secrets/":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"application_id":{"type":"string","format":"uuid","key$":"application_id"},"name":{"type":"string","key$":"name"}},"required":["application_id"],"x-ref":"#/components/schemas/ApplicationSecretPost","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/application_secrets/":{"protocol":"http","parameters":[{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":0}]},"PUT /api/v1/application_secrets/{application_secret_token}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"application_id":{"type":"string","format":"uuid","key$":"application_id"},"name":{"type":"string","key$":"name"}},"required":["application_id"],"x-ref":"#/components/schemas/ApplicationSecretPost","index$":1}}},"required":true},"parameters":[{"in":"path","name":"application_secret_token","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const application_secret_ref01_ent = client.ApplicationSecret()
    let application_secret_ref01_data = setup.data.new.application_secret['application_secret_ref01']

    application_secret_ref01_data = (await application_secret_ref01_ent.create(application_secret_ref01_data)).data()
    assert(null != application_secret_ref01_data.id)


    // LIST
    const application_secret_ref01_match = {}

    const application_secret_ref01_list = (await application_secret_ref01_ent.list(application_secret_ref01_match)).map((e) => e.data())

    assert(!isempty(select(application_secret_ref01_list, { id: application_secret_ref01_data.id })))


    // UPDATE
    const application_secret_ref01_data_up0 = {}
    application_secret_ref01_data_up0.id = application_secret_ref01_data.id

    const application_secret_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_secret_ref01_' + setup.now }
    application_secret_ref01_data_up0 [application_secret_ref01_markdef_up0.name] = application_secret_ref01_markdef_up0.value

    const application_secret_ref01_resdata_up0 = (await application_secret_ref01_ent.update(application_secret_ref01_data_up0)).data()
    assert(application_secret_ref01_resdata_up0.id === application_secret_ref01_data_up0.id)

    assert(application_secret_ref01_resdata_up0[application_secret_ref01_markdef_up0.name] === application_secret_ref01_markdef_up0.value)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/application_secret/ApplicationSecretTestData.json')

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
    ['application_secret01','application_secret02','application_secret03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_APPLICATION_SECRET_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_APPLICATION_SECRET_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_APPLICATION_SECRET_ENTID']
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
  
