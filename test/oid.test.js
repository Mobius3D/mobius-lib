// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { oid } = require('..');

describe('OID library', () => {
  it('should have a correct oid for time 0', (done) => {
    const dt0 = oid.dateTimeFromOid(oid.objectIdTimeZero);
    expect(dt0.getTime()).to.equal(0);
    done();
  });

  it('should translate date/time to ids and back correctly', (done) => {
    const dt = new Date();
    dt.setMilliseconds(0);
    const id = oid.oidFromDateTime(dt);
    expect(dt.getTime()).to.equal(oid.dateTimeFromOid(id).getTime());
    done();
  });
});
