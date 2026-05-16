import { Excerpt } from 'entities/Verse';
import { IProgress } from 'entities/Progress';
import { SessionStrategy, ISessionStep } from 'entities/LearningSession';
import { shuffle } from 'shared/random';

export const selectExcerpts = (
  allExcerpts: Excerpt[],
  allProgress: IProgress[],
  strategy: SessionStrategy,
  count: number
): ISessionStep[] => {
  let selectedExcerpts: Excerpt[] = [];

  if (strategy === 'random') {
    selectedExcerpts = shuffle([...allExcerpts]).slice(0, count);
  } else if (strategy === 'weakest') {
    // Sort by masteryLevel (1-5), new ones (no progress) are considered level 1
    const progressMap = new Map(allProgress.map(p => [p.excerptId, p]));

    const sorted = [...allExcerpts].sort((a, b) => {
      const masteryA = progressMap.get(a.id)?.masteryLevel ?? 0;
      const masteryB = progressMap.get(b.id)?.masteryLevel ?? 0;
      return masteryA - masteryB;
    });

    selectedExcerpts = sorted.slice(0, count);
  }

  return selectedExcerpts.map(excerpt => {
    const progress = allProgress.find(p => p.excerptId === excerpt.id);
    const mastery = progress?.masteryLevel ?? 0;

    return {
      excerptId: excerpt.id,
      testType: mastery >= 3 ? 'scramble' : 'text-to-variants'
    };
  });
};
