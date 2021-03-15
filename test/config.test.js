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
});
