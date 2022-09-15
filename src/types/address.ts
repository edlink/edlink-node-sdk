/**
 * 
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    street: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    unit: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    postal_code: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    city: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    state: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    country: string | null;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    phone: string | null;
    /**
     * 
     * @type {number}
     * @memberof Address
     */
    latitude: number | null;
    /**
     * 
     * @type {number}
     * @memberof Address
     */
    longitude: number | null;
}
