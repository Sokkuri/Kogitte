/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class AuthError {
    error: string;
    error_description: string;

    constructor(options: {
        error: string,
        error_description: string
    }) {
        this.error = options.error;
        this.error_description = options.error_description;
    }
}
