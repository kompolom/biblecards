import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import Page from './components/Page';
import { VerseForm } from './components/VerseForm';
import { AppHeader } from './components/AppHeader/';
import { correct, incorrect } from './Redux/actions';
import { VersesList } from './components/VersesList';
import { AlertManagerProvider } from './shared/ui'
import { CardViewer } from "./components/CardViewer";

const App = (props) => {
  return (
    <div className="App">
      <AlertManagerProvider>
        <Router>
          <AppHeader />
          <Switch>
            <Route path="/list">
              <Page>
                <VersesList verses={props.verses} stats={props.verseStatistics} />
              </Page>
            </Route>
            <Route path="/add">
              <Page>
                <VerseForm />
              </Page>
            </Route>
            <Route path="/edit/:id"
               render={({match}) => {
                 const id = Number(match.params.id);
                 const verse = props.verses.find(verse => verse.id === id);
                 return (
                     <Page>
                       <VerseForm key={verse.id} verse={verse} />
                     </Page>
                 );
               }}
            />
            <Route path="/">
              <Page>
                <CardViewer />
              </Page>
            </Route>
          </Switch>
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
