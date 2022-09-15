import { Agent, BearerTokenAPI } from '../types';

export class Agents {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>('/agents', options, options.limit);
    }

    fetch(district_id: string, options: { access_token?: string } = {}): Promise<Agent> {
        return this.api.request(`/agents/${district_id}`, options);
    }
}
