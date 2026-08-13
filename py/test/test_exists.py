# Hook0 SDK exists test

import pytest
from hook0_sdk import Hook0SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Hook0SDK.test(None, None)
        assert testsdk is not None
