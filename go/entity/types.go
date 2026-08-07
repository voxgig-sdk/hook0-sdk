// Typed models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Application is the typed data model for the application entity.
type Application struct {
	ApplicationId string `json:"application_id"`
	Consumption map[string]any `json:"consumption"`
	Name string `json:"name"`
	OnboardingSteps map[string]any `json:"onboarding_steps"`
	OrganizationId string `json:"organization_id"`
	Quota map[string]any `json:"quota"`
}

// ApplicationLoadMatch is the typed request payload for Application.LoadTyped.
type ApplicationLoadMatch struct {
	Id string `json:"id"`
}

// ApplicationListMatch is the typed request payload for Application.ListTyped.
type ApplicationListMatch struct {
	ApplicationId *string `json:"application_id,omitempty"`
	Consumption *map[string]any `json:"consumption,omitempty"`
	Name *string `json:"name,omitempty"`
	OnboardingSteps *map[string]any `json:"onboarding_steps,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	Quota *map[string]any `json:"quota,omitempty"`
}

// ApplicationCreateData is the typed request payload for Application.CreateTyped.
type ApplicationCreateData struct {
	ApplicationId string `json:"application_id"`
	Consumption map[string]any `json:"consumption"`
	Name string `json:"name"`
	OnboardingSteps map[string]any `json:"onboarding_steps"`
	OrganizationId string `json:"organization_id"`
	Quota map[string]any `json:"quota"`
}

// ApplicationUpdateData is the typed request payload for Application.UpdateTyped.
type ApplicationUpdateData struct {
	Id string `json:"id"`
}

// ApplicationRemoveMatch is the typed request payload for Application.RemoveTyped.
type ApplicationRemoveMatch struct {
	Id string `json:"id"`
}

// ApplicationSecret is the typed data model for the application_secret entity.
type ApplicationSecret struct {
	ApplicationId string `json:"application_id"`
	CreatedAt string `json:"created_at"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Name *string `json:"name,omitempty"`
	Token string `json:"token"`
}

// ApplicationSecretListMatch is the typed request payload for ApplicationSecret.ListTyped.
type ApplicationSecretListMatch struct {
	ApplicationId *string `json:"application_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Name *string `json:"name,omitempty"`
	Token *string `json:"token,omitempty"`
}

// ApplicationSecretCreateData is the typed request payload for ApplicationSecret.CreateTyped.
type ApplicationSecretCreateData struct {
	ApplicationId string `json:"application_id"`
	CreatedAt string `json:"created_at"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Name *string `json:"name,omitempty"`
	Token string `json:"token"`
}

// ApplicationSecretUpdateData is the typed request payload for ApplicationSecret.UpdateTyped.
type ApplicationSecretUpdateData struct {
	Id string `json:"id"`
}

// ApplicationsManagement is the typed data model for the applications_management entity.
type ApplicationsManagement struct {
}

// ApplicationsManagementRemoveMatch is the typed request payload for ApplicationsManagement.RemoveTyped.
type ApplicationsManagementRemoveMatch struct {
	ApplicationSecretToken string `json:"application_secret_token"`
}

// Event is the typed data model for the event entity.
type Event struct {
	EventId string `json:"event_id"`
	EventTypeName string `json:"event_type_name"`
	Ip string `json:"ip"`
	Labels map[string]any `json:"labels"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OccurredAt string `json:"occurred_at"`
	Payload string `json:"payload"`
	PayloadContentType string `json:"payload_content_type"`
	ReceivedAt string `json:"received_at"`
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id string `json:"id"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	EventId *string `json:"event_id,omitempty"`
	EventTypeName *string `json:"event_type_name,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OccurredAt *string `json:"occurred_at,omitempty"`
	Payload *string `json:"payload,omitempty"`
	PayloadContentType *string `json:"payload_content_type,omitempty"`
	ReceivedAt *string `json:"received_at,omitempty"`
}

// EventType is the typed data model for the event_type entity.
type EventType struct {
	ApplicationId string `json:"application_id"`
	EventTypeName string `json:"event_type_name"`
	ResourceType string `json:"resource_type"`
	ResourceTypeName string `json:"resource_type_name"`
	Service string `json:"service"`
	ServiceName string `json:"service_name"`
	Verb string `json:"verb"`
	VerbName string `json:"verb_name"`
}

// EventTypeLoadMatch is the typed request payload for EventType.LoadTyped.
type EventTypeLoadMatch struct {
	Id string `json:"id"`
}

// EventTypeListMatch is the typed request payload for EventType.ListTyped.
type EventTypeListMatch struct {
	ApplicationId *string `json:"application_id,omitempty"`
	EventTypeName *string `json:"event_type_name,omitempty"`
	ResourceType *string `json:"resource_type,omitempty"`
	ResourceTypeName *string `json:"resource_type_name,omitempty"`
	Service *string `json:"service,omitempty"`
	ServiceName *string `json:"service_name,omitempty"`
	Verb *string `json:"verb,omitempty"`
	VerbName *string `json:"verb_name,omitempty"`
}

// EventTypeCreateData is the typed request payload for EventType.CreateTyped.
type EventTypeCreateData struct {
	ApplicationId string `json:"application_id"`
	EventTypeName string `json:"event_type_name"`
	ResourceType string `json:"resource_type"`
	ResourceTypeName string `json:"resource_type_name"`
	Service string `json:"service"`
	ServiceName string `json:"service_name"`
	Verb string `json:"verb"`
	VerbName string `json:"verb_name"`
}

// EventsManagement is the typed data model for the events_management entity.
type EventsManagement struct {
	ApplicationId string `json:"application_id"`
}

// EventsManagementListMatch is the typed request payload for EventsManagement.ListTyped.
type EventsManagementListMatch struct {
	ApplicationId *string `json:"application_id,omitempty"`
}

// EventsManagementCreateData is the typed request payload for EventsManagement.CreateTyped.
type EventsManagementCreateData struct {
	EventId string `json:"event_id"`
}

// EventsManagementRemoveMatch is the typed request payload for EventsManagement.RemoveTyped.
type EventsManagementRemoveMatch struct {
	EventTypeName string `json:"event_type_name"`
}

// EventsPerDayEntry is the typed data model for the events_per_day_entry entity.
type EventsPerDayEntry struct {
	Amount int `json:"amount"`
	ApplicationId string `json:"application_id"`
	ApplicationName string `json:"application_name"`
	Date string `json:"date"`
	IsProvisional bool `json:"is_provisional"`
}

// EventsPerDayEntryListMatch is the typed request payload for EventsPerDayEntry.ListTyped.
type EventsPerDayEntryListMatch struct {
	Amount *int `json:"amount,omitempty"`
	ApplicationId *string `json:"application_id,omitempty"`
	ApplicationName *string `json:"application_name,omitempty"`
	Date *string `json:"date,omitempty"`
	IsProvisional *bool `json:"is_provisional,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
	Database bool `json:"database"`
	DatabaseDurationMs int `json:"database_duration_ms"`
	ObjectStorage *bool `json:"object_storage,omitempty"`
	ObjectStorageDurationMs *int `json:"object_storage_duration_ms,omitempty"`
	Pulsar *bool `json:"pulsar,omitempty"`
	PulsarDurationMs *int `json:"pulsar_duration_ms,omitempty"`
	TotalDurationMs int `json:"total_duration_ms"`
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Database *bool `json:"database,omitempty"`
	DatabaseDurationMs *int `json:"database_duration_ms,omitempty"`
	ObjectStorage *bool `json:"object_storage,omitempty"`
	ObjectStorageDurationMs *int `json:"object_storage_duration_ms,omitempty"`
	Pulsar *bool `json:"pulsar,omitempty"`
	PulsarDurationMs *int `json:"pulsar_duration_ms,omitempty"`
	TotalDurationMs *int `json:"total_duration_ms,omitempty"`
}

// Hook0 is the typed data model for the hook0 entity.
type Hook0 struct {
	Default *string `json:"default,omitempty"`
	Description *string `json:"description,omitempty"`
	EnvVar string `json:"env_var"`
	Group *string `json:"group,omitempty"`
	Name string `json:"name"`
	Required bool `json:"required"`
	Sensitive bool `json:"sensitive"`
}

// Hook0ListMatch is the typed request payload for Hook0.ListTyped.
type Hook0ListMatch struct {
	Default *string `json:"default,omitempty"`
	Description *string `json:"description,omitempty"`
	EnvVar *string `json:"env_var,omitempty"`
	Group *string `json:"group,omitempty"`
	Name *string `json:"name,omitempty"`
	Required *bool `json:"required,omitempty"`
	Sensitive *bool `json:"sensitive,omitempty"`
}

// IngestedEvent is the typed data model for the ingested_event entity.
type IngestedEvent struct {
	ApplicationId string `json:"application_id"`
	EventId *string `json:"event_id,omitempty"`
	EventType string `json:"event_type"`
	Labels map[string]any `json:"labels"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OccurredAt string `json:"occurred_at"`
	Payload string `json:"payload"`
	PayloadContentType string `json:"payload_content_type"`
}

// IngestedEventCreateData is the typed request payload for IngestedEvent.CreateTyped.
type IngestedEventCreateData struct {
	ApplicationId string `json:"application_id"`
	EventId *string `json:"event_id,omitempty"`
	EventType string `json:"event_type"`
	Labels map[string]any `json:"labels"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OccurredAt string `json:"occurred_at"`
	Payload string `json:"payload"`
	PayloadContentType string `json:"payload_content_type"`
}

// Instance is the typed data model for the instance entity.
type Instance struct {
	ApplicationSecretCompatibility bool `json:"application_secret_compatibility"`
	AutoDbMigration bool `json:"auto_db_migration"`
	BiscuitPublicKey string `json:"biscuit_public_key"`
	CloudflareTurnstileSiteKey *string `json:"cloudflare_turnstile_site_key,omitempty"`
	Formbricks map[string]any `json:"formbricks"`
	Matomo map[string]any `json:"matomo"`
	PasswordMinimumLength int `json:"password_minimum_length"`
	QuotaEnforcement bool `json:"quota_enforcement"`
	RegistrationDisabled bool `json:"registration_disabled"`
	SupportEmailAddress string `json:"support_email_address"`
}

// InstanceLoadMatch is the typed request payload for Instance.LoadTyped.
type InstanceLoadMatch struct {
	ApplicationSecretCompatibility *bool `json:"application_secret_compatibility,omitempty"`
	AutoDbMigration *bool `json:"auto_db_migration,omitempty"`
	BiscuitPublicKey *string `json:"biscuit_public_key,omitempty"`
	CloudflareTurnstileSiteKey *string `json:"cloudflare_turnstile_site_key,omitempty"`
	Formbricks *map[string]any `json:"formbricks,omitempty"`
	Matomo *map[string]any `json:"matomo,omitempty"`
	PasswordMinimumLength *int `json:"password_minimum_length,omitempty"`
	QuotaEnforcement *bool `json:"quota_enforcement,omitempty"`
	RegistrationDisabled *bool `json:"registration_disabled,omitempty"`
	SupportEmailAddress *string `json:"support_email_address,omitempty"`
}

// Login is the typed data model for the login entity.
type Login struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

// LoginCreateData is the typed request payload for Login.CreateTyped.
type LoginCreateData struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
	Consumption map[string]any `json:"consumption"`
	Name string `json:"name"`
	OnboardingSteps map[string]any `json:"onboarding_steps"`
	OrganizationId string `json:"organization_id"`
	Plan map[string]any `json:"plan"`
	Quota map[string]any `json:"quota"`
	Role string `json:"role"`
	Users []any `json:"users"`
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Id string `json:"id"`
}

// OrganizationListMatch is the typed request payload for Organization.ListTyped.
type OrganizationListMatch struct {
	Consumption *map[string]any `json:"consumption,omitempty"`
	Name *string `json:"name,omitempty"`
	OnboardingSteps *map[string]any `json:"onboarding_steps,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	Plan *map[string]any `json:"plan,omitempty"`
	Quota *map[string]any `json:"quota,omitempty"`
	Role *string `json:"role,omitempty"`
	Users *[]any `json:"users,omitempty"`
}

// OrganizationCreateData is the typed request payload for Organization.CreateTyped.
type OrganizationCreateData struct {
	Consumption map[string]any `json:"consumption"`
	Name string `json:"name"`
	OnboardingSteps map[string]any `json:"onboarding_steps"`
	OrganizationId string `json:"organization_id"`
	Plan map[string]any `json:"plan"`
	Quota map[string]any `json:"quota"`
	Role string `json:"role"`
	Users []any `json:"users"`
}

// OrganizationUpdateData is the typed request payload for Organization.UpdateTyped.
type OrganizationUpdateData struct {
	Id string `json:"id"`
}

// OrganizationRemoveMatch is the typed request payload for Organization.RemoveTyped.
type OrganizationRemoveMatch struct {
	Id string `json:"id"`
}

// OrganizationEditRole is the typed data model for the organization_edit_role entity.
type OrganizationEditRole struct {
	Role string `json:"role"`
	UserId string `json:"user_id"`
}

// OrganizationEditRoleUpdateData is the typed request payload for OrganizationEditRole.UpdateTyped.
type OrganizationEditRoleUpdateData struct {
	Id string `json:"id"`
}

// Problem is the typed data model for the problem entity.
type Problem struct {
	Detail string `json:"detail"`
	Id string `json:"id"`
	Status int `json:"status"`
	Title string `json:"title"`
}

// ProblemListMatch is the typed request payload for Problem.ListTyped.
type ProblemListMatch struct {
	Detail *string `json:"detail,omitempty"`
	Id *string `json:"id,omitempty"`
	Status *int `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Quota is the typed data model for the quota entity.
type Quota struct {
	Enabled bool `json:"enabled"`
	Limits map[string]any `json:"limits"`
}

// QuotaLoadMatch is the typed request payload for Quota.LoadTyped.
type QuotaLoadMatch struct {
	Enabled *bool `json:"enabled,omitempty"`
	Limits *map[string]any `json:"limits,omitempty"`
}

// Registration is the typed data model for the registration entity.
type Registration struct {
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	Gclid *string `json:"gclid,omitempty"`
	LastName string `json:"last_name"`
	Password string `json:"password"`
	TurnstileToken *string `json:"turnstile_token,omitempty"`
}

// RegistrationCreateData is the typed request payload for Registration.CreateTyped.
type RegistrationCreateData struct {
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	Gclid *string `json:"gclid,omitempty"`
	LastName string `json:"last_name"`
	Password string `json:"password"`
	TurnstileToken *string `json:"turnstile_token,omitempty"`
}

// RequestAttempt is the typed data model for the request_attempt entity.
type RequestAttempt struct {
	CreatedAt string `json:"created_at"`
	DelayUntil *string `json:"delay_until,omitempty"`
	Event map[string]any `json:"event"`
	EventId string `json:"event_id"`
	FailedAt *string `json:"failed_at,omitempty"`
	HttpResponseStatus *int `json:"http_response_status,omitempty"`
	PickedAt *string `json:"picked_at,omitempty"`
	RequestAttemptId string `json:"request_attempt_id"`
	ResponseId *string `json:"response_id,omitempty"`
	RetryCount int `json:"retry_count"`
	Status map[string]any `json:"status"`
	Subscription map[string]any `json:"subscription"`
	SucceededAt *string `json:"succeeded_at,omitempty"`
}

// RequestAttemptLoadMatch is the typed request payload for RequestAttempt.LoadTyped.
type RequestAttemptLoadMatch struct {
	Id string `json:"id"`
}

// RequestAttemptListMatch is the typed request payload for RequestAttempt.ListTyped.
type RequestAttemptListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	DelayUntil *string `json:"delay_until,omitempty"`
	Event *map[string]any `json:"event,omitempty"`
	EventId *string `json:"event_id,omitempty"`
	FailedAt *string `json:"failed_at,omitempty"`
	HttpResponseStatus *int `json:"http_response_status,omitempty"`
	PickedAt *string `json:"picked_at,omitempty"`
	RequestAttemptId *string `json:"request_attempt_id,omitempty"`
	ResponseId *string `json:"response_id,omitempty"`
	RetryCount *int `json:"retry_count,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Subscription *map[string]any `json:"subscription,omitempty"`
	SucceededAt *string `json:"succeeded_at,omitempty"`
}

// Response is the typed data model for the response entity.
type Response struct {
	Body *string `json:"body,omitempty"`
	ElapsedTimeMs *int `json:"elapsed_time_ms,omitempty"`
	Headers *map[string]any `json:"headers,omitempty"`
	HttpCode *int `json:"http_code,omitempty"`
	ResponseErrorName *string `json:"response_error_name,omitempty"`
	ResponseId string `json:"response_id"`
}

// ResponseLoadMatch is the typed request payload for Response.LoadTyped.
type ResponseLoadMatch struct {
	Id string `json:"id"`
}

// Revoke is the typed data model for the revoke entity.
type Revoke struct {
}

// RevokeRemoveMatch is the typed request payload for Revoke.RemoveTyped.
type RevokeRemoveMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ServiceToken is the typed data model for the service_token entity.
type ServiceToken struct {
	Biscuit string `json:"biscuit"`
	CreatedAt string `json:"created_at"`
	Name string `json:"name"`
	OrganizationId string `json:"organization_id"`
	TokenId string `json:"token_id"`
}

// ServiceTokenLoadMatch is the typed request payload for ServiceToken.LoadTyped.
type ServiceTokenLoadMatch struct {
	Id string `json:"id"`
}

// ServiceTokenListMatch is the typed request payload for ServiceToken.ListTyped.
type ServiceTokenListMatch struct {
	Biscuit *string `json:"biscuit,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	TokenId *string `json:"token_id,omitempty"`
}

// ServiceTokenCreateData is the typed request payload for ServiceToken.CreateTyped.
type ServiceTokenCreateData struct {
	Biscuit string `json:"biscuit"`
	CreatedAt string `json:"created_at"`
	Name string `json:"name"`
	OrganizationId string `json:"organization_id"`
	TokenId string `json:"token_id"`
}

// ServiceTokenUpdateData is the typed request payload for ServiceToken.UpdateTyped.
type ServiceTokenUpdateData struct {
	Id string `json:"id"`
}

// ServiceTokenRemoveMatch is the typed request payload for ServiceToken.RemoveTyped.
type ServiceTokenRemoveMatch struct {
	Id string `json:"id"`
}

// Subscription is the typed data model for the subscription entity.
type Subscription struct {
	ApplicationId string `json:"application_id"`
	CreatedAt string `json:"created_at"`
	DedicatedWorkers []any `json:"dedicated_workers"`
	Description *string `json:"description,omitempty"`
	EventType []any `json:"event_type"`
	IsEnabled bool `json:"is_enabled"`
	LabelKey string `json:"label_key"`
	LabelValue string `json:"label_value"`
	Labels map[string]any `json:"labels"`
	Metadata map[string]any `json:"metadata"`
	Secret string `json:"secret"`
	SubscriptionId string `json:"subscription_id"`
	Target map[string]any `json:"target"`
	UpdatedAt string `json:"updated_at"`
}

// SubscriptionLoadMatch is the typed request payload for Subscription.LoadTyped.
type SubscriptionLoadMatch struct {
	Id string `json:"id"`
}

// SubscriptionListMatch is the typed request payload for Subscription.ListTyped.
type SubscriptionListMatch struct {
	ApplicationId *string `json:"application_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DedicatedWorkers *[]any `json:"dedicated_workers,omitempty"`
	Description *string `json:"description,omitempty"`
	EventType *[]any `json:"event_type,omitempty"`
	IsEnabled *bool `json:"is_enabled,omitempty"`
	LabelKey *string `json:"label_key,omitempty"`
	LabelValue *string `json:"label_value,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Secret *string `json:"secret,omitempty"`
	SubscriptionId *string `json:"subscription_id,omitempty"`
	Target *map[string]any `json:"target,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// SubscriptionCreateData is the typed request payload for Subscription.CreateTyped.
type SubscriptionCreateData struct {
	ApplicationId string `json:"application_id"`
	CreatedAt string `json:"created_at"`
	DedicatedWorkers []any `json:"dedicated_workers"`
	Description *string `json:"description,omitempty"`
	EventType []any `json:"event_type"`
	IsEnabled bool `json:"is_enabled"`
	LabelKey string `json:"label_key"`
	LabelValue string `json:"label_value"`
	Labels map[string]any `json:"labels"`
	Metadata map[string]any `json:"metadata"`
	Secret string `json:"secret"`
	SubscriptionId string `json:"subscription_id"`
	Target map[string]any `json:"target"`
	UpdatedAt string `json:"updated_at"`
}

// SubscriptionUpdateData is the typed request payload for Subscription.UpdateTyped.
type SubscriptionUpdateData struct {
	Id string `json:"id"`
}

// SubscriptionRemoveMatch is the typed request payload for Subscription.RemoveTyped.
type SubscriptionRemoveMatch struct {
	Id string `json:"id"`
}

// UserAuthentication is the typed data model for the user_authentication entity.
type UserAuthentication struct {
	Email string `json:"email"`
	NewPassword string `json:"new_password"`
	Token string `json:"token"`
}

// UserAuthenticationCreateData is the typed request payload for UserAuthentication.CreateTyped.
type UserAuthenticationCreateData struct {
	Email string `json:"email"`
	NewPassword string `json:"new_password"`
	Token string `json:"token"`
}

// UserInvitation is the typed data model for the user_invitation entity.
type UserInvitation struct {
	Email string `json:"email"`
	Role string `json:"role"`
}

// UserInvitationCreateData is the typed request payload for UserInvitation.CreateTyped.
type UserInvitationCreateData struct {
	OrganizationId string `json:"organization_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
