```typescript
// Initialize with your Edlink application
// Your credentials can be found on the Edlink Dashboard
import { Edlink } from 'edlink';

const edlink = new Edlink({
    version: 2,
    client_id: '[...]',
    client_secret: '[...]'
});

Edlink.up().then(console.log); // true
```

```typescript
// TokenSets are required to access protected resources
// Integration tokens do not expire and therefore dont have a `refresh_token`
// However be sure to store the the `refresh_token` for person token sets
// You are required to provide both when making requests on behalf of a person

export type TokenSet {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type: 'Bearer';
}
```

```typescript
// Authenticate a user
// First build your login url to provide to the user.
// This URL doesnt change and can be hardcoded if desired
/**
 * https://ed.link/sso/login
 * ?client_id=[...]
 * &redirect_uri=[...]
 * &state=[...]
 * &response_type=code
 */
// Optionally you may provide a state paramater for Endlink to
// passback to you upon authentication of the user

edlink.login_url({redirect_uri: 'https://oauthdebugger.com/debug'});
```

```typescript
// When the user returns to your site you will be provided with a code
// e.g. https://oauthdebugger.com/debug?code=[...]
// Provide this code with the matching `redirect_uri` to recieve an `access_token`

// Store this entire object securely
// Edlink will require more than just the access_token
const person_token_set = await edlink.auth.grant(
    '[...]',
    { redirect_uri: 'https://oauthdebugger.com/debug' }
);

// You can now make requests on behalf of this user
const profile = await edlink.use(person_token_set).user.my.profile();
```

```typescript
// Graph requests are even easier, just build a TokenSet from the values
// in the Edlink Dashboard

const integration_token_set = {
    access_token: '[...]'
}

const district = await edlink.use(token_set).graph.districts.fetch('[...]');

for await (const district of edlink.use(token_set).graph.districts.list()) {
    console.log(district)
}
```

```typescript
// DEPENDENCY ORDER
const ENTITIES = [
    'districts',
    'schools',
    'sessions',
    'courses',
    'classes',
    'sections',
    'people',
    'enrollments',
    'agents'
];
```