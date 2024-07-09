import { Session } from '..';
import { BearerTokenAPI, RequestOptionsGet, RequestOptionsPaging } from '../types';

export class Sessions {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all sessions.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<Session> {
        yield* this.api.paginate<Session>('/sessions', options);
    }

    /**
     * Fetches a single session by ID.
     * @param session_id The UUID of the session
     * @returns The requested session
     */
    fetch(session_id: string, options: RequestOptionsGet = {}): Promise<Session> {
        return this.api.request(`/sessions/${session_id}`, {}, options);
    }
}
