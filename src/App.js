import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Page from './components/Page';
import { Card } from './components/Card';
import { withToggle } from './components/Card/withToggle';
import { VerseForm } from './components/VerseForm';
import { AppHeader } from './components/AppHeader/';

const mapStateToProps = state => ({
  stateApp: state
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.verseRandom = this.getRandomElement(this.props.stateApp.stateVerse);
  }

  getRandomElement(arr) {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  }

  render() {
  console.log(this.props.stateApp);

  const CardToggleable = withToggle(Card);
  
  return (
    <div className="App">
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/list">
          <Page>
            <List>
                {
                  this.props.stateApp.stateVerse.map(verse => {
                    return (
                      <ListItem key={verse.source}> 
                        <Card view="list" verse={verse} /> 
                      </ListItem>);
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
            <div className='container'>
              <CardToggleable view="single" verse={this.verseRandom} />
             </div>
            <div className='container container_align_justify'>
              <Button variant="outlined"> Неправильно </Button>
              <Button variant="outlined"> Правильно </Button>
            </div>
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
  }
}

export default connect(mapStateToProps) (App);
