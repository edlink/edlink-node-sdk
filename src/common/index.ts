export { Agents } from './agents';
export { Classes } from './classes';
export { Courses } from './courses';
export { Districts } from './districts';
export { Enrollments } from './enrollments';
export { People } from './people';
export { Schools } from './schools';
export { Sections } from './sections';
export { Sessions } from './sessions';
export { Categories } from './categories';
export { Assignments } from './assignments';
export { Submissions } from './submissions';

export function serialize(object: Record<string, any>) {
    const str = [];

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    }

    return str.join('&');
}