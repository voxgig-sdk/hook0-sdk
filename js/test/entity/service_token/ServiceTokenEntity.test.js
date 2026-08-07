
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


describe('ServiceTokenEntity', async () => {

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.ServiceToken()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const service_token_ref01_ent = client.ServiceToken()
    let service_token_ref01_data = setup.data.new.service_token['service_token_ref01']

    service_token_ref01_data = await service_token_ref01_ent.create(service_token_ref01_data)
    assert(null != service_token_ref01_data)


    // LIST
    const service_token_ref01_match = {}

    const service_token_ref01_list = await service_token_ref01_ent.list(service_token_ref01_match)


    // UPDATE
    const service_token_ref01_data_up0 = {}

    const service_token_ref01_markdef_up0 = { name: 'biscuit', value: 'Mark01-service_token_ref01_' + setup.now }
    service_token_ref01_data_up0 [service_token_ref01_markdef_up0.name] = service_token_ref01_markdef_up0.value

    const service_token_ref01_resdata_up0 = await service_token_ref01_ent.update(service_token_ref01_data_up0)
    assert(null != service_token_ref01_resdata_up0)

    assert(service_token_ref01_resdata_up0[service_token_ref01_markdef_up0.name] === service_token_ref01_markdef_up0.value)


    // LOAD
    const service_token_ref01_match_dt0 = {}
    const service_token_ref01_data_dt0 = await service_token_ref01_ent.load(service_token_ref01_match_dt0)
    assert(null != service_token_ref01_data_dt0)



    // LIST
    const service_token_ref01_match_rt0 = {}

    const service_token_ref01_list_rt0 = await service_token_ref01_ent.list(service_token_ref01_match_rt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/service_token/ServiceTokenTestData.json')

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
    ['service_token01','service_token02','service_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK__TEST_SERVICE_TOKEN_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_SERVICE_TOKEN_ENTID']

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
  
