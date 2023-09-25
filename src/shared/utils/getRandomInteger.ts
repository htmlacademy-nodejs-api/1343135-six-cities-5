export function getRandomInteger(min = 0, max = 1) {
  if (min >= max) {
    throw new Error('Invalid arguments: min >= max');
  }
  return Math.floor((Math.random() * (max - min)) + min);
}
