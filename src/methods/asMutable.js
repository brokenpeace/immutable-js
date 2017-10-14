/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OwnerID } from '../TrieUtils';

export default function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
