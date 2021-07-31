import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './Redux/store';
import { getDb } from './getDb';
import { loadVerses } from "./Redux/actions";


ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>, 
   document.getElementById('⚛️')
);


getDb().then(async db => {
    const verses = await db.getVerses();
    store.dispatch(loadVerses(verses));
})

serviceWorker.unregister();
