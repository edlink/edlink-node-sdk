import { BearerTokenAPI } from '../types';

export class My {
    constructor(private api: BearerTokenAPI) {}

    profile(options: { access_token?: string } = {}): Promise<any> {
        return this.api.request(`/profile`, options);
    }

    integration(options: { access_token?: string } = {}): Promise<any> {
        return this.api.request(`/integration`, options);
    }
}
