import { Verse } from 'entities/Verse';
import { createBible } from 'entities/Bible';
import { formToVerse } from './verse-convert';

describe('formToVerse', () => {
  let bible: ReturnType<typeof createBible>;

  beforeAll(() => {
    bible = createBible();
  });

  it('should create verse', () => {
    expect(formToVerse({
        book: 1,
        chapter: '1',
        number: '1',
        text: 'test'
    }, bible)).toBeInstanceOf(Verse);
  });

  it('should create verse with right book if value is string', () => {
    const values = {
        book: '3',
        chapter: '1',
        number: '1',
        text: 'test'
    }
    const verse = formToVerse(values, bible);
    expect(verse.book.number).toBe(3)
  });

  it('should create verse with first chapter if chapter not set', () => {
    const values = {
        book: 3,
        chapter: '',
        number: '1',
        text: 'test'
    }
    const verse = formToVerse(values, bible);
    expect(verse.chapter).toBe(1)
  });

});
