// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'customCommandList';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    customCommandList: [
      {
        label: 'CLICK-HERE',
        command: 'HISTORY-ERASER',
        helpText: 'History Eraser Button',
        confirmText: 'Really erase all of history?'
      },
      {
        label: 'PRESS',
        command: 'rm -rf /'
      }
    ]
  };

  it('accepts a valid payload', (done) => {
    const result = validators.validatePrinterCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('permits an empty customCommandList', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList = [];
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an invalid customCommandList', (done) => {
    const payload = { ...goodPayload };
    // eslint-disable-next-line prefer-destructuring
    payload.customCommandList = payload.customCommandList[0];
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
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

  it('rejects a customCommandList entry lacking a command', (done) => {
    const payload = { ...goodPayload };
    delete payload.customCommandList[0].command;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an empty command', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].command = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an invalid command', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].command = 12;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry lacking a label', (done) => {
    const payload = { ...goodPayload };
    delete payload.customCommandList[0].label;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an empty label', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].label = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an invalid label', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].label = 12;
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an empty helpText', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].helpText = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a customCommandList entry with an empty confirmText', (done) => {
    const payload = { ...goodPayload };
    payload.customCommandList[0].confirmText = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
