import { getLogger } from '../log';

type ListenerFunction = () => Promise<unknown>;

type Lifecycle = {
  isRunning: () => boolean;
  on: (_: 'close', listener: ListenerFunction) => void;
  shutdown: () => Promise<void>;
};

let LIFE_CYCLE: Lifecycle | undefined;

const createLifecycle = (): Lifecycle => {
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

export const getLifecycle = (): Lifecycle => {
  if (!LIFE_CYCLE) LIFE_CYCLE = createLifecycle();
  return LIFE_CYCLE;
};

export const registerLifecycleEvents = (lifecycle: Lifecycle): void => {
  const logger = getLogger();

  process
    .on('uncaughtException', async (err) => {
      logger.error('uncaughtException', { err });
      process.exitCode = 1;
      await lifecycle.shutdown();
    })
    .on('unhandledRejection', async (reason) => {
      logger.error('unhandledRejection', { reason });
      process.exitCode = 1;
      await lifecycle.shutdown();
    })
    .on('SIGTERM', async () => {
      logger.info('Recieved SIGTERM, shutting down...');
      await lifecycle.shutdown();
    })
    .on('SIGINT', async () => {
      logger.info('Recieved SIGINT, shutting down...');
      await lifecycle.shutdown();
    });
};
