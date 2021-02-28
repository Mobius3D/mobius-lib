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
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
  },

  isString(str) {
    return (str && typeof str.valueOf() === 'string');
  },

  merge: _.merge
};

module.exports = mine;
