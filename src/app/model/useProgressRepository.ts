import { useInitDb } from './useInitDb';
import { useEffect, useState } from 'react';
import { IProgressRepository } from 'entities/Progress';
import { IndexedDBProgressRepository } from '../repositories/Progress.repository';

export function useProgressRepository() {
  const [repo, setRepo] = useState<IProgressRepository | null>(null);
  const db = useInitDb();

  useEffect(() => {
    if (!db) return;
    const repository = new IndexedDBProgressRepository(db);
    setRepo(repository);
  }, [db]);

  return repo;
}
