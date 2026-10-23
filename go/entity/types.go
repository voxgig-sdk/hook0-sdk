// Typed models for the Hook0 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/hook0-sdk/go/core"
)

// Application is the typed data model for the application entity.
type Application struct {
}

// ApplicationLoadMatch is the typed request payload for Application.LoadTyped.
type ApplicationLoadMatch struct {
	Id string `json:"id"`
}

// ApplicationListMatch is the typed request payload for Application.ListTyped.
type ApplicationListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ApplicationCreateData is the typed request payload for Application.CreateTyped.
type ApplicationCreateData struct {
	Name string `json:"name"`
	OrganizationId string `json:"organization_id"`
}

// ApplicationUpdateData is the typed request payload for Application.UpdateTyped.
type ApplicationUpdateData struct {
	Id string `json:"id"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
}

// ApplicationRemoveMatch is the typed request payload for Application.RemoveTyped.
type ApplicationRemoveMatch struct {
	Id string `json:"id"`
}

// ApplicationSecret is the typed data model for the application_secret entity.
type ApplicationSecret struct {
}

// ApplicationSecretListMatch is the typed request payload for ApplicationSecret.ListTyped.
type ApplicationSecretListMatch struct {
	ApplicationId string `json:"application_id"`
}

// ApplicationSecretCreateData is the typed request payload for ApplicationSecret.CreateTyped.
type ApplicationSecretCreateData struct {
	ApplicationId string `json:"application_id"`
	Name *string `json:"name,omitempty"`
}

// ApplicationSecretUpdateData is the typed request payload for ApplicationSecret.UpdateTyped.
type ApplicationSecretUpdateData struct {
	Id string `json:"id"`
	ApplicationId *string `json:"application_id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// ApplicationSecretRemoveMatch is the typed request payload for ApplicationSecret.RemoveTyped.
type ApplicationSecretRemoveMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// EmailPreference is the typed data model for the email_preference entity.
type EmailPreference struct {
}

// EmailPreferenceCreateData is the typed request payload for EmailPreference.CreateTyped.
type EmailPreferenceCreateData struct {
	Token *any `json:"token,omitempty"`
}

// Error is the typed data model for the error entity.
type Error struct {
}

// ErrorListMatch is the typed request payload for Error.ListTyped.
type ErrorListMatch struct {
	Detail *string `json:"detail,omitempty"`
	Id *string `json:"id,omitempty"`
	Status *int `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
	Validation *map[string]any `json:"validation,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	ApplicationId string `json:"application_id"`
}

// EventCreateData is the typed request payload for Event.CreateTyped.
type EventCreateData struct {
	Id string `json:"id"`
	ApplicationId *any `json:"application_id,omitempty"`
}

// EventType is the typed data model for the event_type entity.
type EventType struct {
}

// EventTypeLoadMatch is the typed request payload for EventType.LoadTyped.
type EventTypeLoadMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// EventTypeListMatch is the typed request payload for EventType.ListTyped.
type EventTypeListMatch struct {
	ApplicationId string `json:"application_id"`
}

// EventTypeCreateData is the typed request payload for EventType.CreateTyped.
type EventTypeCreateData struct {
	ApplicationId string `json:"application_id"`
	ResourceType string `json:"resource_type"`
	Service string `json:"service"`
	Verb string `json:"verb"`
}

// EventTypeRemoveMatch is the typed request payload for EventType.RemoveTyped.
type EventTypeRemoveMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// EventsManagement is the typed data model for the events_management entity.
type EventsManagement struct {
}

// EventsManagementListMatch is the typed request payload for EventsManagement.ListTyped.
type EventsManagementListMatch struct {
}

// Health is the typed data model for the health entity.
type Health struct {
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Key *string `json:"key,omitempty"`
}

// Hook0 is the typed data model for the hook0 entity.
type Hook0 struct {
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
}

// LoginCreateData is the typed request payload for Login.CreateTyped.
type LoginCreateData struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Token string `json:"token"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Id string `json:"id"`
}

// OrganizationListMatch is the typed request payload for Organization.ListTyped.
type OrganizationListMatch struct {
	Amount *int `json:"amount,omitempty"`
	ApplicationId *string `json:"application_id,omitempty"`
	ApplicationName *string `json:"application_name,omitempty"`
	Consumption *map[string]any `json:"consumption,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	IsProvisional *bool `json:"is_provisional,omitempty"`
	Name *string `json:"name,omitempty"`
	OnboardingSteps *map[string]any `json:"onboarding_steps,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	Plan *map[string]any `json:"plan,omitempty"`
	Quotas *map[string]any `json:"quotas,omitempty"`
	Role *string `json:"role,omitempty"`
	Users *[]any `json:"users,omitempty"`
}

// OrganizationCreateData is the typed request payload for Organization.CreateTyped.
type OrganizationCreateData struct {
	Name string `json:"name"`
}

// OrganizationUpdateData is the typed request payload for Organization.UpdateTyped.
type OrganizationUpdateData struct {
	Id string `json:"id"`
	Name *string `json:"name,omitempty"`
}

// OrganizationRemoveMatch is the typed request payload for Organization.RemoveTyped.
type OrganizationRemoveMatch struct {
	Id string `json:"id"`
}

// OrganizationEditRole is the typed data model for the organization_edit_role entity.
type OrganizationEditRole struct {
}

// OrganizationEditRoleUpdateData is the typed request payload for OrganizationEditRole.UpdateTyped.
type OrganizationEditRoleUpdateData struct {
	Id string `json:"id"`
	Role *string `json:"role,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// Quota is the typed data model for the quota entity.
type Quota struct {
}

// QuotaLoadMatch is the typed request payload for Quota.LoadTyped.
type QuotaLoadMatch struct {
	Enabled *bool `json:"enabled,omitempty"`
	Limits *map[string]any `json:"limits,omitempty"`
}

// Registration is the typed data model for the registration entity.
type Registration struct {
}

// RegistrationCreateData is the typed request payload for Registration.CreateTyped.
type RegistrationCreateData struct {
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	Gclid *string `json:"gclid,omitempty"`
	LastName string `json:"last_name"`
	Password string `json:"password"`
	SignupChannel *string `json:"signup_channel,omitempty"`
	TurnstileToken *string `json:"turnstile_token,omitempty"`
}

// RequestAttempt is the typed data model for the request_attempt entity.
type RequestAttempt struct {
}

// RequestAttemptLoadMatch is the typed request payload for RequestAttempt.LoadTyped.
type RequestAttemptLoadMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// RequestAttemptListMatch is the typed request payload for RequestAttempt.ListTyped.
type RequestAttemptListMatch struct {
	ApplicationId string `json:"application_id"`
	EventEventTypeName *string `json:"event_event_type_name,omitempty"`
	EventId *string `json:"event_id,omitempty"`
	MaxCreatedAt *string `json:"max_created_at,omitempty"`
	MinCreatedAt *string `json:"min_created_at,omitempty"`
	PaginationCursor *string `json:"pagination_cursor,omitempty"`
	SubscriptionId *string `json:"subscription_id,omitempty"`
}

// Response is the typed data model for the response entity.
type Response struct {
}

// ResponseLoadMatch is the typed request payload for Response.LoadTyped.
type ResponseLoadMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
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
}

// ServiceTokenLoadMatch is the typed request payload for ServiceToken.LoadTyped.
type ServiceTokenLoadMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// ServiceTokenListMatch is the typed request payload for ServiceToken.ListTyped.
type ServiceTokenListMatch struct {
	OrganizationId string `json:"organization_id"`
}

// ServiceTokenCreateData is the typed request payload for ServiceToken.CreateTyped.
type ServiceTokenCreateData struct {
	Name string `json:"name"`
	OrganizationId string `json:"organization_id"`
}

// ServiceTokenUpdateData is the typed request payload for ServiceToken.UpdateTyped.
type ServiceTokenUpdateData struct {
	Id string `json:"id"`
	Name *string `json:"name,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
}

// ServiceTokenRemoveMatch is the typed request payload for ServiceToken.RemoveTyped.
type ServiceTokenRemoveMatch struct {
	Id string `json:"id"`
	OrganizationId string `json:"organization_id"`
}

// Subscription is the typed data model for the subscription entity.
type Subscription struct {
}

// SubscriptionLoadMatch is the typed request payload for Subscription.LoadTyped.
type SubscriptionLoadMatch struct {
	Id string `json:"id"`
}

// SubscriptionListMatch is the typed request payload for Subscription.ListTyped.
type SubscriptionListMatch struct {
	ApplicationId string `json:"application_id"`
}

// SubscriptionCreateData is the typed request payload for Subscription.CreateTyped.
type SubscriptionCreateData struct {
	ApplicationId string `json:"application_id"`
	DedicatedWorkers *[]any `json:"dedicated_workers,omitempty"`
	Description *string `json:"description,omitempty"`
	EventTypes []any `json:"event_types"`
	IsEnabled bool `json:"is_enabled"`
	LabelKey *string `json:"label_key,omitempty"`
	LabelValue *string `json:"label_value,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Target map[string]any `json:"target"`
}

// SubscriptionUpdateData is the typed request payload for Subscription.UpdateTyped.
type SubscriptionUpdateData struct {
	Id string `json:"id"`
	ApplicationId *string `json:"application_id,omitempty"`
	DedicatedWorkers *[]any `json:"dedicated_workers,omitempty"`
	Description *string `json:"description,omitempty"`
	EventTypes *[]any `json:"event_types,omitempty"`
	IsEnabled *bool `json:"is_enabled,omitempty"`
	LabelKey *string `json:"label_key,omitempty"`
	LabelValue *string `json:"label_value,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Target *map[string]any `json:"target,omitempty"`
}

// SubscriptionRemoveMatch is the typed request payload for Subscription.RemoveTyped.
type SubscriptionRemoveMatch struct {
	Id string `json:"id"`
	ApplicationId string `json:"application_id"`
}

// UserAuthentication is the typed data model for the user_authentication entity.
type UserAuthentication struct {
}

// UserAuthenticationCreateData is the typed request payload for UserAuthentication.CreateTyped.
type UserAuthenticationCreateData struct {
	CurrentPassword string `json:"current_password"`
	Email string `json:"email"`
	NewPassword string `json:"new_password"`
	Token string `json:"token"`
}

// UserInvitation is the typed data model for the user_invitation entity.
type UserInvitation struct {
}

// UserInvitationCreateData is the typed request payload for UserInvitation.CreateTyped.
type UserInvitationCreateData struct {
	OrganizationId string `json:"organization_id"`
	Email string `json:"email"`
	Role string `json:"role"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
