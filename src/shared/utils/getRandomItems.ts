import { getRandomInteger } from './getRandomInteger.js';

export function getRandomItems<T>(arr: T[], count: number): T[] {
  if (count > arr.length) {
    throw new Error('Invalid arguments: count > arr.length');
  }

  const visited: Set<number> = new Set();
  const result = [];

  while (result.length < count) {
    const randomIndex = getRandomInteger(0, arr.length);

    if (visited.has(randomIndex)) {
      continue;
    }

    visited.add(randomIndex);
    result.push(arr[randomIndex]);
  }

  return result;
}
