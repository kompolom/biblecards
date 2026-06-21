import { Excerpt, ExcerptSource, VerseSource } from 'entities/Verse';
import { IProgress } from 'entities/Progress';
import { selectExcerpts } from './selectExcerpts';

describe('selectExcerpts', () => {
  const createExcerpt = (id: string) => {
    // Excerpt uses source.toString() as ID, so we mock source and toString
    const source = new ExcerptSource(new VerseSource({ book: 1, chapter: 1, verse: 1 }));
    jest.spyOn(source, 'toString').mockReturnValue(id);
    return new Excerpt(source, `Text for ${id}`);
  };

  const excerpts = [
    createExcerpt('verse-1'),
    createExcerpt('verse-2'),
    createExcerpt('verse-3'),
  ];

  const mockSRS = {
    lastReviewDate: '',
    nextReviewDate: '',
    interval: 0,
    easeFactor: 2.5,
  };

  const mockStats = {
    successCount: 0,
    failCount: 0,
    bestAccuracy: 0,
  };

  it('should assign flip-card-source for mastery level 0', () => {
    const progress: IProgress[] = [
      { excerptId: 'verse-1', masteryLevel: 0, srs: mockSRS, stats: mockStats, updatedAt: '' },
    ];

    const result = selectExcerpts(excerpts, progress, 'random', 3);
    const step = result.find(r => r.excerptId === 'verse-1');
    expect(step?.testType).toBe('flip-card-source');
  });

  it('should assign flip-card-text for mastery level 1', () => {
    const progress: IProgress[] = [
      { excerptId: 'verse-1', masteryLevel: 1, srs: mockSRS, stats: mockStats, updatedAt: '' },
    ];

    const result = selectExcerpts(excerpts, progress, 'random', 3);
    const step = result.find(r => r.excerptId === 'verse-1');
    expect(step?.testType).toBe('flip-card-text');
  });

  it('should assign text-to-variants for mastery level 2 and 3', () => {
    const progress: IProgress[] = [
      { excerptId: 'verse-1', masteryLevel: 2, srs: mockSRS, stats: mockStats, updatedAt: '' },
      { excerptId: 'verse-2', masteryLevel: 3, srs: mockSRS, stats: mockStats, updatedAt: '' },
    ];

    const result = selectExcerpts(excerpts, progress, 'random', 3);
    expect(result.find(r => r.excerptId === 'verse-1')?.testType).toBe('text-to-variants');
    expect(result.find(r => r.excerptId === 'verse-2')?.testType).toBe('text-to-variants');
  });

  it('should assign scramble for mastery level 4 and above', () => {
    const progress: IProgress[] = [
      { excerptId: 'verse-1', masteryLevel: 4, srs: mockSRS, stats: mockStats, updatedAt: '' },
      { excerptId: 'verse-2', masteryLevel: 10, srs: mockSRS, stats: mockStats, updatedAt: '' },
    ];

    const result = selectExcerpts(excerpts, progress, 'random', 3);
    expect(result.find(r => r.excerptId === 'verse-1')?.testType).toBe('scramble');
    expect(result.find(r => r.excerptId === 'verse-2')?.testType).toBe('scramble');
  });

  it('should pick exactly requested number of excerpts', () => {
    const result = selectExcerpts(excerpts, [], 'random', 2);
    expect(result).toHaveLength(2);
  });

  it('should sort by mastery level when using "weakest" strategy', () => {
    const progress: IProgress[] = [
      { excerptId: 'verse-1', masteryLevel: 5, srs: mockSRS, stats: mockStats, updatedAt: '' },
      { excerptId: 'verse-2', masteryLevel: 1, srs: mockSRS, stats: mockStats, updatedAt: '' },
      { excerptId: 'verse-3', masteryLevel: 3, srs: mockSRS, stats: mockStats, updatedAt: '' },
    ];

    const result = selectExcerpts(excerpts, progress, 'weakest', 3);
    expect(result[0].excerptId).toBe('verse-2'); // mastery 1
    expect(result[1].excerptId).toBe('verse-3'); // mastery 3
    expect(result[2].excerptId).toBe('verse-1'); // mastery 5
  });

  it('should treat missing progress as mastery level 0', () => {
    const result = selectExcerpts([excerpts[0]], [], 'random', 1);
    expect(result[0].testType).toBe('flip-card-source');
  });
});
