import React, { useCallback } from 'react';
import { useVerseStorageContext } from 'features/Verse';
import { useEffect, useState } from 'react';
import { Loader } from 'shared/ui/Loader';
import { TextToSource, TextToSourceVariants } from 'features/Test';
import { useAlertManager } from 'shared/ui/AlertManager';
import { useFormatSource, Excerpt } from 'entities/Verse';
import { useStudyProgress } from 'features/study-progress';
import { ITestResult, TestFeedback } from 'entities/Test';
import { getRandomArrayItem } from 'shared/random';

interface SingleTextToVariantsWidgetProps {
  excerpt?: Excerpt;
  onComplete?: () => void;
}

export const SingleTextToVariantsWidget = ({
  excerpt: initialExcerpt,
  onComplete,
}: SingleTextToVariantsWidgetProps) => {
  const am = useAlertManager();
  const storage = useVerseStorageContext();
  const formatSource = useFormatSource();
  const { registerStudyAttempt } = useStudyProgress();

  const [excerpt, setExcerpt] = useState<Excerpt | undefined>(initialExcerpt);
  const [model, setModel] = useState<TextToSourceVariants | undefined>();
  const [testResult, setTestResult] = useState<ITestResult | null>(null);

  const init = useCallback(async () => {
    let currentExcerpt = initialExcerpt;
    let variants: Excerpt[] = [];

    if (!currentExcerpt) {
      const verses = await storage.getVerses({});
      currentExcerpt = getRandomArrayItem(verses);
      variants = verses;
    } else {
      variants = await storage.getVerses({});
    }

    if (currentExcerpt) {
      setExcerpt(currentExcerpt);
      setModel(
        new TextToSourceVariants(currentExcerpt, variants, formatSource),
      );
    }
  }, [storage, initialExcerpt, formatSource]);

  useEffect(() => {
    init();
  }, [init]);

  const handleComplete = useCallback(
    async (result: ITestResult) => {
      if (excerpt) {
        await registerStudyAttempt(excerpt.id, result);
      }
      setTestResult(result);
    },
    [excerpt, registerStudyAttempt],
  );

  const handleContinue = useCallback(() => {
    onComplete?.();
    if (!initialExcerpt) {
      setTestResult(null);
      setModel(undefined);
      init();
    }
  }, [onComplete, initialExcerpt, init]);

  if (!model || !excerpt) {
    return <Loader />;
  }

  if (testResult) {
    return (
      <TestFeedback
        result={testResult}
        onContinue={handleContinue}
        onRetry={() => setTestResult(null)}
      />
    );
  }

  return (
    <TextToSource onComplete={handleComplete} test={model} excerpt={excerpt} />
  );
};
