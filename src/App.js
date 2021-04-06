import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Page from './components/Page';
import { VerseForm } from './components/VerseForm';
import { AppHeader } from './components/AppHeader/';
import { correct, incorrect } from './Redux/actions';
import { FlashCard } from './components/FlashCard';
import { VersesList } from './components/VersesList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.updateRandom = this.updateRandom.bind(this);
    this.updateRandom();
  }

  getRandomElement(arr) {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  }

  updateRandom() {
    this.verseRandom = this.getRandomElement(this.props.verses);
  }
  
  render() {
  return (
    <div className="App">
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/list">
          <Page>
              <VersesList verses={this.props.verses} stats={this.props.verseStatistics} />
          </Page>
        </Route>
        <Route path="/add">
          <Page>
            <VerseForm />
          </Page>
        </Route>
        <Route path="/edit/:id"
          render={({match}) => {
            const id = match.params.id;
            const verse = this.props.verses.find(verse => verse.id == id);
            return (
              <Page>
                <VerseForm key={verse.id} verse={verse} />
              </Page>
            );
          }}
        >
        </Route>
        <Route path="/">
          <Page>
            <FlashCard verse={this.verseRandom} nextTrigger={this.updateRandom} />
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
  }
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
