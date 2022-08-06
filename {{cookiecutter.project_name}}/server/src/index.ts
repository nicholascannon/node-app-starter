import { createApp } from './app';
import { CONFIG } from './config';
import { logger } from './utils/logger';
import { lifecycle } from './utils/lifecycle';

logger.info('Parsed environment', {
    version: CONFIG.version,
    port: CONFIG.port,
});

const app = createApp();
const server = app.listen(CONFIG.port, () => {
    logger.info('Service started', { port: CONFIG.port });
    lifecycle.on('close', () => server.close(() => logger.info('Service stopped')));
});
