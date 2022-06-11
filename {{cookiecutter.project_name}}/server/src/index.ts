import { createApp } from './app';
import { parseConfigFromEnvironment } from './config';
import { createWinstonLogger } from './utils/logger';
import { registerProcessLifecycleEvents, getLifecycleManager } from './utils/lifecycle';

const manager = getLifecycleManager();
const config = parseConfigFromEnvironment(process.env);
const logger = createWinstonLogger(config.logLevel);

registerProcessLifecycleEvents(logger, manager);

logger.info('Parsed environment', {
    version: config.version,
    port: config.port,
    logLevel: config.logLevel,
});

const app = createApp({ logger, ...config });
app.listen(config.port, () => {
    manager.on('close', async () => app.close());
});
