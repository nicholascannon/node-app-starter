import { createApp } from './app';
import { CONFIG } from './config';
import { logger } from './utils/logger';
import { lifecycle } from './utils/lifecycle';

process
    .on('uncaughtException', (error) => {
        logger.error('uncaughtException', { error });
    })
    .on('unhandledRejection', (reason) => {
        logger.error('unhandledRejection', { reason });
    });

logger.info('Config', {
    version: CONFIG.version,
    port: CONFIG.port,
});

const app = createApp();
const server = app.listen(CONFIG.port, () => {
    logger.info('Service started', { port: CONFIG.port });
    lifecycle.on('close', () => server.close(() => logger.info('Service stopped')));
});
