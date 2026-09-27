

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Hook0SDK, BaseFeature, stdutil } from '../../..'

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

    const live = 'TRUE' === process.env.HOOK0_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_edit_role.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":1},"user_id":{"a":true,"fo":"uuid","h":"User Id","n":"user_id","r":true,"t":"`$STRING`","key$":"user_id","index$":2}},"id":{"field":"id","name":"id"},"name":"organization_edit_role","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/v1/organizations/{organization_id}/invite","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/invite","q":{"$action":"invite","exist":["id"]},"r":{"param":{"organization_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"},{"lit":"invite"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization_edit_role","name__orig":"organization_edit_role","Name":"OrganizationEditRole","name_":"organization_edit_role","name-":"organization-edit-role","NAME":"ORGANIZATION_EDIT_ROLE","index$":12}, {"active":true,"entity":"organization_edit_role","key$":"BasicOrganizationEditRoleFlow","kind":"basic","name":"BasicOrganizationEditRoleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_edit_role_ref01","srcdatavar":"organization_edit_role_ref01_data","suffix":"_up0","textfield":"role"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_edit_role_ref01"}}],"v":[],"index$":0}]}, 'OrganizationEditRole', {"PUT /api/v1/organizations/{organization_id}/invite":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"role":{"type":"string","key$":"role"},"user_id":{"type":"string","format":"uuid","key$":"user_id"}},"required":["role","user_id"],"x-ref":"#/components/schemas/OrganizationEditRole"}}},"required":true},"parameters":[{"in":"path","name":"organization_id","required":true,"schema":{"type":"string","format":"uuid"},"style":"simple","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_edit_role_ref01_data = Object.values(setup.data.existing.organization_edit_role)[0] as any

    // UPDATE
    const organization_edit_role_ref01_ent = client.OrganizationEditRole()
    const organization_edit_role_ref01_data_up0: any = {}
    organization_edit_role_ref01_data_up0.id = organization_edit_role_ref01_data.id

    const organization_edit_role_ref01_markdef_up0 = { name: 'role', value: 'Mark01-organization_edit_role_ref01_' + setup.now }
    ;(organization_edit_role_ref01_data_up0 as any)[organization_edit_role_ref01_markdef_up0.name] = organization_edit_role_ref01_markdef_up0.value

    const organization_edit_role_ref01_resdata_up0 = (await organization_edit_role_ref01_ent.update(organization_edit_role_ref01_data_up0)).data()
    assert(organization_edit_role_ref01_resdata_up0.id === organization_edit_role_ref01_data_up0.id)

    assert((organization_edit_role_ref01_resdata_up0 as any)[organization_edit_role_ref01_markdef_up0.name] === organization_edit_role_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
  
