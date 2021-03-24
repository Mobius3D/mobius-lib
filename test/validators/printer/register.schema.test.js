// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'register';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Printer ${CMD} command validator`, () => {
  const goodPayload = {
    email: 'postmaster@sample.com',
    pin: '1234',
    publicKey: 'Kwikset Schlage'.padEnd(72, 'x'),
    MAC: 'DE:AD:BE:EF:20:20',
    mfg: 'Acme Mfg',
    mfgModel: 'Whizbang Pro++ 2000',
    mfgSn: '0001'
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

  it('rejects a missing email', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.email;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty email', (done) => {
    const payload = deepClone(goodPayload);
    payload.email = '';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid email', (done) => {
    const payload = deepClone(goodPayload);
    payload.email = '@gmail.com';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing pin', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.pin;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty pin', (done) => {
    const payload = deepClone(goodPayload);
    payload.pin = '';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid pin', (done) => {
    const payload = deepClone(goodPayload);
    payload.pin = 1111;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a pin which is too short', (done) => {
    const payload = deepClone(goodPayload);
    payload.pin = '123';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a pin which is too long', (done) => {
    const payload = deepClone(goodPayload);
    payload.pin = '123456789012345678901234567890';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing publicKey', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.publicKey;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty publicKey', (done) => {
    const payload = deepClone(goodPayload);
    payload.publicKey = '';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid publicKey', (done) => {
    const payload = deepClone(goodPayload);
    payload.publicKey = 1111;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a publicKey which is too short', (done) => {
    const payload = deepClone(goodPayload);
    payload.publicKey = '123456789012345678901234567890';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a publicKey which is too long', (done) => {
    const payload = deepClone(goodPayload);
    payload.publicKey = '123'.padEnd(2048, 'x');
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid MAC', (done) => {
    const payload = deepClone(goodPayload);
    payload.MAC = 'xx.xx.xx.xx.xx.xx';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty MAC', (done) => {
    const payload = deepClone(goodPayload);
    payload.MAC = '';
    const result = validators.validatePrinterCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a mfg which is too short', (done) => {
    const payload = deepClone(goodPayload);
    payload.mfg = '';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a mfg which is too long', (done) => {
    const payload = deepClone(goodPayload);
    payload.mfg = '123'.padEnd(64, 'x');
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a mfgSn which is too short', (done) => {
    const payload = deepClone(goodPayload);
    payload.mfgSn = '';
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a mfgSn which is too long', (done) => {
    const payload = deepClone(goodPayload);
    payload.mfgSn = '123'.padEnd(64, 'x');
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing mfgModel which is too long', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.mfgModel;
    const result = validators.validatePrinterCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });
});
