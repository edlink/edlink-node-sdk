import { Session } from '..';
import { BearerTokenAPI } from '../types';

export class Sessions {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Session> {
        yield* this.api.paginate<Session>('/sessions', options, options.limit);
    }

    fetch(session_id: string, options: { access_token?: string } = {}): Promise<Session> {
        return this.api.request(`/sessions/${session_id}`, options);
    }
}
