import { RequestHandler } from 'express';
import { Environment } from '../env';
const { version } = require('../../package.json');

export const makeHealthCheckRoute =
  (env: Environment): RequestHandler =>
  (_req, res) =>
    res.json({
      version,
    });
