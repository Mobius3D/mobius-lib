// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const path = require('path');
const { expect } = require('chai');

const configPath = path.join(__dirname, 'config-test');
const secretsPath = path.join(configPath, 'secrets');
const config = require('../lib/config')(configPath, secretsPath);

describe('Config utility', () => {
  it('we see expected config values', (done) => {
    expect(config.isProd()).to.equal(false);
    expect(config.get('foo.a')).to.equal('foo.a config-overrides');
    expect(config.get('foo.b')).to.equal('foo.b config-dev');
    expect(config.get('foo.c')).to.equal('foo.c config-default');
    expect(config.getBoolean('foo.flag')).to.equal(true);
    expect(config.getInt('foo.int')).to.equal(314);
    expect(config.get('foo.secret')).to.equal('SECRET');
    expect(config.get('foo.bar.cat', 'meow')).to.equal('meow');
    done();
  });

  it('we see expected bucket keys', (done) => {
    const sn = '01234567890123456789abcd';
    const jobId = 'abcd01234567890123456789';
    const idle = 'printer/56xBMWbxV5SLr8rEOMZ7/camera.jpg';
    const printing = 'printer/56xBMWbxV5SLr8rEOMZ7/gOae3R6ybosjQExQ6M8Q/camera.jpg';
    const timelapse = 'printer/56xBMWbxV5SLr8rEOMZ7/gOae3R6ybosjQExQ6M8Q/timelapse.mp4';

    expect(config.getBucketKey('idle', { sn, ext: 'jpg' })).to.equal(idle);
    expect(config.getBucketKey('printing', { sn, jobId, ext: 'jpg' })).to.equal(printing);
    expect(config.getBucketKey('timelapse', { sn, jobId, ext: 'mp4' })).to.equal(timelapse);
    done();
  });
});
