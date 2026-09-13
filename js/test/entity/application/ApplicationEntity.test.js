
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


describe('ApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Application()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const application_ref01_ent = client.Application()
    let application_ref01_data = setup.data.new.application['application_ref01']

    application_ref01_data = (await application_ref01_ent.create(application_ref01_data)).data()
    assert(null != application_ref01_data.id)


    // LIST
    const application_ref01_match = {}

    const application_ref01_list = (await application_ref01_ent.list(application_ref01_match)).map((e) => e.data())

    assert(!isempty(select(application_ref01_list, { id: application_ref01_data.id })))


    // UPDATE
    const application_ref01_data_up0 = {}
    application_ref01_data_up0.id = application_ref01_data.id

    const application_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_ref01_' + setup.now }
    application_ref01_data_up0 [application_ref01_markdef_up0.name] = application_ref01_markdef_up0.value

    const application_ref01_resdata_up0 = (await application_ref01_ent.update(application_ref01_data_up0)).data()
    assert(application_ref01_resdata_up0.id === application_ref01_data_up0.id)

    assert(application_ref01_resdata_up0[application_ref01_markdef_up0.name] === application_ref01_markdef_up0.value)


    // LOAD
    const application_ref01_match_dt0 = {}
    application_ref01_match_dt0.id = application_ref01_data.id
    const application_ref01_data_dt0 = (await application_ref01_ent.load(application_ref01_match_dt0)).data()
    assert(application_ref01_data_dt0.id === application_ref01_data.id)


    // REMOVE
    const application_ref01_match_rm0 = {}
    application_ref01_match_rm0.id = application_ref01_data.id
    await application_ref01_ent.remove(application_ref01_match_rm0)
  

    // LIST
    const application_ref01_match_rt0 = {}

    const application_ref01_list_rt0 = (await application_ref01_ent.list(application_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(application_ref01_list_rt0, { id: application_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/application/ApplicationTestData.json')

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
    ['application01','application02','application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_APPLICATION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_APPLICATION_ENTID']

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
  
