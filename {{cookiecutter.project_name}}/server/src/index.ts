import { makeApp } from './app';
import { parseEnvironment } from './env';
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

const env = parseEnvironment();

const appOptions = { version: env.version, corsOrigins: env.corsOrigins };
const app = makeApp(appOptions);

const server = app.listen(env.port, () => logger.info({ port: env.port }, 'Server started...'));

lifecycle.on('close', async () => {
  server.close((err) => {
    if (err) {
      logger.error(err, 'Could not stop server');
      process.exit(1);
    }

    logger.info('Server stopped');
  });
});
