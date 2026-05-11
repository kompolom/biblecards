import { Excerpt } from 'entities/Verse';
import { splitVerse, clean } from '../lib';
import { shuffle } from 'shared/random';

export class Scramble {
  #words: string[];
  #userOrderedWords: string[];
  readonly #excerpt: Excerpt;

  get result() {
    return this.#userOrderedWords;
  }

  get words() {
    return this.#words;
  }

  constructor(excerpt: Excerpt) {
    this.#excerpt = excerpt;
    this.#words = shuffle(splitVerse(excerpt));
    this.#userOrderedWords = [];
  }

  guessWord(word: string) {
    const i = this.#words.findIndex((w) => w === word);
    if (i == -1) return;
    this.#words.splice(i, 1);
    this.#userOrderedWords.push(word);
  }

  cancel(i: number) {
    this.#words.push(...this.#userOrderedWords.splice(i, 1));
  }

  check() {
    return this.#userOrderedWords.join(' ') === this.#excerpt.text;
  }

  *start() {
    while (this.#words.length) {
      let word: string = yield this.#words;
      this.guessWord(word);
    }
    return this.#words;
  }
}
