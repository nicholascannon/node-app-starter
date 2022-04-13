import { RequestHandler } from 'express';

export const asyncErrorHandler =
    (handler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
