<?php
declare(strict_types=1);

// Hook0 SDK utility: result_body

class Hook0ResultBody
{
    public static function call(Hook0Context $ctx): ?Hook0Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
