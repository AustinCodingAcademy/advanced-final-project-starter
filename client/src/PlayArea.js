import React from 'react';
import CreateGame from './CreateGame';
import MovieGame from './MovieGame';

class PlayArea extends React.Component {
  constructor() {
    super();

    this.newGame = [];

    this.state = {
      showSearch: false,
      showGameList: false,
      showGame: false
    };
  }

  createGame() {
    this.setState({
      showGameList: false,
      showSearch: true,
      showGame: false
    });
  }

  buildGame(arr) {
    //map each array index
    let gameArray = arr;
    arr.map(movie => {
      for(var i = 0; i < 3; i++) {
        gameArray.push({game_id: Math.floor(Math.random() * 99999),
          poster: movie.poster,
          showPoster: false,
          clickable: true,
          matched: false
        });
      }
    });
    console.log('game array', gameArray);
    console.log('game saved, loading...');
    this.newGame = gameArray;
    this.setState({
      showGame: true,
      showList: false,
      showSearch: false
    });
    return gameArray;
  }

  render() {
    return (
      <div id="play-area">
        <h1>Welcome to Movie Memory</h1>
        <h3>Put your memory to the test</h3>
        <div id="create-game" onClick={() => this.createGame()}>Create Game</div>
        {this.state.showSearch ? <CreateGame
          buildGame={this.buildGame.bind(this)} /> : null }
        {this.state.showGame ? <MovieGame gameDeck={this.newGame}/> : null}
      </div>
    )
  }
}

export default PlayArea;
