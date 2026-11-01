// Typed models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types are mapped
// from the canonical type sentinels. Do not edit by hand.
//
// These are DOCUMENTARY: the SDK runtime is dynamic (ops take/return the
// `Value` enum), so nothing consumes these structs yet — they mirror the
// entity/op shapes for reference and IDE support.
#![allow(dead_code, non_snake_case, unused_imports)]

use crate::utility::voxgigstruct::Value;

/// Application is the typed data model for the application entity.
#[derive(Debug, Clone)]
pub struct Application {
    pub amount: i64,
    pub application_id: String,
    pub application_name: String,
    pub consumption: std::collections::HashMap<String, Value>,
    pub date: String,
    pub id: Option<String>,
    pub is_provisional: bool,
    pub name: String,
    pub onboarding_steps: std::collections::HashMap<String, Value>,
    pub organization_id: String,
    pub quotas: std::collections::HashMap<String, Value>,
}

/// ApplicationLoadMatch is the typed request payload for Application.load.
#[derive(Debug, Clone)]
pub struct ApplicationLoadMatch {
    pub id: String,
}

/// ApplicationListMatch is the typed request payload for Application.list.
#[derive(Debug, Clone)]
pub struct ApplicationListMatch {
    pub organization_id: String,
}

/// ApplicationCreateData is the typed request payload for Application.create.
#[derive(Debug, Clone)]
pub struct ApplicationCreateData {
    pub name: String,
    pub organization_id: String,
}

/// ApplicationUpdateData is the typed request payload for Application.update.
#[derive(Debug, Clone)]
pub struct ApplicationUpdateData {
    pub id: String,
    pub name: Option<String>,
    pub organization_id: Option<String>,
}

/// ApplicationRemoveMatch is the typed request payload for Application.remove.
#[derive(Debug, Clone)]
pub struct ApplicationRemoveMatch {
    pub id: String,
}

/// ApplicationSecret is the typed data model for the application_secret entity.
#[derive(Debug, Clone)]
pub struct ApplicationSecret {
    pub application_id: String,
    pub created_at: String,
    pub deleted_at: Option<String>,
    pub id: Option<String>,
    pub name: Option<String>,
    pub token: String,
}

/// ApplicationSecretListMatch is the typed request payload for ApplicationSecret.list.
#[derive(Debug, Clone)]
pub struct ApplicationSecretListMatch {
    pub application_id: String,
}

/// ApplicationSecretCreateData is the typed request payload for ApplicationSecret.create.
#[derive(Debug, Clone)]
pub struct ApplicationSecretCreateData {
    pub application_id: String,
    pub name: Option<String>,
}

/// ApplicationSecretUpdateData is the typed request payload for ApplicationSecret.update.
#[derive(Debug, Clone)]
pub struct ApplicationSecretUpdateData {
    pub id: String,
    pub application_id: Option<String>,
    pub name: Option<String>,
}

/// ApplicationSecretRemoveMatch is the typed request payload for ApplicationSecret.remove.
#[derive(Debug, Clone)]
pub struct ApplicationSecretRemoveMatch {
    pub id: String,
    pub application_id: String,
}

/// EmailPreference is the typed data model for the email_preference entity.
#[derive(Debug, Clone)]
pub struct EmailPreference {
}

/// EmailPreferenceCreateData is the typed request payload for EmailPreference.create.
#[derive(Debug, Clone)]
pub struct EmailPreferenceCreateData {
    pub token: Option<Value>,
}

/// Error is the typed data model for the error entity.
#[derive(Debug, Clone)]
pub struct Error {
    pub detail: String,
    pub id: String,
    pub status: i64,
    pub title: String,
    pub type_: String,
    pub validation: Option<std::collections::HashMap<String, Value>>,
}

/// ErrorListMatch is the typed request payload for Error.list.
#[derive(Debug, Clone)]
pub struct ErrorListMatch {
    pub detail: Option<String>,
    pub id: Option<String>,
    pub status: Option<i64>,
    pub title: Option<String>,
    pub type_: Option<String>,
    pub validation: Option<std::collections::HashMap<String, Value>>,
}

/// Event is the typed data model for the event entity.
#[derive(Debug, Clone)]
pub struct Event {
    pub event_id: String,
    pub event_type_name: String,
    pub id: Option<String>,
    pub ip: String,
    pub labels: std::collections::HashMap<String, Value>,
    pub metadata: Option<std::collections::HashMap<String, Value>>,
    pub occurred_at: String,
    pub payload: String,
    pub payload_content_type: String,
    pub received_at: String,
}

/// EventLoadMatch is the typed request payload for Event.load.
#[derive(Debug, Clone)]
pub struct EventLoadMatch {
    pub id: String,
    pub application_id: String,
}

/// EventListMatch is the typed request payload for Event.list.
#[derive(Debug, Clone)]
pub struct EventListMatch {
    pub application_id: String,
}

/// EventCreateData is the typed request payload for Event.create.
#[derive(Debug, Clone)]
pub struct EventCreateData {
    pub id: String,
    pub application_id: Option<Value>,
}

/// EventType is the typed data model for the event_type entity.
#[derive(Debug, Clone)]
pub struct EventType {
    pub application_id: String,
    pub event_type_name: String,
    pub id: Option<String>,
    pub resource_type: String,
    pub resource_type_name: String,
    pub service: String,
    pub service_name: String,
    pub verb: String,
    pub verb_name: String,
}

/// EventTypeLoadMatch is the typed request payload for EventType.load.
#[derive(Debug, Clone)]
pub struct EventTypeLoadMatch {
    pub id: String,
    pub application_id: String,
}

/// EventTypeListMatch is the typed request payload for EventType.list.
#[derive(Debug, Clone)]
pub struct EventTypeListMatch {
    pub application_id: String,
}

/// EventTypeCreateData is the typed request payload for EventType.create.
#[derive(Debug, Clone)]
pub struct EventTypeCreateData {
    pub application_id: String,
    pub resource_type: String,
    pub service: String,
    pub verb: String,
}

/// EventTypeRemoveMatch is the typed request payload for EventType.remove.
#[derive(Debug, Clone)]
pub struct EventTypeRemoveMatch {
    pub id: String,
    pub application_id: String,
}

/// EventsManagement is the typed data model for the events_management entity.
#[derive(Debug, Clone)]
pub struct EventsManagement {
}

/// EventsManagementListMatch is the typed request payload for EventsManagement.list.
#[derive(Debug, Clone)]
pub struct EventsManagementListMatch {
}

/// Health is the typed data model for the health entity.
#[derive(Debug, Clone)]
pub struct Health {
    pub database: bool,
    pub database_duration_ms: i64,
    pub object_storage: Option<bool>,
    pub object_storage_duration_ms: Option<i64>,
    pub pulsar: Option<bool>,
    pub pulsar_duration_ms: Option<i64>,
    pub total_duration_ms: i64,
}

/// HealthLoadMatch is the typed request payload for Health.load.
#[derive(Debug, Clone)]
pub struct HealthLoadMatch {
    pub key: Option<String>,
}

/// Hook0 is the typed data model for the hook0 entity.
#[derive(Debug, Clone)]
pub struct Hook0 {
    pub default: Option<String>,
    pub description: Option<String>,
    pub env_var: String,
    pub group: Option<String>,
    pub name: String,
    pub required: bool,
    pub sensitive: bool,
}

/// Hook0ListMatch is the typed request payload for Hook0.list.
#[derive(Debug, Clone)]
pub struct Hook0ListMatch {
    pub default: Option<String>,
    pub description: Option<String>,
    pub env_var: Option<String>,
    pub group: Option<String>,
    pub name: Option<String>,
    pub required: Option<bool>,
    pub sensitive: Option<bool>,
}

/// IngestedEvent is the typed data model for the ingested_event entity.
#[derive(Debug, Clone)]
pub struct IngestedEvent {
    pub application_id: String,
    pub event_id: Option<String>,
    pub event_type: String,
    pub labels: std::collections::HashMap<String, Value>,
    pub metadata: Option<std::collections::HashMap<String, Value>>,
    pub occurred_at: String,
    pub payload: String,
    pub payload_content_type: String,
}

/// IngestedEventCreateData is the typed request payload for IngestedEvent.create.
#[derive(Debug, Clone)]
pub struct IngestedEventCreateData {
    pub application_id: String,
    pub event_id: Option<String>,
    pub event_type: String,
    pub labels: std::collections::HashMap<String, Value>,
    pub metadata: Option<std::collections::HashMap<String, Value>>,
    pub occurred_at: String,
    pub payload: String,
    pub payload_content_type: String,
}

/// Instance is the typed data model for the instance entity.
#[derive(Debug, Clone)]
pub struct Instance {
    pub application_secret_compatibility: bool,
    pub auto_db_migration: bool,
    pub biscuit_public_key: String,
    pub cloudflare_turnstile_site_key: Option<String>,
    pub formbricks: std::collections::HashMap<String, Value>,
    pub matomo: std::collections::HashMap<String, Value>,
    pub password_minimum_length: i64,
    pub quota_enforcement: bool,
    pub registration_disabled: bool,
    pub support_email_address: String,
}

/// InstanceLoadMatch is the typed request payload for Instance.load.
#[derive(Debug, Clone)]
pub struct InstanceLoadMatch {
    pub application_secret_compatibility: Option<bool>,
    pub auto_db_migration: Option<bool>,
    pub biscuit_public_key: Option<String>,
    pub cloudflare_turnstile_site_key: Option<String>,
    pub formbricks: Option<std::collections::HashMap<String, Value>>,
    pub matomo: Option<std::collections::HashMap<String, Value>>,
    pub password_minimum_length: Option<i64>,
    pub quota_enforcement: Option<bool>,
    pub registration_disabled: Option<bool>,
    pub support_email_address: Option<String>,
}

/// Login is the typed data model for the login entity.
#[derive(Debug, Clone)]
pub struct Login {
    pub email: String,
    pub password: String,
    pub token: String,
}

/// LoginCreateData is the typed request payload for Login.create.
#[derive(Debug, Clone)]
pub struct LoginCreateData {
    pub email: String,
    pub password: String,
    pub token: String,
}

/// Organization is the typed data model for the organization entity.
#[derive(Debug, Clone)]
pub struct Organization {
    pub amount: i64,
    pub application_id: String,
    pub application_name: String,
    pub consumption: std::collections::HashMap<String, Value>,
    pub date: String,
    pub id: Option<String>,
    pub is_provisional: bool,
    pub name: String,
    pub onboarding_steps: std::collections::HashMap<String, Value>,
    pub organization_id: String,
    pub plan: std::collections::HashMap<String, Value>,
    pub quotas: std::collections::HashMap<String, Value>,
    pub role: String,
    pub users: Vec<Value>,
}

/// OrganizationLoadMatch is the typed request payload for Organization.load.
#[derive(Debug, Clone)]
pub struct OrganizationLoadMatch {
    pub id: String,
}

/// OrganizationListMatch is the typed request payload for Organization.list.
#[derive(Debug, Clone)]
pub struct OrganizationListMatch {
    pub amount: Option<i64>,
    pub application_id: Option<String>,
    pub application_name: Option<String>,
    pub consumption: Option<std::collections::HashMap<String, Value>>,
    pub date: Option<String>,
    pub id: Option<String>,
    pub is_provisional: Option<bool>,
    pub name: Option<String>,
    pub onboarding_steps: Option<std::collections::HashMap<String, Value>>,
    pub organization_id: Option<String>,
    pub plan: Option<std::collections::HashMap<String, Value>>,
    pub quotas: Option<std::collections::HashMap<String, Value>>,
    pub role: Option<String>,
    pub users: Option<Vec<Value>>,
}

/// OrganizationCreateData is the typed request payload for Organization.create.
#[derive(Debug, Clone)]
pub struct OrganizationCreateData {
    pub name: String,
}

/// OrganizationUpdateData is the typed request payload for Organization.update.
#[derive(Debug, Clone)]
pub struct OrganizationUpdateData {
    pub id: String,
    pub name: Option<String>,
}

/// OrganizationRemoveMatch is the typed request payload for Organization.remove.
#[derive(Debug, Clone)]
pub struct OrganizationRemoveMatch {
    pub id: String,
}

/// OrganizationEditRole is the typed data model for the organization_edit_role entity.
#[derive(Debug, Clone)]
pub struct OrganizationEditRole {
    pub id: Option<String>,
    pub role: String,
    pub user_id: String,
}

/// OrganizationEditRoleUpdateData is the typed request payload for OrganizationEditRole.update.
#[derive(Debug, Clone)]
pub struct OrganizationEditRoleUpdateData {
    pub id: String,
    pub role: Option<String>,
    pub user_id: Option<String>,
}

/// Quota is the typed data model for the quota entity.
#[derive(Debug, Clone)]
pub struct Quota {
    pub enabled: bool,
    pub limits: std::collections::HashMap<String, Value>,
}

/// QuotaLoadMatch is the typed request payload for Quota.load.
#[derive(Debug, Clone)]
pub struct QuotaLoadMatch {
    pub enabled: Option<bool>,
    pub limits: Option<std::collections::HashMap<String, Value>>,
}

/// Registration is the typed data model for the registration entity.
#[derive(Debug, Clone)]
pub struct Registration {
    pub email: String,
    pub first_name: String,
    pub gclid: Option<String>,
    pub last_name: String,
    pub password: String,
    pub signup_channel: Option<String>,
    pub turnstile_token: Option<String>,
}

/// RegistrationCreateData is the typed request payload for Registration.create.
#[derive(Debug, Clone)]
pub struct RegistrationCreateData {
    pub email: String,
    pub first_name: String,
    pub gclid: Option<String>,
    pub last_name: String,
    pub password: String,
    pub signup_channel: Option<String>,
    pub turnstile_token: Option<String>,
}

/// RequestAttempt is the typed data model for the request_attempt entity.
#[derive(Debug, Clone)]
pub struct RequestAttempt {
    pub created_at: String,
    pub delay_until: Option<String>,
    pub event: std::collections::HashMap<String, Value>,
    pub event_id: String,
    pub failed_at: Option<String>,
    pub http_response_status: Option<i64>,
    pub id: Option<String>,
    pub picked_at: Option<String>,
    pub request_attempt_id: String,
    pub response_id: Option<String>,
    pub retry_count: i64,
    pub status: std::collections::HashMap<String, Value>,
    pub subscription: std::collections::HashMap<String, Value>,
    pub succeeded_at: Option<String>,
}

/// RequestAttemptLoadMatch is the typed request payload for RequestAttempt.load.
#[derive(Debug, Clone)]
pub struct RequestAttemptLoadMatch {
    pub id: String,
    pub application_id: String,
}

/// RequestAttemptListMatch is the typed request payload for RequestAttempt.list.
#[derive(Debug, Clone)]
pub struct RequestAttemptListMatch {
    pub application_id: String,
    pub event_event_type_name: Option<String>,
    pub event_id: Option<String>,
    pub max_created_at: Option<String>,
    pub min_created_at: Option<String>,
    pub pagination_cursor: Option<String>,
    pub subscription_id: Option<String>,
}

/// Response is the typed data model for the response entity.
#[derive(Debug, Clone)]
pub struct Response {
    pub body: Option<String>,
    pub elapsed_time_ms: Option<i64>,
    pub headers: Option<std::collections::HashMap<String, Value>>,
    pub http_code: Option<i64>,
    pub id: Option<String>,
    pub response_error_name: Option<String>,
    pub response_id: String,
}

/// ResponseLoadMatch is the typed request payload for Response.load.
#[derive(Debug, Clone)]
pub struct ResponseLoadMatch {
    pub id: String,
    pub application_id: String,
}

/// Revoke is the typed data model for the revoke entity.
#[derive(Debug, Clone)]
pub struct Revoke {
}

/// RevokeRemoveMatch is the typed request payload for Revoke.remove.
#[derive(Debug, Clone)]
pub struct RevokeRemoveMatch {
    pub organization_id: String,
}

/// ServiceToken is the typed data model for the service_token entity.
#[derive(Debug, Clone)]
pub struct ServiceToken {
    pub biscuit: String,
    pub created_at: String,
    pub id: Option<String>,
    pub name: String,
    pub organization_id: String,
    pub token_id: String,
}

/// ServiceTokenLoadMatch is the typed request payload for ServiceToken.load.
#[derive(Debug, Clone)]
pub struct ServiceTokenLoadMatch {
    pub id: String,
    pub organization_id: String,
}

/// ServiceTokenListMatch is the typed request payload for ServiceToken.list.
#[derive(Debug, Clone)]
pub struct ServiceTokenListMatch {
    pub organization_id: String,
}

/// ServiceTokenCreateData is the typed request payload for ServiceToken.create.
#[derive(Debug, Clone)]
pub struct ServiceTokenCreateData {
    pub name: String,
    pub organization_id: String,
}

/// ServiceTokenUpdateData is the typed request payload for ServiceToken.update.
#[derive(Debug, Clone)]
pub struct ServiceTokenUpdateData {
    pub id: String,
    pub name: Option<String>,
    pub organization_id: Option<String>,
}

/// ServiceTokenRemoveMatch is the typed request payload for ServiceToken.remove.
#[derive(Debug, Clone)]
pub struct ServiceTokenRemoveMatch {
    pub id: String,
    pub organization_id: String,
}

/// Subscription is the typed data model for the subscription entity.
#[derive(Debug, Clone)]
pub struct Subscription {
    pub application_id: String,
    pub created_at: String,
    pub dedicated_workers: Vec<Value>,
    pub description: Option<String>,
    pub event_types: Vec<Value>,
    pub id: Option<String>,
    pub is_enabled: bool,
    pub label_key: String,
    pub label_value: String,
    pub labels: std::collections::HashMap<String, Value>,
    pub metadata: std::collections::HashMap<String, Value>,
    pub secret: String,
    pub subscription_id: String,
    pub target: std::collections::HashMap<String, Value>,
    pub updated_at: String,
}

/// SubscriptionLoadMatch is the typed request payload for Subscription.load.
#[derive(Debug, Clone)]
pub struct SubscriptionLoadMatch {
    pub id: String,
}

/// SubscriptionListMatch is the typed request payload for Subscription.list.
#[derive(Debug, Clone)]
pub struct SubscriptionListMatch {
    pub application_id: String,
}

/// SubscriptionCreateData is the typed request payload for Subscription.create.
#[derive(Debug, Clone)]
pub struct SubscriptionCreateData {
    pub application_id: String,
    pub dedicated_workers: Option<Vec<Value>>,
    pub description: Option<String>,
    pub event_types: Vec<Value>,
    pub is_enabled: bool,
    pub label_key: Option<String>,
    pub label_value: Option<String>,
    pub labels: Option<std::collections::HashMap<String, Value>>,
    pub metadata: Option<std::collections::HashMap<String, Value>>,
    pub target: std::collections::HashMap<String, Value>,
}

/// SubscriptionUpdateData is the typed request payload for Subscription.update.
#[derive(Debug, Clone)]
pub struct SubscriptionUpdateData {
    pub id: String,
    pub application_id: Option<String>,
    pub dedicated_workers: Option<Vec<Value>>,
    pub description: Option<String>,
    pub event_types: Option<Vec<Value>>,
    pub is_enabled: Option<bool>,
    pub label_key: Option<String>,
    pub label_value: Option<String>,
    pub labels: Option<std::collections::HashMap<String, Value>>,
    pub metadata: Option<std::collections::HashMap<String, Value>>,
    pub target: Option<std::collections::HashMap<String, Value>>,
}

/// SubscriptionRemoveMatch is the typed request payload for Subscription.remove.
#[derive(Debug, Clone)]
pub struct SubscriptionRemoveMatch {
    pub id: String,
    pub application_id: String,
}

/// UserAuthentication is the typed data model for the user_authentication entity.
#[derive(Debug, Clone)]
pub struct UserAuthentication {
    pub current_password: String,
    pub email: String,
    pub new_password: String,
    pub token: String,
}

/// UserAuthenticationCreateData is the typed request payload for UserAuthentication.create.
#[derive(Debug, Clone)]
pub struct UserAuthenticationCreateData {
    pub current_password: String,
    pub email: String,
    pub new_password: String,
    pub token: String,
}

/// UserInvitation is the typed data model for the user_invitation entity.
#[derive(Debug, Clone)]
pub struct UserInvitation {
    pub email: String,
    pub role: String,
}

/// UserInvitationCreateData is the typed request payload for UserInvitation.create.
#[derive(Debug, Clone)]
pub struct UserInvitationCreateData {
    pub organization_id: String,
    pub email: String,
    pub role: String,
}

