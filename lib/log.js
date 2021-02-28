// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const mine = {
  log: null,
  createLog(config) {
    const logEnv = (config.isProd() && !config.getBoolean('service.logLocal')) ? 'prod' : 'local';
    const logLevel = config.get('service.logLevel') || ((logEnv === 'production') ? 'info' : 'debug');
    const logOptions = { level: logLevel.toLowerCase() };

    // eslint-disable-next-line import/no-dynamic-require
    mine.log = require(`./log_${logEnv}`)(config, logOptions); // eslint-disable-line global-require
  }
};

module.exports = mine;
