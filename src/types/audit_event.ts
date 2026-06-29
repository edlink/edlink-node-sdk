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

export interface SchemaID {
  id: string;
  version: string;
}

export interface Context {
  source?: "client" | "server";
  http_method?:
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";
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
   * @type {string}
   * @memberof AuditEvent
   */
  id: string;
  /**
   * @type {Date}
   * @memberof AuditEvent
   */
  created_date: string;
  /**
   * @type {SchemaID}
   * @memberof AuditEvent
   */
  schema: SchemaID;
  /**
   * @type {Actor}
   * @memberof AuditEvent
   */
  actor: Actor;
  /**
   * @type {string}
   * @memberof AuditEvent
   */
  version: string;
  /**
   * @type {string}
   * @memberof AuditEvent
   */
  validation_level: "strict" | "lax";
  /**
   * @type {string}
   * @memberof AuditEvent
   */
  action: string;
  /**
   * @type {CRUDXType}
   * @memberof AuditEvent
   */
  action_type: CRUDXType;
  /**
   * @type {Array<Target>}
   * @memberof AuditEvent
   */
  targets: Target[];
  /**
   * @type {Scope}
   * @memberof AuditEvent
   */
  scope: Scope;
  /**
   * @type {Context}
   * @memberof AuditEvent
   */
  context: Context;
  /**
   * @type {any}
   * @memberof AuditEvent
   */
  data: any;
}
