import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    logger.error('Internal server error', { error });
    return res.status(500).json({ message: 'Internal server error' });
};
