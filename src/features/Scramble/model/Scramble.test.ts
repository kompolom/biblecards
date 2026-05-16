/**
 * @jest-environment node
 */
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
  expect(s.check().status).toBeFalsy();
});

it('should step back', () => {
  const s = new Scramble(gen11);
  expect(s.words.length).toBe(10);
  s.guessWord('the');
  expect(s.words.length).toBe(9);
  expect(s.result.length).toBe(1);
  s.cancel(0);
  expect(s.words.length).toBe(10);
  expect(s.result.length).toBe(0);
});
