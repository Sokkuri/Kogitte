# Kogitte
[![ci](https://gitlab.com/sokkuri/kogitte/badges/master/pipeline.svg?style=flat)](https://gitlab.com/sokkuri/Kogitte/-/commits/master)
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

AuthConfig.init("clientId", "tokenUrl", "logoutUrl");
```
Optionally the name for the local storage key can be specified, like this:

```ts
AuthConfig.init("clientId", "tokenUrl", "logoutUrl", "localStorageKey");
```

### Session Manager
**Login:**

Requests the access and the refresh token from the configured token URL and saves this data in the local storage.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().login("username", "password");
```
Optionally a captcha response can be provided as follows:

```ts
new UserSessionManager().login("username", "password", "captchaResponse");
```
This data is sent with the login in the `captcha` parameter.

**Logout:**

Sends an authorized POST request to the configured URL and removes afterwards the session in the local storage.
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().logout();
```

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
