package voxgig.hook0sdk.core

/**
 * Hook0 SDK client. All transport and pipeline behaviour lives in the
 * SdkClient base (core/SdkClient.kt); this class binds the API-specific
 * entity accessors and the test-mode constructor.
 */
class Hook0SDK(options: MutableMap<String, Any?>?) : SdkClient(options) {

  constructor() : this(null)


  /**
   * Returns a application entity bound to this client.
   * Idiomatic usage: client.application(null).list(null, null) or
   * client.application(null).load(mutableMapOf("id" to ...), null).
   */
  fun application(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.ApplicationEntity(this, entopts)
  }

  /**
   * Returns a application_secret entity bound to this client.
   * Idiomatic usage: client.applicationSecret(null).list(null, null) or
   * client.applicationSecret(null).load(mutableMapOf("id" to ...), null).
   */
  fun applicationSecret(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.ApplicationSecretEntity(this, entopts)
  }

  /**
   * Returns a email_preference entity bound to this client.
   * Idiomatic usage: client.emailPreference(null).list(null, null) or
   * client.emailPreference(null).load(mutableMapOf("id" to ...), null).
   */
  fun emailPreference(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.EmailPreferenceEntity(this, entopts)
  }

  /**
   * Returns a error entity bound to this client.
   * Idiomatic usage: client.error(null).list(null, null) or
   * client.error(null).load(mutableMapOf("id" to ...), null).
   */
  fun error(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.ErrorEntity(this, entopts)
  }

  /**
   * Returns a event entity bound to this client.
   * Idiomatic usage: client.event(null).list(null, null) or
   * client.event(null).load(mutableMapOf("id" to ...), null).
   */
  fun event(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.EventEntity(this, entopts)
  }

  /**
   * Returns a event_type entity bound to this client.
   * Idiomatic usage: client.eventType(null).list(null, null) or
   * client.eventType(null).load(mutableMapOf("id" to ...), null).
   */
  fun eventType(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.EventTypeEntity(this, entopts)
  }

  /**
   * Returns a events_management entity bound to this client.
   * Idiomatic usage: client.eventsManagement(null).list(null, null) or
   * client.eventsManagement(null).load(mutableMapOf("id" to ...), null).
   */
  fun eventsManagement(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.EventsManagementEntity(this, entopts)
  }

  /**
   * Returns a health entity bound to this client.
   * Idiomatic usage: client.health(null).list(null, null) or
   * client.health(null).load(mutableMapOf("id" to ...), null).
   */
  fun health(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.HealthEntity(this, entopts)
  }

  /**
   * Returns a hook0 entity bound to this client.
   * Idiomatic usage: client.hook0(null).list(null, null) or
   * client.hook0(null).load(mutableMapOf("id" to ...), null).
   */
  fun hook0(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.Hook0Entity(this, entopts)
  }

  /**
   * Returns a ingested_event entity bound to this client.
   * Idiomatic usage: client.ingestedEvent(null).list(null, null) or
   * client.ingestedEvent(null).load(mutableMapOf("id" to ...), null).
   */
  fun ingestedEvent(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.IngestedEventEntity(this, entopts)
  }

  /**
   * Returns a instance entity bound to this client.
   * Idiomatic usage: client.instance(null).list(null, null) or
   * client.instance(null).load(mutableMapOf("id" to ...), null).
   */
  fun instance(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.InstanceEntity(this, entopts)
  }

  /**
   * Returns a login entity bound to this client.
   * Idiomatic usage: client.login(null).list(null, null) or
   * client.login(null).load(mutableMapOf("id" to ...), null).
   */
  fun login(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.LoginEntity(this, entopts)
  }

  /**
   * Returns a organization entity bound to this client.
   * Idiomatic usage: client.organization(null).list(null, null) or
   * client.organization(null).load(mutableMapOf("id" to ...), null).
   */
  fun organization(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.OrganizationEntity(this, entopts)
  }

  /**
   * Returns a organization_edit_role entity bound to this client.
   * Idiomatic usage: client.organizationEditRole(null).list(null, null) or
   * client.organizationEditRole(null).load(mutableMapOf("id" to ...), null).
   */
  fun organizationEditRole(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.OrganizationEditRoleEntity(this, entopts)
  }

  /**
   * Returns a quota entity bound to this client.
   * Idiomatic usage: client.quota(null).list(null, null) or
   * client.quota(null).load(mutableMapOf("id" to ...), null).
   */
  fun quota(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.QuotaEntity(this, entopts)
  }

  /**
   * Returns a registration entity bound to this client.
   * Idiomatic usage: client.registration(null).list(null, null) or
   * client.registration(null).load(mutableMapOf("id" to ...), null).
   */
  fun registration(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.RegistrationEntity(this, entopts)
  }

  /**
   * Returns a request_attempt entity bound to this client.
   * Idiomatic usage: client.requestAttempt(null).list(null, null) or
   * client.requestAttempt(null).load(mutableMapOf("id" to ...), null).
   */
  fun requestAttempt(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.RequestAttemptEntity(this, entopts)
  }

  /**
   * Returns a response entity bound to this client.
   * Idiomatic usage: client.response(null).list(null, null) or
   * client.response(null).load(mutableMapOf("id" to ...), null).
   */
  fun response(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.ResponseEntity(this, entopts)
  }

  /**
   * Returns a revoke entity bound to this client.
   * Idiomatic usage: client.revoke(null).list(null, null) or
   * client.revoke(null).load(mutableMapOf("id" to ...), null).
   */
  fun revoke(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.RevokeEntity(this, entopts)
  }

  /**
   * Returns a service_token entity bound to this client.
   * Idiomatic usage: client.serviceToken(null).list(null, null) or
   * client.serviceToken(null).load(mutableMapOf("id" to ...), null).
   */
  fun serviceToken(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.ServiceTokenEntity(this, entopts)
  }

  /**
   * Returns a subscription entity bound to this client.
   * Idiomatic usage: client.subscription(null).list(null, null) or
   * client.subscription(null).load(mutableMapOf("id" to ...), null).
   */
  fun subscription(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.SubscriptionEntity(this, entopts)
  }

  /**
   * Returns a user_authentication entity bound to this client.
   * Idiomatic usage: client.userAuthentication(null).list(null, null) or
   * client.userAuthentication(null).load(mutableMapOf("id" to ...), null).
   */
  fun userAuthentication(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.UserAuthenticationEntity(this, entopts)
  }

  /**
   * Returns a user_invitation entity bound to this client.
   * Idiomatic usage: client.userInvitation(null).list(null, null) or
   * client.userInvitation(null).load(mutableMapOf("id" to ...), null).
   */
  fun userInvitation(entopts: MutableMap<String, Any?>?): SdkEntity {
    return voxgig.hook0sdk.entity.UserInvitationEntity(this, entopts)
  }


  companion object {
    // testSDK builds a client in test mode: the test feature is activated,
    // installing the in-memory mock transport (no network activity).
    fun testSDK(): Hook0SDK = testSDK(null, null)

    fun testSDK(
      testopts: MutableMap<String, Any?>?,
      sdkopts: MutableMap<String, Any?>?,
    ): Hook0SDK {
      val sdk = Hook0SDK(testOptions(testopts, sdkopts))
      sdk.mode = "test"
      return sdk
    }
  }
}
