import { cssToken, Type } from './css-token';

it('should serialize token', () => {
  const cw = cssToken('container', Type.Dimension, 'width');
  expect(String(cw)).toBe('--container--dimension--width');
  expect(cw()).toBe('var(--container--dimension--width)');
  expect(cw('10px')).toBe('var(--container--dimension--width, 10px)');
});
