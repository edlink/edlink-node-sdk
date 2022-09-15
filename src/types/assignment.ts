/**
 * 
 * @export
 * @interface Assignment
 */
 export interface Assignment {
    /**
     * 
     * @type {string}
     * @memberof Assignment
     * @description The unique identifier for the assignment.
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment was created.
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment was last updated.
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Assignment
     */
    properties: any;
    /**
     * @type {string}
     * @memberof Assignment
     * @description The description of the assignment.
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     * @description The description of the assignment in plain text.
     */
    description_plaintext: string;
    /**
     * 
     * @type {AssignmentState}
     * @memberof Assignment
     * @description The state of the assignment.
     */
    state: AssignmentState;
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof Assignment
     * @description The attachments associated with the assignment.
     */
    attachments: Array<Attachment>;
    /**
     * 
     * @type {AssignmentAssigneeMode}
     * @memberof Assignment
     * @description The mode for assigning the assignment.
     */
    assignee_mode: AssignmentAssigneeMode;
    /**
     * 
     * @type {Array<string>}
     * @memberof Assignment
     * @description The identifiers of the people assigned to the assignment.
     */
    assignee_ids: Array<string>;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment is due.
     */
    due_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment is displayed.
     */
    display_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment is available.
     */
    start_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     * @description The date the assignment is no longer available.
     */
    end_date: Date;
    /**
     * 
     * @type {number}
     * @memberof Assignment
     * @description The number of points possible for the assignment.
     */
    points_possible: number;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     * @description The grading type for the assignment.
     */
    grading_type: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Assignment
     * @description The submission types for the assignment.
     */
    submission_types: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof Assignment
     * @description The maximum number of attempts for the assignment.
     */
    max_attempts: number;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     * @description The identifier of the session the assignment is associated with.
     */
    session_id: string;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     * @description The identifier of the category the assignment is associated with.
     */
    category_id: string;
}

/**
 * @export
 * @enum {string}
 */
export enum AssignmentAssigneeMode {
    All = 'all',
    Individuals = 'individuals'
}

/**
 * @export
 * @enum {string}
 */
export enum AssignmentState {
    Draft = 'draft',
    Scheduled = 'scheduled',
    Open = 'open',
    Locked = 'locked'
}


export interface Attachment {
    /**
     * 
     * @type {AttachmentType}
     * @memberof Attachment
     * @description The type of attachment.
     */
    type: AttachmentType;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The title of the attachment.
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The description of the attachment.
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The URL of the attachment if it is of the link type.
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The identifier of the file in the external system. Read-only, and only provided by some systems.
     */
    file_external_id?: string;
    /**
     * 
     * @type {number}
     * @memberof Attachment
     * @description The size of the file in bytes. Read-only, and only provided by some systems.
     */
    size?: number;
}


/**
 * @export
 * @enum {string}
 */
 export enum AttachmentType {
    Link = 'link'
}