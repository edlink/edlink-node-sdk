import { GradeLevel } from './common';
import { Address } from './address';
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
    updated_Date: Date;
    /**
     * 
     * @type {any}
     * @memberof School
     */
    properties: any;
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
}
