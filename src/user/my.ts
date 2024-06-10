import { BearerTokenAPI, Integration, Person, Source } from '../types';

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
    integration(): Promise<Integration> {
        return this.api.request(`/integration`);
    }

    source(): Promise<Source> {
        return this.api.request(`/source`);
    }
}
