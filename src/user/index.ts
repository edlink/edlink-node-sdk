import { Edlink } from '..';
import { Agents, Assignments, Categories, Classes, Districts, Schools, Sections, Submissions } from '../common';
import { BearerTokenAPI, TokenSet } from '../types';
import { My } from './my';

export class User extends BearerTokenAPI {
    public my: My;
    public districts: Districts;
    public schools: Schools;
    public classes: Classes;
    public sections: Sections;
    public agents: Agents;
    public categories: Categories;
    public assignments: Assignments;
    public submissions: Submissions;

    constructor(edlink: Edlink, token_set: TokenSet) {
        super(edlink, token_set);
        
        // Do some simple validation
        if (!edlink.client_secret) {
            throw new Error('Missing client_secret.');
        } else if (!edlink.client_id) {
            throw new Error('Missing client_id.');
        }

        // Buid API interfaces
        this.my = new My(this);
        this.districts = new Districts(this);
        this.schools = new Schools(this);
        this.classes = new Classes(this);
        this.sections = new Sections(this);
        this.agents = new Agents(this);
        this.categories = new Categories(this);
        this.assignments = new Assignments(this);
        this.submissions = new Submissions(this);
    }
}
