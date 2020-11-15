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
import { Verse } from './models/Verse'

const verses = [
  new Verse('Эфесянам 5:33', 'Но и каждый из вас пусть так любит свою жену, как самого себя, а жене следует глубоко уважать мужа.'),
  new Verse('Быт 1:1', 'В начале Бог...')
  
];

function App() {
  return (
    <div className="App">
    <Router>
    <nav>
          <ul>
            <li>
              <Link to="/">Процитируй стих</Link>
            </li>
            <li>
              <Link to="/add">Добавить стих</Link>
            </li>
            <li>
              <Link to="/list">Список стихов</Link>
            </li>
          </ul>
        </nav>
      <Switch>
      <Route>
          <Page path="/">
            <Card verse={verses[1]} />
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
