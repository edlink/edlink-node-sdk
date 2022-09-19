import { BearerTokenAPI, Person } from '../types';

export class My {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Gets the Person object for the current user.
     * @returns The Person object for the current user
     */
    profile(): Promise<Person> {
        return this.api.request(`/profile`);
    }

    /**
     * Get the integration for the current TokenSet.
     * @returns The integration accociated with the TokenSet provided
     */
    integration(): Promise<any> {
        return this.api.request(`/integration`);
    }
}
