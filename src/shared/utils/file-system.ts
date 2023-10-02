import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getCurrentModuleDirPath() {
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
}
