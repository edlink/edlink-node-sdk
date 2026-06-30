import {
  AuditSchema,
  AuditSchemaAction,
  BearerTokenAPI,
  CRUDXType,
  RequestOptionsBase,
  RequestOptionsGet,
  RequestOptionsPost,
} from "../types";

export class AuditSchemas {
  constructor(private api: BearerTokenAPI) {
    if (api.api !== "audit") {
      throw new Error(
        "The Audit Logs API only works with the Application TokenSetType",
      );
    }
  }

  /**
   * Fetches a single AuditSchema by ID.
   * @param schema_id_or_action The UUID of the AuditSchema, or the 'action' string
   * @returns The requested AuditSchema
   */
  fetch(
    schema_id_or_action: string,
    options: RequestOptionsGet = {},
  ): Promise<AuditSchema> {
    return this.api.request(`/schemas/${schema_id_or_action}`, options);
  }

  /**
   * Update the existing Schema for a given 'action'
   * @param action The 'action' string the Schema operates on
   * @returns The new AuditSchema
   */
  update(
    action: string,
    params: {
      action_type?: CRUDXType;
      validation_level?: "strict" | "lax";
      data?: object;
    },
    options: RequestOptionsBase = {},
  ): Promise<AuditSchema> {
    return this.api.request(
      {
        url: `/schemas`,
        method: "PATCH",
        data: {
          action,
          ...params,
        },
      },
      options,
    );
  }

  /**
   * Create the Schema for a given 'action'.
   * @param class_id The UUID of the class
   * @returns The requested class
   */
  create(
    action: AuditSchemaAction,
    data: any = {},
    validation_level: "strict" | "lax" = "lax",
    options: RequestOptionsPost = {},
  ): Promise<AuditSchema> {
    return this.api.request({
      url: `/schemas`,
      method: "POST",
      data: {
        action,
        validation_level,
        data,
      },
    }, options);
  }
}
