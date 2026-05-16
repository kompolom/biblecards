import { useState, useCallback, useEffect } from 'react';
import {
  ISessionConfig,
  ISessionState,
  ISessionResult,
} from 'entities/LearningSession';
import { useVerseStorageContext } from 'features/Verse';
import { useProgressRepository } from 'entities/Progress';
import { useStudyProgress } from 'features/study-progress';
import { ITestResult } from 'entities/Test';
import { Excerpt } from 'entities/Verse';
import { selectExcerpts } from './selectExcerpts';

export function useLearningSession(config: ISessionConfig) {
  const verseStorage = useVerseStorageContext();
  const progressRepository = useProgressRepository();
  const { registerStudyAttempt } = useStudyProgress();

  const [state, setState] = useState<ISessionState>({
    steps: [],
    currentIndex: 0,
    results: [],
    isCompleted: false,
  });

  const [loading, setLoading] = useState(true);
  const [currentExcerpt, setCurrentExcerpt] = useState<Excerpt | null>(null);

  // Initialize session
  useEffect(() => {
    async function init() {
      if (!verseStorage || !progressRepository) return;

      const [excerpts, progress] = await Promise.all([
        verseStorage.getVerses({}),
        progressRepository.getAll(),
      ]);

      const steps = selectExcerpts(
        excerpts,
        progress,
        config.strategy,
        config.count,
      );

      setState((prev) => ({
        ...prev,
        steps,
        isCompleted: steps.length === 0,
      }));
      setLoading(false);
    }
    init();
  }, [verseStorage, progressRepository, config.strategy, config.count]);

  // Update current excerpt when step changes
  useEffect(() => {
    if (state.steps.length > 0 && state.currentIndex < state.steps.length) {
      const step = state.steps[state.currentIndex];
      verseStorage?.getById(step.excerptId).then(setCurrentExcerpt);
    } else {
      setCurrentExcerpt(null);
    }
  }, [state.currentIndex, state.steps, verseStorage]);

  const handleStepComplete = useCallback(
    async (result: ITestResult) => {
      const currentStep = state.steps[state.currentIndex];

      // Register progress
      await registerStudyAttempt(currentStep.excerptId, result);

      const sessionResult: ISessionResult = {
        excerptId: currentStep.excerptId,
        result,
      };

      setState((prev) => {
        const nextIndex = prev.currentIndex + 1;
        const isCompleted = nextIndex >= prev.steps.length;

        return {
          ...prev,
          results: [...prev.results, sessionResult],
          currentIndex: nextIndex,
          isCompleted,
        };
      });
    },
    [state.currentIndex, state.steps, registerStudyAttempt],
  );

  const currentStep = state.steps[state.currentIndex];

  return {
    loading,
    currentStep,
    currentExcerpt,
    isCompleted: state.isCompleted,
    results: state.results,
    handleStepComplete,
    currentIndex: state.currentIndex,
    totalSteps: state.steps.length,
  };
}
