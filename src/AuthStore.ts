/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthResult from "./models/AuthResult";

export default class AuthStore {
    private static clientId: string;
    private static loginUrl: string;
    private static logoutUrl: string;

    private static runningRefreshPromise: Promise<AuthResult> = null;

    public static init(
        clientId: string,
        loginUrl: string,
        logoutUrl: string){
            this.clientId = clientId;
            this.loginUrl = loginUrl;
            this.logoutUrl = logoutUrl;
    }

    public static getClientId(): string {
        return this.clientId;
    }

    public static getLoginUrl(): string {
        return this.loginUrl;
    }

    public static getLogoutUrl(): string {
        return this.logoutUrl;
    }

    public static getRunningRefreshPromise(): Promise<AuthResult> | null {
        return this.runningRefreshPromise;
    }

    public static setRunningRefreshPromise(promise: Promise<AuthResult>) {
        this.runningRefreshPromise = promise;
    }
}
