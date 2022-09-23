import { Person } from '..';
import { Agent, BearerTokenAPI, Class, District, Enrollment, RequestOptions, School, Section } from '../types';

export class People {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all people.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptions = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>('/people', options);
    }

    /**
     * Fetches a single person by ID.
     * @param person_id The UUID of the person
     * @returns The requested person
     * @throws `404` If the person does not exist
     */
    fetch(person_id: string, options: RequestOptions = {}): Promise<Person> {
        return this.api.request(`/people/${person_id}`, {}, options);
    }

    /**
     * Paginates through all enrollments for a person.
     *
     * This is mostly useful for teachers when used via the User API
     * as the teacher can see all the student's enrollments.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listEnrollments(person_id: string, options: RequestOptions = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/people/${person_id}/enrollments`, options);
    }

    /**
     * Paginates through all districts for a person.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listDistricts(person_id: string, options: RequestOptions = {}): AsyncGenerator<District> {
        yield* this.api.paginate<District>(`/people/${person_id}/districts`, options);
    }

    /**
     * List the schools that a person is associated with.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listSchools(person_id: string, options: RequestOptions = {}): AsyncGenerator<School> {
        yield* this.api.paginate<School>(`/people/${person_id}/schools`, options);
    }

    /**
     * List all the classes that a person is associated with.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listClasses(person_id: string, options: RequestOptions = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/people/${person_id}/classes`, options);
    }

    /**
     * List all the sections that a person is associated with.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listSections(person_id: string, options: RequestOptions = {}): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/people/${person_id}/sections`, options);
    }

    /**
     * List all the agents that a person is associated with.
     * @param person_id The UUID of the person
     * @param options Provide a `limit` for the max number of results
     */
    async *listAgents(person_id: string, options: RequestOptions = {}): AsyncGenerator<Agent> {
        yield* this.api.paginate<Agent>(`/people/${person_id}/agents`, options);
    }
}
