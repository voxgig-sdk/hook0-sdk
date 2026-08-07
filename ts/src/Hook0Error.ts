
import { Context } from './Context'


class Hook0Error extends Error {

  isHook0Error = true

  sdk = 'Hook0'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Hook0Error
}

