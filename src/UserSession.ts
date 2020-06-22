/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthData from "./models/AuthData";

export default class UserSession {
    public static RefreshInProgress: boolean = false;

    public static getSavedSession(): AuthData | null {
        const json = localStorage.getItem("Session");

        if (json) {
            return JSON.parse(json) as AuthData;
        }

        return null;
    }

    public static setSession(authData: AuthData) {
        authData.issueDate = new Date().toISOString();
        localStorage.setItem("Session", JSON.stringify(authData));
    }

    public static removeSavedSession() {
        localStorage.removeItem("Session");
    }
}
