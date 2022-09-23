import { BearerTokenAPI, Category, RequestOptions } from '../types';

export class Categories {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all categories in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    public async *list(class_id: string, options: RequestOptions = {}): AsyncGenerator<Category> {
        yield* this.api.paginate<Category>(`/classes/${class_id}/categories`, options);
    }

    /**
     * Fetches a single category by ID.
     * @param class_id The UUID of the class
     * @param category_id The UUID of the category
     * @returns The requested category
     * @throws 404 if the category does not exist
     */
    public async fetch(class_id: string, category_id: string, options: RequestOptions = {}): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`, {}, options);
    }

    /**
     * Creates a new category in a class.
     * @param class_id The UUID of the class
     * @param category The category to create
     * @returns The created category
     */
    public async create(class_id: string, category: Category): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories`, {
            method: 'POST',
            data: category
        });
    }

    /**
     * Updates a category in a class.
     * @param class_id The UUID of the class
     * @param category_id The UUID of the category
     * @param category A partial category object
     * @returns The updated category
     * @throws `400` if the category is invalid
     */
    public async update(class_id: string, category_id: string, category: Partial<Category>): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`, {
            method: 'PATCH',
            data: category
        });
    }

    /**
     * Deletes a category in a class.
     * @param class_id The UUID of the class
     * @param category_id The UUID of the category
     * @returns `200` if the category was deleted
     * @throws `404` if the category does not exist
     */
    public async delete(class_id: string, category_id: string): Promise<void> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`, {
            method: 'DELETE'
        });
    }
}
