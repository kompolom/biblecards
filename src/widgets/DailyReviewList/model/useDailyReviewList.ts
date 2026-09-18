import { useCallback } from "react";
import { Excerpt, useVerseRepository } from "entities/Verse";
import { IProgress, useProgressRepository } from 'entities/Progress';

export type ReviewListItem = { verse: Excerpt; progress: IProgress };

export const useLoadDailyReviewList = () => {
  const progress = useProgressRepository();
  const verses = useVerseRepository();
  return useCallback(async (): Promise<Array<ReviewListItem>> => {
    const dueReview = await progress.getDueReviews();
    const result: ReviewListItem[] = [];
    let verse: Excerpt;
    for (const p of dueReview) {
      try {
        verse = await verses.getById(p.excerptId);
        result.push({ progress: p, verse });
      } catch (err) {
        console.warn('Cant load verse', p.excerptId);
      }
    }
    return result;
  }, [progress, verses]);
}
