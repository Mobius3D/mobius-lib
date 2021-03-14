// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'print';
const SERIAL_NUMBER = '01234567890123456789abcd';

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    jobName: 'spaghetti.stl',
    jobId: SERIAL_NUMBER,
    gcodeFile: 'https://127.0.0.1:8080/spaghetti.gc',
    imageFile: 'https://en.wikipedia.org/wiki/Justin_Bieber#/media/File:Justin_Bieber_in_2015.jpg',
    imageThumbnailFile: 'https://en.wikipedia.org/wiki/File:Justin_Bieber_in_2015.jpg'
  };
  const sliceMePayload = {
    serialNumber: SERIAL_NUMBER,
    jobName: 'spaghetti.stl',
    jobId: SERIAL_NUMBER,
    imageFile: 'https://en.wikipedia.org/wiki/Justin_Bieber#/media/File:Justin_Bieber_in_2015.jpg',
    imageThumbnailFile: 'https://en.wikipedia.org/wiki/File:Justin_Bieber_in_2015.jpg',
    stlFile: 'https://127.0.0.1:8080/spaghetti.stl',
    configFile: 'https://127.0.0.1:8080/spaghetti.cnf'
  };

  it('accepts a valid sliced payload', (done) => {
    const result = validators.validateCloudCommand(CMD, goodPayload);
    expect(result).to.be.null;
    return done();
  });

  it('accepts a valid to-be-sliced payload', (done) => {
    const result = validators.validateCloudCommand(CMD, sliceMePayload);
    expect(result).to.be.null;
    return done();
  });

  it('rejects an empty payload', (done) => {
    const result = validators.validateCloudCommand(CMD, {});
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing payload', (done) => {
    const result = validators.validateCloudCommand(CMD);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid serialNumber', (done) => {
    const payload = { ...goodPayload };
    payload.serialNumber = '###';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing serialNumber', (done) => {
    const payload = { ...goodPayload };
    delete payload.serialNumber;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobId', (done) => {
    const payload = { ...goodPayload };
    payload.jobId = '###';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobId', (done) => {
    const payload = { ...goodPayload };
    delete payload.jobId;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobName', (done) => {
    const payload = { ...goodPayload };
    payload.jobName = '';
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobName', (done) => {
    const payload = { ...goodPayload };
    delete payload.jobName;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing gcodeFile', (done) => {
    const payload = { ...goodPayload };
    delete payload.gcodeFile;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing stlFile', (done) => {
    const payload = { ...sliceMePayload };
    delete payload.stlFile;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing configFile', (done) => {
    const payload = { ...sliceMePayload };
    delete payload.configFile;
    const result = validators.validateCloudCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
