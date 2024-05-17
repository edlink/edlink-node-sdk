import { Address, Identifier } from ".";

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
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof District
     */
    identifiers: Identifier[];
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
     * @type {Address}
     * @memberof District
     */
    address: Address | null;
    /**
     * 
     * @type {string}
     * @memberof District
     */
    time_zone: string | null;
}
