import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './error';
import { getLogger } from './log';
import { makeRequestLogger } from './middleware/request-logger';
import { getRedactedEnvironment } from './utils/environment-parser';
import { asyncErrorWrapper } from './utils/express-handler-wrappers';
import { makeHealthCheckRoute } from './routes/healthcheck';

interface ApplicationOptions {
  version: string;
  corsOrigins?: string[];
}

export const makeApp = (options: ApplicationOptions): Application => {
  const logger = getLogger();
  logger.info({ options: getRedactedEnvironment({ ...options }) }, 'Creating application...');

  const app = express();

  app.use(helmet());
  if (options.corsOrigins?.length) app.use(cors({ origin: options.corsOrigins }));
  app.use(express.json());

  app.get('/healthcheck', asyncErrorWrapper(makeHealthCheckRoute(options.version)));

  app.use(makeRequestLogger(logger));

  /* Routes here */

  app.use(errorHandler);

  logger.info('Application creation complete');
  return app;
};
