import { Excerpt } from 'entities/Verse';
import { IProgress } from 'entities/Progress';
import { SessionStrategy, ISessionStep } from 'entities/LearningSession';
import { shuffle } from 'shared/random';

export const selectExcerpts = (
  allExcerpts: Excerpt[],
  allProgress: IProgress[],
  strategy: SessionStrategy,
  count: number,
): ISessionStep[] => {
  // 1. Deduplicate excerpts by ID to ensure they are unique within the session
  const uniqueExcerptsMap = new Map<string, Excerpt>();
  allExcerpts.forEach((excerpt) => {
    if (excerpt.id) {
      uniqueExcerptsMap.set(excerpt.id, excerpt);
    }
  });

  const uniqueExcerpts = Array.from(uniqueExcerptsMap.values());

  // 2. Adjust count if there are fewer excerpts than requested
  const finalCount = Math.min(count, uniqueExcerpts.length);

  if (finalCount === 0) return [];

  let selectedExcerpts: Excerpt[] = [];

  if (strategy === 'random') {
    selectedExcerpts = shuffle([...uniqueExcerpts]).slice(0, finalCount);
  } else if (strategy === 'weakest') {
    // Sort by masteryLevel (1-5), new ones (no progress) are considered level 1 (or 0 here)
    const progressMap = new Map(allProgress.map((p) => [p.excerptId, p]));

    const sorted = [...uniqueExcerpts].sort((a, b) => {
      const masteryA = progressMap.get(a.id)?.masteryLevel ?? 0;
      const masteryB = progressMap.get(b.id)?.masteryLevel ?? 0;

      // If mastery is the same, randomize order among them to avoid same "weakest" order every time
      if (masteryA === masteryB) return Math.random() - 0.5;

      return masteryA - masteryB;
    });

    selectedExcerpts = sorted.slice(0, finalCount);
  }

  return selectedExcerpts.map((excerpt) => {
    const progress = allProgress.find((p) => p.excerptId === excerpt.id);
    const mastery = progress?.masteryLevel ?? 0;

    return {
      excerptId: excerpt.id,
      testType: mastery >= 3 ? 'scramble' : 'text-to-variants',
    };
  });
};
