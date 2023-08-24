import { configureStore } from '@reduxjs/toolkit';
import { initState } from './initState';
import { alertManagerSlice } from 'widgets/AlertManager';
import { versesReducer, statsReducer } from './rootReducer';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    verses: versesReducer,
    alerts: alertManagerSlice.reducer,
  },
  preloadedState: initState,
  devTools: true,
});
