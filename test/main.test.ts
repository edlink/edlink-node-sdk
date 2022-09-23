import dotenv from 'dotenv';
dotenv.config();

import {
    Edlink,
    Class,
    Section,
    Enrollment,
    Session,
    Course,
    Person,
    TokenSetType,
    IntegrationTokenSet,
    Agent,
    PersonTokenSet
} from '../src';

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
                for await (const submission of edlink
                    .use(refresh)
                    .submissions.list(_class.id, assignment.id, { limit: 1 })) {
                    // Generate a new grade for that submission and attempt to update it
                    const new_grade = Math.floor(Math.random() * 100);
                    const new_submissions = await edlink
                        .use(refresh)
                        .submissions.update(_class.id, assignment.id, submission.id, { grade_points: new_grade });
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

describe.skip('Error Handling', () => {
    it('should throw an error when the token is invalid', async () => {
        const invalid_token_set: PersonTokenSet = {
            access_token: 'invalid',
            refresh_token: 'invalid',
            type: TokenSetType.Person
        };
        await expect(edlink.use(invalid_token_set).my.profile()).rejects.toThrow(
            `A valid v4 UUID is expected for parameter 'class_id'.`
        );
    });

    it('should throw error with an invalid id', async () => {
        const refresh = await edlink.auth.refresh(process.env.REFRESH_TOKEN!);
        await expect(edlink.use(refresh).classes.fetch('invalid')).rejects.toThrow(
            `A valid v4 UUID is expected for parameter 'class_id'.`
        );
    });

    it('[User] should throw error with a not found id', async () => {
        const refresh = await edlink.auth.refresh(process.env.REFRESH_TOKEN!);
        await expect(edlink.use(refresh).schools.fetch('14e9c28a-aa22-4a4b-b54b-8c6df61701fe')).rejects.toThrow(
            'School with id 14e9c28a-aa22-4a4b-b54b-8c6df61701fe not found for this person.'
        );
    });

    it('[Graph] should throw error with a not found id', async () => {
        await expect(edlink.use(token_set).schools.fetch('14e9c28a-aa22-4a4b-b54b-8c6df61701fe')).rejects.toThrow(
            'School with id 14e9c28a-aa22-4a4b-b54b-8c6df61701fe not found for this integration.'
        );

        edlink.use(token_set).schools.fetch('14e9c28a-aa22-4a4b-b54b-8c6df61701fe').catch((error) => {
            console.log(error.message); // School with id 14e9c28a-aa22-4a4b-b54b-8c6df61701fe not found for this integration.
            console.log(error.code); // NOT_FOUND
            console.log(error.status); // 400
        });
    });
});

describe('Graph', () => {
    it('/api/up', async () => {
        expect(await Edlink.up()).toBeTruthy();
        console.log(edlink.loginUrl({ redirect_uri: 'https://oauthdebugger.com/debug' }));
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

    it('/api/v2/graph/districts/:district_id/administrators', async () => {
        for await (const district of edlink.use(token_set).districts.list({ limit: 1 })) {
            for await (const admin of edlink.use(token_set).districts.listAdministrators(district.id, { limit: 1 })) {
                console.log('ADMIN HERE', admin);
                expect(admin).toBeDefined();
            }
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
        try {
            for await (const person of edlink.use(token_set).people.list({
                filter: {
                    first_name: [
                        { operator: 'starts with', value: 'Lil' }
                    ]
                }
            })) {
                data.set(person.id, person);
            }
            console.log('person', Array.from(data.entries()));
        } catch(error) {
            console.log('ERROR', error);
        }
    });

    it('/api/v2/graph/people/:person_id', async () => {
        for await (const _person of edlink.use(token_set).people.list({ limit: 1 })) {
            const person = await edlink.use(token_set).people.fetch(_person.id);
            expect(person).toBeDefined();
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

    it('/api/v2/graph/enrollments', async () => {
        const data: Map<string, Enrollment> = new Map();
        for await (const enrollment of edlink.use(token_set).enrollments.list()) {
            data.set(enrollment.id, enrollment);
        }
        console.log('enrollment', Array.from(data.entries())[0]);
    });

    it('/api/v2/graph/enrollments/:enrollment_id', async () => {
        for await (const enrollment of edlink.use(token_set).enrollments.list({ limit: 1 })) {
            const enrollment2 = await edlink.use(token_set).enrollments.fetch(enrollment.id);
            expect(enrollment).toBeDefined();
            expect(enrollment).toStrictEqual(enrollment2);
        }
    });

    // Agents
    // TODO: Need a source with agents

    it('/api/v2/graph/agents', async () => {
        const data: Map<string, Agent> = new Map();
        for await (const agent of edlink.use(token_set).agents.list()) {
            data.set(agent.id, agent);
        }
        console.log('agent', Array.from(data.entries())[0]);
    });

    // it('/api/v2/graph/agents/:agent_id', async () => {
    //     for await (const agent of edlink.use(token_set).agents.list({ limit: 1 })) {
    //         const agent2 = await edlink.use(token_set).agents.fetch(agent.id);
    //         expect(agent).toBeDefined();
    //         expect(agent).toStrictEqual(agent2);
    //     }
    // });
});
