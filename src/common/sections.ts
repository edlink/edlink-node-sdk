import { Section } from '..';
import { BearerTokenAPI, Enrollment, Person, RequestOptions } from '../types';

export class Sections {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all sections.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptions = {}): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>('/sections', options);
    }

    /**
     * Fetch a single section by ID.
     * @param section_id The UUID of the section
     * @returns
     */
    fetch(section_id: string, options: RequestOptions = {}): Promise<Section> {
        return this.api.request(`/sections/${section_id}`, {}, options);
    }

    /**
     * Paginates through all enrollments in a section.
     * @param section_id The UUID of the section
     * @param options Provide a `limit` for the max number of results
     */
    async *listEnrollments(section_id: string, options: RequestOptions = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/sections/${section_id}/enrollments`, options);
    }

    /**
     * Paginates through all people in a section.
     * @param section_id The UUID of the section
     * @param options Provide a `limit` for the max number of results
     */
    async *listPeople(section_id: string, options: RequestOptions = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/people`, options);
    }

    /**
     * Paginates through all teachers in a section.
     * @param section_id The UUID of the section
     * @param options Provide a `limit` for the max number of results
     */
    async *listTeachers(section_id: string, options: RequestOptions = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/teachers`, options);
    }

    /**
     * Paginates through all students in a section.
     * @param section_id The UUID of the section
     * @param options Provide a `limit` for the max number of results
     */
    async *listStudents(section_id: string, options: RequestOptions = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/sections/${section_id}/students`, options);
    }
}
