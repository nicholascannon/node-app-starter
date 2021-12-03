import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './error';
import { getLogger } from './log';
import { makeRequestLogger } from './middleware/request-logger';
import { asyncErrorWrapper } from './utils/express-handler-wrappers';
import { makeHealthCheckRoute } from './routes/healthcheck';

interface ApplicationConfig {
  version: string;
  corsOrigins?: string[];
}

export const makeApp = (config: ApplicationConfig): Application => {
  const logger = getLogger();
  logger.info('Creating application...');

  const app = express();

  app.use(helmet());
  if (config.corsOrigins?.length) app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json());

  app.get('/healthcheck', asyncErrorWrapper(makeHealthCheckRoute(config.version)));

  app.use(makeRequestLogger(logger));

  /* Routes here */

  app.use(errorHandler);

  logger.info('Application creation complete');
  return app;
};
