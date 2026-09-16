# Hook0 SDK feature factory

from hook0_sdk.feature.base_feature import Hook0BaseFeature
from hook0_sdk.feature.debug_feature import Hook0DebugFeature
from hook0_sdk.feature.idempotency_feature import Hook0IdempotencyFeature
from hook0_sdk.feature.metrics_feature import Hook0MetricsFeature
from hook0_sdk.feature.paging_feature import Hook0PagingFeature
from hook0_sdk.feature.ratelimit_feature import Hook0RatelimitFeature
from hook0_sdk.feature.retry_feature import Hook0RetryFeature
from hook0_sdk.feature.test_feature import Hook0TestFeature
from hook0_sdk.feature.timeout_feature import Hook0TimeoutFeature


_FEATURES = {
    "base": lambda: Hook0BaseFeature(),
    "debug": lambda: Hook0DebugFeature(),
    "idempotency": lambda: Hook0IdempotencyFeature(),
    "metrics": lambda: Hook0MetricsFeature(),
    "paging": lambda: Hook0PagingFeature(),
    "ratelimit": lambda: Hook0RatelimitFeature(),
    "retry": lambda: Hook0RetryFeature(),
    "test": lambda: Hook0TestFeature(),
    "timeout": lambda: Hook0TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
