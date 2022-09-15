import { Address } from ".";

/**
 * 
 * @export
 * @interface District
 */
export interface District {
    /**
     * 
     * @type {string}
     * @memberof District
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof District
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof District
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof District
     */
    properties: any;
    /**
     * 
     * @type {string}
     * @memberof District
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof District
     */
    picture_url: string | null;
    /**
     * 
     * @type {string}
     * @memberof District
     */
    locale: string | null;
    /**
     * 
     * @type {any}
     * @memberof District
     */
    location_id: any | null;
    /**
     * 
     * @type {Address}
     * @memberof District
     */
    location: Address | null;
    /**
     * 
     * @type {string}
     * @memberof District
     */
    time_zone: string | null;
}
