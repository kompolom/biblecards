import { SRSManager, IStudyResult } from './srs';
import { ISRSData, IProgressStats } from '../model/IProgress';

describe('SRSManager', () => {
  const initialSrs: ISRSData = {
    lastReviewDate: '2023-01-01T00:00:00.000Z',
    nextReviewDate: '2023-01-01T00:00:00.000Z',
    interval: 0,
    easeFactor: 2.5,
  };

  const timestamp = new Date('2023-01-01T12:00:00.000Z');

  describe('calculateNextReview', () => {
    it('should set interval to 1 for first success', () => {
      const result: IStudyResult = { accuracy: 1.0, isSuccess: true, timestamp };
      const next = SRSManager.calculateNextReview(initialSrs, result);

      expect(next.srs.interval).toBe(1);
      expect(next.masteryChange).toBe(1);
      const nextDate = new Date(next.srs.nextReviewDate);
      expect(nextDate.getDate()).toBe(2); // 1st + 1 day
    });

    it('should set interval to 6 for second success (interval was 1)', () => {
      const srs: ISRSData = { ...initialSrs, interval: 1 };
      const result: IStudyResult = { accuracy: 1.0, isSuccess: true, timestamp };
      const next = SRSManager.calculateNextReview(srs, result);

      expect(next.srs.interval).toBe(6);
    });

    it('should use ease factor for subsequent successes', () => {
      const srs: ISRSData = { ...initialSrs, interval: 6, easeFactor: 2.5 };
      const result: IStudyResult = { accuracy: 1.0, isSuccess: true, timestamp };
      const next = SRSManager.calculateNextReview(srs, result);

      expect(next.srs.interval).toBe(15); // 6 * 2.5 = 15
    });

    it('should reset interval to 1 on failure', () => {
      const srs: ISRSData = { ...initialSrs, interval: 15, easeFactor: 2.5 };
      const result: IStudyResult = { accuracy: 0.2, isSuccess: false, timestamp };
      const next = SRSManager.calculateNextReview(srs, result);

      expect(next.srs.interval).toBe(1);
      expect(next.masteryChange).toBe(-1);
    });
  });

  describe('updateStats', () => {
    it('should update success count and best accuracy', () => {
      const stats: IProgressStats = { successCount: 5, failCount: 2, bestAccuracy: 0.8 };
      const result: IStudyResult = { accuracy: 0.95, isSuccess: true, timestamp };
      const updated = SRSManager.updateStats(stats, result);

      expect(updated.successCount).toBe(6);
      expect(updated.failCount).toBe(2);
      expect(updated.bestAccuracy).toBe(0.95);
    });

    it('should update fail count', () => {
      const stats: IProgressStats = { successCount: 5, failCount: 2, bestAccuracy: 0.8 };
      const result: IStudyResult = { accuracy: 0.1, isSuccess: false, timestamp };
      const updated = SRSManager.updateStats(stats, result);

      expect(updated.successCount).toBe(5);
      expect(updated.failCount).toBe(3);
      expect(updated.bestAccuracy).toBe(0.8);
    });
  });

  describe('calculateMastery', () => {
    it('should clamp mastery level between 1 and 5', () => {
      expect(SRSManager.calculateMastery(5, 1)).toBe(5);
      expect(SRSManager.calculateMastery(1, -1)).toBe(1);
      expect(SRSManager.calculateMastery(3, 1)).toBe(4);
      expect(SRSManager.calculateMastery(3, -1)).toBe(2);
    });
  });
});
