/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { emptyMap } from '../Map';

export default function mergeIn(keyPath, ...iters) {
  return this.updateIn(
    keyPath,
    emptyMap(),
    m =>
      typeof m.merge === 'function'
        ? m.merge.apply(m, iters)
        : iters[iters.length - 1]
  );
}
