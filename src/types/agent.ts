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
    created_date: Date;
    /**
     * 
     * @type {Date}
     * @memberof Agent
     */
    updated_date: Date;
    /**
     * 
     * @type {any}
     * @memberof Agent
     */
    properties: any;
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

