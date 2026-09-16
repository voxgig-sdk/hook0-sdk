

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

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'response.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"response","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"response_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/responses/{response_id}","json":"{\"operationId\":\"response.get\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"},{\"in\":\"path\",\"name\":\"response_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"type\":\"string\"},\"elapsed_time_ms\":{\"format\":\"int32\",\"type\":\"integer\"},\"headers\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"http_code\":{\"format\":\"int32\",\"type\":\"integer\"},\"response_error_name\":{\"type\":\"string\"},\"response_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"response_id\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/responses/{response_id}","rename":{"param":{"response_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"responses"},{"var":"id"}],"select":{"exist":["application_id","id"]},"transform":{"req":"`reqdata`","res":"`body.headers`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"response","name__orig":"response","Name":"Response","name_":"response","name-":"response","NAME":"RESPONSE","index$":18}, {"active":true,"entity":"response","key$":"BasicResponseFlow","kind":"basic","name":"BasicResponseFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"response_ref01","srcdatavar":"response_ref01_data","suffix":"_dt0"},"match":{"id":"response01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-response_ref01"}}],"index$":0}]}, 'Response')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let response_ref01_data = Object.values(setup.data.existing.response)[0] as any

    // LOAD
    const response_ref01_ent = client.Response()
    const response_ref01_match_dt0: any = {}
    response_ref01_match_dt0.id = response_ref01_data.id
    const response_ref01_data_dt0 = (await response_ref01_ent.load(response_ref01_match_dt0)).data()
    assert(response_ref01_data_dt0.id === response_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
