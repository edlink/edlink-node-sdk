import {
  AuditEvent,
  AuditSchemaAction,
  BearerTokenAPI,
  CRUDXType,
  RequestOptionsBase,
  RequestOptionsGet,
  RequestOptionsPaging,
  RequestOptionsPost,
} from "../types";

export class AuditEvents {
  constructor(private api: BearerTokenAPI) {
    if (api.api !== "audit") {
      throw new Error(
        "The Audit Logs API only works with the Application TokenSetType",
      );
    }
  }

  /**
   * Fetches a single AuditEvent by ID.
   * @param event_id The UUID of the AuditEvent, or the 'action' string
   * @returns The requested AuditEvent
   */
  fetch(
    event_id: string,
    options: RequestOptionsGet = {},
  ): Promise<AuditEvent> {
    return this.api.request(`/events/${event_id}`, options);
  }

  /**
   * Paginates through all classes that the user has access to.
   * @param options Provide a `limit` for the max number of results
   */
  async *list(
    scope_id: string,
    scope_type: string,
    options: { limit?: number } = {},
  ): AsyncGenerator<AuditEvent> {
    yield* this.api.paginate<AuditEvent>(
      `/events/${scope_type}/${scope_id}`,
      options,
    );
  }

  /**
   * Create the Event for a given 'action'.
   * @param class_id The UUID of the class
   * @returns The requested class
   */
  create(
    action: AuditEventAction,
    data: any = {},
    validation_level: "strict" | "lax" = "lax",
    options: RequestOptionsPost = {},
  ): Promise<AuditEvent> {
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
