export function getRandomNumber(min = 0, max = 1, precision = 0) {
  if (min >= max) {
    throw new Error('Invalid arguments: min >= max');
  }
  const randomNumber = (Math.random() * (max - min)) + min;
  return precision ? Number(randomNumber.toFixed(precision)) : Math.round(randomNumber);
}

export function getRandomItem<T>(arr: T[]) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

export function getRandomChunk<T>(arr: T[], count?: number): T[] {
  count ??= getRandomNumber(1, arr.length - 1);
  const visited: Set<number> = new Set();
  const result = [];

  while (result.length < count) {
    const randomIndex = getRandomNumber(0, arr.length - 1);

    if (visited.has(randomIndex)) {
      continue;
    }

    visited.add(randomIndex);
    result.push(arr[randomIndex]);
  }

  return result;
}

export function getRandomBoolean() {
  return Math.random() > 0.5;
}
