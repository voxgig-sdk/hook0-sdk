
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


describe('UserAuthenticationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.UserAuthentication()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":0},"new_password":{"a":true,"h":"New Password","n":"new_password","r":true,"t":"`$STRING`","key$":"new_password","index$":1},"token":{"a":true,"h":"Token","n":"token","r":true,"t":"`$STRING`","key$":"token","index$":2}},"name":"user_authentication","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/auth/begin-reset-password","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/begin-reset-password","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"begin-reset-password"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/v1/auth/logout","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/logout","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"logout"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /api/v1/auth/password","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/password","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"password"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /api/v1/auth/reset-password","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/reset-password","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"reset-password"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"POST /api/v1/auth/verify-email","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/verify-email","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"verify-email"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"user_authentication","name__orig":"user_authentication","Name":"UserAuthentication","name_":"user_authentication","name-":"user-authentication","NAME":"USER_AUTHENTICATION","index$":21}, {"active":true,"entity":"user_authentication","key$":"BasicUserAuthenticationFlow","kind":"basic","name":"BasicUserAuthenticationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_authentication_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'UserAuthentication', {"POST /api/v1/auth/begin-reset-password":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","key$":"email"}},"required":["email"],"x-ref":"#/components/schemas/BeginResetPasswordPost","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/auth/logout":{"protocol":"http","parameters":[]},"POST /api/v1/auth/password":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"new_password":{"type":"string","key$":"new_password"}},"required":["new_password"],"x-ref":"#/components/schemas/ChangePasswordPost","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/auth/reset-password":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"new_password":{"type":"string","key$":"new_password"},"token":{"type":"string","key$":"token"}},"required":["new_password","token"],"x-ref":"#/components/schemas/ResetPasswordPost","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/auth/verify-email":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"token":{"type":"string","key$":"token"}},"required":["token"],"x-ref":"#/components/schemas/EmailVerificationPost","index$":1}}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_authentication_ref01_ent = client.UserAuthentication()
    let user_authentication_ref01_data = setup.data.new.user_authentication['user_authentication_ref01']

    user_authentication_ref01_data = (await user_authentication_ref01_ent.create(user_authentication_ref01_data)).data()
    assert(null != user_authentication_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/user_authentication/UserAuthenticationTestData.json')

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
    ['user_authentication01','user_authentication02','user_authentication03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_USER_AUTHENTICATION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_USER_AUTHENTICATION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_USER_AUTHENTICATION_ENTID']
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
  
