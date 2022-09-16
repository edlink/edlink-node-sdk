import { BearerTokenAPI, Class, Enrollment, Person, Section } from '../types';

export class Classes {
    constructor(private api: BearerTokenAPI) {}

    async *list(options: { limit?: number; } = {}): AsyncGenerator<Class> {
        yield* this.api.paginate<Class>('/classes', options);
    }

    fetch(class_id: string): Promise<Class> {
        return this.api.request(`/classes/${class_id}`);
    }

    async *listSections(
        class_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Section> {
        yield* this.api.paginate<Section>(`/classes/${class_id}/sections`, options);
    }

    async *listEnrollments(
        class_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Enrollment> {
        yield* this.api.paginate<Enrollment>(`/classes/${class_id}/enrollments`, options);
    }

    async *listPeople(
        class_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/people`, options);
    }

    async *listTeachers(
        class_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/teachers`, options);
    }

    async *listStudents(
        class_id: string,
        options: { limit?: number; } = {}
    ): AsyncGenerator<Person> {
        yield* this.api.paginate<Person>(`/classes/${class_id}/students`, options);
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
