
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { Hook0SDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EventTypeEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.EventType()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_type_ref01_ent = client.EventType()
    let event_type_ref01_data = setup.data.new.event_type['event_type_ref01']

    event_type_ref01_data = await event_type_ref01_ent.create(event_type_ref01_data)
    assert(null != event_type_ref01_data)


    // LIST
    const event_type_ref01_match = {}

    const event_type_ref01_list = await event_type_ref01_ent.list(event_type_ref01_match)


    // LOAD
    const event_type_ref01_match_dt0 = {}
    const event_type_ref01_data_dt0 = await event_type_ref01_ent.load(event_type_ref01_match_dt0)
    assert(null != event_type_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/event_type/EventTypeTestData.json')

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
    ['event_type01','event_type02','event_type03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK__TEST_EVENT_TYPE_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_EVENT_TYPE_ENTID']

  if ('TRUE' === env.HOOK__TEST_LIVE) {
    client = new Hook0SDK(merge([
      {
        apikey: env.HOOK__APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HOOK__TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
