import { Person } from '..';
import { Agent, BearerTokenAPI, Class, District, Enrollment, School, Section } from '../types';

export class People {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>('/people', options);
    }

    fetch(person_id: string): Promise<Person> {
        return this.api.request(`/people/${person_id}`);
    }

    async *listEnrollments(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/people/${person_id}/enrollments`, options);
    }

    async *listDistricts(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<District> {
        yield* this.api.paginate<District>(`/people/${person_id}/districts`, options);
    }

    async *listSchools(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<School> {
        yield* this.api.paginate<School>(`/people/${person_id}/schools`, options);
    }

    async *listClasses(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/people/${person_id}/classes`, options);
    }

    async *listSections(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/people/${person_id}/sections`, options);
    }

    async *listAgents(
        person_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>(`/people/${person_id}/agents`, options);
    }
}
