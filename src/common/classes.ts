import { BearerTokenAPI, Class, Enrollment, Person, RequestOptionsGet, RequestOptionsPaging, Section } from '../types';

export class Classes {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all classes that the user has access to.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: { limit?: number } = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>('/classes', options);
    }

    /**
     * Fetches a single class by ID.
     * @param class_id The UUID of the class
     * @returns The requested class
     */
    fetch(class_id: string, options: RequestOptionsGet = {}): Promise<Class> {
        return this.api.request(`/classes/${class_id}`, {}, options);
    }

    /**
     * Paginates through all sections in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    async *listSections(class_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/classes/${class_id}/sections`, options);
    }

    /**
     * Paginates through all enrollments in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    async *listEnrollments(class_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/classes/${class_id}/enrollments`, options);
    }

    /**
     * Paginates through all people in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    async *listPeople(class_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/people`, options);
    }

    /**
     * Paginates through all teachers in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    async *listTeachers(class_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/teachers`, options);
    }

    /**
     * Paginates through all students in a class.
     * @param class_id The UUID of the class
     * @param options Provide a `limit` for the max number of results
     */
    async *listStudents(class_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/students`, options);
    }
}
