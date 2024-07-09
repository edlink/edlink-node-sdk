import { Identifier } from ".";

/**
 * 
 * @export
 * @interface Session
 */
export interface Session {
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Session
     */
    created_date: string;
    /**
     * 
     * @type {Date}
     * @memberof Session
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Session
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Session
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    type: SessionType;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    state: SessionState;
    /**
     * 
     * @type {Date}
     * @memberof Session
     */
    start_date: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof Session
     */
    end_date: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    school_id: string | null;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    district_id: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SessionType {
    Semester = 'semester',
    Term = 'term',
    GradingPeriod = 'grading_period',
    SchoolYear = 'school_year'
}
/**
 * @export
 * @enum {string}
 */
export enum SessionState {
    Upcoming = 'upcoming',
    Active = 'active',
    Completed = 'completed'
}

