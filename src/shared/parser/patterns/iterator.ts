import { PatternResult } from '../pattern';
export function patternResultIterator(): Iterator<PatternResult> {
    const keys: (keyof PatternResult)[] = ['input', 'end', 'value']
    const ctx = this as PatternResult;
    let i = 0;
    return {
        next() {
            const value = ctx[i];
            i++;
            return {
                done: i > keys.length,
                value,
            }
        }
    }
}