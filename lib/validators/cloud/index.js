// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const cloudSchema = {
  /* eslint-disable global-require */
  cancel: require('./cancel.schema.json'),
  capabilitiesResponse: require('./capabilitiesResponse.schema.json'),
  command: require('./command.schema.json'),
  connect: require('./connect.schema.json'),
  customCommand: require('./customCommand.schema.json'),
  delete: require('./delete.schema.json'),
  getQueueResponse: require('./getQueueResponse.schema.json'),
  getUrlResponse: require('./getUrlResponse.schema.json'),
  helloResponse: require('./helloResponse.schema.json'),
  pause: require('./pause.schema.json'),
  print: require('./print.schema.json'),
  registerResponse: require('./registerResponse.schema.json'),
  resume: require('./resume.schema.json'),
  sendNextPrintResponse: require('./sendNextPrintResponse.schema.json'),
  unregisterResponse: require('./unregisterResponse.schema.json'),
  welcome: require('./welcome.schema.json')
  /* eslint-enable global-require */
};

module.exports = cloudSchema;
