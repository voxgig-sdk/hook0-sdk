<?php
declare(strict_types=1);

// Hook0 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Hook0Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Hook0BaseFeature();
            case "test":
                return new Hook0TestFeature();
            default:
                return new Hook0BaseFeature();
        }
    }
}
