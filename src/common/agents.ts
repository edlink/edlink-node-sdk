import { Agent, BearerTokenAPI } from '../types';

export class Agents {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>('/agents', options);
    }

    fetch(agent_id: string): Promise<Agent> {
        return this.api.request(`/agents/${agent_id}`);
    }
}
