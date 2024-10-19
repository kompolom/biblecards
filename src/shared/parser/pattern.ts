export type PatternResult<T = string> = { value: T, end: number, input: string } 
export interface Pattern<T = string> {
    exec(input: string, from?: number): PatternResult<T>
}