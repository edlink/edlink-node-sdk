import { Course } from '..';
import { BearerTokenAPI, Class, RequestOptionsGet, RequestOptionsPaging } from '../types';

export class Courses {
    constructor(private api: BearerTokenAPI) {}

    /**
     * Paginates through all enrollments in a course.
     * @param options Provide a `limit` for the max number of results
     */
    async *list(options: RequestOptionsPaging = {}): AsyncGenerator<Course> {
        yield* this.api.paginate<Course>('/courses', options);
    }

    /**
     * Fetches a single course by ID.
     * @param course_id The UUID of the course
     * @returns The requested course
     */
    fetch(course_id: string, options: RequestOptionsGet = {}): Promise<Course> {
        return this.api.request(`/courses/${course_id}`, {}, options);
    }

    /**
     * Paginates through all classes in a course.
     * @param course_id The UUID of the course
     * @param options Provide a `limit` for the max number of results
     */
    async *listClasses(course_id: string, options: RequestOptionsPaging = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/courses/${course_id}/classes`, options);
    }
}
