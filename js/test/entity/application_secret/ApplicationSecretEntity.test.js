
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


describe('ApplicationSecretEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.ApplicationSecret()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const application_secret_ref01_ent = client.ApplicationSecret()
    let application_secret_ref01_data = setup.data.new.application_secret['application_secret_ref01']

    application_secret_ref01_data = await application_secret_ref01_ent.create(application_secret_ref01_data)
    assert(null != application_secret_ref01_data)


    // LIST
    const application_secret_ref01_match = {}

    const application_secret_ref01_list = await application_secret_ref01_ent.list(application_secret_ref01_match)


    // UPDATE
    const application_secret_ref01_data_up0 = {}

    const application_secret_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_secret_ref01_' + setup.now }
    application_secret_ref01_data_up0 [application_secret_ref01_markdef_up0.name] = application_secret_ref01_markdef_up0.value

    const application_secret_ref01_resdata_up0 = await application_secret_ref01_ent.update(application_secret_ref01_data_up0)
    assert(null != application_secret_ref01_resdata_up0)

    assert(application_secret_ref01_resdata_up0[application_secret_ref01_markdef_up0.name] === application_secret_ref01_markdef_up0.value)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/application_secret/ApplicationSecretTestData.json')

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
    ['application_secret01','application_secret02','application_secret03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK__TEST_APPLICATION_SECRET_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_APPLICATION_SECRET_ENTID']

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
  
