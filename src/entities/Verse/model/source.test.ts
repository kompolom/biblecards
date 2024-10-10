/**
 * @jest-environment node
 */
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { VerseSource, ExcerptSource } from './source';

describe('VerseSource', () => {
  it('should construct correctly', () => {
    const v = new VerseSource({ book: 1, chapter: 1, verse: 1 });
    expect(v).toHaveProperty('book', 1);
    expect(v).toHaveProperty('chapter', 1);
    expect(v).toHaveProperty('verse', 1);
  });

  it('should can parse', () => {
    expect(VerseSource.canParse('v001001001')).toBeTruthy();
    expect(VerseSource.canParse('001001001')).toBeFalsy();
    expect(VerseSource.canParse('v00100100')).toBeFalsy();
  });

  it('should parse', () => {
    expect(() => VerseSource.parse('v001001001')).not.toThrow();
    expect(VerseSource.parse('v001001001')).toBeInstanceOf(VerseSource);
    expect(VerseSource.parse('v001001001')).toEqual({ book: 1, chapter: 1, verse: 1 });
  });

  it('should stringify', () => {
    expect(VerseSource.parse('v066001001').toString()).toBe('v066001001');
  });

});

describe('ExcerptSource', () => {
    it('should parse', () => {
        expect(() => ExcerptSource.parse('v001001001')).not.toThrow();
        expect(() => ExcerptSource.parse('v001001001-v001001002')).not.toThrow();
    });
    it('should create from array', () => {
        const start =VerseSource.parse('v066001001');
        const end = VerseSource.parse('v066001002');
        const es = ExcerptSource.fromArray([start, end]);
        expect(es.start).toBe(start);
        expect(es.end).toBe(end);
        expect(es.single).toBeFalsy();
    });
    it('should parse single', () => {
        const es = ExcerptSource.parse('v066001001');
        expect(es.single).toBeTruthy();
    });
    it('should stringify single', () => {
        const es = ExcerptSource.parse('v066001001');
        expect(es.toString()).toBe('v066001001');
    });
    it('should stringify many', () => {
        const es = ExcerptSource.parse('v066001001-v066001002');
        expect(es.toString()).toBe('v066001001-v066001002');
    });
});