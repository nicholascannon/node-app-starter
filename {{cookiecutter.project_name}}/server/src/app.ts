import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler';
import { CONFIG } from './config';
import { requestLogger } from './utils/logger';

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(requestLogger);

    app.get('/healthcheck', (_req, res) => res.status(200).json({ message: 'Ok', version: CONFIG.version }));

    app.use(errorHandler);

    return app;
};
