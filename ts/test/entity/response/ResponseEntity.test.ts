

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Hook0SDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = Hook0SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Response().load({"id":1,"application_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'response.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"body":{"a":true,"h":"Body","n":"body","r":false,"t":"`$STRING`","key$":"body","index$":0},"elapsed_time_ms":{"a":true,"fo":"int32","h":"Elapsed Time Ms","n":"elapsed_time_ms","r":false,"t":"`$INTEGER`","key$":"elapsed_time_ms","index$":1},"headers":{"a":true,"h":"Headers","n":"headers","r":false,"t":"`$OBJECT`","key$":"headers","index$":2},"http_code":{"a":true,"fo":"int32","h":"Http Code","n":"http_code","r":false,"t":"`$INTEGER`","key$":"http_code","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"response_error_name":{"a":true,"h":"Response Error Name","n":"response_error_name","r":false,"t":"`$STRING`","key$":"response_error_name","index$":5},"response_id":{"a":true,"fo":"uuid","h":"Response Id","n":"response_id","r":true,"t":"`$STRING`","key$":"response_id","index$":6}},"id":{"field":"id","name":"id"},"name":"response","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/responses/{response_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"response_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/responses/{response_id}","q":{"exist":["application_id","id"]},"r":{"param":{"response_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"responses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"response","name__orig":"response","Name":"Response","name_":"response","name-":"response","NAME":"RESPONSE","index$":17}, {"active":true,"entity":"response","key$":"BasicResponseFlow","kind":"basic","name":"BasicResponseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"response_ref01","srcdatavar":"response_ref01_data","suffix":"_dt0"},"m":{"id":"response01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-response_ref01"}}],"index$":0,"route":"GET /api/v1/responses/{response_id}","record":{}}]}, 'Response', {"GET /api/v1/responses/{response_id}":{"protocol":"http","parameters":[{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":0},{"in":"path","name":"response_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":1}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
