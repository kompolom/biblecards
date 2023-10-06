import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './Redux/store';
import { getDb } from './getDb';
import { versesSlice } from 'entities/Verse';

const root = createRoot(document.getElementById('⚛️'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

getDb().then(async (db) => {
  const verses = await db.getVerses();
  store.dispatch(versesSlice.actions.versesLoaded(verses));
});

serviceWorker.unregister();
