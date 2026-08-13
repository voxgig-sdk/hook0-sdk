
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


describe('ApplicationEntity', async () => {

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
    assert(null != application_ref01_data)


    // LIST
    const application_ref01_match = {}

    const application_ref01_list = (await application_ref01_ent.list(application_ref01_match)).map((e) => e.data())


    // UPDATE
    const application_ref01_data_up0 = {}

    const application_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_ref01_' + setup.now }
    application_ref01_data_up0 [application_ref01_markdef_up0.name] = application_ref01_markdef_up0.value

    const application_ref01_resdata_up0 = (await application_ref01_ent.update(application_ref01_data_up0)).data()
    assert(null != application_ref01_resdata_up0)

    assert(application_ref01_resdata_up0[application_ref01_markdef_up0.name] === application_ref01_markdef_up0.value)


    // LOAD
    const application_ref01_match_dt0 = {}
    const application_ref01_data_dt0 = (await application_ref01_ent.load(application_ref01_match_dt0)).data()
    assert(null != application_ref01_data_dt0)



    // LIST
    const application_ref01_match_rt0 = {}

    const application_ref01_list_rt0 = (await application_ref01_ent.list(application_ref01_match_rt0)).map((e) => e.data())


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
    'HOOK0_APIKEY': 'NONE',
  })

  idmap = env['HOOK0_TEST_APPLICATION_ENTID']

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
  
