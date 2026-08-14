/**
 * @export
 * @enum {string}
 */
export enum CRUDXType {
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Other = "other",
}

/**
 * @export
 * @enum {string}
 */
export enum AuditEventSeverity {
    Debug = "debug",
    Low = "low",
    Medium = "medium",
    High = "high",
    Emergency = "emergency",
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface AuditIdentifier {
    value: string;
    issuer: string;
    name?: string;
}

export interface Actor {
    type: "person" | "system" | "anonymous";
    identifiers: AuditIdentifier[];
    details?: object;
}

export interface Target {
    type: string;
    identifiers: AuditIdentifier[];
    details?: object;
}

export interface SchemaRef {
    id: string;
    version: string;
}

export interface Context {
    source?: "client" | "server";
    http_method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
    http_status?: number;
    path?: string;
    ip?: string;
    query?: string;
    user_agent?: string;
    hostname?: string;
    os?: string;
    environment?: string;
    trigger?: "person" | "system" | "anonymous";
    deployment_id?: string;
}

/**
 * @export
 * @interface BaseAuditEvent
 */
export interface BaseAuditEvent {
    /**
     * Read-only. Assigned by Edlink when the Event is recorded.
     * @type {string}
     * @memberof BaseAuditEvent
     */
    id?: string;
    /**
     * UTC ISO-8601 timestamp. Client-supplied on create, or the time Edlink received the Event if omitted.
     * @type {string}
     * @memberof BaseAuditEvent
     */
    created_date?: string;
    /**
     * Read-only. The Schema that validated this Event, if any.
     * @type {SchemaRef}
     * @memberof BaseAuditEvent
     */
    schema?: SchemaRef;
    /**
     * The entity that performed the action.
     * @type {Actor}
     * @memberof BaseAuditEvent
     */
    actor: Actor;
    /**
     * The customer-defined identifier for the action, e.g. `assignment.submit`.
     * @type {string}
     * @memberof BaseAuditEvent
     */
    action: string;
    /**
     * Read-only. The CRUD classification of the action, derived from the matching Schema.
     * @type {CRUDXType}
     * @memberof BaseAuditEvent
     */
    action_type?: CRUDXType;
    /**
     * Severity of the Event. Defaults to `debug` if omitted or invalid on create.
     * @type {AuditEventSeverity}
     * @memberof BaseAuditEvent
     */
    severity?: AuditEventSeverity;
    /**
     * The entities affected by the action.
     * @type {Array<Target>}
     * @memberof BaseAuditEvent
     */
    targets: Target[];
    /**
     * The user-defined scope the Event belongs to.
     * An arbitrary string identifier (up to 128 bytes) internal to your system.
     * @type {string}
     * @memberof BaseAuditEvent
     */
    scope: string;
    /**
     * The Edlink Public-Data API 'institution' the Event belongs to.
     * @type {UUID}
     * @memberof BaseAuditEvent
     */
    institution?: UUID;
    /**
     * Information about the underlying network request. Strongly suggested.
     * @type {Context}
     * @memberof BaseAuditEvent
     */
    context?: Context;
}

/**
 * @export
 * @interface AuditEventWithData
 */
export interface AuditEventWithData extends BaseAuditEvent {
    /**
     * Arbitrary data relevant to the Event. Validated only if a Schema defines a data shape.
     * Present when `before` was empty; `before` and `after` are omitted.
     * @type {any}
     * @memberof AuditEventWithData
     */
    data: any;
    before?: never;
    after?: never;
}

/**
 * @export
 * @interface AuditEventWithChange
 */
export interface AuditEventWithChange extends BaseAuditEvent {
    /**
     * Pre-change snapshot. Present together with `after`; `data` is omitted.
     * @type {any}
     * @memberof AuditEventWithChange
     */
    before: any;
    /**
     * Post-change snapshot. Present together with `before`; `data` is omitted.
     * @type {any}
     * @memberof AuditEventWithChange
     */
    after: any;
    data?: never;
}

/**
 * A recorded Audit Event. Payload is either `data`, or `before` and `after`.
 * @export
 */
export type AuditEvent = AuditEventWithData | AuditEventWithChange;

interface CreateAuditEventBase {
    actor: Actor;
    action: string;
    targets: Target[];
    scope: string;
    institution?: UUID;
    context?: Context;
    severity?: AuditEventSeverity;
    created_date?: Date | string;
}

/**
 * @export
 * @interface CreateAuditEventWithData
 */
export interface CreateAuditEventWithData extends CreateAuditEventBase {
    /**
     * Arbitrary data relevant to the Event. Validated only if a Schema defines a data shape.
     * @type {any}
     * @memberof CreateAuditEventWithData
     */
    data?: any;
    before?: never;
    after?: never;
}

/**
 * @export
 * @interface CreateAuditEventWithChange
 */
export interface CreateAuditEventWithChange extends CreateAuditEventBase {
    /**
     * Pre-change snapshot.
     * @type {any}
     * @memberof CreateAuditEventWithChange
     */
    before: any;
    /**
     * Post-change snapshot.
     * @type {any}
     * @memberof CreateAuditEventWithChange
     */
    after: any;
    data?: never;
}

/**
 * Body for `POST /api/v2/audit/events`. Send `data`, or `before` and `after`.
 * @export
 */
export type CreateAuditEvent = CreateAuditEventWithData | CreateAuditEventWithChange;
