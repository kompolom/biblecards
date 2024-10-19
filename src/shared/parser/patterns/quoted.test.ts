import { quoted } from './quoted';

describe('quoted', () => {
    const example = 'test string,"quoted part","another, part"';
    it('should parse string', () => {
        const q = quoted();
        const result = q.exec(example)
        expect(result).toHaveProperty('value','quoted part');
        expect(q.exec(result.input, result.end)).toHaveProperty('value', 'another, part');
    });
});