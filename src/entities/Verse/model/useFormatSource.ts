import { useBookTranlator } from './useBookTranlator';
import { formatExcerptSource } from './formatExcerptSource';
import { useCallback, useMemo } from 'react';
import { Source } from './source';

export const useFormatSource = (): ((s: Source[]) => string) => {
  const t = useBookTranlator();
  return useCallback(formatExcerptSource.bind(null, t), [t]);
};
