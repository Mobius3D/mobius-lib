// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'job';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    jobId: SERIAL_NUMBER,
    state: 'completed',
    printSeconds: 60 * 60
  };

  it('accepts a valid payload', (done) => {
    const result = validators.validatePrinterCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a local print job with jobId=123', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobId = '123';
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

  it('rejects an invalid jobId', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobId = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid state', (done) => {
    const payload = deepClone(goodPayload);
    payload.state = 'Ohio';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing state', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.state;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid printSeconds', (done) => {
    const payload = deepClone(goodPayload);
    payload.printSeconds = -20.5;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
