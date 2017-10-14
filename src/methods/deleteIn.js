/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import coerceKeyPath from '../utils/coerceKeyPath';

export default function deleteIn(keyPath) {
  keyPath = [...coerceKeyPath(keyPath)];
  if (keyPath.length) {
    const lastKey = keyPath.pop();
    return this.updateIn(keyPath, c => c && c.remove(lastKey));
  }
}
