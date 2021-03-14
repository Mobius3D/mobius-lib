// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../..');

describe('Printer Server validators', () => {
  it('validateCloudCommand rejects an unknown command', (done) => {
    const result = validators.validateCloudCommand('Fooberry', {});
    expect(result).to.not.be.null;
    return done();
  });

  it('validatePrinterCommand rejects an unknown command', (done) => {
    const result = validators.validatePrinterCommand('Fooberry', {});
    expect(result).to.not.be.null;
    return done();
  });
});
