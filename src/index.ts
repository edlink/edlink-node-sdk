import { serialize } from './common';
import { Audit } from './audit';
import { Graph } from './graph';
import { ApplicationTokenSet, IntegrationTokenSet, PersonTokenSet, TokenSetType } from './types';
import { User } from './user';
import { Auth } from './user/auth';

export * from './types';
export { Audit, Graph, User };

const DEFAULT_EDLINK_URL = 'https://ed.link';

export type EdlinkConfig = {
    version?: number;
    client_id: string;
    client_secret: string;
    log_level?: 'debug' | 'silent';
    /**
     * Optional Edlink origin for this instance, e.g. `https://staging.ed.link` or `http://127.0.0.1:8787`.
     * First non-empty value wins: this field, then `ALTERNATE_EDLINK_URL`, then `https://ed.link`.
     * A trailing slash is stripped. Graph, User, Audit, login, token exchange, and `up()` all use the result.
     */
    base_url?: string;
};

export class Edlink {
    version: number;
    client_id: string;
    client_secret: string;
    log_level: 'debug' | 'silent' = 'debug';
    /**
     * Resolved origin after applying `base_url`, `ALTERNATE_EDLINK_URL`, and the public default.
     */
    readonly base_url: string;

    public auth: Auth;

    constructor(config: EdlinkConfig) {
        Edlink.validate(config);
        // Assign config to class
        this.version = config.version ?? 2;
        this.client_id = config.client_id;
        this.client_secret = config.client_secret;
        this.log_level = config.log_level ?? 'debug';
        this.base_url = (config.base_url || process.env.ALTERNATE_EDLINK_URL || DEFAULT_EDLINK_URL).replace(/\/$/, '');
        // Build API interfaces
        this.auth = new Auth(this);
    }

    /**
     * Initialize an instance of the Edlink Graph API with a token set.
     * @param token_set The TokenSet used to authenticate the request
     * @returns {Graph} An instance of the Edlink Graph API interface using the provided TokenSet
     */
    public use(token_set: IntegrationTokenSet): Graph;
    /**
     * Initialize an instance of the Edlink User API with a token set.
     * @param token_set The TokenSet used to authenticate the request
     * @returns {User} An instance of the Edlink User API interface using the provided TokenSet
     */
    public use(token_set: PersonTokenSet): User;
    /**
     * Initialize an instance of the Edlink Audit API with an application token set.
     * @param token_set The ApplicationTokenSet used to authenticate the request
     * @returns {Audit} An instance of the Edlink Audit API interface using the provided TokenSet
     */
    public use(token_set: ApplicationTokenSet): Audit;

    public use(token_set: PersonTokenSet | IntegrationTokenSet | ApplicationTokenSet): User | Graph | Audit {
        if (token_set.type === TokenSetType.Person) {
            return new User(this, token_set);
        } else if (token_set.type === TokenSetType.Application) {
            return new Audit(this, token_set);
        } else {
            return new Graph(this, token_set);
        }
    }

    private static validate(config: EdlinkConfig) {
        // Do some simple validation
        if (!config.client_secret) {
            throw new Error('Missing client_secret.');
        } else if (!config.client_id) {
            throw new Error('Missing client_id.');
        }
    }

    /**
     * Check the status of this instance's Edlink API
     */
    async up() {
        return Edlink.check(this.base_url);
    }

    /**
     * Check the status of the Edlink API
     */
    static async up() {
        return Edlink.check((process.env.ALTERNATE_EDLINK_URL || DEFAULT_EDLINK_URL).replace(/\/$/, ''));
    }

    private static async check(base_url: string) {
        const response = await fetch(`${base_url}/api/up`);
        if (!response.ok) {
            throw new Error('Edlink API is down.');
        } else {
            return response.text();
        }
    }

    /**
     * Generate a login URL for a user to authenticate with via Edlink.
     * @param config A config object containing the `redirect_uri` and `state` parameters
     * @returns The URL to redirect the user to in order to authenticate
     */
    loginUrl({ redirect_uri, state }: { redirect_uri?: string; state?: string } = {}) {
        const params = {
            client_id: this.client_id,
            redirect_uri: redirect_uri,
            state: state
        };
        return `${this.base_url}/sso/login?${serialize(params)}`;
    }
}
