export class WrongBookError extends Error {
    constructor(text: string) {
        super(text)
    }
}