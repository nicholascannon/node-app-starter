import Logger from 'bunyan';
import { RequestHandler } from 'express';
import { randomUUID } from 'crypto';

export const createRequestLogger =
    (logger: Logger): RequestHandler =>
    (req, res, next) => {
        const requestId = randomUUID();
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
