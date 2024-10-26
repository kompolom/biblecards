import { useBookTranlator } from './useBookTranlator';
import { formatExcerptSource } from './formatExcerptSource';
import { useMemo } from 'react';
import { Source } from './source';

export const useFormatSource = (): ((s: Source[]) => string) => {
  const t = useBookTranlator();
  return useMemo(formatExcerptSource.bind(null, t), [t]);
};
