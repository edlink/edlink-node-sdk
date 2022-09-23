import { BearerTokenAPI, District, Person, RequestOptions } from '../types';

export class Districts {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all districts.
     * All Edlink sources contain a single district.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptions = {}): AsyncGenerator<District> {
        yield* this.api.paginate<District>('/districts', options);
    }

    /**
     * Fetches a single district by ID.
     * @param district_id The UUID of the district
     * @returns The requested district
     */
    fetch(district_id: string, options: RequestOptions = {}): Promise<District> {
        return this.api.request(`/districts/${district_id}`, {}, options);
    }

    /**
     * Paginates through all administrators in a district.
     * All Edlink sources contain a single district.
     * @param district_id The UUID of the district to list admins for
     * @param options Provide a `limit` for the max number of results
     */
    async *listAdministrators(district_id: string, options: RequestOptions = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/districts/${district_id}/administrators`, options);
    }
}
