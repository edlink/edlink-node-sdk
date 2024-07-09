import { Identifier } from ".";

/**
 * [Category Model](https://ed.link/docs/api/v2.0/models/external/category)
 * @export
 * @interface Category
 */
 export interface Category {
    /**
     * 
     * @type {string}
     * @memberof Category
     */
    id: string;
    /**
     * 
     * When the object was created in the source.
     * @type {Date}
     * @memberof Category
     */
    created_date: string;
    /**
     * 
     * When the object was last updated in the source.
     * @type {Date}
     * @memberof Category
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Category
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Category
     */
    identifiers: Identifier[];
    /**
     * 
     * The title of the category.
     * @type {string}
     * @memberof Category
     */
    title: string;
    /**
     * 
     * The weight of the category when calculating grades.
     * @type {number}
     * @memberof Category
     */
    weight: number;
    /**
     * 
     * The number of lowest scores to drop when calculating grades.
     * @type {number}
     * @memberof Category
     */
    drop_lowest: number;
    /**
     * 
     * The position of the category relative to the others.
     * @type {number}
     * @memberof Category
     */
    position: number;
}

