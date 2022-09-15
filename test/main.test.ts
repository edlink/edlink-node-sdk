/**
 * @jest-environment node
 */
import { Edlink, Class, Section, Enrollment, Session, Course, Person, TokenSet } from '../dist';

// const integration_access_token = 'gaxuvdAlPrZghOTb0fRMB8D5bZCxB9OF';
const integration_access_token = 'DqJcD7jjAUtfbcWslmAzqDc8NurwnStk';
const token_set: TokenSet = {
    access_token: integration_access_token,
    token_type: 'Bearer'
}

const edlink = new Edlink({
    version: 2,
    client_id: 'e6504765-238a-418f-871a-2e789c1f26f5',
    client_secret: 'cTrOSedlDu6gtFCwqZxcShVstBcjUmVQy6dvmU3DKb8FL7Cl5YPuWBEHIPyfpzYH'
});

// jest.setTimeout(10000);

describe('User', () => {
    it('auth', async () => {
        const grant = await edlink.auth.grant('SdIsAsVPZRjmGaaBsZwFXdjMRRwyqPDu', {redirect_uri: 'https://oauthdebugger.com/debug'});
        console.log(grant);
        
        const refresh = await edlink.auth.refresh(grant.refresh_token);
        console.log(refresh);

        // for await (const _class of edlink.use(grant).user.classes.list({ limit: 1 })) {
        //     console.log(_class);
        // }

        // const grant = {
        //     access_token: 'd4bb1d79a3ebbbebb1fc9917feb71b7931d8d3e30da84d5249723477cb458909',
        //     refresh_token: '6c6db36f5c1c2a689d7c37dfe49366b019ac9fa208f5c349db801a039a35b68131ab2ee5a12d8776ecee4b8bb76a8118983e8b78ba640d898bed1a6770ac8955'
        // }
        
        const profile = await edlink.use(grant).user.my.profile();
        const integration = await edlink.use(grant).user.my.integration();
        console.log(profile);
        console.log(integration);
    });
});

describe('Graph', () => {
    it('/api/up', async () => {
        expect(await Edlink.up()).toBeTruthy();
        console.log(edlink.login_url);
    });

    it('/api/v2/graph/classes', async () => {
        for await (const school of edlink.use(token_set).graph.classes.list({ limit: 1 })) {
            console.log(school);
        }
    });

    // Districts

    it('/api/v2/graph/districts', async () => {
        for await (const district of edlink.use(token_set).graph.districts.list()) {
            expect(district).toBeDefined();
        }
    });

    it('/api/v2/graph/districts/:district_id', async () => {
        for await (const _district of edlink.use(token_set).graph.districts.list({ limit: 1 })) {
            const district = await edlink.use(token_set).graph.districts.fetch(_district.id);
            expect(district).toBeDefined();
            expect(district).toStrictEqual(_district);
        }
    });

    // Schools

    it('/api/v2/graph/schools', async () => {
        for await (const school of edlink.use(token_set).graph.schools.list()) {
            expect(school).toBeDefined();
        }
    });

    it('/api/v2/graph/schools/:school_id', async () => {
        for await (const _school of edlink.use(token_set).graph.schools.list({ limit: 1 })) {
            const school = await edlink.use(token_set).graph.schools.fetch(_school.id);
            expect(school).toBeDefined();
            expect(school).toStrictEqual(_school);
        }
    });

    // Sessions

    it('/api/v2/graph/sessions', async () => {
        const data: Map<string, Session> = new Map();
        for await (const session of edlink.use(token_set).graph.sessions.list()) {
            data.set(session.id, session);
        }
        console.log('section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/sessions/:session_id', async () => {
        for await (const _session of edlink.use(token_set).graph.sessions.list({ limit: 1 })) {
            const session = await edlink.use(token_set).graph.sessions.fetch(_session.id);
            expect(session).toBeDefined();
            expect(session).toStrictEqual(_session);
        }
    });

    // Courses

    it('/api/v2/graph/courses', async () => {
        const data: Map<string, Course> = new Map();
        for await (const course of edlink.use(token_set).graph.courses.list()) {
            data.set(course.id, course);
        }
        console.log('course', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/courses/:course_id', async () => {
        for await (const _course of edlink.use(token_set).graph.courses.list({ limit: 1 })) {
            const course = await edlink.use(token_set).graph.courses.fetch(_course.id);
            expect(course).toBeDefined();
            expect(course).toStrictEqual(_course);
        }
    });

    it('/api/v2/graph/courses/:course_id/classes', async () => {
        for await (const _course of edlink.use(token_set).graph.courses.list({ limit: 1 })) {
            for await (const _class of edlink.use(token_set).graph.courses.listClasses(_course.id, { limit: 1 })) {
                const _class2 = await edlink.use(token_set).graph.classes.fetch(_class.id);
                expect(_class).toBeDefined();
                expect(_class).toStrictEqual(_class2);
            }
        }
    });

    // Classes

    it('/api/v2/graph/classes', async () => {
        const data: Map<string, Class> = new Map();
        for await (const _class of edlink.use(token_set).graph.classes.list()) {
            data.set(_class.id, _class);
        }
        console.log('class', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/classes/:class_id/sections', async () => {
        const data: Map<string, Section> = new Map();
        for await (const _class of edlink.use(token_set).graph.classes.list({ limit: 1 })) {
            for await (const section of edlink.use(token_set).graph.classes.listSections(_class.id)) {
                data.set(section.id, section);
            }
        }
        console.log('class/section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/classes/:class_id/enrollments', async () => {
        const data: Map<string, Enrollment> = new Map();
        for await (const _class of edlink.use(token_set).graph.classes.list({ limit: 1 })) {
            for await (const enrollment of edlink.use(token_set).graph.classes.listEnrollments(_class.id)) {
                data.set(enrollment.id, enrollment);
            }
        }
        console.log('class/enrollment', Array.from(data.entries())[0]);
    });

    // it('/api/v2/graph/classes/:class_id/assignments', async () => {
    //     const data: Map<string, Assignment> = new Map();
    //     for await (const assignment of edlink.use(token_set).graph.classes.listAssignments('3e6fd159-0c1a-42ae-9b75-334d789b8d20')) {
    //         data.set(assignment.id, assignment);
    //     }
    //     console.log(data.entries());
    //     edlink.use(token_set).graph.classes.createAssignment('3e6fd159-0c1a-42ae-9b75-334d789b8d20', { name: 'Test Assignment', description: 'This is a test assignment', due_date: new Date() });
    // });

    // Sections

    it('/api/v2/graph/sections', async () => {
        const data: Map<string, Section> = new Map();
        for await (const section of edlink.use(token_set).graph.sections.list()) {
            data.set(section.id, section);
        }
        console.log('section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/sections/:section_id', async () => {
        for await (const _section of edlink.use(token_set).graph.sections.list({ limit: 1 })) {
            const section = await edlink.use(token_set).graph.sections.fetch(_section.id);
            expect(section).toBeDefined();
            expect(section).toStrictEqual(_section);
        }
    });

    // People

    it('/api/v2/graph/people', async () => {
        const data: Map<string, Person> = new Map();
        for await (const person of edlink.use(token_set).graph.people.list()) {
            data.set(person.id, person);
        }
        console.log('person', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/people/:person_id', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            const person = await edlink.use(token_set).graph.people.fetch(_person.id);
            expect(person).toBeDefined();
            expect(person).toStrictEqual(_person);
        }
    });

    it('/api/v2/graph/people/:person_id/enrollments', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const enrollment of edlink.use(token_set).graph.people.listEnrollments(_person.id, { limit: 1 })) {
                const enrollment2 = await edlink.use(token_set).graph.enrollments.fetch(enrollment.id);
                expect(enrollment).toBeDefined();
                expect(enrollment).toStrictEqual(enrollment2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/districts', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const district of edlink.use(token_set).graph.people.listDistricts(_person.id, { limit: 1 })) {
                const district2 = await edlink.use(token_set).graph.districts.fetch(district.id);
                expect(district).toBeDefined();
                expect(district).toStrictEqual(district2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/schools', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const school of edlink.use(token_set).graph.people.listSchools(_person.id, { limit: 1 })) {
                const school2 = await edlink.use(token_set).graph.schools.fetch(school.id);
                expect(school).toBeDefined();
                expect(school).toStrictEqual(school2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/classes', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const _class of edlink.use(token_set).graph.people.listClasses(_person.id, { limit: 1 })) {
                const _class2 = await edlink.use(token_set).graph.classes.fetch(_class.id);
                expect(_class).toBeDefined();
                expect(_class).toStrictEqual(_class2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/sections', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const section of edlink.use(token_set).graph.people.listSections(_person.id, { limit: 1 })) {
                const section2 = await edlink.use(token_set).graph.sections.fetch(section.id);
                expect(section).toBeDefined();
                expect(section).toStrictEqual(section2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/agents', async () => {
        for await (const _person of edlink.use(token_set).graph.people.list({ limit: 1 })) {
            for await (const agent of edlink.use(token_set).graph.people.listAgents(_person.id, { limit: 1 })) {
                const agent2 = await edlink.use(token_set).graph.agents.fetch(agent.id);
                expect(agent).toBeDefined();
                expect(agent).toStrictEqual(agent2);
            }
        }
    });

    // Enrollments

    // Agents
});
