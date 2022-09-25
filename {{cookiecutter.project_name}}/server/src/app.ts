import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './utils/logger';

type ApplicationOptions = {
    corsOrigins: string[];
};

export const createApp = (version: string, options: ApplicationOptions) => {
    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: options.corsOrigins,
        })
    );
    app.use(express.json());
    app.use(requestLogger);

    app.get('/healthcheck', (_req, res) => res.status(200).json({ message: 'Ok', version }));

    app.use(errorHandler);

    return app;
};
