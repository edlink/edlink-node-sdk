import { Attachment } from ".";

/**
 * [Submission Model](https://ed.link/docs/api/v2.0/models/external/submission)
 * @export
 * @interface Submission
 */
 export interface Submission {
    /**
     * 
     * @type {string}
     * @memberof Submission
     */
    id: string;
    /**
     * 
     * When the object was created in the source.
     * @type {Date}
     * @memberof Submission
     */
    created_date: string;
    /**
     * 
     * When the object was last updated in the source.
     * @type {Date}
     * @memberof Submission
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Submission
     */
    properties: any;
    /**
     * 
     * The state of the submission.
     * @type {SubmissionState}
     * @memberof Submission
     */
    state: SubmissionState;
    /**
     * 
     * The flags for the submission. All, some, or none of the possible flags may be included.
     * @type {Array<SubmissionFlag>}
     * @memberof Submission
     */
    flags: Array<SubmissionFlag>;
    /**
     * 
     * All of the attempts the assignee has made for this submission.
     * @type {Array<Attempt>}
     * @memberof Submission
     */
    attempts: Array<Attempt>;
    /**
     * 
     * An optional comment left by the grader.
     * @type {string}
     * @memberof Submission
     */
    grade_comment: string;
    /**
     * 
     * The numerical representation of the grade, if applicable. (i.e. 96)
     * @type {number}
     * @memberof Submission
     */
    grade_points: number;
    /**
     * 
     * The string representation of the grade, if applicable. (i.e. A+)
     * @type {string}
     * @memberof Submission
     */
    grade: string;
    /**
     * 
     * The number of extra attempts the assignee is allowed beyond the Assignment's max_attempts.
     * @type {number}
     * @memberof Submission
     */
    extra_attempts: number;
    /**
     * 
     * The due_date for this particular assignee, overriding that of the Assignment.
     * @type {Date}
     * @memberof Submission
     */
    override_due_date: string;
    /**
     * 
     * The UUID of the Person who grades the submission.
     * @type {string}
     * @memberof Submission
     */
    grader_id: string;
    /**
     * 
     * The UUID of the Person who is the assignee of the submission.
     * @type {string}
     * @memberof Submission
     */
    person_id: string;
}

export enum SubmissionState {
    Created = 'created',
    Submitted = 'submitted',
    Returned = 'returned',
    Reclaimed = 'reclaimed'
}

export enum SubmissionFlag {
    Missing = 'missing',
    Late = 'late',
    Excused = 'excused'
}

export interface Attempt {
    /**
     * 
     * @type {Date}
     * @memberof Attempt
     */
    created_date: string;
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof Attempt
     */
    attachments: Array<Attachment>;
}