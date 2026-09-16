

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Hook0SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


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

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"consumption","req":true,"type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"onboarding_steps","req":true,"type":"`$OBJECT`","index$":3},{"active":true,"format":"uuid","name":"organization_id","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"plan","req":true,"type":"`$OBJECT`","index$":5},{"active":true,"name":"quotas","req":true,"type":"`$OBJECT`","index$":6},{"active":true,"name":"role","req":true,"type":"`$STRING`","index$":7},{"active":true,"name":"users","req":true,"type":"`$ARRAY`","index$":8}],"id":{"field":"id","name":"id"},"name":"organization","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/organizations/","json":"{\"operationId\":\"organizations.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"consumption\":{\"properties\":{\"applications\":{\"format\":\"int64\",\"type\":\"integer\"},\"events_per_day\":{\"format\":\"int64\",\"type\":\"integer\"},\"members\":{\"format\":\"int64\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"onboarding_steps\":{\"properties\":{\"application\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event_type\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"subscription\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"}},\"required\":[\"application\",\"event\",\"event_type\",\"subscription\"],\"type\":\"object\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"plan\":{\"properties\":{\"label\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"label\",\"name\"],\"type\":\"object\"},\"quotas\":{\"properties\":{\"applications_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"days_of_events_retention_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"events_per_day_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"members_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"applications_per_organization_limit\",\"days_of_events_retention_limit\",\"events_per_day_limit\",\"members_per_organization_limit\"],\"type\":\"object\"},\"users\":{\"items\":{\"properties\":{\"email\":{\"type\":\"string\"},\"first_name\":{\"type\":\"string\"},\"last_name\":{\"type\":\"string\"},\"role\":{\"type\":\"string\"},\"user_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"email\",\"first_name\",\"last_name\",\"role\",\"user_id\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"consumption\",\"name\",\"onboarding_steps\",\"organization_id\",\"quotas\",\"users\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit_user_access\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/organizations/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/organizations/","json":"{\"operationId\":\"organizations.list\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"name\":{\"type\":\"string\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"plan\":{\"properties\":{\"label\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"label\",\"name\"],\"type\":\"object\"},\"role\":{\"type\":\"string\"}},\"required\":[\"name\",\"organization_id\",\"role\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/organizations/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/organizations/{organization_id}/","json":"{\"operationId\":\"organizations.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"consumption\":{\"properties\":{\"applications\":{\"format\":\"int64\",\"type\":\"integer\"},\"events_per_day\":{\"format\":\"int64\",\"type\":\"integer\"},\"members\":{\"format\":\"int64\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"onboarding_steps\":{\"properties\":{\"application\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event_type\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"subscription\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"}},\"required\":[\"application\",\"event\",\"event_type\",\"subscription\"],\"type\":\"object\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"plan\":{\"properties\":{\"label\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"label\",\"name\"],\"type\":\"object\"},\"quotas\":{\"properties\":{\"applications_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"days_of_events_retention_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"events_per_day_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"members_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"applications_per_organization_limit\",\"days_of_events_retention_limit\",\"events_per_day_limit\",\"members_per_organization_limit\"],\"type\":\"object\"},\"users\":{\"items\":{\"properties\":{\"email\":{\"type\":\"string\"},\"first_name\":{\"type\":\"string\"},\"last_name\":{\"type\":\"string\"},\"role\":{\"type\":\"string\"},\"user_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"email\",\"first_name\",\"last_name\",\"role\",\"user_id\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"consumption\",\"name\",\"onboarding_steps\",\"organization_id\",\"quotas\",\"users\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/organizations/{organization_id}/","rename":{"param":{"organization_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/v1/organizations/{organization_id}/","json":"{\"operationId\":\"organizations.delete\",\"parameters\":[{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No Content\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/v1/organizations/{organization_id}/","rename":{"param":{"organization_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/organizations/{organization_id}/","json":"{\"operationId\":\"organizations.edit\",\"parameters\":[{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"consumption\":{\"properties\":{\"applications\":{\"format\":\"int64\",\"type\":\"integer\"},\"events_per_day\":{\"format\":\"int64\",\"type\":\"integer\"},\"members\":{\"format\":\"int64\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"onboarding_steps\":{\"properties\":{\"application\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event_type\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"subscription\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"}},\"required\":[\"application\",\"event\",\"event_type\",\"subscription\"],\"type\":\"object\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"plan\":{\"properties\":{\"label\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"label\",\"name\"],\"type\":\"object\"},\"quotas\":{\"properties\":{\"applications_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"days_of_events_retention_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"events_per_day_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"members_per_organization_limit\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"applications_per_organization_limit\",\"days_of_events_retention_limit\",\"events_per_day_limit\",\"members_per_organization_limit\"],\"type\":\"object\"},\"users\":{\"items\":{\"properties\":{\"email\":{\"type\":\"string\"},\"first_name\":{\"type\":\"string\"},\"last_name\":{\"type\":\"string\"},\"role\":{\"type\":\"string\"},\"user_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"email\",\"first_name\",\"last_name\",\"role\",\"user_id\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"consumption\",\"name\",\"onboarding_steps\",\"organization_id\",\"quotas\",\"users\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/organizations/{organization_id}/","rename":{"param":{"organization_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":12}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"organization_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_up0","textfield":"name"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"match":{"id":"organization01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"organization_ref01","suffix":"_rm0"},"match":{"id":"organization01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"organization_ref01"}}],"index$":5}]}, 'Organization')
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
    const organization_ref01_match: any = {}

    const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(organization_ref01_list, { id: organization_ref01_data.id })))


    // UPDATE
    const organization_ref01_data_up0: any = {}
    organization_ref01_data_up0.id = organization_ref01_data.id

    const organization_ref01_markdef_up0 = { name: 'name', value: 'Mark01-organization_ref01_' + setup.now }
    ;(organization_ref01_data_up0 as any)[organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value

    const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data()
    assert(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id)

    assert((organization_ref01_resdata_up0 as any)[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value)


    // LOAD
    const organization_ref01_match_dt0: any = {}
    organization_ref01_match_dt0.id = organization_ref01_data.id
    const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data()
    assert(organization_ref01_data_dt0.id === organization_ref01_data.id)


    // REMOVE
    const organization_ref01_match_rm0: any = { id: organization_ref01_data.id }
    await organization_ref01_ent.remove(organization_ref01_match_rm0)
  

    // LIST
    const organization_ref01_match_rt0: any = {}

    const organization_ref01_list_rt0 = (await organization_ref01_ent.list(organization_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(organization_ref01_list_rt0, { id: organization_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
