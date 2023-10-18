export function floatToPrecision(input: number, precision: number) {
  const order = Math.pow(10, precision);
  return Math.round((input * order)) / order;
}
