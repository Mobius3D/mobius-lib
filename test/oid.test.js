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

  it('should correctly identify that an oid is in an array of oids', (done) => {
    const oid1 = oid.oidFromDateTime('1970/03/04');
    const oid2 = oid.oidFromDateTime('1985/09/25');
    const oid3 = oid.oidFromDateTime('2000/01/01');
    const oid4 = oid.oidFromDateTime('2021/03/03');
    const list = [oid1, oid2, oid3, oid4];
    expect(oid.containsOid(list, oid3)).to.be.true;
    done();
  });

  it('should correctly identify that an oid is not in an array of oids', (done) => {
    const oid1 = oid.oidFromDateTime('1970/03/04');
    const oid2 = oid.oidFromDateTime('1985/09/25');
    const oid3 = oid.oidFromDateTime('2000/01/01');
    const oid4 = oid.oidFromDateTime('2021/03/03');
    const list = [oid1, oid2, oid4];
    expect(oid.containsOid(list, oid3)).to.be.false;
    done();
  });

  it('should correctly convert oids', (done) => {
    const oid1 = oid.oidFromDateTime('1970/03/04');
    const oid2 = oid.ensure(oid1.toHexString());
    expect(oid1.equals(oid2)).to.be.true;
    done();
  });
});
