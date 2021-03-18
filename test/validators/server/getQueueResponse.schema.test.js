// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../../..');

const CMD = 'getQueueResponse';
const SERIAL_NUMBER = '01234567890123456789abcd';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe(`Cloud ${CMD} command validator`, () => {
  const goodPayload = {
    serialNumber: SERIAL_NUMBER,
    totalCount: 2,
    jobCount: 2,
    skip: 0,
    limit: 10,
    jobs: [
      {
        jobId: SERIAL_NUMBER,
        jobName: 'JOB-01',
        imageFile: 'https://127.0.0.1/robin.jpg',
        imageThumbnailFile: 'https://127.0.0.1/robin.tiny.jpg',
        owner: 'Ferris Bueller',
        ownerPhotoFile: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Ferris_Bueller%27s_Day_Off.jpg'
      },
      {
        jobId: SERIAL_NUMBER,
        jobName: 'JOB-02'
      }
    ]
  };

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

  it('rejects a missing totalCount', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.totalCount;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative totalCount', (done) => {
    const payload = deepClone(goodPayload);
    payload.totalCount = -1;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-numeric totalCount', (done) => {
    const payload = deepClone(goodPayload);
    payload.totalCount = '2';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobCount', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.jobCount;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative jobCount', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobCount = -1;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-numeric jobCount', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobCount = '2';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing skip', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.skip;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative skip', (done) => {
    const payload = deepClone(goodPayload);
    payload.skip = -1;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-numeric skip', (done) => {
    const payload = deepClone(goodPayload);
    payload.skip = '2';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing limit', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.limit;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a negative limit', (done) => {
    const payload = deepClone(goodPayload);
    payload.limit = -1;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-numeric limit', (done) => {
    const payload = deepClone(goodPayload);
    payload.limit = '0';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobs field', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.jobs;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobs field', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.jobs;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an invalid jobs[].jobId field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[0].jobId = '###';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a missing jobs[].jobName field', (done) => {
    const payload = deepClone(goodPayload);
    delete payload.jobs[1].jobName;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-https jobs[].imageFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[0].imageFile = 'http://sample.com/foo.png';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty jobs[].imageFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[0].imageFile = '';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string jobs[].imageFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[0].imageFile = true;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an overly long jobs[].imageFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[0].imageFile = 'https://sample.com/'.padEnd(1000, 'x');
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-https jobs[].imageThumbnailFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].imageThumbnailFile = 'http://sample.com/foo.png';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty jobs[].imageThumbnailFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].imageThumbnailFile = '';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string jobs[].imageThumbnailFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].imageThumbnailFile = true;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an overly long jobs[].owner field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].owner = 'Bob'.padEnd(1000, 'x');
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty jobs[].owner field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].owner = '';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string jobs[].owner field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].owner = true;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-https jobs[].ownerPhotoFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].ownerPhotoFile = 'http://sample.com/foo.png';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an overly long jobs[].ownerPhotoFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].ownerPhotoFile = 'https://sample.com/'.padEnd(1000, 'x');
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects an empty jobs[].ownerPhotoFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].ownerPhotoFile = '';
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });

  it('rejects a non-string jobs[].ownerPhotoFile field', (done) => {
    const payload = deepClone(goodPayload);
    payload.jobs[1].ownerPhotoFile = true;
    const result = validators.validateServerCommand(CMD, payload);
    expect(result).to.not.be.null;
    return done();
  });
});
