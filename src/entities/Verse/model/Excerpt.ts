import { ExcerptSource } from './source';
/**
 * Bibile excerpt is a study unit. Contains one or more verses
 */
export class Excerpt {
  #id: string;
  get id() {
    return this.#id;
  }
  /**
   * Constructs an Excerpt instance with the given source and text.
   * @param source - The source of the excerpt.
   * @param text - The text content of the excerpt.
   */
  constructor(
    readonly source: ExcerptSource,
    readonly text: string,
  ) {
    this.#id = this.source.toString();
  }
}
