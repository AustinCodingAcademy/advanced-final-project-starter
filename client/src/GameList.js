import React, { Component } from 'react';
import ListedGame  from './ListedGame';
import axios from 'axios';

class GameList extends Component {
  constructor() {
    super();

    this.list = [];

    this.state = {
      gameList: [],
      filterGame: ''
    };
  }

  loadGames() {
    console.log('getting games');
    axios.get('/api/movie-games', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(resp => {
      this.list = resp.data;
      console.log('got games', resp);
      this.setState({
        gameList: resp.data
      });
    })
    .catch(err => console.log("failed to load games", err));
  }

  componentDidMount() {
    this.loadGames();
  }

  handleChange(event) {
    this.setState({
      filterGame: event.target.value
    });
  }

  getFilteredGame(list) {
        const TERM = this.state.filterGame.trim().toLowerCase();
        const MOVIEGAMES = list;

        if (!TERM) {
            return MOVIEGAMES;
        }

        return MOVIEGAMES.filter(game => {
            return game.name.toLowerCase().indexOf(TERM) >= 0;
        });
    }

  handleDeleteGame(id) {
    console.log('deleting game',id);
    axios.delete(`/api/movie-games/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(() => {
      this.loadGames();
    })
    .catch(err => console.log("failed to delete game",err));
  }

  render() {
    return (
      <div id="game-list">
      <div>My Games
        <input id="input-findgame"
          type="text"
          placeholder="Find Game..."
          onChange={event => this.handleChange(event)}></input>
      </div>
      {this.getFilteredGame(this.state.gameList).map(game => {
        return (
          <ListedGame key={game._id}
            id={game._id}
            poster={game.game[0].poster}
            gameName={game.name}
            gameOwner={game.owner}
            buildGame={this.props.buildGame.bind(this)}
            updateGame={this.props.updateGame.bind(this)}
            deleteGame={this.handleDeleteGame.bind(this)} />
          )
        })
      }
      </div>
    )
  }
}

export default GameList;
