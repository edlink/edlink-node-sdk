import { GradeLevel, Identifier, Role } from './common';
import { Demographics } from './demographics';
import { Product } from './product';
/**
 * 
 * @export
 * @interface Person
 */
export interface Person {
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Person
     */
    created_date: string;
    /**
     * 
     * @type {Date}
     * @memberof Person
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Person
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Person
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    first_name: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    middle_name: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    last_name: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    display_name: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    picture_url: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof Person
     */
    roles: Array<Role>;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    email: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    phone: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    locale: string | null;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    time_zone: string | null;
    /**
     * 
     * @type {number}
     * @memberof Person
     */
    graduation_year: number | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof Person
     */
    grade_levels: Array<GradeLevel>;
    /**
     * 
     * @type {Demographics}
     * @memberof Person
     */
    demographics: Demographics;
    /**
     * 
     * @type {string}
     * @memberof Person
     */
    district_id: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Person
     */
    school_ids: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Person
     */
    product_ids: Array<string>;
    /**
     * 
     * @type {Array<Product>}
     * @memberof Person
     */
    products?: Array<Product>;

}
