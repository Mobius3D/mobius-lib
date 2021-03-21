// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'sendNextPrintResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const nonePayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'NONE',
    message: 'NO_QUEUED_JOBS'
  };
  const failedPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'FAILED',
    message: 'SERVER_ERROR'
  };

  it('accepts a valid none payload', (done) => {
    const result = validators.validateServerCommand(CMD, nonePayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid failed payload', (done) => {
    const result = validators.validateServerCommand(CMD, failedPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects a mixed-up status payload', (done) => {
    const payload = deepClone(nonePayload);
    payload.status = 'FAILED';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
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
    const payload = deepClone(nonePayload);
    payload.serialNumber = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = deepClone(nonePayload);
    payload.status = 'FOO';
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = deepClone(nonePayload);
    delete payload.status;
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid message', (done) => {
    const payload = deepClone(nonePayload);
    payload.message = 'FOO';
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing message', (done) => {
    const payload = deepClone(nonePayload);
    delete payload.message;
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });
});
