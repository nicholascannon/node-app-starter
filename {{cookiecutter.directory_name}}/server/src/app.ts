import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { Environment } from './env';
import { errorHandler } from './error';
import { getLogger } from './log';
import { makeRequestLogger } from './middleware/request-logger';
import { getRedactedEnvironment } from './utils/environment-parser';
import { asyncErrorWrapper } from './utils/express-handler-wrappers';

export const startApp = (env: Environment): Server => {
  const logger = getLogger();
  logger.info({ env: getRedactedEnvironment({ ...env }) }, 'Starting application...');

  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(makeRequestLogger(logger));

  app.get(
    '/',
    asyncErrorWrapper((_req, res) => {
      return res.json({ message: 'Working ' });
    })
  );

  app.use(errorHandler);

  logger.info('Application setup complete');
  return app.listen(env.port, () => logger.info({ port: env.port }, 'Server started...'));
};
