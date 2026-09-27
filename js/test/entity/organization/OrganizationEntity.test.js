
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


describe('OrganizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"fo":"int32","h":"Amount","n":"amount","r":true,"t":"`$INTEGER`","key$":"amount","index$":0},"application_id":{"a":true,"fo":"uuid","h":"Application Id","n":"application_id","r":true,"t":"`$STRING`","key$":"application_id","index$":1},"application_name":{"a":true,"h":"Application Name","n":"application_name","r":true,"t":"`$STRING`","key$":"application_name","index$":2},"consumption":{"a":true,"h":"Consumption","n":"consumption","r":true,"t":"`$OBJECT`","key$":"consumption","index$":3},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":true,"t":"`$STRING`","key$":"date","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"is_provisional":{"a":true,"h":"Is Provisional","n":"is_provisional","r":true,"t":"`$BOOLEAN`","key$":"is_provisional","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":7},"onboarding_steps":{"a":true,"h":"Onboarding Steps","n":"onboarding_steps","r":true,"t":"`$OBJECT`","key$":"onboarding_steps","index$":8},"organization_id":{"a":true,"fo":"uuid","h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":9},"plan":{"a":true,"h":"Plan","n":"plan","r":true,"t":"`$OBJECT`","key$":"plan","index$":10},"quotas":{"a":true,"h":"Quotas","n":"quotas","r":true,"t":"`$OBJECT`","key$":"quotas","index$":11},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":12},"users":{"a":true,"h":"Users","n":"users","r":true,"t":"`$ARRAY`","key$":"users","index$":13}},"id":{"field":"id","name":"id"},"name":"organization","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/organizations/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/organizations/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/events_per_day/organization","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"to","or":"to","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/events_per_day/organization","q":{"exist":["from","organization_id","to"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"events_per_day"},{"lit":"organization"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/organizations/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/","q":{"exist":["id"]},"r":{"param":{"organization_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/","q":{"exist":["id"]},"r":{"param":{"organization_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/v1/organizations/{organization_id}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/","q":{"exist":["id"]},"r":{"param":{"organization_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":11}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_up0","textfield":"application_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"m":{"id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"organization_ref01","suffix":"_rm0"},"m":{"id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"organization_ref01"}}],"index$":5}]}, 'Organization', {"POST /api/v1/organizations/":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"}},"required":["name"],"x-ref":"#/components/schemas/OrganizationPost","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/events_per_day/organization":{"protocol":"http","parameters":[{"in":"query","name":"from","description":"Start of date range (inclusive). Defaults to 30 days before `to`.","schema":{"type":"string","format":"date"},"style":"form","index$":0},{"in":"query","name":"organization_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":1},{"in":"query","name":"to","description":"End of date range (inclusive). Defaults to today.","schema":{"type":"string","format":"date"},"style":"form","index$":2}]},"GET /api/v1/organizations/":{"protocol":"http","parameters":[]},"GET /api/v1/organizations/{organization_id}/":{"protocol":"http","parameters":[{"in":"path","name":"organization_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]},"DELETE /api/v1/organizations/{organization_id}/":{"protocol":"http","parameters":[{"in":"path","name":"organization_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]},"PUT /api/v1/organizations/{organization_id}/":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"}},"required":["name"],"x-ref":"#/components/schemas/OrganizationPost","index$":1}}},"required":true},"parameters":[{"in":"path","name":"organization_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_ref01_ent = client.Organization()
    let organization_ref01_data = setup.data.new.organization['organization_ref01']

    organization_ref01_data = (await organization_ref01_ent.create(organization_ref01_data)).data()
    assert(null != organization_ref01_data.id)


    // LIST
    const organization_ref01_match = {}

    const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e) => e.data())

    assert(!isempty(select(organization_ref01_list, { id: organization_ref01_data.id })))


    // UPDATE
    const organization_ref01_data_up0 = {}
    organization_ref01_data_up0.id = organization_ref01_data.id

    const organization_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-organization_ref01_' + setup.now }
    organization_ref01_data_up0 [organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value

    const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data()
    assert(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id)

    assert(organization_ref01_resdata_up0[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value)


    // LOAD
    const organization_ref01_match_dt0 = {}
    organization_ref01_match_dt0.id = organization_ref01_data.id
    const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data()
    assert(organization_ref01_data_dt0.id === organization_ref01_data.id)


    // REMOVE
    const organization_ref01_match_rm0 = {}
    organization_ref01_match_rm0.id = organization_ref01_data.id
    await organization_ref01_ent.remove(organization_ref01_match_rm0)
  

    // LIST
    const organization_ref01_match_rt0 = {}

    const organization_ref01_list_rt0 = (await organization_ref01_ent.list(organization_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(organization_ref01_list_rt0, { id: organization_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_ORGANIZATION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_ORGANIZATION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_ORGANIZATION_ENTID']
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
  
