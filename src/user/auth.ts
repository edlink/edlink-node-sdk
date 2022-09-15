import axios, { AxiosStatic } from 'axios';
import { Edlink } from '..';
import { PersonTokenSet } from '../types';

export class Auth {

    api: AxiosStatic;
    config: Edlink;

    constructor(config: Edlink) {
        this.api = axios;
        this.config = config;
    }

    async grant(code: string, options: { redirect_uri: string }): Promise<PersonTokenSet> {
        const data = {
            code,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            redirect_uri: options.redirect_uri,
            grant_type: 'authorization_code'
        };
        return this.api.request({ url: 'https://ed.link/api/authentication/token', data, method: 'POST' }).then(response => response.data.$data);
    }

    async refresh(refresh_token: string): Promise<PersonTokenSet> {
        const data = {
            refresh_token,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            grant_type: 'refresh_token'
        };
        return this.api.request({ url: 'https://ed.link/api/authentication/token', data, method: 'POST' }).then(response => response.data.$data);
    }
}