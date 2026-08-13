<?php
declare(strict_types=1);

// OrganizationEditRole entity test

require_once __DIR__ . '/../hook0_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OrganizationEditRoleEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Hook0SDK::test(null, null);
        $ent = $testsdk->OrganizationEditRole(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = organization_edit_role_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "organization_edit_role." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $organization_edit_role_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.organization_edit_role")));
        $organization_edit_role_ref01_data = null;
        if (count($organization_edit_role_ref01_data_raw) > 0) {
            $organization_edit_role_ref01_data = Helpers::to_map($organization_edit_role_ref01_data_raw[0][1]);
        }

        // UPDATE
        $organization_edit_role_ref01_ent = $client->OrganizationEditRole(null);
        $organization_edit_role_ref01_data_up0_up = [
        ];

        $organization_edit_role_ref01_markdef_up0_name = "role";
        $organization_edit_role_ref01_markdef_up0_value = "Mark01-organization_edit_role_ref01_" . $setup["now"];
        $organization_edit_role_ref01_data_up0_up[$organization_edit_role_ref01_markdef_up0_name] = $organization_edit_role_ref01_markdef_up0_value;

        $organization_edit_role_ref01_resdata_up0_result = $organization_edit_role_ref01_ent->update($organization_edit_role_ref01_data_up0_up, null);
        $organization_edit_role_ref01_resdata_up0 = Helpers::to_map(is_object($organization_edit_role_ref01_resdata_up0_result) && method_exists($organization_edit_role_ref01_resdata_up0_result, 'data_get') ? $organization_edit_role_ref01_resdata_up0_result->data_get() : $organization_edit_role_ref01_resdata_up0_result);
        $this->assertNotNull($organization_edit_role_ref01_resdata_up0);
        $this->assertEquals($organization_edit_role_ref01_resdata_up0[$organization_edit_role_ref01_markdef_up0_name], $organization_edit_role_ref01_markdef_up0_value);

    }
}

function organization_edit_role_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/organization_edit_role/OrganizationEditRoleTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Hook0SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["organization_edit_role01", "organization_edit_role02", "organization_edit_role03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID" => $idmap,
        "HOOK0_TEST_LIVE" => "FALSE",
        "HOOK0_TEST_EXPLAIN" => "FALSE",
        "HOOK0_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOOK0_TEST_ORGANIZATION_EDIT_ROLE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HOOK0_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HOOK0_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new Hook0SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HOOK0_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HOOK0_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
