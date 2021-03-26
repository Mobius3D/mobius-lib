// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'pause';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    jobId: '12345678901234567890abcd',
    type: 'PAUSE'
  };

  it('accepts a valid success payload', (done) => {
    const result = validators.validateServerCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a local jobId', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobId = '123';
    const result = validators.validateServerCommand(CMD, payload);
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

  it('rejects a missing type', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.type;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid type', (done) => {
    const payload = deepClone(goodPayload);
    payload.type = 'COLD';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobId', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.jobId;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobId', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobId = '1';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
