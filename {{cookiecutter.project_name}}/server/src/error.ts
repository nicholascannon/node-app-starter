import { ErrorRequestHandler } from 'express';
import { getLogger } from './log';

type ExceptionReasons = 'BAD_REQUEST' | 'NOT_FOUND';

const logger = getLogger();

export class Exception extends Error {
    reason: ExceptionReasons;

    metadata?: Record<string, unknown>;

    constructor(reason: ExceptionReasons, metadata?: Record<string, unknown>) {
        super(reason);
        this.name = this.constructor.name;
        this.reason = reason;
        this.metadata = metadata;
    }
}

const exceptionHandlerMap: { [key in ExceptionReasons]: ErrorRequestHandler } = {
    BAD_REQUEST: (error, _req, res) => res.status(400).json({ message: error.message }),
    NOT_FOUND: (error, _req, res) => res.status(404).json({ message: error.message }),
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Exception) {
        return exceptionHandlerMap[err.reason](err, req, res, next);
    }

    logger.error('Unexpected error', { error: err, requestId: req.requestId });
    return res.status(500).json({ message: 'Something went wrong' });
};
