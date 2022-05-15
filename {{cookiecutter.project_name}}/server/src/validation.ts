import Ajv, { DefinedError, JSONSchemaType } from 'ajv';

export type Validator<ObjectType, SchemaType> = {
    validate: (object: unknown) => ObjectType;
    schema: SchemaType;
};

export class ValidationError extends Error {
    constructor(public errors: DefinedError[]) {
        super('Object validation failed');
        this.name = this.constructor.name;
    }
}

export const createAjvValidator = <T>(schema: JSONSchemaType<T>): Validator<T, JSONSchemaType<T>> => {
    const ajv = new Ajv();
    const validator = ajv.compile(schema);

    return {
        /**
         * Validates the object against the schema, throws a ValidationError
         * if not valid.
         */
        validate: (object: unknown): T => {
            if (validator(object)) {
                return object;
            }
            throw new ValidationError(validator.errors as DefinedError[]);
        },
        schema,
    };
};
