// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'helloResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

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
    const result = validators.validateCloudCommand(CMD, successPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid failed payload', (done) => {
    const result = validators.validateCloudCommand(CMD, failedPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty payload', (done) => {
    const result = validators.validateCloudCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing payload', (done) => {
    const result = validators.validateCloudCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = { ...successPayload };
    payload.serialNumber = '###';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = { ...successPayload };
    delete payload.status;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = { ...successPayload };
    payload.status = 'out to lunch';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing message in a failed payload', (done) => {
    const payload = { ...failedPayload };
    delete payload.message;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
