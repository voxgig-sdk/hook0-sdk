# Typed models for the Hook0 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Application(TypedDict):
    application_id: str
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    quota: dict


class ApplicationLoadMatch(TypedDict):
    id: str


class ApplicationListMatch(TypedDict, total=False):
    application_id: str
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    quota: dict


class ApplicationCreateData(TypedDict):
    application_id: str
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    quota: dict


class ApplicationUpdateData(TypedDict):
    id: str


class ApplicationRemoveMatch(TypedDict):
    id: str


class ApplicationSecretRequired(TypedDict):
    application_id: str
    created_at: str
    token: str


class ApplicationSecret(ApplicationSecretRequired, total=False):
    deleted_at: str
    name: str


class ApplicationSecretListMatch(TypedDict, total=False):
    application_id: str
    created_at: str
    deleted_at: str
    name: str
    token: str


class ApplicationSecretCreateDataRequired(TypedDict):
    application_id: str
    created_at: str
    token: str


class ApplicationSecretCreateData(ApplicationSecretCreateDataRequired, total=False):
    deleted_at: str
    name: str


class ApplicationSecretUpdateData(TypedDict):
    id: str


class ApplicationsManagement(TypedDict):
    pass


class ApplicationsManagementRemoveMatch(TypedDict):
    application_secret_token: str


class EventRequired(TypedDict):
    event_id: str
    event_type_name: str
    ip: str
    labels: dict
    occurred_at: str
    payload: str
    payload_content_type: str
    received_at: str


class Event(EventRequired, total=False):
    metadata: dict


class EventLoadMatch(TypedDict):
    id: str


class EventListMatch(TypedDict, total=False):
    event_id: str
    event_type_name: str
    ip: str
    labels: dict
    metadata: dict
    occurred_at: str
    payload: str
    payload_content_type: str
    received_at: str


class EventType(TypedDict):
    application_id: str
    event_type_name: str
    resource_type: str
    resource_type_name: str
    service: str
    service_name: str
    verb: str
    verb_name: str


class EventTypeLoadMatch(TypedDict):
    id: str


class EventTypeListMatch(TypedDict, total=False):
    application_id: str
    event_type_name: str
    resource_type: str
    resource_type_name: str
    service: str
    service_name: str
    verb: str
    verb_name: str


class EventTypeCreateData(TypedDict):
    application_id: str
    event_type_name: str
    resource_type: str
    resource_type_name: str
    service: str
    service_name: str
    verb: str
    verb_name: str


class EventsManagement(TypedDict):
    application_id: str


class EventsManagementListMatch(TypedDict, total=False):
    application_id: str


class EventsManagementCreateData(TypedDict):
    event_id: str


class EventsManagementRemoveMatch(TypedDict):
    event_type_name: str


class EventsPerDayEntry(TypedDict):
    amount: int
    application_id: str
    application_name: str
    date: str
    is_provisional: bool


class EventsPerDayEntryListMatch(TypedDict, total=False):
    amount: int
    application_id: str
    application_name: str
    date: str
    is_provisional: bool


class HealthRequired(TypedDict):
    database: bool
    database_duration_ms: int
    total_duration_ms: int


class Health(HealthRequired, total=False):
    object_storage: bool
    object_storage_duration_ms: int
    pulsar: bool
    pulsar_duration_ms: int


class HealthLoadMatch(TypedDict, total=False):
    database: bool
    database_duration_ms: int
    object_storage: bool
    object_storage_duration_ms: int
    pulsar: bool
    pulsar_duration_ms: int
    total_duration_ms: int


class Hook0Required(TypedDict):
    env_var: str
    name: str
    required: bool
    sensitive: bool


class Hook0(Hook0Required, total=False):
    default: str
    description: str
    group: str


class Hook0ListMatch(TypedDict, total=False):
    default: str
    description: str
    env_var: str
    group: str
    name: str
    required: bool
    sensitive: bool


class IngestedEventRequired(TypedDict):
    application_id: str
    event_type: str
    labels: dict
    occurred_at: str
    payload: str
    payload_content_type: str


class IngestedEvent(IngestedEventRequired, total=False):
    event_id: str
    metadata: dict


class IngestedEventCreateDataRequired(TypedDict):
    application_id: str
    event_type: str
    labels: dict
    occurred_at: str
    payload: str
    payload_content_type: str


class IngestedEventCreateData(IngestedEventCreateDataRequired, total=False):
    event_id: str
    metadata: dict


class InstanceRequired(TypedDict):
    application_secret_compatibility: bool
    auto_db_migration: bool
    biscuit_public_key: str
    formbricks: dict
    matomo: dict
    password_minimum_length: int
    quota_enforcement: bool
    registration_disabled: bool
    support_email_address: str


class Instance(InstanceRequired, total=False):
    cloudflare_turnstile_site_key: str


class InstanceLoadMatch(TypedDict, total=False):
    application_secret_compatibility: bool
    auto_db_migration: bool
    biscuit_public_key: str
    cloudflare_turnstile_site_key: str
    formbricks: dict
    matomo: dict
    password_minimum_length: int
    quota_enforcement: bool
    registration_disabled: bool
    support_email_address: str


class Login(TypedDict):
    email: str
    password: str


class LoginCreateData(TypedDict):
    email: str
    password: str


class Organization(TypedDict):
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    plan: dict
    quota: dict
    role: str
    users: list


class OrganizationLoadMatch(TypedDict):
    id: str


class OrganizationListMatch(TypedDict, total=False):
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    plan: dict
    quota: dict
    role: str
    users: list


class OrganizationCreateData(TypedDict):
    consumption: dict
    name: str
    onboarding_steps: dict
    organization_id: str
    plan: dict
    quota: dict
    role: str
    users: list


class OrganizationUpdateData(TypedDict):
    id: str


class OrganizationRemoveMatch(TypedDict):
    id: str


class OrganizationEditRole(TypedDict):
    role: str
    user_id: str


class OrganizationEditRoleUpdateData(TypedDict):
    id: str


class Problem(TypedDict):
    detail: str
    id: str
    status: int
    title: str


class ProblemListMatch(TypedDict, total=False):
    detail: str
    id: str
    status: int
    title: str


class Quota(TypedDict):
    enabled: bool
    limits: dict


class QuotaLoadMatch(TypedDict, total=False):
    enabled: bool
    limits: dict


class RegistrationRequired(TypedDict):
    email: str
    first_name: str
    last_name: str
    password: str


class Registration(RegistrationRequired, total=False):
    gclid: str
    turnstile_token: str


class RegistrationCreateDataRequired(TypedDict):
    email: str
    first_name: str
    last_name: str
    password: str


class RegistrationCreateData(RegistrationCreateDataRequired, total=False):
    gclid: str
    turnstile_token: str


class RequestAttemptRequired(TypedDict):
    created_at: str
    event: dict
    event_id: str
    request_attempt_id: str
    retry_count: int
    status: dict
    subscription: dict


class RequestAttempt(RequestAttemptRequired, total=False):
    delay_until: str
    failed_at: str
    http_response_status: int
    picked_at: str
    response_id: str
    succeeded_at: str


class RequestAttemptLoadMatch(TypedDict):
    id: str


class RequestAttemptListMatch(TypedDict, total=False):
    created_at: str
    delay_until: str
    event: dict
    event_id: str
    failed_at: str
    http_response_status: int
    picked_at: str
    request_attempt_id: str
    response_id: str
    retry_count: int
    status: dict
    subscription: dict
    succeeded_at: str


class ResponseRequired(TypedDict):
    response_id: str


class Response(ResponseRequired, total=False):
    body: str
    elapsed_time_ms: int
    headers: dict
    http_code: int
    response_error_name: str


class ResponseLoadMatch(TypedDict):
    id: str


class Revoke(TypedDict):
    pass


class RevokeRemoveMatch(TypedDict):
    organization_id: str


class ServiceToken(TypedDict):
    biscuit: str
    created_at: str
    name: str
    organization_id: str
    token_id: str


class ServiceTokenLoadMatch(TypedDict):
    id: str


class ServiceTokenListMatch(TypedDict, total=False):
    biscuit: str
    created_at: str
    name: str
    organization_id: str
    token_id: str


class ServiceTokenCreateData(TypedDict):
    biscuit: str
    created_at: str
    name: str
    organization_id: str
    token_id: str


class ServiceTokenUpdateData(TypedDict):
    id: str


class ServiceTokenRemoveMatch(TypedDict):
    id: str


class SubscriptionRequired(TypedDict):
    application_id: str
    created_at: str
    dedicated_workers: list
    event_type: list
    is_enabled: bool
    label_key: str
    label_value: str
    labels: dict
    metadata: dict
    secret: str
    subscription_id: str
    target: dict
    updated_at: str


class Subscription(SubscriptionRequired, total=False):
    description: str


class SubscriptionLoadMatch(TypedDict):
    id: str


class SubscriptionListMatch(TypedDict, total=False):
    application_id: str
    created_at: str
    dedicated_workers: list
    description: str
    event_type: list
    is_enabled: bool
    label_key: str
    label_value: str
    labels: dict
    metadata: dict
    secret: str
    subscription_id: str
    target: dict
    updated_at: str


class SubscriptionCreateDataRequired(TypedDict):
    application_id: str
    created_at: str
    dedicated_workers: list
    event_type: list
    is_enabled: bool
    label_key: str
    label_value: str
    labels: dict
    metadata: dict
    secret: str
    subscription_id: str
    target: dict
    updated_at: str


class SubscriptionCreateData(SubscriptionCreateDataRequired, total=False):
    description: str


class SubscriptionUpdateData(TypedDict):
    id: str


class SubscriptionRemoveMatch(TypedDict):
    id: str


class UserAuthentication(TypedDict):
    email: str
    new_password: str
    token: str


class UserAuthenticationCreateData(TypedDict):
    email: str
    new_password: str
    token: str


class UserInvitation(TypedDict):
    email: str
    role: str


class UserInvitationCreateData(TypedDict):
    organization_id: str
