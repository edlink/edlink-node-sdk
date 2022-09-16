import dotenv from 'dotenv';
dotenv.config();

import { Edlink, Class, Section, Enrollment, Session, Course, Person, TokenSetType, IntegrationTokenSet } from '../src';

const integration_access_token = process.env.INTEGRATION_ACCESS_TOKEN!;

const token_set: IntegrationTokenSet = {
    access_token: integration_access_token,
    type: TokenSetType.Integration
};

const edlink = new Edlink({
    version: 2,
    client_id: 'e6504765-238a-418f-871a-2e789c1f26f5',
    client_secret: process.env.CLIENT_SECRET!
});

// jest.setTimeout(10000);

describe('User', () => {
    it('auth', async () => {
        // const grant = await edlink.auth.grant({
        //     code: process.env.CODE!,
        //     redirect_uri: 'https://oauthdebugger.com/debug'
        // });

        // Attempt to refresh a token
        const refresh = await edlink.auth.refresh(process.env.REFRESH_TOKEN!);
        expect(refresh.access_token).toBeDefined();

        // List users classes (fetching 1)
        for await (const _class of edlink.use(refresh).classes.list({ limit: 1 })) {
            // List assignments for that class (fetching 1)
            for await (const assignment of edlink.use(refresh).assignments.list(_class.id, { limit: 1 })) {
                // List submissions for that assignment (fetching 1)
                for await (const submission of edlink.use(refresh).submissions.list(_class.id, assignment.id, { limit: 1 })) {
                    // Generate a new grade for that submission and attempt to update it
                    const new_grade = Math.floor(Math.random() * 100);
                    const new_submissions = await edlink.use(refresh).submissions.update(_class.id, assignment.id, submission.id, {grade_points: new_grade} );
                    expect(new_submissions.grade_points).toBe(new_grade);
                }
            }
        }

        const profile = await edlink.use(refresh).my.profile();
        const integration = await edlink.use(refresh).my.integration();
        expect(profile).toBeDefined();
        expect(integration).toBeDefined();
    });
});

describe('Graph', () => {
    it('/api/up', async () => {
        expect(await Edlink.up()).toBeTruthy();
        console.log(edlink.loginUrl);
    });

    it('/api/v2/graph/classes', async () => {
        for await (const school of edlink.use(token_set).classes.list({ limit: 1 })) {
            console.log(school);
        }
    });

    // Districts

    it('/api/v2/graph/districts', async () => {
        for await (const district of edlink.use(token_set).districts.list()) {
            expect(district).toBeDefined();
        }
    });

    it('/api/v2/graph/districts/:district_id', async () => {
        for await (const _district of edlink.use(token_set).districts.list({ limit: 1 })) {
            const district = await edlink.use(token_set).districts.fetch(_district.id);
            expect(district).toBeDefined();
            expect(district).toStrictEqual(_district);
        }
    });

    // Schools

    it('/api/v2/graph/schools', async () => {
        for await (const school of edlink.use(token_set).schools.list()) {
            expect(school).toBeDefined();
        }
    });

    it('/api/v2/graph/schools/:school_id', async () => {
        for await (const _school of edlink.use(token_set).schools.list({ limit: 1 })) {
            const school = await edlink.use(token_set).schools.fetch(_school.id);
            expect(school).toBeDefined();
            expect(school).toStrictEqual(_school);
        }
    });

    // Sessions

    it('/api/v2/graph/sessions', async () => {
        const data: Map<string, Session> = new Map();
        for await (const session of edlink.use(token_set).sessions.list()) {
            data.set(session.id, session);
        }
        console.log('section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/sessions/:session_id', async () => {
        for await (const _session of edlink.use(token_set).sessions.list({ limit: 1 })) {
            const session = await edlink.use(token_set).sessions.fetch(_session.id);
            expect(session).toBeDefined();
            expect(session).toStrictEqual(_session);
        }
    });

    // Courses

    it('/api/v2/graph/courses', async () => {
        const data: Map<string, Course> = new Map();
        for await (const course of edlink.use(token_set).courses.list()) {
            data.set(course.id, course);
        }
        console.log('course', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/courses/:course_id', async () => {
        for await (const _course of edlink.use(token_set).courses.list({ limit: 1 })) {
            const course = await edlink.use(token_set).courses.fetch(_course.id);
            expect(course).toBeDefined();
            expect(course).toStrictEqual(_course);
        }
    });

    it('/api/v2/graph/courses/:course_id/classes', async () => {
        for await (const _course of edlink.use(token_set).courses.list({ limit: 1 })) {
            for await (const _class of edlink.use(token_set).courses.listClasses(_course.id, { limit: 1 })) {
                const _class2 = await edlink.use(token_set).classes.fetch(_class.id);
                expect(_class).toBeDefined();
                expect(_class).toStrictEqual(_class2);
            }
        }
    });

    // Classes

    it('/api/v2/graph/classes', async () => {
        const data: Map<string, Class> = new Map();
        for await (const _class of edlink.use(token_set).classes.list()) {
            data.set(_class.id, _class);
        }
        console.log('class', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/classes/:class_id/sections', async () => {
        const data: Map<string, Section> = new Map();
        for await (const _class of edlink.use(token_set).classes.list({ limit: 1 })) {
            for await (const section of edlink.use(token_set).classes.listSections(_class.id)) {
                data.set(section.id, section);
            }
        }
        console.log('class/section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/classes/:class_id/enrollments', async () => {
        const data: Map<string, Enrollment> = new Map();
        for await (const _class of edlink.use(token_set).classes.list({ limit: 1 })) {
            for await (const enrollment of edlink.use(token_set).classes.listEnrollments(_class.id)) {
                data.set(enrollment.id, enrollment);
            }
        }
        console.log('class/enrollment', Array.from(data.entries())[0]);
    });

    // it('/api/v2/graph/classes/:class_id/assignments', async () => {
    //     const data: Map<string, Assignment> = new Map();
    //     for await (const assignment of edlink.use(token_set).classes.listAssignments('3e6fd159-0c1a-42ae-9b75-334d789b8d20')) {
    //         data.set(assignment.id, assignment);
    //     }
    //     console.log(data.entries());
    //     edlink.use(token_set).classes.createAssignment('3e6fd159-0c1a-42ae-9b75-334d789b8d20', { name: 'Test Assignment', description: 'This is a test assignment', due_date: new Date() });
    // });

    // Sections

    it('/api/v2/graph/sections', async () => {
        const data: Map<string, Section> = new Map();
        for await (const section of edlink.use(token_set).sections.list()) {
            data.set(section.id, section);
        }
        console.log('section', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/sections/:section_id', async () => {
        for await (const _section of edlink.use(token_set).sections.list({ limit: 1 })) {
            const section = await edlink.use(token_set).sections.fetch(_section.id);
            expect(section).toBeDefined();
            expect(section).toStrictEqual(_section);
        }
    });

    // People

    it('/api/v2/graph/people', async () => {
        const data: Map<string, Person> = new Map();
        for await (const person of edlink.use(token_set).people.list()) {
            data.set(person.id, person);
        }
        console.log('person', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/people/:person_id', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            const person = await edlink.use(token_set).people.fetch(_person.id);
            expect(person).toBeDefined();
            expect(person).toStrictEqual(_person);
        }
    });

    it('/api/v2/graph/people/:person_id/enrollments', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const enrollment of edlink.use(token_set).people.listEnrollments(_person.id, { limit: 1 })) {
                const enrollment2 = await edlink.use(token_set).enrollments.fetch(enrollment.id);
                expect(enrollment).toBeDefined();
                expect(enrollment).toStrictEqual(enrollment2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/districts', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const district of edlink.use(token_set).people.listDistricts(_person.id, { limit: 1 })) {
                const district2 = await edlink.use(token_set).districts.fetch(district.id);
                expect(district).toBeDefined();
                expect(district).toStrictEqual(district2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/schools', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const school of edlink.use(token_set).people.listSchools(_person.id, { limit: 1 })) {
                const school2 = await edlink.use(token_set).schools.fetch(school.id);
                expect(school).toBeDefined();
                expect(school).toStrictEqual(school2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/classes', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const _class of edlink.use(token_set).people.listClasses(_person.id, { limit: 1 })) {
                const _class2 = await edlink.use(token_set).classes.fetch(_class.id);
                expect(_class).toBeDefined();
                expect(_class).toStrictEqual(_class2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/sections', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const section of edlink.use(token_set).people.listSections(_person.id, { limit: 1 })) {
                const section2 = await edlink.use(token_set).sections.fetch(section.id);
                expect(section).toBeDefined();
                expect(section).toStrictEqual(section2);
            }
        }
    });

    it('/api/v2/graph/people/:person_id/agents', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            for await (const agent of edlink.use(token_set).people.listAgents(_person.id, { limit: 1 })) {
                const agent2 = await edlink.use(token_set).agents.fetch(agent.id);
                expect(agent).toBeDefined();
                expect(agent).toStrictEqual(agent2);
            }
        }
    });

    // Enrollments

    // Agents
});
