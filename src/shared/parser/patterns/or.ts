import { Pattern } from '../pattern';
export const or = (a: [Pattern, Pattern], b: [Pattern, Pattern]): Pattern => ({
    exec(input, from = -1) {
        const ra = a[0].exec(input, from);
        const rb = b[0].exec(input, from);
        return ra.end <= rb.end? a[1].exec(input, from): b[1].exec(input, from);
    }
})