import { createApp } from './app';
import { parseEnvironment } from './env';
import { getLogger } from './log';
import { redactSecrets } from './utils/environment-utils';
import { registerLifecycleEvents, getLifecycle } from './utils/lifecycle';

const lifecycle = getLifecycle();
registerLifecycleEvents(lifecycle);

const env = parseEnvironment();
getLogger().info('Parsed environment', redactSecrets({ ...env }));

const app = createApp({ version: env.version, corsOrigins: env.corsOrigins });
app.listen(env.port);
lifecycle.on('close', async () => app.close());
