import { z } from 'zod';
import { validate } from './validation';

const configSchema = z.object({
    version: z.string(),
    port: z.number().min(1010).max(65535),
    logLevel: z.enum(['info', 'debug', 'warn', 'error', 'verbose']),
});
export type Config = z.infer<typeof configSchema>;

export const parseConfigFromEnvironment = (environment: Record<string, unknown>): Config =>
    validate(configSchema, {
        version: environment.VERSION,
        port: Number(environment.PORT),
        logLevel: environment.LOG_LEVEL,
    });
