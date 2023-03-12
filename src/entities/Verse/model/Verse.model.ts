import { Book } from 'entities/Book';

export class Verse {

    static create(dto: { id: number, book: Book, chapter: number, number: number|string, text: string }) {
        return new Verse(dto.id, dto.book, dto.chapter, dto.number, dto.text);
    }

    constructor(
        readonly id: number,
        readonly book: Book,
        readonly chapter: number,
        readonly number: number|string,
        readonly text: string
    ) {}

    toString() {
        return `${this.book.title} ${this.chapter}:${this.number}`
    }
}