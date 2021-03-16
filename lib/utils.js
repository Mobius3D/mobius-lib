// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

// We're at Node 14: let's try to greatly minimize the use of lodash
// To assist, let's isolate what little of lodash we use to this here file

const _ = require('lodash');

const mine = {
  get: _.get,
  set: _.set,

  isEmpty(obj) {
    if (typeof obj === 'string') return obj.length === 0;

    const consider = [Object, Array].includes(obj || {}).constructor;
    if (!consider) return true;

    return !Object.entries((obj || {})).length;
  },

  isString(str) {
    if (str == null) return false;
    return ((str === '' || str) && typeof str.valueOf() === 'string');
  },

  merge: _.merge,

  // Only picks top-level fields
  pick(src, keys) {
    return keys.reduce((dst, key) => {
      if (src && Object.prototype.hasOwnProperty.call(src, key)) {
        dst[key] = src[key];
      }

      return dst;
    }, {});
  }
};

module.exports = mine;
