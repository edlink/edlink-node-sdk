import { Course } from '..';
import { BearerTokenAPI, Class } from '../types';

export class Courses {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Course> {
        yield* this.api.paginate<Course>('/courses', options, options.limit);
    }

    fetch(course_id: string, options: { access_token?: string } = {}): Promise<Course> {
        return this.api.request(`/courses/${course_id}`, options);
    }

    async *listClasses(
        course_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/courses/${course_id}/classes`, options, options.limit);
    }
}
