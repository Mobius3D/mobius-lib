// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'status';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'PRINTING',
    jobId: SERIAL_NUMBER,
    printSeconds: 3.14,
    file: 'https://127.0.0.1/boat_anchor.gc',
    fileSize: 4096,
    bytesRead: 1,
    estimatedTime: 3600
  };

  it('accepts a valid payload', (done) => {
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
    const payload = { ...goodPayload };
    payload.serialNumber = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber', (done) => {
    const payload = { ...goodPayload };
    delete payload.serialNumber;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobId', (done) => {
    const payload = { ...goodPayload };
    payload.jobId = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = { ...goodPayload };
    payload.status = '###';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = { ...goodPayload };
    delete payload.status;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid file', (done) => {
    const payload = { ...goodPayload };
    payload.file = 'http://127.0.0.1/foo.gc';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative fileSize', (done) => {
    const payload = { ...goodPayload };
    payload.fileSize = -1;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-integer fileSize', (done) => {
    const payload = { ...goodPayload };
    payload.fileSize = 4095.9;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a string fileSize', (done) => {
    const payload = { ...goodPayload };
    payload.fileSize = '4096';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative bytesRead', (done) => {
    const payload = { ...goodPayload };
    payload.bytesRead = -1;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-integer bytesRead', (done) => {
    const payload = { ...goodPayload };
    payload.bytesRead = 4095.9;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a string bytesRead', (done) => {
    const payload = { ...goodPayload };
    payload.bytesRead = '4096';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative estimatedTime', (done) => {
    const payload = { ...goodPayload };
    payload.estimatedTime = -10;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a string estimatedTime', (done) => {
    const payload = { ...goodPayload };
    payload.estimatedTime = '3600';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
