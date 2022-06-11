import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { createGlobalErrorHandler } from './routes/error-handler';
import { Logger } from './utils/logger';
import { useWinstonRequestLogger } from './middleware/request-logger';

type AppConfig = {
    version: string;
    logger: Logger;
};

export const createApp = (config: AppConfig) => {
    const { version, logger } = config;

    const app = express();
    app.use(helmet());
    app.use(express.json());

    app.get('/healthcheck', (_req, res) => res.status(200).json({ message: 'Ok', version }));

    app.use(useWinstonRequestLogger());

    app.use(createGlobalErrorHandler(logger));

    let server: Server | undefined;

    return {
        listen: (port: number, callback?: () => void) => {
            server = app.listen(port, () => {
                logger.info('Server started...', { port });
                if (callback) callback();
            });
        },
        close: () => {
            logger.info('Stopping server...');
            server?.close((error) => {
                if (error) {
                    logger.error('Could not stop server', { error });
                    process.exit(1);
                }
            });
        },
    };
};
