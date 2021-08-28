import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addStyles } from 'react-mathquill';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  useEffect(() => addStyles(),[])

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
          Learn React
        </a>
        <Quiz></Quiz>
        <br></br>
      </header>
    </div>
  );
}

export default App;
