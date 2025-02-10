import { useInitDb } from './useInitDb';
import { useEffect, useState } from 'react';
import { IVerseRepository } from 'features/Verse';
import { VerseRepository } from '../repositories/Verse.repository';
import { isBrowser } from 'shared/utils';

export function useVerseRepository() {
  const [repo, setRepo] = useState<IVerseRepository>(null);
  const db = useInitDb();
  useEffect(() => {
    if (!db) return;
    const repo = new VerseRepository(db);
    setRepo(repo);
    isBrowser() && (window['verseRepository'] = repo);
  }, [db]);
  return repo;
}
