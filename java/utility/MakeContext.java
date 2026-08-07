package voxgig.hook0sdk.utility;

import java.util.Map;

import voxgig.hook0sdk.core.Context;

final class MakeContext {

  private MakeContext() {}

  static Context makeContext(Map<String, Object> ctxmap, Context basectx) {
    return new Context(ctxmap, basectx);
  }
}
