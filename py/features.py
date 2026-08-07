# Hook0 SDK feature factory

from feature.base_feature import Hook0BaseFeature
from feature.test_feature import Hook0TestFeature


def _make_feature(name):
    features = {
        "base": lambda: Hook0BaseFeature(),
        "test": lambda: Hook0TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
