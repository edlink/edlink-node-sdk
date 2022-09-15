import { Section } from '..';
import { BearerTokenAPI, Enrollment, Person } from '../types';

export class Sections {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>('/sections', options, options.limit);
    }

    fetch(section_id: string, options: { access_token?: string } = {}): Promise<Section> {
        return this.api.request(`/sections/${section_id}`, options);
    }

    async *listEnrollments(
        section_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/sections/${section_id}/enrollments`, options, options.limit);
    }

    async *listPeople(
        section_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/people`, options, options.limit);
    }

    async *listTeachers(
        section_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/teachers`, options, options.limit);
    }

    async *listStudents(
        section_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/students`, options, options.limit);
    }
}
