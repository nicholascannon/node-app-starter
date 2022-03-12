import { createApp } from './app';
import { parseEnvironment } from './env';
import { getLogger } from './log';
import { redactSecrets } from './utils/environment-utils';
import { registerProcessLifecycleEvents, getLifecycleManager } from './utils/lifecycle';

const lifecycle = getLifecycleManager();
registerProcessLifecycleEvents(lifecycle);

const env = parseEnvironment(process.env);
getLogger().info('Parsed environment', redactSecrets({ ...env }));

const app = createApp(env);
app.listen(env.port, () => {
    // on close server if started
    lifecycle.on('close', async () => app.close());
});
