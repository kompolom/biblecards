import { IProgress } from './IProgress';

/**
 * Interface for progress persistence.
 */
export interface IProgressRepository {
  /**
   * Retrieves progress for a specific excerpt.
   * @param excerptId The ID of the excerpt.
   */
  getById(excerptId: string): Promise<IProgress | null>;

  /**
   * Saves or updates progress record.
   * @param progress The progress data to save.
   */
  save(progress: IProgress): Promise<void>;

  /**
   * Retrieves all progress records.
   */
  getAll(): Promise<IProgress[]>;

  /**
   * Retrieves progress records that are due for review.
   * @param date The reference date (defaults to now).
   */
  getDueReviews(date?: Date): Promise<IProgress[]>;
}
