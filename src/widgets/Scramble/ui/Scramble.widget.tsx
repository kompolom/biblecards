import React from 'react';
import { ScrambleTest } from 'features/Scramble';
import { useVerseStorageContext } from 'features/Verse';
import { Excerpt } from 'entities/Verse';
import { getRandomArrayItem } from 'shared/random';
import { Loader } from 'shared/ui/Loader';
import { useStudyProgress } from 'features/study-progress';
import { ITestResult, TestFeedback } from 'entities/Test';

interface ScrambleWidgetProps {
  excerpt?: Excerpt;
  onComplete?: () => void;
}

export const ScrambleWidget = ({
  excerpt: initialExcerpt,
  onComplete,
}: ScrambleWidgetProps) => {
  const repository = useVerseStorageContext();
  const { registerStudyAttempt } = useStudyProgress();
  const [excerpt, setExcerpt] = React.useState<Excerpt | null>(
    initialExcerpt || null,
  );
  const [testResult, setTestResult] = React.useState<ITestResult | null>(null);

  React.useEffect(() => {
    if (!initialExcerpt) {
      repository
        .getVerses({})
        .then(getRandomArrayItem)
        .then((verse) => {
          setExcerpt(verse);
        });
    }
  }, [repository, initialExcerpt]);

  const handleComplete = React.useCallback(
    async (result: ITestResult) => {
      if (excerpt) {
        await registerStudyAttempt(excerpt.id, result);
        setTestResult(result);
      }
    },
    [excerpt, registerStudyAttempt],
  );

  const handleContinue = React.useCallback(() => {
    onComplete?.();
    if (!initialExcerpt) {
      setTestResult(null);
      setExcerpt(null);
      repository
        .getVerses({})
        .then(getRandomArrayItem)
        .then((verse) => {
          setExcerpt(verse);
        });
    }
  }, [onComplete, initialExcerpt, repository]);

  if (!excerpt) return <Loader />;

  if (testResult) {
    return (
      <TestFeedback
        result={testResult}
        onContinue={handleContinue}
        onRetry={() => setTestResult(null)}
      />
    );
  }

  return <ScrambleTest onComplete={handleComplete} excerpt={excerpt} />;
};
