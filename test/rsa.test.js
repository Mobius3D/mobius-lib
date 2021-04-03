// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { rsa } = require('..');

describe('RSA library', () => {
  it('it should generate valid RSA key pairs', (done) => {
    rsa.makeKeyPair()
      .then((keys) => {
        expect(rsa.isPrivateKeyValid(keys.privateKey)).to.be.true;
        expect(rsa.isPublicKeyValid(keys.publicKey)).to.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('it should detect invalid RSA key pairs', (done) => {
    // Valid RSA private key but in wrong format
    const privKey = '-----BEGIN OPENSSH PRIVATE KEY-----\n' +
      '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\n' +
      '-----END OPENSSH PRIVATE KEY-----\n';
    // Invalid public key (truncated)
    const pubKey = '-----BEGIN RSA PUBLIC KEY-----\n' +
      'MIIBCgKCAQEA2+rXGJW+xWlu/KBbhvblEBcGYMRfD8Olf7DezCVIpcqBagrQU3sr\n' +
      'CTrmYOhDshweBQouQPN7A4JqSZZJtocXVaAHrPpDp5KmkvcjXp4BMnbNXOfbKiJU\n' +
      'SvbD69DC1XSEwfQAi2kEqAvBwZJevSWLjbVQRMhFLClMJoMaiJX782B6s23JasGU\n' +
      'fRxWR30CbiQxe6SeVEgMYAiExbJgElc62dDPRXOcNTkhe5WxNGNQB1/p1eQcn0qr\n' +
      'J3gWha/0qgP4f6KnuYLRxoV4BEdsi1r9EqRP0BgtDWM7y50pYueVW9glDQvl1x4D\n' +
      'nvpgzQ6RGQe6yZJBLmfLob7BWbYHUYdKhQIDAQ\n' +
      '-----END RSA PUBLIC KEY-----\n';
    expect(rsa.isPrivateKeyValid(privKey)).to.be.false;
    expect(rsa.isPublicKeyValid(pubKey)).to.be.false;
    done();
  });

  it('it should correctly sign & verify', (done) => {
    rsa.makeKeyPair()
      .then((keys) => {
        const str = 'Hot chocolate!';
        const sig = rsa.signString(keys.privateKey, str);
        expect(rsa.isSignatureValid(keys.publicKey, str, sig)).to.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('it should detect an invalid signature', (done) => {
    rsa.makeKeyPair()
      .then((keys) => {
        const str = 'Hot chocolate!';
        const sig = rsa.signString(keys.privateKey, str);
        expect(rsa.isSignatureValid(keys.publicKey, str, `z${sig}`)).to.be.false;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('it should not validate against the wrong key', (done) => {
    rsa.makeKeyPair()
      .then((keys) => {
        const publicKey = '-----BEGIN RSA PUBLIC KEY-----\n' +
          'MIIBCgKCAQEA2+rXGJW+xWlu/KBbhvblEBcGYMRfD8Olf7DezCVIpcqBagrQU3sr\n' +
          'CTrmYOhDshweBQouQPN7A4JqSZZJtocXVaAHrPpDp5KmkvcjXp4BMnbNXOfbKiJU\n' +
          'SvbD69DC1XSEwfQAi2kEqAvBwZJevSWLjbVQRMhFLClMJoMaiJX782B6s23JasGU\n' +
          'fRxWR30CbiQxe6SeVEgMYAiExbJgElc62dDPRXOcNTkhe5WxNGNQB1/p1eQcn0qr\n' +
          'J3gWha/0qgP4f6KnuYLRxoV4BEdsi1r9EqRP0BgtDWM7y50pYueVW9glDQvl1x4D\n' +
          'nvpgzQ6RGQe6yZJBLmfLob7BWbYHUYdKhQIDAQAB\n' +
          '-----END RSA PUBLIC KEY-----\n';
        const str = 'Hot chocolate!';
        const sig = rsa.signString(keys.privateKey, str);
        expect(rsa.isSignatureValid(keys.publicKey, str, sig)).to.be.true;
        expect(rsa.isPublicKeyValid(publicKey)).to.be.true;
        expect(rsa.isSignatureValid(publicKey, str, sig)).to.be.false;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
