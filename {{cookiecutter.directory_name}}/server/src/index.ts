import { startApp } from './app';
import { getEnvironment } from './env';
import { getLogger } from './log';
import { lifecycle } from './utils/lifecycle';

const logger = getLogger();

process
  .on('uncaughtException', (error) => {
    logger.error('uncaughtException', { error });
    process.exitCode = 1;
    lifecycle.shutdown();
  })
  .on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', { reason });
    process.exitCode = 1;
    lifecycle.shutdown();
  })
  .on('SIGTERM', () => {
    logger.info('Recieved SIGTERM, shutting down...');
    lifecycle.shutdown();
  });

const server = startApp(getEnvironment());
lifecycle.on('close', async () => server.close());
