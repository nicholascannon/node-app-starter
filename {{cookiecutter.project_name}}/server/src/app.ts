import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './utils/logger';

export const createApp = (version: string, corsOrigins: string[]) => {
    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: corsOrigins,
        })
    );
    app.use(express.json());
    app.use(requestLogger);

    app.get('/healthcheck', (_req, res) => res.status(200).json({ message: 'Ok', version }));

    app.use(errorHandler);

    return app;
};
