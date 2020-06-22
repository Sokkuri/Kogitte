/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class SignInData {
    grant_type: string;
    username?: string;
    password?: string;
    refresh_token?: string;
    client_id: string;
}
