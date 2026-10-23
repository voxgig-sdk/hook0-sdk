# Hook0 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Hook0Features
  def self.make_feature(name)
    case name
    when "base"
      Hook0BaseFeature.new
    when "debug"
      Hook0DebugFeature.new
    when "idempotency"
      Hook0IdempotencyFeature.new
    when "metrics"
      Hook0MetricsFeature.new
    when "paging"
      Hook0PagingFeature.new
    when "ratelimit"
      Hook0RatelimitFeature.new
    when "retry"
      Hook0RetryFeature.new
    when "secrets"
      Hook0SecretsFeature.new
    when "test"
      Hook0TestFeature.new
    when "timeout"
      Hook0TimeoutFeature.new
    else
      Hook0BaseFeature.new
    end
  end
end
