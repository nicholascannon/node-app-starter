import express from 'express';
import { Server } from 'http';
import { Environment } from './env';
import { getLogger } from './log';
import { makeRequestLogger } from './middleware/request-logger';
import { getRedactedEnvironment } from './utils/environment-parser';

export const startApp = (env: Environment): Server => {
  const logger = getLogger();
  logger.info('Starting application...', { env: getRedactedEnvironment({ ...env }) });

  const app = express();

  app.use(express.json());
  app.use(makeRequestLogger(logger));

  app.get('/', (_req, res) => {
    return res.json({ message: 'Working ' });
  });

  logger.info('Application setup complete');
  return app.listen(env.port, () => logger.info('Server started...', { port: env.port }));
};
