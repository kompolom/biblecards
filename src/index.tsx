import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import { store } from './Redux/store';

const root = createRoot(document.getElementById('⚛️'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
