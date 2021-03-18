// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'helloResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const successPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'SUCCESS'
  };
  const failedPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'FAILED',
    message: 'drama'
  };

  it('accepts a valid success payload', (done) => {
    const result = validators.validateServerCommand(CMD, successPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid failed payload', (done) => {
    const result = validators.validateServerCommand(CMD, failedPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty payload', (done) => {
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing payload', (done) => {
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = deepClone(successPayload);
    payload.serialNumber = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = deepClone(successPayload);
    delete payload.status;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = deepClone(successPayload);
    payload.status = 'out to lunch';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing message in a failed payload', (done) => {
    const payload = deepClone(failedPayload);
    delete payload.message;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
