import transformer from 'class-transformer';

export function isObject(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
}

export function removeUndefinedFields<T extends Record<string, unknown>>(obj: T): T {
  return transformer.instanceToPlain(obj, { exposeUnsetFields: false }) as T;
}
