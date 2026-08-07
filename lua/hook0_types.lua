-- Typed models for the Hook0 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Application
---@field application_id string
---@field consumption table
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field quota table

---@class ApplicationLoadMatch
---@field id string

---@class ApplicationListMatch
---@field application_id? string
---@field consumption? table
---@field name? string
---@field onboarding_steps? table
---@field organization_id? string
---@field quota? table

---@class ApplicationCreateData
---@field application_id string
---@field consumption table
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field quota table

---@class ApplicationUpdateData
---@field id string

---@class ApplicationRemoveMatch
---@field id string

---@class ApplicationSecret
---@field application_id string
---@field created_at string
---@field deleted_at? string
---@field name? string
---@field token string

---@class ApplicationSecretListMatch
---@field application_id? string
---@field created_at? string
---@field deleted_at? string
---@field name? string
---@field token? string

---@class ApplicationSecretCreateData
---@field application_id string
---@field created_at string
---@field deleted_at? string
---@field name? string
---@field token string

---@class ApplicationSecretUpdateData
---@field id string

---@class ApplicationsManagement

---@class ApplicationsManagementRemoveMatch
---@field application_secret_token string

---@class Event
---@field event_id string
---@field event_type_name string
---@field ip string
---@field labels table
---@field metadata? table
---@field occurred_at string
---@field payload string
---@field payload_content_type string
---@field received_at string

---@class EventLoadMatch
---@field id string

---@class EventListMatch
---@field event_id? string
---@field event_type_name? string
---@field ip? string
---@field labels? table
---@field metadata? table
---@field occurred_at? string
---@field payload? string
---@field payload_content_type? string
---@field received_at? string

---@class EventType
---@field application_id string
---@field event_type_name string
---@field resource_type string
---@field resource_type_name string
---@field service string
---@field service_name string
---@field verb string
---@field verb_name string

---@class EventTypeLoadMatch
---@field id string

---@class EventTypeListMatch
---@field application_id? string
---@field event_type_name? string
---@field resource_type? string
---@field resource_type_name? string
---@field service? string
---@field service_name? string
---@field verb? string
---@field verb_name? string

---@class EventTypeCreateData
---@field application_id string
---@field event_type_name string
---@field resource_type string
---@field resource_type_name string
---@field service string
---@field service_name string
---@field verb string
---@field verb_name string

---@class EventsManagement
---@field application_id string

---@class EventsManagementListMatch
---@field application_id? string

---@class EventsManagementCreateData
---@field event_id string

---@class EventsManagementRemoveMatch
---@field event_type_name string

---@class EventsPerDayEntry
---@field amount number
---@field application_id string
---@field application_name string
---@field date string
---@field is_provisional boolean

---@class EventsPerDayEntryListMatch
---@field amount? number
---@field application_id? string
---@field application_name? string
---@field date? string
---@field is_provisional? boolean

---@class Health
---@field database boolean
---@field database_duration_ms number
---@field object_storage? boolean
---@field object_storage_duration_ms? number
---@field pulsar? boolean
---@field pulsar_duration_ms? number
---@field total_duration_ms number

---@class HealthLoadMatch
---@field database? boolean
---@field database_duration_ms? number
---@field object_storage? boolean
---@field object_storage_duration_ms? number
---@field pulsar? boolean
---@field pulsar_duration_ms? number
---@field total_duration_ms? number

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

---@class LoginCreateData
---@field email string
---@field password string

---@class Organization
---@field consumption table
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field plan table
---@field quota table
---@field role string
---@field users table

---@class OrganizationLoadMatch
---@field id string

---@class OrganizationListMatch
---@field consumption? table
---@field name? string
---@field onboarding_steps? table
---@field organization_id? string
---@field plan? table
---@field quota? table
---@field role? string
---@field users? table

---@class OrganizationCreateData
---@field consumption table
---@field name string
---@field onboarding_steps table
---@field organization_id string
---@field plan table
---@field quota table
---@field role string
---@field users table

---@class OrganizationUpdateData
---@field id string

---@class OrganizationRemoveMatch
---@field id string

---@class OrganizationEditRole
---@field role string
---@field user_id string

---@class OrganizationEditRoleUpdateData
---@field id string

---@class Problem
---@field detail string
---@field id string
---@field status number
---@field title string

---@class ProblemListMatch
---@field detail? string
---@field id? string
---@field status? number
---@field title? string

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
---@field turnstile_token? string

---@class RegistrationCreateData
---@field email string
---@field first_name string
---@field gclid? string
---@field last_name string
---@field password string
---@field turnstile_token? string

---@class RequestAttempt
---@field created_at string
---@field delay_until? string
---@field event table
---@field event_id string
---@field failed_at? string
---@field http_response_status? number
---@field picked_at? string
---@field request_attempt_id string
---@field response_id? string
---@field retry_count number
---@field status table
---@field subscription table
---@field succeeded_at? string

---@class RequestAttemptLoadMatch
---@field id string

---@class RequestAttemptListMatch
---@field created_at? string
---@field delay_until? string
---@field event? table
---@field event_id? string
---@field failed_at? string
---@field http_response_status? number
---@field picked_at? string
---@field request_attempt_id? string
---@field response_id? string
---@field retry_count? number
---@field status? table
---@field subscription? table
---@field succeeded_at? string

---@class Response
---@field body? string
---@field elapsed_time_ms? number
---@field headers? table
---@field http_code? number
---@field response_error_name? string
---@field response_id string

---@class ResponseLoadMatch
---@field id string

---@class Revoke

---@class RevokeRemoveMatch
---@field organization_id string

---@class ServiceToken
---@field biscuit string
---@field created_at string
---@field name string
---@field organization_id string
---@field token_id string

---@class ServiceTokenLoadMatch
---@field id string

---@class ServiceTokenListMatch
---@field biscuit? string
---@field created_at? string
---@field name? string
---@field organization_id? string
---@field token_id? string

---@class ServiceTokenCreateData
---@field biscuit string
---@field created_at string
---@field name string
---@field organization_id string
---@field token_id string

---@class ServiceTokenUpdateData
---@field id string

---@class ServiceTokenRemoveMatch
---@field id string

---@class Subscription
---@field application_id string
---@field created_at string
---@field dedicated_workers table
---@field description? string
---@field event_type table
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
---@field application_id? string
---@field created_at? string
---@field dedicated_workers? table
---@field description? string
---@field event_type? table
---@field is_enabled? boolean
---@field label_key? string
---@field label_value? string
---@field labels? table
---@field metadata? table
---@field secret? string
---@field subscription_id? string
---@field target? table
---@field updated_at? string

---@class SubscriptionCreateData
---@field application_id string
---@field created_at string
---@field dedicated_workers table
---@field description? string
---@field event_type table
---@field is_enabled boolean
---@field label_key string
---@field label_value string
---@field labels table
---@field metadata table
---@field secret string
---@field subscription_id string
---@field target table
---@field updated_at string

---@class SubscriptionUpdateData
---@field id string

---@class SubscriptionRemoveMatch
---@field id string

---@class UserAuthentication
---@field email string
---@field new_password string
---@field token string

---@class UserAuthenticationCreateData
---@field email string
---@field new_password string
---@field token string

---@class UserInvitation
---@field email string
---@field role string

---@class UserInvitationCreateData
---@field organization_id string

local M = {}

return M
