import { Excerpt } from 'entities/Verse';
import { splitVerse, clean } from '../lib';
import { shuffle } from 'shared/random';
import { ITestResult } from 'entities/Test';

export class Scramble {
  #words: string[];
  #userOrderedWords: string[];
  readonly #excerpt: Excerpt;
  #startTime: number;
  #attemptsCount: number = 0;

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
    this.#startTime = Date.now();
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

  check(): ITestResult {
    this.#attemptsCount++;
    const userText = this.#userOrderedWords.join(' ');
    const correctText = this.#excerpt.text;
    const isCorrect = userText === correctText;

    console.log(`[Scramble Test]
      User:    "${userText}"
      Correct: "${correctText}"
      Status:  ${isCorrect ? '✅' : '❌'}`);

    const durationMs = Date.now() - this.#startTime;

    // Accuracy formula: 1 / attempts, max 1.0, min 0.1 if failed but eventually corrected
    // If not correct yet, accuracy reflects the attempt count but status is false
    const accuracy = isCorrect ? Math.max(0.2, 1 / this.#attemptsCount) : 0;

    return {
      status: isCorrect,
      accuracy,
      hintsUsed: 0,
      durationMs,
    };
  }

  *start() {
    this.#startTime = Date.now();
    while (this.#words.length) {
      let word: string = yield this.#words;
      this.guessWord(word);
    }
    return this.#words;
  }
}
