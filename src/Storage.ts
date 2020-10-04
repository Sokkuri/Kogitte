/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthResult from "./models/AuthResult";

export default class Storage {
    private static _refreshPromise: Promise<AuthResult>;

    static get refreshPromise() {
        return this._refreshPromise;
    }

    static set refreshPromise(promise: Promise<AuthResult>) {
        this._refreshPromise = promise;
    }
}
