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
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Session
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Session
     */
    properties: any;
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
    schoo_id: string | null;
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

