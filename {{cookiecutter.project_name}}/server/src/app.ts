import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'http';
import { Environment } from './env';
import { errorHandler } from './error';
import { getLogger } from './log';
import { makeRequestLogger } from './middleware/request-logger';
import { getRedactedEnvironment } from './utils/environment-parser';
import { asyncErrorWrapper } from './utils/express-handler-wrappers';
import { makeHealthCheckRoute } from './routes/healthcheck';

export const startApp = (env: Environment): Server => {
  const logger = getLogger();
  logger.info({ env: getRedactedEnvironment({ ...env }) }, 'Starting application...');

  const app = express();

  app.use(helmet());
  app.use(makeRequestLogger(logger));
  if (env.corsOrigins.length) app.use(cors({ origin: env.corsOrigins }));
  app.use(express.json());

  app.get('/healthcheck', asyncErrorWrapper(makeHealthCheckRoute(env)));

  app.use(errorHandler);

  return app.listen(env.port, () => logger.info({ port: env.port }, 'Application started...'));
};
