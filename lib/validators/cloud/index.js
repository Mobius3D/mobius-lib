// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const cloudSchema = {
  /* eslint-disable global-require */
  cancel: require('./cancel.schema.json'),
  capabilitiesResponse: require('./capabilitiesResponse.schema.json'),
  command: require('./command.schema.json')
  /* eslint-enable global-require */
};

module.exports = cloudSchema;
