<?php
declare(strict_types=1);

// ApplicationsManagement entity test

require_once __DIR__ . '/../hook0_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ApplicationsManagementEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Hook0SDK::test(null, null);
        $ent = $testsdk->ApplicationsManagement(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = applications_management_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach ([] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "applications_management." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOOK__TEST_APPLICATIONS_MANAGEMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $applications_management_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.applications_management")));
        $applications_management_ref01_data = null;
        if (count($applications_management_ref01_data_raw) > 0) {
            $applications_management_ref01_data = Helpers::to_map($applications_management_ref01_data_raw[0][1]);
        }

    }
}

function applications_management_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/applications_management/ApplicationsManagementTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Hook0SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["applications_management01", "applications_management02", "applications_management03", "application_secret01", "application_secret02", "application_secret03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOOK__TEST_APPLICATIONS_MANAGEMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOOK__TEST_APPLICATIONS_MANAGEMENT_ENTID" => $idmap,
        "HOOK__TEST_LIVE" => "FALSE",
        "HOOK__TEST_EXPLAIN" => "FALSE",
        "HOOK__APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOOK__TEST_APPLICATIONS_MANAGEMENT_ENTID"]);
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
