import { Book } from 'entities/Book';
import { WrongBookError } from './WrongBook.error';

export class Bible {
    private readonly _books: Book[]

    constructor(books: Book[]) {
        if(books.length > 66) throw new WrongBookError('Too much books');
        this._books = books;
    }

    get books() {
        return this._books;
    }

    getBookByNumber(number: number): Book {
        if(number < 1) throw new WrongBookError('Book number can not be less 1');
        if(number > 66) throw new WrongBookError(`Book number ${number} is too much`);
        return this._books.find(book => book.number === number);
    }
}