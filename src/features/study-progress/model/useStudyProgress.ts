import { useCallback } from 'react';
import {
  useProgressRepository,
  SRSManager,
  IProgress,
  IStudyResult
} from 'entities/Progress';
import { ITestResult } from 'entities/Test';

/**
 * Hook for managing study progress updates.
 */
export function useStudyProgress() {
  const repository = useProgressRepository();

  const registerStudyAttempt = useCallback(async (
    excerptId: string,
    testResult: ITestResult
  ) => {
    if (!repository) return;

    let progress = await repository.getById(excerptId);

    // Initial progress if not exists
    if (!progress) {
      progress = {
        excerptId,
        masteryLevel: 1,
        srs: {
          lastReviewDate: new Date(0).toISOString(),
          nextReviewDate: new Date().toISOString(),
          interval: 0,
          easeFactor: 2.5,
        },
        stats: {
          successCount: 0,
          failCount: 0,
          bestAccuracy: 0,
        },
        updatedAt: new Date().toISOString(),
      };
    }

    const studyResult: IStudyResult = {
      accuracy: testResult.accuracy,
      isSuccess: testResult.status,
      timestamp: new Date(),
    };

    const nextSrs = SRSManager.calculateNextReview(progress.srs, studyResult);
    const nextStats = SRSManager.updateStats(progress.stats, studyResult);
    const nextMastery = SRSManager.calculateMastery(progress.masteryLevel, nextSrs.masteryChange);

    const updatedProgress: IProgress = {
      ...progress,
      masteryLevel: nextMastery,
      srs: nextSrs.srs,
      stats: nextStats,
      updatedAt: new Date().toISOString(),
    };

    await repository.save(updatedProgress);
    return updatedProgress;
  }, [repository]);

  return { registerStudyAttempt };
}
