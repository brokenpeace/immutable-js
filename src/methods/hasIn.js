/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NOT_SET } from '../TrieUtils';
import { getInVal } from './getIn';

export default function hasIn(searchKeyPath) {
  return (
    getInVal(this, NOT_SET, searchKeyPath, false /* report bad path */) !==
    NOT_SET
  );
}
