import { Section } from '..';
import { BearerTokenAPI, Enrollment, Person } from '../types';

export class Sections {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number;} = {}): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>('/sections', options);
    }

    fetch(section_id: string): Promise<Section> {
        return this.api.request(`/sections/${section_id}`);
    }

    async *listEnrollments(
        section_id: string,
        options: { limit?: number;} = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/sections/${section_id}/enrollments`, options);
    }

    async *listPeople(
        section_id: string,
        options: { limit?: number;} = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/people`, options);
    }

    async *listTeachers(
        section_id: string,
        options: { limit?: number;} = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/teachers`, options);
    }

    async *listStudents(
        section_id: string,
        options: { limit?: number;} = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/students`, options);
    }
}
