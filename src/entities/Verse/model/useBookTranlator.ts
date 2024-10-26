import { createContext, useContext } from "react";
import { BookTranslator } from './formatExcerptSource';
const bookCtx = createContext<BookTranslator>((n) => String(n))
export const BookTranslatorContext = bookCtx.Provider;
export const useBookTranlator = () => useContext(bookCtx)