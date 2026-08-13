-- Hook0 SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("hook0_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local Hook0SDK = {}
Hook0SDK.__index = Hook0SDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

Hook0SDK._make_feature = _make_feature


function Hook0SDK.new(options)
  local self = setmetatable({}, Hook0SDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: test


  return self
end


function Hook0SDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function Hook0SDK:get_utility()
  return Utility.copy(self._utility)
end


function Hook0SDK:get_root_ctx()
  return self._rootctx
end


function Hook0SDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function Hook0SDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function Hook0SDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function Hook0SDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "Hook0SDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function Hook0SDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function Hook0SDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "Hook0SDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Application():list() / client:Application():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Application(data)
  local EntityMod = require("entity.application_entity")
  if data == nil then
    if self._application == nil then
      self._application = EntityMod.new(self, nil)
    end
    return self._application
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ApplicationSecret():list() / client:ApplicationSecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:ApplicationSecret(data)
  local EntityMod = require("entity.application_secret_entity")
  if data == nil then
    if self._application_secret == nil then
      self._application_secret = EntityMod.new(self, nil)
    end
    return self._application_secret
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ApplicationsManagement():list() / client:ApplicationsManagement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:ApplicationsManagement(data)
  local EntityMod = require("entity.applications_management_entity")
  if data == nil then
    if self._applications_management == nil then
      self._applications_management = EntityMod.new(self, nil)
    end
    return self._applications_management
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Event():list() / client:Event():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Event(data)
  local EntityMod = require("entity.event_entity")
  if data == nil then
    if self._event == nil then
      self._event = EntityMod.new(self, nil)
    end
    return self._event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EventType():list() / client:EventType():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:EventType(data)
  local EntityMod = require("entity.event_type_entity")
  if data == nil then
    if self._event_type == nil then
      self._event_type = EntityMod.new(self, nil)
    end
    return self._event_type
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EventsManagement():list() / client:EventsManagement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:EventsManagement(data)
  local EntityMod = require("entity.events_management_entity")
  if data == nil then
    if self._events_management == nil then
      self._events_management = EntityMod.new(self, nil)
    end
    return self._events_management
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EventsPerDayEntry():list() / client:EventsPerDayEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:EventsPerDayEntry(data)
  local EntityMod = require("entity.events_per_day_entry_entity")
  if data == nil then
    if self._events_per_day_entry == nil then
      self._events_per_day_entry = EntityMod.new(self, nil)
    end
    return self._events_per_day_entry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Health():list() / client:Health():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Health(data)
  local EntityMod = require("entity.health_entity")
  if data == nil then
    if self._health == nil then
      self._health = EntityMod.new(self, nil)
    end
    return self._health
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Hook0():list() / client:Hook0():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Hook0(data)
  local EntityMod = require("entity.hook0_entity")
  if data == nil then
    if self._hook0 == nil then
      self._hook0 = EntityMod.new(self, nil)
    end
    return self._hook0
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IngestedEvent():list() / client:IngestedEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:IngestedEvent(data)
  local EntityMod = require("entity.ingested_event_entity")
  if data == nil then
    if self._ingested_event == nil then
      self._ingested_event = EntityMod.new(self, nil)
    end
    return self._ingested_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Instance():list() / client:Instance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Instance(data)
  local EntityMod = require("entity.instance_entity")
  if data == nil then
    if self._instance == nil then
      self._instance = EntityMod.new(self, nil)
    end
    return self._instance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Login():list() / client:Login():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Login(data)
  local EntityMod = require("entity.login_entity")
  if data == nil then
    if self._login == nil then
      self._login = EntityMod.new(self, nil)
    end
    return self._login
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Organization():list() / client:Organization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Organization(data)
  local EntityMod = require("entity.organization_entity")
  if data == nil then
    if self._organization == nil then
      self._organization = EntityMod.new(self, nil)
    end
    return self._organization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationEditRole():list() / client:OrganizationEditRole():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:OrganizationEditRole(data)
  local EntityMod = require("entity.organization_edit_role_entity")
  if data == nil then
    if self._organization_edit_role == nil then
      self._organization_edit_role = EntityMod.new(self, nil)
    end
    return self._organization_edit_role
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Problem():list() / client:Problem():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Problem(data)
  local EntityMod = require("entity.problem_entity")
  if data == nil then
    if self._problem == nil then
      self._problem = EntityMod.new(self, nil)
    end
    return self._problem
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Quota():list() / client:Quota():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Quota(data)
  local EntityMod = require("entity.quota_entity")
  if data == nil then
    if self._quota == nil then
      self._quota = EntityMod.new(self, nil)
    end
    return self._quota
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Registration():list() / client:Registration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Registration(data)
  local EntityMod = require("entity.registration_entity")
  if data == nil then
    if self._registration == nil then
      self._registration = EntityMod.new(self, nil)
    end
    return self._registration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RequestAttempt():list() / client:RequestAttempt():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:RequestAttempt(data)
  local EntityMod = require("entity.request_attempt_entity")
  if data == nil then
    if self._request_attempt == nil then
      self._request_attempt = EntityMod.new(self, nil)
    end
    return self._request_attempt
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Response():list() / client:Response():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Response(data)
  local EntityMod = require("entity.response_entity")
  if data == nil then
    if self._response == nil then
      self._response = EntityMod.new(self, nil)
    end
    return self._response
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Revoke():list() / client:Revoke():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Revoke(data)
  local EntityMod = require("entity.revoke_entity")
  if data == nil then
    if self._revoke == nil then
      self._revoke = EntityMod.new(self, nil)
    end
    return self._revoke
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ServiceToken():list() / client:ServiceToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:ServiceToken(data)
  local EntityMod = require("entity.service_token_entity")
  if data == nil then
    if self._service_token == nil then
      self._service_token = EntityMod.new(self, nil)
    end
    return self._service_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Subscription():list() / client:Subscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:Subscription(data)
  local EntityMod = require("entity.subscription_entity")
  if data == nil then
    if self._subscription == nil then
      self._subscription = EntityMod.new(self, nil)
    end
    return self._subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserAuthentication():list() / client:UserAuthentication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:UserAuthentication(data)
  local EntityMod = require("entity.user_authentication_entity")
  if data == nil then
    if self._user_authentication == nil then
      self._user_authentication = EntityMod.new(self, nil)
    end
    return self._user_authentication
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserInvitation():list() / client:UserInvitation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function Hook0SDK:UserInvitation(data)
  local EntityMod = require("entity.user_invitation_entity")
  if data == nil then
    if self._user_invitation == nil then
      self._user_invitation = EntityMod.new(self, nil)
    end
    return self._user_invitation
  end
  return EntityMod.new(self, data)
end




function Hook0SDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = Hook0SDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return Hook0SDK
