<?php
declare(strict_types=1);

// Hook0 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Hook0MakeContext
{
    public static function call(array $ctxmap, ?Hook0Context $basectx): Hook0Context
    {
        return new Hook0Context($ctxmap, $basectx);
    }
}
