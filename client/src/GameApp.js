import React, { Component } from 'react';
import MyGames from './MyGames';
import './css/GameApp.css';

class GameApp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <MyGames />
      </div>
    );
  }
}

export default GameApp;
