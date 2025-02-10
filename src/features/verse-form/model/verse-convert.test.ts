/**
 * @jest-environment node
 */
import { Excerpt } from 'entities/Verse';
import { formToVerse } from './verse-convert';

describe('formToVerse', () => {

  it('should create verse', () => {
    expect(formToVerse({
        book: 1,
        chapter: '1',
        number: '1',
        text: 'test'
    })).toBeInstanceOf(Excerpt);
  });

  it('should create verse with right book if value is string', () => {
    const values = {
        book: 3,
        chapter: '1',
        number: '1',
        text: 'test'
    }
    const verse = formToVerse(values);
    expect(verse.source.start.book).toBe(3)
  });

  it('should create verse with first chapter if chapter not set', () => {
    const values = {
        book: 3,
        chapter: '',
        number: '1',
        text: 'test'
    }
    const verse = formToVerse(values);
    expect(verse.source.start.chapter).toBe(1)
  });

});
