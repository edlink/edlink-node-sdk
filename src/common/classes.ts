import { BearerTokenAPI, Class, Enrollment, Person, Section } from '../types';

export class Classes {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; access_token?: string } = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>('/classes', options, options.limit);
    }

    fetch(class_id: string, options: { access_token?: string } = {}): Promise<Class> {
        return this.api.request(`/classes/${class_id}`, options);
    }

    async *listSections(
        class_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/classes/${class_id}/sections`, options, options.limit);
    }

    async *listEnrollments(
        class_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/classes/${class_id}/enrollments`, options, options.limit);
    }

    async *listPeople(
        class_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/people`, options, options.limit);
    }

    async *listTeachers(
        class_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/teachers`, options, options.limit);
    }

    async *listStudents(
        class_id: string,
        options: { limit?: number; access_token?: string } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/students`, options, options.limit);
    }

    // async *listAssignments(class_id: string): AsyncGenerator<Assignment> {
    //     yield* this.api.paginate<Assignment>(`/classes/${class_id}/assignments`);
    // }

    // async createAssignment(class_id: string, assignment: Partial<Assignment>): Promise<Assignment> {
    //     return this.api.request(`/classes/${class_id}/assignments`, {
    //         method: 'POST',
    //         data: assignment
    //     });
    // }
}
