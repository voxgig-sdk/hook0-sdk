
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


describe('OrganizationEditRoleEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.OrganizationEditRole()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_edit_role_ref01_data = Object.values(setup.data.existing.organization_edit_role)[0]

    // UPDATE
    const organization_edit_role_ref01_ent = client.OrganizationEditRole()
    const organization_edit_role_ref01_data_up0 = {}

    const organization_edit_role_ref01_markdef_up0 = { name: 'role', value: 'Mark01-organization_edit_role_ref01_' + setup.now }
    organization_edit_role_ref01_data_up0 [organization_edit_role_ref01_markdef_up0.name] = organization_edit_role_ref01_markdef_up0.value

    const organization_edit_role_ref01_resdata_up0 = await organization_edit_role_ref01_ent.update(organization_edit_role_ref01_data_up0)
    assert(null != organization_edit_role_ref01_resdata_up0)

    assert(organization_edit_role_ref01_resdata_up0[organization_edit_role_ref01_markdef_up0.name] === organization_edit_role_ref01_markdef_up0.value)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/organization_edit_role/OrganizationEditRoleTestData.json')

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
    ['organization_edit_role01','organization_edit_role02','organization_edit_role03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_ORGANIZATION_EDIT_ROLE_ENTID']

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
  
