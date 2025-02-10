import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { VersesStateShape } from "entities/Verse";
import { useVerseStorageContext } from "./verseStorageContext";
import { loadVerseThunk } from './load.thunk';

export function useLoadVerse(id: string) {
    const db = useVerseStorageContext();
    const dispatch: ThunkDispatch<VersesStateShape, unknown, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(loadVerseThunk({ id, db }))
    }, [id, db, dispatch]);
}