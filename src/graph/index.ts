import { Edlink } from "..";
import { BearerTokenAPI, TokenSet } from "../types";
import { Agents } from "../common/agents";
import { Classes } from "../common/classes";
import { Courses } from "../common/courses";
import { Districts } from "../common/districts";
import { Enrollments } from "../common/enrollments";
import { People } from "../common/people";
import { Schools } from "../common/schools";
import { Sections } from "../common/sections";
import { Sessions } from "../common/sessions";

export class Graph extends BearerTokenAPI {
    public districts: Districts;
    public schools: Schools;
    public sessions: Sessions;
    public courses: Courses;
    public classes: Classes;
    public sections: Sections;
    public people: People;
    public enrollments: Enrollments;
    public agents: Agents;

    constructor(config: Edlink & { token_set: TokenSet }) {
        // Do some validation
        if (!config.token_set || !config.token_set.access_token) {
            throw new Error('Missing integration_access_token. Required for use of Graph API.');
        }
        // Assign config to class
        super({
            token_set: config.token_set,
            version: config.version,
            api: 'graph',
        });

        // Build API interfaces
        this.districts = new Districts(this);
        this.schools = new Schools(this);
        this.sessions = new Sessions(this);
        this.courses = new Courses(this);
        this.classes = new Classes(this);
        this.sections = new Sections(this);
        this.people = new People(this);
        this.enrollments = new Enrollments(this);
        this.agents = new Agents(this);
    }
}