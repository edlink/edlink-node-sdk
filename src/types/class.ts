import { GradeLevel, Identifier, Subject } from ".";

/**
 * 
 * @export
 * @interface Class
 */
export interface Class {
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Class
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Class
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Class
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Class
     */
    identifiers: Identifier;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    name: string | null;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    description: string | null;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    picture_url: string | null;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    locale: string | null;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    time_zone: string | null;
    /**
     * [Subject Enum](https://ed.link/docs/api/v2.0/models/external/enums/subject)
     * @type {Array<Subject>}
     * @memberof Class
     */
    subjects: Array<Subject>;
    /**
     * [Grade Level Enum](https://ed.link/docs/api/v2.0/models/external/enums/grade-level)
     * @type {Array<GradeLevel>}
     * @memberof Class
     */
    grade_levels: Array<GradeLevel>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Class
     */
    periods: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    state: ClassState;
    /**
     * 
     * @type {Array<string>}
     * @memberof Class
     */
    session_ids: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    course_id: string | null;
    /**
     * 
     * @type {string}
     * @memberof Class
     */
    school_id: string;
}

/**
 * @export
 * @enum {string}
 */
 export enum ClassState {
    Template = 'template',
    Upcoming = 'upcoming',
    Inactive = 'inactive',
    Active = 'active',
    Completed = 'completed',
    Archived = 'archived'
}
