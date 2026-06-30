import { Edlink } from '..';
// import { serialize } from '../common';
import { deepDefaults } from '../utils';
import { RequestOptions, TokenSet, TokenSetType } from './common';

export type RequestConfig = {
    url: string;
    method: string;
    headers?: Record<string, string>;
    data?: any;
}

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
    public edlink: Edlink;

    constructor(edlink: Edlink, token_set: TokenSet) {
        // Assign config
        this.token_set = token_set;
        this.version = edlink.version;
        this.api = token_set.type === TokenSetType.Integration ? 'graph' : 'my';
        this.edlink = edlink;
    }

    async request<T>(
        config: string | RequestConfig,
        options: RequestOptions = {},
        raw = false
    ): Promise<T> {
        const defaults: Record<string, any> = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        };
        let req: Request;
        let url: string;
        // Format options into request params
        const formatted_options = this.formatParams(options);
        // If config is a string, set the url
        if (typeof config === 'string') {
            url = config;
        } else {
            url = config.url;
        }

        // Set url
        const formattedUrl = new URL(url.startsWith('http')
        ? url
        : `https://ed.link/api/v${this.version}/${this.api}${url}`);

        // Add formatted options to the URL
        for (const [key, value] of Object.entries(formatted_options)) {
            formattedUrl.searchParams.append(key, value);
        }

        // Set url
        defaults.url = formattedUrl.toString();
        // Set access token
        defaults.headers['Authorization'] = `Bearer ${this.token_set.access_token}`;

        if (typeof config === 'string') {
            req = new Request(formattedUrl, defaults);
        } else {
            // Set missing defaults
            if (config.data !== undefined && config.data !== null) {
                defaults.body = JSON.stringify(config.data);
                defaults.headers['Content-Type'] = 'application/json';
            }
            // Merge defaults
            deepDefaults(config, defaults);
            // Set url
            config.url = formattedUrl.toString();
            // Create request
            req = new Request(config.url, config);
        }

        // Check if the token needs to be refreshed if this is a person token set.
        if (this.token_set.type === TokenSetType.Person && this.token_set.refresh_token && this.requiresTokenRefresh()) {
            // do the token refresh
            const { access_token, refresh_token } = await this.edlink.auth.refresh(this.token_set.refresh_token!)
                .catch(() => {
                    throw new EdlinkError({
                        message: 'Failed to refresh token.',
                        status: 400,
                        code: 'BAD_REQUEST'
                    });
                });

            // update the tokenset
            this.token_set.access_token = access_token;
            this.token_set.refresh_token = refresh_token;
            this.token_set.expiration_date = new Date(Date.now() + 3600 * 1000);
        }
        // Make request
        const response = await fetch(req);
        const data = await response.json();

        if (data.$warnings) {
            if (this.edlink.log_level === 'debug') {
                for (const warning of data.$warnings) {
                    console.warn(`Edlink API Warning: ${warning.code} ${warning.message}`);
                }
            }
        }

        if (data.$errors) {
            if (this.edlink.log_level === 'debug') {
                for (const error of data.$errors) {
                    console.warn(`Edlink API Error: ${error.code} ${error.message}`);
                }
            }
            throw new EdlinkError({
                ...data.$errors[0],
                status: response.status,
                errors: data.$errors.slice(1)
            });
        }
        
        return raw ? data : data.$data;
    }

    async *paginate<T>(
        config: string | RequestConfig,
        options: Record<string, any> = {},
        until?: (item: T) => boolean,
        formatter?: (raw: any) => T
    ): AsyncGenerator<T> {
        let next = null;
        let data: T[] = [];
        let remaining = options.limit;

        do {
            if (next) {
                if (typeof config === 'string') {
                    config = next;
                } else {
                    config.url = next;
                }
            }

            const response: { $data: T[]; $next?: string } = await this.request(
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
    
    public formatParams(params: RequestOptions): Record<string, any> {
        const formatted: {
            $idempotency?: string;
            $filter?: string;
            $expand?: string;
            $properties?: string;
        } & Record<string, any> = {};
    
        const mappings: Record<string, string | { prop: string; mod: (value: any) => any }> = {
            idempotency: '$idempotency',
            filter: { prop: '$filter', mod: JSON.stringify },
            properties: { prop: '$properties', mod: (value: string[]) => value.join(',') },
            expand: { prop: '$expand', mod: (value: string[]) => value.join(',') },
        }

        for (const [key, value] of Object.entries(params)) {
            const mapping = mappings[key];

            if (mapping) {
                if (typeof mapping === 'string') {
                    formatted[mapping] = value;
                } else {
                    const { prop, mod } = mapping;
                    formatted[prop] = mod(value);
                }
            } else {
                formatted[key] = value;
            }
        }

        return formatted;
    }
}
