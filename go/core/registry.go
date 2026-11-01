package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApplicationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewApplicationSecretEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewEmailPreferenceEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewErrorEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewEventEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewEventTypeEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewEventsManagementEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewHealthEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewHook0EntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewIngestedEventEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewInstanceEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewLoginEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewOrganizationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewOrganizationEditRoleEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewQuotaEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewRegistrationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewRequestAttemptEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewResponseEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewRevokeEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewServiceTokenEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewSubscriptionEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewUserAuthenticationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

var NewUserInvitationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0EntityBase

