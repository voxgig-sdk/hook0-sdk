<?php
declare(strict_types=1);

// UserAuthentication entity test

require_once __DIR__ . '/../hook0_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class UserAuthenticationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Hook0SDK::test(null, null);
        $ent = $testsdk->UserAuthentication(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = user_authentication_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "user_authentication." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOOK__TEST_USER_AUTHENTICATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $user_authentication_ref01_ent = $client->UserAuthentication(null);
        $user_authentication_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.user_authentication"), "user_authentication_ref01"));

        $user_authentication_ref01_data_result = $user_authentication_ref01_ent->create($user_authentication_ref01_data, null);
        $user_authentication_ref01_data = Helpers::to_map($user_authentication_ref01_data_result);
        $this->assertNotNull($user_authentication_ref01_data);

    }
}

function user_authentication_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/user_authentication/UserAuthenticationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Hook0SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["user_authentication01", "user_authentication02", "user_authentication03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOOK__TEST_USER_AUTHENTICATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOOK__TEST_USER_AUTHENTICATION_ENTID" => $idmap,
        "HOOK__TEST_LIVE" => "FALSE",
        "HOOK__TEST_EXPLAIN" => "FALSE",
        "HOOK__APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOOK__TEST_USER_AUTHENTICATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HOOK__TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HOOK__APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new Hook0SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HOOK__TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HOOK__TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
