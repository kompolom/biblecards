import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons';

import Page from './componets/Page';
import { Card } from './componets/Card';
import { withToggle } from './componets/Card/withToggle';
import { Verse } from './models/Verse';
import sampleVerses from './data/sampleVerses.json'

const CardToggleable = withToggle(Card);
const verses = sampleVerses.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});

function App() {
  return (
    <div className="App">
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
          <Typography variant="h6">News</Typography>
        </IconButton>
        </Toolbar>
      </AppBar>
    <nav>
          <ul>
            {[ ['/', 'Процитируй текст'],['/add', 'Добавить стих'],['/list', 'Список стихов'] ].map(navItem => {
              return (<li key={navItem[0]}><Link to={navItem[0]}>{navItem[1]}</Link></li>)
            })}
          </ul>
        </nav>
      <Switch>
        <Route path="/list">
          <Page>
            {
              verses.map(verse => {
                return (<li key={verse.source}><Card view="list" verse={verse} /></li>);
              })
            }
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
