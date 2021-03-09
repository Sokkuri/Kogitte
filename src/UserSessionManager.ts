/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthConfig from "./AuthConfig";
import AuthenticationDataContext from "./AuthenticationDataContext";
import AuthData from "./models/AuthData";
import AuthResult from "./models/AuthResult";
import SignInData from "./models/SignInData";
import Storage from "./Storage";
import UserSession from "./UserSession";
import StringUtils from "./utilities/StringUtils";

export default class UserSessionManager {
    public async login(username: string, password: string, captcha?: string): Promise<AuthResult> {
        const dataContext = new AuthenticationDataContext();
        const signInData: SignInData = {
            grant_type: "password",
            username: username,
            password: password,
            refresh_token: undefined,
            client_id: AuthConfig.config.clientId,
            captcha: captcha
        };

        const loginResult = await dataContext.login(signInData);

        if (loginResult.successfully && loginResult.data) {
            UserSession.setSession(loginResult.data);
        }

        return loginResult;
    }

    public async logout(data: unknown = null): Promise<AuthResult> {
        const dataContext = new AuthenticationDataContext();
        const session = await this.getCurrentSession();

        const logoutResult = await dataContext.logout(session, data);

        if (logoutResult.successfully) {
            UserSession.removeSavedSession();
        }

        return logoutResult;
    }

    public async getCurrentSession(): Promise<AuthData | null> {
        const savedSession = UserSession.getSavedSession();

        if (savedSession) {
            if (this.validateAccessToken(savedSession)) {
                return savedSession;
            } else {
                const runningRefresh = Storage.refreshPromise;

                if (runningRefresh) {
                    const sessionRefreshResult = await runningRefresh;
                    return sessionRefreshResult.successfully && sessionRefreshResult.data ? sessionRefreshResult.data : null;
                }

                const refreshPromise = this.refresh(savedSession);
                Storage.refreshPromise = refreshPromise;

                const sessionRefreshResult = await refreshPromise;

                if (!sessionRefreshResult.successfully || !sessionRefreshResult.data) {
                    if (sessionRefreshResult.statusCode == 400 && StringUtils.equalsIgnoreCase(sessionRefreshResult.error.error, "invalid_grant")) {
                        // Refresh token is invalid, expired or revoked.
                        // https://tools.ietf.org/html/rfc6749#section-5.2

                        UserSession.removeSavedSession();
                        AuthConfig.config.onSessionExpire?.();
                    }

                    // Keep session if service is probably unreachable.
                    Storage.refreshPromise = null;
                    return null;
                }

                UserSession.setSession(sessionRefreshResult.data);
                Storage.refreshPromise = null;
                return sessionRefreshResult.data;
            }
        }

        return null;
    }

    public sessionExists(): boolean {
        const savedSession = UserSession.getSavedSession();

        return savedSession ? true : false;
    }

    private async refresh(session: AuthData): Promise<AuthResult> {
        const dataContext = new AuthenticationDataContext();
        const signInData: SignInData = {
            grant_type: "refresh_token",
            username: undefined,
            password: undefined,
            refresh_token: session.refresh_token,
            client_id: AuthConfig.config.clientId
        };

        return dataContext.refresh(signInData).then((x: AuthResult) => {
            return x;
        });
    }

    private validateAccessToken(authData: AuthData): boolean {
        if (authData.issueDate) {
            const issueDate = new Date(authData.issueDate);

            const expirationDate = new Date(issueDate);
            expirationDate.setSeconds(issueDate.getSeconds() + authData.expires_in);

            return expirationDate >= new Date();
        }

        return false;
    }
}
