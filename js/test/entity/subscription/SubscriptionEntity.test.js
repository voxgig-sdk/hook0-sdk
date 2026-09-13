
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


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


describe('SubscriptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

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
    assert(null != subscription_ref01_data.id)


    // LIST
    const subscription_ref01_match = {}

    const subscription_ref01_list = (await subscription_ref01_ent.list(subscription_ref01_match)).map((e) => e.data())

    assert(!isempty(select(subscription_ref01_list, { id: subscription_ref01_data.id })))


    // UPDATE
    const subscription_ref01_data_up0 = {}
    subscription_ref01_data_up0.id = subscription_ref01_data.id

    const subscription_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-subscription_ref01_' + setup.now }
    subscription_ref01_data_up0 [subscription_ref01_markdef_up0.name] = subscription_ref01_markdef_up0.value

    const subscription_ref01_resdata_up0 = (await subscription_ref01_ent.update(subscription_ref01_data_up0)).data()
    assert(subscription_ref01_resdata_up0.id === subscription_ref01_data_up0.id)

    assert(subscription_ref01_resdata_up0[subscription_ref01_markdef_up0.name] === subscription_ref01_markdef_up0.value)


    // LOAD
    const subscription_ref01_match_dt0 = {}
    subscription_ref01_match_dt0.id = subscription_ref01_data.id
    const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data()
    assert(subscription_ref01_data_dt0.id === subscription_ref01_data.id)


    // REMOVE
    const subscription_ref01_match_rm0 = {}
    subscription_ref01_match_rm0.id = subscription_ref01_data.id
    await subscription_ref01_ent.remove(subscription_ref01_match_rm0)
  

    // LIST
    const subscription_ref01_match_rt0 = {}

    const subscription_ref01_list_rt0 = (await subscription_ref01_ent.list(subscription_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(subscription_ref01_list_rt0, { id: subscription_ref01_data.id })))


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
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_SUBSCRIPTION_ENTID']

  if ('TRUE' === env.HOOK0_TEST_LIVE) {
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
      extra || {}
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
  
