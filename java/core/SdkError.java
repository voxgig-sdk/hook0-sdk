package voxgig.hook0sdk.core;

/**
 * Hook0 SDK error. Carries the SDK error code, the operation
 * context, and cleaned copies of the result and spec at failure time.
 */
public class SdkError extends RuntimeException {

  public final String sdk = "Hook0";
  public String code;
  public String msg;
  public transient Context ctx;
  public transient Object result;
  public transient Object spec;

  public SdkError(String code, String msg, Context ctx) {
    super(msg);
    this.code = code == null ? "" : code;
    this.msg = msg;
    this.ctx = ctx;
  }

  @Override
  public String getMessage() {
    return this.msg;
  }
}
