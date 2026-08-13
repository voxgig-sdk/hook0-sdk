
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { Hook0SDK } = require('../../..')

const {
  envOverride,
} = require('../../utility')


describe('EventsPerDayEntryDirect', async () => {

  test('direct-exists', async () => {
    const sdk = new Hook0SDK({
      // Concrete base: a live construction must satisfy any server
      // variables a templated base URL declares; overriding base with a
      // literal (as the direct flow tests do) sidesteps the requirement.
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-list-events_per_day_entry', async () => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}

    const result = await client.direct({
      path: 'api/v1/events_per_day/application',
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
    'HOOK0_TEST_EVENTS_PER_DAY_ENTRY_ENTID': {},
    'HOOK0_TEST_LIVE': 'FALSE',
    'HOOK0_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.HOOK0_TEST_LIVE

  if (live) {
    const client = new Hook0SDK({
      apikey: env.HOOK0_APIKEY,
    })

    let idmap = env['HOOK0_TEST_EVENTS_PER_DAY_ENTRY_ENTID']
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
  
