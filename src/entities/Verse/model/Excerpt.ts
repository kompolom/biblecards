import { ExcerptSource } from './source';
export class Excerpt {
  #id: string;
  get id() { return this.#id; }
  constructor(readonly source: ExcerptSource, readonly text: string) {
    this.#id = this.source.toString();
  }
}