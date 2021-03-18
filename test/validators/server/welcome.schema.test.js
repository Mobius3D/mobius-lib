// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'welcome';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = { challenge: 'What is you favorite color?' };

  it('accepts a valid payload', (done) => {
    const result = validators.validateServerCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty payload', (done) => {
    const result = validators.validateServerCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing payload', (done) => {
    const result = validators.validateServerCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid challenge', (done) => {
    const payload = deepClone(goodPayload);
    payload.challenge = '';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing challenge', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.challenge;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
