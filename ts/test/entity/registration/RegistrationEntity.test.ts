

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Hook0SDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RegistrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Registration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = Hook0SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Registration().create({"email":1,"first_name":"x","last_name":"x","password":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'registration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":0},"first_name":{"a":true,"h":"First Name","n":"first_name","r":true,"t":"`$STRING`","key$":"first_name","index$":1},"gclid":{"a":true,"h":"Gclid","n":"gclid","r":false,"sh":"Optional Google Ads click identifier captured during the user's journey from a Google Ad.","t":"`$STRING`","key$":"gclid","index$":2},"last_name":{"a":true,"h":"Last Name","n":"last_name","r":true,"t":"`$STRING`","key$":"last_name","index$":3},"password":{"a":true,"h":"Password","n":"password","r":true,"t":"`$STRING`","key$":"password","index$":4},"signup_channel":{"a":true,"h":"Signup Channel","n":"signup_channel","r":false,"sh":"Optional label saying where this signup came from (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …), derived in the browser from the referrer and campaign parameters.","t":"`$STRING`","key$":"signup_channel","index$":5},"turnstile_token":{"a":true,"h":"Turnstile Token","n":"turnstile_token","r":false,"t":"`$STRING`","key$":"turnstile_token","index$":6}},"name":"registration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","first_name","gclid","last_name","password","signup_channel","turnstile_token"],"co":{"id":"POST /api/v1/register/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/register/","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"register"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"registration","name__orig":"registration","Name":"Registration","name_":"registration","name-":"registration","NAME":"REGISTRATION","index$":15}, {"active":true,"entity":"registration","key$":"BasicRegistrationFlow","kind":"basic","name":"BasicRegistrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"registration_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Registration', {"POST /api/v1/register/":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","key$":"email"},"first_name":{"type":"string","key$":"first_name"},"gclid":{"description":"Optional Google Ads click identifier captured during the user's\n journey from a Google Ad. When present and the API has Google Ads\n credentials configured, the signup is uploaded as a click conversion\n (server-side, no PII leaves Hook0). Bounded length to defend against\n abuse — real gclid values are ~50–60 chars.","type":"string","key$":"gclid"},"last_name":{"type":"string","key$":"last_name"},"password":{"type":"string","key$":"password"},"signup_channel":{"description":"Optional label saying where this signup came from\n (`organic:google`, `social:linkedin`, `referral:<host>`, `direct`, …),\n derived in the browser from the referrer and campaign parameters. It\n carries no URL and no identifier, and it is re-validated server-side\n against a closed vocabulary, so a caller cannot write arbitrary text\n into the column. Anything unrecognised — including nothing at all — is\n stored as `unknown`.","type":"string","key$":"signup_channel"},"turnstile_token":{"type":"string","key$":"turnstile_token"}},"required":["email","first_name","last_name","password"],"x-ref":"#/components/schemas/RegistrationPost","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"registration.create.0":"GET-only live run: needs POST /api/v1/register/"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const registration_ref01_ent = client.Registration()
    let registration_ref01_data = setup.data.new.registration['registration_ref01']

    registration_ref01_data = (await registration_ref01_ent.create(registration_ref01_data)).data()
    assert(null != registration_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/registration/RegistrationTestData.json')

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
    ['registration01','registration02','registration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_REGISTRATION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_REGISTRATION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_REGISTRATION_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
