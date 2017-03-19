import React, { Component } from 'react';
import PlayArea from './PlayArea';
import './GameApp.css';

class GameApp extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <PlayArea />
      </div>
    );
  }
}

export default GameApp;
