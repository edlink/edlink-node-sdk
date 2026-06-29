import { CRUDXType } from ".";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

export enum ScopeType {
    Institution = "institution",
    Integration = "integration",
}

export interface AuditIdentifier {
    value: string;
    issuer: string;
}

export interface Actor {
    type: "person" | "system" | "external";
    identifiers: AuditIdentifier[];
    details?: object;
}

export interface Target {
    type: string;
    identifiers: AuditIdentifier[];
    details?: object;
}

export interface Scope {
    id: UUID;
    type: ScopeType;
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
    trigger?: "person" | "system" | "external";
    deployment_id?: string;
}

/**
 * @export
 * @interface AuditEvent
 */
export interface AuditEvent {
    /**
     * Read-only. Assigned by Edlink when the Event is recorded.
     * @type {string}
     * @memberof AuditEvent
     */
    id?: string;
    /**
     * Read-only. The timestamp at which Edlink received the Event.
     * @type {string}
     * @memberof AuditEvent
     */
    created_date?: string;
    /**
     * Read-only. The Schema that validated this Event, if any.
     * @type {SchemaRef}
     * @memberof AuditEvent
     */
    schema?: SchemaRef;
    /**
     * The entity that performed the action.
     * @type {Actor}
     * @memberof AuditEvent
     */
    actor: Actor;
    /**
     * The customer-defined identifier for the action, e.g. `assignment.submit`.
     * @type {string}
     * @memberof AuditEvent
     */
    action: string;
    /**
     * Read-only. The CRUD classification of the action, derived from the matching Schema.
     * @type {CRUDXType}
     * @memberof AuditEvent
     */
    action_type?: CRUDXType;
    /**
     * The entities affected by the action.
     * @type {Array<Target>}
     * @memberof AuditEvent
     */
    targets: Target[];
    /**
     * The scope (integration or institution) the Event belongs to.
     * @type {Scope}
     * @memberof AuditEvent
     */
    scope: Scope;
    /**
     * Information about the underlying network request. Strongly suggested.
     * @type {Context}
     * @memberof AuditEvent
     */
    context?: Context;
    /**
     * Arbitrary data relevant to the Event. Validated only if a Schema defines a data shape.
     * @type {any}
     * @memberof AuditEvent
     */
    data?: any;
}
