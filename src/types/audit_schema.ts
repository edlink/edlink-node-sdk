export interface AuditSchemaAction {
  /**
   * @type {string}
   * @memberof AuditSchemaAction
   */
  id: string;
  /**
   * @type {CRUDXType}
   * @memberof AuditSchemaAction
   */
  type: CRUDXType;
}

/**
 * @export
 * @interface AuditSchema
 */
export interface AuditSchema {
  /**
   * @type {string}
   * @memberof AuditSchema
   */
  id: string;
  /**
   * @type {Date}
   * @memberof AuditSchema
   */
  created_date: string;
  /**
   * @type {Date}
   * @memberof AuditSchema
   */
  updated_date: string;
  /**
   * @type {any}
   * @memberof AuditSchema
   */
  data: any;
  /**
   * @type {string}
   * @memberof AuditSchema
   */
  version: string;
  /**
   * @type {string}
   * @memberof AuditSchema
   */
  validation_level: "strict" | "lax";
  /**
   * [Action Type](https://ed.link/docs/api/v2.0/audit-log-schemas/schema-get)
   * @type {AuditSchemaAction}
   * @memberof AuditSchema
   */
  action: AuditSchemaAction;
}

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
