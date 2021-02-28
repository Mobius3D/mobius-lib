// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const os = require('os');

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  const deviceNames = Object.keys(interfaces);
  for (let i = 0; i < deviceNames.length; i++) {
    const iface = interfaces[deviceNames[i]];
    if (iface === 'lo0') continue;

    for (let j = 0; j < iface.length; j++) {
      const alias = iface[j];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '0.0.0.0';
}

module.exports = { getIPAddress };
