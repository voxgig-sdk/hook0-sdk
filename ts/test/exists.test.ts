
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Hook0SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Hook0SDK.test()
    equal(testsdk instanceof Hook0SDK, true,
      'Hook0SDK.test() must return a client synchronously')
  })

})
