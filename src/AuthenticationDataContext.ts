/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Axios, { AxiosError, AxiosResponse } from "axios";
import AuthConfig from "./AuthConfig";
import AuthData from "./models/AuthData";
import AuthResult from "./models/AuthResult";
import SignInData from "./models/SignInData";

export default class AuthenticationDataContext {
    public async login(data: SignInData): Promise<AuthResult> {
        const instance = Axios.create();
        const params = new URLSearchParams({
            grant_type: data.grant_type,
            client_id: data.client_id
        });

        if (data.username && data.password) {
            params.set("username", data.username);
            params.set("password", data.password);
        }

        if (data.captcha) {
            params.set("captcha", data.captcha);
        }

        return instance.post(AuthConfig.config.tokenUrl, params).then((x: AxiosResponse) => {
            return new AuthResult({
                successfully: true,
                statusCode: x.status,
                data: x.data
            });
        }).catch((error: AxiosError) => {
            return new AuthResult({
                successfully: false,
                statusCode: error.response.status,
                error: error.response.data
            });
        });
    }

    public async refresh(data: SignInData): Promise<AuthResult> {
        const instance = Axios.create();
        const params = new URLSearchParams({
            grant_type: data.grant_type,
            client_id: data.client_id
        });

        if (data.refresh_token) {
            params.set("refresh_token", data.refresh_token);
        }

        return instance.post(AuthConfig.config.tokenUrl, params).then((x: AxiosResponse) => {
            return new AuthResult({
                successfully: true,
                statusCode: x.status,
                data: x.data
            });
        }).catch((error: AxiosError) => {
            return new AuthResult({
                successfully: false,
                statusCode: error.response.status,
                error: error.response.data
            });
        });
    }

    public async logout(session: AuthData): Promise<AuthResult> {
        const instance = Axios.create();

        if (session) {
            instance.defaults.headers.common["Authorization"] = (`Bearer ${session.access_token}`);
        }

        return instance.post(AuthConfig.config.logoutUrl, null).then(x => {
            return new AuthResult({
                successfully: true,
                statusCode:
                x.status
            });
        }).catch((error: AxiosError) => {
            return new AuthResult({
                successfully: false,
                statusCode: error.response.status,
                error: error.response.data
            });
        });
    }
}
