import { getLogger } from '../log';

type ListenerFunction = () => Promise<unknown>;

type LifecycleManager = {
  isRunning: () => boolean;
  on: (_: 'close', listener: ListenerFunction) => void;
  shutdown: () => Promise<void>;
};

let lifecycleManager: LifecycleManager | undefined;

const createLifecycleManager = (): LifecycleManager => {
  let running = true;
  const onCloseListeners: Array<ListenerFunction> = [];

  return {
    isRunning: () => running,
    on: (_, listener) => {
      onCloseListeners.push(listener);
    },
    shutdown: async () => {
      if (running) {
        running = false;
        await Promise.all(onCloseListeners.map((listener) => listener()));
      }
    },
  };
};

export const getLifecycleManager = (): LifecycleManager => {
  if (!lifecycleManager) lifecycleManager = createLifecycleManager();
  return lifecycleManager;
};

export const registerProcessLifecycleEvents = (manager: LifecycleManager): void => {
  const logger = getLogger();

  process
    .on('uncaughtException', async (err) => {
      logger.error('uncaughtException', { err });
      process.exitCode = 1;
      await manager.shutdown();
    })
    .on('unhandledRejection', async (reason) => {
      logger.error('unhandledRejection', { reason });
      process.exitCode = 1;
      await manager.shutdown();
    })
    .on('SIGTERM', async () => {
      logger.info('Recieved SIGTERM, shutting down...');
      await manager.shutdown();
    })
    .on('SIGINT', async () => {
      logger.info('Recieved SIGINT, shutting down...');
      await manager.shutdown();
    });
};
