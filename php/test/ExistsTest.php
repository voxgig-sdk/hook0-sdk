<?php
declare(strict_types=1);

// Hook0 SDK exists test

require_once __DIR__ . '/../hook0_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Hook0SDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
