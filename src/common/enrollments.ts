import { BearerTokenAPI, Enrollment, RequestOptionsGet, RequestOptionsPaging } from '../types';

export class Enrollments {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all enrollments.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>('/enrollments', options);
    }

    /**
     * Fetches a single enrollment by ID.
     * @param enrollment_id The UUID of the enrollment
     * @returns The requested enrollment
     * @throws `404` If the enrollment does not exist
     */
    fetch(enrollment_id: string, options: RequestOptionsGet = {}): Promise<Enrollment> {
        return this.api.request(`/enrollments/${enrollment_id}`, options);
    }
}
