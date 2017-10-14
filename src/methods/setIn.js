/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NOT_SET } from '../TrieUtils';

export default function setIn(keyPath, v) {
  return this.updateIn(keyPath, NOT_SET, () => v);
}
