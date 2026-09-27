

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SubscriptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Subscription()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'subscription.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"application_id":{"a":true,"fo":"uuid","h":"Application Id","n":"application_id","r":true,"t":"`$STRING`","key$":"application_id","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"dedicated_workers":{"a":true,"h":"Dedicated Workers","n":"dedicated_workers","op":{"create":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"dedicated_workers","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"event_types":{"a":true,"h":"Event Types","n":"event_types","r":true,"t":"`$ARRAY`","key$":"event_types","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"is_enabled":{"a":true,"h":"Is Enabled","n":"is_enabled","r":true,"t":"`$BOOLEAN`","key$":"is_enabled","index$":6},"label_key":{"a":true,"h":"Label Key","n":"label_key","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"_Kept for backward compatibility, you should use `labels`_","t":"`$STRING`","key$":"label_key","index$":7},"label_value":{"a":true,"h":"Label Value","n":"label_value","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"_Kept for backward compatibility, you should use `labels`_","t":"`$STRING`","key$":"label_value","index$":8},"labels":{"a":true,"h":"Labels","n":"labels","op":{"create":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"labels","index$":9},"metadata":{"a":true,"h":"Metadata","n":"metadata","op":{"create":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"metadata","index$":10},"secret":{"a":true,"fo":"uuid","h":"Secret","n":"secret","r":true,"t":"`$STRING`","key$":"secret","index$":11},"subscription_id":{"a":true,"fo":"uuid","h":"Subscription Id","n":"subscription_id","r":true,"t":"`$STRING`","key$":"subscription_id","index$":12},"target":{"a":true,"h":"Target","n":"target","r":true,"t":"`$OBJECT`","key$":"target","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":14}},"id":{"field":"id","name":"id"},"name":"subscription","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/subscriptions/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/subscriptions/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/subscriptions/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/subscriptions/","q":{"exist":["application_id"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/subscriptions/{subscription_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"subscription_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/subscriptions/{subscription_id}","q":{"exist":["id"]},"r":{"param":{"subscription_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/subscriptions/{subscription_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"subscription_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/subscriptions/{subscription_id}","q":{"exist":["application_id","id"]},"r":{"param":{"subscription_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/v1/subscriptions/{subscription_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"subscription_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/subscriptions/{subscription_id}","q":{"exist":["id"]},"r":{"param":{"subscription_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"subscription","name__orig":"subscription","Name":"Subscription","name_":"subscription","name-":"subscription","NAME":"SUBSCRIPTION","index$":20}, {"active":true,"entity":"subscription","key$":"BasicSubscriptionFlow","kind":"basic","name":"BasicSubscriptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"subscription_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"subscription_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_up0","textfield":"application_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_dt0"},"m":{"id":"subscription01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"subscription_ref01","suffix":"_rm0"},"m":{"id":"subscription01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"subscription_ref01"}}],"index$":5}]}, 'Subscription', {"POST /api/v1/subscriptions/":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"application_id":{"type":"string","format":"uuid","key$":"application_id"},"dedicated_workers":{"type":"array","items":{"type":"string"},"key$":"dedicated_workers"},"description":{"type":"string","key$":"description"},"event_types":{"type":"array","items":{"type":"string"},"key$":"event_types"},"is_enabled":{"type":"boolean","key$":"is_enabled"},"label_key":{"description":"_Kept for backward compatibility, you should use `labels`_","type":"string","key$":"label_key"},"label_value":{"description":"_Kept for backward compatibility, you should use `labels`_","type":"string","key$":"label_value"},"labels":{"type":"object","additionalProperties":{"type":"string"},"key$":"labels"},"metadata":{"type":"object","additionalProperties":{"type":"string"},"key$":"metadata"},"target":{"type":"object","properties":{"headers":{"type":"object"},"method":{"type":"string"},"type":{"example":"http","type":"string"},"url":{"type":"string","format":"url"}},"required":["headers","method","type","url"],"key$":"target"}},"required":["application_id","event_types","is_enabled","target"],"x-ref":"#/components/schemas/SubscriptionPost","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/subscriptions/":{"protocol":"http","parameters":[{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":0}]},"GET /api/v1/subscriptions/{subscription_id}":{"protocol":"http","parameters":[{"in":"path","name":"subscription_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]},"DELETE /api/v1/subscriptions/{subscription_id}":{"protocol":"http","parameters":[{"in":"path","name":"subscription_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0},{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":1}]},"PUT /api/v1/subscriptions/{subscription_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"application_id":{"type":"string","format":"uuid","key$":"application_id"},"dedicated_workers":{"type":"array","items":{"type":"string"},"key$":"dedicated_workers"},"description":{"type":"string","key$":"description"},"event_types":{"type":"array","items":{"type":"string"},"key$":"event_types"},"is_enabled":{"type":"boolean","key$":"is_enabled"},"label_key":{"description":"_Kept for backward compatibility, you should use `labels`_","type":"string","key$":"label_key"},"label_value":{"description":"_Kept for backward compatibility, you should use `labels`_","type":"string","key$":"label_value"},"labels":{"type":"object","additionalProperties":{"type":"string"},"key$":"labels"},"metadata":{"type":"object","additionalProperties":{"type":"string"},"key$":"metadata"},"target":{"type":"object","properties":{"headers":{"type":"object"},"method":{"type":"string"},"type":{"example":"http","type":"string"},"url":{"type":"string","format":"url"}},"required":["headers","method","type","url"],"key$":"target"}},"required":["application_id","event_types","is_enabled","target"],"x-ref":"#/components/schemas/SubscriptionPost","index$":1}}},"required":true},"parameters":[{"in":"path","name":"subscription_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const subscription_ref01_ent = client.Subscription()
    let subscription_ref01_data = setup.data.new.subscription['subscription_ref01']

    subscription_ref01_data = (await subscription_ref01_ent.create(subscription_ref01_data)).data()
    assert(null != subscription_ref01_data.id)


    // LIST
    const subscription_ref01_match: any = {}

    const subscription_ref01_list = (await subscription_ref01_ent.list(subscription_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(subscription_ref01_list, { id: subscription_ref01_data.id })))


    // UPDATE
    const subscription_ref01_data_up0: any = {}
    subscription_ref01_data_up0.id = subscription_ref01_data.id

    const subscription_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-subscription_ref01_' + setup.now }
    ;(subscription_ref01_data_up0 as any)[subscription_ref01_markdef_up0.name] = subscription_ref01_markdef_up0.value

    const subscription_ref01_resdata_up0 = (await subscription_ref01_ent.update(subscription_ref01_data_up0)).data()
    assert(subscription_ref01_resdata_up0.id === subscription_ref01_data_up0.id)

    assert((subscription_ref01_resdata_up0 as any)[subscription_ref01_markdef_up0.name] === subscription_ref01_markdef_up0.value)


    // LOAD
    const subscription_ref01_match_dt0: any = {}
    subscription_ref01_match_dt0.id = subscription_ref01_data.id
    const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data()
    assert(subscription_ref01_data_dt0.id === subscription_ref01_data.id)


    // REMOVE
    const subscription_ref01_match_rm0: any = { id: subscription_ref01_data.id }
    await subscription_ref01_ent.remove(subscription_ref01_match_rm0)
  

    // LIST
    const subscription_ref01_match_rt0: any = {}

    const subscription_ref01_list_rt0 = (await subscription_ref01_ent.list(subscription_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(subscription_ref01_list_rt0, { id: subscription_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/subscription/SubscriptionTestData.json')

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
    ['subscription01','subscription02','subscription03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_SUBSCRIPTION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_SUBSCRIPTION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_SUBSCRIPTION_ENTID']
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
  
