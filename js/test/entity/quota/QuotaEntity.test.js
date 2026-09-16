
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int32","name":"global_applications_per_organization_limit","req":true,"type":"`$INTEGER`","index$":0},{"active":true,"format":"int32","name":"global_days_of_events_retention_limit","req":true,"type":"`$INTEGER`","index$":1},{"active":true,"format":"int32","name":"global_event_types_per_application_limit","req":true,"type":"`$INTEGER`","index$":2},{"active":true,"format":"int32","name":"global_events_per_day_limit","req":true,"type":"`$INTEGER`","index$":3},{"active":true,"format":"int32","name":"global_members_per_organization_limit","req":true,"type":"`$INTEGER`","index$":4},{"active":true,"format":"int32","name":"global_subscriptions_per_application_limit","req":true,"type":"`$INTEGER`","index$":5}],"name":"quota","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/quotas/","json":"{\"operationId\":\"quotas.get\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"enabled\":{\"type\":\"boolean\"},\"limits\":{\"properties\":{\"global_applications_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"global_days_of_events_retention_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"global_event_types_per_application_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"global_events_per_day_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"global_members_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"global_subscriptions_per_application_limit\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"global_applications_per_organization_limit\",\"global_days_of_events_retention_limit\",\"global_event_types_per_application_limit\",\"global_events_per_day_limit\",\"global_members_per_organization_limit\",\"global_subscriptions_per_application_limit\"],\"type\":\"object\"}},\"required\":[\"enabled\",\"limits\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/quotas/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"quotas"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.limits`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quota","name__orig":"quota","Name":"Quota","name_":"quota","name-":"quota","NAME":"QUOTA","index$":15}, {"active":true,"entity":"quota","key$":"BasicQuotaFlow","kind":"basic","name":"BasicQuotaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"quota_ref01","srcdatavar":"quota_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quota_ref01"}}],"index$":0}]}, 'Quota')
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
  
