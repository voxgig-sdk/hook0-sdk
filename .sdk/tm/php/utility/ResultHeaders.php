<?php
declare(strict_types=1);

// Hook0 SDK utility: result_headers

class Hook0ResultHeaders
{
    public static function call(Hook0Context $ctx): ?Hook0Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
