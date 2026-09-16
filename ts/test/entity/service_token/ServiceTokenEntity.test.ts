

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


describe('ServiceTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.ServiceToken()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'service_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"biscuit","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":3},{"active":true,"format":"uuid","name":"organization_id","req":true,"type":"`$STRING`","index$":4},{"active":true,"format":"uuid","name":"token_id","req":true,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"service_token","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/service_token/","json":"{\"operationId\":\"serviceToken.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"name\",\"organization_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"biscuit\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"biscuit\",\"created_at\",\"name\",\"token_id\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/service_token/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"service_token"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"organization_id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/service_token/","json":"{\"operationId\":\"serviceToken.list\",\"parameters\":[{\"in\":\"query\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"biscuit\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"biscuit\",\"created_at\",\"name\",\"token_id\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/service_token/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"service_token"}],"select":{"exist":["organization_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"service_token_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"organization_id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/service_token/{service_token_id}","json":"{\"operationId\":\"serviceToken.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"service_token_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"},{\"in\":\"query\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"biscuit\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"biscuit\",\"created_at\",\"name\",\"token_id\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/service_token/{service_token_id}","rename":{"param":{"service_token_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"service_token"},{"var":"id"}],"select":{"exist":["id","organization_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"service_token_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"organization_id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/v1/service_token/{service_token_id}","json":"{\"operationId\":\"serviceToken.delete\",\"parameters\":[{\"in\":\"path\",\"name\":\"service_token_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"},{\"in\":\"query\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No Content\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/v1/service_token/{service_token_id}","rename":{"param":{"service_token_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"service_token"},{"var":"id"}],"select":{"exist":["id","organization_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"service_token_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/service_token/{service_token_id}","json":"{\"operationId\":\"serviceToken.edit\",\"parameters\":[{\"in\":\"path\",\"name\":\"service_token_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"},\"organization_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"name\",\"organization_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"biscuit\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"biscuit\",\"created_at\",\"name\",\"token_id\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/service_token/{service_token_id}","rename":{"param":{"service_token_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"service_token"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"service_token","name__orig":"service_token","Name":"ServiceToken","name_":"service_token","name-":"service-token","NAME":"SERVICE_TOKEN","index$":20}, {"active":true,"entity":"service_token","key$":"BasicServiceTokenFlow","kind":"basic","name":"BasicServiceTokenFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"service_token_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"service_token_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"service_token_ref01","srcdatavar":"service_token_ref01_data","suffix":"_up0","textfield":"biscuit"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-service_token_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"service_token_ref01","srcdatavar":"service_token_ref01_data","suffix":"_dt0"},"match":{"id":"service_token01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-service_token_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"service_token_ref01","suffix":"_rm0"},"match":{"id":"service_token01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"service_token_ref01"}}],"index$":5}]}, 'ServiceToken')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const service_token_ref01_ent = client.ServiceToken()
    let service_token_ref01_data = setup.data.new.service_token['service_token_ref01']

    service_token_ref01_data = (await service_token_ref01_ent.create(service_token_ref01_data)).data()
    assert(null != service_token_ref01_data.id)


    // LIST
    const service_token_ref01_match: any = {}

    const service_token_ref01_list = (await service_token_ref01_ent.list(service_token_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(service_token_ref01_list, { id: service_token_ref01_data.id })))


    // UPDATE
    const service_token_ref01_data_up0: any = {}
    service_token_ref01_data_up0.id = service_token_ref01_data.id

    const service_token_ref01_markdef_up0 = { name: 'biscuit', value: 'Mark01-service_token_ref01_' + setup.now }
    ;(service_token_ref01_data_up0 as any)[service_token_ref01_markdef_up0.name] = service_token_ref01_markdef_up0.value

    const service_token_ref01_resdata_up0 = (await service_token_ref01_ent.update(service_token_ref01_data_up0)).data()
    assert(service_token_ref01_resdata_up0.id === service_token_ref01_data_up0.id)

    assert((service_token_ref01_resdata_up0 as any)[service_token_ref01_markdef_up0.name] === service_token_ref01_markdef_up0.value)


    // LOAD
    const service_token_ref01_match_dt0: any = {}
    service_token_ref01_match_dt0.id = service_token_ref01_data.id
    const service_token_ref01_data_dt0 = (await service_token_ref01_ent.load(service_token_ref01_match_dt0)).data()
    assert(service_token_ref01_data_dt0.id === service_token_ref01_data.id)


    // REMOVE
    const service_token_ref01_match_rm0: any = { id: service_token_ref01_data.id }
    await service_token_ref01_ent.remove(service_token_ref01_match_rm0)
  

    // LIST
    const service_token_ref01_match_rt0: any = {}

    const service_token_ref01_list_rt0 = (await service_token_ref01_ent.list(service_token_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(service_token_ref01_list_rt0, { id: service_token_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/service_token/ServiceTokenTestData.json')

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
    ['service_token01','service_token02','service_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_SERVICE_TOKEN_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_SERVICE_TOKEN_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_SERVICE_TOKEN_ENTID']
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
  
