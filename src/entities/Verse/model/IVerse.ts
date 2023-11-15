import { IBook  } from "entities/Book";

export interface IVerse {
    id: number,
    book: IBook,
    chapter: number,
    number: number,
    text: string
}