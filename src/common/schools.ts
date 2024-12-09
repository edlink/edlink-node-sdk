import { BearerTokenAPI, Class, Course, Person, RequestOptionsGet, RequestOptionsPaging, School, Session } from '../types';

export class Schools {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all schools.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<School> {
        yield* this.api.paginate<School>('/schools', options);
    }

    /**
     * Fetch a single school by ID.
     * @param school_id The UUID of the school
     * @returns The requested school
     */
    fetch(school_id: string, options: RequestOptionsGet = {}): Promise<School> {
        return this.api.request(`/schools/${school_id}`, options);
    }

    /**
     * Paginates through all classes in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listClasses(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/schools/${school_id}/classes`, options);
    }

    /**
     * Paginates through all courses in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listCourses(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Course> {
        yield* this.api.paginate<Course>(`/schools/${school_id}/courses`, options);
    }

    /**
     * Paginates through all sessions in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listSessions(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Session> {
        yield* this.api.paginate<Session>(`/schools/${school_id}/sessions`, options);
    }

    /**
     * Paginates through all people in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listPeople(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/schools/${school_id}/people`, options);
    }

    /**
     * Paginates through all administrators in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listAdministrators(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/schools/${school_id}/administrators`, options);
    }

    /**
     * Paginates through all teachers in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listTeachers(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/schools/${school_id}/teachers`, options);
    }

    /**
     * Paginates through all students in a school.
     * @param school_id The UUID of the school
     * @param options Provide a `limit` for the max number of results
     */
    async *listStudents(school_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/schools/${school_id}/students`, options);
    }
}
