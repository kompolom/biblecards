import { until } from './until';

describe('until', () => {
    it('should return string until comma', () => {
        const p = until(',');
        const r = p.exec('some,string');
        expect(r).toHaveProperty('value', 'some');
        expect(r).toHaveProperty('end', 4);
        expect(p.exec(r.input, r.end)).toHaveProperty('value', 'string');
    });
});