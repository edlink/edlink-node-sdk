import { Edlink } from '..';
import { AuditEvents } from './audit_events';
import { AuditSessions } from './audit_sessions';
import { BearerTokenAPI, TokenSet } from '../types';

export class Meta extends BearerTokenAPI {
    public audit_events: AuditEvents;
    public audit_sessions: AuditSessions;

    constructor(edlink: Edlink, token_set: TokenSet) {
        super(edlink, token_set);
        this.audit_events = new AuditEvents(this);
        this.audit_sessions = new AuditSessions(this);
    }
}
