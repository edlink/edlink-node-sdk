import { BearerTokenAPI, Assignment, RequestOptions } from '../types';

export class Assignments {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all assignments in a class.
     * @param class_id The UUID of the class
     * @param options provide a `limit` for the max number of results
     */
    public async *list(class_id: string, options: RequestOptions = {}): AsyncGenerator<Assignment> {
        yield* this.api.paginate<Assignment>(`/classes/${class_id}/assignments`, options);
    }

    /**
     * Fetches a single assignment by ID.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @returns The requested assignment
     * @throws `404` if the assignment does not exist
     */
    public async fetch(class_id: string, assignment_id: string, options: RequestOptions): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`, {}, options);
    }

    /**
     * Create an assignment in a class.
     * @param class_id The UUID of the class
     * @param assignment The assignment to create
     * @returns The created assignment
     * @throws `400` if the assignment is invalid
     */
    public async create(class_id: string, assignment: Assignment): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments`, {
            method: 'POST',
            data: assignment
        });
    }

    /**
     * Update an assignment in a class.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param assignment A partial assignment object
     * @returns The updated assignment
     * @throws `400` if the assignment is invalid
     */
    public async update(class_id: string, assignment_id: string, assignment: Partial<Assignment>): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`, {
            method: 'PATCH',
            data: assignment
        });
    }

    /**
     *
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @returns `200` if the assignment was deleted
     * @throws `404` if the assignment does not exist
     */
    public async delete(class_id: string, assignment_id: string): Promise<void> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`, {
            method: 'DELETE'
        });
    }
}
