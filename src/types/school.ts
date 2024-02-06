import { GradeLevel, Identifier } from './common';
import { Address } from './address';
import { Product } from './product';
/**
 * 
 * @export
 * @interface School
 */
export interface School {
    /**
     * 
     * @type {string}
     * @memberof School
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof School
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof School
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof School
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof School
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof School
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof School
     */
    picture_url: string | null;
    /**
     * 
     * @type {string}
     * @memberof School
     */
    locale: string | null;
    /**
     * 
     * @type {any}
     * @memberof School
     */
    location_id: any | null;
    /**
     * 
     * @type {Address}
     * @memberof School
     */
    location: Address | null;
    /**
     * 
     * @type {string}
     * @memberof School
     */
    time_zone: string | null;
    /**
     * 
     * @type {string}
     * @memberof School
     */
    grade_levels: Array<GradeLevel>;
    /**
     * 
     * @type {string}
     * @memberof School
     */
    district_id: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof School
     */
    product_ids: Array<string>;
    /**
     * 
     * @type {Array<Product>}
     * @memberof School
     */
    products?: Array<Product>;
}
