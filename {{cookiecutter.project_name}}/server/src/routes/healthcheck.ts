import { RequestHandler } from 'express';

export const createHealthCheckRoute =
    (appVersion: string): RequestHandler =>
    (_req, res) =>
        res.json({ version: appVersion });
