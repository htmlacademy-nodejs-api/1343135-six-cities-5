import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Pagination } from '../types/pagination.js';

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

export function getPaginationParams(custom: Pagination | undefined, fallback: Required<Pagination>): Required<Pagination> {
  return {
    limit: custom?.limit ?? fallback.limit,
    offset: custom?.offset ?? fallback.offset,
  };
}
