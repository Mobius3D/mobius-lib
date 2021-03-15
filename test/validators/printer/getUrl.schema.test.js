// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'getUrl';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Printer ${CMD} command validator`, () => {
  const goodPrintingPayload = {
    serialNumber: SERIAL_NUMBER,
    jobId: SERIAL_NUMBER,
    method: 'POST',
    type: 'printing'
  };
  const goodIdlePayload = {
    serialNumber: SERIAL_NUMBER,
    method: 'POST',
    type: 'idle'
  };

  it('accepts a valid printing payload', (done) => {
    const result = validators.validatePrinterCommand(CMD, goodPrintingPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid idle payload', (done) => {
    const result = validators.validatePrinterCommand(CMD, goodIdlePayload);
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
    const payload = { ...goodPrintingPayload };
    payload.serialNumber = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber', (done) => {
    const payload = { ...goodPrintingPayload };
    delete payload.serialNumber;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobId', (done) => {
    const payload = { ...goodPrintingPayload };
    payload.jobId = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobId', (done) => {
    const payload = { ...goodPrintingPayload };
    delete payload.jobId;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing type', (done) => {
    const payload = { ...goodPrintingPayload };
    delete payload.type;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid type', (done) => {
    const payload = { ...goodPrintingPayload };
    payload.type = 'streaming';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing method', (done) => {
    const payload = { ...goodPrintingPayload };
    delete payload.method;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid method ', (done) => {
    const payload = { ...goodPrintingPayload };
    payload.method = 'HEAD';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
