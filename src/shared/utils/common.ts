import { ValidationError } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export function getErrorObject(message: string) {
  return {
    error: message,
  };
}

export function fillParams<Dto, Input>(dto: ClassConstructor<Dto>, input: Input) {
  return plainToInstance(dto, input, { exposeUnsetFields: false });
}

export function fillDto<Dto, Input>(dto: ClassConstructor<Dto>, input: Input) {
  return plainToInstance(dto, input, { excludeExtraneousValues: true });
}

export function getValidationError(errors: ValidationError[]) {
  const result: Record<string, string> = {};

  for (const error of errors) {
    result[error.property] = error.constraints
      ? Object.values(error.constraints).join('; ')
      : `value "${error.value}" is invalid`;
  }

  return result;
}
