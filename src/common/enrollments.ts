import { BearerTokenAPI, Enrollment } from '../types';

export class Enrollments {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>('/enrollments', options, options.limit);
    }

    fetch(enrollment_id: string, options: { access_token?: string } = {}): Promise<Enrollment> {
        return this.api.request(`/enrollments/${enrollment_id}`, options);
    }
}
