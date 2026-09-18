import { createAsyncThunk } from "@reduxjs/toolkit";
import { Excerpt, versesSlice, IVerseRepository } from "entities/Verse";

type SaveVerseArgs = {
    verse: Excerpt,
    db: IVerseRepository
}

export const saveVerseThunk = createAsyncThunk('verse/save', async ({ verse, db }: SaveVerseArgs, { dispatch }) => {
    const saved = verse.id? await db.updateVerse(verse) : await db.createVerse(verse)
    versesSlice.actions.saveVerse(saved);
    return saved;
});