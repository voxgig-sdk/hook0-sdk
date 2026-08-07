package voxgig.hook0sdk.core;

// Typed reference models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels (source of truth: @voxgig/apidef VALID_CANON). Do
// not edit by hand.
//
// These records are documentation/DX reference shapes ONLY. The SDK ops take
// and return the loose object model (Map<String, Object> / Object) at runtime,
// so these types are not wired into the op signatures — use them to describe a
// payload before converting it to a map. Every component is a boxed (nullable)
// type, so an optional (req:false) key needs no distinct rendering.

import java.util.List;
import java.util.Map;

public final class Hook0Types {

  private Hook0Types() {}

  public record Application(String application_id, Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> quota) {}

  public record ApplicationLoadMatch(String id) {}

  public record ApplicationListMatch(String application_id, Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> quota) {}

  public record ApplicationCreateData(String application_id, Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> quota) {}

  public record ApplicationUpdateData(String id) {}

  public record ApplicationRemoveMatch(String id) {}

  public record ApplicationSecret(String application_id, String created_at, String deleted_at, String name, String token) {}

  public record ApplicationSecretListMatch(String application_id, String created_at, String deleted_at, String name, String token) {}

  public record ApplicationSecretCreateData(String application_id, String created_at, String deleted_at, String name, String token) {}

  public record ApplicationSecretUpdateData(String id) {}

  public record ApplicationsManagement() {}

  public record ApplicationsManagementRemoveMatch(String application_secret_token) {}

  public record Event(String event_id, String event_type_name, String ip, Map<String, Object> labels, Map<String, Object> metadata, String occurred_at, String payload, String payload_content_type, String received_at) {}

  public record EventLoadMatch(String id) {}

  public record EventListMatch(String event_id, String event_type_name, String ip, Map<String, Object> labels, Map<String, Object> metadata, String occurred_at, String payload, String payload_content_type, String received_at) {}

  public record EventType(String application_id, String event_type_name, String resource_type, String resource_type_name, String service, String service_name, String verb, String verb_name) {}

  public record EventTypeLoadMatch(String id) {}

  public record EventTypeListMatch(String application_id, String event_type_name, String resource_type, String resource_type_name, String service, String service_name, String verb, String verb_name) {}

  public record EventTypeCreateData(String application_id, String event_type_name, String resource_type, String resource_type_name, String service, String service_name, String verb, String verb_name) {}

  public record EventsManagement(String application_id) {}

  public record EventsManagementListMatch(String application_id) {}

  public record EventsManagementCreateData(String event_id) {}

  public record EventsManagementRemoveMatch(String event_type_name) {}

  public record EventsPerDayEntry(Long amount, String application_id, String application_name, String date, Boolean is_provisional) {}

  public record EventsPerDayEntryListMatch(Long amount, String application_id, String application_name, String date, Boolean is_provisional) {}

  public record Health(Boolean database, Long database_duration_ms, Boolean object_storage, Long object_storage_duration_ms, Boolean pulsar, Long pulsar_duration_ms, Long total_duration_ms) {}

  public record HealthLoadMatch(Boolean database, Long database_duration_ms, Boolean object_storage, Long object_storage_duration_ms, Boolean pulsar, Long pulsar_duration_ms, Long total_duration_ms) {}

  public record Hook0(String description, String env_var, String group, String name, Boolean required, Boolean sensitive) {}

  public record Hook0ListMatch(String description, String env_var, String group, String name, Boolean required, Boolean sensitive) {}

  public record IngestedEvent(String application_id, String event_id, String event_type, Map<String, Object> labels, Map<String, Object> metadata, String occurred_at, String payload, String payload_content_type) {}

  public record IngestedEventCreateData(String application_id, String event_id, String event_type, Map<String, Object> labels, Map<String, Object> metadata, String occurred_at, String payload, String payload_content_type) {}

  public record Instance(Boolean application_secret_compatibility, Boolean auto_db_migration, String biscuit_public_key, String cloudflare_turnstile_site_key, Map<String, Object> formbricks, Map<String, Object> matomo, Long password_minimum_length, Boolean quota_enforcement, Boolean registration_disabled, String support_email_address) {}

  public record InstanceLoadMatch(Boolean application_secret_compatibility, Boolean auto_db_migration, String biscuit_public_key, String cloudflare_turnstile_site_key, Map<String, Object> formbricks, Map<String, Object> matomo, Long password_minimum_length, Boolean quota_enforcement, Boolean registration_disabled, String support_email_address) {}

  public record Login(String email, String password) {}

  public record LoginCreateData(String email, String password) {}

  public record Organization(Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> plan, Map<String, Object> quota, String role, List<Object> users) {}

  public record OrganizationLoadMatch(String id) {}

  public record OrganizationListMatch(Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> plan, Map<String, Object> quota, String role, List<Object> users) {}

  public record OrganizationCreateData(Map<String, Object> consumption, String name, Map<String, Object> onboarding_steps, String organization_id, Map<String, Object> plan, Map<String, Object> quota, String role, List<Object> users) {}

  public record OrganizationUpdateData(String id) {}

  public record OrganizationRemoveMatch(String id) {}

  public record OrganizationEditRole(String role, String user_id) {}

  public record OrganizationEditRoleUpdateData(String id) {}

  public record Problem(String detail, String id, Long status, String title) {}

  public record ProblemListMatch(String detail, String id, Long status, String title) {}

  public record Quota(Boolean enabled, Map<String, Object> limits) {}

  public record QuotaLoadMatch(Boolean enabled, Map<String, Object> limits) {}

  public record Registration(String email, String first_name, String gclid, String last_name, String password, String turnstile_token) {}

  public record RegistrationCreateData(String email, String first_name, String gclid, String last_name, String password, String turnstile_token) {}

  public record RequestAttempt(String created_at, String delay_until, Map<String, Object> event, String event_id, String failed_at, Long http_response_status, String picked_at, String request_attempt_id, String response_id, Long retry_count, Map<String, Object> status, Map<String, Object> subscription, String succeeded_at) {}

  public record RequestAttemptLoadMatch(String id) {}

  public record RequestAttemptListMatch(String created_at, String delay_until, Map<String, Object> event, String event_id, String failed_at, Long http_response_status, String picked_at, String request_attempt_id, String response_id, Long retry_count, Map<String, Object> status, Map<String, Object> subscription, String succeeded_at) {}

  public record Response(String body, Long elapsed_time_ms, Map<String, Object> headers, Long http_code, String response_error_name, String response_id) {}

  public record ResponseLoadMatch(String id) {}

  public record Revoke() {}

  public record RevokeRemoveMatch(String organization_id) {}

  public record ServiceToken(String biscuit, String created_at, String name, String organization_id, String token_id) {}

  public record ServiceTokenLoadMatch(String id) {}

  public record ServiceTokenListMatch(String biscuit, String created_at, String name, String organization_id, String token_id) {}

  public record ServiceTokenCreateData(String biscuit, String created_at, String name, String organization_id, String token_id) {}

  public record ServiceTokenUpdateData(String id) {}

  public record ServiceTokenRemoveMatch(String id) {}

  public record Subscription(String application_id, String created_at, List<Object> dedicated_workers, String description, List<Object> event_type, Boolean is_enabled, String label_key, String label_value, Map<String, Object> labels, Map<String, Object> metadata, String secret, String subscription_id, Map<String, Object> target, String updated_at) {}

  public record SubscriptionLoadMatch(String id) {}

  public record SubscriptionListMatch(String application_id, String created_at, List<Object> dedicated_workers, String description, List<Object> event_type, Boolean is_enabled, String label_key, String label_value, Map<String, Object> labels, Map<String, Object> metadata, String secret, String subscription_id, Map<String, Object> target, String updated_at) {}

  public record SubscriptionCreateData(String application_id, String created_at, List<Object> dedicated_workers, String description, List<Object> event_type, Boolean is_enabled, String label_key, String label_value, Map<String, Object> labels, Map<String, Object> metadata, String secret, String subscription_id, Map<String, Object> target, String updated_at) {}

  public record SubscriptionUpdateData(String id) {}

  public record SubscriptionRemoveMatch(String id) {}

  public record UserAuthentication(String email, String new_password, String token) {}

  public record UserAuthenticationCreateData(String email, String new_password, String token) {}

  public record UserInvitation(String email, String role) {}

  public record UserInvitationCreateData(String organization_id) {}

}
