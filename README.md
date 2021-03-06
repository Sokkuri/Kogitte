# Kogitte
[![ci](https://github.com/Sokkuri/Kogitte/workflows/CI/badge.svg)](https://github.com/Sokkuri/Kogitte/commits/master)
[![npm](https://img.shields.io/npm/v/kogitte.svg)](https://www.npmjs.com/package/kogitte)

OAuth2 session manager

**This package supports/uses only the password and refresh flow!**

## Setup & Build
Install all dependencies:
```
npm install
```

Build:
```
npm run build
```

## Usage
### Initial configuration:
```ts
import { AuthConfig } from "kogitte";

AuthConfig.init({
    // Required
    clientId: "clientId",
    tokenUrl: "tokenUrl",
    logoutUrl: "logoutUrl",

    // Optional
    localStorageKey: "localStorageKey",
    onSessionExpire: () => { ... }
});
```

### Session Manager
**Login:**

Requests the access and the refresh token from the configured token URL and saves this data in the local storage.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().login("username", "password", "optional captcha response");
```
Optionally a captcha response can be provided. This data is sent with the login in the `captcha` parameter.

**Logout:**

Sends an authorized POST request to the configured URL and removes afterwards the session in the local storage.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().logout("optional data");
```
Optionally data can be provided. This data is sent in the request body.

**Get current session:**

Gets the data from the local storage and checks if the access token is still valid. Is this not the case, a refresh attempt is made.
If this fails the saved session gets removed. Is the token still valid or the refreshment succeeded, the current session gets returned.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().getCurrentSession();
```

**Session exists:**

Checks if a session is stored in the local storage.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().sessionExists();
```
