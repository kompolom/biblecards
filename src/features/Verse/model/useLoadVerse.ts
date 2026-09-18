import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { VersesStateShape, useVerseRepository } from "entities/Verse";
import { loadVerseThunk } from './load.thunk';

export function useLoadVerse(id: string) {
    const db = useVerseRepository();
    const dispatch: ThunkDispatch<VersesStateShape, unknown, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(loadVerseThunk({ id, db }))
    }, [id, db, dispatch]);
}