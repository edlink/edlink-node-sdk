import { Agent, BearerTokenAPI, RequestOptionsGet, RequestOptionsPaging } from '../types';

export class Agents {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Lists all agents.
     * @param options provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>('/agents', options);
    }

    /**
     * Fetches a single agent by ID.
     * @param agent_id the UUID of the agent
     * @returns the agent
     * @throws `404` if the agent does not exist
     */
    fetch(agent_id: string, options: RequestOptionsGet = {}): Promise<Agent> {
        return this.api.request(`/agents/${agent_id}`, {}, options);
    }
}
