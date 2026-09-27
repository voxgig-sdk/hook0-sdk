
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


describe('EventsManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.EventsManagement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"events_management","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/payload_content_types/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/payload_content_types/","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"payload_content_types"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/event_types/{event_type_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"event_type_name","or":"event_type_name","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"application_id","or":"application_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/event_types/{event_type_name}","q":{"exist":["application_id","event_type_name"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"event_types"},{"var":"event_type_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.event_type"]]},"key$":"events_management","name__orig":"events_management","Name":"EventsManagement","name_":"events_management","name-":"events-management","NAME":"EVENTS_MANAGEMENT","index$":5}, {"active":true,"entity":"events_management","key$":"BasicEventsManagementFlow","kind":"basic","name":"BasicEventsManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"events_management_ref01"}}],"index$":0}]}, 'EventsManagement', {"GET /api/v1/payload_content_types/":{"protocol":"http","parameters":[]},"DELETE /api/v1/event_types/{event_type_name}":{"protocol":"http","parameters":[{"in":"path","name":"event_type_name","required":true,"schema":{"type":"string"},"style":"simple","index$":0},{"in":"query","name":"application_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"form","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let events_management_ref01_data = Object.values(setup.data.existing.events_management)[0]

    // LIST
    const events_management_ref01_ent = client.EventsManagement()
    const events_management_ref01_match = {}

    const events_management_ref01_list = (await events_management_ref01_ent.list(events_management_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/events_management/EventsManagementTestData.json')

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
    ['events_management01','events_management02','events_management03','event_type01','event_type02','event_type03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_EVENTS_MANAGEMENT_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_EVENTS_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_EVENTS_MANAGEMENT_ENTID']
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
  
