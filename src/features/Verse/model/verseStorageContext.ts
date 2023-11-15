import { createContext, useContext, Context } from "react";
import { IVerseRepository } from "../api";

const VerseStorageContext: Context<IVerseRepository> = createContext(null);
VerseStorageContext.displayName = 'VerseStorageContext';

export const VerseStorageContextProvider = VerseStorageContext.Provider

export function useVerseStorageContext() {
    return useContext(VerseStorageContext);
}