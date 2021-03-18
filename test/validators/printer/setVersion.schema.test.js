// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'setVersion';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    runningVersion: '1.0.1',
    latestVersion: '1.1.0'
  };

  it('accepts a valid payload with latestVersion', (done) => {
    const result = validators.validatePrinterCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid payload without latestVersion', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.latestVersion;
    const result = validators.validatePrinterCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty payload', (done) => {
    const result = validators.validatePrinterCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing payload', (done) => {
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = deepClone(goodPayload);
    payload.serialNumber = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.serialNumber;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid numeric runningVersion', (done) => {
    const payload = deepClone(goodPayload);
    payload.runningVersion = 1.0;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid string runningVersion', (done) => {
    const payload = deepClone(goodPayload);
    payload.runningVersion = '1';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing runningVersion', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.runningVersion;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid numeric latestVersion', (done) => {
    const payload = deepClone(goodPayload);
    payload.latestVersion = 2.0;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid string latestVersion', (done) => {
    const payload = deepClone(goodPayload);
    payload.latestVersion = '2';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
