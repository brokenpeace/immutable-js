/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isImmutable } from '../Predicates';
import hasOwnProperty from '../utils/hasOwnProperty';

export function has(collection, key) {
  return isImmutable(collection)
    ? collection.has(key)
    : hasOwnProperty.call(collection, key);
}
