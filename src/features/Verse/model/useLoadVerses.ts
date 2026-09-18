import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { VersesStateShape, useVerseRepository } from "entities/Verse";
import { loadVersesThunk } from './load.thunk';

export function useLoadVerses() {
    const db = useVerseRepository();
    const dispatch: ThunkDispatch<VersesStateShape, unknown, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(loadVersesThunk({ db }))
    }, [db, dispatch]);
}