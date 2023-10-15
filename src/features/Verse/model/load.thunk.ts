import { createAsyncThunk } from "@reduxjs/toolkit";
import { versesSlice } from "entities/Verse";
import { IVerseStorage } from "../api";

export type LoadVersesQuery = {
    skip?: number
    limit?: number
    id?: number
}
type LoadVersesThunkArgs = {
    query?: LoadVersesQuery,
    db: IVerseStorage
}

export const loadVersesThunk = createAsyncThunk('verses/load', async ({ query = {}, db }: LoadVersesThunkArgs, { dispatch }) => {
    const verses = await db.getVerses(query);
    dispatch(versesSlice.actions.versesLoaded(verses));
});