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

export const parseEnvironment = (): Environment => {
  return environmentSchema.validateSync({
    version: process.env.VERSION,
    port: Number(process.env.PORT),
    corsOrigins: process.env.ALLOWED_ORIGINS?.split(' '),
  });
};
