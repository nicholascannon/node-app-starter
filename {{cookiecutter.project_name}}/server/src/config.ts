import { AJVValidator } from './utils/validation';

export const CONFIG = (() => {
    const configValidator = new AJVValidator<Config>({
        type: 'object',
        properties: {
            version: { type: 'string' },
            port: { type: 'number', minimum: 1010, maximum: 65535 },
        },
        required: ['port', 'version'],
    });

    return configValidator.validate({
        version: process.env.VERSION,
        port: Number(process.env.PORT),
    });
})();

export type Config = {
    version: string;
    port: number;
};
