
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


describe('QuotaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Quota()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"global_applications_per_organization_limit":{"a":true,"fo":"int32","h":"Global Applications Per Organization Limit","n":"global_applications_per_organization_limit","r":true,"t":"`$INTEGER`","key$":"global_applications_per_organization_limit","index$":0},"global_days_of_events_retention_limit":{"a":true,"fo":"int32","h":"Global Days Of Events Retention Limit","n":"global_days_of_events_retention_limit","r":true,"t":"`$INTEGER`","key$":"global_days_of_events_retention_limit","index$":1},"global_event_types_per_application_limit":{"a":true,"fo":"int32","h":"Global Event Types Per Application Limit","n":"global_event_types_per_application_limit","r":true,"t":"`$INTEGER`","key$":"global_event_types_per_application_limit","index$":2},"global_events_per_day_limit":{"a":true,"fo":"int32","h":"Global Events Per Day Limit","n":"global_events_per_day_limit","r":true,"t":"`$INTEGER`","key$":"global_events_per_day_limit","index$":3},"global_members_per_organization_limit":{"a":true,"fo":"int32","h":"Global Members Per Organization Limit","n":"global_members_per_organization_limit","r":true,"t":"`$INTEGER`","key$":"global_members_per_organization_limit","index$":4},"global_subscriptions_per_application_limit":{"a":true,"fo":"int32","h":"Global Subscriptions Per Application Limit","n":"global_subscriptions_per_application_limit","r":true,"t":"`$INTEGER`","key$":"global_subscriptions_per_application_limit","index$":5}},"name":"quota","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/quotas/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/quotas/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"quotas"}],"t":{"req":"`reqdata`","res":"`body.limits`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quota","name__orig":"quota","Name":"Quota","name_":"quota","name-":"quota","NAME":"QUOTA","index$":14}, {"active":true,"entity":"quota","key$":"BasicQuotaFlow","kind":"basic","name":"BasicQuotaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"quota_ref01","srcdatavar":"quota_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quota_ref01"}}],"index$":0}]}, 'Quota', {"GET /api/v1/quotas/":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quota_ref01_data = Object.values(setup.data.existing.quota)[0]

    // LOAD
    const quota_ref01_ent = client.Quota()
    const quota_ref01_match_dt0 = {}
    const quota_ref01_data_dt0 = (await quota_ref01_ent.load(quota_ref01_match_dt0)).data()
    assert(null != quota_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/quota/QuotaTestData.json')

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
    ['quota01','quota02','quota03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_QUOTA_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_QUOTA_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_QUOTA_ENTID']
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
  
