import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';

import { AppHeader } from '../components/AppHeader/';
import { AlertManagerProvider } from '../shared/ui/AlertManager';
import { Typography } from '@mui/material';
import { PageVerseEdit } from '../pages/verseEdit';
import { PageVerseAdd } from '../pages/verseAdd';
import { useInitDb } from './model/useInitDb';
import { VerseStorageContextProvider } from 'features/Verse';

const VersesListPage = lazy(() =>
  import('../pages/versesList').then((module) => {
    return { default: module.default };
  }),
);
const CardViewer = lazy(() =>
  import('../components/CardViewer').then((module) => {
    return { default: module.CardViewer };
  }),
);

export const App = (props) => {
  const db = useInitDb();
  return (
    <div className="App">
      <VerseStorageContextProvider value={db}>
        <AlertManagerProvider>
          <Router>
            <AppHeader />
            <Routes>
              <Route
                index
                path="/"
                element={
                  <Typography>
                    Приветствую тебя дорогой посититель этого сайта, здесь тебе
                    откроется невероятная возможность учить библейские стихи
                    весело и быстро! Так как тут нет базы данных стихов тебе
                    надо их записать самому, и ты можешь даже сам их придумать!
                  </Typography>
                }
              />
              <Route
                path="/game"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <CardViewer />
                  </Suspense>
                }
              />
              <Route
                path="/list"
                element={<VersesListPage />}
              />
              <Route
                path="/add"
                element={<PageVerseAdd />}
              ></Route>
              <Route path="/edit/:id" element={<PageVerseEdit />} />
            </Routes>
          </Router>
        </AlertManagerProvider>
      </VerseStorageContextProvider>
    </div>
  );
};
