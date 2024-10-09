import { formatExcerptSource } from './formatExcerptSource';
describe('formatExcerptSource', () => {
  const translate = () => 'Genesis';
  const format = formatExcerptSource.bind(null, translate);

  it('should format single source', () => {
    expect(format([{ book: 1, chapter: 1, verse: 1 }])).toBe('Genesis 1:1');
  });

  it('should format verse sequense', () => {
    expect(format([{ book: 1, chapter: 1, verse: 1 }, { book: 1, chapter: 1, verse: 2}])).toBe('Genesis 1:1,2');
  });
  it('should format verse range', () => {
    expect(format([{ book: 1, chapter: 1, verse: 1 }, { book: 1, chapter: 1, verse: 3}])).toBe('Genesis 1:1-3');
  });
  it('should format diffrent chapter', () => {
    expect(format([{ book: 1, chapter: 1, verse: 1 }, { book: 1, chapter: 2, verse: 3}])).toBe('Genesis 1:1-2:3');
  });
});
