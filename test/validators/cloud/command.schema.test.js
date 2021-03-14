// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'command';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    command: 'start: goto loop; loop: goto start'
  };

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

  it('rejects a missing serialNumber', (done) => {
    const payload = { ...goodPayload };
    delete payload.serialNumber;
    const result = validators.validateCloudCommand(CMD, payload);
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

  it('rejects a missing command field', (done) => {
    const payload = { ...goodPayload };
    delete payload.command;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string command field', (done) => {
    const payload = { ...goodPayload };
    payload.command = 1;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a zero-length command field', (done) => {
    const payload = { ...goodPayload };
    payload.command = '';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
