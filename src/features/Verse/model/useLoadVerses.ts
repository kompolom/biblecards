import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { VersesStateShape } from "entities/Verse";
import { useVerseStorageContext } from "./verseStorageContext";
import { loadVersesThunk } from './load.thunk';

export function useLoadVerses() {
    const db = useVerseStorageContext();
    const dispatch: ThunkDispatch<VersesStateShape, unknown, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(loadVersesThunk({ db }))
    }, [db, dispatch]);
}