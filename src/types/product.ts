import { ProductState } from "./common";

export interface Product {
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Product
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Product
     */
    updated_date: Date;
    /**
     * 
     * @type {string}
     * @memberof Product
     * @description The name of the product.
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     * @description The number of classes this license is applied to.
     */
    code: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     * @description The URL of the product image.
     */
    picture_url: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     * @description The description of the product.
     */
    description: string;
    /**
     * 
     * @type {ProductState}
     * @memberof Product
     * @description The state of the product.
     */
    state: ProductState;
    /**
     * 
     * @type {string}
     * @memberof Product
     * @description The team ID of the product.
     */
    team_id: string;
    /**
     * 
     * @type {number}
     * @memberof Product
     * @description The soft cap of the product.
     */
    soft_cap?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     * @description The hard cap of the product.
     */
    hard_cap?: number;
    /**
     * 
     * @type {string[]}
     * @memberof Product
     * @description The tags of the product.
     */
    tags: string[];
    /**
     * 
     * @type {number}
     * @memberof Product
     * @description The default license duration of the product in days.
     */
    license_duration: number;
    /**
     * 
     * @type {Record<string, any>}
     * @memberof Product
     * @description Extra properties belonging to the product.
     */
    properties: Record<string, any>;
}