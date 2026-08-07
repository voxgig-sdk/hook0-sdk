package voxgig.hook0sdk.utility;

import voxgig.hook0sdk.core.Context;
import voxgig.hook0sdk.core.Response;
import voxgig.hook0sdk.core.Result;

final class ResultBody {

  private ResultBody() {}

  static Result resultBody(Context ctx) {
    Response response = ctx.response;
    Result result = ctx.result;

    if (result != null) {
      if (response != null && response.jsonFunc != null && response.body != null) {
        result.body = response.jsonFunc.get();
      }
    }

    return result;
  }
}
