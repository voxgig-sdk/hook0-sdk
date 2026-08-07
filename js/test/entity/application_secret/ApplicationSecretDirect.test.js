
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { Hook0SDK } = require('../../..')

const {
  envOverride,
} = require('../../utility')


describe('ApplicationSecretDirect', async () => {

  test('direct-exists', async () => {
    const sdk = new Hook0SDK({
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-list-application_secret', async () => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}

    const result = await client.direct({
      path: 'api/v1/application_secrets',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(result.status === 200)
    assert(Array.isArray(result.data))

    if (!setup.live) {
      assert(result.data.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
    }
  })

})



function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'HOOK__TEST_APPLICATION_SECRET_ENTID': {},
    'HOOK__TEST_LIVE': 'FALSE',
    'HOOK__APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.HOOK__TEST_LIVE

  if (live) {
    const client = new Hook0SDK({
      apikey: env.HOOK__APIKEY,
    })

    let idmap = env['HOOK__TEST_APPLICATION_SECRET_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new Hook0SDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
