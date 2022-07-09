import { lifecycle } from '../../src/utils/lifecycle';

describe('lifecycle', () => {
    it('should be open and return true', () => {
        expect(lifecycle.isRunning()).toBeTruthy();
    });

    it('should close and run all registered listener functions', async () => {
        let closed = false;
        lifecycle.on('close', async () => {
            closed = true;
        });

        await lifecycle.shutdown();
        expect(closed).toBeTruthy();
    });

    it('should not be running after shutdown is called', () => {
        expect(lifecycle.isRunning()).toBeFalsy();
    });
});
