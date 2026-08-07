// Typed models for the Hook0 SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Application
 * @property {string} application_id
 * @property {Object} consumption
 * @property {string} name
 * @property {Object} onboarding_steps
 * @property {string} organization_id
 * @property {Object} quota
 */

/**
 * @typedef {Object} ApplicationLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ApplicationListMatch
 * @property {string} [application_id]
 * @property {Object} [consumption]
 * @property {string} [name]
 * @property {Object} [onboarding_steps]
 * @property {string} [organization_id]
 * @property {Object} [quota]
 */

/**
 * @typedef {Object} ApplicationCreateData
 * @property {string} application_id
 * @property {Object} consumption
 * @property {string} name
 * @property {Object} onboarding_steps
 * @property {string} organization_id
 * @property {Object} quota
 */

/**
 * @typedef {Object} ApplicationUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} ApplicationRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ApplicationSecret
 * @property {string} application_id
 * @property {string} created_at
 * @property {string} [deleted_at]
 * @property {string} [name]
 * @property {string} token
 */

/**
 * @typedef {Object} ApplicationSecretListMatch
 * @property {string} [application_id]
 * @property {string} [created_at]
 * @property {string} [deleted_at]
 * @property {string} [name]
 * @property {string} [token]
 */

/**
 * @typedef {Object} ApplicationSecretCreateData
 * @property {string} application_id
 * @property {string} created_at
 * @property {string} [deleted_at]
 * @property {string} [name]
 * @property {string} token
 */

/**
 * @typedef {Object} ApplicationSecretUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} ApplicationsManagement
 */

/**
 * @typedef {Object} ApplicationsManagementRemoveMatch
 * @property {string} application_secret_token
 */

/**
 * @typedef {Object} Event
 * @property {string} event_id
 * @property {string} event_type_name
 * @property {string} ip
 * @property {Object} labels
 * @property {Object} [metadata]
 * @property {string} occurred_at
 * @property {string} payload
 * @property {string} payload_content_type
 * @property {string} received_at
 */

/**
 * @typedef {Object} EventLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EventListMatch
 * @property {string} [event_id]
 * @property {string} [event_type_name]
 * @property {string} [ip]
 * @property {Object} [labels]
 * @property {Object} [metadata]
 * @property {string} [occurred_at]
 * @property {string} [payload]
 * @property {string} [payload_content_type]
 * @property {string} [received_at]
 */

/**
 * @typedef {Object} EventType
 * @property {string} application_id
 * @property {string} event_type_name
 * @property {string} resource_type
 * @property {string} resource_type_name
 * @property {string} service
 * @property {string} service_name
 * @property {string} verb
 * @property {string} verb_name
 */

/**
 * @typedef {Object} EventTypeLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EventTypeListMatch
 * @property {string} [application_id]
 * @property {string} [event_type_name]
 * @property {string} [resource_type]
 * @property {string} [resource_type_name]
 * @property {string} [service]
 * @property {string} [service_name]
 * @property {string} [verb]
 * @property {string} [verb_name]
 */

/**
 * @typedef {Object} EventTypeCreateData
 * @property {string} application_id
 * @property {string} event_type_name
 * @property {string} resource_type
 * @property {string} resource_type_name
 * @property {string} service
 * @property {string} service_name
 * @property {string} verb
 * @property {string} verb_name
 */

/**
 * @typedef {Object} EventsManagement
 * @property {string} application_id
 */

/**
 * @typedef {Object} EventsManagementListMatch
 * @property {string} [application_id]
 */

/**
 * @typedef {Object} EventsManagementCreateData
 * @property {string} event_id
 */

/**
 * @typedef {Object} EventsManagementRemoveMatch
 * @property {string} event_type_name
 */

/**
 * @typedef {Object} EventsPerDayEntry
 * @property {number} amount
 * @property {string} application_id
 * @property {string} application_name
 * @property {string} date
 * @property {boolean} is_provisional
 */

/**
 * @typedef {Object} EventsPerDayEntryListMatch
 * @property {number} [amount]
 * @property {string} [application_id]
 * @property {string} [application_name]
 * @property {string} [date]
 * @property {boolean} [is_provisional]
 */

/**
 * @typedef {Object} Health
 * @property {boolean} database
 * @property {number} database_duration_ms
 * @property {boolean} [object_storage]
 * @property {number} [object_storage_duration_ms]
 * @property {boolean} [pulsar]
 * @property {number} [pulsar_duration_ms]
 * @property {number} total_duration_ms
 */

/**
 * @typedef {Object} HealthLoadMatch
 * @property {boolean} [database]
 * @property {number} [database_duration_ms]
 * @property {boolean} [object_storage]
 * @property {number} [object_storage_duration_ms]
 * @property {boolean} [pulsar]
 * @property {number} [pulsar_duration_ms]
 * @property {number} [total_duration_ms]
 */

/**
 * @typedef {Object} Hook0
 * @property {string} [default]
 * @property {string} [description]
 * @property {string} env_var
 * @property {string} [group]
 * @property {string} name
 * @property {boolean} required
 * @property {boolean} sensitive
 */

/**
 * @typedef {Object} Hook0ListMatch
 * @property {string} [default]
 * @property {string} [description]
 * @property {string} [env_var]
 * @property {string} [group]
 * @property {string} [name]
 * @property {boolean} [required]
 * @property {boolean} [sensitive]
 */

/**
 * @typedef {Object} IngestedEvent
 * @property {string} application_id
 * @property {string} [event_id]
 * @property {string} event_type
 * @property {Object} labels
 * @property {Object} [metadata]
 * @property {string} occurred_at
 * @property {string} payload
 * @property {string} payload_content_type
 */

/**
 * @typedef {Object} IngestedEventCreateData
 * @property {string} application_id
 * @property {string} [event_id]
 * @property {string} event_type
 * @property {Object} labels
 * @property {Object} [metadata]
 * @property {string} occurred_at
 * @property {string} payload
 * @property {string} payload_content_type
 */

/**
 * @typedef {Object} Instance
 * @property {boolean} application_secret_compatibility
 * @property {boolean} auto_db_migration
 * @property {string} biscuit_public_key
 * @property {string} [cloudflare_turnstile_site_key]
 * @property {Object} formbricks
 * @property {Object} matomo
 * @property {number} password_minimum_length
 * @property {boolean} quota_enforcement
 * @property {boolean} registration_disabled
 * @property {string} support_email_address
 */

/**
 * @typedef {Object} InstanceLoadMatch
 * @property {boolean} [application_secret_compatibility]
 * @property {boolean} [auto_db_migration]
 * @property {string} [biscuit_public_key]
 * @property {string} [cloudflare_turnstile_site_key]
 * @property {Object} [formbricks]
 * @property {Object} [matomo]
 * @property {number} [password_minimum_length]
 * @property {boolean} [quota_enforcement]
 * @property {boolean} [registration_disabled]
 * @property {string} [support_email_address]
 */

/**
 * @typedef {Object} Login
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginCreateData
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} Organization
 * @property {Object} consumption
 * @property {string} name
 * @property {Object} onboarding_steps
 * @property {string} organization_id
 * @property {Object} plan
 * @property {Object} quota
 * @property {string} role
 * @property {Array} users
 */

/**
 * @typedef {Object} OrganizationLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} OrganizationListMatch
 * @property {Object} [consumption]
 * @property {string} [name]
 * @property {Object} [onboarding_steps]
 * @property {string} [organization_id]
 * @property {Object} [plan]
 * @property {Object} [quota]
 * @property {string} [role]
 * @property {Array} [users]
 */

/**
 * @typedef {Object} OrganizationCreateData
 * @property {Object} consumption
 * @property {string} name
 * @property {Object} onboarding_steps
 * @property {string} organization_id
 * @property {Object} plan
 * @property {Object} quota
 * @property {string} role
 * @property {Array} users
 */

/**
 * @typedef {Object} OrganizationUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} OrganizationRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} OrganizationEditRole
 * @property {string} role
 * @property {string} user_id
 */

/**
 * @typedef {Object} OrganizationEditRoleUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} Problem
 * @property {string} detail
 * @property {string} id
 * @property {number} status
 * @property {string} title
 */

/**
 * @typedef {Object} ProblemListMatch
 * @property {string} [detail]
 * @property {string} [id]
 * @property {number} [status]
 * @property {string} [title]
 */

/**
 * @typedef {Object} Quota
 * @property {boolean} enabled
 * @property {Object} limits
 */

/**
 * @typedef {Object} QuotaLoadMatch
 * @property {boolean} [enabled]
 * @property {Object} [limits]
 */

/**
 * @typedef {Object} Registration
 * @property {string} email
 * @property {string} first_name
 * @property {string} [gclid]
 * @property {string} last_name
 * @property {string} password
 * @property {string} [turnstile_token]
 */

/**
 * @typedef {Object} RegistrationCreateData
 * @property {string} email
 * @property {string} first_name
 * @property {string} [gclid]
 * @property {string} last_name
 * @property {string} password
 * @property {string} [turnstile_token]
 */

/**
 * @typedef {Object} RequestAttempt
 * @property {string} created_at
 * @property {string} [delay_until]
 * @property {Object} event
 * @property {string} event_id
 * @property {string} [failed_at]
 * @property {number} [http_response_status]
 * @property {string} [picked_at]
 * @property {string} request_attempt_id
 * @property {string} [response_id]
 * @property {number} retry_count
 * @property {Object} status
 * @property {Object} subscription
 * @property {string} [succeeded_at]
 */

/**
 * @typedef {Object} RequestAttemptLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} RequestAttemptListMatch
 * @property {string} [created_at]
 * @property {string} [delay_until]
 * @property {Object} [event]
 * @property {string} [event_id]
 * @property {string} [failed_at]
 * @property {number} [http_response_status]
 * @property {string} [picked_at]
 * @property {string} [request_attempt_id]
 * @property {string} [response_id]
 * @property {number} [retry_count]
 * @property {Object} [status]
 * @property {Object} [subscription]
 * @property {string} [succeeded_at]
 */

/**
 * @typedef {Object} Response
 * @property {string} [body]
 * @property {number} [elapsed_time_ms]
 * @property {Object} [headers]
 * @property {number} [http_code]
 * @property {string} [response_error_name]
 * @property {string} response_id
 */

/**
 * @typedef {Object} ResponseLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Revoke
 */

/**
 * @typedef {Object} RevokeRemoveMatch
 * @property {string} organization_id
 */

/**
 * @typedef {Object} ServiceToken
 * @property {string} biscuit
 * @property {string} created_at
 * @property {string} name
 * @property {string} organization_id
 * @property {string} token_id
 */

/**
 * @typedef {Object} ServiceTokenLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ServiceTokenListMatch
 * @property {string} [biscuit]
 * @property {string} [created_at]
 * @property {string} [name]
 * @property {string} [organization_id]
 * @property {string} [token_id]
 */

/**
 * @typedef {Object} ServiceTokenCreateData
 * @property {string} biscuit
 * @property {string} created_at
 * @property {string} name
 * @property {string} organization_id
 * @property {string} token_id
 */

/**
 * @typedef {Object} ServiceTokenUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} ServiceTokenRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Subscription
 * @property {string} application_id
 * @property {string} created_at
 * @property {Array} dedicated_workers
 * @property {string} [description]
 * @property {Array} event_type
 * @property {boolean} is_enabled
 * @property {string} label_key
 * @property {string} label_value
 * @property {Object} labels
 * @property {Object} metadata
 * @property {string} secret
 * @property {string} subscription_id
 * @property {Object} target
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SubscriptionLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} SubscriptionListMatch
 * @property {string} [application_id]
 * @property {string} [created_at]
 * @property {Array} [dedicated_workers]
 * @property {string} [description]
 * @property {Array} [event_type]
 * @property {boolean} [is_enabled]
 * @property {string} [label_key]
 * @property {string} [label_value]
 * @property {Object} [labels]
 * @property {Object} [metadata]
 * @property {string} [secret]
 * @property {string} [subscription_id]
 * @property {Object} [target]
 * @property {string} [updated_at]
 */

/**
 * @typedef {Object} SubscriptionCreateData
 * @property {string} application_id
 * @property {string} created_at
 * @property {Array} dedicated_workers
 * @property {string} [description]
 * @property {Array} event_type
 * @property {boolean} is_enabled
 * @property {string} label_key
 * @property {string} label_value
 * @property {Object} labels
 * @property {Object} metadata
 * @property {string} secret
 * @property {string} subscription_id
 * @property {Object} target
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SubscriptionUpdateData
 * @property {string} id
 */

/**
 * @typedef {Object} SubscriptionRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} UserAuthentication
 * @property {string} email
 * @property {string} new_password
 * @property {string} token
 */

/**
 * @typedef {Object} UserAuthenticationCreateData
 * @property {string} email
 * @property {string} new_password
 * @property {string} token
 */

/**
 * @typedef {Object} UserInvitation
 * @property {string} email
 * @property {string} role
 */

/**
 * @typedef {Object} UserInvitationCreateData
 * @property {string} organization_id
 */

