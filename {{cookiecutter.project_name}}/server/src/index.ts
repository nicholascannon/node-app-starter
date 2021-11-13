import { startApp } from './app';
import { getEnvironment } from './env';
import { getLogger } from './log';
import { lifecycle } from './utils/lifecycle';

const logger = getLogger();

process
  .on('uncaughtException', async (error) => {
    logger.error(error, 'uncaughtException');
    process.exitCode = 1;
    await lifecycle.shutdown();
  })
  .on('unhandledRejection', async (reason) => {
    logger.error({ reason }, 'unhandledRejection');
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

const server = startApp(getEnvironment());
lifecycle.on('close', async () => server.close());
