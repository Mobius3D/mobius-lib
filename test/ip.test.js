// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire');

const EXPECTED_IP = '10.20.30.40';

const osStubs = {
  networkInterfaces() {
    return {
      lo0: [
        {
          address: '127.0.0.1',
          netmask: '255.0.0.0',
          family: 'IPv4',
          mac: '00:00:00:00:00:00',
          internal: true,
          cidr: '127.0.0.1/8'
        },
        {
          address: '::1',
          netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
          family: 'IPv6',
          mac: '00:00:00:00:00:00',
          internal: true,
          cidr: '::1/128',
          scopeid: 0
        }
      ],
      en0: [
        {
          address: 'dead::c7a:beef:dead:beef',
          netmask: 'ffff:ffff:ffff:ffff::',
          family: 'IPv6',
          mac: 'de:ad:be:ef:00:00',
          internal: false,
          cidr: 'dead::c7a:beef:dead:beef/64',
          scopeid: 6
        },
        {
          address: EXPECTED_IP,
          netmask: '255.255.255.0',
          family: 'IPv4',
          mac: 'de:ad:be:ef:00:00',
          internal: false,
          cidr: `${EXPECTED_IP}/24`
        }
      ]
    };
  }
};

const ip = proxyquire('../lib/ip', { os: osStubs });

describe('IP utility', () => {
  it(`Returns ${EXPECTED_IP}`, (done) => {
    const result = ip.getIPAddress();
    expect(result).to.equal(EXPECTED_IP);
    return done();
  });
});
