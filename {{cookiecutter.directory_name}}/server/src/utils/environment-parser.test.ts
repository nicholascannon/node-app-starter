import 'mocha';
import { expect } from 'chai';
import { getNumber, getString, isSecret } from './environment-parser';

describe('getString', () => {
  it('should get the environment variable', () => {
    process.env['X'] = 'hello';
    expect(getString('X')).to.equal('hello');
  });

  it('should error when not set', () => {
    expect(() => getString('Y')).to.throw(Error, 'Environment error');
  });

  it('should not throw when not set and required is false, should return empty string', () => {
    expect(getString('Y', false)).to.equal('');
  });
});

describe('getNumber', () => {
  it('should get the environment variable', () => {
    process.env['X'] = '42';
    expect(getNumber('X')).to.equal(42);
  });

  it('should error when not set', () => {
    expect(() => getNumber('Y')).to.throw(Error, 'Environment error');
  });

  it('should not throw when not set and required is false, should return 0', () => {
    expect(getNumber('Y', false)).to.equal(0);
  });
});

describe('isSecret', () => {
  it('should return true for keys that are secrets keywords', () => {
    expect(isSecret('password')).to.be.true;
    expect(isSecret('secret')).to.be.true;
    expect(isSecret('key')).to.be.true;
    expect(isSecret('token')).to.be.true;
  });

  it('should return true for keys that contain secrets keywords', () => {
    expect(isSecret('DBPassword')).to.be.true;
    expect(isSecret('facebook_secret')).to.be.true;
    expect(isSecret('sendgrid-key')).to.be.true;
    expect(isSecret('API_TOKEN')).to.be.true;
  });
});
