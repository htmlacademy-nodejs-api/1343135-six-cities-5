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
