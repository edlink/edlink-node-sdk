import { Actor, AuditEvent, BearerTokenAPI, Context, RequestOptionsGet, RequestOptionsPaging, RequestOptionsPost, Target, UUID } from '../types';

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
