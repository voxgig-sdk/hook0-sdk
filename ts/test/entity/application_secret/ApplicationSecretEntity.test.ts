
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { Hook0SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ApplicationSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.ApplicationSecret()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOOK__TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (maybeSkipControl(t, 'entityOp', 'application_secret.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set HOOK__TEST_APPLICATION_SECRET_ENTID JSON to run live')
      return
    }
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
    const application_secret_ref01_match: any = {}

    const application_secret_ref01_list = await application_secret_ref01_ent.list(application_secret_ref01_match)


    // UPDATE
    const application_secret_ref01_data_up0: any = {}

    const application_secret_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_secret_ref01_' + setup.now }
    ;(application_secret_ref01_data_up0 as any)[application_secret_ref01_markdef_up0.name] = application_secret_ref01_markdef_up0.value

    const application_secret_ref01_resdata_up0 = await application_secret_ref01_ent.update(application_secret_ref01_data_up0)
    assert(null != application_secret_ref01_resdata_up0)

    assert((application_secret_ref01_resdata_up0 as any)[application_secret_ref01_markdef_up0.name] === application_secret_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['HOOK__TEST_APPLICATION_SECRET_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'HOOK__TEST_APPLICATION_SECRET_ENTID': idmap,
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__TEST_EXPLAIN': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  idmap = env['HOOK__TEST_APPLICATION_SECRET_ENTID']

  const live = 'TRUE' === env.HOOK__TEST_LIVE

  if (live) {
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
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
