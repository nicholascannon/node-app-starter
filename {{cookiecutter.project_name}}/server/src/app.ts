import * as http from 'http';
import express from 'express';
import helmet from 'helmet';
import { createGlobalErrorHandler } from './routes/error-handler';
import { Logger } from './utils/logger';
import { useWinstonRequestLogger } from './middleware/request-logger';

type Config = {
    version: string;
    logger: Logger;
};

export const createAppServer = (config: Config): http.Server => {
    const { version, logger } = config;

    const app = express();
    app.use(helmet());
    app.use(express.json());

    app.get('/healthcheck', (_req, res) => res.status(200).json({ message: 'Ok', version }));

    app.use(useWinstonRequestLogger());

    app.use(createGlobalErrorHandler(logger));

    return http.createServer(app);
};
