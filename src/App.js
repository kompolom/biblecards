import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Page from './components/Page';
import { Card } from './components/Card';
import { withToggle } from './components/Card/withToggle';
import { Verse } from './models/Verse';
import { VerseForm } from './components/VerseForm';
import { AppHeader } from './components/AppHeader/';
import sampleVerses from './data/sampleVerses.json';

const CardToggleable = withToggle(Card);
const verses = sampleVerses.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});

function getRandomElement(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const verseRandom = getRandomElement(verses)


function App() {

  return (
    <div className="App">
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/list">
          <Page>
            <List>
                {
                  verses.map(verse => {
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
              <CardToggleable view="single" verse={verseRandom} />
             </div>
            <div className='container container_align_justify'>
              <Button variant="outlined">Неправильно</Button>
              <Button variant="outlined">Правильно</Button>
            </div>
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
