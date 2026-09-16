

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

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'application_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"application_id","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":true,"type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"deleted_at","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"uuid","name":"token","req":true,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"application_secret","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/application_secrets/","json":"{\"operationId\":\"applicationSecrets.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"application_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"deleted_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"created_at\",\"token\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/application_secrets/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/application_secrets/","json":"{\"operationId\":\"applicationSecrets.read\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"deleted_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"created_at\",\"token\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/application_secrets/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"}],"select":{"exist":["application_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"application_secret_token","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/application_secrets/{application_secret_token}","json":"{\"operationId\":\"applicationSecrets.update\",\"parameters\":[{\"in\":\"path\",\"name\":\"application_secret_token\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"required\":[\"application_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"deleted_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"token\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"created_at\",\"token\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/application_secrets/{application_secret_token}","rename":{"param":{"application_secret_token":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"application_secrets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"application_secret","name__orig":"application_secret","Name":"ApplicationSecret","name_":"application_secret","name-":"application-secret","NAME":"APPLICATION_SECRET","index$":1}, {"active":true,"entity":"application_secret","key$":"BasicApplicationSecretFlow","kind":"basic","name":"BasicApplicationSecretFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"application_secret_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"application_secret_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"application_secret_ref01","srcdatavar":"application_secret_ref01_data","suffix":"_up0","textfield":"application_id"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_secret_ref01"}}],"valid":[],"index$":2}]}, 'ApplicationSecret')
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
    const application_secret_ref01_match: any = {}

    const application_secret_ref01_list = (await application_secret_ref01_ent.list(application_secret_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(application_secret_ref01_list, { id: application_secret_ref01_data.id })))


    // UPDATE
    const application_secret_ref01_data_up0: any = {}
    application_secret_ref01_data_up0.id = application_secret_ref01_data.id

    const application_secret_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_secret_ref01_' + setup.now }
    ;(application_secret_ref01_data_up0 as any)[application_secret_ref01_markdef_up0.name] = application_secret_ref01_markdef_up0.value

    const application_secret_ref01_resdata_up0 = (await application_secret_ref01_ent.update(application_secret_ref01_data_up0)).data()
    assert(application_secret_ref01_resdata_up0.id === application_secret_ref01_data_up0.id)

    assert((application_secret_ref01_resdata_up0 as any)[application_secret_ref01_markdef_up0.name] === application_secret_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
