// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { hash } = require('../../lib');

module.exports = {
  foo: {
    a: 'foo.a config-default',
    b: 'foo.b config-default',
    c: 'foo.c config-default',
    flag: true,
    int: 314
  },
  bucketKey: {
    idle: (opts) => `printer/${hash.encodeOID(opts.sn)}/camera.${opts.ext}`,
    printing: (opts) => `printer/${hash.encodeOID(opts.sn)}/${hash.encodeOID(opts.jobId)}/camera.${opts.ext}`,
    timelapse: (opts) => `printer/${hash.encodeOID(opts.sn)}/${hash.encodeOID(opts.jobId)}/timelapse.${opts.ext}`
  }
};
