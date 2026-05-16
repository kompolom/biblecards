import React, { useEffect, useState, useCallback } from 'react';
import { ITestProps } from 'entities/Test';
import { TextToSource } from './TextToSource/TextToSource';
import { TextToSourceVariants } from '../model';
import { useVerseStorageContext } from 'features/Verse';
import { useFormatSource } from 'entities/Verse';
import { Loader } from 'shared/ui/Loader';

export const TextToSourceTest = ({ excerpt, onComplete }: ITestProps) => {
  const storage = useVerseStorageContext();
  const formatSource = useFormatSource();
  const [model, setModel] = useState<TextToSourceVariants | undefined>();

  useEffect(() => {
    async function init() {
      if (!excerpt || !storage) return;
      const variants = await storage.getVerses({});
      const m = new TextToSourceVariants(excerpt, variants, formatSource);
      setModel(m);
    }
    init();
  }, [excerpt, storage, formatSource]);

  if (!model) return <Loader />;

  return (
    <TextToSource test={model} excerpt={excerpt} onComplete={onComplete} />
  );
};
