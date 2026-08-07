package voxgighook0sdk

import (
	"github.com/voxgig-sdk/hook0-sdk/go/core"
	"github.com/voxgig-sdk/hook0-sdk/go/entity"
	"github.com/voxgig-sdk/hook0-sdk/go/feature"
	_ "github.com/voxgig-sdk/hook0-sdk/go/utility"
)

// Type aliases preserve external API.
type Hook0SDK = core.Hook0SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Hook0Entity = core.Hook0Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Hook0Error = core.Hook0Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApplicationEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewApplicationEntity(client, entopts)
	}
	core.NewApplicationSecretEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewApplicationSecretEntity(client, entopts)
	}
	core.NewApplicationsManagementEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewApplicationsManagementEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewEventTypeEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewEventTypeEntity(client, entopts)
	}
	core.NewEventsManagementEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewEventsManagementEntity(client, entopts)
	}
	core.NewEventsPerDayEntryEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewEventsPerDayEntryEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewHook0EntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewHook0Entity(client, entopts)
	}
	core.NewIngestedEventEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewIngestedEventEntity(client, entopts)
	}
	core.NewInstanceEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewInstanceEntity(client, entopts)
	}
	core.NewLoginEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewLoginEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewOrganizationEntity(client, entopts)
	}
	core.NewOrganizationEditRoleEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewOrganizationEditRoleEntity(client, entopts)
	}
	core.NewProblemEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewProblemEntity(client, entopts)
	}
	core.NewQuotaEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewQuotaEntity(client, entopts)
	}
	core.NewRegistrationEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewRegistrationEntity(client, entopts)
	}
	core.NewRequestAttemptEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewRequestAttemptEntity(client, entopts)
	}
	core.NewResponseEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewResponseEntity(client, entopts)
	}
	core.NewRevokeEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewRevokeEntity(client, entopts)
	}
	core.NewServiceTokenEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewServiceTokenEntity(client, entopts)
	}
	core.NewSubscriptionEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewSubscriptionEntity(client, entopts)
	}
	core.NewUserAuthenticationEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewUserAuthenticationEntity(client, entopts)
	}
	core.NewUserInvitationEntityFunc = func(client *core.Hook0SDK, entopts map[string]any) core.Hook0Entity {
		return entity.NewUserInvitationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHook0SDK = core.NewHook0SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewHook0SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *Hook0SDK  { return NewHook0SDK(nil) }
func Test() *Hook0SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
