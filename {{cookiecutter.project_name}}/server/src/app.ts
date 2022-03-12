import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'http';
import { errorHandler } from './error';
import { getLogger } from './log';
import { createRequestLogger } from './middleware/request-logger';
import { asyncErrorWrapper } from './utils/express-handler-wrappers';
import { createHealthCheckRoute } from './routes/healthcheck';

type ApplicationConfig = {
    version: string;
    corsOrigins?: string[];
};

export const createApp = (config: ApplicationConfig) => {
    const logger = getLogger();
    const app = express();
    let server: Server | undefined;

    app.use(helmet());
    if (config.corsOrigins?.length) app.use(cors({ origin: config.corsOrigins }));
    app.use(express.json());

    app.get('/healthcheck', asyncErrorWrapper(createHealthCheckRoute(config.version)));

    app.use(createRequestLogger(logger));

    // routes here

    app.use(errorHandler);

    return {
        _app: app,

        listen: (port: number, cb?: () => void) => {
            server = app.listen(port, () => {
                logger.info('Server started...', { port });
                if (cb) cb();
            });
            return server;
        },

        close: () => {
            if (!server) {
                logger.warn('Attempting to close server that is not started');
                return;
            }

            logger.info('Stopping server...');
            server.close((err) => {
                if (err) {
                    logger.error('Could not stop server', { err });
                    process.exit(1);
                }

                logger.info('Server stopped');
            });
        },
    };
};
