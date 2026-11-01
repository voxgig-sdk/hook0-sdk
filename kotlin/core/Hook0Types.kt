package voxgig.hook0sdk.core

// Typed reference models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels (source of truth: @voxgig/apidef VALID_CANON). Do
// not edit by hand.
//
// These types are documentation/DX reference shapes ONLY. The SDK ops take and
// return the loose object model (MutableMap<String, Any?> / Any?) at runtime,
// so these types are not wired into the op signatures — use them to describe a
// payload before converting it to a map. Every component is a nullable type, so
// an optional (req:false) key needs no distinct rendering.

@Suppress("unused")
object Hook0Types {

  data class Application(val amount: Long?, val application_id: String?, val application_name: String?, val consumption: Map<String, Any?>?, val date: String?, val id: String?, val is_provisional: Boolean?, val name: String?, val onboarding_steps: Map<String, Any?>?, val organization_id: String?, val quotas: Map<String, Any?>?)

  data class ApplicationLoadMatch(val id: String?)

  data class ApplicationListMatch(val organization_id: String?)

  data class ApplicationCreateData(val name: String?, val organization_id: String?)

  data class ApplicationUpdateData(val id: String?, val name: String?, val organization_id: String?)

  data class ApplicationRemoveMatch(val id: String?)

  data class ApplicationSecret(val application_id: String?, val created_at: String?, val deleted_at: String?, val id: String?, val name: String?, val token: String?)

  data class ApplicationSecretListMatch(val application_id: String?)

  data class ApplicationSecretCreateData(val application_id: String?, val name: String?)

  data class ApplicationSecretUpdateData(val id: String?, val application_id: String?, val name: String?)

  data class ApplicationSecretRemoveMatch(val id: String?, val application_id: String?)

  class EmailPreference

  data class EmailPreferenceCreateData(val token: Any?)

  data class Error(val detail: String?, val id: String?, val status: Long?, val title: String?, val type: String?, val validation: Map<String, Any?>?)

  data class ErrorListMatch(val detail: String?, val id: String?, val status: Long?, val title: String?, val type: String?, val validation: Map<String, Any?>?)

  data class Event(val event_id: String?, val event_type_name: String?, val id: String?, val ip: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val occurred_at: String?, val payload: String?, val payload_content_type: String?, val received_at: String?)

  data class EventLoadMatch(val id: String?, val application_id: String?)

  data class EventListMatch(val application_id: String?)

  data class EventCreateData(val id: String?, val application_id: Any?)

  data class EventType(val application_id: String?, val event_type_name: String?, val id: String?, val resource_type: String?, val resource_type_name: String?, val service: String?, val service_name: String?, val verb: String?, val verb_name: String?)

  data class EventTypeLoadMatch(val id: String?, val application_id: String?)

  data class EventTypeListMatch(val application_id: String?)

  data class EventTypeCreateData(val application_id: String?, val resource_type: String?, val service: String?, val verb: String?)

  data class EventTypeRemoveMatch(val id: String?, val application_id: String?)

  class EventsManagement

  class EventsManagementListMatch

  data class Health(val database: Boolean?, val database_duration_ms: Long?, val object_storage: Boolean?, val object_storage_duration_ms: Long?, val pulsar: Boolean?, val pulsar_duration_ms: Long?, val total_duration_ms: Long?)

  data class HealthLoadMatch(val key: String?)

  data class Hook0(val default: String?, val description: String?, val env_var: String?, val group: String?, val name: String?, val required: Boolean?, val sensitive: Boolean?)

  data class Hook0ListMatch(val default: String?, val description: String?, val env_var: String?, val group: String?, val name: String?, val required: Boolean?, val sensitive: Boolean?)

  data class IngestedEvent(val application_id: String?, val event_id: String?, val event_type: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val occurred_at: String?, val payload: String?, val payload_content_type: String?)

  data class IngestedEventCreateData(val application_id: String?, val event_id: String?, val event_type: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val occurred_at: String?, val payload: String?, val payload_content_type: String?)

  data class Instance(val application_secret_compatibility: Boolean?, val auto_db_migration: Boolean?, val biscuit_public_key: String?, val cloudflare_turnstile_site_key: String?, val formbricks: Map<String, Any?>?, val matomo: Map<String, Any?>?, val password_minimum_length: Long?, val quota_enforcement: Boolean?, val registration_disabled: Boolean?, val support_email_address: String?)

  data class InstanceLoadMatch(val application_secret_compatibility: Boolean?, val auto_db_migration: Boolean?, val biscuit_public_key: String?, val cloudflare_turnstile_site_key: String?, val formbricks: Map<String, Any?>?, val matomo: Map<String, Any?>?, val password_minimum_length: Long?, val quota_enforcement: Boolean?, val registration_disabled: Boolean?, val support_email_address: String?)

  data class Login(val email: String?, val password: String?, val token: String?)

  data class LoginCreateData(val email: String?, val password: String?, val token: String?)

  data class Organization(val amount: Long?, val application_id: String?, val application_name: String?, val consumption: Map<String, Any?>?, val date: String?, val id: String?, val is_provisional: Boolean?, val name: String?, val onboarding_steps: Map<String, Any?>?, val organization_id: String?, val plan: Map<String, Any?>?, val quotas: Map<String, Any?>?, val role: String?, val users: List<Any?>?)

  data class OrganizationLoadMatch(val id: String?)

  data class OrganizationListMatch(val amount: Long?, val application_id: String?, val application_name: String?, val consumption: Map<String, Any?>?, val date: String?, val id: String?, val is_provisional: Boolean?, val name: String?, val onboarding_steps: Map<String, Any?>?, val organization_id: String?, val plan: Map<String, Any?>?, val quotas: Map<String, Any?>?, val role: String?, val users: List<Any?>?)

  data class OrganizationCreateData(val name: String?)

  data class OrganizationUpdateData(val id: String?, val name: String?)

  data class OrganizationRemoveMatch(val id: String?)

  data class OrganizationEditRole(val id: String?, val role: String?, val user_id: String?)

  data class OrganizationEditRoleUpdateData(val id: String?, val role: String?, val user_id: String?)

  data class Quota(val enabled: Boolean?, val limits: Map<String, Any?>?)

  data class QuotaLoadMatch(val enabled: Boolean?, val limits: Map<String, Any?>?)

  data class Registration(val email: String?, val first_name: String?, val gclid: String?, val last_name: String?, val password: String?, val signup_channel: String?, val turnstile_token: String?)

  data class RegistrationCreateData(val email: String?, val first_name: String?, val gclid: String?, val last_name: String?, val password: String?, val signup_channel: String?, val turnstile_token: String?)

  data class RequestAttempt(val created_at: String?, val delay_until: String?, val event: Map<String, Any?>?, val event_id: String?, val failed_at: String?, val http_response_status: Long?, val id: String?, val picked_at: String?, val request_attempt_id: String?, val response_id: String?, val retry_count: Long?, val status: Map<String, Any?>?, val subscription: Map<String, Any?>?, val succeeded_at: String?)

  data class RequestAttemptLoadMatch(val id: String?, val application_id: String?)

  data class RequestAttemptListMatch(val application_id: String?, val event_event_type_name: String?, val event_id: String?, val max_created_at: String?, val min_created_at: String?, val pagination_cursor: String?, val subscription_id: String?)

  data class Response(val body: String?, val elapsed_time_ms: Long?, val headers: Map<String, Any?>?, val http_code: Long?, val id: String?, val response_error_name: String?, val response_id: String?)

  data class ResponseLoadMatch(val id: String?, val application_id: String?)

  class Revoke

  data class RevokeRemoveMatch(val organization_id: String?)

  data class ServiceToken(val biscuit: String?, val created_at: String?, val id: String?, val name: String?, val organization_id: String?, val token_id: String?)

  data class ServiceTokenLoadMatch(val id: String?, val organization_id: String?)

  data class ServiceTokenListMatch(val organization_id: String?)

  data class ServiceTokenCreateData(val name: String?, val organization_id: String?)

  data class ServiceTokenUpdateData(val id: String?, val name: String?, val organization_id: String?)

  data class ServiceTokenRemoveMatch(val id: String?, val organization_id: String?)

  data class Subscription(val application_id: String?, val created_at: String?, val dedicated_workers: List<Any?>?, val description: String?, val event_types: List<Any?>?, val id: String?, val is_enabled: Boolean?, val label_key: String?, val label_value: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val secret: String?, val subscription_id: String?, val target: Map<String, Any?>?, val updated_at: String?)

  data class SubscriptionLoadMatch(val id: String?)

  data class SubscriptionListMatch(val application_id: String?)

  data class SubscriptionCreateData(val application_id: String?, val dedicated_workers: List<Any?>?, val description: String?, val event_types: List<Any?>?, val is_enabled: Boolean?, val label_key: String?, val label_value: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val target: Map<String, Any?>?)

  data class SubscriptionUpdateData(val id: String?, val application_id: String?, val dedicated_workers: List<Any?>?, val description: String?, val event_types: List<Any?>?, val is_enabled: Boolean?, val label_key: String?, val label_value: String?, val labels: Map<String, Any?>?, val metadata: Map<String, Any?>?, val target: Map<String, Any?>?)

  data class SubscriptionRemoveMatch(val id: String?, val application_id: String?)

  data class UserAuthentication(val current_password: String?, val email: String?, val new_password: String?, val token: String?)

  data class UserAuthenticationCreateData(val current_password: String?, val email: String?, val new_password: String?, val token: String?)

  data class UserInvitation(val email: String?, val role: String?)

  data class UserInvitationCreateData(val organization_id: String?, val email: String?, val role: String?)

}
