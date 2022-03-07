/* eslint-disable @typescript-eslint/no-unused-expressions */
import 'mocha';
import { expect } from 'chai';
import { isSecret } from '../../src/utils/environment-utils';

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
