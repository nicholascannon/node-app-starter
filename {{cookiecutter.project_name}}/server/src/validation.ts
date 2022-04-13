import { ZodError, ZodSchema } from 'zod';

export const validate = <T>(schema: ZodSchema<T>, object: unknown) => schema.parse(object);

export const ValidationError = ZodError;
