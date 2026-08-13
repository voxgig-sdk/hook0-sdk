# Hook0 SDK utility: make_context

from hook0_sdk.core.context import Hook0Context


def make_context_util(ctxmap, basectx):
    return Hook0Context(ctxmap, basectx)
