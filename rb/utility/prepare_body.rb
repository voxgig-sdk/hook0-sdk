# Hook0 SDK utility: prepare_body
require_relative 'media'
module Hook0Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return Hook0Utilities.raw_body(ctx.reqdata) if Hook0Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
