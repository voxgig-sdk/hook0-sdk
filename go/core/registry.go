package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewApplicationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewApplicationSecretEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewApplicationsManagementEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewEventEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewEventTypeEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewEventsManagementEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewEventsPerDayEntryEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewHealthEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewHook0EntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewIngestedEventEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewInstanceEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewLoginEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewOrganizationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewOrganizationEditRoleEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewProblemEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewQuotaEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewRegistrationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewRequestAttemptEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewResponseEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewRevokeEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewServiceTokenEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewSubscriptionEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewUserAuthenticationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

var NewUserInvitationEntityFunc func(client *Hook0SDK, entopts map[string]any) Hook0Entity

