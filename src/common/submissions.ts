import { Attempt, BearerTokenAPI, RequestOptionsBase, RequestOptionsGet, RequestOptionsPaging, RequestOptionsPost, Submission } from '../types';

export class Submissions {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all submissions.
     * A submission will always exist for every enrollment in the class
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param options Provide a `limit` for the max number of results
     */
    public async *list(
        class_id: string,
        assignment_id: string,
        options: RequestOptionsPaging = {}
    ): AsyncGenerator<Submission> {
        yield* this.api.paginate<Submission>(`/classes/${class_id}/assignments/${assignment_id}/submissions`, options);
    }

    /**
     * Fetches a single submission by ID.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param submission_id The UUID of the submission
     * @returns The requested submission
     */
    public async fetch(
        class_id: string,
        assignment_id: string,
        submission_id: string,
        options: RequestOptionsGet = {}
    ): Promise<Submission> {
        return this.api.request(
            `/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`,
            options
        );
    }

    /**
     * Submit a new attempt for a submission.
     * This will add a new attempt on the submission in the `attempts` array.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param attempt The attempt to submit
     * @returns The updated submission
     */
    public async submit(class_id: string, assignment_id: string, attempt: Partial<Attempt>, options: RequestOptionsPost = {}): Promise<Submission> {
        return this.api.request({
            url: `/classes/${class_id}/assignments/${assignment_id}/submit`,
            method: 'POST',
            data: attempt
        }, options);
    }

    /**
     * Reclaim a submission as a student. This will allow the student to continue working on the assignment and add new attempts.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @returns The reclaimed submission
     */
    public async reclaim(class_id: string, assignment_id: string, options: RequestOptionsPost = {}): Promise<Submission> {
        return this.api.request({
            url: `/classes/${class_id}/assignments/${assignment_id}/reclaim`,
            method: 'POST'
        }, options);
    }

    /**
     * Reutrn a submission to the student. This will allow the student to continue working on the assignment and add new attempts.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param submission_id The UUID of the submission
     * @returns The returned submission
     */
    public async return(class_id: string, assignment_id: string, submission_id: string, options: RequestOptionsPost = {}): Promise<Submission> {
        return this.api.request({
            url: `/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}/return`,
            method: 'POST'
        }, options);
    }

    /**
     * This can be used to grade a submission.
     * It is how a teacher/administrator can modify a submission and is not for use by students.
     * @param class_id The UUID of the class
     * @param assignment_id The UUID of the assignment
     * @param submission_id The UUID of the submission
     * @param submission A partial submission object
     * @returns The updated submission
     */
    public async update(
        class_id: string,
        assignment_id: string,
        submission_id: string,
        submission: Partial<Submission>,
        options: RequestOptionsBase = {}
    ): Promise<Submission> {
        return this.api.request({
            url: `/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`,
            method: 'PATCH',
            data: submission
        }, options);
    }
}
