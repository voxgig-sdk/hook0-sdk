
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


describe('OrganizationEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_ref01_ent = client.Organization()
    let organization_ref01_data = setup.data.new.organization['organization_ref01']

    organization_ref01_data = await organization_ref01_ent.create(organization_ref01_data)
    assert(null != organization_ref01_data)


    // LIST
    const organization_ref01_match = {}

    const organization_ref01_list = await organization_ref01_ent.list(organization_ref01_match)


    // UPDATE
    const organization_ref01_data_up0 = {}

    const organization_ref01_markdef_up0 = { name: 'name', value: 'Mark01-organization_ref01_' + setup.now }
    organization_ref01_data_up0 [organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value

    const organization_ref01_resdata_up0 = await organization_ref01_ent.update(organization_ref01_data_up0)
    assert(null != organization_ref01_resdata_up0)

    assert(organization_ref01_resdata_up0[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value)


    // LOAD
    const organization_ref01_match_dt0 = {}
    const organization_ref01_data_dt0 = await organization_ref01_ent.load(organization_ref01_match_dt0)
    assert(null != organization_ref01_data_dt0)



    // LIST
    const organization_ref01_match_rt0 = {}

    const organization_ref01_list_rt0 = await organization_ref01_ent.list(organization_ref01_match_rt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK__TEST_ORGANIZATION_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_ORGANIZATION_ENTID']

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
  
