import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, EntityId } from "@reduxjs/toolkit";
import { IVerse } from "./IVerse";
import { versesAdapter } from './verses.entityAdapter';

export type VersesState = {
    entities: ReturnType<typeof versesAdapter.getInitialState>
};
export type VersesStateShape = { verses: VersesState }

const initialState: VersesState = {
    entities: versesAdapter.getInitialState()
}

export const versesSlice = createSlice({
    name: 'verses',
    initialState,
    reducers: {
        versesLoaded: (state, action: PayloadAction<IVerse[]>) => {
            versesAdapter.addMany(state.entities, action.payload)
        },
        verseAdded: (state, action: PayloadAction<IVerse>) => {
            versesAdapter.addOne(state.entities, action.payload)
        },
        saveVerse: (state, action: PayloadAction<IVerse>) => {
            versesAdapter.upsertOne(state.entities, action.payload)
        },
        verseDeleted: (state, action: PayloadAction<EntityId>) => {
            versesAdapter.removeOne(state.entities, action.payload)
        }
    }
})

const { selectAll, selectById } = versesAdapter.getSelectors();

export const versesListSelector = (rootState: VersesStateShape) => selectAll(rootState.verses.entities);
export const getVerseById = createSelector([(rootState: VersesStateShape) => rootState.verses.entities, (_: unknown, id: number) => id], (state, id) => selectById(state, id)); 