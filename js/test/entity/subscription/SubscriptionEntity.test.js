
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


describe('SubscriptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Subscription()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"application_id","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"dedicated_workers","op":{"create":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"req":true,"type":"`$ARRAY`","index$":2},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"event_types","req":true,"type":"`$ARRAY`","index$":4},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"is_enabled","req":true,"type":"`$BOOLEAN`","index$":6},{"active":true,"name":"label_key","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"req":true,"short":"_Kept for backward compatibility, you should use `labels`_","type":"`$STRING`","index$":7},{"active":true,"name":"label_value","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"req":true,"short":"_Kept for backward compatibility, you should use `labels`_","type":"`$STRING`","index$":8},{"active":true,"name":"labels","op":{"create":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"req":true,"type":"`$OBJECT`","index$":9},{"active":true,"name":"metadata","op":{"create":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"req":true,"type":"`$OBJECT`","index$":10},{"active":true,"format":"uuid","name":"secret","req":true,"type":"`$STRING`","index$":11},{"active":true,"format":"uuid","name":"subscription_id","req":true,"type":"`$STRING`","index$":12},{"active":true,"name":"target","req":true,"type":"`$OBJECT`","index$":13},{"active":true,"format":"date-time","name":"updated_at","req":true,"type":"`$STRING`","index$":14}],"id":{"field":"id","name":"id"},"name":"subscription","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/subscriptions/","json":"{\"operationId\":\"subscriptions.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"}},\"required\":[\"application_id\",\"event_types\",\"is_enabled\",\"target\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"secret\":{\"format\":\"uuid\",\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"application_id\",\"created_at\",\"dedicated_workers\",\"event_types\",\"is_enabled\",\"label_key\",\"label_value\",\"labels\",\"metadata\",\"secret\",\"subscription_id\",\"target\",\"updated_at\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/subscriptions/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/subscriptions/","json":"{\"operationId\":\"subscriptions.list\",\"parameters\":[{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"secret\":{\"format\":\"uuid\",\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"application_id\",\"created_at\",\"dedicated_workers\",\"event_types\",\"is_enabled\",\"label_key\",\"label_value\",\"labels\",\"metadata\",\"secret\",\"subscription_id\",\"target\",\"updated_at\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/subscriptions/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"}],"select":{"exist":["application_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"subscription_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/subscriptions/{subscription_id}","json":"{\"operationId\":\"subscriptions.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"subscription_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"secret\":{\"format\":\"uuid\",\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"application_id\",\"created_at\",\"dedicated_workers\",\"event_types\",\"is_enabled\",\"label_key\",\"label_value\",\"labels\",\"metadata\",\"secret\",\"subscription_id\",\"target\",\"updated_at\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/subscriptions/{subscription_id}","rename":{"param":{"subscription_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"subscription_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"application_id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/v1/subscriptions/{subscription_id}","json":"{\"operationId\":\"subscriptions.delete\",\"parameters\":[{\"in\":\"path\",\"name\":\"subscription_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"},{\"in\":\"query\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No Content\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/v1/subscriptions/{subscription_id}","rename":{"param":{"subscription_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"select":{"exist":["application_id","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"subscription_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/subscriptions/{subscription_id}","json":"{\"operationId\":\"subscriptions.update\",\"parameters\":[{\"in\":\"path\",\"name\":\"subscription_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"}},\"required\":[\"application_id\",\"event_types\",\"is_enabled\",\"target\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"application_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"dedicated_workers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"event_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"is_enabled\":{\"type\":\"boolean\"},\"label_key\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"label_value\":{\"description\":\"_Kept for backward compatibility, you should use `labels`_\",\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"secret\":{\"format\":\"uuid\",\"type\":\"string\"},\"subscription_id\":{\"format\":\"uuid\",\"type\":\"string\"},\"target\":{\"properties\":{\"headers\":{\"type\":\"object\"},\"method\":{\"type\":\"string\"},\"type\":{\"example\":\"http\",\"type\":\"string\"},\"url\":{\"format\":\"url\",\"type\":\"string\"}},\"required\":[\"headers\",\"method\",\"type\",\"url\"],\"type\":\"object\"},\"updated_at\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"application_id\",\"created_at\",\"dedicated_workers\",\"event_types\",\"is_enabled\",\"label_key\",\"label_value\",\"labels\",\"metadata\",\"secret\",\"subscription_id\",\"target\",\"updated_at\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/subscriptions/{subscription_id}","rename":{"param":{"subscription_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"subscriptions"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"subscription","name__orig":"subscription","Name":"Subscription","name_":"subscription","name-":"subscription","NAME":"SUBSCRIPTION","index$":21}, {"active":true,"entity":"subscription","key$":"BasicSubscriptionFlow","kind":"basic","name":"BasicSubscriptionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"subscription_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"subscription_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_up0","textfield":"application_id"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_dt0"},"match":{"id":"subscription01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"subscription_ref01","suffix":"_rm0"},"match":{"id":"subscription01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"subscription_ref01"}}],"index$":5}]}, 'Subscription')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const subscription_ref01_ent = client.Subscription()
    let subscription_ref01_data = setup.data.new.subscription['subscription_ref01']

    subscription_ref01_data = (await subscription_ref01_ent.create(subscription_ref01_data)).data()
    assert(null != subscription_ref01_data.id)


    // LIST
    const subscription_ref01_match = {}

    const subscription_ref01_list = (await subscription_ref01_ent.list(subscription_ref01_match)).map((e) => e.data())

    assert(!isempty(select(subscription_ref01_list, { id: subscription_ref01_data.id })))


    // UPDATE
    const subscription_ref01_data_up0 = {}
    subscription_ref01_data_up0.id = subscription_ref01_data.id

    const subscription_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-subscription_ref01_' + setup.now }
    subscription_ref01_data_up0 [subscription_ref01_markdef_up0.name] = subscription_ref01_markdef_up0.value

    const subscription_ref01_resdata_up0 = (await subscription_ref01_ent.update(subscription_ref01_data_up0)).data()
    assert(subscription_ref01_resdata_up0.id === subscription_ref01_data_up0.id)

    assert(subscription_ref01_resdata_up0[subscription_ref01_markdef_up0.name] === subscription_ref01_markdef_up0.value)


    // LOAD
    const subscription_ref01_match_dt0 = {}
    subscription_ref01_match_dt0.id = subscription_ref01_data.id
    const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data()
    assert(subscription_ref01_data_dt0.id === subscription_ref01_data.id)


    // REMOVE
    const subscription_ref01_match_rm0 = {}
    subscription_ref01_match_rm0.id = subscription_ref01_data.id
    await subscription_ref01_ent.remove(subscription_ref01_match_rm0)
  

    // LIST
    const subscription_ref01_match_rt0 = {}

    const subscription_ref01_list_rt0 = (await subscription_ref01_ent.list(subscription_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(subscription_ref01_list_rt0, { id: subscription_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/subscription/SubscriptionTestData.json')

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
    ['subscription01','subscription02','subscription03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_SUBSCRIPTION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_SUBSCRIPTION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_SUBSCRIPTION_ENTID']
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
  
