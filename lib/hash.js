// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const HashIds = require('hashids/cjs');

const SALT = 'V+,e2$([+mZ.53v7enhZm]WwG4{hFz';
const PAD = 12;
const hashid = new HashIds(SALT, PAD);

const utils = {
  encodeStr: (str) => hashid.encode(str.split('').map((c) => c.charCodeAt(0))),
  encodeOID: (oid) => hashid.encodeHex(typeof oid === 'string' ? oid : oid.toHexString()),
  decodeEncodedOID: (str) => hashid.decodeHex(str)
};

module.exports = utils;
