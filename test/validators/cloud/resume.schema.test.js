// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'resume';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = { serialNumber: SERIAL_NUMBER };

  it('accepts a valid payload', (done) => {
    const result = validators.validateCloudCommand(CMD, goodPayload);
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
    const payload = { ...goodPayload };
    payload.serialNumber = '###';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
