import { Excerpt, ExcerptSourceFormatter, IVerse } from 'entities/Verse';
import { ITest, ITestResult } from 'entities/Test';
import { TestTypes } from './TestTypes';
import { InvariantError } from 'shared/invariant';
import { IOption } from 'shared/option';
import { shuffle } from 'shared/random';

/**
 * This class implements test where user see verse text and should get its source from options
 */
export class TextToSourceVariants implements ITest {
  readonly #verse: Excerpt;
  readonly #options: IOption[];
  readonly #format: ExcerptSourceFormatter;
  readonly #startTime: number;

  constructor(
    verse: Excerpt,
    variants: Excerpt[],
    formatSource: ExcerptSourceFormatter,
  ) {
    this.#verse = verse;
    this.#format = formatSource;
    this.#startTime = Date.now();

    if (!variants.find((v) => v.id === verse.id)) {
      throw new InvariantError('Variants should contain right answer');
    }
    this.#options = shuffle(
      variants.map(TextToSourceVariants.verseToOption.bind(null, formatSource)),
    );
  }

  get type() {
    return TestTypes.TextToSourceVariants;
  }
  get title() {
    return 'Откуда взят этот стих?';
  }
  get question() {
    return this.#verse.text;
  }

  commit(answer: string): PromiseLike<ITestResult> {
    const rightAnswer = String(this.#verse.id);
    const isCorrect = String(answer) === rightAnswer;

    const userLabel =
      this.#options.find((o) => o.value === answer)?.label || answer;
    const correctLabel = this.#format(this.#verse.source);

    console.log(`[Source Variants Test]
      User:    "${userLabel}"
      Correct: "${correctLabel}"
      Status:  ${isCorrect ? '✅' : '❌'}`);

    const durationMs = Date.now() - this.#startTime;
    return {
      then(onfulfill) {
        onfulfill({
          status: isCorrect,
          accuracy: isCorrect ? 1 : 0,
          hintsUsed: 0,
          durationMs,
          correctAnswer: correctLabel,
        });
        return this;
      },
    };
  }

  get options(): IOption[] {
    return this.#options;
  }

  static verseToOption(
    format: ExcerptSourceFormatter,
    verse: Excerpt,
  ): IOption {
    return {
      value: String(verse.id),
      label: format(verse.source),
    };
  }
}
