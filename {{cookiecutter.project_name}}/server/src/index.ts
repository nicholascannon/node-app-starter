import { makeApp } from './app';
import { parseEnvironment } from './env';
import { getLogger } from './log';
import { redactSecrets } from './utils/environment-utils';
import { lifecycle } from './utils/lifecycle';

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

const env = parseEnvironment();
logger.info('Parsed environment', redactSecrets({ ...env }));

const appConfig = { version: env.version, corsOrigins: env.corsOrigins };
const app = makeApp(appConfig);

const server = app.listen(env.port, () => logger.info('Server started...', { port: env.port }));

lifecycle.on('close', async () => {
  server.close((err) => {
    if (err) {
      logger.error('Could not stop server', { err });
      process.exit(1);
    } else {
      logger.info('Server stopped');
    }
  });
});
