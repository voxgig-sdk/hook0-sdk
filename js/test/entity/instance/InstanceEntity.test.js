
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


describe('InstanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Instance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"application_secret_compatibility":{"a":true,"h":"Application Secret Compatibility","n":"application_secret_compatibility","r":true,"t":"`$BOOLEAN`","key$":"application_secret_compatibility","index$":0},"auto_db_migration":{"a":true,"h":"Auto Db Migration","n":"auto_db_migration","r":true,"t":"`$BOOLEAN`","key$":"auto_db_migration","index$":1},"biscuit_public_key":{"a":true,"h":"Biscuit Public Key","n":"biscuit_public_key","r":true,"t":"`$STRING`","key$":"biscuit_public_key","index$":2},"cloudflare_turnstile_site_key":{"a":true,"h":"Cloudflare Turnstile Site Key","n":"cloudflare_turnstile_site_key","r":false,"t":"`$STRING`","key$":"cloudflare_turnstile_site_key","index$":3},"formbricks":{"a":true,"h":"Formbricks","n":"formbricks","r":true,"t":"`$OBJECT`","key$":"formbricks","index$":4},"matomo":{"a":true,"h":"Matomo","n":"matomo","r":true,"t":"`$OBJECT`","key$":"matomo","index$":5},"password_minimum_length":{"a":true,"fo":"int32","h":"Password Minimum Length","n":"password_minimum_length","r":true,"t":"`$INTEGER`","key$":"password_minimum_length","index$":6},"quota_enforcement":{"a":true,"h":"Quota Enforcement","n":"quota_enforcement","r":true,"t":"`$BOOLEAN`","key$":"quota_enforcement","index$":7},"registration_disabled":{"a":true,"h":"Registration Disabled","n":"registration_disabled","r":true,"t":"`$BOOLEAN`","key$":"registration_disabled","index$":8},"support_email_address":{"a":true,"h":"Support Email Address","n":"support_email_address","r":true,"t":"`$STRING`","key$":"support_email_address","index$":9}},"name":"instance","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/instance/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/instance/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"instance"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"instance","name__orig":"instance","Name":"Instance","name_":"instance","name-":"instance","NAME":"INSTANCE","index$":9}, {"active":true,"entity":"instance","key$":"BasicInstanceFlow","kind":"basic","name":"BasicInstanceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"instance_ref01","srcdatavar":"instance_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-instance_ref01"}}],"index$":0}]}, 'Instance', {"GET /api/v1/instance/":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let instance_ref01_data = Object.values(setup.data.existing.instance)[0]

    // LOAD
    const instance_ref01_ent = client.Instance()
    const instance_ref01_match_dt0 = {}
    const instance_ref01_data_dt0 = (await instance_ref01_ent.load(instance_ref01_match_dt0)).data()
    assert(null != instance_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/instance/InstanceTestData.json')

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
    ['instance01','instance02','instance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_INSTANCE_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_INSTANCE_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_INSTANCE_ENTID']
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
  
