import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './Redux/store';
import { getDb } from './getDb';
import { loadVerses } from './Redux/actions';

const root = createRoot(document.getElementById('⚛️'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

getDb().then(async (db) => {
  const verses = await db.getVerses();
  store.dispatch(loadVerses(verses));
});

serviceWorker.unregister();
