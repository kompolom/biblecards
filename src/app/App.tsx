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
import { ProgressRepositoryProvider } from 'entities/Progress';
import { useProgressRepository } from './model/useProgressRepository';
import books_ru from './translations/books.ru.json';

const VersesListPage = lazy(() =>
  import('../pages/versesList').then((module) => {
    return { default: module.default };
  }),
);
const PageVerseEdit = lazy(() => import('../pages/verseEdit'));
const PageVerseAdd = lazy(() => import('../pages/verseAdd'));
const ProgressPage = lazy(() =>
  import('../pages/progress').then((m) => ({ default: m.ProgressPage })),
);
const HomePage = lazy(() =>
  import('../pages/home').then((m) => ({ default: m.HomePage })),
);
const GamePage = lazy(() =>
  import('../pages/game').then((module) => ({ default: module.GamePage })),
);

export const App = () => {
  const db = useVerseRepository();
  const progressDb = useProgressRepository();
  const ru: BookTranslator = useCallback(
    (book: number) => books_ru[book - 1],
    [],
  );
  return (
    <Provider store={store}>
      <BookTranslatorContext value={ru}>
        <div className="App">
          <VerseStorageContextProvider value={db}>
            <ProgressRepositoryProvider value={progressDb}>
              <AlertManagerProvider>
                <RoutesContextProvider value={routes}>
                  <Router>
                    <Header />
                    <Routes>
                      <Route
                        index
                        path="/"
                        element={
                          <Suspense fallback={<LoaderSplash />}>
                            <HomePage />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/progress"
                        element={
                          <Suspense fallback={<LoaderSplash />}>
                            <ProgressPage />
                          </Suspense>
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
            </ProgressRepositoryProvider>
          </VerseStorageContextProvider>
        </div>
      </BookTranslatorContext>
    </Provider>
  );
};
