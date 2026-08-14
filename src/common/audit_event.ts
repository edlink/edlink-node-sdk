import { AuditEvent, BearerTokenAPI, CreateAuditEvent, RequestOptionsGet, RequestOptionsPost } from '../types';

export class AuditEvents {
    constructor(private api: BearerTokenAPI) {
        if (api.api !== 'audit') {
            throw new Error('The Audit Logs API only works with the Application TokenSetType');
        }
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
    create(event: CreateAuditEvent, options?: RequestOptionsPost): Promise<Pick<AuditEvent, 'id'>>;
    /**
     * Records a batch of Events (1–100). The request is atomic: any validation failure rejects the entire batch.
     * @param events The Event bodies to record
     * @param options Optional request options
     * @returns The recorded Events' assigned IDs, in the same order as the request
     */
    create(events: CreateAuditEvent[], options?: RequestOptionsPost): Promise<{ ids: string[] }>;
    create(
        event: CreateAuditEvent | CreateAuditEvent[],
        options: RequestOptionsPost = {}
    ): Promise<Pick<AuditEvent, 'id'> | { ids: string[] }> {
        return this.api.request(
            {
                url: '/events',
                method: 'POST',
                data: event
            },
            options
        );
    }
}
