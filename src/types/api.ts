import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';
import { Edlink } from '..';
import { serialize } from '../common';
import { RequestOptions, TokenSet, TokenSetType } from './common';

class EdlinkError extends Error {
    status?: number;
    code?: string;
    errors: any[];

    constructor({ message, status, code, errors = [] }: { message: string; status: number; code?: string; errors?: any[] }) {
        super(message);
        this.status = status;
        this.code = code;
        this.errors = errors;
    }
}

export class BearerTokenAPI {
    private token_set: TokenSet;
    private version: number;
    private api: 'graph' | 'my';
    public axios: AxiosStatic;
    public edlink: Edlink;

    constructor(edlink: Edlink, token_set: TokenSet) {
        // Assign config
        this.token_set = token_set;
        this.version = edlink.version;
        this.api = token_set.type === TokenSetType.Integration ? 'graph' : 'my';
        this.axios = axios;
        this.edlink = edlink;
    }

    async request<T>(
        endpoint: string,
        config: AxiosRequestConfig = {},
        options: RequestOptions = {},
        raw = false
    ): Promise<T> {
        // Check if the token needs to be refreshed if this is a person token set.
        if (this.token_set.type === TokenSetType.Person && this.token_set.refresh_token && this.requiresTokenRefresh()) {
            // do the token refresh
            const { access_token, refresh_token } = await this.edlink.auth.refresh(this.token_set.refresh_token!)
                .catch((error) => {
                    throw new EdlinkError({
                        message: 'Failed to refresh token.',
                        status: error.response.status,
                        code: 'BAD_REQUEST'
                    });
                });

            // update the tokenset
            this.token_set.access_token = access_token;
            this.token_set.refresh_token = refresh_token;
            this.token_set.expiration_date = new Date(Date.now() + 3600 * 1000);
        }
        const formatted_options: { $filter?: string; $expand?: string[] } = {};
        if (options.filter) {
            formatted_options['$filter'] = JSON.stringify(options.filter);
        }
        if (options.expand) {
            formatted_options['$expand'] = options.expand;
        }
        // Set url
        config.url = endpoint.startsWith('http')
            ? endpoint
            : `https://ed.link/api/v${this.version}/${this.api}${endpoint}?${serialize(formatted_options)}`;
        // Initialize headers
        if (!config.headers) {
            config.headers = {};
        }
        // Set access token
        config.headers['Authorization'] = `Bearer ${this.token_set.access_token}`;
        // Determine request method
        config.method = config.method ?? 'GET';
        // Make request
        const response = await this.axios.request(config).catch(error => {
            // TODO: Some custom error handling?
            if (error.response.data && error.response.data.$errors && error.response.data.$errors.length > 0) {
                const $errors = error.response.data.$errors;
                for (const _error of $errors) {
                    console.warn(`Edlink API Error: ${_error.code} ${_error.message}`);
                }
                if ($errors.some((it: EdlinkError) => it.code === 'INVALID_TOKEN')) {
                    console.warn('Edlink SDK Warning: Missing person refresh token - if you recieved a 401 error this may be the cause.');
                }
                throw new EdlinkError({
                    ...$errors[0],
                    status: error.response.status,
                    errors: $errors.slice(1)
                });
            }
            throw error;
        });
        if (response.data.$warnings) {
            for (const warning of response.data.$warnings) {
                console.warn(`Edlink API Warning: ${warning.code} ${warning.message}`);
            }
        }
        return raw ? response.data : response.data.$data;
    }

    async *paginate<T>(
        endpoint: string,
        options: Record<string, any> = {},
        config: Record<string, any> = {},
        until?: (item: T) => boolean,
        formatter?: (raw: any) => T
    ): AsyncGenerator<T> {
        let next = null;
        let data: T[] = [];
        let remaining = options.limit;

        do {
            const response: { $data: T[]; $next?: string } = await this.request(
                next ?? endpoint,
                config,
                options,
                true
            );
            next = response.$next;
            data = response.$data;
            for (const item of data) {
                const formatted = formatter ? formatter(item) : item;
                if ((until && until(formatted)) || (remaining !== undefined && remaining <= 0)) {
                    return;
                }
                yield formatted;
                if (remaining) {
                    remaining--;
                }
            }
        } while (next && (remaining === undefined || remaining > 0));
    }

    private requiresTokenRefresh(tokens: TokenSet = this.token_set): boolean {
        if (tokens.type === TokenSetType.Integration) {
            return false;
        }

        if (tokens.expiration_date == null || tokens.access_token == null) {
            return true;
        }

        const current_date = new Date();
        const expiration_date = new Date(tokens.expiration_date);

        // Set the expiration date to 5 minutes earlier for safety.
        expiration_date.setMinutes(expiration_date.getMinutes() - 5);

        return current_date > expiration_date;
    }
}
