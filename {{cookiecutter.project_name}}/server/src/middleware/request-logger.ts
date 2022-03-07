import Logger from 'bunyan';
import { RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';

export const createRequestLogger =
  (logger: Logger): RequestHandler =>
  (req, res, next) => {
    const requestId = uuid();
    const startTime = Date.now();
    req.requestId = requestId;

    res.on('finish', () =>
      logger.info({
        path: req.originalUrl,
        method: req.method,
        status: res.statusCode,
        responseTimeMs: Date.now() - startTime,
        requestId,
      })
    );
    next();
  };
