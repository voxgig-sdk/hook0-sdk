

class Hook0Error extends Error {

  isHook0Error = true

  sdk = 'Hook0'

  constructor(code, msg, ctx) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

module.exports = {
  Hook0Error
}

