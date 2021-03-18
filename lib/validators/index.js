// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const AJV = require('ajv').default;
const defsSchema = require('./defs');
const serverSchemas = require('./server');
const printerSchemas = require('./printer');

// Keep the two sets of validators distinct; otherwise, the code has to watch for duplicate names
const serverValidators = {};
const printerValidators = {};

const ajv = new AJV({
  allErrors: true,
  strict: true
});

ajv.addSchema(defsSchema);
ajv.addKeyword('_validationRequired');

Object.keys(serverSchemas).forEach((key) => {
  serverValidators[key] = ajv.compile(serverSchemas[key]);
});

const printerCommandsAllowedSansValidation = [];
Object.keys(printerSchemas).forEach((key) => {
  if ('_validationRequired' in printerSchemas[key] &&
    printerSchemas[key]._validationRequired === false) {
    printerCommandsAllowedSansValidation.push(key);
  }

  printerValidators[key] = ajv.compile(printerSchemas[key]);
});

// returns
//  + null for success
//  - Error obj for failure
function validateCommand(cmd, obj, validators) {
  if (cmd == null) { // remember "== null" tests for null || undefined
    return new Error('Command is missing');
  }

  if (!(cmd in validators)) {
    // Only show first 16 bytes of the command; prevent being DOS'd
    return new Error(`Unrecognized command, "${cmd.slice(0, 16)}"`);
  }

  if (obj == null) {
    return new Error('Command payload is missing');
  }

  const valid = validators[cmd](obj);
  if (valid) {
    return null;
  }

  return new Error(`Invalid "${cmd}" command; ${JSON.stringify(validators[cmd].errors)}`);
}

const validators = {
  printerSchemas: Object.keys(printerSchemas),
  printerCommandsAllowedSansValidation,
  serverSchemas: Object.keys(serverSchemas),
  validateServerCommand(cmd, obj) {
    return validateCommand(cmd, obj, serverValidators);
  },
  validatePrinterCommand(cmd, obj) {
    return validateCommand(cmd, obj, printerValidators);
  }
};

module.exports = validators;
