export interface Application {
    application_id: string;
    consumption: Record<string, any>;
    name: string;
    onboarding_steps: Record<string, any>;
    organization_id: string;
    quota: Record<string, any>;
}
export interface ApplicationLoadMatch {
    id: string;
}
export interface ApplicationListMatch {
    application_id?: string;
    consumption?: Record<string, any>;
    name?: string;
    onboarding_steps?: Record<string, any>;
    organization_id?: string;
    quota?: Record<string, any>;
}
export interface ApplicationCreateData {
    application_id: string;
    consumption: Record<string, any>;
    name: string;
    onboarding_steps: Record<string, any>;
    organization_id: string;
    quota: Record<string, any>;
}
export interface ApplicationUpdateData {
    id: string;
}
export interface ApplicationRemoveMatch {
    id: string;
}
export interface ApplicationSecret {
    application_id: string;
    created_at: string;
    deleted_at?: string;
    name?: string;
    token: string;
}
export interface ApplicationSecretListMatch {
    application_id?: string;
    created_at?: string;
    deleted_at?: string;
    name?: string;
    token?: string;
}
export interface ApplicationSecretCreateData {
    application_id: string;
    created_at: string;
    deleted_at?: string;
    name?: string;
    token: string;
}
export interface ApplicationSecretUpdateData {
    id: string;
}
export interface ApplicationsManagement {
}
export interface ApplicationsManagementRemoveMatch {
    application_secret_token: string;
}
export interface Event {
    event_id: string;
    event_type_name: string;
    ip: string;
    labels: Record<string, any>;
    metadata?: Record<string, any>;
    occurred_at: string;
    payload: string;
    payload_content_type: string;
    received_at: string;
}
export interface EventLoadMatch {
    id: string;
}
export interface EventListMatch {
    event_id?: string;
    event_type_name?: string;
    ip?: string;
    labels?: Record<string, any>;
    metadata?: Record<string, any>;
    occurred_at?: string;
    payload?: string;
    payload_content_type?: string;
    received_at?: string;
}
export interface EventType {
    application_id: string;
    event_type_name: string;
    resource_type: string;
    resource_type_name: string;
    service: string;
    service_name: string;
    verb: string;
    verb_name: string;
}
export interface EventTypeLoadMatch {
    id: string;
}
export interface EventTypeListMatch {
    application_id?: string;
    event_type_name?: string;
    resource_type?: string;
    resource_type_name?: string;
    service?: string;
    service_name?: string;
    verb?: string;
    verb_name?: string;
}
export interface EventTypeCreateData {
    application_id: string;
    event_type_name: string;
    resource_type: string;
    resource_type_name: string;
    service: string;
    service_name: string;
    verb: string;
    verb_name: string;
}
export interface EventsManagement {
    application_id: string;
}
export interface EventsManagementListMatch {
    application_id?: string;
}
export interface EventsManagementCreateData {
    event_id: string;
}
export interface EventsManagementRemoveMatch {
    event_type_name: string;
}
export interface EventsPerDayEntry {
    amount: number;
    application_id: string;
    application_name: string;
    date: string;
    is_provisional: boolean;
}
export interface EventsPerDayEntryListMatch {
    amount?: number;
    application_id?: string;
    application_name?: string;
    date?: string;
    is_provisional?: boolean;
}
export interface Health {
    database: boolean;
    database_duration_ms: number;
    object_storage?: boolean;
    object_storage_duration_ms?: number;
    pulsar?: boolean;
    pulsar_duration_ms?: number;
    total_duration_ms: number;
}
export interface HealthLoadMatch {
    database?: boolean;
    database_duration_ms?: number;
    object_storage?: boolean;
    object_storage_duration_ms?: number;
    pulsar?: boolean;
    pulsar_duration_ms?: number;
    total_duration_ms?: number;
}
export interface Hook0 {
    default?: string;
    description?: string;
    env_var: string;
    group?: string;
    name: string;
    required: boolean;
    sensitive: boolean;
}
export interface Hook0ListMatch {
    default?: string;
    description?: string;
    env_var?: string;
    group?: string;
    name?: string;
    required?: boolean;
    sensitive?: boolean;
}
export interface IngestedEvent {
    application_id: string;
    event_id?: string;
    event_type: string;
    labels: Record<string, any>;
    metadata?: Record<string, any>;
    occurred_at: string;
    payload: string;
    payload_content_type: string;
}
export interface IngestedEventCreateData {
    application_id: string;
    event_id?: string;
    event_type: string;
    labels: Record<string, any>;
    metadata?: Record<string, any>;
    occurred_at: string;
    payload: string;
    payload_content_type: string;
}
export interface Instance {
    application_secret_compatibility: boolean;
    auto_db_migration: boolean;
    biscuit_public_key: string;
    cloudflare_turnstile_site_key?: string;
    formbricks: Record<string, any>;
    matomo: Record<string, any>;
    password_minimum_length: number;
    quota_enforcement: boolean;
    registration_disabled: boolean;
    support_email_address: string;
}
export interface InstanceLoadMatch {
    application_secret_compatibility?: boolean;
    auto_db_migration?: boolean;
    biscuit_public_key?: string;
    cloudflare_turnstile_site_key?: string;
    formbricks?: Record<string, any>;
    matomo?: Record<string, any>;
    password_minimum_length?: number;
    quota_enforcement?: boolean;
    registration_disabled?: boolean;
    support_email_address?: string;
}
export interface Login {
    email: string;
    password: string;
}
export interface LoginCreateData {
    email: string;
    password: string;
}
export interface Organization {
    consumption: Record<string, any>;
    name: string;
    onboarding_steps: Record<string, any>;
    organization_id: string;
    plan: Record<string, any>;
    quota: Record<string, any>;
    role: string;
    users: any[];
}
export interface OrganizationLoadMatch {
    id: string;
}
export interface OrganizationListMatch {
    consumption?: Record<string, any>;
    name?: string;
    onboarding_steps?: Record<string, any>;
    organization_id?: string;
    plan?: Record<string, any>;
    quota?: Record<string, any>;
    role?: string;
    users?: any[];
}
export interface OrganizationCreateData {
    consumption: Record<string, any>;
    name: string;
    onboarding_steps: Record<string, any>;
    organization_id: string;
    plan: Record<string, any>;
    quota: Record<string, any>;
    role: string;
    users: any[];
}
export interface OrganizationUpdateData {
    id: string;
}
export interface OrganizationRemoveMatch {
    id: string;
}
export interface OrganizationEditRole {
    role: string;
    user_id: string;
}
export interface OrganizationEditRoleUpdateData {
    id: string;
}
export interface Problem {
    detail: string;
    id: string;
    status: number;
    title: string;
}
export interface ProblemListMatch {
    detail?: string;
    id?: string;
    status?: number;
    title?: string;
}
export interface Quota {
    enabled: boolean;
    limits: Record<string, any>;
}
export interface QuotaLoadMatch {
    enabled?: boolean;
    limits?: Record<string, any>;
}
export interface Registration {
    email: string;
    first_name: string;
    gclid?: string;
    last_name: string;
    password: string;
    turnstile_token?: string;
}
export interface RegistrationCreateData {
    email: string;
    first_name: string;
    gclid?: string;
    last_name: string;
    password: string;
    turnstile_token?: string;
}
export interface RequestAttempt {
    created_at: string;
    delay_until?: string;
    event: Record<string, any>;
    event_id: string;
    failed_at?: string;
    http_response_status?: number;
    picked_at?: string;
    request_attempt_id: string;
    response_id?: string;
    retry_count: number;
    status: Record<string, any>;
    subscription: Record<string, any>;
    succeeded_at?: string;
}
export interface RequestAttemptLoadMatch {
    id: string;
}
export interface RequestAttemptListMatch {
    created_at?: string;
    delay_until?: string;
    event?: Record<string, any>;
    event_id?: string;
    failed_at?: string;
    http_response_status?: number;
    picked_at?: string;
    request_attempt_id?: string;
    response_id?: string;
    retry_count?: number;
    status?: Record<string, any>;
    subscription?: Record<string, any>;
    succeeded_at?: string;
}
export interface Response {
    body?: string;
    elapsed_time_ms?: number;
    headers?: Record<string, any>;
    http_code?: number;
    response_error_name?: string;
    response_id: string;
}
export interface ResponseLoadMatch {
    id: string;
}
export interface Revoke {
}
export interface RevokeRemoveMatch {
    organization_id: string;
}
export interface ServiceToken {
    biscuit: string;
    created_at: string;
    name: string;
    organization_id: string;
    token_id: string;
}
export interface ServiceTokenLoadMatch {
    id: string;
}
export interface ServiceTokenListMatch {
    biscuit?: string;
    created_at?: string;
    name?: string;
    organization_id?: string;
    token_id?: string;
}
export interface ServiceTokenCreateData {
    biscuit: string;
    created_at: string;
    name: string;
    organization_id: string;
    token_id: string;
}
export interface ServiceTokenUpdateData {
    id: string;
}
export interface ServiceTokenRemoveMatch {
    id: string;
}
export interface Subscription {
    application_id: string;
    created_at: string;
    dedicated_workers: any[];
    description?: string;
    event_type: any[];
    is_enabled: boolean;
    label_key: string;
    label_value: string;
    labels: Record<string, any>;
    metadata: Record<string, any>;
    secret: string;
    subscription_id: string;
    target: Record<string, any>;
    updated_at: string;
}
export interface SubscriptionLoadMatch {
    id: string;
}
export interface SubscriptionListMatch {
    application_id?: string;
    created_at?: string;
    dedicated_workers?: any[];
    description?: string;
    event_type?: any[];
    is_enabled?: boolean;
    label_key?: string;
    label_value?: string;
    labels?: Record<string, any>;
    metadata?: Record<string, any>;
    secret?: string;
    subscription_id?: string;
    target?: Record<string, any>;
    updated_at?: string;
}
export interface SubscriptionCreateData {
    application_id: string;
    created_at: string;
    dedicated_workers: any[];
    description?: string;
    event_type: any[];
    is_enabled: boolean;
    label_key: string;
    label_value: string;
    labels: Record<string, any>;
    metadata: Record<string, any>;
    secret: string;
    subscription_id: string;
    target: Record<string, any>;
    updated_at: string;
}
export interface SubscriptionUpdateData {
    id: string;
}
export interface SubscriptionRemoveMatch {
    id: string;
}
export interface UserAuthentication {
    email: string;
    new_password: string;
    token: string;
}
export interface UserAuthenticationCreateData {
    email: string;
    new_password: string;
    token: string;
}
export interface UserInvitation {
    email: string;
    role: string;
}
export interface UserInvitationCreateData {
    organization_id: string;
}
