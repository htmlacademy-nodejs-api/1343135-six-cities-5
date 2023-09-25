import { getRandomInteger } from './getRandomInteger.js';

export function getRandomDate(min: Date, max: Date) {
  if (min >= max) {
    throw new Error('Invalid arguments: max date should be bigger than min');
  }

  const randomTimestamp = getRandomInteger(min.valueOf(), max.valueOf());
  return new Date(randomTimestamp);
}
