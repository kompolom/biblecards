import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import List from '@material-ui/core/List';

import Page from './components/Page';
import { Card } from './components/Card';
import { VerseForm } from './components/VerseForm';
import { AppHeader } from './components/AppHeader/';
import { correct, incorrect } from './Redux/actions';
import { FlashCard } from './components/FlashCard';
import { VerseStatistics } from './components/VerseStatistics';

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
    this.verseRandom = this.getRandomElement(this.props.stateApp.verses);
  }

  render() {
    console.log(this.props.verseStatistics);
  return (
    <div className="App">
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/list">
          <Page>
            <List>
                {
                  this.props.stateApp.verses.map(verse => {
                    return (
                      <div key={verse.source} className="ListItem">
                          <Card view="list" verse={verse} />
                          <VerseStatistics />
                      </div>
                    );
                  })
                }
            </List>
          </Page>
        </Route>
        <Route path="/add">
          <Page>
            <VerseForm />
          </Page>
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
