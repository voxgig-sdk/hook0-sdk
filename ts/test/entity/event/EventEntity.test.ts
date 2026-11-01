

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


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('event hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of Hook0SDK.test(offline).Event().stream('list')) { }
    }, /offline/)

    for await (const _item of Hook0SDK.test(offline).Event()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = Hook0SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Event().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of Hook0SDK.test().Event().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new Hook0SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Event().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Event().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = Hook0SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Event().list({"application_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"event_id":{"a":true,"fo":"uuid","h":"Event Id","n":"event_id","r":true,"t":"`$STRING`","key$":"event_id","index$":0},"event_type_name":{"a":true,"h":"Event Type Name","n":"event_type_name","r":true,"t":"`$STRING`","key$":"event_type_name","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"ip":{"a":true,"h":"Ip","n":"ip","r":true,"t":"`$STRING`","key$":"ip","index$":3},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":"`$OBJECT`","key$":"labels","index$":4},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":5},"occurred_at":{"a":true,"fo":"date-time","h":"Occurred At","n":"occurred_at","r":true,"t":"`$STRING`","key$":"occurred_at","index$":6},"payload":{"a":true,"h":"Payload","n":"payload","r":true,"t":"`$STRING`","key$":"payload","index$":7},"payload_content_type":{"a":true,"h":"Payload Content Type","n":"payload_content_type","r":true,"t":"`$STRING`","key$":"payload_content_type","index$":8},"received_at":{"a":true,"fo":"date-time","h":"Received At","n":"received_at","r":true,"t":"`$STRING`","key$":"received_at","index$":9}},"id":{"field":"id","name":"id"},"name":"event","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["application_id"],"co":{"id":"POST /api/v1/events/{event_id}/replay","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"event_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/events/{event_id}/replay","q":{"$action":"replay","exist":["id"]},"r":{"param":{"event_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"events"},{"var":"id"},{"lit":"replay"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/events/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/events/","q":{"exist":["application_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/events/{event_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"event_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/events/{event_id}","q":{"exist":["application_id","id"]},"r":{"param":{"event_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"events"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":4}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"event_ref01"},"m":{"event_id":"event01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"m":{"id":"event01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"index$":1,"route":"GET /api/v1/events/{event_id}","record":{}}]}, 'Event', {"POST /api/v1/events/{event_id}/replay":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"application_id":{"type":"string","format":"uuid"}},"required":["application_id"],"x-ref":"#/components/schemas/ReplayEvent"}}},"required":true},"parameters":[{"in":"path","name":"event_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]},"GET /api/v1/events/":{"protocol":"http","parameters":[{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":0}]},"GET /api/v1/events/{event_id}":{"protocol":"http","parameters":[{"in":"path","name":"event_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0},{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"event.create.0":"GET-only live run: needs POST /api/v1/events/{event_id}/replay"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let event_ref01_data = Object.values(setup.data.existing.event)[0] as any

    // LIST
    const event_ref01_ent = client.Event()
    const event_ref01_match: any = {}

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e: any) => e.data())


    // LOAD
    const event_ref01_match_dt0: any = {}
    event_ref01_match_dt0.id = event_ref01_data.id
    const event_ref01_data_dt0 = (await event_ref01_ent.load(event_ref01_match_dt0)).data()
    assert(event_ref01_data_dt0.id === event_ref01_data.id)


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
      '../../../../.sdk/test/entity/event/EventTestData.json')

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
    ['event01','event02','event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_EVENT_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_EVENT_ENTID']
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
  
