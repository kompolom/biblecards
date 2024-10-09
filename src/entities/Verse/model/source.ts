/**
 * @jest-environment node
 */
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

/**
 * Presents verse source
 */
export type Source = {
  book: number;
  chapter: number;
  verse: number;
};

const encodeGroup = (value: number): string => {
  const group = new Uint8ClampedArray(3).fill(0x30);
  const val = value.toString();
  for (let i = 0; i < val.length; i++) {
    group[i] = val.charCodeAt(i);
  }
  return new TextDecoder().decode(group.reverse());
};

const decodeVerse = (str: string): Source => {
  const ranges: number[] = [];
  for (let i = 1; i < str.length; i += 3) {
    ranges.push(Number.parseInt(str.slice(i, i + 3)));
  }
  return {
    book: ranges[0],
    chapter: ranges[1],
    verse: ranges[2],
  };
};

export class VerseSource {
  readonly book: number;
  readonly chapter: number;
  readonly verse: number;

  constructor(src: Source) {
    this.book = src.book;
    this.chapter = src.chapter;
    this.verse = src.verse;
  }

  toString() {
    return (
      'v' + [this.book, this.chapter, this.verse].map(encodeGroup).join('')
    );
  }

  static canParse(encoded: unknown): encoded is string {
    return (
      typeof encoded === 'string' &&
      encoded.length === 10 &&
      encoded.startsWith('v')
    );
  }

  static parse(encoded: unknown): VerseSource {
    if (!VerseSource.canParse(encoded)) {
      throw new Error('Cannot parse verse source');
    }
    return new VerseSource(decodeVerse(encoded));
  }
}

export class ExcerptSource extends Array<VerseSource> {
  get start() {
    return this[0];
  }
  get end() {
    return this[1];
  }
  get single() {
    return this[0] === this[1];
  }

  constructor(start: VerseSource, end?: VerseSource) {
    super(2);
    this[0] = start;
    this[1] = end || start;
  }

  toString() {
    if (this.single) return this[0].toString();
    return this.map((v) => v.toString()).join('-');
  }

  static fromArray(src: VerseSource[]) {
    return new ExcerptSource(src[0], src[src.length - 1]);
  }

  static canParse(encoded: unknown): encoded is string {
    return (
      typeof encoded === 'string' &&
      (encoded.length === 21 || encoded.length === 10) &&
      encoded.startsWith('v')
    );
  }

  static parse(encoded: unknown): ExcerptSource {
    if (!ExcerptSource.canParse(encoded)) {
      throw new Error('Cannot parse excerpt source');
    }
    return ExcerptSource.fromArray(encoded.split('-').map(VerseSource.parse));
  }
}
