import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, EntityId } from "@reduxjs/toolkit";
import { IVerse } from "./IVerse";
import { versesAdapter } from './verses.entityAdapter';
import { Excerpt } from "./Excerpt";

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
        versesLoaded: (state, action: PayloadAction<Excerpt[]>) => {
            versesAdapter.addMany(state.entities, action.payload.map(excerpt => ({ id: excerpt.id, text: excerpt.text })))
        },
        verseAdded: (state, action: PayloadAction<IVerse>) => {
            versesAdapter.addOne(state.entities, { id: action.payload.id, text: action.payload.text })
        },

        saveVerse: (state, action: PayloadAction<IVerse>) => {
            const { id, text } = action.payload;
            versesAdapter.upsertOne(state.entities, { id, text })
        },
        verseDeleted: (state, action: PayloadAction<EntityId>) => {
            versesAdapter.removeOne(state.entities, action.payload)
        }
    }
})

const { selectAll, selectById } = versesAdapter.getSelectors();

export const versesListSelector = (rootState: VersesStateShape) => selectAll(rootState.verses.entities);
export const getVerseById = createSelector([(rootState: VersesStateShape) => rootState.verses.entities, (_: unknown, id: string) => id], (state, id) => selectById(state, id)); 