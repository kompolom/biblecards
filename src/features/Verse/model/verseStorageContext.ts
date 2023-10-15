import { createContext, useContext, Context } from "react";
import { IVerseStorage } from "../api";

const VerseStorageContext: Context<IVerseStorage> = createContext(null);
VerseStorageContext.displayName = 'VerseStorageContext';

export const VerseStorageContextProvider = VerseStorageContext.Provider

export function useVerseStorageContext() {
    return useContext(VerseStorageContext);
}