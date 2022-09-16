import { Agent, BearerTokenAPI } from '../types';

export class Agents {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>('/agents', options);
    }

    fetch(district_id: string): Promise<Agent> {
        return this.api.request(`/agents/${district_id}`);
    }
}
