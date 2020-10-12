import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material/react-button';
import '@material/react-button/dist/button.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         ПРивет!! 
        </a>
      </header>
        <Button>Click Me!</Button>
    </div>
  );
}

export default App;
