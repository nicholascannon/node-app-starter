import Ajv, { DefinedError, JSONSchemaType } from 'ajv';

export type Validator<T> = {
    validate: (object: unknown) => T;
};

export class ValidationError extends Error {
    constructor(public errors: DefinedError[]) {
        super('Object validation failed');
        this.name = this.constructor.name;
    }
}

const ajv = new Ajv({ allErrors: true });

export const createAjvValidator = <T>(schema: JSONSchemaType<T>): Validator<T> => {
    const isValid = ajv.compile(schema);

    return {
        /**
         * Validates the object against the schema, throws a ValidationError
         * if not valid.
         */
        validate: (object: unknown): T => {
            if (isValid(object)) {
                return object;
            }
            throw new ValidationError([...(isValid.errors as DefinedError[])]);
        },
    };
};
