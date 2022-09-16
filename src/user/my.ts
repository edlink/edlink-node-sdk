import { BearerTokenAPI } from '../types';

export class My {
    constructor(private api: BearerTokenAPI) {}

    profile(): Promise<any> {
        return this.api.request(`/profile`);
    }

    integration(): Promise<any> {
        return this.api.request(`/integration`);
    }
}
