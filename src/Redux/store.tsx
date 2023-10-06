import { configureStore } from '@reduxjs/toolkit';
import { alertManagerSlice } from 'widgets/AlertManager';
import { versesSlice } from 'entities/Verse';
import { statsReducer } from './rootReducer';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    verses: versesSlice.reducer,
    alerts: alertManagerSlice.reducer,
  },
  devTools: true,
});
