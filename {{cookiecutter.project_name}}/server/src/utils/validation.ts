import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';

export class AJVValidator<T> implements Validator<T> {
    private static AJV = new Ajv({ allErrors: true });

    private isValid: ValidateFunction<T>;

    constructor(schema: JSONSchemaType<T>) {
        this.isValid = AJVValidator.AJV.compile(schema);
    }

    /**
     * Validates the object against the schema, throws a ValidationError
     * if not valid.
     */
    validate(object: unknown): T {
        if (this.isValid(object)) {
            return object;
        }
        throw new ValidationError([...(this.isValid.errors as DefinedError[])]);
    }
}

export interface Validator<T> {
    validate: (object: unknown) => T;
}

export class ValidationError extends Error {
    constructor(public errors: DefinedError[]) {
        super('Object validation failed');
        this.name = this.constructor.name;
    }
}
