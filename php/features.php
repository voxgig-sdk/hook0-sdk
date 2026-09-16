<?php
declare(strict_types=1);

// Hook0 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/DebugFeature.php';
require_once __DIR__ . '/feature/IdempotencyFeature.php';
require_once __DIR__ . '/feature/MetricsFeature.php';
require_once __DIR__ . '/feature/PagingFeature.php';
require_once __DIR__ . '/feature/RatelimitFeature.php';
require_once __DIR__ . '/feature/RetryFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';
require_once __DIR__ . '/feature/TimeoutFeature.php';


class Hook0Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Hook0BaseFeature();
            case "debug":
                return new Hook0DebugFeature();
            case "idempotency":
                return new Hook0IdempotencyFeature();
            case "metrics":
                return new Hook0MetricsFeature();
            case "paging":
                return new Hook0PagingFeature();
            case "ratelimit":
                return new Hook0RatelimitFeature();
            case "retry":
                return new Hook0RetryFeature();
            case "test":
                return new Hook0TestFeature();
            case "timeout":
                return new Hook0TimeoutFeature();
            default:
                return new Hook0BaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "debug":
            case "idempotency":
            case "metrics":
            case "paging":
            case "ratelimit":
            case "retry":
            case "test":
            case "timeout":
                return true;
            default:
                return false;
        }
    }
}
