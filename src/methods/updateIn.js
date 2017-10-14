/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import coerceKeyPath from '../utils/coerceKeyPath';
import quoteString from '../utils/quoteString';
import { emptyMap } from '../Map';
import { NOT_SET } from '../TrieUtils';

export default function updateIn(keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = undefined;
  }
  const updatedValue = updateInDeepMap(
    this,
    coerceKeyPath(keyPath),
    0,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}

function updateInDeepMap(existing, keyPath, i, notSetValue, updater) {
  const isNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    const existingValue = isNotSet ? notSetValue : existing;
    const newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!(isNotSet || (existing && existing.set))) {
    throw new TypeError(
      'Invalid keyPath: Value at [' +
        keyPath.slice(0, i).map(quoteString) +
        '] does not have a .set() method and cannot be updated: ' +
        existing
    );
  }
  const key = keyPath[i];
  const nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
  const nextUpdated = updateInDeepMap(
    nextExisting,
    keyPath,
    i + 1,
    notSetValue,
    updater
  );
  return nextUpdated === nextExisting
    ? existing
    : nextUpdated === NOT_SET
      ? existing.remove(key)
      : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
}
