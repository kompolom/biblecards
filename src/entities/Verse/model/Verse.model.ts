import { Book } from 'entities/Book';
import { getVerseSource } from '../lib';
import { IVerse } from './IVerse';

export class Verse implements IVerse {
  static create(dto: {
    id: number;
    book: Book;
    chapter: number;
    number: number | string;
    text: string;
  }) {
    return new Verse(
      dto.id,
      dto.book,
      dto.chapter,
      Number(dto.number),
      dto.text,
    );
  }

  constructor(
    readonly id: number,
    readonly book: Book,
    readonly chapter: number,
    readonly number: number,
    readonly text: string,
  ) {}

  toString() {
    return getVerseSource(this);
  }
}
