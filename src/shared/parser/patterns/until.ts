import { Pattern } from '../pattern';
export const until = (char: string): Pattern => ({
    exec: (input, from = -1) => {
        const pos = input.indexOf(char, from+1);
        const end = ~pos? pos: input.length;
        return {
            input,
            value: input.slice(from+1, end),
            end: Math.min(end, input.length)
        }
    }
})