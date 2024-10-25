import { useCallback } from "react"
import { parseFile } from '../lib';
import { Excerpt, ExcerptSource } from "entities/Verse";
import { useVerseRepository } from "app/model/useVerseRepository";

export const useImportVerses = () => {
    const repository = useVerseRepository();
    return useCallback(async (file: File) => {
        const records = await parseFile(file);
        const verses = records.values.map(record => new Excerpt(ExcerptSource.parse(record[0]), record[1]))
        return Promise.allSettled(verses.map(verse => repository.createVerse(verse)))
    }, [repository]);
}