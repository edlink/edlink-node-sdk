import axios from 'axios';
import { Graph } from './graph';
import { IntegrationTokenSet, PersonTokenSet, TokenSetType } from './types';
import { User } from './user';
import { Auth } from './user/auth';

export {
    District,
    School,
    Session,
    Course,
    Class,
    Section,
    Person,
    Enrollment,
    Agent,
    TokenSet,
    PersonTokenSet,
    IntegrationTokenSet,
    TokenSetType
} from './types';

function serialize(object: Record<string, string | undefined | null>) {
    const str = [];

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    }

    return str.join('&');
}

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

    public use(token_set: IntegrationTokenSet): Graph;
    public use(token_set: PersonTokenSet): User;

    public use(token_set: any): any {
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

    static async up() {
        const response = await axios.get('https://ed.link/api/up');
        return response.data;
    }

    loginUrl({ redirect_uri, state }: { redirect_uri?: string; state?: string } = {}) {
        const params = {
            client_id: this.client_id,
            redirect_uri: redirect_uri,
            state: state
        };
        return `https://ed.link/api/authentication/login?${serialize(params)}`;
    }
}
