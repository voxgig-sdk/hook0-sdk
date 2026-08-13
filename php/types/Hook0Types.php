<?php
declare(strict_types=1);

// Typed models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Application entity data model. */
class Application
{
    public string $application_id;
    public array $consumption;
    public string $name;
    public array $onboarding_steps;
    public string $organization_id;
    public array $quotas;
}

/** Request payload for Application#load. */
class ApplicationLoadMatch
{
    public string $id;
}

/** Request payload for Application#list. */
class ApplicationListMatch
{
    public ?string $application_id = null;
    public ?array $consumption = null;
    public ?string $name = null;
    public ?array $onboarding_steps = null;
    public ?string $organization_id = null;
    public ?array $quotas = null;
}

/** Request payload for Application#create. */
class ApplicationCreateData
{
    public string $application_id;
    public array $consumption;
    public string $name;
    public array $onboarding_steps;
    public string $organization_id;
    public array $quotas;
}

/** Request payload for Application#update. */
class ApplicationUpdateData
{
    public string $id;
    public ?string $application_id = null;
    public ?array $consumption = null;
    public ?string $name = null;
    public ?array $onboarding_steps = null;
    public ?string $organization_id = null;
    public ?array $quotas = null;
}

/** Request payload for Application#remove. */
class ApplicationRemoveMatch
{
    public string $id;
}

/** ApplicationSecret entity data model. */
class ApplicationSecret
{
    public string $application_id;
    public string $created_at;
    public ?string $deleted_at = null;
    public ?string $name = null;
    public string $token;
}

/** Request payload for ApplicationSecret#list. */
class ApplicationSecretListMatch
{
    public ?string $application_id = null;
    public ?string $created_at = null;
    public ?string $deleted_at = null;
    public ?string $name = null;
    public ?string $token = null;
}

/** Request payload for ApplicationSecret#create. */
class ApplicationSecretCreateData
{
    public string $application_id;
    public string $created_at;
    public ?string $deleted_at = null;
    public ?string $name = null;
    public string $token;
}

/** Request payload for ApplicationSecret#update. */
class ApplicationSecretUpdateData
{
    public string $id;
    public ?string $application_id = null;
    public ?string $created_at = null;
    public ?string $deleted_at = null;
    public ?string $name = null;
    public ?string $token = null;
}

/** ApplicationsManagement entity data model. */
class ApplicationsManagement
{
}

/** Request payload for ApplicationsManagement#remove. */
class ApplicationsManagementRemoveMatch
{
    public string $application_secret_token;
}

/** Event entity data model. */
class Event
{
    public string $event_id;
    public string $event_type_name;
    public string $ip;
    public array $labels;
    public ?array $metadata = null;
    public string $occurred_at;
    public string $payload;
    public string $payload_content_type;
    public string $received_at;
}

/** Request payload for Event#load. */
class EventLoadMatch
{
    public string $id;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public ?string $event_id = null;
    public ?string $event_type_name = null;
    public ?string $ip = null;
    public ?array $labels = null;
    public ?array $metadata = null;
    public ?string $occurred_at = null;
    public ?string $payload = null;
    public ?string $payload_content_type = null;
    public ?string $received_at = null;
}

/** EventType entity data model. */
class EventType
{
    public string $application_id;
    public string $event_type_name;
    public string $resource_type;
    public string $resource_type_name;
    public string $service;
    public string $service_name;
    public string $verb;
    public string $verb_name;
}

/** Request payload for EventType#load. */
class EventTypeLoadMatch
{
    public string $id;
}

/** Request payload for EventType#list. */
class EventTypeListMatch
{
    public ?string $application_id = null;
    public ?string $event_type_name = null;
    public ?string $resource_type = null;
    public ?string $resource_type_name = null;
    public ?string $service = null;
    public ?string $service_name = null;
    public ?string $verb = null;
    public ?string $verb_name = null;
}

/** Request payload for EventType#create. */
class EventTypeCreateData
{
    public string $application_id;
    public string $event_type_name;
    public string $resource_type;
    public string $resource_type_name;
    public string $service;
    public string $service_name;
    public string $verb;
    public string $verb_name;
}

/** EventsManagement entity data model. */
class EventsManagement
{
    public string $application_id;
}

/** Request payload for EventsManagement#list. */
class EventsManagementListMatch
{
    public ?string $application_id = null;
}

/** Request payload for EventsManagement#create. */
class EventsManagementCreateData
{
    public string $event_id;
    public string $application_id;
}

/** Request payload for EventsManagement#remove. */
class EventsManagementRemoveMatch
{
    public string $event_type_name;
}

/** EventsPerDayEntry entity data model. */
class EventsPerDayEntry
{
    public int $amount;
    public string $application_id;
    public string $application_name;
    public string $date;
    public bool $is_provisional;
}

/** Request payload for EventsPerDayEntry#list. */
class EventsPerDayEntryListMatch
{
    public ?int $amount = null;
    public ?string $application_id = null;
    public ?string $application_name = null;
    public ?string $date = null;
    public ?bool $is_provisional = null;
}

/** Health entity data model. */
class Health
{
    public bool $database;
    public int $database_duration_ms;
    public ?bool $object_storage = null;
    public ?int $object_storage_duration_ms = null;
    public ?bool $pulsar = null;
    public ?int $pulsar_duration_ms = null;
    public int $total_duration_ms;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?bool $database = null;
    public ?int $database_duration_ms = null;
    public ?bool $object_storage = null;
    public ?int $object_storage_duration_ms = null;
    public ?bool $pulsar = null;
    public ?int $pulsar_duration_ms = null;
    public ?int $total_duration_ms = null;
}

/** Hook0 entity data model. */
class Hook0
{
    public ?string $default = null;
    public ?string $description = null;
    public string $env_var;
    public ?string $group = null;
    public string $name;
    public bool $required;
    public bool $sensitive;
}

/** Request payload for Hook0#list. */
class Hook0ListMatch
{
    public ?string $default = null;
    public ?string $description = null;
    public ?string $env_var = null;
    public ?string $group = null;
    public ?string $name = null;
    public ?bool $required = null;
    public ?bool $sensitive = null;
}

/** IngestedEvent entity data model. */
class IngestedEvent
{
    public string $application_id;
    public ?string $event_id = null;
    public string $event_type;
    public array $labels;
    public ?array $metadata = null;
    public string $occurred_at;
    public string $payload;
    public string $payload_content_type;
}

/** Request payload for IngestedEvent#create. */
class IngestedEventCreateData
{
    public string $application_id;
    public ?string $event_id = null;
    public string $event_type;
    public array $labels;
    public ?array $metadata = null;
    public string $occurred_at;
    public string $payload;
    public string $payload_content_type;
}

/** Instance entity data model. */
class Instance
{
    public bool $application_secret_compatibility;
    public bool $auto_db_migration;
    public string $biscuit_public_key;
    public ?string $cloudflare_turnstile_site_key = null;
    public array $formbricks;
    public array $matomo;
    public int $password_minimum_length;
    public bool $quota_enforcement;
    public bool $registration_disabled;
    public string $support_email_address;
}

/** Request payload for Instance#load. */
class InstanceLoadMatch
{
    public ?bool $application_secret_compatibility = null;
    public ?bool $auto_db_migration = null;
    public ?string $biscuit_public_key = null;
    public ?string $cloudflare_turnstile_site_key = null;
    public ?array $formbricks = null;
    public ?array $matomo = null;
    public ?int $password_minimum_length = null;
    public ?bool $quota_enforcement = null;
    public ?bool $registration_disabled = null;
    public ?string $support_email_address = null;
}

/** Login entity data model. */
class Login
{
    public string $email;
    public string $password;
}

/** Request payload for Login#create. */
class LoginCreateData
{
    public string $email;
    public string $password;
}

/** Organization entity data model. */
class Organization
{
    public array $consumption;
    public string $name;
    public array $onboarding_steps;
    public string $organization_id;
    public array $plan;
    public array $quotas;
    public string $role;
    public array $users;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $id;
}

/** Request payload for Organization#list. */
class OrganizationListMatch
{
    public ?array $consumption = null;
    public ?string $name = null;
    public ?array $onboarding_steps = null;
    public ?string $organization_id = null;
    public ?array $plan = null;
    public ?array $quotas = null;
    public ?string $role = null;
    public ?array $users = null;
}

/** Request payload for Organization#create. */
class OrganizationCreateData
{
    public array $consumption;
    public string $name;
    public array $onboarding_steps;
    public string $organization_id;
    public array $plan;
    public array $quotas;
    public string $role;
    public array $users;
}

/** Request payload for Organization#update. */
class OrganizationUpdateData
{
    public string $id;
    public ?array $consumption = null;
    public ?string $name = null;
    public ?array $onboarding_steps = null;
    public ?string $organization_id = null;
    public ?array $plan = null;
    public ?array $quotas = null;
    public ?string $role = null;
    public ?array $users = null;
}

/** Request payload for Organization#remove. */
class OrganizationRemoveMatch
{
    public string $id;
}

/** OrganizationEditRole entity data model. */
class OrganizationEditRole
{
    public string $role;
    public string $user_id;
}

/** Request payload for OrganizationEditRole#update. */
class OrganizationEditRoleUpdateData
{
    public string $id;
    public ?string $role = null;
    public ?string $user_id = null;
}

/** Problem entity data model. */
class Problem
{
    public string $detail;
    public string $id;
    public int $status;
    public string $title;
}

/** Request payload for Problem#list. */
class ProblemListMatch
{
    public ?string $detail = null;
    public ?string $id = null;
    public ?int $status = null;
    public ?string $title = null;
}

/** Quota entity data model. */
class Quota
{
    public int $global_applications_per_organization_limit;
    public int $global_days_of_events_retention_limit;
    public int $global_event_types_per_application_limit;
    public int $global_events_per_day_limit;
    public int $global_members_per_organization_limit;
    public int $global_subscriptions_per_application_limit;
}

/** Request payload for Quota#load. */
class QuotaLoadMatch
{
    public ?int $global_applications_per_organization_limit = null;
    public ?int $global_days_of_events_retention_limit = null;
    public ?int $global_event_types_per_application_limit = null;
    public ?int $global_events_per_day_limit = null;
    public ?int $global_members_per_organization_limit = null;
    public ?int $global_subscriptions_per_application_limit = null;
}

/** Registration entity data model. */
class Registration
{
    public string $email;
    public string $first_name;
    public ?string $gclid = null;
    public string $last_name;
    public string $password;
    public ?string $turnstile_token = null;
}

/** Request payload for Registration#create. */
class RegistrationCreateData
{
    public string $email;
    public string $first_name;
    public ?string $gclid = null;
    public string $last_name;
    public string $password;
    public ?string $turnstile_token = null;
}

/** RequestAttempt entity data model. */
class RequestAttempt
{
    public string $created_at;
    public ?string $delay_until = null;
    public array $event;
    public string $event_id;
    public ?string $failed_at = null;
    public ?int $http_response_status = null;
    public ?string $picked_at = null;
    public string $request_attempt_id;
    public ?string $response_id = null;
    public int $retry_count;
    public array $status;
    public array $subscription;
    public ?string $succeeded_at = null;
}

/** Request payload for RequestAttempt#load. */
class RequestAttemptLoadMatch
{
    public string $id;
}

/** Request payload for RequestAttempt#list. */
class RequestAttemptListMatch
{
    public ?string $created_at = null;
    public ?string $delay_until = null;
    public ?array $event = null;
    public ?string $event_id = null;
    public ?string $failed_at = null;
    public ?int $http_response_status = null;
    public ?string $picked_at = null;
    public ?string $request_attempt_id = null;
    public ?string $response_id = null;
    public ?int $retry_count = null;
    public ?array $status = null;
    public ?array $subscription = null;
    public ?string $succeeded_at = null;
}

/** Response entity data model. */
class Response
{
}

/** Request payload for Response#load. */
class ResponseLoadMatch
{
    public string $id;
}

/** Revoke entity data model. */
class Revoke
{
}

/** Request payload for Revoke#remove. */
class RevokeRemoveMatch
{
    public string $organization_id;
}

/** ServiceToken entity data model. */
class ServiceToken
{
    public string $biscuit;
    public string $created_at;
    public string $name;
    public string $organization_id;
    public string $token_id;
}

/** Request payload for ServiceToken#load. */
class ServiceTokenLoadMatch
{
    public string $id;
}

/** Request payload for ServiceToken#list. */
class ServiceTokenListMatch
{
    public ?string $biscuit = null;
    public ?string $created_at = null;
    public ?string $name = null;
    public ?string $organization_id = null;
    public ?string $token_id = null;
}

/** Request payload for ServiceToken#create. */
class ServiceTokenCreateData
{
    public string $biscuit;
    public string $created_at;
    public string $name;
    public string $organization_id;
    public string $token_id;
}

/** Request payload for ServiceToken#update. */
class ServiceTokenUpdateData
{
    public string $id;
    public ?string $biscuit = null;
    public ?string $created_at = null;
    public ?string $name = null;
    public ?string $organization_id = null;
    public ?string $token_id = null;
}

/** Request payload for ServiceToken#remove. */
class ServiceTokenRemoveMatch
{
    public string $id;
}

/** Subscription entity data model. */
class Subscription
{
    public string $application_id;
    public string $created_at;
    public array $dedicated_workers;
    public ?string $description = null;
    public array $event_types;
    public bool $is_enabled;
    public string $label_key;
    public string $label_value;
    public array $labels;
    public array $metadata;
    public string $secret;
    public string $subscription_id;
    public array $target;
    public string $updated_at;
}

/** Request payload for Subscription#load. */
class SubscriptionLoadMatch
{
    public string $id;
}

/** Request payload for Subscription#list. */
class SubscriptionListMatch
{
    public ?string $application_id = null;
    public ?string $created_at = null;
    public ?array $dedicated_workers = null;
    public ?string $description = null;
    public ?array $event_types = null;
    public ?bool $is_enabled = null;
    public ?string $label_key = null;
    public ?string $label_value = null;
    public ?array $labels = null;
    public ?array $metadata = null;
    public ?string $secret = null;
    public ?string $subscription_id = null;
    public ?array $target = null;
    public ?string $updated_at = null;
}

/** Request payload for Subscription#create. */
class SubscriptionCreateData
{
    public string $application_id;
    public string $created_at;
    public array $dedicated_workers;
    public ?string $description = null;
    public array $event_types;
    public bool $is_enabled;
    public string $label_key;
    public string $label_value;
    public array $labels;
    public array $metadata;
    public string $secret;
    public string $subscription_id;
    public array $target;
    public string $updated_at;
}

/** Request payload for Subscription#update. */
class SubscriptionUpdateData
{
    public string $id;
    public ?string $application_id = null;
    public ?string $created_at = null;
    public ?array $dedicated_workers = null;
    public ?string $description = null;
    public ?array $event_types = null;
    public ?bool $is_enabled = null;
    public ?string $label_key = null;
    public ?string $label_value = null;
    public ?array $labels = null;
    public ?array $metadata = null;
    public ?string $secret = null;
    public ?string $subscription_id = null;
    public ?array $target = null;
    public ?string $updated_at = null;
}

/** Request payload for Subscription#remove. */
class SubscriptionRemoveMatch
{
    public string $id;
}

/** UserAuthentication entity data model. */
class UserAuthentication
{
    public string $email;
    public string $new_password;
    public string $token;
}

/** Request payload for UserAuthentication#create. */
class UserAuthenticationCreateData
{
    public string $email;
    public string $new_password;
    public string $token;
}

/** UserInvitation entity data model. */
class UserInvitation
{
    public string $email;
    public string $role;
}

/** Request payload for UserInvitation#create. */
class UserInvitationCreateData
{
    public string $organization_id;
    public string $email;
    public string $role;
}

