import { getRandomNumber }  from './getRandomNumber';

describe('getRandomNumber', () => {
    it('should generate different values in range', () => {
        const MIN = 1, MAX = 10;
        let i=0;
        let value:number;
        while(i<= 10) {
            i++;
            value = getRandomNumber(MIN, MAX);
            expect(value).toBeGreaterThanOrEqual(MIN);
            expect(value).toBeLessThanOrEqual(MAX);
        }
    });
});