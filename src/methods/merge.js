/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { is } from '../is';
import { KeyedCollection } from '../Collection';
import { NOT_SET } from '../TrieUtils';

export function merge(/*...iters*/) {
  return mergeIntoMapWith(this, undefined, arguments);
}

export function mergeWith(merger, ...iters) {
  return mergeIntoMapWith(this, merger, iters);
}

export function mergeDeep(/*...iters*/) {
  return mergeIntoMapWith(this, deepMergerWith(alwaysNewVal), arguments);
}

export function mergeDeepWith(merger, ...iters) {
  return mergeIntoMapWith(this, deepMergerWith(merger), iters);
}

function mergeIntoMapWith(map, merger, collections) {
  const iters = [];
  for (let ii = 0; ii < collections.length; ii++) {
    iters.push(KeyedCollection(collections[ii]));
  }
  return mergeIntoCollectionWith(map, merger, iters);
}

function alwaysNewVal(oldVal, newVal) {
  return newVal;
}

export function deepMergerWith(merger) {
  return function(oldVal, newVal, key) {
    if (oldVal && newVal && typeof newVal === 'object') {
      if (oldVal.mergeDeepWith) {
        return oldVal.mergeDeepWith(merger, newVal);
      }
      if (oldVal.merge) {
        return oldVal.merge(newVal);
      }
    }
    const nextValue = merger(oldVal, newVal, key);
    return is(oldVal, nextValue) ? oldVal : nextValue;
  };
}

export function mergeIntoCollectionWith(collection, merger, iters) {
  iters = iters.filter(x => x.size !== 0);
  if (iters.length === 0) {
    return collection;
  }
  if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(collection => {
    const mergeIntoCollection = merger
      ? (value, key) => {
          collection.update(
            key,
            NOT_SET,
            oldVal => (oldVal === NOT_SET ? value : merger(oldVal, value, key))
          );
        }
      : (value, key) => {
          collection.set(key, value);
        };
    for (let ii = 0; ii < iters.length; ii++) {
      iters[ii].forEach(mergeIntoCollection);
    }
  });
}
