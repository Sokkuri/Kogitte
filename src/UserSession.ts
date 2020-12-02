/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthConfig from "./AuthConfig";
import AuthData from "./models/AuthData";

export default class UserSession {
    public static RefreshInProgress: boolean = false;

    public static getSavedSession(): AuthData | null {
        const json = localStorage.getItem(AuthConfig.localStorageKey);

        if (json) {
            return JSON.parse(json) as AuthData;
        }

        return null;
    }

    public static setSession(authData: AuthData) {
        authData.issueDate = new Date().toString();
        localStorage.setItem(AuthConfig.localStorageKey, JSON.stringify(authData));
    }

    public static removeSavedSession() {
        localStorage.removeItem(AuthConfig.localStorageKey);
    }
}
