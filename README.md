# Kogitte

OAuth2 authentication provider for JS

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
Initial configuration:
```ts
import { AuthStore } from "kogitte";

AuthStore.init("phantom", "/api/authentication/login", "/api/authentication/logout");
```

Login:
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().login("username", "password");
```

Logout:
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().logout();
```

Get current session:
```ts
import { UserSessionManager } from "kogitte";

new UserSessionManager().getCurrentSession();
```
