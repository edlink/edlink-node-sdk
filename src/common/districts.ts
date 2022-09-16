import { BearerTokenAPI, District } from '../types';

export class Districts {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<District> {
        yield* this.api.paginate<District>('/districts', options);
    }

    fetch(district_id: string): Promise<District> {
        return this.api.request(`/districts/${district_id}`);
    }
}
