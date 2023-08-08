import { Identifier, Role } from ".";

/**
 * 
 * @export
 * @interface Enrollment
 */
export interface Enrollment {
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Enrollment
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Enrollment
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Enrollment
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Enrollment
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    state: EnrollmentState;
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    role: Role;
    /**
     * 
     * @type {Date}
     * @memberof Enrollment
     */
    start_date: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof Enrollment
     */
    end_date: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof Enrollment
     */
    primary: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    person_id: string;
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    class_id: string;
    /**
     * 
     * @type {string}
     * @memberof Enrollment
     */
    section_id: string | null;
}

/**
 * @export
 * @enum {string}
 */
export enum EnrollmentState {
    Active = 'active',
    Inactive = 'inactive',
    Dropped = 'dropped',
    Upcoming = 'upcoming',
    Pending = 'pending',
    Completed = 'completed'
}
