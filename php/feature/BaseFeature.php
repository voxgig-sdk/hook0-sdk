<?php
declare(strict_types=1);

// Hook0 SDK base feature

class Hook0BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Hook0Context $ctx, array $options): void {}
    public function PostConstruct(Hook0Context $ctx): void {}
    public function PostConstructEntity(Hook0Context $ctx): void {}
    public function SetData(Hook0Context $ctx): void {}
    public function GetData(Hook0Context $ctx): void {}
    public function GetMatch(Hook0Context $ctx): void {}
    public function SetMatch(Hook0Context $ctx): void {}
    public function PrePoint(Hook0Context $ctx): void {}
    public function PreSpec(Hook0Context $ctx): void {}
    public function PreRequest(Hook0Context $ctx): void {}
    public function PreResponse(Hook0Context $ctx): void {}
    public function PreResult(Hook0Context $ctx): void {}
    public function PreDone(Hook0Context $ctx): void {}
    public function PreUnexpected(Hook0Context $ctx): void {}
}
