import { Edlink } from '..';
import { AuditEvents } from '../common';
import { BearerTokenAPI, TokenSet } from '../types';

export class Audit extends BearerTokenAPI {
    public events: AuditEvents;

    constructor(edlink: Edlink, token_set: TokenSet) {
        super(edlink, token_set);
        this.events = new AuditEvents(this);
    }
}
