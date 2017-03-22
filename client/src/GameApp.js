import React, { Component } from 'react';
import PlayArea from './PlayArea';
import './css/GameApp.css';

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
