/**
 * Spaced Repetition System (SRS) data for an excerpt.
 */
export interface ISRSData {
  /** Last review date in ISO-8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  lastReviewDate: string;
  /** Next scheduled review date in ISO-8601 format */
  nextReviewDate: string;
  /** Current interval in days */
  interval: number;
  /** Ease factor (usually starting at 2.5) */
  easeFactor: number;
}

/**
 * Statistics for learning an excerpt.
 */
export interface IProgressStats {
  successCount: number;
  failCount: number;
  /** Best accuracy achieved in tests (0.0 to 1.0) */
  bestAccuracy: number;
}

/**
 * Progress tracking for a specific Bible excerpt.
 */
export interface IProgress {
  /** The unique ID of the excerpt (source.toString()) */
  excerptId: string;
  /** Mastery level from 1 (New) to 5 (Mastered) */
  masteryLevel: number;
  /** SRS scheduling data */
  srs: ISRSData;
  /** Aggregated statistics */
  stats: IProgressStats;
  /** Last modified timestamp in ISO-8601 */
  updatedAt: string;
}
