import React, { Suspense, lazy, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';

import { Header } from 'widgets/Header';
import { AlertManagerProvider } from 'shared/ui/AlertManager';
import { Typography } from '@mui/material';
import { VerseStorageContextProvider } from 'features/Verse';
import { routes } from './model';
import { RoutesContextProvider } from 'shared/routes';
import { LoaderSplash } from 'shared/ui/LoaderSplash';
import { useVerseRepository } from './model/useVerseRepository';
import { Provider } from 'react-redux';
import { store } from './store';
import { BookTranslator, BookTranslatorContext } from 'entities/Verse';
import books_ru from './translations/books.ru.json';

const VersesListPage = lazy(() =>
  import('../pages/versesList').then((module) => {
    return { default: module.default };
  }),
);
const PageVerseEdit = lazy(() => import('../pages/verseEdit'));
const PageVerseAdd = lazy(() => import('../pages/verseAdd'));
const GamePage = lazy(() =>
  import('../pages/game').then((module) => ({ default: module.GamePage })),
);

export const App = () => {
  const db = useVerseRepository();
  const ru: BookTranslator = useCallback((book: number) => books_ru[book - 1], []);
  return (
    <Provider store={store}>
      <BookTranslatorContext value={ru}>
      <div className="App">
        <VerseStorageContextProvider value={db}>
          <AlertManagerProvider>
            <RoutesContextProvider value={routes}>
              <Router>
                <Header />
                <Routes>
                  <Route
                    index
                    path="/"
                    element={
                      <Typography>
                        Приветствую тебя дорогой посититель этого сайта, здесь
                        тебе откроется невероятная возможность учить библейские
                        стихи весело и быстро! Так как тут нет базы данных
                        стихов тебе надо их записать самому, и ты можешь даже
                        сам их придумать!
                      </Typography>
                    }
                  />
                  <Route
                    path="/game"
                    element={
                      <Suspense fallback={<LoaderSplash />}>
                        <GamePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/list"
                    element={
                      <Suspense fallback={<LoaderSplash />}>
                        <VersesListPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/add"
                    element={
                      <Suspense fallback={<LoaderSplash />}>
                        <PageVerseAdd />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/edit/:id"
                    element={
                      <Suspense fallback={<LoaderSplash />}>
                        <PageVerseEdit />
                      </Suspense>
                    }
                  />
                </Routes>
              </Router>
            </RoutesContextProvider>
          </AlertManagerProvider>
        </VerseStorageContextProvider>
      </div>
      </BookTranslatorContext>
    </Provider>
  );
};
