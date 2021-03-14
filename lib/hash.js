// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const HashIds = require('hashids/cjs');

function missingInit() {
  throw new Error('hash must be initialized prior to use');
}

let hashid = {
  encode: missingInit,
  encodeHex: missingInit,
  decodeHex: missingInit
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
