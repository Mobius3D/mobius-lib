// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'registerResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'SUCCESS',
    message: 'REGISTERED'
  };

  it('accepts a valid payload', (done) => {
    const result = validators.validateServerCommand(CMD, goodPayload);
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
    const payload = deepClone(goodPayload);
    payload.serialNumber = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber for SUCCESS', (done) => {
    const payload = deepClone(goodPayload);
    payload.status = 'SUCCESS';
    delete payload.serialNumber;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('allows a missing serialNumber for FAILED', (done) => {
    const payload = deepClone(goodPayload);
    payload.status = 'FAILED';
    delete payload.serialNumber;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = deepClone(goodPayload);
    payload.status = 'FOO';
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.status;
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid message', (done) => {
    const payload = deepClone(goodPayload);
    payload.reason = 'FOO';
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing message', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.reason;
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });
});
