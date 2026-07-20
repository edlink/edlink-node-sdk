import { Actor, AuditEvent, BearerTokenAPI, Context, RequestOptionsGet, RequestOptionsPaging, RequestOptionsPost, Target, UUID } from '../types';

export class AuditEvents {
    constructor(private api: BearerTokenAPI) {
        if (api.api !== 'audit') {
            throw new Error('The Audit Logs API only works with the Application TokenSetType');
        }
    }

    /**
     * Paginates through all Events within a given scope.
     * @param scope_id An arbitrary string identifier for the scope (e.g. a tenant or customer ID)
     * @param options Provide a `limit` for the max number of results
     */
    async *list(scope_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<AuditEvent> {
        yield* this.api.paginate<AuditEvent>(`/events/scope/${scope_id}`, options);
    }

    /**
     * Fetches a single Event by ID.
     * @param event_id The UUID of the Event
     * @returns The requested Event
     */
    fetch(event_id: string, options: RequestOptionsGet = {}): Promise<AuditEvent> {
        return this.api.request(`/events/${event_id}`, options);
    }

    /**
     * Records a new Event.
     * @param event The Event body to record
     * @param options Optional request options
     * @returns The recorded Event's assigned ID
     */
    create(
        event: { actor: Actor; action: string; targets: Target[]; scope: string; institution?: UUID; context?: Context; data?: any },
        options: RequestOptionsPost = {},
    ): Promise<Pick<AuditEvent, 'id'>> {
        return this.api.request({
            url: '/events',
            method: 'POST',
            data: event,
        }, options);
    }
}
