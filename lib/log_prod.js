// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const crypto = require('crypto');
const winston = require('winston');
const winstonCW = require('winston-cloudwatch');
const IP = require('./ip');

const mine = {
  ip: IP.getIPAddress(),
  lastBackoffTime: 0,
  startTime: new Date().toISOString(),
  streamName: 'mobius3d',
  warn: () => null // dummy warning logger until we instantiate Winston
};

function createLogger(config, opts) {
  mine.ip = config.get('system.ipAddress', mine.ip).replace(/\./g, '-');
  mine.streamName = config.get('service.logStream', mine.streamName);
  const cloudwatchWinstonOptions = {
    awsRegion: config.get('aws.region'),
    awsOptions: {
      logStreamName: config.get('aws.region'),
      accessKeyId: config.get('aws.accessKeyId'),
      secretAccessKey: config.get('aws.secretAccessKey')
    },
    emitErrs: false,
    // Backoff error handler for when CloudWatch starts to rate limit us
    errorHandler: (err) => {
      const now = Date.now();
      if ((now - mine.lastBackoffTime) > 60 * 1000) {
        mine.lastBackoffTime = now;
        setTimeout(() => {
          mine.warn('Cloudwatch logging error:', err.message ? err.message : 'unknown');
        }, 2000);
      } else if (err) {
        console.log('Cloudwatch logging error:', err.message ? err.message : 'unknown'); // eslint-disable-line no-console
        console.log(err); // eslint-disable-line no-console
      }
    },
    exitOnError: false,
    handleExceptions: true,
    logGroupName: config.get('service.name', 'mobius-api'),
    // Spread log streams across dates as the server stays up
    logStreamName: () => `${mine.streamName}-${mine.ip}-${new Date().toISOString().split('T')[0]}-${crypto.createHash('md5').update(mine.startTime).digest('hex')}`
  };

  if (opts.level) {
    cloudwatchWinstonOptions.level = opts.level;
  }

  const logger = winston.createLogger({
    emitErrs: false,
    exitOnError: false,
    handleExeptions: true,
    transports: [new winstonCW(cloudwatchWinstonOptions)], // eslint-disable-line new-cap
    ...opts
  });
  mine.warn = logger.warn;

  return logger;
}

module.exports = createLogger;
