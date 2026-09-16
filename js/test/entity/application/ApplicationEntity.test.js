
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


describe('ApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOOK0_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOOK0_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Hook0SDK.test()
    const ent = testsdk.Application()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"application_id","req":true,"short":"Unique identifier of the application.","type":"`$STRING`","index$":0},{"active":true,"name":"consumption","req":true,"short":"Current consumption metrics for this application.","type":"`$OBJECT`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"name","req":true,"short":"Name of the application.","type":"`$STRING`","index$":3},{"active":true,"name":"onboarding_steps","req":true,"short":"Onboarding completion status for this application.","type":"`$OBJECT`","index$":4},{"active":true,"format":"uuid","name":"organization_id","req":true,"short":"UUID of the organization this application belongs to.","type":"`$STRING`","index$":5},{"active":true,"name":"quotas","req":true,"short":"Quota limits for this application.","type":"`$OBJECT`","index$":6}],"id":{"field":"id","name":"id"},"name":"application","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/applications/","json":"{\"operationId\":\"applications.create\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Request body to create a new application.\",\"properties\":{\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"name\",\"organization_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Hook0 application.\",\"properties\":{\"application_id\":{\"description\":\"Unique identifier of the application.\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"application_id\",\"name\",\"organization_id\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/applications/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"applications"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"organization_id","orig":"organization_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/applications/","json":"{\"operationId\":\"applications.list\",\"parameters\":[{\"in\":\"query\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"A Hook0 application.\",\"properties\":{\"application_id\":{\"description\":\"Unique identifier of the application.\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"application_id\",\"name\",\"organization_id\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/applications/","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"applications"}],"select":{"exist":["organization_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/applications/{application_id}","json":"{\"operationId\":\"applications.get\",\"parameters\":[{\"in\":\"path\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Detailed information about a Hook0 application.\",\"properties\":{\"application_id\":{\"description\":\"Unique identifier of the application.\",\"format\":\"uuid\",\"type\":\"string\"},\"consumption\":{\"description\":\"Current consumption metrics for this application.\",\"properties\":{\"events_per_day\":{\"format\":\"int32\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"onboarding_steps\":{\"description\":\"Onboarding completion status for this application.\",\"properties\":{\"event\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"event_type\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"},\"subscription\":{\"enum\":[\"ToDo\",\"Done\"],\"type\":\"string\"}},\"required\":[\"event\",\"event_type\",\"subscription\"],\"type\":\"object\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"},\"quotas\":{\"description\":\"Quota limits for this application.\",\"properties\":{\"days_of_events_retention_limit\":{\"format\":\"int32\",\"type\":\"integer\"},\"events_per_day_limit\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"days_of_events_retention_limit\",\"events_per_day_limit\"],\"type\":\"object\"}},\"required\":[\"application_id\",\"consumption\",\"name\",\"onboarding_steps\",\"organization_id\",\"quotas\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/applications/{application_id}","rename":{"param":{"application_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"applications"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/v1/applications/{application_id}","json":"{\"operationId\":\"applications.delete\",\"parameters\":[{\"in\":\"path\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"No Content\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/v1/applications/{application_id}","rename":{"param":{"application_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"applications"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /api/v1/applications/{application_id}","json":"{\"operationId\":\"applications.update\",\"parameters\":[{\"in\":\"path\",\"name\":\"application_id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Request body to create a new application.\",\"properties\":{\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"name\",\"organization_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Hook0 application.\",\"properties\":{\"application_id\":{\"description\":\"Unique identifier of the application.\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the application. Length: 2-50 characters.\",\"type\":\"string\"},\"organization_id\":{\"description\":\"UUID of the organization this application belongs to.\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"application_id\",\"name\",\"organization_id\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"description\":\"Bad Request\"},\"403\":{\"description\":\"Forbidden\"},\"404\":{\"description\":\"Not Found\"},\"409\":{\"description\":\"Conflict\"},\"500\":{\"description\":\"Internal Server Error\"},\"503\":{\"description\":\"Service Unavailable\"}},\"security\":[{\"biscuit\":[]}],\"securitySchemes\":{\"biscuit\":{\"description\":\"Authentication using a Biscuit token (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_refresh\":{\"description\":\"Authentication using a Biscuit token of type 'refresh' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"},\"biscuit_user_access\":{\"description\":\"Authentication using a Biscuit token of type 'user_access' (use the format `Bearer TOKEN`)\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/v1/applications/{application_id}","rename":{"param":{"application_id":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"applications"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"application","name__orig":"application","Name":"Application","name_":"application","name-":"application","NAME":"APPLICATION","index$":0}, {"active":true,"entity":"application","key$":"BasicApplicationFlow","kind":"basic","name":"BasicApplicationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"application_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"application_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"application_ref01","srcdatavar":"application_ref01_data","suffix":"_up0","textfield":"application_id"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"application_ref01","srcdatavar":"application_ref01_data","suffix":"_dt0"},"match":{"id":"application01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"application_ref01","suffix":"_rm0"},"match":{"id":"application01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"application_ref01"}}],"index$":5}]}, 'Application')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const application_ref01_ent = client.Application()
    let application_ref01_data = setup.data.new.application['application_ref01']

    application_ref01_data = (await application_ref01_ent.create(application_ref01_data)).data()
    assert(null != application_ref01_data.id)


    // LIST
    const application_ref01_match = {}

    const application_ref01_list = (await application_ref01_ent.list(application_ref01_match)).map((e) => e.data())

    assert(!isempty(select(application_ref01_list, { id: application_ref01_data.id })))


    // UPDATE
    const application_ref01_data_up0 = {}
    application_ref01_data_up0.id = application_ref01_data.id

    const application_ref01_markdef_up0 = { name: 'application_id', value: 'Mark01-application_ref01_' + setup.now }
    application_ref01_data_up0 [application_ref01_markdef_up0.name] = application_ref01_markdef_up0.value

    const application_ref01_resdata_up0 = (await application_ref01_ent.update(application_ref01_data_up0)).data()
    assert(application_ref01_resdata_up0.id === application_ref01_data_up0.id)

    assert(application_ref01_resdata_up0[application_ref01_markdef_up0.name] === application_ref01_markdef_up0.value)


    // LOAD
    const application_ref01_match_dt0 = {}
    application_ref01_match_dt0.id = application_ref01_data.id
    const application_ref01_data_dt0 = (await application_ref01_ent.load(application_ref01_match_dt0)).data()
    assert(application_ref01_data_dt0.id === application_ref01_data.id)


    // REMOVE
    const application_ref01_match_rm0 = {}
    application_ref01_match_rm0.id = application_ref01_data.id
    await application_ref01_ent.remove(application_ref01_match_rm0)
  

    // LIST
    const application_ref01_match_rt0 = {}

    const application_ref01_list_rt0 = (await application_ref01_ent.list(application_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(application_ref01_list_rt0, { id: application_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/application/ApplicationTestData.json')

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
    ['application01','application02','application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOOK0_TEST_APPLICATION_ENTID': idmap,
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_TEST_EXPLAIN': 'FALSE',
    'HOOK0_APIKEY': '',
  })

  idmap = env['HOOK0_TEST_APPLICATION_ENTID']

  const live = 'TRUE' === env.HOOK0_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOOK0_TEST_APPLICATION_ENTID']
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
  
