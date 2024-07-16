import { getRandomNumber } from './getRandomNumber';

export function shuffle<T>(iterable: Iterable<T>): T[] {
    const iterator = iterable[Symbol.iterator]();
    const result: T[] = [];
    let source = iterator.next();
    let rand: number;
    while (!source.done) {
        rand = getRandomNumber(0, result.length);
        if(rand === result.length) {
            result.push(source.value)
        } else {
            result.push(result[rand]);
            result[rand] = source.value;
        }
        source = iterator.next();
    }
    return result;
}