import { shuffle } from './shuffle';

describe('Shuffle', () => {
    const source = [0, 1, 2, 4, 5, 6, 7, 8, 9];

    it('should return another array', () => {
        const result = shuffle(source);
        expect(result).not.toBe(source);
    });

    it('should return array with same length', () => {
        const result = shuffle(source);
        expect(result.length).toBe(source.length);
    });
});