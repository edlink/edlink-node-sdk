import { BearerTokenAPI, District } from '../types';

export class Districts {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<District> {
        yield* this.api.paginate<District>('/districts', options, options.limit);
    }

    fetch(district_id: string, options: { access_token?: string } = {}): Promise<District> {
        return this.api.request(`/districts/${district_id}`, options);
    }
}
