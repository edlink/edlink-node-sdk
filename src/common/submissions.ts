import { Attempt, BearerTokenAPI, Submission } from "../types";

export class Submissions {
    constructor(private api: BearerTokenAPI) {}

    public async *list(class_id: string, assignment_id: string, options: { limit?: number } = {}): AsyncGenerator<Submission> {
        yield* this.api.paginate<Submission>(`/classes/${class_id}/assignments/${assignment_id}/submissions`, options);
    }

    public async fetch(class_id: string, assignment_id: string, submission_id: string): Promise<Submission> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`);
    }

    public async submit(class_id: string, assignment_id: string, attempt: Partial<Attempt>): Promise<Submission> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}/submit`, {
            method: 'POST',
            data: attempt,
        });
    }

    public async reclaim(class_id: string, assignment_id: string): Promise<Submission> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}/reclaim`, {
            method: 'POST'
        });
    }

    public async return(class_id: string, assignment_id: string, submission_id: string): Promise<Submission> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}/return`, {
            method: 'POST'
        });
    }

    public async update(class_id: string, assignment_id: string, submission_id: string, submission: Partial<Submission>): Promise<Submission> {
        return this.api.request(`/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`, {
            method: 'PATCH',
            data: submission,
        });
    }
}
