import { Source } from './source';

export const formatExcerptSource = (
  translate: (bookNumber: number) => string,
  source: Source[],
): string => {
  const start = source[0];
  const end = source[source.length - 1];
  const startText = `${translate(start.book)} ${start.chapter}:${start.verse}`;
  if (start === end) {
    return startText;
  }
  if(start.book === end.book) {
    if(start.chapter === end.chapter) {
        return [startText, end.verse === start.verse + 1?',':'-', end.verse].join('');
    }
    return `${startText}-${end.chapter}:${end.verse}`;
  }
  return `${startText}-${translate(end.book)} ${end.chapter}:${end.verse}`;
};
