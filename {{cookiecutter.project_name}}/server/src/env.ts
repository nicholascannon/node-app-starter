import { array, number, object, string } from 'yup';

export type Environment = {
    version: string;
    port: number;
    corsOrigins: string[];
};

const environmentSchema = object({
    version: string().required(),
    port: number().min(1025).max(65535).required(),
    corsOrigins: array().of(string()).notRequired(),
});

export const parseEnvironment = (environment: Record<string, string | undefined>): Environment => {
    return environmentSchema.validateSync({
        version: environment.VERSION,
        port: environment.PORT,
        corsOrigins: environment.ALLOWED_ORIGINS?.split(' '),
    });
};
