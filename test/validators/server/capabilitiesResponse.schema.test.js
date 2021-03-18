// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'capabilitiesResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    capabilities: ['cmd-1', 'cmd-2']
  };

  it('accepts a valid command payload', (done) => {
    const result = validators.validateServerCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts an empty capabilities array', (done) => {
    const payload = deepClone(goodPayload);
    payload.capabilities = [];
    const result = validators.validateServerCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty command payload', (done) => {
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing command payload', (done) => {
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.serialNumber;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = deepClone(goodPayload);
    payload.serialNumber = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a bad capabilities', (done) => {
    const payload = deepClone(goodPayload);
    payload.capabilities.push(100);
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects non-unique capabilities', (done) => {
    const payload = deepClone(goodPayload);
    payload.capabilities.push(payload.capabilities[0]);
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
