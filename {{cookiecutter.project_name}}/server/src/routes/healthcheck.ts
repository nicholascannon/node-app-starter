import { RequestHandler } from 'express';

export const makeHealthCheckRoute =
  (appVersion: string): RequestHandler =>
  (_req, res) =>
    res.json({ version: appVersion });
