import { useCallback } from "react";
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Verse, VersesStateShape } from "entities/Verse";
import { useVerseStorageContext } from "./verseStorageContext";
import { saveVerseThunk } from "./save.thunk";

export function useSaveVerse() {
    const db = useVerseStorageContext();
    const dispatch: ThunkDispatch<VersesStateShape, unknown, AnyAction> = useDispatch();
    return useCallback((verse: Verse) =>
        dispatch(saveVerseThunk({ verse, db }))
        , [db, dispatch]);
}