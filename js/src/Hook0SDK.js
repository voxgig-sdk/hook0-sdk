// Hook0 Js SDK

const { ApplicationEntity } = require('./entity/ApplicationEntity')
const { ApplicationSecretEntity } = require('./entity/ApplicationSecretEntity')
const { ApplicationsManagementEntity } = require('./entity/ApplicationsManagementEntity')
const { EventEntity } = require('./entity/EventEntity')
const { EventTypeEntity } = require('./entity/EventTypeEntity')
const { EventsManagementEntity } = require('./entity/EventsManagementEntity')
const { EventsPerDayEntryEntity } = require('./entity/EventsPerDayEntryEntity')
const { HealthEntity } = require('./entity/HealthEntity')
const { Hook0Entity } = require('./entity/Hook0Entity')
const { IngestedEventEntity } = require('./entity/IngestedEventEntity')
const { InstanceEntity } = require('./entity/InstanceEntity')
const { LoginEntity } = require('./entity/LoginEntity')
const { OrganizationEntity } = require('./entity/OrganizationEntity')
const { OrganizationEditRoleEntity } = require('./entity/OrganizationEditRoleEntity')
const { ProblemEntity } = require('./entity/ProblemEntity')
const { QuotaEntity } = require('./entity/QuotaEntity')
const { RegistrationEntity } = require('./entity/RegistrationEntity')
const { RequestAttemptEntity } = require('./entity/RequestAttemptEntity')
const { ResponseEntity } = require('./entity/ResponseEntity')
const { RevokeEntity } = require('./entity/RevokeEntity')
const { ServiceTokenEntity } = require('./entity/ServiceTokenEntity')
const { SubscriptionEntity } = require('./entity/SubscriptionEntity')
const { UserAuthenticationEntity } = require('./entity/UserAuthenticationEntity')
const { UserInvitationEntity } = require('./entity/UserInvitationEntity')


const { inspect } = require('node:util')

const { config } = require('./Config')
const { Utility } = require('./utility/Utility')
const { Hook0EntityBase } = require('./Hook0EntityBase')


const { BaseFeature } = require('./feature/base/BaseFeature')


const stdutil = new Utility()


class Hook0SDK {
  _mode = 'live'
  _options
  _utility = new Utility()
  _features
  _rootctx

  constructor(options) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('Hook0SDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status
      const json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err) {
      return { ok: false, err }
    }
  }



  // Raw GraphQL access: the pressure valve that makes the generated
  // surface's deliberate omissions (per-call selection sets, typed filter
  // builders, batching, subscriptions) livable — the whole schema stays
  // reachable.
  //
  // Thin wrapper over the same prepare/fetch path `direct` uses, with the
  // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
  // HTTP 200 as a top-level `errors` array, so status alone would report a
  // failed query as ok.
  //
  // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
  // ratelimit or paging features apply.
  async graphql(query, variables, ctrl) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('Hook0SDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err = new Error('Hook0SDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Application().list()` / `client.Application().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Application(entopts) {
    const self = this
    return new ApplicationEntity(self, entopts)
  }


  // Entity access: `client.ApplicationSecret().list()` / `client.ApplicationSecret().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApplicationSecret(entopts) {
    const self = this
    return new ApplicationSecretEntity(self, entopts)
  }


  // Entity access: `client.ApplicationsManagement().list()` / `client.ApplicationsManagement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApplicationsManagement(entopts) {
    const self = this
    return new ApplicationsManagementEntity(self, entopts)
  }


  // Entity access: `client.Event().list()` / `client.Event().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Event(entopts) {
    const self = this
    return new EventEntity(self, entopts)
  }


  // Entity access: `client.EventType().list()` / `client.EventType().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventType(entopts) {
    const self = this
    return new EventTypeEntity(self, entopts)
  }


  // Entity access: `client.EventsManagement().list()` / `client.EventsManagement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventsManagement(entopts) {
    const self = this
    return new EventsManagementEntity(self, entopts)
  }


  // Entity access: `client.EventsPerDayEntry().list()` / `client.EventsPerDayEntry().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventsPerDayEntry(entopts) {
    const self = this
    return new EventsPerDayEntryEntity(self, entopts)
  }


  // Entity access: `client.Health().list()` / `client.Health().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Health(entopts) {
    const self = this
    return new HealthEntity(self, entopts)
  }


  // Entity access: `client.Hook0().list()` / `client.Hook0().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Hook0(entopts) {
    const self = this
    return new Hook0Entity(self, entopts)
  }


  // Entity access: `client.IngestedEvent().list()` / `client.IngestedEvent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IngestedEvent(entopts) {
    const self = this
    return new IngestedEventEntity(self, entopts)
  }


  // Entity access: `client.Instance().list()` / `client.Instance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Instance(entopts) {
    const self = this
    return new InstanceEntity(self, entopts)
  }


  // Entity access: `client.Login().list()` / `client.Login().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Login(entopts) {
    const self = this
    return new LoginEntity(self, entopts)
  }


  // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Organization(entopts) {
    const self = this
    return new OrganizationEntity(self, entopts)
  }


  // Entity access: `client.OrganizationEditRole().list()` / `client.OrganizationEditRole().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OrganizationEditRole(entopts) {
    const self = this
    return new OrganizationEditRoleEntity(self, entopts)
  }


  // Entity access: `client.Problem().list()` / `client.Problem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Problem(entopts) {
    const self = this
    return new ProblemEntity(self, entopts)
  }


  // Entity access: `client.Quota().list()` / `client.Quota().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Quota(entopts) {
    const self = this
    return new QuotaEntity(self, entopts)
  }


  // Entity access: `client.Registration().list()` / `client.Registration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Registration(entopts) {
    const self = this
    return new RegistrationEntity(self, entopts)
  }


  // Entity access: `client.RequestAttempt().list()` / `client.RequestAttempt().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RequestAttempt(entopts) {
    const self = this
    return new RequestAttemptEntity(self, entopts)
  }


  // Entity access: `client.Response().list()` / `client.Response().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Response(entopts) {
    const self = this
    return new ResponseEntity(self, entopts)
  }


  // Entity access: `client.Revoke().list()` / `client.Revoke().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Revoke(entopts) {
    const self = this
    return new RevokeEntity(self, entopts)
  }


  // Entity access: `client.ServiceToken().list()` / `client.ServiceToken().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ServiceToken(entopts) {
    const self = this
    return new ServiceTokenEntity(self, entopts)
  }


  // Entity access: `client.Subscription().list()` / `client.Subscription().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Subscription(entopts) {
    const self = this
    return new SubscriptionEntity(self, entopts)
  }


  // Entity access: `client.UserAuthentication().list()` / `client.UserAuthentication().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserAuthentication(entopts) {
    const self = this
    return new UserAuthenticationEntity(self, entopts)
  }


  // Entity access: `client.UserInvitation().list()` / `client.UserInvitation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserInvitation(entopts) {
    const self = this
    return new UserInvitationEntity(self, entopts)
  }




  static test(testoptsarg, sdkoptsarg) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new Hook0SDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts, sdkopts) {
    return Hook0SDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Hook0' }
  }

  toString() {
    return 'Hook0 ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = Hook0SDK


module.exports = {
  stdutil,
  config,

  BaseFeature,
  Hook0EntityBase,

  Hook0SDK,
  SDK,
}

