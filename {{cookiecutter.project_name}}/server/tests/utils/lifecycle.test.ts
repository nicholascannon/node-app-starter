/* eslint-disable @typescript-eslint/no-unused-expressions */
import 'mocha';
import { expect } from 'chai';
import { getLifecycleManager } from '../../src/utils/lifecycle';

describe('lifecycle', () => {
  const lifecycle = getLifecycleManager();

  it('should be open and return true', () => {
    expect(lifecycle.isRunning()).to.equal(true);
  });

  it('should close and run all registered listener functions', async () => {
    let closed = false;
    lifecycle.on('close', async () => {
      closed = true;
    });

    await lifecycle.shutdown();
    expect(closed).to.be.true;
  });

  it('should not be running after shutdown is called', () => {
    expect(lifecycle.isRunning()).to.be.false;
  });
});
