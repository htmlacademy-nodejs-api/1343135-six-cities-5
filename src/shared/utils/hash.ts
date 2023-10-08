import { createHmac } from 'node:crypto';

export function createSha256Hash(input: string, salt: string) {
  return createHmac('sha256', salt).update(input).digest('hex');
}
