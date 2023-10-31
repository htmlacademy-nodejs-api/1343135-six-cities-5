export const RequestField = {
  Params: 'params',
  Body: 'body',
  Query: 'query',
} as const;

export type RequestFieldValue = typeof RequestField[keyof typeof RequestField];
