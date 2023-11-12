import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import { store } from './Redux/store';

const root = createRoot(document.getElementById('⚛️'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

serviceWorker.unregister();
