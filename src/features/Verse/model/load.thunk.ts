import { createAsyncThunk } from "@reduxjs/toolkit";
import { versesSlice } from "entities/Verse";
import { IVerseRepository } from "../api";

export type LoadVersesQuery = {
    skip?: number
    limit?: number
    id?: number
}
type LoadVersesThunkArgs = {
    query?: LoadVersesQuery,
    db: IVerseRepository
}

export const loadVersesThunk = createAsyncThunk('verses/load', async ({ query = {}, db }: LoadVersesThunkArgs, { dispatch }) => {
    const verses = await db.getVerses(query);
    dispatch(versesSlice.actions.versesLoaded(verses));
});

export const loadVerseThunk = createAsyncThunk('verses/loadOne', async ({ id, db }: { db: IVerseRepository, id: number }, { dispatch }) => {
    const verse = await db.getById(id);
    dispatch(versesSlice.actions.verseAdded(verse));
});