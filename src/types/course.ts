import { GradeLevel, Identifier, Subject } from ".";

/**
 * 
 * @export
 * @interface Course
 */
export interface Course {
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Course
     */
    created_date: string;
    /**
     * 
     * @type {Date}
     * @memberof Course
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Course
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Course
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    code: string | null;
    /**
     * [Subject Enum](https://ed.link/docs/api/v2.0/models/external/enums/subject)
     * @type {Array<string>}
     * @memberof Course
     */
    subjects: Array<Subject>;
    /**
     * [Grade Level Enum](https://ed.link/docs/api/v2.0/models/external/enums/grade-level)
     * @type {Array<string>}
     * @memberof Course
     */
    grade_levels: Array<GradeLevel>;
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    district_id: string;
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    school_id: string | null;
    /**
     * 
     * @type {string}
     * @memberof Course
     */
    session_id: string | null;
}

