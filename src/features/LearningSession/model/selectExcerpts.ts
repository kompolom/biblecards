import { Excerpt } from 'entities/Verse';
import { IProgress } from 'entities/Progress';
import { SessionStrategy, ISessionStep } from 'entities/LearningSession';
import { shuffle, getRandomArrayItem } from 'shared/random';

const MASTERY_TEST_MAP: Record<number, ISessionStep['testType'][]> = {
  0: ['flip-card-source'],
  1: ['flip-card-text'],
  2: ['text-to-variants'],
  4: ['scramble'],
};

/**
 * Determines the appropriate test type based on the user's mastery level.
 * Uses a threshold-based map to find available test options for the given level.
 *
 * @param mastery - The current mastery level of the excerpt (0 to 5).
 * @returns A randomly selected test type available for the matched mastery threshold.
 */
const getTestTypeByMastery = (mastery: number): ISessionStep['testType'] => {
  const thresholds = Object.keys(MASTERY_TEST_MAP)
    .map(Number)
    .sort((a, b) => b - a);

  const matchedThreshold = thresholds.find((t) => mastery >= t) ?? 0;
  const options = MASTERY_TEST_MAP[matchedThreshold];

  return getRandomArrayItem(options);
};

/**
 * Selects a set of excerpts and assigns appropriate test types for a learning session.
 * Supports different selection strategies like 'random' or 'weakest'.
 *
 * @param allExcerpts - List of all available Bible excerpts.
 * @param allProgress - Current user progress for each excerpt.
 * @param strategy - The selection strategy ('random' or 'weakest').
 * @param count - Maximum number of excerpts to include in the session.
 * @returns An array of session steps, each containing an excerpt ID and its assigned test type.
 */
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
      testType: getTestTypeByMastery(mastery),
    };
  });
};
