/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default class StringUtils {
    public static equalsIgnoreCase(source: string, expected: string): boolean {
        const pattern = new RegExp(expected, "i");
        return pattern.test(source);
    }
}
