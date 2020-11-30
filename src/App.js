import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import Page from './componets/Page';
import { Card } from './componets/Card';
import { withToggle } from './componets/Card/withToggle';
import { Verse } from './models/Verse';
import sampleVerses from './data/sampleVerses.json'

const CardToggleable = withToggle(Card);
const verses = sampleVerses.map(verseData => {
  return new Verse(verseData[0], verseData[1]) ;
});
const routes = [
  ['/', 'Процитируй текст'],
  ['/add', 'Добавить стих'],
  ['/list', 'Список стихов']
];

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(!isDrawerOpen);
  }

  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
        </Toolbar>
      </AppBar>
    <Router>
      <React.Fragment>
        <SwipeableDrawer open={isDrawerOpen} anchor="left" onClose={toggleDrawer} onOpen={toggleDrawer}>
          <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
              {routes.map(route => (
              <ListItem key={route[0]}>
                <ListItemText>
                  <Link component={RouterLink} to={route[0]}>{route[1]}</Link>
                </ListItemText>
              </ListItem>))}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
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
