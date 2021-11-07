import { startApp } from './app';
import { getEnvironment } from './env';
import { getLogger } from './log';
import { lifecycle } from './utils/lifecycle';

const logger = getLogger();

process
  .on('uncaughtException', (error) => {
    logger.error(error, 'uncaughtException');
    process.exitCode = 1;
    lifecycle.shutdown();
  })
  .on('unhandledRejection', (reason) => {
    logger.error({ reason }, 'unhandledRejection');
    process.exitCode = 1;
    lifecycle.shutdown();
  })
  .on('SIGTERM', () => {
    logger.info('Recieved SIGTERM, shutting down...');
    lifecycle.shutdown();
  })
  .on('SIGINT', () => {
    logger.info('Recieved SIGINT, shutting down...');
    lifecycle.shutdown();
  });

const server = startApp(getEnvironment());
lifecycle.on('close', async () => server.close());
