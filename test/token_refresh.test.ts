import { Edlink, PersonTokenSet, TokenSetType } from '../src';

const REFRESH_URL = '/api/authentication/token';

function json(body: Record<string, any>) {
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

describe('Person token refresh', () => {
    const original_fetch = global.fetch;

    const edlink = new Edlink({
        version: 2,
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
        log_level: 'silent'
    });

    // Every request the SDK sends to the API (i.e. not to the token endpoint) records
    // the `Authorization` header it was given, so a test can assert which access token
    // was actually put on the wire.
    let authorizations: string[] = [];

    beforeEach(() => {
        authorizations = [];

        global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
            const request = input instanceof Request ? input : new Request(input as any, init);

            if (request.url.includes(REFRESH_URL)) {
                return json({
                    $data: {
                        access_token: 'refreshed-access-token',
                        refresh_token: 'refreshed-refresh-token'
                    }
                });
            }

            authorizations.push(request.headers.get('Authorization') ?? '');

            return json({ $data: { id: '3a95a779-0ed1-499b-a352-9ea30d0bd5ea' } });
        }) as unknown as typeof fetch;
    });

    afterEach(() => {
        global.fetch = original_fetch;
    });

    it('uses the refreshed access token on the request that triggered the refresh', async () => {
        const token_set: PersonTokenSet = {
            type: TokenSetType.Person,
            access_token: 'expired-access-token',
            refresh_token: 'valid-refresh-token',
            expiration_date: new Date(Date.now() - 60 * 60 * 1000)
        };

        await edlink.use(token_set).my.profile();

        expect(authorizations).toEqual(['Bearer refreshed-access-token']);
        expect(token_set.access_token).toBe('refreshed-access-token');
        expect(token_set.refresh_token).toBe('refreshed-refresh-token');
    });

    it('uses the refreshed access token on requests that send a body', async () => {
        const token_set: PersonTokenSet = {
            type: TokenSetType.Person,
            access_token: 'expired-access-token',
            refresh_token: 'valid-refresh-token',
            expiration_date: new Date(Date.now() - 60 * 60 * 1000)
        };

        await edlink.use(token_set).submissions.update(
            '2d7a0b3f-1c5a-4e07-9a56-6e5e2f0d9a11',
            'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
            'f6e5d4c3-b2a1-4c7d-8e9f-1a2b3c4d5e6f',
            { grade_points: 80 }
        );

        expect(authorizations).toEqual(['Bearer refreshed-access-token']);
    });

    it('does not refresh a token set that has not expired', async () => {
        const token_set: PersonTokenSet = {
            type: TokenSetType.Person,
            access_token: 'current-access-token',
            refresh_token: 'valid-refresh-token',
            expiration_date: new Date(Date.now() + 60 * 60 * 1000)
        };

        await edlink.use(token_set).my.profile();

        expect(authorizations).toEqual(['Bearer current-access-token']);
        expect(token_set.access_token).toBe('current-access-token');
    });

    it('does not refresh an integration token set', async () => {
        await edlink
            .use({ type: TokenSetType.Integration, access_token: 'integration-access-token' })
            .districts.fetch('3a95a779-0ed1-499b-a352-9ea30d0bd5ea');

        expect(authorizations).toEqual(['Bearer integration-access-token']);
    });
});
