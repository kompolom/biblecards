import { or } from './or';
import { until } from './until';
import { quoted } from './quoted';

describe('or', () => {
    const input1 = '"one,two","three"';
    const input2 = 'onetwo,"three"';
    it('should match first', () => {
        const p = or([until(','), until(',')], [until('"'), quoted()]);
        expect(p.exec(input1)).toHaveProperty('value', 'one,two');
        expect(p.exec(input2)).toHaveProperty('value', 'onetwo');
    });
});