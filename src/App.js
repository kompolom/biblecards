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

class Verse {
  constructor(source, content) {
    this.source = source;
    this.text = content;
  }
}

const verses = [
  new Verse('Эфесянам 5:33', 'Контент стиха'),
  new Verse('Быт 1:1', 'В начале Бог...')
];
console.log(verses);

function App() {
  return (
    <div className="App">
    <Router>
    <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>
      <Switch>
        <Route path="/add">
          <Page>
            Добавление стиха
          </Page>
        </Route>
        <Route>
          <Page path="/">
            <Card verse={verses[1]} />
          </Page>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
