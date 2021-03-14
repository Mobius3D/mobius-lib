// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const printerSchema = {
  /* eslint-disable global-require */
  capabilities: require('./capabilities.schema.json'),
  commandResponse: require('./commandResponse.schema.json'),
  customCommandList: require('./customCommandList.schema.json'),
  getQueue: require('./getQueue.schema.json'),
  getUrl: require('./getUrl.schema.json'),
  hello: require('./hello.schema.json'),
  status: require('./status.schema.json')
  /* eslint-enable global-require */
};

module.exports = printerSchema;
