package voxgig.hook0sdk.entity;

import java.util.LinkedHashMap;
import java.util.Map;

import voxgig.hook0sdk.core.Context;
import voxgig.hook0sdk.core.Entity;
import voxgig.hook0sdk.core.Helpers;
import voxgig.hook0sdk.core.SdkClient;
import voxgig.hook0sdk.utility.struct.Struct;

/** EventsPerDayEntry entity client for the Hook0 SDK. */
@SuppressWarnings({"unchecked", "unused"})
public class EventsPerDayEntryEntity extends EntityBase {

  public EventsPerDayEntryEntity(SdkClient client, Map<String, Object> entopts) {
    super("events_per_day_entry", client, entopts);
  }

  @Override
  public Entity make() {
    Map<String, Object> opts = new LinkedHashMap<>(this.entopts);
    return new EventsPerDayEntryEntity(this.client, opts);
  }

  @Override
  public Object load(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("load", this.name);
  }



  @Override
  public Object list(Map<String, Object> reqmatch, Map<String, Object> ctrl) {
    Map<String, Object> ctxmap = new LinkedHashMap<>();
    ctxmap.put("opname", "list");
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
      }
    });
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
  public Object remove(Map<String, Object> req, Map<String, Object> ctrl) {
    throw Helpers.unsupportedOp("remove", this.name);
  }

}
