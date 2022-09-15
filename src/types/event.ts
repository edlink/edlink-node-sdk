import { Agent } from './agent';
import { Course } from './course';
import { District } from './district';
import { Enrollment } from './enrollment';
import { Person } from './person';
import { School } from './school';
import { Section } from './section';
import { Session } from './session';
/**
 * 
 * @export
 * @interface Event
 */
export interface Event {
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Event
     */
    properties: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    date: Date;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    type: EventType;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    target: EventTarget;
    /**
     * 
     * @type {Agent | Course | District | Enrollment | Person | School | Section | Session}
     * @memberof Event
     */
    data: Agent | Course | District | Enrollment | Person | School | Section | Session;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    target_id: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    integration_id: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    materialization_id: string;
}

/**
    * @export
    * @enum {string}
    */
export enum EventType {
    Created = 'created',
    Updated = 'updated',
    Deleted = 'deleted'
}
/**
    * @export
    * @enum {string}
    */
export enum EventTarget {
    Agent = 'agent',
    Class = 'class',
    Course = 'course',
    District = 'district',
    Enrollment = 'enrollment',
    Person = 'person',
    School = 'school',
    Section = 'section',
    Session = 'session'
}
