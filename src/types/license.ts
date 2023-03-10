
export interface License {
    /**
     * 
     * @type {number}
     * @memberof License
     * @description The number of schools this license is applied to.
     */
    school_count: number;
    /**
     * 
     * @type {number}
     * @memberof License
     * @description The number of classes this license is applied to.
     */
    class_count: number;
    /**
     * 
     * @type {number}
     * @memberof License
     * @description The number of people this license is applied to.
     */
    person_count: number;
    /**
     * 
     * @type {string}
     * @memberof License
     */
    integration_id: string;
    /**
     * 
     * @type {string}
     * @memberof License
     * @description The UUID of the product being licensed.
     */
    product_id: string;
}