/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class AuthConfig {
    private static _clientId: string;
    private static _tokenUrl: string;
    private static _logoutUrl: string;
    private static _localStorageKey: string;

    public static init(clientId: string, tokenUrl: string, logoutUrl: string, localStorageKey = "Session") {
        this._clientId = clientId;
        this._tokenUrl = tokenUrl;
        this._logoutUrl = logoutUrl;
        this._localStorageKey = localStorageKey;
    }

    static get clientId() {
        return this._clientId;
    }

    static get tokenUrl() {
        return this._tokenUrl;
    }

    static get logoutUrl() {
        return this._logoutUrl;
    }

    static get localStorageKey() {
        return this._localStorageKey;
    }
}
