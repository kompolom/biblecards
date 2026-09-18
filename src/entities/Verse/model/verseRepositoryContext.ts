import { createContext, useContext, Context } from "react";
import { IVerseRepository } from "./IVerseRepository";

export const VerseRepositoryContext: Context<IVerseRepository> = createContext(null);
VerseRepositoryContext.displayName = 'VerseRepositoryContext';

export const VerseRepositoryProvider = VerseRepositoryContext.Provider;

export function useVerseRepository() {
    return useContext(VerseRepositoryContext);
}
