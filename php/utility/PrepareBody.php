<?php
declare(strict_types=1);

// Hook0 SDK utility: prepare_body

class Hook0PrepareBody
{
    public static function call(Hook0Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
