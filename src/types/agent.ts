import { Identifier } from ".";

/**
 * 
 * @export
 * @interface Agent
 */
export interface Agent {
    /**
     * 
     * @type {string}
     * @memberof Agent
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Agent
     */
    created_date: string;
    /**
     * 
     * @type {Date}
     * @memberof Agent
     */
    updated_date: string;
    /**
     * 
     * @type {any}
     * @memberof Agent
     */
    properties: any;
    /**
     * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
     * @type {Identifier}
     * @memberof Agent
     */
    identifiers: Identifier[];
    /**
     * 
     * @type {string}
     * @memberof Agent
     */
    observer_id: string;
    /**
     * 
     * @type {string}
     * @memberof Agent
     */
    target_id: string;
    /**
     * 
     * @type {string}
     * @memberof Agent
     */
    relationship: AgentRelationship;
}

/**
    * @export
    * @enum {string}
    */
export enum AgentRelationship {
    Parent = 'parent',
    Guardian = 'guardian',
    Aide = 'aide'
}

