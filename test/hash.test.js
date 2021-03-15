// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { hash } = require('..');

describe('Hash utility', () => {
  it('throws when used without being initialized', (done) => {
    expect(() => hash.encodeStr('secret'))
      .to.throw('hash must be initialized prior to use');
    return done();
  });

  it('Decodes an encoded OID', (done) => {
    hash.init('NaCl', 20);
    const oid = '01234567890123456789abcd';
    const encodedOid = hash.encodeOID(oid);
    const decodedOid = hash.decodeEncodedOID(encodedOid);
    expect(decodedOid).to.equal(oid);
    return done();
  });
});
