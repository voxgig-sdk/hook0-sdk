# Hook0 SDK utility: make_context
require_relative '../core/context'
module Hook0Utilities
  MakeContext = ->(ctxmap, basectx) {
    Hook0Context.new(ctxmap, basectx)
  }
end
