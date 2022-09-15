import { BearerTokenAPI, School } from '../types';

export class Schools {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<School> {
        yield* this.api.paginate<School>('/schools', options, options.limit);
    }

    fetch(school_id: string, options: { access_token?: string } = {}): Promise<School> {
        return this.api.request(`/schools/${school_id}`, options);
    }
}
