import axios from 'axios';
import { serialize } from './common';
import { Graph } from './graph';
import { IntegrationTokenSet, PersonTokenSet, TokenSetType } from './types';
import { User } from './user';
import { Auth } from './user/auth';

export * from './types';

export type EdlinkConfig = {
    version?: number;
    client_id: string;
    client_secret: string;
};

export class Edlink {
    version: number;
    client_id: string;
    client_secret: string;

    public auth: Auth;

    constructor(config: EdlinkConfig) {
        Edlink.validate(config);
        // Assign config to class
        this.version = config.version ?? 2;
        this.client_id = config.client_id;
        this.client_secret = config.client_secret;
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

    public use(token_set: PersonTokenSet | IntegrationTokenSet): User | Graph {
        if (token_set.type === TokenSetType.Person) {
            return new User(this, token_set);
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
     * Check the status of the Edlink API
     */
    static async up() {
        const response = await axios.get('https://ed.link/api/up');
        return response.data;
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
        return `https://ed.link/sso/login?${serialize(params)}`;
    }
}
