import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import Page from './components/Page';
import { AppHeader } from './components/AppHeader/';
import { correct, incorrect } from './Redux/actions';
import { AlertManagerProvider } from './shared/ui/AlertManager'
import { Typography } from '@mui/material';

const VerseForm = lazy(() => import('./components/VerseForm').then((module) => {
  return { default: module.VerseForm };
}));
const VersesList = lazy(() => import('./widgets/VersesList').then((module) => {
  return { default: module.VersesListWidget};
}));
const CardViewer = lazy(() => import('./components/CardViewer').then((module) => {
  return { default: module.CardViewer};
}));

const App = (props) => {
  return (
    <div className="App">
      <AlertManagerProvider>
        <Router>
          <AppHeader />
          <Routes>
            <Route index path="/" element={
              <Typography>Приветствую тебя дорогой посититель этого сайта, здесь тебе откроется невероятная возможность учить библейские стихи весело и быстро! Так как тут нет базы данных стихов тебе надо их записать самому, и ты можешь даже сам их придумать!</Typography>
            } />
            <Route path="/game" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <CardViewer />
              </Suspense>
            } />
            <Route path="/list" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <VersesList verses={props.verses} stats={props.verseStatistics} />
              </Suspense>
            } />
            <Route path="/add" element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <VerseForm />
              </Suspense>
            }>
            </Route>
            <Route path="/edit/:id"
               element={({match}) => {
                 const id = Number(match.params.id);
                 const verse = props.verses.find(verse => verse.id === id);
                 return (
                  <Page>
                    <Suspense fallback="Loading...">
                      <VerseForm key={verse.id} verse={verse} />
                    </Suspense>
                  </Page>
                 );
               }}
            />
          </Routes>
        </Router>
      </AlertManagerProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  stateApp: state,
  verses: state.verses,
  verseStatistics: state.stats
});

const mapDispatchToProps = dispatch => ({
  correct: (id) => {
    dispatch(correct(id))
  },
  incorrect: (id) => {
    dispatch(incorrect(id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (App);
