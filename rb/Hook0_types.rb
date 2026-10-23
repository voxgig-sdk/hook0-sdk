# frozen_string_literal: true

# Typed models for the Hook0 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Application entity data model.
#
# @!attribute [rw] amount
#   @return [Integer]
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] application_name
#   @return [String]
#
# @!attribute [rw] consumption
#   @return [Hash]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_provisional
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] onboarding_steps
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] quotas
#   @return [Hash]
Application = Struct.new(
  :amount,
  :application_id,
  :application_name,
  :consumption,
  :date,
  :id,
  :is_provisional,
  :name,
  :onboarding_steps,
  :organization_id,
  :quotas,
  keyword_init: true
)

# Request payload for Application#load.
#
# @!attribute [rw] id
#   @return [String]
ApplicationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Application#list.
#
# @!attribute [rw] organization_id
#   @return [String]
ApplicationListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for Application#create.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ApplicationCreateData = Struct.new(
  :name,
  :organization_id,
  keyword_init: true
)

# Request payload for Application#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
ApplicationUpdateData = Struct.new(
  :id,
  :name,
  :organization_id,
  keyword_init: true
)

# Request payload for Application#remove.
#
# @!attribute [rw] id
#   @return [String]
ApplicationRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# ApplicationSecret entity data model.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
ApplicationSecret = Struct.new(
  :application_id,
  :created_at,
  :deleted_at,
  :id,
  :name,
  :token,
  keyword_init: true
)

# Request payload for ApplicationSecret#list.
#
# @!attribute [rw] application_id
#   @return [String]
ApplicationSecretListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for ApplicationSecret#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
ApplicationSecretCreateData = Struct.new(
  :application_id,
  :name,
  keyword_init: true
)

# Request payload for ApplicationSecret#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
ApplicationSecretUpdateData = Struct.new(
  :id,
  :application_id,
  :name,
  keyword_init: true
)

# Request payload for ApplicationSecret#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
ApplicationSecretRemoveMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# EmailPreference entity data model.
class EmailPreference
end

# Request payload for EmailPreference#create.
#
# @!attribute [rw] token
#   @return [Object, nil]
EmailPreferenceCreateData = Struct.new(
  :token,
  keyword_init: true
)

# Error entity data model.
#
# @!attribute [rw] detail
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] validation
#   @return [Hash, nil]
Error = Struct.new(
  :detail,
  :id,
  :status,
  :title,
  :type,
  :validation,
  keyword_init: true
)

# Request payload for Error#list.
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] validation
#   @return [Hash, nil]
ErrorListMatch = Struct.new(
  :detail,
  :id,
  :status,
  :title,
  :type,
  :validation,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] event_id
#   @return [String]
#
# @!attribute [rw] event_type_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] occurred_at
#   @return [String]
#
# @!attribute [rw] payload
#   @return [String]
#
# @!attribute [rw] payload_content_type
#   @return [String]
#
# @!attribute [rw] received_at
#   @return [String]
Event = Struct.new(
  :event_id,
  :event_type_name,
  :id,
  :ip,
  :labels,
  :metadata,
  :occurred_at,
  :payload,
  :payload_content_type,
  :received_at,
  keyword_init: true
)

# Request payload for Event#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
EventLoadMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] application_id
#   @return [String]
EventListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for Event#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [Object, nil]
EventCreateData = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# EventType entity data model.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] event_type_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] resource_type
#   @return [String]
#
# @!attribute [rw] resource_type_name
#   @return [String]
#
# @!attribute [rw] service
#   @return [String]
#
# @!attribute [rw] service_name
#   @return [String]
#
# @!attribute [rw] verb
#   @return [String]
#
# @!attribute [rw] verb_name
#   @return [String]
EventType = Struct.new(
  :application_id,
  :event_type_name,
  :id,
  :resource_type,
  :resource_type_name,
  :service,
  :service_name,
  :verb,
  :verb_name,
  keyword_init: true
)

# Request payload for EventType#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
EventTypeLoadMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# Request payload for EventType#list.
#
# @!attribute [rw] application_id
#   @return [String]
EventTypeListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for EventType#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String]
#
# @!attribute [rw] service
#   @return [String]
#
# @!attribute [rw] verb
#   @return [String]
EventTypeCreateData = Struct.new(
  :application_id,
  :resource_type,
  :service,
  :verb,
  keyword_init: true
)

# Request payload for EventType#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
EventTypeRemoveMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# EventsManagement entity data model.
class EventsManagement
end

# Request payload for EventsManagement#list.
class EventsManagementListMatch
end

# Health entity data model.
#
# @!attribute [rw] database
#   @return [Boolean]
#
# @!attribute [rw] database_duration_ms
#   @return [Integer]
#
# @!attribute [rw] object_storage
#   @return [Boolean, nil]
#
# @!attribute [rw] object_storage_duration_ms
#   @return [Integer, nil]
#
# @!attribute [rw] pulsar
#   @return [Boolean, nil]
#
# @!attribute [rw] pulsar_duration_ms
#   @return [Integer, nil]
#
# @!attribute [rw] total_duration_ms
#   @return [Integer]
Health = Struct.new(
  :database,
  :database_duration_ms,
  :object_storage,
  :object_storage_duration_ms,
  :pulsar,
  :pulsar_duration_ms,
  :total_duration_ms,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] key
#   @return [String, nil]
HealthLoadMatch = Struct.new(
  :key,
  keyword_init: true
)

# Hook0 entity data model.
#
# @!attribute [rw] default
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] env_var
#   @return [String]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] required
#   @return [Boolean]
#
# @!attribute [rw] sensitive
#   @return [Boolean]
Hook0 = Struct.new(
  :default,
  :description,
  :env_var,
  :group,
  :name,
  :required,
  :sensitive,
  keyword_init: true
)

# Request payload for Hook0#list.
#
# @!attribute [rw] default
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] env_var
#   @return [String, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] required
#   @return [Boolean, nil]
#
# @!attribute [rw] sensitive
#   @return [Boolean, nil]
Hook0ListMatch = Struct.new(
  :default,
  :description,
  :env_var,
  :group,
  :name,
  :required,
  :sensitive,
  keyword_init: true
)

# IngestedEvent entity data model.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] event_id
#   @return [String, nil]
#
# @!attribute [rw] event_type
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] occurred_at
#   @return [String]
#
# @!attribute [rw] payload
#   @return [String]
#
# @!attribute [rw] payload_content_type
#   @return [String]
IngestedEvent = Struct.new(
  :application_id,
  :event_id,
  :event_type,
  :labels,
  :metadata,
  :occurred_at,
  :payload,
  :payload_content_type,
  keyword_init: true
)

# Request payload for IngestedEvent#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] event_id
#   @return [String, nil]
#
# @!attribute [rw] event_type
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] occurred_at
#   @return [String]
#
# @!attribute [rw] payload
#   @return [String]
#
# @!attribute [rw] payload_content_type
#   @return [String]
IngestedEventCreateData = Struct.new(
  :application_id,
  :event_id,
  :event_type,
  :labels,
  :metadata,
  :occurred_at,
  :payload,
  :payload_content_type,
  keyword_init: true
)

# Instance entity data model.
#
# @!attribute [rw] application_secret_compatibility
#   @return [Boolean]
#
# @!attribute [rw] auto_db_migration
#   @return [Boolean]
#
# @!attribute [rw] biscuit_public_key
#   @return [String]
#
# @!attribute [rw] cloudflare_turnstile_site_key
#   @return [String, nil]
#
# @!attribute [rw] formbricks
#   @return [Hash]
#
# @!attribute [rw] matomo
#   @return [Hash]
#
# @!attribute [rw] password_minimum_length
#   @return [Integer]
#
# @!attribute [rw] quota_enforcement
#   @return [Boolean]
#
# @!attribute [rw] registration_disabled
#   @return [Boolean]
#
# @!attribute [rw] support_email_address
#   @return [String]
Instance = Struct.new(
  :application_secret_compatibility,
  :auto_db_migration,
  :biscuit_public_key,
  :cloudflare_turnstile_site_key,
  :formbricks,
  :matomo,
  :password_minimum_length,
  :quota_enforcement,
  :registration_disabled,
  :support_email_address,
  keyword_init: true
)

# Request payload for Instance#load.
#
# @!attribute [rw] application_secret_compatibility
#   @return [Boolean, nil]
#
# @!attribute [rw] auto_db_migration
#   @return [Boolean, nil]
#
# @!attribute [rw] biscuit_public_key
#   @return [String, nil]
#
# @!attribute [rw] cloudflare_turnstile_site_key
#   @return [String, nil]
#
# @!attribute [rw] formbricks
#   @return [Hash, nil]
#
# @!attribute [rw] matomo
#   @return [Hash, nil]
#
# @!attribute [rw] password_minimum_length
#   @return [Integer, nil]
#
# @!attribute [rw] quota_enforcement
#   @return [Boolean, nil]
#
# @!attribute [rw] registration_disabled
#   @return [Boolean, nil]
#
# @!attribute [rw] support_email_address
#   @return [String, nil]
InstanceLoadMatch = Struct.new(
  :application_secret_compatibility,
  :auto_db_migration,
  :biscuit_public_key,
  :cloudflare_turnstile_site_key,
  :formbricks,
  :matomo,
  :password_minimum_length,
  :quota_enforcement,
  :registration_disabled,
  :support_email_address,
  keyword_init: true
)

# Login entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
Login = Struct.new(
  :email,
  :password,
  :token,
  keyword_init: true
)

# Request payload for Login#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
LoginCreateData = Struct.new(
  :email,
  :password,
  :token,
  keyword_init: true
)

# Organization entity data model.
#
# @!attribute [rw] amount
#   @return [Integer]
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] application_name
#   @return [String]
#
# @!attribute [rw] consumption
#   @return [Hash]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_provisional
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] onboarding_steps
#   @return [Hash]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] plan
#   @return [Hash]
#
# @!attribute [rw] quotas
#   @return [Hash]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] users
#   @return [Array]
Organization = Struct.new(
  :amount,
  :application_id,
  :application_name,
  :consumption,
  :date,
  :id,
  :is_provisional,
  :name,
  :onboarding_steps,
  :organization_id,
  :plan,
  :quotas,
  :role,
  :users,
  keyword_init: true
)

# Request payload for Organization#load.
#
# @!attribute [rw] id
#   @return [String]
OrganizationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Organization#list.
#
# @!attribute [rw] amount
#   @return [Integer, nil]
#
# @!attribute [rw] application_id
#   @return [String, nil]
#
# @!attribute [rw] application_name
#   @return [String, nil]
#
# @!attribute [rw] consumption
#   @return [Hash, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_provisional
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] onboarding_steps
#   @return [Hash, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
#
# @!attribute [rw] plan
#   @return [Hash, nil]
#
# @!attribute [rw] quotas
#   @return [Hash, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] users
#   @return [Array, nil]
OrganizationListMatch = Struct.new(
  :amount,
  :application_id,
  :application_name,
  :consumption,
  :date,
  :id,
  :is_provisional,
  :name,
  :onboarding_steps,
  :organization_id,
  :plan,
  :quotas,
  :role,
  :users,
  keyword_init: true
)

# Request payload for Organization#create.
#
# @!attribute [rw] name
#   @return [String]
OrganizationCreateData = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for Organization#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
OrganizationUpdateData = Struct.new(
  :id,
  :name,
  keyword_init: true
)

# Request payload for Organization#remove.
#
# @!attribute [rw] id
#   @return [String]
OrganizationRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# OrganizationEditRole entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
OrganizationEditRole = Struct.new(
  :id,
  :role,
  :user_id,
  keyword_init: true
)

# Request payload for OrganizationEditRole#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String, nil]
OrganizationEditRoleUpdateData = Struct.new(
  :id,
  :role,
  :user_id,
  keyword_init: true
)

# Quota entity data model.
#
# @!attribute [rw] enabled
#   @return [Boolean]
#
# @!attribute [rw] limits
#   @return [Hash]
Quota = Struct.new(
  :enabled,
  :limits,
  keyword_init: true
)

# Request payload for Quota#load.
#
# @!attribute [rw] enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] limits
#   @return [Hash, nil]
QuotaLoadMatch = Struct.new(
  :enabled,
  :limits,
  keyword_init: true
)

# Registration entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] first_name
#   @return [String]
#
# @!attribute [rw] gclid
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] signup_channel
#   @return [String, nil]
#
# @!attribute [rw] turnstile_token
#   @return [String, nil]
Registration = Struct.new(
  :email,
  :first_name,
  :gclid,
  :last_name,
  :password,
  :signup_channel,
  :turnstile_token,
  keyword_init: true
)

# Request payload for Registration#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] first_name
#   @return [String]
#
# @!attribute [rw] gclid
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] signup_channel
#   @return [String, nil]
#
# @!attribute [rw] turnstile_token
#   @return [String, nil]
RegistrationCreateData = Struct.new(
  :email,
  :first_name,
  :gclid,
  :last_name,
  :password,
  :signup_channel,
  :turnstile_token,
  keyword_init: true
)

# RequestAttempt entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] delay_until
#   @return [String, nil]
#
# @!attribute [rw] event
#   @return [Hash]
#
# @!attribute [rw] event_id
#   @return [String]
#
# @!attribute [rw] failed_at
#   @return [String, nil]
#
# @!attribute [rw] http_response_status
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] picked_at
#   @return [String, nil]
#
# @!attribute [rw] request_attempt_id
#   @return [String]
#
# @!attribute [rw] response_id
#   @return [String, nil]
#
# @!attribute [rw] retry_count
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [Hash]
#
# @!attribute [rw] subscription
#   @return [Hash]
#
# @!attribute [rw] succeeded_at
#   @return [String, nil]
RequestAttempt = Struct.new(
  :created_at,
  :delay_until,
  :event,
  :event_id,
  :failed_at,
  :http_response_status,
  :id,
  :picked_at,
  :request_attempt_id,
  :response_id,
  :retry_count,
  :status,
  :subscription,
  :succeeded_at,
  keyword_init: true
)

# Request payload for RequestAttempt#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
RequestAttemptLoadMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# Request payload for RequestAttempt#list.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] event_event_type_name
#   @return [String, nil]
#
# @!attribute [rw] event_id
#   @return [String, nil]
#
# @!attribute [rw] max_created_at
#   @return [String, nil]
#
# @!attribute [rw] min_created_at
#   @return [String, nil]
#
# @!attribute [rw] pagination_cursor
#   @return [String, nil]
#
# @!attribute [rw] subscription_id
#   @return [String, nil]
RequestAttemptListMatch = Struct.new(
  :application_id,
  :event_event_type_name,
  :event_id,
  :max_created_at,
  :min_created_at,
  :pagination_cursor,
  :subscription_id,
  keyword_init: true
)

# Response entity data model.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] elapsed_time_ms
#   @return [Integer, nil]
#
# @!attribute [rw] headers
#   @return [Hash, nil]
#
# @!attribute [rw] http_code
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] response_error_name
#   @return [String, nil]
#
# @!attribute [rw] response_id
#   @return [String]
Response = Struct.new(
  :body,
  :elapsed_time_ms,
  :headers,
  :http_code,
  :id,
  :response_error_name,
  :response_id,
  keyword_init: true
)

# Request payload for Response#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
ResponseLoadMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# Revoke entity data model.
class Revoke
end

# Request payload for Revoke#remove.
#
# @!attribute [rw] organization_id
#   @return [String]
RevokeRemoveMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# ServiceToken entity data model.
#
# @!attribute [rw] biscuit
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] token_id
#   @return [String]
ServiceToken = Struct.new(
  :biscuit,
  :created_at,
  :id,
  :name,
  :organization_id,
  :token_id,
  keyword_init: true
)

# Request payload for ServiceToken#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ServiceTokenLoadMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Request payload for ServiceToken#list.
#
# @!attribute [rw] organization_id
#   @return [String]
ServiceTokenListMatch = Struct.new(
  :organization_id,
  keyword_init: true
)

# Request payload for ServiceToken#create.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ServiceTokenCreateData = Struct.new(
  :name,
  :organization_id,
  keyword_init: true
)

# Request payload for ServiceToken#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] organization_id
#   @return [String, nil]
ServiceTokenUpdateData = Struct.new(
  :id,
  :name,
  :organization_id,
  keyword_init: true
)

# Request payload for ServiceToken#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] organization_id
#   @return [String]
ServiceTokenRemoveMatch = Struct.new(
  :id,
  :organization_id,
  keyword_init: true
)

# Subscription entity data model.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dedicated_workers
#   @return [Array]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] event_types
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_enabled
#   @return [Boolean]
#
# @!attribute [rw] label_key
#   @return [String]
#
# @!attribute [rw] label_value
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] secret
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] target
#   @return [Hash]
#
# @!attribute [rw] updated_at
#   @return [String]
Subscription = Struct.new(
  :application_id,
  :created_at,
  :dedicated_workers,
  :description,
  :event_types,
  :id,
  :is_enabled,
  :label_key,
  :label_value,
  :labels,
  :metadata,
  :secret,
  :subscription_id,
  :target,
  :updated_at,
  keyword_init: true
)

# Request payload for Subscription#load.
#
# @!attribute [rw] id
#   @return [String]
SubscriptionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Subscription#list.
#
# @!attribute [rw] application_id
#   @return [String]
SubscriptionListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for Subscription#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] dedicated_workers
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] event_types
#   @return [Array]
#
# @!attribute [rw] is_enabled
#   @return [Boolean]
#
# @!attribute [rw] label_key
#   @return [String, nil]
#
# @!attribute [rw] label_value
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] target
#   @return [Hash]
SubscriptionCreateData = Struct.new(
  :application_id,
  :dedicated_workers,
  :description,
  :event_types,
  :is_enabled,
  :label_key,
  :label_value,
  :labels,
  :metadata,
  :target,
  keyword_init: true
)

# Request payload for Subscription#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String, nil]
#
# @!attribute [rw] dedicated_workers
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] event_types
#   @return [Array, nil]
#
# @!attribute [rw] is_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] label_key
#   @return [String, nil]
#
# @!attribute [rw] label_value
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] target
#   @return [Hash, nil]
SubscriptionUpdateData = Struct.new(
  :id,
  :application_id,
  :dedicated_workers,
  :description,
  :event_types,
  :is_enabled,
  :label_key,
  :label_value,
  :labels,
  :metadata,
  :target,
  keyword_init: true
)

# Request payload for Subscription#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] application_id
#   @return [String]
SubscriptionRemoveMatch = Struct.new(
  :id,
  :application_id,
  keyword_init: true
)

# UserAuthentication entity data model.
#
# @!attribute [rw] current_password
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] new_password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
UserAuthentication = Struct.new(
  :current_password,
  :email,
  :new_password,
  :token,
  keyword_init: true
)

# Request payload for UserAuthentication#create.
#
# @!attribute [rw] current_password
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] new_password
#   @return [String]
#
# @!attribute [rw] token
#   @return [String]
UserAuthenticationCreateData = Struct.new(
  :current_password,
  :email,
  :new_password,
  :token,
  keyword_init: true
)

# UserInvitation entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
UserInvitation = Struct.new(
  :email,
  :role,
  keyword_init: true
)

# Request payload for UserInvitation#create.
#
# @!attribute [rw] organization_id
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
UserInvitationCreateData = Struct.new(
  :organization_id,
  :email,
  :role,
  keyword_init: true
)

