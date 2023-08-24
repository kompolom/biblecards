import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer';
import { initState } from './initState';

export const store = configureStore({
   reducer: rootReducer,
   preloadedState: initState,
   devTools: true
});
