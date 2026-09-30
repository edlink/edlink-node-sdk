import { AuditLogSession, BearerTokenAPI } from '../types';

export class AuditSessions {
    constructor(private api: BearerTokenAPI) {
        if (api.api !== 'audit') {
            throw new Error('The Audit Logs API only works with the Application TokenSetType');
        }
    }

    /**
     * Create a short lived audit log session for a provided scope value.
     * @param scope The scope to provide the session with access to
     * @returns An AuditLogSession
     */
    create(scope: string): Promise<AuditLogSession> {
        return this.api.request({
            url: '/sessions',
            method: 'POST',
            data: {
                scope
            }
        });
    }
}
