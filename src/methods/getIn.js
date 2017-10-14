/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import coerceKeyPath from '../utils/coerceKeyPath';
import quoteString from '../utils/quoteString';
import { NOT_SET } from '../TrieUtils';

export default function getIn(searchKeyPath, notSetValue) {
  return getInVal(this, notSetValue, searchKeyPath, true /* report bad path */);
}

export function getInVal(value, notSetValue, searchKeyPath, reportBadKeyPath) {
  const keyPath = coerceKeyPath(searchKeyPath);
  let i = 0;
  while (i !== keyPath.length) {
    // Intermediate null/undefined value along path
    if (value == null) {
      return notSetValue;
    }
    if (!value || !value.get) {
      if (reportBadKeyPath) {
        warn(
          'Invalid keyPath: Value at [' +
            keyPath.slice(0, i).map(quoteString) +
            '] does not have a .get() method: ' +
            value +
            '\nThis warning will throw in a future version'
        );
      }
      return notSetValue;
    }
    value = value.get(keyPath[i++], NOT_SET);
    if (value === NOT_SET) {
      return notSetValue;
    }
  }
  return value;
}

function warn(message) {
  /* eslint-disable no-console */
  if (typeof console === 'object' && console.warn) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
  /* eslint-enable no-console */
}
