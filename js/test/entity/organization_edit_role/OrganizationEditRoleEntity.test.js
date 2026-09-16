
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


describe('OrganizationEditRoleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.OrganizationEditRole()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"role","req":true,"type":"`$STRING`","index$":1},{"active":true,"format":"uuid","name":"user_id","req":true,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"organization_edit_role","op":{"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/organizations/{organization_id}/invite","json":"{\"operationId\":\"organizations.edit_role\",\"parameters\":[{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"role\":{\"type\":\"string\"},\"user_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"role\",\"user_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"role\":{\"type\":\"string\"},\"user_id\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"role\",\"user_id\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/organizations/{organization_id}/invite","rename":{"param":{"organization_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"},{"lit":"invite"}],"select":{"$action":"invite","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization_edit_role","name__orig":"organization_edit_role","Name":"OrganizationEditRole","name_":"organization_edit_role","name-":"organization-edit-role","NAME":"ORGANIZATION_EDIT_ROLE","index$":13}, {"active":true,"entity":"organization_edit_role","key$":"BasicOrganizationEditRoleFlow","kind":"basic","name":"BasicOrganizationEditRoleFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"organization_edit_role_ref01","srcdatavar":"organization_edit_role_ref01_data","suffix":"_up0","textfield":"role"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_edit_role_ref01"}}],"valid":[],"index$":0}]}, 'OrganizationEditRole')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_edit_role_ref01_data = Object.values(setup.data.existing.organization_edit_role)[0]

    // UPDATE
    const organization_edit_role_ref01_ent = client.OrganizationEditRole()
    const organization_edit_role_ref01_data_up0 = {}
    organization_edit_role_ref01_data_up0.id = organization_edit_role_ref01_data.id

    const organization_edit_role_ref01_markdef_up0 = { name: 'role', value: 'Mark01-organization_edit_role_ref01_' + setup.now }
    organization_edit_role_ref01_data_up0 [organization_edit_role_ref01_markdef_up0.name] = organization_edit_role_ref01_markdef_up0.value

    const organization_edit_role_ref01_resdata_up0 = (await organization_edit_role_ref01_ent.update(organization_edit_role_ref01_data_up0)).data()
    assert(organization_edit_role_ref01_resdata_up0.id === organization_edit_role_ref01_data_up0.id)

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
    'HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID']
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
  
