/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import AuthData from "./AuthData";

export default class AuthResult {
    successfully: boolean;
    statusCode?: number;
    data?: AuthData;

    constructor(options: {
        successfully: boolean,
        statusCode?: number,
        data?: AuthData, }) {
            this.successfully = options.successfully;
            this.data = options.data;
            this.statusCode = options.statusCode;
        }
}
