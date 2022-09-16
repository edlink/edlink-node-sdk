import { Session } from '..';
import { BearerTokenAPI } from '../types';

export class Sessions {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Session> {
        yield* this.api.paginate<Session>('/sessions', options);
    }

    fetch(session_id: string): Promise<Session> {
        return this.api.request(`/sessions/${session_id}`);
    }
}
