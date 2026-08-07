package voxgig.hook0sdk.entity;

import java.util.LinkedHashMap;
import java.util.Map;

import voxgig.hook0sdk.core.Context;
import voxgig.hook0sdk.core.Entity;
import voxgig.hook0sdk.core.Helpers;
import voxgig.hook0sdk.core.SdkClient;
import voxgig.hook0sdk.utility.struct.Struct;

/** ApplicationsManagement entity client for the Hook0 SDK. */
@SuppressWarnings({"unchecked", "unused"})
public class ApplicationsManagementEntity extends EntityBase {

  public ApplicationsManagementEntity(SdkClient client, Map<String, Object> entopts) {
    super("applications_management", client, entopts);
  }

  @Override
  public Entity make() {
    Map<String, Object> opts = new LinkedHashMap<>(this.entopts);
    return new ApplicationsManagementEntity(this.client, opts);
  }

  @Override
  public Object load(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("load", this.name);
  }


  @Override
  public Object list(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("list", this.name);
  }


  @Override
  public Object create(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("create", this.name);
  }


  @Override
  public Object update(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("update", this.name);
  }



  @Override
  public Object remove(Map<String, Object> reqmatch, Map<String, Object> ctrl) {
    Map<String, Object> ctxmap = new LinkedHashMap<>();
    ctxmap.put("opname", "remove");
    ctxmap.put("ctrl", ctrl);
    ctxmap.put("match", this.match);
    ctxmap.put("data", this.data);
    ctxmap.put("reqmatch", reqmatch);
    Context ctx = this.utility.makeContext.apply(ctxmap, this.entctx);

    return runOp(ctx, () -> {
      if (ctx.result != null) {
        if (ctx.result.resmatch != null) {
          this.match = ctx.result.resmatch;
        }
        if (ctx.result.resdata != null) {
          Map<String, Object> d = Helpers.toMapAny(Struct.clone(ctx.result.resdata));
          this.data = d == null ? new LinkedHashMap<>() : d;
        }
      }
    });
  }


}
