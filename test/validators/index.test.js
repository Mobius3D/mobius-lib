// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { validators } = require('../..');

describe('Print Server validators', () => {
  it('validateServerCommand rejects an unknown command', (done) => {
    const result = validators.validateServerCommand('Fooberry', {});
    expect(result).to.not.be.null;
    return done();
  });

  it('validatePrinterCommand rejects an unknown command', (done) => {
    const result = validators.validatePrinterCommand('Fooberry', {});
    expect(result).to.not.be.null;
    return done();
  });
});
