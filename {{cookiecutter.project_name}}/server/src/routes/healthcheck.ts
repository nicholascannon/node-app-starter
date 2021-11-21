import { RequestHandler } from 'express';
import { Environment } from '../env';

export const makeHealthCheckRoute =
  (env: Environment): RequestHandler =>
  (_req, res) =>
    res.json({ version: env.version });
