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
  BAD_REQUEST: (error, req, res, next) => res.status(400).json({ message: error.message }),
  NOT_FOUND: (error, req, res, next) => res.status(404).json({ message: error.message }),
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof Exception) {
    logger.error({ error, requestId: req.requestId, ...error.metadata }, 'Exception');
    return exceptionHandlerMap[error.reason](error, req, res, next);
  }

  logger.error({ error, requestId: req.requestId }, 'Unexpected error');
  return res.status(500).json({ message: 'Something went wrong ' });
};
