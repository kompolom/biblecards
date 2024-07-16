import { getVerseSource, IVerse } from "entities/Verse";
import { ITest, ITestResult } from 'entities/Test';
import { TestTypes } from './TestTypes';
import { InvariantError } from "shared/invariant";
import { IOption } from "shared/option";
import { shuffle } from "shared/random";

/**
 * This class implements test where user see verse text and should get its source from options
 */
export class TextToSourceVariants implements ITest {
    readonly #verse: IVerse;
    readonly #options: IOption[];

    constructor(verse: IVerse, variants: IVerse[]) {
        this.#verse = verse;

        if(!variants.find(v => v.id === verse.id)) {
            throw new InvariantError('Variants should contain right answer');
        }
        this.#options = shuffle(variants.map(TextToSourceVariants.verseToOption));
    }

    get type() { return TestTypes.TextToSourceVariants }
    get title() { return 'Откуда взят этот стих?' }
    get question() { return this.#verse.text }

    async commit(answer: string) {
        return {
            status:String(answer) === String(this.#verse.id)
        }
    }

    get options(): IOption[] {
        return this.#options;
    }

    static verseToOption(verse: IVerse): IOption {
        return {
            value: String(verse.id),
            label: getVerseSource(verse),
        };
    }
}