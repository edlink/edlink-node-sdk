import { BearerTokenAPI, Category } from "../types";

export class Categories {
    constructor(private api: BearerTokenAPI) {}

    public async *list(class_id: string, options: { limit?: number } = {}): AsyncGenerator<Category> {
        yield* this.api.paginate<Category>(`/classes/${class_id}/categories`, options);
    }

    public async fetch(class_id: string, category_id: string): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`);
    }

    public async create(class_id: string, category: Category): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories`, {
            method: 'POST',
            data: category,
        });
    }

    public async update(class_id: string, category_id: string, category: Partial<Category>): Promise<Category> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`, {
            method: 'PATCH',
            data: category,
        });
    }

    public async delete(class_id: string, category_id: string): Promise<void> {
        return this.api.request(`/classes/${class_id}/categories/${category_id}`, {
            method: 'DELETE',
        });
    }
}
