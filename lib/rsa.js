// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const crypto = require('crypto');
const utils = require('./utils');

function makeKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({ publicKey, privateKey });
      }
    });
  });
}

function signString(privateKey, str) {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(str);
  return sign.sign(privateKey, 'base64');
}

function isPrivateKeyValid(privateKey) {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update('fooberry');
  try {
    sign.sign(privateKey, 'base64');
    return true;
  } catch (err) {
    return false;
  }
}

function isPublicKeyValid(publicKey) {
  try {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update('fooberry');
    const sigBuffer = Buffer.from('waffles', 'base64');
    verify.verify(publicKey, sigBuffer);
    return true;
  } catch (err) {
    return false;
  }
}

function isSignatureValid(publicKey, str, signature) {
  if (utils.isEmpty(publicKey) || utils.isEmpty(str) || utils.isEmpty(signature)) {
    return false;
  }

  try {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(str);
    const sigBuffer = Buffer.from(signature, 'base64');
    return verify.verify(publicKey, sigBuffer);
  } catch (err) {
    // verify.verify() presently only throws owing to incorrect usage...
    return false;
  }
}

module.exports = {
  isPrivateKeyValid,
  isPublicKeyValid,
  isSignatureValid,
  makeKeyPair,
  signString
};
