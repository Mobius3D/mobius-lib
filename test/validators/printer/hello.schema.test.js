// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'hello';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    signature: 'Button Gwinnett',
    protocol: '2.0',
    mfgSn: '00001',
    printerMake: 'Cupcake',
    version: '0.0.0',
    localIP: '::1',
    transformImg: 7,
    camOff: 1,
    camUrl: 'https://127.0.0.1:8000/?stream'
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

  it('rejects too short of a signature', (done) => {
    const payload = { ...goodPayload };
    payload.signature = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a signature', (done) => {
    const payload = { ...goodPayload };
    payload.signature = ''.padEnd(500, 'x');
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing signature', (done) => {
    const payload = { ...goodPayload };
    delete payload.signature;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a numeric protocol', (done) => {
    const payload = { ...goodPayload };
    payload.protocol = 2.0;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid protocol', (done) => {
    const payload = { ...goodPayload };
    payload.protocol = '1.0';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing protocol', (done) => {
    const payload = { ...goodPayload };
    delete payload.protocol;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty mfgSn', (done) => {
    const payload = { ...goodPayload };
    payload.mfgSn = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a mfgSn', (done) => {
    const payload = { ...goodPayload };
    payload.mfgSn = ''.padEnd(500, 'x');
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty printerMake', (done) => {
    const payload = { ...goodPayload };
    payload.printerMake = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a printerMake', (done) => {
    const payload = { ...goodPayload };
    payload.printerMake = ''.padEnd(500, 'x');
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid x.x.x.x version', (done) => {
    const payload = { ...goodPayload };
    payload.version = '1.1.1.1';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid x version', (done) => {
    const payload = { ...goodPayload };
    payload.version = '1';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too short of a localIP', (done) => {
    const payload = { ...goodPayload };
    payload.localIP = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a localIP', (done) => {
    const payload = { ...goodPayload };
    payload.localIP = '127.9.9.9'.padEnd(64, '1');
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid transformImg of -1', (done) => {
    const payload = { ...goodPayload };
    payload.transformImg = -1;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid transformImg of 8', (done) => {
    const payload = { ...goodPayload };
    payload.transformImg = 8;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid transformImg of "1"', (done) => {
    const payload = { ...goodPayload };
    payload.transformImg = '1';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid camOff of "0"', (done) => {
    const payload = { ...goodPayload };
    payload.camOff = '0';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid camOff of true', (done) => {
    const payload = { ...goodPayload };
    payload.camOff = true;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid camOff of 2', (done) => {
    const payload = { ...goodPayload };
    payload.camOff = 2;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty camUrl', (done) => {
    const payload = { ...goodPayload };
    payload.camUrl = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid camUrl', (done) => {
    const payload = { ...goodPayload };
    payload.camUrl = 'file:///foo.bar';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a camUrl', (done) => {
    const payload = { ...goodPayload };
    payload.camUrl = 'http://127.0.0.1:8080/?stream'.padEnd(4096, '?');
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
