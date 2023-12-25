/**
 * Return random element from given array
 */
export function getRandomArrayItem<T = unknown>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
