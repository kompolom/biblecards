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
import { Verse } from './models/Verse';
import sampleVerses from './data/sampleVerses.json'
import books from './data/books.json'

const verses = sampleVerses.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});

function App() {
  return (
    <div className="App">
    <select>
      {books.map(selectBook => {
        return (<option key={selectBook} value={selectBook}> {selectBook} </option>)
      })}
    </select>  
    <Router>
    <nav>
          <ul>
            {[ ['/', 'Процитируй текст'],['/add', 'Добавить стих'],['/list', 'Список стихов'] ].map(navItem => {
              return (<li key={navItem[0]}><Link to={navItem[0]}>{navItem[1]}</Link></li>)
            })}
          </ul>
        </nav>
      <Switch>
      <Route>
          <Page path="/">
            {
              verses.map(verse => {
                return (<li key={verse.source}><Card verse={verse} /></li>);
              })
            }
          </Page>
        </Route>
        <Route path="/list">
          <Page></Page>
        </Route>
        <Route>
          <Page path="/src">
            <Card verse={verses[0]} />
          </Page>
        </Route>
        <Route path="/add">
          <Page>
            Добавление стиха
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
