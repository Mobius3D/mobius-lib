// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'getUrlResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const failedPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'FAILED',
    message: 'The end of the world is near!'
  };
  const successPayload = {
    serialNumber: SERIAL_NUMBER,
    status: 'SUCCESS',
    message: 'success',
    type: 'idle',
    expires: 60,
    maxSize: 1024 * 512,
    contentType: 'image/jpeg',
    method: 'POST',
    url: 'https://some-terribly-long-signed-s3-url',
    fields: {
      bucket: 'kick, the',
      key: 'G♯',
      acl: 'public-read',
      'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
      'X-Amz-Credential': 'You need a not from your parents',
      'X-Amz-Date': '04:29:00 21 October 2015',
      Policy: 'Shoot first, ask questions later',
      'X-Amz-Signature': 'Button Gwinnett'
    }
  };

  it('accepts a valid success payload', (done) => {
    const result = validators.validateServerCommand(CMD, successPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid failed payload', (done) => {
    const result = validators.validateServerCommand(CMD, failedPayload);
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

  it('rejects a missing serialNumber in a failed payload', (done) => {
    const payload = deepClone(failedPayload);
    delete payload.serialNumber;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.serialNumber;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = deepClone(successPayload);
    payload.serialNumber = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing status', (done) => {
    const payload = deepClone(successPayload);
    delete payload.status;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid status', (done) => {
    const payload = deepClone(successPayload);
    payload.status = 'PARTY';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing message in a failed payload', (done) => {
    const payload = deepClone(failedPayload);
    delete payload.message;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing type in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.type;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid type in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.type = 'text/plain';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing expires in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.expires;
    const result = validators.validateServerCommand(CMD, payload);
    if (result !== null) return done();
    return done(false);
  });

  it('rejects too small of an expires in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.expires = -1;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too large of an expires in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.expires = 60 * 60 * 24 * 365.25 * 100;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an string-valued expires in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.expires = '20000';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing maxSize in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.maxSize;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too small of a maxSize in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.maxSize = 10;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too large of a maxSize in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.maxSize = 1024 * 1024 * 1024 * 10;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an string-valued maxSize in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.maxSize = '4096';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing contentType in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.contentType;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid contentType in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.contentType = 'text/plain';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string contentType in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.contentType = 10;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing method in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.method;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid method in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.method = 'HEAD';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string method in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.method = 10;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing url in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.url;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid url in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.url = 'http://127.0.0.1/foo';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects too long of a url in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.url = 'https://127.0.0.1/foo.jpg'.padEnd(10000, 'x');
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string url in a success payload', (done) => {
    const payload = deepClone(successPayload);
    payload.url = 10;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing fields object in a success payload', (done) => {
    const payload = deepClone(successPayload);
    delete payload.fields;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
