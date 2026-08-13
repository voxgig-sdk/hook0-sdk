
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


describe('SubscriptionEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Subscription()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const subscription_ref01_ent = client.Subscription()
    let subscription_ref01_data = setup.data.new.subscription['subscription_ref01']

    subscription_ref01_data = (await subscription_ref01_ent.create(subscription_ref01_data)).data()
    assert(null != subscription_ref01_data)


    // LIST
    const subscription_ref01_match = {}

    const subscription_ref01_list = (await subscription_ref01_ent.list(subscription_ref01_match)).map((e) => e.data())


    // UPDATE
    const subscription_ref01_data_up0 = {}

    const subscription_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-subscription_ref01_' + setup.now }
    subscription_ref01_data_up0 [subscription_ref01_markdef_up0.name] = subscription_ref01_markdef_up0.value

    const subscription_ref01_resdata_up0 = (await subscription_ref01_ent.update(subscription_ref01_data_up0)).data()
    assert(null != subscription_ref01_resdata_up0)

    assert(subscription_ref01_resdata_up0[subscription_ref01_markdef_up0.name] === subscription_ref01_markdef_up0.value)


    // LOAD
    const subscription_ref01_match_dt0 = {}
    const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data()
    assert(null != subscription_ref01_data_dt0)



    // LIST
    const subscription_ref01_match_rt0 = {}

    const subscription_ref01_list_rt0 = (await subscription_ref01_ent.list(subscription_ref01_match_rt0)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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
    'HOOK0_APIKEY': 'NONE',
  })

  idmap = env['HOOK0_TEST_SUBSCRIPTION_ENTID']

  if ('TRUE' === env.HOOK0_TEST_LIVE) {
    client = new Hook0SDK(merge([
      {
        apikey: env.HOOK0_APIKEY,
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
    explain: 'TRUE' === env.HOOK0_TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
