// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const winston = require('winston');

function createLogger(config, opts) {
  const options = {
    handleExceptions: true,
    exitOnError: false,
    emitErrs: false,
    transports: [new (winston.transports.Console)({
      format: winston.format.simple()
    })],
    ...opts
  };

  return winston.createLogger(options);
}

module.exports = createLogger;
