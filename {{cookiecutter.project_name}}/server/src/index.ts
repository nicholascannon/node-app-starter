import { makeApp } from './app';
import { parseEnvironment } from './env';
import { getLogger } from './log';
import { redactSecrets } from './utils/environment-utils';
import { registerLifecycleEvents, getLifecycle } from './utils/lifecycle';

registerLifecycleEvents(getLifecycle());

const logger = getLogger();

const env = parseEnvironment();
logger.info('Parsed environment', redactSecrets({ ...env }));

const appConfig = { version: env.version, corsOrigins: env.corsOrigins };
const app = makeApp(appConfig);

const server = app.listen(env.port, () => logger.info('Server started...', { port: env.port }));

getLifecycle().on('close', async () => {
  server.close((err) => {
    if (err) {
      logger.error('Could not stop server', { err });
      process.exit(1);
    } else {
      logger.info('Server stopped');
    }
  });
});
