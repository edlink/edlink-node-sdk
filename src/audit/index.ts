import { Edlink } from '..';
import { AuditEvents, AuditSchemas } from '../common';
import { BearerTokenAPI, TokenSet } from '../types';

export class Audit extends BearerTokenAPI {
    public events: AuditEvents;
    public schemas: AuditSchemas;

    constructor(edlink: Edlink, token_set: TokenSet) {
        super(edlink, token_set);

        this.events = new AuditEvents(this);
        this.schemas = new AuditSchemas(this);
    }
}
