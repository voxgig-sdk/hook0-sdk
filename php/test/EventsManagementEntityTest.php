<?php
declare(strict_types=1);

// EventsManagement entity test

require_once __DIR__ . '/../hook0_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EventsManagementEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Hook0SDK::test(null, null);
        $ent = $testsdk->EventsManagement(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "events_management" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = Hook0SDK::test($seed, null);
        $seen = iterator_to_array($base->EventsManagement(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = Hook0Config::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = Hook0SDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->EventsManagement(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = events_management_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "events_management." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HOOK0_TEST_EVENTS_MANAGEMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $events_management_ref01_ent = $client->EventsManagement(null);
        $events_management_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.events_management"), "events_management_ref01"));
        $events_management_ref01_data["event_id"] = $setup["idmap"]["event01"];

        $events_management_ref01_data_result = $events_management_ref01_ent->create($events_management_ref01_data, null);
        $events_management_ref01_data = Helpers::to_map(is_object($events_management_ref01_data_result) && method_exists($events_management_ref01_data_result, 'data_get') ? $events_management_ref01_data_result->data_get() : $events_management_ref01_data_result);
        $this->assertNotNull($events_management_ref01_data);

        // LIST
        $events_management_ref01_match = [];

        $events_management_ref01_list_result = $events_management_ref01_ent->list($events_management_ref01_match, null);
        $this->assertIsArray($events_management_ref01_list_result);


        // LIST
        $events_management_ref01_match_rt0 = [];

        $events_management_ref01_list_rt0_result = $events_management_ref01_ent->list($events_management_ref01_match_rt0, null);
        $this->assertIsArray($events_management_ref01_list_rt0_result);

    }
}

function events_management_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/events_management/EventsManagementTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Hook0SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["events_management01", "events_management02", "events_management03", "event_type01", "event_type02", "event_type03", "event01", "event02", "event03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HOOK0_TEST_EVENTS_MANAGEMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HOOK0_TEST_EVENTS_MANAGEMENT_ENTID" => $idmap,
        "HOOK0_TEST_LIVE" => "FALSE",
        "HOOK0_TEST_EXPLAIN" => "FALSE",
        "HOOK0_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HOOK0_TEST_EVENTS_MANAGEMENT_ENTID"]);
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
