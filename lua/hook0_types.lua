-- Typed models for the Hook0 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Application
---@field amount number
---@field application_id string
---@field application_name string
---@field consumption table
---@field date string
---@field id? string
---@field is_provisional boolean
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field quotas table

---@class ApplicationLoadMatch
---@field id string

---@class ApplicationListMatch
---@field organization_id string

---@class ApplicationCreateData
---@field name string
---@field organization_id string

---@class ApplicationUpdateData
---@field id string
---@field name? string
---@field organization_id? string

---@class ApplicationRemoveMatch
---@field id string

---@class ApplicationSecret
---@field application_id string
---@field created_at string
---@field deleted_at? string
---@field id? string
---@field name? string
---@field token string

---@class ApplicationSecretListMatch
---@field application_id string

---@class ApplicationSecretCreateData
---@field application_id string
---@field name? string

---@class ApplicationSecretUpdateData
---@field id string
---@field application_id? string
---@field name? string

---@class ApplicationSecretRemoveMatch
---@field id string
---@field application_id string

---@class EmailPreference

---@class EmailPreferenceCreateData
---@field token? any

---@class Error
---@field detail string
---@field id string
---@field status number
---@field title string
---@field type string
---@field validation? table

---@class ErrorListMatch
---@field detail? string
---@field id? string
---@field status? number
---@field title? string
---@field type? string
---@field validation? table

---@class Event
---@field event_id string
---@field event_type_name string
---@field id? string
---@field ip string
---@field labels table
---@field metadata? table
---@field occurred_at string
---@field payload string
---@field payload_content_type string
---@field received_at string

---@class EventLoadMatch
---@field id string
---@field application_id string

---@class EventListMatch
---@field application_id string

---@class EventCreateData
---@field id string
---@field application_id? any

---@class EventType
---@field application_id string
---@field event_type_name string
---@field id? string
---@field resource_type string
---@field resource_type_name string
---@field service string
---@field service_name string
---@field verb string
---@field verb_name string

---@class EventTypeLoadMatch
---@field id string
---@field application_id string

---@class EventTypeListMatch
---@field application_id string

---@class EventTypeCreateData
---@field application_id string
---@field resource_type string
---@field service string
---@field verb string

---@class EventTypeRemoveMatch
---@field id string
---@field application_id string

---@class EventsManagement

---@class EventsManagementListMatch

---@class Health
---@field database boolean
---@field database_duration_ms number
---@field object_storage? boolean
---@field object_storage_duration_ms? number
---@field pulsar? boolean
---@field pulsar_duration_ms? number
---@field total_duration_ms number

---@class HealthLoadMatch
---@field key? string

---@class Hook0
---@field default? string
---@field description? string
---@field env_var string
---@field group? string
---@field name string
---@field required boolean
---@field sensitive boolean

---@class Hook0ListMatch
---@field default? string
---@field description? string
---@field env_var? string
---@field group? string
---@field name? string
---@field required? boolean
---@field sensitive? boolean

---@class IngestedEvent
---@field application_id string
---@field event_id? string
---@field event_type string
---@field labels table
---@field metadata? table
---@field occurred_at string
---@field payload string
---@field payload_content_type string

---@class IngestedEventCreateData
---@field application_id string
---@field event_id? string
---@field event_type string
---@field labels table
---@field metadata? table
---@field occurred_at string
---@field payload string
---@field payload_content_type string

---@class Instance
---@field application_secret_compatibility boolean
---@field auto_db_migration boolean
---@field biscuit_public_key string
---@field cloudflare_turnstile_site_key? string
---@field formbricks table
---@field matomo table
---@field password_minimum_length number
---@field quota_enforcement boolean
---@field registration_disabled boolean
---@field support_email_address string

---@class InstanceLoadMatch
---@field application_secret_compatibility? boolean
---@field auto_db_migration? boolean
---@field biscuit_public_key? string
---@field cloudflare_turnstile_site_key? string
---@field formbricks? table
---@field matomo? table
---@field password_minimum_length? number
---@field quota_enforcement? boolean
---@field registration_disabled? boolean
---@field support_email_address? string

---@class Login
---@field email string
---@field password string
---@field token string

---@class LoginCreateData
---@field email string
---@field password string
---@field token string

---@class Organization
---@field amount number
---@field application_id string
---@field application_name string
---@field consumption table
---@field date string
---@field id? string
---@field is_provisional boolean
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field plan table
---@field quotas table
---@field role string
---@field users table

---@class OrganizationLoadMatch
---@field id string

---@class OrganizationListMatch
---@field amount? number
---@field application_id? string
---@field application_name? string
---@field consumption? table
---@field date? string
---@field id? string
---@field is_provisional? boolean
---@field name? string
---@field onboarding_steps? table
---@field organization_id? string
---@field plan? table
---@field quotas? table
---@field role? string
---@field users? table

---@class OrganizationCreateData
---@field name string

---@class OrganizationUpdateData
---@field id string
---@field name? string

---@class OrganizationRemoveMatch
---@field id string

---@class OrganizationEditRole
---@field id? string
---@field role string
---@field user_id string

---@class OrganizationEditRoleUpdateData
---@field id string
---@field role? string
---@field user_id? string

---@class Quota
---@field enabled boolean
---@field limits table

---@class QuotaLoadMatch
---@field enabled? boolean
---@field limits? table

---@class Registration
---@field email string
---@field first_name string
---@field gclid? string
---@field last_name string
---@field password string
---@field signup_channel? string
---@field turnstile_token? string

---@class RegistrationCreateData
---@field email string
---@field first_name string
---@field gclid? string
---@field last_name string
---@field password string
---@field signup_channel? string
---@field turnstile_token? string

---@class RequestAttempt
---@field created_at string
---@field delay_until? string
---@field event table
---@field event_id string
---@field failed_at? string
---@field http_response_status? number
---@field id? string
---@field picked_at? string
---@field request_attempt_id string
---@field response_id? string
---@field retry_count number
---@field status table
---@field subscription table
---@field succeeded_at? string

---@class RequestAttemptLoadMatch
---@field id string
---@field application_id string

---@class RequestAttemptListMatch
---@field application_id string
---@field event_event_type_name? string
---@field event_id? string
---@field max_created_at? string
---@field min_created_at? string
---@field pagination_cursor? string
---@field subscription_id? string

---@class Response
---@field body? string
---@field elapsed_time_ms? number
---@field headers? table
---@field http_code? number
---@field id? string
---@field response_error_name? string
---@field response_id string

---@class ResponseLoadMatch
---@field id string
---@field application_id string

---@class Revoke

---@class RevokeRemoveMatch
---@field organization_id string

---@class ServiceToken
---@field biscuit string
---@field created_at string
---@field id? string
---@field name string
---@field organization_id string
---@field token_id string

---@class ServiceTokenLoadMatch
---@field id string
---@field organization_id string

---@class ServiceTokenListMatch
---@field organization_id string

---@class ServiceTokenCreateData
---@field name string
---@field organization_id string

---@class ServiceTokenUpdateData
---@field id string
---@field name? string
---@field organization_id? string

---@class ServiceTokenRemoveMatch
---@field id string
---@field organization_id string

---@class Subscription
---@field application_id string
---@field created_at string
---@field dedicated_workers table
---@field description? string
---@field event_types table
---@field id? string
---@field is_enabled boolean
---@field label_key string
---@field label_value string
---@field labels table
---@field metadata table
---@field secret string
---@field subscription_id string
---@field target table
---@field updated_at string

---@class SubscriptionLoadMatch
---@field id string

---@class SubscriptionListMatch
---@field application_id string

---@class SubscriptionCreateData
---@field application_id string
---@field dedicated_workers? table
---@field description? string
---@field event_types table
---@field is_enabled boolean
---@field label_key? string
---@field label_value? string
---@field labels? table
---@field metadata? table
---@field target table

---@class SubscriptionUpdateData
---@field id string
---@field application_id? string
---@field dedicated_workers? table
---@field description? string
---@field event_types? table
---@field is_enabled? boolean
---@field label_key? string
---@field label_value? string
---@field labels? table
---@field metadata? table
---@field target? table

---@class SubscriptionRemoveMatch
---@field id string
---@field application_id string

---@class UserAuthentication
---@field current_password string
---@field email string
---@field new_password string
---@field token string

---@class UserAuthenticationCreateData
---@field current_password string
---@field email string
---@field new_password string
---@field token string

---@class UserInvitation
---@field email string
---@field role string

---@class UserInvitationCreateData
---@field organization_id string
---@field email string
---@field role string

local M = {}

return M
