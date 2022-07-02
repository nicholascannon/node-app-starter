import { ErrorRequestHandler } from 'express';
import { Logger } from '../utils/logger';

export const createGlobalErrorHandler =
    (logger: Logger): ErrorRequestHandler =>
    (error, req, res, next) => {
        if (res.headersSent) {
            return next(error);
        }

        logger.error('Internal server error', { error });
        return res.status(500).json({ message: 'Internal server error' });
    };
