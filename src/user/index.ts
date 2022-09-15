import { AxiosError } from 'axios';
import { Edlink } from '..';
import { Agents } from '../common/agents';
import { Classes } from '../common/classes';
import { Districts } from '../common/districts';
import { Schools } from '../common/schools';
import { Sections } from '../common/sections';
import { BearerTokenAPI, TokenSet } from '../types';
import { My } from './my';
import { Auth } from './auth';

export class User extends BearerTokenAPI {
    public my: My;
    public districts: Districts;
    public schools: Schools;
    public classes: Classes;
    public sections: Sections;
    public agents: Agents;

    private auth: Auth;

    constructor(config: Edlink & { token_set: TokenSet }) {
        super({
            token_set: config.token_set,
            version: config.version,
            api: 'my'
        });

        this.auth = new Auth(config);

        // On 401 failure, refresh token set and retry
        if (config.token_set.refresh_token) {
            this.axios.interceptors.response.use(
                response => response,
                (error: AxiosError) => {
                    if (error.response?.status === 401) {
                        this.auth.refresh(config.token_set.refresh_token!).then(token_set => {
                            if (!error.config.headers) {
                                error.config.headers = {};
                            }
                            error.config.headers['Authorization'] = `Bearer ${token_set.access_token}`;
                            return this.axios.request(error.config);
                        });
                    }
                    return Promise.reject(error);
                }
            );
        }

        // Do some simple validation
        if (!config.client_secret) {
            throw new Error('Missing client_secret.');
        } else if (!config.client_id) {
            throw new Error('Missing client_id.');
        }

        // Buid API interfaces
        this.my = new My(this);
        this.districts = new Districts(this);
        this.schools = new Schools(this);
        this.classes = new Classes(this);
        this.sections = new Sections(this);
        this.agents = new Agents(this);
    }
}
