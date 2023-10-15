import { createAsyncThunk } from "@reduxjs/toolkit";
import { Verse, versesSlice } from "entities/Verse";
import { IVerseStorage } from "../api";

type SaveVerseArgs = {
    verse: Verse,
    db: IVerseStorage
}

export const saveVerseThunk = createAsyncThunk('verse/save', async ({ verse, db }: SaveVerseArgs, { dispatch }) => {
    const saved = verse.id? await db.updateVerse(verse) : await db.createVerse(verse)
    versesSlice.actions.saveVerse(saved);
    return saved;
});