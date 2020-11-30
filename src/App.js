import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Page from './componets/Page';
import { Card } from './componets/Card';
import { withToggle } from './componets/Card/withToggle';
import { Verse } from './models/Verse';
import { AppHeader } from './componets/AppHeader'
import sampleVerses from './data/sampleVerses.json'

const CardToggleable = withToggle(Card);
const verses = sampleVerses.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});

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
            Добавление стиха
          </Page>
        </Route>
        <Route path="/">
          <Page>
            <div className='container'>
              <CardToggleable view="single" verse={verses[0]} />
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
