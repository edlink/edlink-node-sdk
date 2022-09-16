import { Course } from '..';
import { BearerTokenAPI, Class } from '../types';

export class Courses {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Course> {
        yield* this.api.paginate<Course>('/courses', options);
    }

    fetch(course_id: string): Promise<Course> {
        return this.api.request(`/courses/${course_id}`);
    }

    async *listClasses(
        course_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>(`/courses/${course_id}/classes`, options);
    }
}
