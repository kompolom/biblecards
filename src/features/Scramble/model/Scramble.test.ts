/**
 * @jest-environment node
 */
import { TextEncoder, TextDecoder } from 'util';
import { Scramble } from './Scramble';
import { Excerpt, ExcerptSource, VerseSource } from 'entities/Verse';

const gen11 = new Excerpt(
  new ExcerptSource(new VerseSource({ book: 1, chapter: 1, verse: 1 })),
  'In the beginning God created the heaven and the earth.',
);

it('should shuffle words', () => {
  const s = new Scramble(gen11);
  const session = s.start();
  let step = session.next();
  let words: string[] = [];
  while (!step.done) {
    words = step.value;
    step = session.next(words[0]);
  }
  expect(s.check()).toBeFalsy();
});
