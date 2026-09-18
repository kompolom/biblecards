import { createAsyncThunk } from "@reduxjs/toolkit";
import { versesSlice, IVerseRepository } from "entities/Verse";

export type LoadVersesQuery = {
    skip?: number
    limit?: number
    id?: string 
}
type LoadVersesThunkArgs = {
    query?: LoadVersesQuery,
    db: IVerseRepository
}

export const loadVersesThunk = createAsyncThunk('verses/load', async ({ query = {}, db }: LoadVersesThunkArgs, { dispatch }) => {
    const verses = await db.getVerses(query);
    dispatch(versesSlice.actions.versesLoaded(verses));
});

export const loadVerseThunk = createAsyncThunk('verses/loadOne', async ({ id, db }: { db: IVerseRepository, id: string }, { dispatch }) => {
    const verse = await db.getById(id);
    dispatch(versesSlice.actions.verseAdded(verse));
});