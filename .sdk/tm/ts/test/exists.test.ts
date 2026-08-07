
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Hook0SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Hook0SDK.test()
    equal(null !== testsdk, true)
  })

})
