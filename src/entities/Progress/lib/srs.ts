import { ISRSData, IProgressStats } from '../model/IProgress';

/**
 * Result of a study session.
 */
export interface IStudyResult {
  /** Accuracy from 0.0 to 1.0 */
  accuracy: number;
  /** Whether the test was successfully completed without too many hints */
  isSuccess: boolean;
  /** Date of the session */
  timestamp: Date;
}

/**
 * SRS Manager implements spaced repetition logic.
 */
export class SRSManager {
  /**
   * Calculates the next SRS state based on current data and performance.
   * This implementation uses a variation of the SM-2 algorithm.
   */
  static calculateNextReview(
    currentSrs: ISRSData,
    result: IStudyResult,
  ): { srs: ISRSData; masteryChange: number } {
    const { accuracy, isSuccess } = result;

    // Map accuracy and success to a grade (0-5)
    // 5: perfect response
    // 4: correct response after a hesitation
    // 3: correct response recalled with serious difficulty
    // 2: incorrect response; where the correct one seemed easy to recall
    // 1: incorrect response; the correct one remembered
    // 0: complete blackout.
    let grade = 0;
    if (isSuccess) {
      if (accuracy >= 0.95) grade = 5;
      else if (accuracy >= 0.85) grade = 4;
      else grade = 3;
    } else {
      if (accuracy >= 0.6) grade = 2;
      else if (accuracy >= 0.3) grade = 1;
      else grade = 0;
    }

    let { interval, easeFactor } = currentSrs;
    let masteryChange = 0;

    if (grade >= 3) {
      // Success
      if (interval === 0) {
        interval = 1;
      } else if (interval === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }

      // Update ease factor
      easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;

      masteryChange = 1;
    } else {
      // Failure
      interval = 1;
      // We don't decrease ease factor as much as SM-2 for failure to avoid "ease hell" too quickly
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      masteryChange = -1;
    }

    const nextReviewDate = new Date(result.timestamp);
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
      srs: {
        lastReviewDate: result.timestamp.toISOString(),
        nextReviewDate: nextReviewDate.toISOString(),
        interval,
        easeFactor,
      },
      masteryChange,
    };
  }

  /**
   * Updates progress statistics.
   */
  static updateStats(
    currentStats: IProgressStats,
    result: IStudyResult,
  ): IProgressStats {
    return {
      successCount: currentStats.successCount + (result.isSuccess ? 1 : 0),
      failCount: currentStats.failCount + (result.isSuccess ? 0 : 1),
      bestAccuracy: Math.max(currentStats.bestAccuracy, result.accuracy),
    };
  }

  /**
   * Calculates new mastery level (clamped 1-5).
   */
  static calculateMastery(currentLevel: number, change: number): number {
    const nextLevel = currentLevel + change;
    return Math.max(1, Math.min(5, nextLevel));
  }
}
