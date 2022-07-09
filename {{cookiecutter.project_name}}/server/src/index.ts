import { createAppServer } from './app';
import { parseConfigFromEnvironment } from './config';
import { createWinstonLogger } from './utils/logger';
import { lifecycle } from './utils/lifecycle';

const config = parseConfigFromEnvironment(process.env);
const logger = createWinstonLogger(config.logLevel);

logger.info('Parsed environment', {
    version: config.version,
    port: config.port,
    logLevel: config.logLevel,
});

const app = createAppServer({ logger, ...config });
app.listen(config.port, () => {
    logger.info('Service started', { port: config.port });
    lifecycle.on('close', () => app.close(() => logger.info('Service stopped')));
});
