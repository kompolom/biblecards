import { createContext, useContext } from 'react';
import { IProgressRepository } from './IProgressRepository';

export const ProgressRepositoryContext = createContext<IProgressRepository | null>(null);
ProgressRepositoryContext.displayName = 'ProgressRepositoryContext';

export const ProgressRepositoryProvider = ProgressRepositoryContext.Provider;

export function useProgressRepository() {
  const context = useContext(ProgressRepositoryContext);
  if (context === undefined) {
    throw new Error('useProgressRepository must be used within a ProgressRepositoryProvider');
  }
  return context;
}
