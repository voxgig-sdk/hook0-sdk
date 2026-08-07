package voxgig.hook0sdk.core;

import java.util.Map;

/**
 * Hook0 SDK client. All transport and pipeline behaviour lives in
 * the SdkClient base (core/SdkClient.java); this class binds the
 * API-specific entity accessors and the test-mode constructor.
 */
public class Hook0SDK extends SdkClient {

  public Hook0SDK() {
    this(null);
  }

  public Hook0SDK(Map<String, Object> options) {
    super(options);
  }


  /**
   * Returns a application entity bound to this client.
   * Idiomatic usage: client.application(null).list(null, null) or
   * client.application(null).load(Map.of("id", ...), null).
   */
  public SdkEntity application(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ApplicationEntity(this, entopts);
  }

  /**
   * Returns a application_secret entity bound to this client.
   * Idiomatic usage: client.applicationSecret(null).list(null, null) or
   * client.applicationSecret(null).load(Map.of("id", ...), null).
   */
  public SdkEntity applicationSecret(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ApplicationSecretEntity(this, entopts);
  }

  /**
   * Returns a applications_management entity bound to this client.
   * Idiomatic usage: client.applicationsManagement(null).list(null, null) or
   * client.applicationsManagement(null).load(Map.of("id", ...), null).
   */
  public SdkEntity applicationsManagement(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ApplicationsManagementEntity(this, entopts);
  }

  /**
   * Returns a event entity bound to this client.
   * Idiomatic usage: client.event(null).list(null, null) or
   * client.event(null).load(Map.of("id", ...), null).
   */
  public SdkEntity event(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.EventEntity(this, entopts);
  }

  /**
   * Returns a event_type entity bound to this client.
   * Idiomatic usage: client.eventType(null).list(null, null) or
   * client.eventType(null).load(Map.of("id", ...), null).
   */
  public SdkEntity eventType(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.EventTypeEntity(this, entopts);
  }

  /**
   * Returns a events_management entity bound to this client.
   * Idiomatic usage: client.eventsManagement(null).list(null, null) or
   * client.eventsManagement(null).load(Map.of("id", ...), null).
   */
  public SdkEntity eventsManagement(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.EventsManagementEntity(this, entopts);
  }

  /**
   * Returns a events_per_day_entry entity bound to this client.
   * Idiomatic usage: client.eventsPerDayEntry(null).list(null, null) or
   * client.eventsPerDayEntry(null).load(Map.of("id", ...), null).
   */
  public SdkEntity eventsPerDayEntry(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.EventsPerDayEntryEntity(this, entopts);
  }

  /**
   * Returns a health entity bound to this client.
   * Idiomatic usage: client.health(null).list(null, null) or
   * client.health(null).load(Map.of("id", ...), null).
   */
  public SdkEntity health(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.HealthEntity(this, entopts);
  }

  /**
   * Returns a hook0 entity bound to this client.
   * Idiomatic usage: client.hook0(null).list(null, null) or
   * client.hook0(null).load(Map.of("id", ...), null).
   */
  public SdkEntity hook0(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.Hook0Entity(this, entopts);
  }

  /**
   * Returns a ingested_event entity bound to this client.
   * Idiomatic usage: client.ingestedEvent(null).list(null, null) or
   * client.ingestedEvent(null).load(Map.of("id", ...), null).
   */
  public SdkEntity ingestedEvent(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.IngestedEventEntity(this, entopts);
  }

  /**
   * Returns a instance entity bound to this client.
   * Idiomatic usage: client.instance(null).list(null, null) or
   * client.instance(null).load(Map.of("id", ...), null).
   */
  public SdkEntity instance(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.InstanceEntity(this, entopts);
  }

  /**
   * Returns a login entity bound to this client.
   * Idiomatic usage: client.login(null).list(null, null) or
   * client.login(null).load(Map.of("id", ...), null).
   */
  public SdkEntity login(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.LoginEntity(this, entopts);
  }

  /**
   * Returns a organization entity bound to this client.
   * Idiomatic usage: client.organization(null).list(null, null) or
   * client.organization(null).load(Map.of("id", ...), null).
   */
  public SdkEntity organization(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.OrganizationEntity(this, entopts);
  }

  /**
   * Returns a organization_edit_role entity bound to this client.
   * Idiomatic usage: client.organizationEditRole(null).list(null, null) or
   * client.organizationEditRole(null).load(Map.of("id", ...), null).
   */
  public SdkEntity organizationEditRole(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.OrganizationEditRoleEntity(this, entopts);
  }

  /**
   * Returns a problem entity bound to this client.
   * Idiomatic usage: client.problem(null).list(null, null) or
   * client.problem(null).load(Map.of("id", ...), null).
   */
  public SdkEntity problem(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ProblemEntity(this, entopts);
  }

  /**
   * Returns a quota entity bound to this client.
   * Idiomatic usage: client.quota(null).list(null, null) or
   * client.quota(null).load(Map.of("id", ...), null).
   */
  public SdkEntity quota(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.QuotaEntity(this, entopts);
  }

  /**
   * Returns a registration entity bound to this client.
   * Idiomatic usage: client.registration(null).list(null, null) or
   * client.registration(null).load(Map.of("id", ...), null).
   */
  public SdkEntity registration(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.RegistrationEntity(this, entopts);
  }

  /**
   * Returns a request_attempt entity bound to this client.
   * Idiomatic usage: client.requestAttempt(null).list(null, null) or
   * client.requestAttempt(null).load(Map.of("id", ...), null).
   */
  public SdkEntity requestAttempt(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.RequestAttemptEntity(this, entopts);
  }

  /**
   * Returns a response entity bound to this client.
   * Idiomatic usage: client.response(null).list(null, null) or
   * client.response(null).load(Map.of("id", ...), null).
   */
  public SdkEntity response(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ResponseEntity(this, entopts);
  }

  /**
   * Returns a revoke entity bound to this client.
   * Idiomatic usage: client.revoke(null).list(null, null) or
   * client.revoke(null).load(Map.of("id", ...), null).
   */
  public SdkEntity revoke(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.RevokeEntity(this, entopts);
  }

  /**
   * Returns a service_token entity bound to this client.
   * Idiomatic usage: client.serviceToken(null).list(null, null) or
   * client.serviceToken(null).load(Map.of("id", ...), null).
   */
  public SdkEntity serviceToken(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.ServiceTokenEntity(this, entopts);
  }

  /**
   * Returns a subscription entity bound to this client.
   * Idiomatic usage: client.subscription(null).list(null, null) or
   * client.subscription(null).load(Map.of("id", ...), null).
   */
  public SdkEntity subscription(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.SubscriptionEntity(this, entopts);
  }

  /**
   * Returns a user_authentication entity bound to this client.
   * Idiomatic usage: client.userAuthentication(null).list(null, null) or
   * client.userAuthentication(null).load(Map.of("id", ...), null).
   */
  public SdkEntity userAuthentication(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.UserAuthenticationEntity(this, entopts);
  }

  /**
   * Returns a user_invitation entity bound to this client.
   * Idiomatic usage: client.userInvitation(null).list(null, null) or
   * client.userInvitation(null).load(Map.of("id", ...), null).
   */
  public SdkEntity userInvitation(Map<String, Object> entopts) {
    return new voxgig.hook0sdk.entity.UserInvitationEntity(this, entopts);
  }


  // testSDK builds a client in test mode: the test feature is activated,
  // installing the in-memory mock transport (no network activity).
  public static Hook0SDK testSDK() {
    return testSDK(null, null);
  }

  public static Hook0SDK testSDK(
      Map<String, Object> testopts, Map<String, Object> sdkopts) {
    Hook0SDK sdk = new Hook0SDK(SdkClient.testOptions(testopts, sdkopts));
    sdk.mode = "test";
    return sdk;
  }
}
