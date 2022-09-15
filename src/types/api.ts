import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';
import { TokenSet } from './common';

export class BearerTokenAPI {
    private token_set: TokenSet;
    private version: number;
    private api: 'graph' | 'my';
    public axios: AxiosStatic;

    constructor(config: { token_set: TokenSet; version: number; api: 'graph' | 'my' }) {
        // Assign config
        this.token_set = config.token_set;
        this.version = config.version;
        this.api = config.api;
        this.axios = axios;
    }

    async request<T>(
        endpoint: string,
        config: AxiosRequestConfig & { access_token?: string } = {},
        raw = false
    ): Promise<T> {
        // Set url
        config.url = endpoint.startsWith('http')
            ? endpoint
            : `https://ed.link/api/v${this.version}/${this.api}${endpoint}`;
        // Initialize headers
        if (!config.headers) { config.headers = {}; }
        // Set access token
        config.headers['Authorization'] =
            config.headers['Authorization'] ?? `Bearer ${config.access_token ?? this.token_set.access_token}`;
        // Determine request method
        config.method = config.method ?? 'GET';
        // Make request
        const response = await this.axios.request(config).catch(error => {
            // TODO: Some custom error handling?
            throw error;
        });
        return raw ? response.data : response.data.$data;
    }

    async *paginate<T>(
        endpoint: string,
        config: Record<string, any> = {},
        limit?: number,
        until?: (item: T) => boolean,
        formatter?: (raw: any) => T
    ): AsyncGenerator<T> {
        let next = null;
        let data: T[] = [];
        let remaining = limit;

        do {
            const response: { $data: T[]; $next?: string } = await this.request(next ?? endpoint, config, true);
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
}
