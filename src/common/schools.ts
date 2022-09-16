import { BearerTokenAPI, School } from '../types';

export class Schools {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<School> {
        yield* this.api.paginate<School>('/schools', options);
    }

    fetch(school_id: string): Promise<School> {
        return this.api.request(`/schools/${school_id}`);
    }
}
