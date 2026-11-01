// Typed reference models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels (source of truth: @voxgig/apidef VALID_CANON). Do
// not edit by hand.
//
// These records are documentation/DX reference shapes ONLY. The SDK ops take
// and return the loose object model (Dictionary<string, object?> / object?) at
// runtime, so these types are not wired into the op signatures — use them to
// describe a payload before converting it to a dictionary. Optional (req:false)
// keys are modelled as nullable properties.

namespace Hook0Sdk.Types;

public record Application
{
    public long amount { get; init; }
    public string application_id { get; init; }
    public string application_name { get; init; }
    public Dictionary<string, object?> consumption { get; init; }
    public string date { get; init; }
    public string? id { get; init; }
    public bool is_provisional { get; init; }
    public string name { get; init; }
    public Dictionary<string, object?> onboarding_steps { get; init; }
    public string organization_id { get; init; }
    public Dictionary<string, object?> quotas { get; init; }
}

public record ApplicationLoadMatch
{
    public string id { get; init; }
}

public record ApplicationListMatch
{
    public string organization_id { get; init; }
}

public record ApplicationCreateData
{
    public string name { get; init; }
    public string organization_id { get; init; }
}

public record ApplicationUpdateData
{
    public string id { get; init; }
    public string? name { get; init; }
    public string? organization_id { get; init; }
}

public record ApplicationRemoveMatch
{
    public string id { get; init; }
}

public record ApplicationSecret
{
    public string application_id { get; init; }
    public string created_at { get; init; }
    public string? deleted_at { get; init; }
    public string? id { get; init; }
    public string? name { get; init; }
    public string token { get; init; }
}

public record ApplicationSecretListMatch
{
    public string application_id { get; init; }
}

public record ApplicationSecretCreateData
{
    public string application_id { get; init; }
    public string? name { get; init; }
}

public record ApplicationSecretUpdateData
{
    public string id { get; init; }
    public string? application_id { get; init; }
    public string? name { get; init; }
}

public record ApplicationSecretRemoveMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record EmailPreference();

public record EmailPreferenceCreateData
{
    public object? token { get; init; }
}

public record Error
{
    public string detail { get; init; }
    public string id { get; init; }
    public long status { get; init; }
    public string title { get; init; }
    public string type { get; init; }
    public Dictionary<string, object?>? validation { get; init; }
}

public record ErrorListMatch
{
    public string? detail { get; init; }
    public string? id { get; init; }
    public long? status { get; init; }
    public string? title { get; init; }
    public string? type { get; init; }
    public Dictionary<string, object?>? validation { get; init; }
}

public record Event
{
    public string event_id { get; init; }
    public string event_type_name { get; init; }
    public string? id { get; init; }
    public string ip { get; init; }
    public Dictionary<string, object?> labels { get; init; }
    public Dictionary<string, object?>? metadata { get; init; }
    public string occurred_at { get; init; }
    public string payload { get; init; }
    public string payload_content_type { get; init; }
    public string received_at { get; init; }
}

public record EventLoadMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record EventListMatch
{
    public string application_id { get; init; }
}

public record EventCreateData
{
    public string id { get; init; }
    public object? application_id { get; init; }
}

public record EventType
{
    public string application_id { get; init; }
    public string event_type_name { get; init; }
    public string? id { get; init; }
    public string resource_type { get; init; }
    public string resource_type_name { get; init; }
    public string service { get; init; }
    public string service_name { get; init; }
    public string verb { get; init; }
    public string verb_name { get; init; }
}

public record EventTypeLoadMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record EventTypeListMatch
{
    public string application_id { get; init; }
}

public record EventTypeCreateData
{
    public string application_id { get; init; }
    public string resource_type { get; init; }
    public string service { get; init; }
    public string verb { get; init; }
}

public record EventTypeRemoveMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record EventsManagement();

public record EventsManagementListMatch();

public record Health
{
    public bool database { get; init; }
    public long database_duration_ms { get; init; }
    public bool? object_storage { get; init; }
    public long? object_storage_duration_ms { get; init; }
    public bool? pulsar { get; init; }
    public long? pulsar_duration_ms { get; init; }
    public long total_duration_ms { get; init; }
}

public record HealthLoadMatch
{
    public string? key { get; init; }
}

public record Hook0
{
    public string? @default { get; init; }
    public string? description { get; init; }
    public string env_var { get; init; }
    public string? group { get; init; }
    public string name { get; init; }
    public bool required { get; init; }
    public bool sensitive { get; init; }
}

public record Hook0ListMatch
{
    public string? @default { get; init; }
    public string? description { get; init; }
    public string? env_var { get; init; }
    public string? group { get; init; }
    public string? name { get; init; }
    public bool? required { get; init; }
    public bool? sensitive { get; init; }
}

public record IngestedEvent
{
    public string application_id { get; init; }
    public string? event_id { get; init; }
    public string event_type { get; init; }
    public Dictionary<string, object?> labels { get; init; }
    public Dictionary<string, object?>? metadata { get; init; }
    public string occurred_at { get; init; }
    public string payload { get; init; }
    public string payload_content_type { get; init; }
}

public record IngestedEventCreateData
{
    public string application_id { get; init; }
    public string? event_id { get; init; }
    public string event_type { get; init; }
    public Dictionary<string, object?> labels { get; init; }
    public Dictionary<string, object?>? metadata { get; init; }
    public string occurred_at { get; init; }
    public string payload { get; init; }
    public string payload_content_type { get; init; }
}

public record Instance
{
    public bool application_secret_compatibility { get; init; }
    public bool auto_db_migration { get; init; }
    public string biscuit_public_key { get; init; }
    public string? cloudflare_turnstile_site_key { get; init; }
    public Dictionary<string, object?> formbricks { get; init; }
    public Dictionary<string, object?> matomo { get; init; }
    public long password_minimum_length { get; init; }
    public bool quota_enforcement { get; init; }
    public bool registration_disabled { get; init; }
    public string support_email_address { get; init; }
}

public record InstanceLoadMatch
{
    public bool? application_secret_compatibility { get; init; }
    public bool? auto_db_migration { get; init; }
    public string? biscuit_public_key { get; init; }
    public string? cloudflare_turnstile_site_key { get; init; }
    public Dictionary<string, object?>? formbricks { get; init; }
    public Dictionary<string, object?>? matomo { get; init; }
    public long? password_minimum_length { get; init; }
    public bool? quota_enforcement { get; init; }
    public bool? registration_disabled { get; init; }
    public string? support_email_address { get; init; }
}

public record Login
{
    public string email { get; init; }
    public string password { get; init; }
    public string token { get; init; }
}

public record LoginCreateData
{
    public string email { get; init; }
    public string password { get; init; }
    public string token { get; init; }
}

public record Organization
{
    public long amount { get; init; }
    public string application_id { get; init; }
    public string application_name { get; init; }
    public Dictionary<string, object?> consumption { get; init; }
    public string date { get; init; }
    public string? id { get; init; }
    public bool is_provisional { get; init; }
    public string name { get; init; }
    public Dictionary<string, object?> onboarding_steps { get; init; }
    public string organization_id { get; init; }
    public Dictionary<string, object?> plan { get; init; }
    public Dictionary<string, object?> quotas { get; init; }
    public string role { get; init; }
    public List<object?> users { get; init; }
}

public record OrganizationLoadMatch
{
    public string id { get; init; }
}

public record OrganizationListMatch
{
    public long? amount { get; init; }
    public string? application_id { get; init; }
    public string? application_name { get; init; }
    public Dictionary<string, object?>? consumption { get; init; }
    public string? date { get; init; }
    public string? id { get; init; }
    public bool? is_provisional { get; init; }
    public string? name { get; init; }
    public Dictionary<string, object?>? onboarding_steps { get; init; }
    public string? organization_id { get; init; }
    public Dictionary<string, object?>? plan { get; init; }
    public Dictionary<string, object?>? quotas { get; init; }
    public string? role { get; init; }
    public List<object?>? users { get; init; }
}

public record OrganizationCreateData
{
    public string name { get; init; }
}

public record OrganizationUpdateData
{
    public string id { get; init; }
    public string? name { get; init; }
}

public record OrganizationRemoveMatch
{
    public string id { get; init; }
}

public record OrganizationEditRole
{
    public string? id { get; init; }
    public string role { get; init; }
    public string user_id { get; init; }
}

public record OrganizationEditRoleUpdateData
{
    public string id { get; init; }
    public string? role { get; init; }
    public string? user_id { get; init; }
}

public record Quota
{
    public bool enabled { get; init; }
    public Dictionary<string, object?> limits { get; init; }
}

public record QuotaLoadMatch
{
    public bool? enabled { get; init; }
    public Dictionary<string, object?>? limits { get; init; }
}

public record Registration
{
    public string email { get; init; }
    public string first_name { get; init; }
    public string? gclid { get; init; }
    public string last_name { get; init; }
    public string password { get; init; }
    public string? signup_channel { get; init; }
    public string? turnstile_token { get; init; }
}

public record RegistrationCreateData
{
    public string email { get; init; }
    public string first_name { get; init; }
    public string? gclid { get; init; }
    public string last_name { get; init; }
    public string password { get; init; }
    public string? signup_channel { get; init; }
    public string? turnstile_token { get; init; }
}

public record RequestAttempt
{
    public string created_at { get; init; }
    public string? delay_until { get; init; }
    public Dictionary<string, object?> @event { get; init; }
    public string event_id { get; init; }
    public string? failed_at { get; init; }
    public long? http_response_status { get; init; }
    public string? id { get; init; }
    public string? picked_at { get; init; }
    public string request_attempt_id { get; init; }
    public string? response_id { get; init; }
    public long retry_count { get; init; }
    public Dictionary<string, object?> status { get; init; }
    public Dictionary<string, object?> subscription { get; init; }
    public string? succeeded_at { get; init; }
}

public record RequestAttemptLoadMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record RequestAttemptListMatch
{
    public string application_id { get; init; }
    public string? event_event_type_name { get; init; }
    public string? event_id { get; init; }
    public string? max_created_at { get; init; }
    public string? min_created_at { get; init; }
    public string? pagination_cursor { get; init; }
    public string? subscription_id { get; init; }
}

public record Response
{
    public string? body { get; init; }
    public long? elapsed_time_ms { get; init; }
    public Dictionary<string, object?>? headers { get; init; }
    public long? http_code { get; init; }
    public string? id { get; init; }
    public string? response_error_name { get; init; }
    public string response_id { get; init; }
}

public record ResponseLoadMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record Revoke();

public record RevokeRemoveMatch
{
    public string organization_id { get; init; }
}

public record ServiceToken
{
    public string biscuit { get; init; }
    public string created_at { get; init; }
    public string? id { get; init; }
    public string name { get; init; }
    public string organization_id { get; init; }
    public string token_id { get; init; }
}

public record ServiceTokenLoadMatch
{
    public string id { get; init; }
    public string organization_id { get; init; }
}

public record ServiceTokenListMatch
{
    public string organization_id { get; init; }
}

public record ServiceTokenCreateData
{
    public string name { get; init; }
    public string organization_id { get; init; }
}

public record ServiceTokenUpdateData
{
    public string id { get; init; }
    public string? name { get; init; }
    public string? organization_id { get; init; }
}

public record ServiceTokenRemoveMatch
{
    public string id { get; init; }
    public string organization_id { get; init; }
}

public record Subscription
{
    public string application_id { get; init; }
    public string created_at { get; init; }
    public List<object?> dedicated_workers { get; init; }
    public string? description { get; init; }
    public List<object?> event_types { get; init; }
    public string? id { get; init; }
    public bool is_enabled { get; init; }
    public string label_key { get; init; }
    public string label_value { get; init; }
    public Dictionary<string, object?> labels { get; init; }
    public Dictionary<string, object?> metadata { get; init; }
    public string secret { get; init; }
    public string subscription_id { get; init; }
    public Dictionary<string, object?> target { get; init; }
    public string updated_at { get; init; }
}

public record SubscriptionLoadMatch
{
    public string id { get; init; }
}

public record SubscriptionListMatch
{
    public string application_id { get; init; }
}

public record SubscriptionCreateData
{
    public string application_id { get; init; }
    public List<object?>? dedicated_workers { get; init; }
    public string? description { get; init; }
    public List<object?> event_types { get; init; }
    public bool is_enabled { get; init; }
    public string? label_key { get; init; }
    public string? label_value { get; init; }
    public Dictionary<string, object?>? labels { get; init; }
    public Dictionary<string, object?>? metadata { get; init; }
    public Dictionary<string, object?> target { get; init; }
}

public record SubscriptionUpdateData
{
    public string id { get; init; }
    public string? application_id { get; init; }
    public List<object?>? dedicated_workers { get; init; }
    public string? description { get; init; }
    public List<object?>? event_types { get; init; }
    public bool? is_enabled { get; init; }
    public string? label_key { get; init; }
    public string? label_value { get; init; }
    public Dictionary<string, object?>? labels { get; init; }
    public Dictionary<string, object?>? metadata { get; init; }
    public Dictionary<string, object?>? target { get; init; }
}

public record SubscriptionRemoveMatch
{
    public string id { get; init; }
    public string application_id { get; init; }
}

public record UserAuthentication
{
    public string current_password { get; init; }
    public string email { get; init; }
    public string new_password { get; init; }
    public string token { get; init; }
}

public record UserAuthenticationCreateData
{
    public string current_password { get; init; }
    public string email { get; init; }
    public string new_password { get; init; }
    public string token { get; init; }
}

public record UserInvitation
{
    public string email { get; init; }
    public string role { get; init; }
}

public record UserInvitationCreateData
{
    public string organization_id { get; init; }
    public string email { get; init; }
    public string role { get; init; }
}

