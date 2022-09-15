import { Person } from '..';
import { Agent, BearerTokenAPI, Class, District, Enrollment, School, Section } from '../types';

export class People {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>('/people', options, options.limit);
    }

    fetch(person_id: string, options: { access_token?: string } = {}): Promise<Person> {
        return this.api.request(`/people/${person_id}`, options);
    }

    async *listEnrollments(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/people/${person_id}/enrollments`, options, options.limit);
    }

    async *listDistricts(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<District> {
        yield* this.api.paginate<District>(`/people/${person_id}/districts`, options, options.limit);
    }

    async *listSchools(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<School> {
        yield* this.api.paginate<School>(`/people/${person_id}/schools`, options, options.limit);
    }

    async *listClasses(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/people/${person_id}/classes`, options, options.limit);
    }

    async *listSections(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/people/${person_id}/sections`, options, options.limit);
    }

    async *listAgents(
        person_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>(`/people/${person_id}/agents`, options, options.limit);
    }
}
