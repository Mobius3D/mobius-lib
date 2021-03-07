// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const Path = require('path');
const utils = require('./utils');
const env = require('./env');

const config = {
  vals: {},
  env: 'production', // assume most restrictive until discovered otherwise
  isLoaded: false,
  isProd: () => env.isProd(),
  get: (path, def) => utils.get(config.vals, path, def),
  getBoolean(path, def) {
    let val = utils.get(config.vals, path, def);
    if (!isNaN(val)) val = Number(val); // eslint-disable-line no-restricted-globals
    return !!val;
  },
  getInt(path, def) {
    const val = utils.get(config.vals, path, def);
    if (val == null || isNaN(val)) { // eslint-disable-line no-restricted-globals
      return def;
    }

    return parseInt(val, 10);
  }
};

function loadConfig(dirPath, secretsPath) {
  if (!config.isLoaded) {
    /**
     * We depend upon utils.merge() doing
     * 1. Deeply nested merges, and
     * 2. Ignoring any keys whose value are undefined so that environment variables
     *    pulled in by config-overrides.js do not truly override the hard coded values
     *    when the env. variable is not defined.
     */
    config.env = env.name;
    const fname = config.isProd() ? 'prod' : 'dev';
    utils.merge(config.vals,
      /* eslint-disable import/no-dynamic-require, global-require */
      require(Path.resolve(dirPath, secretsPath)),
      require(Path.resolve(dirPath, './config-defaults')),
      require(Path.resolve(dirPath, `./config-${fname}`)),
      require(Path.resolve(dirPath, './config-overrides')));
    /* eslint-enable import/no-dynamic-require, global-require */
    config.isLoaded = true;

    if (!config.isProd()) {
      config.get = (path, def) => {
        const val = utils.get(config.vals, path, undefined);
        if (val !== undefined) return val;

        // Don't really want to load log
        console.error(`** CONFIG: config('${path}') turned up nothing`); // eslint-disable-line no-console
        return def;
      };
    }
  }

  return config;
}

module.exports = loadConfig;
