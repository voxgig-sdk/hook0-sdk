# Hook0 SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Hook0_types'


class Hook0SDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = Hook0Utility.new
    @_utility = utility

    config = Hook0Config.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = Hook0Helpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = Hook0Helpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, Hook0Features.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    Hook0Utility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  # The options and the root context both hold the credential, so the
  # client's printed form is its name alone; `options_map` is the
  # documented way to read them back.
  def to_s
    "Hook0 " + VoxgigStruct.jsonify({ "name" => "Hook0" })
  end

  def inspect
    to_s
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = Hook0Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String) && "" != method_val
    method_val = method_val.upcase
    allow_method = VoxgigStruct.getpath(opts, "allow.method")
    unless Hook0Utilities.allowed(allow_method, method_val)
      raise ctx.make_error("spec_method_allow",
        "Method \"#{method_val}\" not allowed by SDK option allow.method value: \"#{allow_method}\"")
    end
    params = Hook0Helpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = Hook0Helpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = Hook0Spec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    Hook0Utilities.allowed(VoxgigStruct.getpath(@options, "allow.op"), op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => Hook0Error.new(
        "Hook0SDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\"",
        code: "#{op}_allow"),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue Hook0Error => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = Hook0Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => utility.clean.call(ctx, fetch_err) } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = Hook0Helpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      body_err = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
        if true == VoxgigStruct.getprop(fetched, "unreadable")
          failed = status >= 200 && status < 300 ? nil : ctx.make_error("request_status",
            "request: #{status}: #{VoxgigStruct.getprop(fetched, 'statusText')}")
          body_err = Hook0Utilities::UnreadableBody.call(ctx, status, headers,
            VoxgigStruct.getprop(fetched, "body"), fetchdef["headers"], failed)
        end
      end

      out = {
        "ok" => body_err.nil? && status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
      out["err"] = utility.clean.call(ctx, body_err) unless body_err.nil?
      return out
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = Hook0Error.new(
        "Hook0SDK: graphql: #{msg}", code: "graphql_error")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.Application.list / client.Application.load({ "id" => ... })
  def Application(data = nil)
    require_relative 'entity/application_entity'
    ApplicationEntity.new(self, data)
  end


  # Canonical facade: client.ApplicationSecret.list / client.ApplicationSecret.load({ "id" => ... })
  def ApplicationSecret(data = nil)
    require_relative 'entity/application_secret_entity'
    ApplicationSecretEntity.new(self, data)
  end


  # Canonical facade: client.EmailPreference.list / client.EmailPreference.load({ "id" => ... })
  def EmailPreference(data = nil)
    require_relative 'entity/email_preference_entity'
    EmailPreferenceEntity.new(self, data)
  end


  # Canonical facade: client.Error.list / client.Error.load({ "id" => ... })
  def Error(data = nil)
    require_relative 'entity/error_entity'
    ErrorEntity.new(self, data)
  end


  # Canonical facade: client.Event.list / client.Event.load({ "id" => ... })
  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  # Canonical facade: client.EventType.list / client.EventType.load({ "id" => ... })
  def EventType(data = nil)
    require_relative 'entity/event_type_entity'
    EventTypeEntity.new(self, data)
  end


  # Canonical facade: client.EventsManagement.list / client.EventsManagement.load({ "id" => ... })
  def EventsManagement(data = nil)
    require_relative 'entity/events_management_entity'
    EventsManagementEntity.new(self, data)
  end


  # Canonical facade: client.Health.list / client.Health.load({ "id" => ... })
  def Health(data = nil)
    require_relative 'entity/health_entity'
    HealthEntity.new(self, data)
  end


  # Canonical facade: client.Hook0.list / client.Hook0.load({ "id" => ... })
  def Hook0(data = nil)
    require_relative 'entity/hook0_entity'
    Hook0Entity.new(self, data)
  end


  # Canonical facade: client.IngestedEvent.list / client.IngestedEvent.load({ "id" => ... })
  def IngestedEvent(data = nil)
    require_relative 'entity/ingested_event_entity'
    IngestedEventEntity.new(self, data)
  end


  # Canonical facade: client.Instance.list / client.Instance.load({ "id" => ... })
  def Instance(data = nil)
    require_relative 'entity/instance_entity'
    InstanceEntity.new(self, data)
  end


  # Canonical facade: client.Login.list / client.Login.load({ "id" => ... })
  def Login(data = nil)
    require_relative 'entity/login_entity'
    LoginEntity.new(self, data)
  end


  # Canonical facade: client.Organization.list / client.Organization.load({ "id" => ... })
  def Organization(data = nil)
    require_relative 'entity/organization_entity'
    OrganizationEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationEditRole.list / client.OrganizationEditRole.load({ "id" => ... })
  def OrganizationEditRole(data = nil)
    require_relative 'entity/organization_edit_role_entity'
    OrganizationEditRoleEntity.new(self, data)
  end


  # Canonical facade: client.Quota.list / client.Quota.load({ "id" => ... })
  def Quota(data = nil)
    require_relative 'entity/quota_entity'
    QuotaEntity.new(self, data)
  end


  # Canonical facade: client.Registration.list / client.Registration.load({ "id" => ... })
  def Registration(data = nil)
    require_relative 'entity/registration_entity'
    RegistrationEntity.new(self, data)
  end


  # Canonical facade: client.RequestAttempt.list / client.RequestAttempt.load({ "id" => ... })
  def RequestAttempt(data = nil)
    require_relative 'entity/request_attempt_entity'
    RequestAttemptEntity.new(self, data)
  end


  # Canonical facade: client.Response.list / client.Response.load({ "id" => ... })
  def Response(data = nil)
    require_relative 'entity/response_entity'
    ResponseEntity.new(self, data)
  end


  # Canonical facade: client.Revoke.list / client.Revoke.load({ "id" => ... })
  def Revoke(data = nil)
    require_relative 'entity/revoke_entity'
    RevokeEntity.new(self, data)
  end


  # Canonical facade: client.ServiceToken.list / client.ServiceToken.load({ "id" => ... })
  def ServiceToken(data = nil)
    require_relative 'entity/service_token_entity'
    ServiceTokenEntity.new(self, data)
  end


  # Canonical facade: client.Subscription.list / client.Subscription.load({ "id" => ... })
  def Subscription(data = nil)
    require_relative 'entity/subscription_entity'
    SubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.UserAuthentication.list / client.UserAuthentication.load({ "id" => ... })
  def UserAuthentication(data = nil)
    require_relative 'entity/user_authentication_entity'
    UserAuthenticationEntity.new(self, data)
  end


  # Canonical facade: client.UserInvitation.list / client.UserInvitation.load({ "id" => ... })
  def UserInvitation(data = nil)
    require_relative 'entity/user_invitation_entity'
    UserInvitationEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = Hook0SDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
