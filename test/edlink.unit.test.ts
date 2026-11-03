import http from 'http';
import { Edlink, TokenSetType } from '../src';

const credentials: {
    version: number;
    client_id: string;
    client_secret: string;
    log_level: 'debug' | 'silent';
} = {
    version: 2,
    client_id: '00000000-0000-0000-0000-000000000000',
    client_secret: 'test-secret',
    log_level: 'silent'
};

const originalAlternate = process.env.ALTERNATE_EDLINK_URL;

afterEach(() => {
    if (originalAlternate === undefined) {
        delete process.env.ALTERNATE_EDLINK_URL;
    } else {
        process.env.ALTERNATE_EDLINK_URL = originalAlternate;
    }
});

describe('Edlink', () => {
    it('uses the constructor origin over ALTERNATE_EDLINK_URL', () => {
        process.env.ALTERNATE_EDLINK_URL = 'https://sandbox.ed.link';
        const edlink = new Edlink({ ...credentials, base_url: 'https://example.com/' });
        expect(edlink.base_url).toBe('https://example.com');
    });

    it('falls back to ALTERNATE_EDLINK_URL when base_url is omitted or empty', () => {
        process.env.ALTERNATE_EDLINK_URL = 'https://sandbox.ed.link';
        const omitted = new Edlink(credentials);
        expect(omitted.base_url).toBe('https://sandbox.ed.link');

        const empty = new Edlink({ ...credentials, base_url: '' });
        expect(empty.base_url).toBe('https://sandbox.ed.link');
    });

    it('defaults to https://ed.link for the four-field constructor', () => {
        delete process.env.ALTERNATE_EDLINK_URL;
        const edlink = new Edlink({
            version: 2,
            client_id: '00000000-0000-0000-0000-000000000000',
            client_secret: 'test-secret',
            log_level: 'silent'
        });
        expect(edlink.base_url).toBe('https://ed.link');
    });

    it('POSTs events.create to /api/v2/audit/events on the instance origin', async () => {
        let method = '';
        let pathname = '';
        await withServer((req) => {
            method = req.method || '';
            pathname = (req.url || '').split('?')[0];
            return { $data: { id: 'evt_1' } };
        }, async (origin) => {
            const edlink = new Edlink({ ...credentials, base_url: `${origin}/` });
            expect(edlink.base_url).toBe(origin);
            const created = await edlink
                .use({ type: TokenSetType.Application, access_token: 't' })
                .events.create({
                    actor: { type: 'system', identifiers: [{ value: 'sdk', issuer: 'test' }] },
                    action: 'test.ping',
                    targets: [],
                    scope: 'test'
                });
            expect(method).toBe('POST');
            expect(pathname).toBe('/api/v2/audit/events');
            expect(created).toEqual({ id: 'evt_1' });
        });
    });

    it('loginUrl and auth.refresh use the instance origin', async () => {
        let method = '';
        let pathname = '';
        await withServer((req) => {
            method = req.method || '';
            pathname = (req.url || '').split('?')[0];
            return { $data: { access_token: 'a', refresh_token: 'r' } };
        }, async (origin) => {
            const edlink = new Edlink({ ...credentials, base_url: origin });
            const login = new URL(edlink.loginUrl({ redirect_uri: 'https://app.example/cb' }));
            expect(login.origin).toBe(origin);
            expect(login.pathname).toBe('/sso/login');

            const tokens = await edlink.auth.refresh('rt');
            expect(method).toBe('POST');
            expect(pathname).toBe('/api/authentication/token');
            expect(tokens.access_token).toBe('a');
        });
    });

    it('edlink.up hits /api/up on the instance origin', async () => {
        let method = '';
        let pathname = '';
        await withServer((req) => {
            method = req.method || '';
            pathname = (req.url || '').split('?')[0];
            return 'ok';
        }, async (origin) => {
            const edlink = new Edlink({ ...credentials, base_url: origin });
            expect(await edlink.up()).toBe('ok');
            expect(method).toBe('GET');
            expect(pathname).toBe('/api/up');
        });
    });

    it('Edlink.up uses ALTERNATE_EDLINK_URL when set', async () => {
        process.env.ALTERNATE_EDLINK_URL = 'https://sandbox.ed.link';
        const originalFetch = global.fetch;
        const requested: string[] = [];
        global.fetch = (input: Parameters<typeof fetch>[0]) => {
            const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
            requested.push(url);
            return Promise.resolve(new Response('ok', { status: 200 }));
        };
        try {
            await Edlink.up();
            expect(requested).toEqual(['https://sandbox.ed.link/api/up']);
        } finally {
            global.fetch = originalFetch;
        }
    });

    it('does not re-prefix an absolute $next URL', async () => {
        const pathnames: string[] = [];
        await withServer((req, origin) => {
            const pathname = (req.url || '').split('?')[0];
            pathnames.push(pathname);
            if (pathname === '/api/v2/graph/classes') {
                return { $data: [{ id: 'c1' }], $next: `${origin}/absolute-next` };
            } else if (pathname === '/absolute-next') {
                return { $data: [] };
            } else {
                return { $errors: [{ message: 'not found', code: 'NOT_FOUND' }] };
            }
        }, async (origin) => {
            const edlink = new Edlink({ ...credentials, base_url: origin });
            const ids: string[] = [];
            for await (const item of edlink.use({ type: TokenSetType.Integration, access_token: 't' }).classes.list()) {
                ids.push(item.id);
            }
            expect(ids).toEqual(['c1']);
            expect(pathnames).toEqual(['/api/v2/graph/classes', '/absolute-next']);
        });
    });
});

async function withServer(
    onRequest: (req: http.IncomingMessage, origin: string) => object | string,
    run: (origin: string) => Promise<void>
): Promise<void> {
    const server = http.createServer();
    try {
        const origin = await new Promise<string>((resolve, reject) => {
            server.listen(0, '127.0.0.1', () => {
                const address = server.address();
                if (!address || typeof address === 'string') {
                    reject(new Error('expected TCP listen address'));
                    return;
                }
                resolve(`http://127.0.0.1:${address.port}`);
            });
            server.on('error', reject);
        });
        server.on('request', (req, res) => {
            req.resume();
            const body = onRequest(req, origin);
            if (typeof body === 'string') {
                res.end(body);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
        });
        await run(origin);
    } finally {
        await new Promise<void>((resolve, reject) => {
            server.close((err) => (err ? reject(err) : resolve()));
        });
    }
}
