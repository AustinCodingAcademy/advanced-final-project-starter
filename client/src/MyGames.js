import React from 'react';
import CreateGame from './CreateGame';
import MovieGame from './MovieGame';
import GameList from './GameList';
import { Jumbotron } from 'react-bootstrap';

class MyGames extends React.Component {
  constructor() {
    super();

    this.newGame = [];

    this.state = {
      showWelcome: true,
      showSearch: false,
      showGameList: true,
      showGame: false
    };
  }

  createGame() {
    this.setState({
      showWelcome: false,
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
      showWelcome: false,
      showGame: true,
      showGameList: false,
      showSearch: false
    });
    return gameArray;
  }

  render() {
    return (
      <div id="play-area">
        {this.state.showWelcome ? <Jumbotron>
            <h1>Movie</h1>
            <h1>Memory</h1>
            <div id="create-game"
              onClick={() => this.createGame()}>Create Game</div>
          </Jumbotron> : null }
        {this.state.showGameList ? <GameList buildGame={this.buildGame.bind(this)}/> : null }
        {this.state.showSearch ? <CreateGame
          buildGame={this.buildGame.bind(this)} /> : null }
        {this.state.showGame ? <MovieGame gameDeck={this.newGame}/> : null}
      </div>
    )
  }
}

export default MyGames;
