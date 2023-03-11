import { Book } from 'entities/Book';
import { Bible } from './Bible.model';
import books_data from './books.json';

export function createBible(): Bible {
    const books: Book[] = books_data
        .map((title, i) => ({ title, number: i + 1 }));

    return new Bible(books);
}