import { configureStore } from '@reduxjs/toolkit';
import { alertManagerSlice } from 'shared/ui/AlertManager';
import { versesSlice } from 'entities/Verse';

export const store = configureStore({
  reducer: {
    verses: versesSlice.reducer,
    alerts: alertManagerSlice.reducer,
  },
  devTools: true,
});
