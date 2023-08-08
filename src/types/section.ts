import { Identifier } from ".";

/**
 * 
 * @export
 * @interface Section
 */
export interface Section {
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Section
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Section
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Section
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Section
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    picture_url: string | null;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    locale: string | null;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    time_zone: string | null;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    state: SectionState;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    description: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof Section
     */
    periods: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    class_id: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SectionState {
    Upcoming = 'upcoming',
    Inactive = 'inactive',
    Active = 'active',
    Completed = 'completed',
    Archived = 'archived'
}
