import React, { Suspense, lazy, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';

import { Header } from 'widgets/Header';
import { AlertManagerProvider } from 'shared/ui/AlertManager';
import { Typography } from '@mui/material';
import { BookTranslator, BookTranslatorContext, VerseRepositoryProvider } from 'entities/Verse';
import { routes } from './model';
import { RoutesContextProvider } from 'shared/routes';
import { LoaderSplash } from 'shared/ui/LoaderSplash';
import { useVerseRepository } from './model/useVerseRepository';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from './store';
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

  const theme = createTheme({
    palette: {
      primary: { main: '#3f51b5' },
      text: { primary: '#34495e' },
    },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
          containedPrimary: {
            backgroundColor: 'var(--color-theme)',
            color: 'var(--color-text-inverse)',
            '&:hover': {
              backgroundColor: 'var(--color-theme)',
              filter: 'brightness(0.9)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--color-theme)',
            color: 'var(--color-text-inverse)',
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BookTranslatorContext value={ru}>
          <div className="App">
            <VerseRepositoryProvider value={db}>
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
            </VerseRepositoryProvider>
          </div>
        </BookTranslatorContext>
      </ThemeProvider>
    </Provider>
  );
};
