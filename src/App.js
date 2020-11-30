import React from 'react';
import './App.css';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
            <CardToggleable view="single" verse={verses[0]} />
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
