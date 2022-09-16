import { BearerTokenAPI, Assignment } from "../types";

export class Assignments {
    constructor(private api: BearerTokenAPI) {}

    public async *list(class_id: string, options: { limit?: number } = {}): AsyncGenerator<Assignment> {
        yield* this.api.paginate<Assignment>(`/classes/${class_id}/assignments`, options);
    }

    public async fetch(class_id: string, assignment_id: string): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`);
    }

    public async create(class_id: string, assignment: Assignment): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments`, {
            method: 'POST',
            data: assignment,
        });
    }

    public async update(class_id: string, assignment_id: string, assignment: Partial<Assignment>): Promise<Assignment> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`, {
            method: 'PATCH',
            data: assignment,
        });
    }

    public async delete(class_id: string, assignment_id: string): Promise<void> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}`, {
            method: 'DELETE',
        });
    }
}
