import axios, { AxiosStatic } from 'axios';
import { EdlinkConfig } from '..';
import { PersonTokenSet, TokenSetType } from '../types';

export class Auth {
    private api: AxiosStatic;
    private config: EdlinkConfig;

    constructor(config: EdlinkConfig) {
        this.api = axios;
        this.config = config;
    }

    async grant({ code, redirect_uri }: { code: string; redirect_uri: string }): Promise<PersonTokenSet> {
        const data = {
            code,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        };
        return this.api
            .request({ url: 'https://ed.link/api/authentication/token', data, method: 'POST' })
            .then(response => {
                return {
                    ...response.data.$data,
                    type: TokenSetType.Person
                };
            });
    }

    async refresh(refresh_token: string): Promise<PersonTokenSet> {
        const data = {
            refresh_token,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            grant_type: 'refresh_token'
        };
        return this.api
            .request({ url: 'https://ed.link/api/authentication/token', data, method: 'POST' })
            .then(response => {
                return {
                    ...response.data.$data,
                    type: TokenSetType.Person
                };
            });
    }
}
