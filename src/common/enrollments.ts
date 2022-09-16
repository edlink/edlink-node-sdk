import { BearerTokenAPI, Enrollment } from '../types';

export class Enrollments {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>('/enrollments', options);
    }

    fetch(enrollment_id: string): Promise<Enrollment> {
        return this.api.request(`/enrollments/${enrollment_id}`);
    }
}
