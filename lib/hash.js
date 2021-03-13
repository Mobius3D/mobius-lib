// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const HashIds = require('hashids/cjs');

const INIT_ERR_MSG = 'hash must be initialized first';

let hashid = {
  encodeStr() {
    throw new Error(INIT_ERR_MSG);
  },
  encodeHex() {
    throw new Error(INIT_ERR_MSG);
  },
  decodeHex() {
    throw new Error(INIT_ERR_MSG);
  }
};

const utils = {
  init(salt, pad) {
    hashid = new HashIds(salt, pad);
  },
  encodeStr: (str) => hashid.encode(str.split('').map((c) => c.charCodeAt(0))),
  encodeOID: (oid) => hashid.encodeHex(typeof oid === 'string' ? oid : oid.toHexString()),
  decodeEncodedOID: (str) => hashid.decodeHex(str)
};

module.exports = utils;
