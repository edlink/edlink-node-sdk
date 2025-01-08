import { EdlinkConfig } from '..';
import { PersonTokenSet, TokenSetType } from '../types';

export class Auth {
    private config: EdlinkConfig;

    constructor(config: EdlinkConfig) {
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

        const response = await fetch('https://ed.link/api/authentication/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let data = await response.json();
            
            if ('$data' in data) {
                data = data.$data;
            }
            
            return {
                ...data,
                type: TokenSetType.Person
            }
        } else {
            throw new Error('Failed exchange code for OAuth token');
        }
    }

    async refresh(refresh_token: string): Promise<PersonTokenSet> {
        const data = {
            refresh_token,
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            grant_type: 'refresh_token'
        };

        const response = await fetch('https://ed.link/api/authentication/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let data = await response.json();
            
            if ('$data' in data) {
                data = data.$data;
            }

            return {
                ...data,
                type: TokenSetType.Person
            }
        } else {
            throw new Error('Failed to refresh token');
        }
    }
}
