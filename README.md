# Edlink Node SDK [![CI](https://github.com/edlink/edlink-node-sdk/actions/workflows/analyze.yml/badge.svg)](https://github.com/edlink/edlink-node-sdk/actions/workflows/analyze.yml)

This Edlink JavaScript & TypeScript SDK is a NodeJS wrapper for the Edlink API.

# Get Started

## Install

Install the `edlink` package using `npm` or `yarn`.

```
yarn add edlink
```

```typescript
// Initialize with your Edlink application
// Your credentials can be found on the Edlink Dashboard
import { Edlink } from '@edlink/typescript';

const edlink = new Edlink({
    version: 2,
    client_id: '3a95a779-0ed1-499b-a352-9ea30d0bd5ea',
    client_secret: '[...]'
});

Edlink.up().then(console.log); // Ok
```

## Authorization

```typescript
// TokenSets are required to access protected resources
// Integration tokens do not expire and therefore dont have a `refresh_token`
// However be sure to store the the `refresh_token` for person token sets
// You are required to provide both when making requests on behalf of a person

export type TokenSet {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    type: TokenSetType;
}

export enum TokenSetType = {
    Integration = 'integration',
    Person = 'person'
}
```

## Graph API

```typescript
// Graph requests are even easier, just build a TokenSet from the values
// in the Edlink Dashboard

const integration_token_set = {
    access_token: '[...]'
};

const district = await edlink.use(integration_token_set).districts.fetch('3a95a779-0ed1-499b-a352-9ea30d0bd5ea');

for await (const district of edlink.use(integration_token_set).districts.list()) {
    console.log(district);
}
```

## User Authentication

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
// Optionally you may provide a state parameter for Endlink to
// passback to you upon authentication of the user

edlink.loginUrl({ redirect_uri: 'https://oauthdebugger.com/debug' });
```

```typescript
// When the user returns to your site you will be provided with a code
// e.g. https://oauthdebugger.com/debug?code=[...]
// Provide this code with the matching `redirect_uri` to recieve a token set

// Store this entire object securely
// You will require more than just the access_token
const person_token_set = await edlink.auth.grant({
    code: '[...]'.
    redirect_uri: 'https://oauthdebugger.com/debug'
});

// You can now make requests on behalf of this user
const profile = await edlink.use(person_token_set).my.profile();
```

## Notes

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
