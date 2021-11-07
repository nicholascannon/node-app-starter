import { RequestHandler } from 'express';
import { Environment } from '../env';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

export const makeHealthCheckRoute =
  (env: Environment): RequestHandler =>
  (_req, res) =>
    res.json({
      version,
    });
