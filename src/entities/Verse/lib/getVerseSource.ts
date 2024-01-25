import { IVerse } from '../model/IVerse';

export function getVerseSource(verse: IVerse) {
  return `${verse.book.title} ${verse.chapter}:${verse.number}`;
}
