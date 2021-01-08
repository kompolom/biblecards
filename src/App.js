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
import { randVerse } from './.store/actions';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // this.verseRandom = this.getRandomElement(this.props.stateApp.stateVerse);
  // }

  // getRandomElement(arr) {
  //   let randIndex = Math.floor(Math.random() * arr.length);
  //   return arr[randIndex];
  // }

  render() {
  console.log(this.props.stateApp);
  console.log(this.props.stateApp.randomVerse);
  console.log(this.props.stateApp.stateVerse);
    
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
              <CardToggleable view="single" verse={this.props.stateApp.randomVerse} />
             </div>
            <div className='container container_align_justify'>
              <Button variant="outlined" onClick={this.props.randomVerse} > Неправильно </Button>
              <Button variant="outlined" onClick={this.props.randomVerse} > Правильно </Button>
            </div>
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
  }
};

const mapStateToProps = state => ({
  stateApp: state
});
const mapDispatchToProps = dispatch => ({
  randomVerse: () => {
    dispatch(randVerse())
  }
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
