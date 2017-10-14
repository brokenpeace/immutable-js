/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function update(k, notSetValue, updater) {
  return arguments.length === 1
    ? k(this)
    : this.updateIn([k], notSetValue, updater);
}
