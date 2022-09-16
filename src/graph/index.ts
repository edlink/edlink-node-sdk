import { Edlink } from '..';
import { BearerTokenAPI, TokenSet } from '../types';
import { Agents, Classes, Courses, Districts, Enrollments, People, Schools, Sections, Sessions } from '../common';

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

    constructor(edlink: Edlink, token_set: TokenSet) {
        // Assign config to class
        super(edlink, token_set);

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
