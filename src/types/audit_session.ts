/**
 * A short-lived Audit Log Session.
 * @export
 * @interface AuditLogSession
 */
export interface AuditLogSession {
    /**
     * Read-only. Assigned by Edlink when the Session is created.
     * @type {string}
     * @memberof AuditLogSession
     */
    id: string;
    /**
     * UTC ISO-8601 timestamp. The time Edlink created the Session.
     * @type {string}
     * @memberof AuditLogSession
     */
    created_date: string;
    /**
     * UTC ISO-8601 timestamp. The time Edlink last updated the Session.
     * @type {string}
     * @memberof AuditLogSession
     */
    updated_date: string;
    /**
     * Secret key used to authenticate as this Session.
     * @type {string}
     * @memberof AuditLogSession
     */
    key: string;
    /**
     * The user-defined scope the Session belongs to.
     * An arbitrary string identifier (up to 128 bytes) internal to your system.
     * @type {string}
     * @memberof AuditLogSession
     */
    scope: string;
    /**
     * UTC ISO-8601 timestamp. The Session is invalid after this time.
     * Defaults to one hour after creation.
     * @type {string}
     * @memberof AuditLogSession
     */
    expiration_date: string;
    /**
     * The Edlink Team that owns this Session.
     * @type {string}
     * @memberof AuditLogSession
     */
    team_id: string;
    /**
     * The Edlink Application that created this Session.
     * @type {string}
     * @memberof AuditLogSession
     */
    application_id: string;
}
