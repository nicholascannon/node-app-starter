import { createAjvValidator } from './utils/validation';

export type Config = {
    version: string;
    port: number;
    logLevel: 'info' | 'debug' | 'warn' | 'error' | 'verbose';
};

const configValidator = createAjvValidator<Config>({
    type: 'object',
    properties: {
        version: { type: 'string' },
        port: { type: 'number', minimum: 1010, maximum: 65535 },
        logLevel: { type: 'string', enum: ['info', 'debug', 'warn', 'error', 'verbose'] },
    },
    required: ['logLevel', 'port', 'version'],
});

export const parseConfigFromEnvironment = (environment: Record<string, unknown>): Config =>
    configValidator.validate({
        version: environment.VERSION,
        port: Number(environment.PORT),
        logLevel: environment.LOG_LEVEL,
    });
