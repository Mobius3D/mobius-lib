// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const mine = {
  log: null,
  createLog(config, logToProdEnabled) {
    const logEnv = logToProdEnabled ? 'prod' : 'local';
    const logLevel = config.get('service.logLevel') || ((logEnv === 'prod') ? 'info' : 'debug');
    const logOptions = { level: logLevel.toLowerCase() };

    // eslint-disable-next-line import/no-dynamic-require, global-require
    mine.log = require(`./log_${logEnv}`)(config, logOptions);
  }
};

module.exports = mine;
